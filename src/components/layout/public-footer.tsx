"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap, Phone, Mail, MapPin, Globe, ShieldCheck } from "lucide-react";

export function PublicFooter() {
  const [schoolInfo, setSchoolInfo] = React.useState({
    nameBn: "অগ্রদূত আদর্শ উচ্চ বিদ্যালয়",
    eiin: "১২৩৪৫৬",
    address: "কলেজ রোড, ধানমন্ডি, ঢাকা - ১২০৫, বাংলাদেশ",
    phone: "+৮৮০ ১৮০০-০০০০০০",
    email: "info@schoolname.edu.bd",
    logoUrl: "",
    establishedYear: "১৯৯৫",
  });

  React.useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data?.settings) {
          setSchoolInfo({
            nameBn: data.settings.nameBn || "অগ্রদূত আদর্শ উচ্চ বিদ্যালয়",
            eiin: data.settings.eiin || "১২৩৪৫৬",
            address: data.settings.address || "কলেজ রোড, ধানমন্ডি, ঢাকা - ১২০৫, বাংলাদেশ",
            phone: data.settings.phone || "+৮৮০ ১৮০০-০০০০০০",
            email: data.settings.email || "info@schoolname.edu.bd",
            logoUrl: data.settings.logoUrl || "",
            establishedYear: data.settings.establishedYear || "১৯৯৫",
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: School Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white overflow-hidden">
                {schoolInfo.logoUrl ? (
                  <img src={schoolInfo.logoUrl} alt={schoolInfo.nameBn} className="w-full h-full object-contain p-1" />
                ) : (
                  <GraduationCap className="h-6 w-6" />
                )}
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">{schoolInfo.nameBn}</h3>
                <p className="text-xs text-slate-400">EIIN: {schoolInfo.eiin}</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              {schoolInfo.establishedYear} সাল থেকে মানসম্মত শিক্ষা, সুশৃঙ্খল চরিত্র গঠন এবং ভবিষ্যৎ নেতৃত্ব তৈরিতে নিবেদিতপ্রাণ একটি অগ্রগামী শিক্ষা প্রতিষ্ঠান।
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="h-4 w-4" />
              <span>মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষা বোর্ড, ঢাকা অনুমোদিত</span>
            </div>
          </div>

          {/* Col 2: Important Links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-base border-b border-slate-800 pb-2">জরুরি লিংক</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/teachers" className="hover:text-blue-400 transition-colors">
                  শিক্ষক ও কর্মকর্তা পরিষদ
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-blue-400 transition-colors">
                  ফটোগ্রাফি ও ইভেন্ট গ্যালারি
                </Link>
              </li>
              <li>
                <Link href="/admissions" className="hover:text-blue-400 transition-colors">
                  অনলাইন ভর্তি আবেদন
                </Link>
              </li>
              <li>
                <Link href="/notices" className="hover:text-blue-400 transition-colors">
                  সকল জরুরি নোটিশ
                </Link>
              </li>
              <li>
                <Link href="/results" className="hover:text-blue-400 transition-colors">
                  পরীক্ষার ফলাফল ও মার্কশিট
                </Link>
              </li>
              <li>
                <Link href="/routines" className="hover:text-blue-400 transition-colors">
                  ক্লাস ও পরীক্ষার রুটিন
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Government and Education Portals */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-base border-b border-slate-800 pb-2">জাতীয় পোর্টাল</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://moedu.gov.bd" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5" />
                  শিক্ষা মন্ত্রণালয়
                </a>
              </li>
              <li>
                <a href="https://dhakaeducationboard.gov.bd" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5" />
                  ঢাকা শিক্ষা বোর্ড
                </a>
              </li>
              <li>
                <a href="https://bangladesh.gov.bd" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5" />
                  জাতীয় তথ্য বাতায়ন
                </a>
              </li>
              <li>
                <a href="https://nctb.gov.bd" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5" />
                  জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-base border-b border-slate-800 pb-2">কার্যালয় ও যোগাযোগ</h4>
            <div className="space-y-3 text-sm text-slate-400">
              <p className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{schoolInfo.address}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-blue-400 shrink-0" />
                <span>{schoolInfo.phone}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-blue-400 shrink-0" />
                <span>{schoolInfo.email}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start text-slate-400 gap-1 sm:gap-0">
            <span>© ২০২৬ {schoolInfo.nameBn}। সর্বস্বত্ব সংরক্ষিত।</span>
            <span className="hidden sm:inline mx-2 text-slate-600">|</span>
            <span className="whitespace-nowrap">
              Developed by{" "}
              <a
                href="https://itsolution.auladhossen.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 font-semibold hover:underline transition-colors"
              >
                Aulad IT Solution
              </a>
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 sm:gap-6">
            <Link href="/privacy" className="hover:text-slate-400 transition-colors">
              গোপনীয়তা নীতি
            </Link>
            <Link href="/terms" className="hover:text-slate-400 transition-colors">
              ব্যবহারের শর্তাবলী
            </Link>
            <Link href="/login" className="text-blue-400 hover:text-blue-300 transition-colors">
              প্রশাসনিক ইআরপি পোর্টাল
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
