"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GraduationCap, Menu, X, ArrowRight, Phone, Mail, Award, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PublicNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [schoolInfo, setSchoolInfo] = useState({
    nameBn: "অগ্রদূত আদর্শ উচ্চ বিদ্যালয়",
    sloganBn: "জ্ঞান, শৃঙ্খলা ও আদর্শের আলোকবর্তিকা",
    logoUrl: "",
    eiin: "১২৩৪৫৬",
    establishedYear: "১৯৯৫",
    phone: "+৮৮০ ১৮০০-০০০০০০",
    email: "info@schoolname.edu.bd",
  });

  React.useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data?.settings) {
          setSchoolInfo({
            nameBn: data.settings.nameBn || "অগ্রদূত আদর্শ উচ্চ বিদ্যালয়",
            sloganBn: data.settings.sloganBn || "জ্ঞান, শৃঙ্খলা ও আদর্শের আলোকবর্তিকা",
            logoUrl: data.settings.logoUrl || "",
            eiin: data.settings.eiin || "১২৩৪৫৬",
            establishedYear: data.settings.establishedYear || "১৯৯৫",
            phone: data.settings.phone || "+৮৮০ ১৮০০-০০০০০০",
            email: data.settings.email || "info@schoolname.edu.bd",
          });
        }
      })
      .catch(() => {});
  }, []);

  const navLinks = [
    { label: "হোম", href: "/" },
    { label: "পরিচিতি", href: "/about" },
    { label: "শিক্ষক ও কর্মকর্তা", href: "/teachers" },
    { label: "অনলাইন ভর্তি", href: "/admissions" },
    { label: "নোটিশ বোর্ড", href: "/notices" },
    { label: "ফলাফল", href: "/results" },
    { label: "ক্লাস রুটিন", href: "/routines" },
    { label: "গ্যালারি", href: "/gallery" },
    { label: "যোগাযোগ", href: "/contact" },
  ];

  return (
    <header className="w-full bg-white border-b border-slate-200/80 sticky top-0 z-40 shadow-xs">
      {/* Top emergency & information bar */}
      <div className="bg-blue-900 text-blue-100 text-xs py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Phone className="h-3 w-3 text-blue-300" />
              <span>হেল্পলাইন: {schoolInfo.phone}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="h-3 w-3 text-blue-300" />
              <span>ইমেইল: {schoolInfo.email}</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-amber-300 font-medium">
              <Award className="h-3.5 w-3.5" />
              <span>EIIN: {schoolInfo.eiin} | স্থাপিত: {schoolInfo.establishedYear} খ্রি.</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & School Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-linear-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform overflow-hidden">
              {schoolInfo.logoUrl ? (
                <img
                  src={schoolInfo.logoUrl}
                  alt={schoolInfo.nameBn}
                  className="w-full h-full object-contain p-1"
                />
              ) : (
                <GraduationCap className="h-7 w-7" />
              )}
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {schoolInfo.nameBn}
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                {schoolInfo.sloganBn}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50/70 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions & ERP Login */}
          <div className="hidden sm:flex items-center gap-3">
            <Link href="/login">
              <Button variant="primary" size="md" className="gap-2 shadow-sm font-semibold">
                <Lock className="h-4 w-4" />
                <span>ইআরপি লগইন</span>
              </Button>
            </Link>
          </div>

          {/* Mobile hamburger button */}
          <div className="lg:hidden flex items-center gap-2">
            <Link href="/login" className="sm:hidden">
              <Button size="sm" variant="primary">
                ইআরপি
              </Button>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="মেনু খুলুন"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-lg animate-in slide-in-from-top-2">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full justify-center">ইআরপি ড্যাশবোর্ড লগইন</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
