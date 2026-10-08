import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database/connection";
import { SchoolSettingsModel } from "@/models/SchoolSettings";
import { getSession } from "@/lib/auth/session";

// Default settings if database is empty
const DEFAULT_SETTINGS = {
  nameBn: "অগ্রদূত আদর্শ উচ্চ বিদ্যালয়",
  nameEn: "Agrodut Adarsha High School",
  sloganBn: "জ্ঞান, শৃঙ্খলা ও আদর্শের আলোকবর্তিকা",
  sloganEn: "Beacon of Knowledge, Discipline and Ethics",
  eiin: "১২৩৪৫৬",
  boardCode: "৫৬৭৮",
  establishedYear: "১৯৯৫",
  address: "কলেজ রোড, ধানমন্ডি, ঢাকা - ১২০৫",
  phone: "+৮৮০ ১৮০০-০০০০০০",
  email: "info@schoolname.edu.bd",
  logoUrl: "",

  heroTitle: "অগ্রদূত আদর্শ উচ্চ বিদ্যালয়",
  heroSubtitle:
    "আধুনিক তথ্যপ্রযুক্তিভিত্তিক শিক্ষা, শৃঙ্খলাবোধ এবং মানবিক গুণাবলিসম্পন্ন দেশপ্রেমিক ভবিষ্যৎ নাগরিক গড়ে তুলতে আমরা দৃঢ়প্রতিজ্ঞ।",
  bannerImageUrl: "",
  tickerNotice:
    "২০২৬ শিক্ষাবর্ষে ৬ষ্ঠ থেকে ৯ম শ্রেণিতে অনলাইন ভর্তি আবেদন চলমান রয়েছে। শেষ সময়: ৩০ জানুয়ারি।",
  admissionOpen: true,
  admissionNotice:
    "অনলাইনে সহজ কয়েকটি ধাপে ভর্তির আবেদন সম্পন্ন করুন ও ডিজিটাল প্রবেশপত্র সংগ্রহ করুন।",

  principalName: "ড. মোহাম্মদ আব্দুল্লাহ",
  principalTitle: "প্রধান শিক্ষক / অধ্যক্ষ",
  principalQualification: "এম.এসসি (গণিত), বি.এড, পিএইচডি",
  principalMessage:
    "শিক্ষা কেবল পুথিগত বিদ্যার মধ্যে সীমাবদ্ধ নয়। আদর্শ নাগরিক হিসেবে আত্মপ্রকাশের জন্য শিক্ষার্থীদের মেধা, সৃজনশীলতা, শৃঙ্খলা এবং দেশপ্রেমের মেলবন্ধন ঘটাতে হবে। আমাদের বিদ্যালয় ১৯৯৫ সাল থেকে সেই লক্ষ্যেই নিরলসভাবে কাজ করে চলেছে। প্রতিটি শিক্ষার্থীর সুপ্ত প্রতিভার বিকাশ এবং ডিজিটাল বাংলাদেশের স্মার্ট নাগরিক গঠনে আমাদের সকল শিক্ষক ও কর্মচারী একনিষ্ঠভাবে সচেষ্ট।",
  principalPhotoUrl:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",

  presidentName: "মোঃ আনোয়ারুল ইসলাম",
  presidentTitle: "সভাপতি, পরিচালনা পর্ষদ",
  presidentMessage:
    "সুদক্ষ পরিচালনা পর্ষদ, নিবেদিতপ্রাণ শিক্ষকমণ্ডলী এবং আধুনিক প্রযুক্তির সাহায্যে আমরা এ প্রতিষ্ঠানকে একটি আদর্শ বিদ্যাপীঠ হিসেবে গড়ে তুলেছি।",
  presidentPhotoUrl:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",

  statStudents: "১২৫০+",
  statTeachers: "৪৫ জন",
  statPassRate: "৯৯.৪%",
  statGpa5: "৭২+",

  facebookUrl: "https://facebook.com",
  youtubeUrl: "https://youtube.com",
  googleMapUrl: "",

  numerals: "bn" as const,
  primaryColor: "#2563EB",
  academicYear: "২০২৬",
};

export async function GET() {
  try {
    await connectToDatabase();
    let settings = await SchoolSettingsModel.findOne().lean();

    if (!settings) {
      // Create initial settings document in DB
      settings = await SchoolSettingsModel.create(DEFAULT_SETTINGS);
    }

    return NextResponse.json({ success: true, settings });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Error fetching settings";
    // Return default settings safely even if DB is temporarily unreachable
    return NextResponse.json({ success: true, settings: DEFAULT_SETTINGS, warning: errorMsg });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || (session.role !== "SUPER_ADMIN" && session.role !== "SCHOOL_ADMIN")) {
      return NextResponse.json(
        { error: "শুধুমাত্র সুপার অ্যাডমিন বা প্রধান প্রশাসক সেটিংস সংশোধন করতে পারবেন।" },
        { status: 403 }
      );
    }

    const body = await req.json();

    await connectToDatabase();

    const updated = await SchoolSettingsModel.findOneAndUpdate(
      {},
      { $set: { ...body, updatedAt: new Date() } },
      { new: true, upsert: true }
    ).lean();

    return NextResponse.json({
      success: true,
      message: "ওয়েবসাইট এবং বিদ্যালয়ের সকল সেটিংস সফলভাবে সংরক্ষিত ও আপডেট হয়েছে!",
      settings: updated,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Error updating settings";
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
