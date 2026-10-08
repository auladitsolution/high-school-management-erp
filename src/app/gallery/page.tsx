"use client";

import React, { useState, useMemo } from "react";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { PublicFooter } from "@/components/layout/public-footer";
import {
  Sparkles,
  Camera,
  Maximize2,
  Calendar,
  Tag,
  X,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface GalleryItem {
  id: string;
  title: string;
  category: "campus" | "labs" | "sports" | "cultural" | "awards";
  categoryLabel: string;
  date: string;
  imageUrl: string;
  description: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "1",
    title: "বিদ্যালয়ের প্রধান একাডেমিক ভবন ও মনোরম প্রাঙ্গণ",
    category: "campus",
    categoryLabel: "ক্যাম্পাস ও পরিবেশ",
    date: "১৫ জানুয়ারি, ২০২৬",
    imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?w=1200&auto=format&fit=crop&q=80",
    description: "সবুজ শ্যামল ছায়াঘেরা পরিবেশে অবস্থিত বিদ্যালয়ের সুপরিসর চারতলা আধুনিক একাডেমিক ভবন ও সামনের সুবিশাল খেলার মাঠ।",
  },
  {
    id: "2",
    title: "উন্নত পদার্থ ও রসায়ন বিজ্ঞানাগারে শিক্ষার্থীদের গবেষণা",
    category: "labs",
    categoryLabel: "বিজ্ঞান ও কম্পিউটার ল্যাব",
    date: "০২ ফেব্রুয়ারি, ২০২৬",
    imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&auto=format&fit=crop&q=80",
    description: "বিশেষজ্ঞ শিক্ষকমণ্ডলীর সরাসরি তত্ত্বাবধানে ব্যবহারিক ক্লাসে শিক্ষার্থীরা বিজ্ঞানভিত্তিক বিভিন্ন পরীক্ষণ সম্পন্ন করছে।",
  },
  {
    id: "3",
    title: "বার্ষিক ক্রীড়া প্রতিযোগিতা ও অ্যাথলেটিকস মিট",
    category: "sports",
    categoryLabel: "বার্ষিক ক্রীড়া প্রতিযোগিতা",
    date: "২০ জানুয়ারি, ২০২৬",
    imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&auto=format&fit=crop&q=80",
    description: "শিক্ষার্থীদের শারীরিক সুস্থতা ও ক্রীড়াশৈলী প্রদর্শনে বিদ্যালয় প্রাঙ্গণে আয়োজিত বর্ণাঢ্য বার্ষিক ক্রীড়া উৎসবের মুহূর্ত।",
  },
  {
    id: "4",
    title: "আন্তঃবিদ্যালয় বিজ্ঞান মেলায় উদ্ভাবনী রোবটিক্স প্রজেক্ট",
    category: "labs",
    categoryLabel: "বিজ্ঞান ও কম্পিউটার ল্যাব",
    date: "২৮ ফেব্রুয়ারি, ২০২৬",
    imageUrl: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=1200&auto=format&fit=crop&q=80",
    description: "বিদ্যালয়ের তথ্যপ্রযুক্তি ও রোবটিক্স ক্লাবের শিক্ষার্থীরা স্ব-উদ্ভাবিত স্মার্ট ডাস্টবিন ও স্বয়ংক্রিয় সেচ প্রকল্পের মডেল উপস্থাপন করছে।",
  },
  {
    id: "5",
    title: "আন্তর্জাতিক মাতৃভাষা দিবস ও শহীদ দিবসের প্রভাতফেরি",
    category: "cultural",
    categoryLabel: "সাংস্কৃতিক ও জাতীয় দিবস",
    date: "২১ ফেব্রুয়ারি, ২০২৬",
    imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&auto=format&fit=crop&q=80",
    description: "অমর একুশে ফেব্রুয়ারিতে বিদ্যালয়ের শহীদ মিনারে পুষ্পস্তবক অর্পণ ও শিক্ষার্থীদের অংশগ্রহণে মনোজ্ঞ কবিতা আবৃত্তি ও সাংস্কৃতিক পরিবেশনা।",
  },
  {
    id: "6",
    title: "এসএসসি পরীক্ষায় জিপিএ-৫ প্রাপ্ত কৃতি সংবর্ধনা",
    category: "awards",
    categoryLabel: "পুরস্কার ও সমাবর্তন",
    date: "১০ মার্চ, ২০২৬",
    imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80",
    description: "ঢাকা শিক্ষা বোর্ডের অধীনে এসএসসি পরীক্ষায় শতভাগ পাস ও জিপিএ-৫ প্রাপ্ত কৃতি শিক্ষার্থীদের সম্মাননা স্মারক ও ক্রেস্ট প্রদান।",
  },
  {
    id: "7",
    title: "শীতাতপ নিয়ন্ত্রিত আধুনিক ডিজিটাল কম্পিউটার ল্যাব",
    category: "labs",
    categoryLabel: "বিজ্ঞান ও কম্পিউটার ল্যাব",
    date: "০৫ জানুয়ারি, ২০২৬",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&auto=format&fit=crop&q=80",
    description: "৫০টি আধুনিক কম্পিউটার সমৃদ্ধ ল্যাবে শিক্ষার্থীরা পাইথন কোডিং, ওয়েব ডেভেলপমেন্ট ও আইসিটি ব্যবহারিক প্রশিক্ষণ গ্রহণ করছে।",
  },
  {
    id: "8",
    title: "আন্তঃহাউজ ফুটবল টুর্নামেন্টের ফাইনাল ম্যাচ",
    category: "sports",
    categoryLabel: "বার্ষিক ক্রীড়া প্রতিযোগিতা",
    date: "১৮ জানুয়ারি, ২০২৬",
    imageUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&auto=format&fit=crop&q=80",
    description: "পদ্মা হাউস ও মেঘনা হাউসের মধ্যে টানটান উত্তেজনাকর ফাইনাল ম্যাচে শিক্ষার্থীদের চমৎকার ফুটবল ক্রীড়া নৈপুণ্য।",
  },
  {
    id: "9",
    title: "ডিজিটাল লাইব্রেরিতে শিক্ষার্থীদের অধ্যয়ন ও পাঠাভ্যাস",
    category: "campus",
    categoryLabel: "ক্যাম্পাস ও পরিবেশ",
    date: "১২ ফেব্রুয়ারি, ২০২৬",
    imageUrl: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1200&auto=format&fit=crop&q=80",
    description: "১০,০০০+ বই ও ই-বুক সমৃদ্ধ শান্ত পরিবেশে শিক্ষার্থীরা নিয়মিত জ্ঞানচর্চা ও পাঠ্যপুস্তকের বাইরের সাহিত্য অধ্যয়ন করছে।",
  },
  {
    id: "10",
    title: "মহান বিজয় দিবস উপলক্ষে চিত্রাঙ্কন ও বিতর্ক প্রতিযোগিতা",
    category: "cultural",
    categoryLabel: "সাংস্কৃতিক ও জাতীয় দিবস",
    date: "১৬ ডিসেম্বর, ২০২৫",
    imageUrl: "https://images.unsplash.com/photo-1460518451282-9742116277d3?w=1200&auto=format&fit=crop&q=80",
    description: "মুক্তিযুদ্ধের চেতনায় উদ্বুদ্ধ হয়ে শিক্ষার্থীদের স্বতঃস্ফূর্ত অংশগ্রহণে অনুষ্ঠিত চিত্রাঙ্কন ও জাতীয় বিতর্ক আসর।",
  },
  {
    id: "11",
    title: "স্কাউটস ও গার্ল গাইডস সদস্যদের হাইকিং ও সমাজসেবা ক্যাম্প",
    category: "cultural",
    categoryLabel: "সাংস্কৃতিক ও জাতীয় দিবস",
    date: "০৫ ফেব্রুয়ারি, ২০২৬",
    imageUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1200&auto=format&fit=crop&q=80",
    description: "শৃঙ্খলার পাঠ নিতে বিদ্যালয়ের স্কাউট দলের বৃক্ষরোপণ অভিযান, ট্রাফিক সচেতনতা ও বার্ষিক তাবু বাস ক্যাম্পিং।",
  },
  {
    id: "12",
    title: "বার্ষিক মেধা পুরস্কার ও শ্রেষ্ঠ শিক্ষার্থী সম্মাননা বিতরণ",
    category: "awards",
    categoryLabel: "পুরস্কার ও সমাবর্তন",
    date: "২২ জানুয়ারি, ২০২৬",
    imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&auto=format&fit=crop&q=80",
    description: "বিদ্যালয় পরিচালনা পর্ষদের সভাপতি ও প্রধান শিক্ষক মহোদয়ের হাত থেকে বছরের শ্রেষ্ঠ শিক্ষার্থীদের ক্রেস্ট ও বৃত্তি গ্রহণ।",
  },
];

export default function PublicGalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);

  const categories = [
    { id: "all", label: "সব ছবি ও অ্যালবাম" },
    { id: "campus", label: "ক্যাম্পাস ও পরিবেশ" },
    { id: "labs", label: "বিজ্ঞান ও ল্যাবসমূহ" },
    { id: "sports", label: "খেলাধুলা ও ক্রীড়া" },
    { id: "cultural", label: "সাংস্কৃতিক ও জাতীয় দিবস" },
    { id: "awards", label: "পুরস্কার ও কৃতিত্ব" },
  ];

  const filteredItems = useMemo(() => {
    if (selectedCategory === "all") return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const activeItem = activeItemIndex !== null ? filteredItems[activeItemIndex] : null;

  const handleNext = () => {
    if (activeItemIndex === null) return;
    setActiveItemIndex((prev) => (prev! + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    if (activeItemIndex === null) return;
    setActiveItemIndex((prev) => (prev! - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <PublicNavbar />

      {/* Hero Header */}
      <section className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white py-14 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-7xl mx-auto text-center space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-blue-200 font-bold bg-blue-800/80 border border-blue-700/60 px-3.5 py-1 rounded-full">
            <Camera className="h-3.5 w-3.5 text-amber-300" />
            <span>চিত্রপট ও স্মৃতিচিহ্ন</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            ফটোগ্রাফি ও ইভেন্ট গ্যালারি
          </h1>
          <p className="text-sm sm:text-base text-blue-200 max-w-2xl mx-auto leading-relaxed">
            অগ্রদূত আদর্শ উচ্চ বিদ্যালয়ের মনোরম ক্যাম্পাস, সহশিক্ষা কার্যক্রম, বার্ষিক ক্রীড়া ও শিক্ষার্থীদের গৌরবের মুহূর্তসমূহ।
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 w-full flex-1">
        {/* Category Filter Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin w-full sm:w-auto">
            {categories.map((c) => {
              const active = selectedCategory === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedCategory(c.id);
                    setActiveItemIndex(null);
                  }}
                  className={`text-xs px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
                    active
                      ? "bg-blue-600 text-white shadow-xs shadow-blue-500/20"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200/80"
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>

          <div className="text-xs text-slate-500 font-medium hidden sm:block">
            মোট ছবি: <span className="font-bold text-blue-700">{filteredItems.length}</span> টি
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <Card
              key={item.id}
              onClick={() => setActiveItemIndex(idx)}
              className="group cursor-pointer overflow-hidden border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 bg-white rounded-2xl flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="p-3 bg-white/90 backdrop-blur-xs rounded-full text-slate-800 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <Maximize2 className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-900/80 backdrop-blur-xs text-white px-2.5 py-1 rounded-md">
                      {item.categoryLabel}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-2">
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Date Footer */}
              <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-slate-500">
                <Calendar className="h-3 w-3 text-slate-400" />
                <span>{item.date}</span>
              </div>
            </Card>
          ))}
        </div>
      </main>

      {/* Lightbox Modal */}
      {activeItem && activeItemIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          {/* Close button */}
          <button
            onClick={() => setActiveItemIndex(null)}
            className="absolute top-4 right-4 z-50 p-2 text-white/80 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Prev button */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 text-white/80 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded-full transition-colors hidden sm:block"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Next button */}
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 text-white/80 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded-full transition-colors hidden sm:block"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Modal Content */}
          <div className="max-w-4xl w-full max-h-[90vh] flex flex-col bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden max-h-[65vh]">
              <img
                src={activeItem.imageUrl}
                alt={activeItem.title}
                className="max-h-[65vh] w-auto max-w-full object-contain mx-auto"
              />
            </div>
            <div className="p-5 text-white bg-slate-900 border-t border-slate-800 space-y-2">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-xs bg-blue-600 px-2.5 py-0.5 rounded-full font-bold">
                  {activeItem.categoryLabel}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {activeItem.date}
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-100">{activeItem.title}</h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeItem.description}
              </p>
            </div>
          </div>
        </div>
      )}

      <PublicFooter />
    </div>
  );
}
