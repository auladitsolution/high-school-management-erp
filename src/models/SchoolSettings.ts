import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISchoolSettings extends Document {
  // Basic Identity
  nameBn: string;
  nameEn: string;
  sloganBn?: string;
  sloganEn?: string;
  eiin: string;
  boardCode: string;
  establishedYear: string;
  address: string;
  phone: string;
  email: string;
  logoUrl?: string;

  // Website Hero & Homepage
  heroTitle?: string;
  heroSubtitle?: string;
  bannerImageUrl?: string;
  tickerNotice?: string;
  admissionOpen?: boolean;
  admissionNotice?: string;

  // Principal's Section
  principalName: string;
  principalTitle: string;
  principalQualification?: string;
  principalMessage: string;
  principalPhotoUrl?: string;

  // President / Governing Body
  presidentName?: string;
  presidentTitle?: string;
  presidentMessage?: string;
  presidentPhotoUrl?: string;

  // Statistics
  statStudents?: string;
  statTeachers?: string;
  statPassRate?: string;
  statGpa5?: string;

  // Social & Maps
  facebookUrl?: string;
  youtubeUrl?: string;
  googleMapUrl?: string;

  // Configurations
  numerals: "bn" | "en";
  primaryColor?: string;
  academicYear: string;
}

const SchoolSettingsSchema = new Schema<ISchoolSettings>(
  {
    nameBn: { type: String, required: true, default: "অগ্রদূত আদর্শ উচ্চ বিদ্যালয়" },
    nameEn: { type: String, required: true, default: "Agrodut Adarsha High School" },
    sloganBn: { type: String, default: "জ্ঞান, শৃঙ্খলা ও আদর্শের আলোকবর্তিকা" },
    sloganEn: { type: String, default: "Beacon of Knowledge, Discipline and Ethics" },
    eiin: { type: String, required: true, default: "১২৩৪৫৬" },
    boardCode: { type: String, default: "৫৬৭৮" },
    establishedYear: { type: String, default: "১৯৯৫" },
    address: { type: String, default: "কলেজ রোড, ধানমন্ডি, ঢাকা - ১২০৫" },
    phone: { type: String, default: "+৮৮০ ১৮০০-০০০০০০" },
    email: { type: String, default: "info@schoolname.edu.bd" },
    logoUrl: { type: String },

    heroTitle: { type: String, default: "অগ্রদূত আদর্শ উচ্চ বিদ্যালয়" },
    heroSubtitle: {
      type: String,
      default:
        "আধুনিক তথ্যপ্রযুক্তিভিত্তিক শিক্ষা, শৃঙ্খলাবোধ এবং মানবিক গুণাবলিসম্পন্ন দেশপ্রেমিক ভবিষ্যৎ নাগরিক গড়ে তুলতে আমরা দৃঢ়প্রতিজ্ঞ।",
    },
    bannerImageUrl: { type: String },
    tickerNotice: {
      type: String,
      default: "২০২৬ শিক্ষাবর্ষে ৬ষ্ঠ থেকে ৯ম শ্রেণিতে অনলাইন ভর্তি আবেদন চলমান রয়েছে। শেষ সময়: ৩০ জানুয়ারি।",
    },
    admissionOpen: { type: Boolean, default: true },
    admissionNotice: {
      type: String,
      default: "অনলাইনে সহজ কয়েকটি ধাপে ভর্তির আবেদন সম্পন্ন করুন ও ডিজিটাল প্রবেশপত্র সংগ্রহ করুন।",
    },

    principalName: { type: String, default: "ড. মোহাম্মদ আব্দুল্লাহ" },
    principalTitle: { type: String, default: "প্রধান শিক্ষক / অধ্যক্ষ" },
    principalQualification: { type: String, default: "এম.এসসি (গণিত), বি.এড, পিএইচডি" },
    principalMessage: {
      type: String,
      default:
        "শিক্ষা কেবল পুথিগত বিদ্যার মধ্যে সীমাবদ্ধ নয়। আদর্শ নাগরিক হিসেবে আত্মপ্রকাশের জন্য শিক্ষার্থীদের মেধা, সৃজনশীলতা, শৃঙ্খলা এবং দেশপ্রেমের মেলবন্ধন ঘটাতে হবে। আমাদের বিদ্যালয় ১৯৯৫ সাল থেকে সেই লক্ষ্যেই নিরলসভাবে কাজ করে চলেছে।",
    },
    principalPhotoUrl: {
      type: String,
      default: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    },

    presidentName: { type: String, default: "মোঃ আনোয়ারুল ইসলাম" },
    presidentTitle: { type: String, default: "সভাপতি, পরিচালনা পর্ষদ" },
    presidentMessage: {
      type: String,
      default:
        "সুদক্ষ পরিচালনা পর্ষদ, নিবেদিতপ্রাণ শিক্ষকমণ্ডলী এবং আধুনিক প্রযুক্তির সাহায্যে আমরা এ প্রতিষ্ঠানকে একটি আদর্শ বিদ্যাপীঠ হিসেবে গড়ে তুলেছি।",
    },
    presidentPhotoUrl: {
      type: String,
      default: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
    },

    statStudents: { type: String, default: "১২৫০+" },
    statTeachers: { type: String, default: "৪৫ জন" },
    statPassRate: { type: String, default: "৯৯.৪%" },
    statGpa5: { type: String, default: "৭২+" },

    facebookUrl: { type: String, default: "https://facebook.com" },
    youtubeUrl: { type: String, default: "https://youtube.com" },
    googleMapUrl: { type: String, default: "" },

    numerals: { type: String, enum: ["bn", "en"], default: "bn" },
    primaryColor: { type: String, default: "#2563EB" },
    academicYear: { type: String, default: "২০২৬" },
  },
  { timestamps: true }
);

export const SchoolSettingsModel: Model<ISchoolSettings> =
  mongoose.models.SchoolSettings ||
  mongoose.model<ISchoolSettings>("SchoolSettings", SchoolSettingsSchema);
