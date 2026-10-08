"use client";

import React from "react";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { PublicFooter } from "@/components/layout/public-footer";
import { Calendar, Download, Clock, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function PublicRoutinesPage() {
  const routines = [
    { title: "১০ম শ্রেণির ক্লাস রুটিন (২০২৬ শিক্ষাবর্ষ)", class: "১০ম শ্রেণি", type: "ক্লাস রুটিন", size: "1.2 MB" },
    { title: "৯ম শ্রেণির ক্লাস রুটিন (বিজ্ঞান, বাণিজ্য, মানবিক)", class: "৯ম শ্রেণি", type: "ক্লাস রুটিন", size: "1.1 MB" },
    { title: "৮ম শ্রেণির ক্লাস রুটিন", class: "৮ম শ্রেণি", type: "ক্লাস রুটিন", size: "950 KB" },
    { title: "৬ষ্ঠ ও ৭ম শ্রেণির সমন্বিত ক্লাস রুটিন", class: "৬ষ্ঠ ও ৭ম শ্রেণি", type: "ক্লাস রুটিন", size: "1.4 MB" },
    { title: "অর্ধ-বার্ষিক পরীক্ষা ২০২৬ সময়সূচি ও রুটিন", class: "সকল শ্রেণি", type: "পরীক্ষার রুটিন", size: "850 KB" },
    { title: "এসএসসি ২০২৬ মডেল টেস্ট পরীক্ষার সময়সূচি", class: "১০ম শ্রেণি", type: "পরীক্ষার রুটিন", size: "750 KB" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <PublicNavbar />

      <section className="bg-blue-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-2">
          <span className="text-xs uppercase tracking-wider text-blue-300 font-bold bg-blue-800/80 px-3 py-1 rounded-full">
            সময়সূচি
          </span>
          <h1 className="text-3xl font-extrabold">ক্লাস ও পরীক্ষা রুটিন</h1>
          <p className="text-sm text-blue-200">
            ২০২৬ শিক্ষাবর্ষের সকল শ্রেণির ক্লাস সময়সূচি ও পরীক্ষার সময়তালিকা
          </p>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 py-10 w-full flex-1 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {routines.map((r, idx) => (
            <Card key={idx} className="hover:border-blue-400 transition-colors">
              <CardContent className="p-5 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {r.type}
                  </span>
                  <h3 className="font-bold text-base text-slate-900 pt-1">{r.title}</h3>
                  <p className="text-xs text-slate-500">শ্রেণি: {r.class} • সাইজ: {r.size}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1 shrink-0 text-xs"
                  onClick={() => toast.success(`"${r.title}" ডাউনলোড শুরু হয়েছে (PDF)!`)}
                >
                  <Download className="h-3.5 w-3.5" />
                  ডাউনলোড
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
