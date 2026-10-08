import React from "react";
import Link from "next/link";
import {
  GraduationCap,
  Bell,
  BookOpen,
  Award,
  Users,
  CheckCircle2,
  ArrowRight,
  Calendar,
  Download,
  School,
  FileText,
  UserCheck,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { PublicFooter } from "@/components/layout/public-footer";
import { connectToDatabase } from "@/lib/database/connection";
import { SchoolSettingsModel } from "@/models/SchoolSettings";
import { toBanglaNumber } from "@/lib/utils/bangla";

export default async function HomePage() {
  let settings: any = null;
  try {
    await connectToDatabase();
    settings = await SchoolSettingsModel.findOne().lean();
  } catch {
    // ignore
  }

  const nameBn = settings?.nameBn || "অগ্রদূত আদর্শ উচ্চ বিদ্যালয়";
  const eiin = settings?.eiin || "১২৩৪৫৬";
  const boardCode = settings?.boardCode || "৫৬৭৮";
  const heroTitle = settings?.heroTitle || nameBn;
  const heroSubtitle =
    settings?.heroSubtitle ||
    "আধুনিক তথ্যপ্রযুক্তিভিত্তিক শিক্ষা, শৃঙ্খলাবোধ এবং মানবিক গুণাবলিসম্পন্ন দেশপ্রেমিক ভবিষ্যৎ নাগরিক গড়ে তুলতে আমরা দৃঢ়প্রতিজ্ঞ।";
  const bannerImageUrl = settings?.bannerImageUrl;
  const tickerNotice =
    settings?.tickerNotice ||
    "২০২৬ শিক্ষাবর্ষে ৬ষ্ঠ থেকে ৯ম শ্রেণিতে অনলাইন ভর্তি আবেদন চলমান রয়েছে। শেষ সময়: ৩০ জানুয়ারি।";
  const admissionOpen = settings?.admissionOpen !== false;

  const principalName = settings?.principalName || "ড. মোহাম্মদ আব্দুল্লাহ";
  const principalTitle = settings?.principalTitle || `প্রধান শিক্ষক, ${nameBn}`;
  const principalQualification = settings?.principalQualification || "এম.এসসি (গণিত), বি.এড, পিএইচডি";
  const principalMessage =
    settings?.principalMessage ||
    "শিক্ষা কেবল পুথিগত বিদ্যার মধ্যে সীমাবদ্ধ নয়। আদর্শ নাগরিক হিসেবে আত্মপ্রকাশের জন্য শিক্ষার্থীদের মেধা, সৃজনশীলতা, শৃঙ্খলা এবং দেশপ্রেমের মেলবন্ধন ঘটাতে হবে। আমাদের বিদ্যালয় ১৯৯৫ সাল থেকে সেই লক্ষ্যেই নিরলসভাবে কাজ করে চলেছে। প্রতিটি শিক্ষার্থীর সুপ্ত প্রতিভার বিকাশ এবং ডিজিটাল বাংলাদেশের স্মার্ট নাগরিক গঠনে আমাদের সকল শিক্ষক ও কর্মচারী একনিষ্ঠভাবে সচেষ্ট।";
  const principalPhotoUrl =
    settings?.principalPhotoUrl ||
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80";

  const notices = [
    {
      id: "1",
      title: "২০২৬ শিক্ষাবর্ষে ৬ষ্ঠ থেকে ৯ম শ্রেণিতে নতুন ভর্তি বিজ্ঞপ্তি ও ফরম পূরণ",
      date: "১৫ জানুয়ারি, ২০২৬",
      category: "ভর্তি",
      isNew: true,
    },
    {
      id: "2",
      title: "এসএসসি পরীক্ষা ২০২৬-এর ফরম পূরণ সংক্রান্ত জরুরি নির্দেশনা",
      date: "১২ জানুয়ারি, ২০২৬",
      category: "পরীক্ষা",
      isNew: true,
    },
    {
      id: "3",
      title: "বার্ষিক ক্রীড়া প্রতিযোগিতা ও সাংস্কৃতিক সপ্তাহ ২০২৬ এর সময়সূচি",
      date: "০৮ জানুয়ারি, ২০২৬",
      category: "অনুষ্ঠান",
      isNew: false,
    },
    {
      id: "4",
      title: "অর্ধ-বার্ষিক পরীক্ষা ও প্রথম সাময়িক মূল্যায়নের সংশোধিত রুটিন প্রকাশ",
      date: "০৩ জানুয়ারি, ২০২৬",
      category: "একাডেমিক",
      isNew: false,
    },
  ];

  const stats = [
    {
      label: "মোট শিক্ষার্থী",
      value: settings?.statStudents || "১২৫০+",
      icon: Users,
      color: "text-blue-600 bg-blue-50",
    },
    {
      label: "অভিজ্ঞ শিক্ষক-শিক্ষিকা",
      value: settings?.statTeachers || "৪৫ জন",
      icon: UserCheck,
      color: "text-emerald-600 bg-emerald-50",
    },
    {
      label: "এসএসসি পাসের হার",
      value: settings?.statPassRate || "৯৯.৪%",
      icon: Award,
      color: "text-purple-600 bg-purple-50",
    },
    {
      label: "গড় জিপিএ-৫ অর্জন",
      value: settings?.statGpa5 || "৭২+",
      icon: GraduationCap,
      color: "text-amber-600 bg-amber-50",
    },
  ];

  const academicGroups = [
    {
      title: "মাধ্যমিক স্তর (৬ষ্ঠ - ৮ম শ্রেণি)",
      description: "জাতীয় শিক্ষাক্রম অনুসারে যুগোপযোগী সাধারণ পাঠদান, নৈতিক শিক্ষা ও সহপাঠ্যক্রমিক কার্যক্রম।",
      tags: ["সাধারণ পাঠ্যক্রম", "কম্পিউটার শিক্ষা", "বিজ্ঞান ল্যাব"],
    },
    {
      title: "বিজ্ঞান বিভাগ (৯ম - ১০ম শ্রেণি)",
      description: "পদার্থ, রসায়ন, জীববিজ্ঞান ও উচ্চতর গণিতে আধুনিক ল্যাব সুবিধা সম্বলিত উচ্চমানের প্রস্তুতি।",
      tags: ["আধুনিক ল্যাব", "বিশেষ ব্যবহারিক", "প্রজেক্ট ওয়ার্ক"],
    },
    {
      title: "ব্যবসায় শিক্ষা (৯ম - ১০ম শ্রেণি)",
      description: "হিসাববিজ্ঞান, ফিন্যান্স ও ব্যবসায় উদ্যোগ বিষয়ে বাস্তবসম্মত ও বিশ্লেষণধর্মী শিক্ষা পদ্ধতি।",
      tags: ["হিসাববিজ্ঞান", "উদ্যোক্তা উন্নয়ন", "তথ্যপ্রযুক্তি"],
    },
    {
      title: "মানবিক বিভাগ (৯ম - ১০ম শ্রেণি)",
      description: "ইতিহাস, পৌরনীতি, অর্থনীতি ও ভূগোল বিষয়ে সমৃদ্ধ জ্ঞানার্জন ও সামাজিক নেতৃত্ব গঠন।",
      tags: ["সামাজিক বিজ্ঞান", "ভাষা ও সাহিত্য", "বিতর্ক ও কুইজ"],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <PublicNavbar />

      {/* Notice Ticker */}
      <div className="bg-amber-50 border-b border-amber-200/80 py-2.5 px-4 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <span className="flex items-center gap-1 font-semibold text-amber-800 shrink-0 bg-amber-200/70 px-2 py-0.5 rounded">
            <Bell className="h-3.5 w-3.5 animate-bounce" />
            জরুরি ঘোষণা:
          </span>
          <div className="overflow-hidden truncate text-amber-950 font-medium">
            <Link href="/admissions" className="hover:underline">
              {tickerNotice}
            </Link>
          </div>
          <Link
            href="/notices"
            className="ml-auto text-amber-900 font-semibold text-xs hover:underline shrink-0 hidden md:inline-flex items-center gap-0.5"
          >
            সব নোটিশ <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-b from-blue-900 via-blue-800 to-indigo-900 text-white py-16 lg:py-24">
        {/* Subtle background pattern & Optional dynamic banner */}
        {bannerImageUrl ? (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-overlay pointer-events-none"
            style={{ backgroundImage: `url(${bannerImageUrl})` }}
          />
        ) : (
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        )}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-700/60 border border-blue-400/30 text-xs sm:text-sm font-medium text-blue-200">
                <School className="h-4 w-4 text-amber-300" />
                <span>EIIN: {eiin} | ঢাকা শিক্ষা বোর্ড কোড: {boardCode}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                {heroTitle}
              </h1>

              <p className="text-base sm:text-lg text-blue-100 max-w-2xl leading-relaxed">
                {heroSubtitle}
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link href="/admissions">
                  <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold shadow-lg shadow-amber-500/25">
                    {admissionOpen ? "অনলাইন ভর্তি আবেদন" : "ভর্তি সংক্রান্ত তথ্য"} <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
                <Link href="/results">
                  <Button size="lg" variant="outline" className="bg-white/10 border-blue-300/40 text-white hover:bg-blue-800/60">
                    পরীক্ষার ফলাফল
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-0">
                    ইআরপি ড্যাশবোর্ড
                  </Button>
                </Link>
              </div>

              {/* Fast highlight pills */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-blue-700/60 text-xs text-blue-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>স্মার্ট ডিজিটাল শ্রেণিকক্ষ</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>অভিজ্ঞ বিষয়ভিত্তিক শিক্ষক</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>সিসিটিভি নিয়ন্ত্রিত ক্যাম্পাস</span>
                </div>
              </div>
            </div>

            {/* Right Card / Fast portal preview */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl p-6 text-slate-900 shadow-2xl border border-slate-100 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2 font-bold text-slate-800">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <span>দ্রুত অ্যাক্সেস লিংক</span>
                  </div>
                  <span className="text-xs bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded-full">
                    শিক্ষা সেবা
                  </span>
                </div>

                <div className="space-y-3">
                  <Link
                    href="/admissions"
                    className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200/80 hover:border-blue-500 hover:bg-blue-50/50 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                        ১
                      </div>
                      <div className="text-left">
                        <h4 className="font-semibold text-sm text-slate-900 group-hover:text-blue-600">
                          ভর্তি ফর্ম ও বিবরণী
                        </h4>
                        <p className="text-xs text-slate-500">অনলাইনে আবেদন ও ফি পরিশোধ</p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                  </Link>

                  <Link
                    href="/results"
                    className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200/80 hover:border-blue-500 hover:bg-blue-50/50 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                        ২
                      </div>
                      <div className="text-left">
                        <h4 className="font-semibold text-sm text-slate-900 group-hover:text-emerald-600">
                          অনলাইন ফলাফল অনুসন্ধান
                        </h4>
                        <p className="text-xs text-slate-500">রোল ও ক্লাস দিয়ে নম্বরপত্র দেখুন</p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                  </Link>

                  <Link
                    href="/routines"
                    className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200/80 hover:border-blue-500 hover:bg-blue-50/50 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                        ৩
                      </div>
                      <div className="text-left">
                        <h4 className="font-semibold text-sm text-slate-900 group-hover:text-purple-600">
                          ক্লাস ও পরীক্ষার রুটিন
                        </h4>
                        <p className="text-xs text-slate-500">২০২৬ শিক্ষাবর্ষের সময়সূচি ডাউনলোড</p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-purple-600 transition-colors" />
                  </Link>

                  <Link
                    href="/login"
                    className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200/80 hover:border-blue-500 hover:bg-blue-50/50 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                        ৪
                      </div>
                      <div className="text-left">
                        <h4 className="font-semibold text-sm text-slate-900 group-hover:text-amber-600">
                          অভিভাবক ও শিক্ষার্থী পোর্টাল
                        </h4>
                        <p className="text-xs text-slate-500">উপস্থিতি, বেতন ও অ্যাকাডেমিক অগ্রগতি</p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-amber-600 transition-colors" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Counter Strip */}
      <section className="bg-white border-b border-slate-200/80 py-10 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/50"
                >
                  <div className={`p-3 rounded-xl ${s.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900">{s.value}</div>
                    <div className="text-xs sm:text-sm text-slate-600 font-medium">{s.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Principal's Statement & Notice Board Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Principal's Message */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
              <GraduationCap className="h-4 w-4" />
              <span>প্রতিষ্ঠান প্রধানের বাণী</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
              জ্ঞান ও নৈতিকতার সমন্বয়ে উন্নত ভবিষ্যৎ বিনির্মাণ
            </h2>
            <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <div className="w-24 h-28 rounded-xl overflow-hidden border border-slate-300 shrink-0 bg-slate-100 flex items-center justify-center shadow-xs">
                  {principalPhotoUrl ? (
                    <img
                      src={principalPhotoUrl}
                      alt={principalName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-slate-400 font-bold text-xs">[অধ্যক্ষের প্রতিকৃতি]</div>
                  )}
                </div>
                <div className="space-y-1.5 text-center sm:text-left">
                  <h3 className="font-bold text-base text-slate-900">{principalName}</h3>
                  <p className="text-xs text-blue-600 font-medium">{principalTitle}</p>
                  {principalQualification && (
                    <p className="text-xs text-slate-500">{principalQualification}</p>
                  )}
                </div>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed pt-2 border-t border-slate-100">
                “{principalMessage}”
              </p>
              <div className="pt-2 flex justify-end">
                <Link href="/about" className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1">
                  বিস্তারিত পরিচিতি পড়ুন <ChevronRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* Latest Notices */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
                <Bell className="h-4 w-4" />
                <span>সাম্প্রতিক নোটিশ বোর্ড</span>
              </div>
              <Link href="/notices" className="text-xs text-blue-600 hover:underline font-semibold">
                সকল নোটিশ ({toBanglaNumber(notices.length)})
              </Link>
            </div>
            <Card className="shadow-xs">
              <CardContent className="p-4 space-y-3">
                {notices.map((n) => (
                  <div
                    key={n.id}
                    className="p-3.5 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-slate-50/70 transition-colors space-y-1.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Badge variant={n.category === "ভর্তি" ? "warning" : "default"}>
                          {n.category}
                        </Badge>
                        {n.isNew && (
                          <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-sm animate-pulse">
                            নতুন
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {n.date}
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-slate-800 line-clamp-2 hover:text-blue-600">
                      <Link href={`/notices?id=${n.id}`}>{n.title}</Link>
                    </h4>
                  </div>
                ))}
                <div className="pt-2">
                  <Link href="/notices">
                    <Button variant="outline" size="sm" className="w-full text-xs justify-center gap-1">
                      <Download className="h-3.5 w-3.5" />
                      সব নোটিশ ও বিজ্ঞপ্তি ডাউনলোড করুন
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Academic Disciplines / Classes */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <div className="inline-flex items-center gap-1.5 text-blue-700 font-semibold text-xs tracking-wider uppercase bg-blue-100 px-3 py-1 rounded-full">
              <BookOpen className="h-3.5 w-3.5" />
              <span>একাডেমিক বিভাগ ও শিক্ষাক্রম</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              ৬ষ্ঠ থেকে ১০ম শ্রেণি পর্যন্ত সমৃদ্ধ পাঠদান
            </h2>
            <p className="text-sm text-slate-600">
              মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষা বোর্ড ঢাকার সর্বশেষ পাঠ্যসূচি অনুযায়ী পাঠ পরিচালনা
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {academicGroups.map((group, idx) => (
              <Card key={idx} className="bg-white hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-base text-slate-900 font-bold">
                    {group.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {group.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {group.tags.map((t, i) => (
                      <span
                        key={i}
                        className="text-[11px] bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded-md"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="bg-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold">
              ২০২৬ শিক্ষাবর্ষে অনলাইনে ভর্তির আবেদন করুন
            </h3>
            <p className="text-sm text-blue-100">
              সহজ কয়েকটি ধাপে তথ্য পূরণ করে প্রিন্টযোগ্য প্রবেশপত্র ও আবেদনপত্র সংগ্রহ করুন।
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Link href="/admissions" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto justify-center bg-white hover:bg-slate-100 text-blue-900 font-bold shadow-md">
                আবেদন শুরু করুন
              </Button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto justify-center border-blue-300 text-blue-900 hover:bg-slate-100">
                যোগাযোগ ও পরামর্শ
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
