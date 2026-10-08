import React from "react";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { PublicFooter } from "@/components/layout/public-footer";
import { School, Award, Users, CheckCircle2, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <PublicNavbar />

      <section className="bg-blue-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-2">
          <span className="text-xs uppercase tracking-wider text-blue-300 font-bold bg-blue-800/80 px-3 py-1 rounded-full">
            ঐতিহ্য ও চেতনা
          </span>
          <h1 className="text-3xl font-extrabold">বিদ্যালয় পরিচিতি ও ইতিহাস</h1>
          <p className="text-sm text-blue-200">
            ১৯৯৫ সাল থেকে মানসম্পন্ন মাধ্যমিক শিক্ষা ও চরিত্র গঠনে নিবেদিতপ্রাণ প্রতিষ্ঠান
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-12 space-y-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">প্রতিষ্ঠার গৌরবময় ইতিহাস</h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              অগ্রদূত আদর্শ উচ্চ বিদ্যালয় ১৯৯৫ সালের ১লা জানুয়ারি একদল শিক্ষানুরাগী ও বিশিষ্ট শিক্ষাবিদদের ঐকান্তিক প্রচেষ্টায় প্রতিষ্ঠিত হয়। সূচনালগ্ন থেকেই ঢাকা মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষা বোর্ডের অধীনে প্রতিষ্ঠানটি নিয়মিতভাবে উচ্চ একাডেমিক সাফল্য অর্জন করে আসছে।
            </p>
            <p className="text-sm text-slate-700 leading-relaxed">
              সুপরিসর ক্যাম্পাস, সমৃদ্ধ বিজ্ঞানাগার, শীতাতপ নিয়ন্ত্রিত কম্পিউটার ল্যাব, এবং ডিজিটাল মাল্টিমিডিয়া ক্লাসরুমের মাধ্যমে আমরা শিক্ষার্থীদের আন্তর্জাতিক মানের শিক্ষা নিশ্চিত করি।
            </p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 space-y-3">
            <h3 className="font-bold text-lg text-blue-950 flex items-center gap-2">
              <Award className="h-5 w-5 text-amber-500" />
              আমাদের লক্ষ্য ও উদ্দেশ্য (Mission & Vision)
            </h3>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>নৈতিক মূল্যবোধসম্পন্ন ও দেশপ্রেমিক ভবিষ্যৎ নাগরিক গড়ে তোলা।</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>বিজ্ঞান, প্রযুক্তি ও গবেষণাধর্মী শিক্ষায় পারদর্শী করে গড়ে তোলা।</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>সহশিক্ষা ও সাংস্কৃতিক কর্মকাণ্ডের মাধ্যমে সুপ্ত প্রতিভার বিকাশ।</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Governing Body Preview */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 text-center">পরিচালনা পর্ষদ ও কর্তৃপক্ষ</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-5 text-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-blue-100 mx-auto flex items-center justify-center font-bold text-blue-700">
                  স সভাপতি
                </div>
                <h4 className="font-bold text-base text-slate-900">মোঃ আনোয়ারুল ইসলাম</h4>
                <p className="text-xs text-blue-600 font-semibold">সভাপতি, পরিচালনা পর্ষদ</p>
                <p className="text-xs text-slate-500">বিশিষ্ট শিক্ষানুরাগী ও সমাজসেবক</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5 text-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-indigo-100 mx-auto flex items-center justify-center font-bold text-indigo-700">
                  অধ্যক্ষ
                </div>
                <h4 className="font-bold text-base text-slate-900">ড. মোহাম্মদ আব্দুল্লাহ</h4>
                <p className="text-xs text-indigo-600 font-semibold">সদস্য সচিব ও প্রধান শিক্ষক</p>
                <p className="text-xs text-slate-500">এম.এসসি (গণিত), বি.এড, পিএইচডি</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5 text-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-emerald-100 mx-auto flex items-center justify-center font-bold text-emerald-700">
                  অভিভাবক
                </div>
                <h4 className="font-bold text-base text-slate-900">প্রকৌশলী রফিকুল হাসান</h4>
                <p className="text-xs text-emerald-600 font-semibold">অভিভাবক প্রতিনিধি</p>
                <p className="text-xs text-slate-500">সদস্য, গভর্নিং বডি</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
