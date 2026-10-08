"use client";

import React, { useState, useMemo } from "react";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { PublicFooter } from "@/components/layout/public-footer";
import {
  Users,
  Search,
  Mail,
  Phone,
  BookOpen,
  GraduationCap,
  Award,
  Sparkles,
  Building2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface PublicTeacher {
  id: string;
  nameBn: string;
  nameEn: string;
  designation: string;
  department: string;
  category: "admin" | "science" | "math_ict" | "language" | "humanities" | "staff";
  qualification: string;
  assignedSubjects: string;
  isClassTeacher?: string;
  phone: string;
  email: string;
  photoUrl: string;
}

const TEACHERS_LIST: PublicTeacher[] = [
  {
    id: "1",
    nameBn: "ড. মোহাম্মদ আব্দুল্লাহ",
    nameEn: "Dr. Mohammad Abdullah",
    designation: "প্রধান শিক্ষক / অধ্যক্ষ",
    department: "প্রশাসন ও উচ্চতর গণিত",
    category: "admin",
    qualification: "এম.এসসি (গণিত, ১ম শ্রেণি), বি.এড, পিএইচডি",
    assignedSubjects: "উচ্চতর গণিত, পরিসংখ্যান",
    phone: "০১৭০০-০০০০০১",
    email: "principal@school.edu.bd",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "2",
    nameBn: "কাজী রফিকুল ইসলাম",
    nameEn: "Kazi Rafiqul Islam",
    designation: "সহকারী প্রধান শিক্ষক",
    department: "প্রশাসন ও বিজ্ঞান",
    category: "admin",
    qualification: "এম.এসসি (পদার্থবিজ্ঞান), বি.এড",
    assignedSubjects: "পদার্থবিজ্ঞান",
    phone: "০১৮০০-০০০০০২",
    email: "viceprincipal@school.edu.bd",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "3",
    nameBn: "মোছাঃ শাহনাজ পারভীন",
    nameEn: "Mst. Shahnaz Parvin",
    designation: "সিনিয়র শিক্ষক (বিজ্ঞান)",
    department: "বিজ্ঞান বিভাগ",
    category: "science",
    qualification: "এম.এসসি (রসায়নবিজ্ঞান, ঢাবি), বি.এড",
    assignedSubjects: "রসায়নবিজ্ঞান, সাধারণ বিজ্ঞান",
    isClassTeacher: "১০ম শ্রেণি (বিজ্ঞান)",
    phone: "০১৯০০-০০০০০৩",
    email: "shahnaz@school.edu.bd",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "4",
    nameBn: "তানভীর আহমেদ",
    nameEn: "Tanvir Ahmed",
    designation: "প্রভাষক / সহকারী শিক্ষক (আইসিটি)",
    department: "তথ্য ও যোগাযোগ প্রযুক্তি",
    category: "math_ict",
    qualification: "বি.এসসি ও এম.এসসি (সিএসই, বুয়েট)",
    assignedSubjects: "তথ্য ও যোগাযোগ প্রযুক্তি, কম্পিউটার বিজ্ঞান",
    isClassTeacher: "৯ম শ্রেণি (ক শাখা)",
    phone: "০১৬০০-০০০০০৪",
    email: "tanvir.ict@school.edu.bd",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "5",
    nameBn: "মাহমুদা আক্তার",
    nameEn: "Mahmuda Akter",
    designation: "সিনিয়র শিক্ষক (ইংরেজি)",
    department: "ভাষা ও সাহিত্য",
    category: "language",
    qualification: "এম.এ (ইংরেজি সাহিত্য, জাবি), বি.এড",
    assignedSubjects: "ইংরেজি ১ম ও ২য় পত্র",
    isClassTeacher: "৮ম শ্রেণি (খ শাখা)",
    phone: "০১৫০০-০০০০০৫",
    email: "mahmuda.eng@school.edu.bd",
    photoUrl: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "6",
    nameBn: "আব্দুর রহমান",
    nameEn: "Abdur Rahman",
    designation: "সিনিয়র শিক্ষক (বাংলা)",
    department: "ভাষা ও সাহিত্য",
    category: "language",
    qualification: "এম.এ (বাংলা, রাবি), বি.এড (১ম শ্রেণি)",
    assignedSubjects: "বাংলা ১ম পত্র, বাংলা ব্যাকরণ",
    isClassTeacher: "৭ম শ্রেণি (ক শাখা)",
    phone: "০১৭০০-০০০০০৬",
    email: "abdur.bangla@school.edu.bd",
    photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "7",
    nameBn: "ফাতেমা খাতুন",
    nameEn: "Fatema Khatun",
    designation: "সহকারী শিক্ষক (জীববিজ্ঞান)",
    department: "বিজ্ঞান বিভাগ",
    category: "science",
    qualification: "এম.এসসি (উদ্ভিদবিজ্ঞান), বি.এড",
    assignedSubjects: "জীববিজ্ঞান, পরিবেশ বিজ্ঞান",
    phone: "০১৮০০-০০০০০৭",
    email: "fatema.bio@school.edu.bd",
    photoUrl: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "8",
    nameBn: "মোস্তফা কামাল",
    nameEn: "Mostafa Kamal",
    designation: "সহকারী শিক্ষক (ব্যবসায় শিক্ষা)",
    department: "ব্যবসায় ও মানবিক বিভাগ",
    category: "humanities",
    qualification: "এম.বি.এ (হিসাববিজ্ঞান), বি.এড",
    assignedSubjects: "হিসাববিজ্ঞান, ফিন্যান্স ও ব্যাংকিং",
    phone: "০১৯০০-০০০০০৮",
    email: "kamal.commerce@school.edu.bd",
    photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "9",
    nameBn: "আনোয়ার সাদাত",
    nameEn: "Anwar Sadat",
    designation: "সহকারী শিক্ষক (গণিত)",
    department: "গণিত বিভাগ",
    category: "math_ict",
    qualification: "এম.এসসি (গণিত), বি.এড",
    assignedSubjects: "সাধারণ গণিত, জ্যামিতি",
    phone: "০১৬০০-০০০০০৯",
    email: "anwar.math@school.edu.bd",
    photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "10",
    nameBn: "মোঃ কামাল হোসেন",
    nameEn: "Md. Kamal Hossain",
    designation: "প্রধান হিসাবরক্ষণ কর্মকর্তা",
    department: "হিসাব ও অর্থ বিভাগ",
    category: "staff",
    qualification: "এম.কম (হিসাববিজ্ঞান), সিএ (সিসি)",
    assignedSubjects: "প্রাতিষ্ঠানিক হিসাব ও ফি ব্যবস্থাপনা",
    phone: "০১৭০০-০০০০১০",
    email: "accounts@school.edu.bd",
    photoUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "11",
    nameBn: "মাহিন সুলতানা",
    nameEn: "Mahin Sultana",
    designation: "প্রধান গ্রন্থাগারিক",
    department: "গ্রন্থাগার ও তথ্য ব্যবস্থাপনা",
    category: "staff",
    qualification: "এম.এ (তথ্যবিজ্ঞান ও গ্রন্থাগার ব্যবস্থাপনা)",
    assignedSubjects: "ডিজিটাল লাইব্রেরি পরিচালনা",
    phone: "০১৮০০-০০০০১১",
    email: "library@school.edu.bd",
    photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "12",
    nameBn: "মোঃ জসীম উদ্দীন",
    nameEn: "Md. Jasim Uddin",
    designation: "অফিস সহকারী ও কম্পিউটার অপারেটর",
    department: "প্রশাসনিক শাখা",
    category: "staff",
    qualification: "বি.এ (সম্মান), ডিপ্লোমা ইন কম্পিউটার সায়েন্স",
    assignedSubjects: "দাপ্তরিক যোগাযোগ ও ভর্তি সহায়তা",
    phone: "০১৯০০-০০০০১২",
    email: "office@school.edu.bd",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
  },
];

export default function PublicTeachersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "সকল শিক্ষক ও কর্মকর্তা" },
    { id: "admin", label: "প্রশাসন পরিষদ" },
    { id: "science", label: "বিজ্ঞান বিভাগ" },
    { id: "math_ict", label: "গণিত ও আইসিটি" },
    { id: "language", label: "ভাষা ও সাহিত্য" },
    { id: "humanities", label: "ব্যবসায় ও মানবিক" },
    { id: "staff", label: "কর্মকর্তা ও কর্মচারী" },
  ];

  const filteredTeachers = useMemo(() => {
    return TEACHERS_LIST.filter((t) => {
      const matchesCategory =
        selectedCategory === "all" || t.category === selectedCategory;
      const term = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !term ||
        t.nameBn.toLowerCase().includes(term) ||
        t.nameEn.toLowerCase().includes(term) ||
        t.designation.toLowerCase().includes(term) ||
        t.department.toLowerCase().includes(term) ||
        t.assignedSubjects.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <PublicNavbar />

      {/* Hero Header */}
      <section className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white py-14 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-7xl mx-auto text-center space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-blue-200 font-bold bg-blue-800/80 border border-blue-700/60 px-3.5 py-1 rounded-full">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            <span>প্রজ্ঞাবান ও আদর্শ শিক্ষকমণ্ডলী</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            শিক্ষক ও কর্মকর্তা পরিষদ
          </h1>
          <p className="text-sm sm:text-base text-blue-200 max-w-2xl mx-auto leading-relaxed">
            অগ্রদূত আদর্শ উচ্চ বিদ্যালয়ের দক্ষ, নিবেদিতপ্রাণ শিক্ষক ও কর্মকর্তা-কর্মচারীবৃন্দ যারা ভবিষ্যৎ প্রজন্ম গঠনে নিরলস ভূমিকা পালন করছেন।
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 w-full flex-1">
        {/* Search & Filter Controls */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="শিক্ষক বা কর্মকর্তার নাম, পদবী বা বিষয় খুঁজুন..."
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              />
            </div>

            {/* Total Count */}
            <div className="text-xs text-slate-500 font-medium">
              মোট প্রদর্শিত: <span className="font-bold text-blue-700">{filteredTeachers.length}</span> জন
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            {categories.map((c) => {
              const active = selectedCategory === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`text-xs px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
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
        </div>

        {/* Teachers Grid */}
        {filteredTeachers.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
            <Users className="h-12 w-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">কোন তথ্য পাওয়া যায়নি</h3>
            <p className="text-xs text-slate-500">
              অনুগ্রহ করে অন্য কোনো নাম বা বিষয় লিখে পুনরায় সন্ধান করুন।
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTeachers.map((teacher) => (
              <Card
                key={teacher.id}
                className="group overflow-hidden border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between bg-white rounded-2xl"
              >
                <div>
                  {/* Photo Container */}
                  <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                    <img
                      src={teacher.photoUrl}
                      alt={teacher.nameBn}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    
                    {/* Badge on photo */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-600/90 backdrop-blur-xs px-2 py-0.5 rounded-md inline-block mb-1">
                        {teacher.department}
                      </span>
                      <h3 className="font-bold text-base leading-snug drop-shadow-sm">
                        {teacher.nameBn}
                      </h3>
                      <p className="text-xs text-blue-100/90 font-medium">
                        {teacher.nameEn}
                      </p>
                    </div>
                  </div>

                  <CardContent className="p-4 space-y-3">
                    {/* Designation */}
                    <div>
                      <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200/80 px-2.5 py-0.5 rounded-lg inline-block">
                        {teacher.designation}
                      </span>
                    </div>

                    {/* Class Teacher Tag if exists */}
                    {teacher.isClassTeacher && (
                      <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2.5 py-1 rounded-lg font-medium">
                        <Award className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                        <span>শ্রেণি শিক্ষক: {teacher.isClassTeacher}</span>
                      </div>
                    )}

                    {/* Qualification */}
                    <div className="flex items-start gap-2 text-xs text-slate-600 pt-1">
                      <GraduationCap className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed font-medium">{teacher.qualification}</span>
                    </div>

                    {/* Assigned Subjects */}
                    <div className="flex items-start gap-2 text-xs text-slate-600">
                      <BookOpen className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{teacher.assignedSubjects}</span>
                    </div>
                  </CardContent>
                </div>

                {/* Contact Footer */}
                <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <a
                    href={`tel:${teacher.phone}`}
                    className="flex items-center gap-1.5 hover:text-blue-600 transition-colors"
                    title={teacher.phone}
                  >
                    <Phone className="h-3.5 w-3.5 text-slate-400" />
                    <span className="font-mono text-[11px]">{teacher.phone}</span>
                  </a>
                  <a
                    href={`mailto:${teacher.email}`}
                    className="flex items-center gap-1 text-slate-400 hover:text-blue-600 transition-colors p-1"
                    title={teacher.email}
                  >
                    <Mail className="h-3.5 w-3.5" />
                  </a>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      <PublicFooter />
    </div>
  );
}
