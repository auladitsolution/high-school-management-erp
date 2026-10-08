"use client";

import React from "react";
import {
  BarChart3,
  TrendingUp,
  Download,
  Printer,
  Users,
  Award,
  Wallet,
  CalendarCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toBanglaNumber, formatCurrencyBn } from "@/lib/utils/bangla";
import { toast } from "sonner";

export default function ReportsPage() {
  const classBreakdowns = [
    { class: "৬ষ্ঠ শ্রেণি", boys: 120, girls: 130, total: 250, attendance: "৯৬%" },
    { class: "৭ম শ্রেণি", boys: 115, girls: 125, total: 240, attendance: "৯৫%" },
    { class: "৮ম শ্রেণি", boys: 135, girls: 130, total: 265, attendance: "৯৭%" },
    { class: "৯ম শ্রেণি", boys: 125, girls: 120, total: 245, attendance: "৯৪%" },
    { class: "১০ম শ্রেণি", boys: 130, girls: 120, total: 250, attendance: "৯৮%" },
  ];

  const handleDownloadReport = (title: string) => {
    toast.success(`${title} সফলভাবে তৈরি ও ডাউনলোড হয়েছে (PDF)।`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            রিপোর্ট ও পারফরম্যান্স বিশ্লেষণ (Reports & Analytics)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            শিক্ষার্থী সংখ্যা, উপস্থিতি পরিসংখ্যান ও পরীক্ষার ফলাফল প্রতিবেদন
          </p>
        </div>
        <Button
          size="sm"
          className="gap-1.5 font-semibold bg-slate-900 hover:bg-slate-800"
          onClick={() => handleDownloadReport("সার্বিক প্রাতিষ্ঠানিক প্রতিবেদন")}
        >
          <Printer className="h-4 w-4" />
          পূর্ণাঙ্গ প্রতিবেদন প্রিন্ট করুন
        </Button>
      </div>

      {/* Class-wise enrollment & attendance breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-bold text-slate-900">
            শ্রেণিভিত্তিক শিক্ষার্থী ও উপস্থিতি পরিসংখ্যান
          </CardTitle>
          <CardDescription>২০২৬ শিক্ষাবর্ষের চলমান সামগ্রিক রিপোর্ট</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {classBreakdowns.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900">{item.class}</span>
                    <span className="text-xs text-slate-500">
                      (ছাত্র: {toBanglaNumber(item.boys)}, ছাত্রী: {toBanglaNumber(item.girls)})
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-semibold">
                    <span className="text-blue-700">
                      মোট: {toBanglaNumber(item.total)} জন
                    </span>
                    <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
                      গড় উপস্থিতি: {item.attendance}
                    </span>
                  </div>
                </div>

                {/* Progress bar visual */}
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden flex">
                  <div
                    className="bg-blue-600 h-full"
                    style={{ width: `${(item.boys / item.total) * 100}%` }}
                    title="ছাত্র"
                  />
                  <div
                    className="bg-indigo-400 h-full"
                    style={{ width: `${(item.girls / item.total) * 100}%` }}
                    title="ছাত্রী"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Instant Report Generator Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="hover:border-blue-300 transition-colors">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2 text-blue-700">
              <Users className="h-4 w-4" />
              ভর্তি ও শিক্ষার্থী রেজিস্টার
            </CardTitle>
            <CardDescription>সকল শ্রেণির রোলভিত্তিক তালিকা</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs justify-center gap-1"
              onClick={() => handleDownloadReport("শিক্ষার্থী রেজিস্টার")}
            >
              <Download className="h-3.5 w-3.5" />
              ডাউনলোড করুন
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:border-emerald-300 transition-colors">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2 text-emerald-700">
              <Award className="h-4 w-4" />
              পরীক্ষার ফলাফল টেবুলেশন শিট
            </CardTitle>
            <CardDescription>জিপিএ ও মেধা তালিকা বিবরণী</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs justify-center gap-1"
              onClick={() => handleDownloadReport("টেবুলেশন শিট")}
            >
              <Download className="h-3.5 w-3.5" />
              ডাউনলোড করুন
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:border-amber-300 transition-colors">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2 text-amber-700">
              <Wallet className="h-4 w-4" />
              মাসিক ফি আদায় ও বকেয়া রিপোর্ট
            </CardTitle>
            <CardDescription>হিসাবরক্ষণ ও ক্যাশ রেজিস্টার</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs justify-center gap-1"
              onClick={() => handleDownloadReport("ফি আদায় প্রতিবেদন")}
            >
              <Download className="h-3.5 w-3.5" />
              ডাউনলোড করুন
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
