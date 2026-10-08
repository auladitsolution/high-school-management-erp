"use client";

import React, { useState } from "react";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { PublicFooter } from "@/components/layout/public-footer";
import { Search, Award, Printer, CheckCircle2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toBanglaNumber } from "@/lib/utils/bangla";
import { toast } from "sonner";

export default function PublicResultsPage() {
  const [exam, setExam] = useState("অর্ধ-বার্ষিক পরীক্ষা ২০২৬");
  const [className, setClassName] = useState("১০ম শ্রেণি");
  const [roll, setRoll] = useState("");
  const [searchDone, setSearchDone] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roll) {
      toast.error("রোল নম্বর প্রদান করুন।");
      return;
    }
    setSearchDone(true);
    toast.success("ফলাফল সফলভাবে খুঁজে পাওয়া গেছে!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <PublicNavbar />

      <section className="bg-blue-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-2">
          <span className="text-xs uppercase tracking-wider text-blue-300 font-bold bg-blue-800/80 px-3 py-1 rounded-full">
            অনলাইন ফলাফল
          </span>
          <h1 className="text-3xl font-extrabold">পরীক্ষার ফলাফল ও মার্কশিট অনুসন্ধান</h1>
          <p className="text-sm text-blue-200">
            রোল নম্বর ও শ্রেণি নির্বাচন করে তাৎক্ষণিক নম্বরপত্র ও গ্রেডশিট দেখুন
          </p>
        </div>
      </section>

      <main className="max-w-3xl mx-auto px-4 py-10 w-full flex-1 space-y-8">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-base font-bold text-slate-900">
              ফলাফল অনুসন্ধান ফরম
            </CardTitle>
            <CardDescription>
              আপনার পরীক্ষার ধরন, শ্রেণি ও রোল নম্বর প্রদান করুন
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    পরীক্ষার নাম
                  </label>
                  <select
                    className="w-full text-xs font-semibold px-3 py-2 border border-slate-300 rounded-lg bg-white"
                    value={exam}
                    onChange={(e) => setExam(e.target.value)}
                  >
                    <option value="অর্ধ-বার্ষিক পরীক্ষা ২০২৬">অর্ধ-বার্ষিক পরীক্ষা ২০২৬</option>
                    <option value="বার্ষিক পরীক্ষা ২০২৬">বার্ষিক পরীক্ষা ২০২৬</option>
                    <option value="মডেল টেস্ট পরীক্ষা">মডেল টেস্ট পরীক্ষা</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">শ্রেণি</label>
                  <select
                    className="w-full text-xs font-semibold px-3 py-2 border border-slate-300 rounded-lg bg-white"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                  >
                    <option value="৬ষ্ঠ শ্রেণি">৬ষ্ঠ শ্রেণি</option>
                    <option value="৭ম শ্রেণি">৭ম শ্রেণি</option>
                    <option value="৮ম শ্রেণি">৮ম শ্রেণি</option>
                    <option value="৯ম শ্রেণি">৯ম শ্রেণি</option>
                    <option value="১০ম শ্রেণি">১০ম শ্রেণি</option>
                  </select>
                </div>
              </div>

              <Input
                label="শ্রেণি রোল নম্বর *"
                placeholder="যেমন: ০১"
                value={roll}
                onChange={(e) => setRoll(e.target.value)}
                required
              />

              <Button type="submit" size="md" className="w-full justify-center font-bold gap-2">
                <Search className="h-4 w-4" /> ফলাফল দেখুন
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Result Sheet Card */}
        {searchDone && (
          <Card className="border-blue-300 shadow-lg animate-in slide-in-from-bottom-2">
            <CardContent className="p-6 space-y-6">
              <div className="text-center border-b border-slate-200 pb-4 space-y-1">
                <h3 className="text-lg font-bold text-slate-900">অগ্রদূত আদর্শ উচ্চ বিদ্যালয়</h3>
                <p className="text-xs text-slate-500">EIIN: ১২৩৪৫৬ | ধানমন্ডি, ঢাকা</p>
                <p className="text-xs font-bold text-blue-700">{exam}</p>
              </div>

              <div className="grid grid-cols-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200 gap-2">
                <div>শিক্ষার্থীর নাম: <strong>সাদিয়া ইসলাম</strong></div>
                <div>আইডি নং: <strong className="font-mono">STD-2026-001</strong></div>
                <div>শ্রেণি: <strong>{className}</strong></div>
                <div>রোল নং: <strong>{toBanglaNumber(roll || "০১")}</strong></div>
              </div>

              <div className="border border-slate-200 rounded-lg overflow-hidden text-xs">
                <div className="bg-slate-100 grid grid-cols-4 p-2.5 font-bold text-slate-700">
                  <span className="col-span-2 text-left">বিষয়</span>
                  <span className="text-center">প্রাপ্ত নম্বর</span>
                  <span className="text-center">গ্রেড</span>
                </div>
                <div className="divide-y divide-slate-100 text-slate-800">
                  <div className="grid grid-cols-4 p-2">
                    <span className="col-span-2">বাংলা ১ম ও ২য় পত্র</span>
                    <span className="text-center font-bold">৮৪</span>
                    <span className="text-center font-bold text-emerald-700">A+</span>
                  </div>
                  <div className="grid grid-cols-4 p-2">
                    <span className="col-span-2">ইংরেজি ১ম ও ২য় পত্র</span>
                    <span className="text-center font-bold">৭৬</span>
                    <span className="text-center font-bold text-emerald-700">A</span>
                  </div>
                  <div className="grid grid-cols-4 p-2">
                    <span className="col-span-2">সাধারণ গণিত</span>
                    <span className="text-center font-bold">৯৩</span>
                    <span className="text-center font-bold text-emerald-700">A+</span>
                  </div>
                  <div className="grid grid-cols-4 p-2">
                    <span className="col-span-2">পদার্থবিজ্ঞান</span>
                    <span className="text-center font-bold">৮৮</span>
                    <span className="text-center font-bold text-emerald-700">A+</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-blue-50 border border-blue-200">
                <div>
                  <span className="text-xs text-blue-700 block">লেটার গ্রেড:</span>
                  <span className="text-2xl font-black text-blue-900">A+</span>
                </div>
                <div>
                  <span className="text-xs text-blue-700 block">জিপিএ (GPA):</span>
                  <span className="text-2xl font-black text-blue-900">৫.০০</span>
                </div>
                <div>
                  <span className="text-xs text-blue-700 block">মেধা স্থান:</span>
                  <span className="text-2xl font-black text-blue-900">১ম</span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  size="sm"
                  className="gap-1.5 font-bold"
                  onClick={() => toast.success("নম্বরপত্র প্রিন্ট সম্পন্ন হয়েছে!")}
                >
                  <Printer className="h-4 w-4" />
                  মার্কশিট প্রিন্ট করুন
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      <PublicFooter />
    </div>
  );
}
