"use client";

import React, { useState } from "react";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { PublicFooter } from "@/components/layout/public-footer";
import { Bell, Search, Calendar, Download, FileText, Pin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function PublicNoticesPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const notices = [
    {
      id: "1",
      title: "২০২৬ শিক্ষাবর্ষে ৬ষ্ঠ থেকে ৯ম শ্রেণিতে নতুন ভর্তি বিজ্ঞপ্তি ও ফরম পূরণ",
      category: "ভর্তি",
      date: "১৫ জানুয়ারি, ২০২৬",
      description: "অগ্রদূত আদর্শ উচ্চ বিদ্যালয়ে ২০২৬ শিক্ষাবর্ষের ভর্তি কার্যক্রম শুরু হয়েছে। আগ্রহী প্রার্থীরা অনলাইনে বা বিদ্যালয় কার্যালয় থেকে সরাসরি আবেদনপত্র সংগ্রহ করতে পারবে।",
      isPinned: true,
    },
    {
      id: "2",
      title: "এসএসসি পরীক্ষা ২০২৬-এর ফরম পূরণ সংক্রান্ত জরুরি নির্দেশনা",
      category: "পরীক্ষা",
      date: "১২ জানুয়ারি, ২০২৬",
      description: "২০২৬ সালের এসএসসি পরীক্ষার্থীদের ফরম পূরণ ও ফি জমার বিস্তারিত সময়সূচি প্রকাশিত হয়েছে।",
      isPinned: true,
    },
    {
      id: "3",
      title: "বার্ষিক ক্রীড়া প্রতিযোগিতা ও সাংস্কৃতিক সপ্তাহ ২০২৬ এর সময়সূচি",
      category: "অনুষ্ঠান",
      date: "০৮ জানুয়ারি, ২০২৬",
      description: "বিদ্যালয় মাঠে অনুষ্ঠিতব্য ক্রীড়া প্রতিযোগিতায় অংশগ্রহণের জন্য শ্রেণি শিক্ষকদের নিকট নাম জমা দেওয়ার আহ্বান জানানো হচ্ছে।",
      isPinned: false,
    },
    {
      id: "4",
      title: "অর্ধ-বার্ষিক পরীক্ষা ও প্রথম সাময়িক মূল্যায়নের সংশোধিত রুটিন প্রকাশ",
      category: "একাডেমিক",
      date: "০৩ জানুয়ারি, ২০২৬",
      description: "৬ষ্ঠ থেকে ১০ম শ্রেণির শিক্ষার্থীদের অবগতির জন্য অর্ধ-বার্ষিক পরীক্ষার সংশোধিত রুটিন প্রকাশ করা হলো।",
      isPinned: false,
    },
  ];

  const filtered = notices.filter((n) => {
    const matchesSearch = n.title.includes(search) || n.description.includes(search);
    const matchesCat = selectedCategory === "ALL" || n.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <PublicNavbar />

      <section className="bg-blue-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-2">
          <span className="text-xs uppercase tracking-wider text-blue-300 font-bold bg-blue-800/80 px-3 py-1 rounded-full">
            অফিসিয়াল নোটিশ বোর্ড
          </span>
          <h1 className="text-3xl font-extrabold">বিদ্যালয়ের জরুরি নোটিশ ও বিজ্ঞপ্তি</h1>
          <p className="text-sm text-blue-200">
            ভর্তি, পরীক্ষা, ছুটির তালিকা ও শিক্ষা সংক্রান্ত সকল আনুষ্ঠানিক তথ্যাবলী
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-6 w-full flex-1">
        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="নোটিশ খুঁজুন..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 text-xs font-semibold rounded-lg border border-slate-300 bg-white"
            >
              <option value="ALL">সকল ক্যাটাগরি</option>
              <option value="ভর্তি">ভর্তি</option>
              <option value="পরীক্ষা">পরীক্ষা</option>
              <option value="অনুষ্ঠান">অনুষ্ঠান</option>
              <option value="একাডেমিক">একাডেমিক</option>
            </select>
          </div>
        </div>

        {/* Notices Cards */}
        <div className="space-y-4">
          {filtered.map((item) => (
            <Card key={item.id} className="hover:border-blue-400 transition-colors">
              <CardContent className="p-6 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Badge variant={item.category === "ভর্তি" ? "warning" : "default"}>
                      {item.category}
                    </Badge>
                    {item.isPinned && (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                        <Pin className="h-3 w-3" /> পিন করা
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" /> {item.date}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>

                <div className="pt-2 flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 text-xs text-blue-700 hover:bg-blue-50"
                    onClick={() => toast.success("নোটিশ সংযুক্তি ডাউনলোড শুরু হয়েছে (PDF)।")}
                  >
                    <Download className="h-3.5 w-3.5" />
                    বিজ্ঞপ্তি ডাউনলোড করুন (PDF)
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
