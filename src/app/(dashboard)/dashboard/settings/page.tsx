"use client";

import React, { useState, useEffect } from "react";
import {
  Settings,
  School,
  Save,
  Globe,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Edit,
  Trash2,
  User,
  Shield,
  AlertTriangle,
  Sparkles,
  Layout,
  MessageSquare,
  BarChart3,
  Users,
  Image as ImageIcon,
  Check,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog } from "@/components/ui/dialog";
import { ImageUpload } from "@/components/ui/image-upload";
import { toast } from "sonner";

interface SettingsFormState {
  // Identity
  nameBn: string;
  nameEn: string;
  sloganBn: string;
  sloganEn: string;
  eiin: string;
  boardCode: string;
  establishedYear: string;
  address: string;
  phone: string;
  email: string;
  logoUrl: string;

  // Homepage
  heroTitle: string;
  heroSubtitle: string;
  bannerImageUrl: string;
  tickerNotice: string;
  admissionOpen: boolean;
  admissionNotice: string;

  // Leadership
  principalName: string;
  principalTitle: string;
  principalQualification: string;
  principalMessage: string;
  principalPhotoUrl: string;

  presidentName: string;
  presidentTitle: string;
  presidentMessage: string;
  presidentPhotoUrl: string;

  // Stats
  statStudents: string;
  statTeachers: string;
  statPassRate: string;
  statGpa5: string;

  // Social
  facebookUrl: string;
  youtubeUrl: string;
  googleMapUrl: string;

  // Academic
  numerals: "bn" | "en";
  academicYear: string;
}

const DEFAULT_FORM: SettingsFormState = {
  nameBn: "অগ্রদূত আদর্শ উচ্চ বিদ্যালয়",
  nameEn: "Agrodut Adarsha High School",
  sloganBn: "জ্ঞান, শৃঙ্খলা ও আদর্শের আলোকবর্তিকা",
  sloganEn: "Beacon of Knowledge, Discipline and Ethics",
  eiin: "১২৩৪৫৬",
  boardCode: "৫৬৭৮",
  establishedYear: "১৯৯৫",
  address: "কলেজ রোড, ধানমন্ডি, ঢাকা - ১২০৫",
  phone: "+৮৮০ ১৮০০-০০০০০০",
  email: "info@schoolname.edu.bd",
  logoUrl: "",

  heroTitle: "অগ্রদূত আদর্শ উচ্চ বিদ্যালয়",
  heroSubtitle:
    "আধুনিক তথ্যপ্রযুক্তিভিত্তিক শিক্ষা, শৃঙ্খলাবোধ এবং মানবিক গুণাবলিসম্পন্ন দেশপ্রেমিক ভবিষ্যৎ নাগরিক গড়ে তুলতে আমরা দৃঢ়প্রতিজ্ঞ।",
  bannerImageUrl: "",
  tickerNotice:
    "২০২৬ শিক্ষাবর্ষে ৬ষ্ঠ থেকে ৯ম শ্রেণিতে অনলাইন ভর্তি আবেদন চলমান রয়েছে। শেষ সময়: ৩০ জানুয়ারি।",
  admissionOpen: true,
  admissionNotice:
    "অনলাইনে সহজ কয়েকটি ধাপে ভর্তির আবেদন সম্পন্ন করুন ও ডিজিটাল প্রবেশপত্র সংগ্রহ করুন।",

  principalName: "ড. মোহাম্মদ আব্দুল্লাহ",
  principalTitle: "প্রধান শিক্ষক / অধ্যক্ষ",
  principalQualification: "এম.এসসি (গণিত), বি.এড, পিএইচডি",
  principalMessage:
    "শিক্ষা কেবল পুথিগত বিদ্যার মধ্যে সীমাবদ্ধ নয়। আদর্শ নাগরিক হিসেবে আত্মপ্রকাশের জন্য শিক্ষার্থীদের মেধা, সৃজনশীলতা, শৃঙ্খলা এবং দেশপ্রেমের মেলবন্ধন ঘটাতে হবে। আমাদের বিদ্যালয় ১৯৯৫ সাল থেকে সেই লক্ষ্যেই নিরলসভাবে কাজ করে চলেছে। প্রতিটি শিক্ষার্থীর সুপ্ত প্রতিভার বিকাশ এবং ডিজিটাল বাংলাদেশের স্মার্ট নাগরিক গঠনে আমাদের সকল শিক্ষক ও কর্মচারী একনিষ্ঠভাবে সচেষ্ট।",
  principalPhotoUrl:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",

  presidentName: "মোঃ আনোয়ারুল ইসলাম",
  presidentTitle: "সভাপতি, পরিচালনা পর্ষদ",
  presidentMessage:
    "সুদক্ষ পরিচালনা পর্ষদ, নিবেদিতপ্রাণ শিক্ষকমণ্ডলী এবং আধুনিক প্রযুক্তির সাহায্যে আমরা এ প্রতিষ্ঠানকে একটি আদর্শ বিদ্যাপীঠ হিসেবে গড়ে তুলেছি।",
  presidentPhotoUrl:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",

  statStudents: "১২৫০+",
  statTeachers: "৪৫ জন",
  statPassRate: "৯৯.৪%",
  statGpa5: "৭২+",

  facebookUrl: "https://facebook.com",
  youtubeUrl: "https://youtube.com",
  googleMapUrl: "",

  numerals: "bn",
  academicYear: "২০২৬",
};

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<
    "general" | "homepage" | "leadership" | "stats_social" | "users"
  >("general");
  const [formData, setFormData] = useState<SettingsFormState>(DEFAULT_FORM);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch settings from API on load
  const loadSettings = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/settings");
      if (res.ok) {
        const data = await res.json();
        if (data.settings) {
          setFormData((prev) => ({
            ...prev,
            ...data.settings,
          }));
        }
      }
    } catch {
      // fallback to default
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "সেটিংস সংরক্ষণ ব্যর্থ হয়েছে");
      }

      toast.success(data.message || "ওয়েবসাইট এবং বিদ্যালয়ের সকল সেটিংস সফলভাবে আপডেট হয়েছে!");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error saving settings";
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: "general", label: "প্রাতিষ্ঠানিক পরিচিতি ও ব্র্যান্ডিং", icon: School },
    { id: "homepage", label: "হোমপেজ ও ব্যানার সেটআপ", icon: Layout },
    { id: "leadership", label: "অধ্যক্ষ ও সভাপতির বাণী", icon: MessageSquare },
    { id: "stats_social", label: "পরিসংখ্যান ও সোশ্যাল লিংক", icon: BarChart3 },
    { id: "users", label: "ইউজার ও প্রাতিষ্ঠানিক রোল", icon: Users },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              বিদ্যালয় ও ওয়েবসাইট পূর্ণাঙ্গ ব্যবস্থাপনা
            </h2>
            <span className="text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-300 px-2 py-0.5 rounded-full">
              সুপার অ্যাডমিন CMS
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            ওয়েবসাইটের ব্র্যান্ডিং, ব্যানার, নোটিশ, বাণী, পরিসংখ্যান এবং ইউজার রোল এক স্থান থেকেই নিয়ন্ত্রণ করুন।
          </p>
        </div>

        {activeTab !== "users" && (
          <Button
            onClick={handleSubmit}
            isLoading={saving}
            className="gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-500/20"
          >
            <Save className="h-4 w-4" />
            সকল সেটিংস সংরক্ষণ করুন
          </Button>
        )}
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
                isActive
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* TAB 1: General Identity & Branding */}
        {activeTab === "general" && (
          <div className="space-y-6">
            <Card>
              <CardHeader className="bg-slate-50/70 border-b border-slate-100">
                <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <School className="h-5 w-5 text-blue-600" />
                  বিদ্যালয়ের নাম, লোগো ও সনদ বিবরণ
                </CardTitle>
                <CardDescription>
                  ওয়েবসাইটের হেডার, ফুটার এবং সকল সরকারি ডকুমেন্টে প্রদর্শিত মূল পরিচিতি
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-5">
                {/* Logo Upload */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-full sm:w-64">
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">
                      বিদ্যালয়ের প্রাতিষ্ঠানিক লোগো (Cloudinary)
                    </label>
                    <ImageUpload
                      value={formData.logoUrl}
                      onChange={(url) => setFormData({ ...formData, logoUrl: url })}
                      folder="general"
                      label="লোগো আপলোড করুন"
                    />
                  </div>
                  <div className="text-xs text-slate-500 space-y-1">
                    <p className="font-bold text-slate-700">লোগোর ব্যবহারের স্থানসমূহ:</p>
                    <p>• ওয়েবসাইটের মূল হেডার ও নেভবার</p>
                    <p>• ডিজিটাল শিক্ষার্থী আইডি কার্ড ও ফলাফল মার্কশিট</p>
                    <p>• প্রাতিষ্ঠানিক সনদ ও বেতন রশিদ</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="বিদ্যালয়ের নাম (বাংলায়) *"
                    value={formData.nameBn}
                    onChange={(e) => setFormData({ ...formData, nameBn: e.target.value })}
                    required
                  />
                  <Input
                    label="বিদ্যালয়ের নাম (ইংরেজিতে) *"
                    value={formData.nameEn}
                    onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="বিদ্যালয়ের স্লোগান (বাংলায়)"
                    value={formData.sloganBn}
                    onChange={(e) => setFormData({ ...formData, sloganBn: e.target.value })}
                  />
                  <Input
                    label="স্লোগান (ইংরেজিতে)"
                    value={formData.sloganEn}
                    onChange={(e) => setFormData({ ...formData, sloganEn: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Input
                    label="EIIN নম্বর *"
                    value={formData.eiin}
                    onChange={(e) => setFormData({ ...formData, eiin: e.target.value })}
                    required
                  />
                  <Input
                    label="ঢাকা শিক্ষা বোর্ড কোড"
                    value={formData.boardCode}
                    onChange={(e) => setFormData({ ...formData, boardCode: e.target.value })}
                  />
                  <Input
                    label="প্রতিষ্ঠার সন"
                    value={formData.establishedYear}
                    onChange={(e) => setFormData({ ...formData, establishedYear: e.target.value })}
                  />
                </div>

                <Input
                  label="প্রতিষ্ঠানের সম্পূর্ণ ঠিকানা *"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="অফিসিয়াল হেল্পলাইন / ফোন *"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                  <Input
                    label="অফিসিয়াল ইমেইল *"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="বর্তমান শিক্ষাবর্ষ *"
                    value={formData.academicYear}
                    onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                  />
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">সংখ্যা প্রদর্শনের ফরম্যাট</label>
                    <select
                      value={formData.numerals}
                      onChange={(e) =>
                        setFormData({ ...formData, numerals: e.target.value as "bn" | "en" })
                      }
                      className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-300 bg-white"
                    >
                      <option value="bn">বাংলা সংখ্যা (যেমন: ১২৩৪৫)</option>
                      <option value="en">ইংরেজি সংখ্যা (যেমন: 12345)</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* TAB 2: Homepage Hero & Banner Setup */}
        {activeTab === "homepage" && (
          <div className="space-y-6">
            <Card>
              <CardHeader className="bg-slate-50/70 border-b border-slate-100">
                <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Layout className="h-5 w-5 text-indigo-600" />
                  হোমপেজের ব্যানার, হিরো সেকশন ও জরুরি নোটিশ টিকার
                </CardTitle>
                <CardDescription>
                  ওয়েবসাইটের হোমপেজে ভিজিটরদের জন্য প্রথম দৃশ্যমান তথ্যসমূহ
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">হিরো ব্যানার প্রধান শিরোনাম *</label>
                  <input
                    type="text"
                    value={formData.heroTitle}
                    onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white font-bold"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">হিরো সাব-শিরোনাম ও ভূমিকা *</label>
                  <textarea
                    rows={3}
                    value={formData.heroSubtitle}
                    onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
                    className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 bg-white leading-relaxed"
                    required
                  />
                </div>

                {/* Banner Background Image */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-full sm:w-64">
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">
                      হিরো ব্যানার ছবি (Cloudinary)
                    </label>
                    <ImageUpload
                      value={formData.bannerImageUrl}
                      onChange={(url) => setFormData({ ...formData, bannerImageUrl: url })}
                      folder="general"
                      label="ব্যানার ছবি আপলোড"
                    />
                  </div>
                  <div className="text-xs text-slate-500 space-y-1">
                    <p className="font-bold text-slate-700">টিপস:</p>
                    <p>• ছবি না থাকলে হোমপেজে স্বয়ংক্রিয় নান্দনিক গ্রেডিয়েন্ট প্যাটার্ন ব্যবহৃত হবে।</p>
                    <p>• ক্যাম্পাস বা শিক্ষার্থীদের সুন্দর হাই-রেজোলিউশন ছবি দিতে পারেন।</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    জরুরি স্ক্রলিং নোটিশ (Ticker Notice)
                  </label>
                  <input
                    type="text"
                    value={formData.tickerNotice}
                    onChange={(e) => setFormData({ ...formData, tickerNotice: e.target.value })}
                    placeholder="জরুরি ঘোষণা লিখুন যা হোমপেজের শীর্ষে স্ক্রল করবে..."
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white font-medium"
                  />
                </div>

                {/* Admissions Setup */}
                <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-amber-950">অনলাইন ভর্তি আবেদন নিয়ন্ত্রণ</h4>
                      <p className="text-xs text-amber-800">
                        ওয়েবসাইটে ভর্তি আবেদন বাটন ও ফরমের দৃশ্যমানতা নিয়ন্ত্রণ করুন
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.admissionOpen}
                        onChange={(e) =>
                          setFormData({ ...formData, admissionOpen: e.target.checked })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600" />
                    </label>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-amber-900">ভর্তি সংক্রান্ত বিশেষ বার্তা</label>
                    <input
                      type="text"
                      value={formData.admissionNotice}
                      onChange={(e) =>
                        setFormData({ ...formData, admissionNotice: e.target.value })
                      }
                      className="w-full text-xs px-3 py-2 rounded-lg border border-amber-300 bg-white"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* TAB 3: Leadership & Messages */}
        {activeTab === "leadership" && (
          <div className="space-y-6">
            {/* Principal */}
            <Card>
              <CardHeader className="bg-slate-50/70 border-b border-slate-100">
                <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                  প্রধান শিক্ষক / অধ্যক্ষের বাণী ও পরিচিতি
                </CardTitle>
                <CardDescription>
                  হোমপেজ ও পরিচিতি পাতায় অধ্যক্ষ মহোদয়ের বাণী ও ছবি প্রদর্শন
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
                  <div className="md:col-span-1">
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">
                      অধ্যক্ষের ছবি (Cloudinary)
                    </label>
                    <ImageUpload
                      value={formData.principalPhotoUrl}
                      onChange={(url) => setFormData({ ...formData, principalPhotoUrl: url })}
                      folder="staff"
                      label="ছবি নির্বাচন করুন"
                    />
                  </div>

                  <div className="md:col-span-3 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="প্রধান শিক্ষকের নাম *"
                        value={formData.principalName}
                        onChange={(e) =>
                          setFormData({ ...formData, principalName: e.target.value })
                        }
                        required
                      />
                      <Input
                        label="পদবী *"
                        value={formData.principalTitle}
                        onChange={(e) =>
                          setFormData({ ...formData, principalTitle: e.target.value })
                        }
                        required
                      />
                    </div>

                    <Input
                      label="শিক্ষাগত যোগ্যতা ও ডিগ্রি"
                      value={formData.principalQualification}
                      onChange={(e) =>
                        setFormData({ ...formData, principalQualification: e.target.value })
                      }
                    />

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">
                        প্রধান শিক্ষকের অনুপ্রেরণামূলক বাণী *
                      </label>
                      <textarea
                        rows={5}
                        value={formData.principalMessage}
                        onChange={(e) =>
                          setFormData({ ...formData, principalMessage: e.target.value })
                        }
                        className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 bg-white leading-relaxed"
                        required
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* President */}
            <Card>
              <CardHeader className="bg-slate-50/70 border-b border-slate-100">
                <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-indigo-600" />
                  সভাপতি / গভর্নিং বডির বাণী ও পরিচিতি
                </CardTitle>
                <CardDescription>পরিচালনা পর্ষদের সম্মানিত সভাপতির বাণী ও পরিচিতি</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
                  <div className="md:col-span-1">
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">
                      সভাপতির ছবি (Cloudinary)
                    </label>
                    <ImageUpload
                      value={formData.presidentPhotoUrl}
                      onChange={(url) => setFormData({ ...formData, presidentPhotoUrl: url })}
                      folder="staff"
                      label="ছবি নির্বাচন করুন"
                    />
                  </div>

                  <div className="md:col-span-3 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="সভাপতির নাম *"
                        value={formData.presidentName}
                        onChange={(e) =>
                          setFormData({ ...formData, presidentName: e.target.value })
                        }
                      />
                      <Input
                        label="পদবী"
                        value={formData.presidentTitle}
                        onChange={(e) =>
                          setFormData({ ...formData, presidentTitle: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">সভাপতির বার্তা</label>
                      <textarea
                        rows={4}
                        value={formData.presidentMessage}
                        onChange={(e) =>
                          setFormData({ ...formData, presidentMessage: e.target.value })
                        }
                        className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 bg-white leading-relaxed"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* TAB 4: Stats & Social Links */}
        {activeTab === "stats_social" && (
          <div className="space-y-6">
            <Card>
              <CardHeader className="bg-slate-50/70 border-b border-slate-100">
                <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-emerald-600" />
                  হোমপেজের মূল পরিসংখ্যান (Key Statistics)
                </CardTitle>
                <CardDescription>
                  হোমপেজে প্রদর্শিত অর্জনের চিত্র ও প্রাতিষ্ঠানিক পরিসংখ্যান
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Input
                    label="মোট শিক্ষার্থী"
                    value={formData.statStudents}
                    onChange={(e) => setFormData({ ...formData, statStudents: e.target.value })}
                  />
                  <Input
                    label="অভিজ্ঞ শিক্ষক-শিক্ষিকা"
                    value={formData.statTeachers}
                    onChange={(e) => setFormData({ ...formData, statTeachers: e.target.value })}
                  />
                  <Input
                    label="এসএসসি পাসের হার"
                    value={formData.statPassRate}
                    onChange={(e) => setFormData({ ...formData, statPassRate: e.target.value })}
                  />
                  <Input
                    label="গড় জিপিএ-৫ / ক্লাসরুম"
                    value={formData.statGpa5}
                    onChange={(e) => setFormData({ ...formData, statGpa5: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-slate-50/70 border-b border-slate-100">
                <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-600" />
                  সোশ্যাল মিডিয়া ও গুগল ম্যাপস
                </CardTitle>
                <CardDescription>সামাজিক যোগাযোগ মাধ্যম ও লোকেশন ম্যাপ সংযোগ</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="ফেসবুক পেজ লিংক (Facebook URL)"
                    placeholder="https://facebook.com/schoolpage"
                    value={formData.facebookUrl}
                    onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
                  />
                  <Input
                    label="ইউটিউব চ্যানেল লিংক (YouTube URL)"
                    placeholder="https://youtube.com/@schoolchannel"
                    value={formData.youtubeUrl}
                    onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    গুগল ম্যাপস এমবেড লিংক (Google Maps Embed URL)
                  </label>
                  <input
                    type="text"
                    placeholder="https://www.google.com/maps/embed?..."
                    value={formData.googleMapUrl}
                    onChange={(e) => setFormData({ ...formData, googleMapUrl: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white font-mono"
                  />
                  <p className="text-[11px] text-slate-500">
                    Google Maps থেকে &quot;Share &gt; Embed a map&quot; লিংক দিলে যোগাযোগ পেজে স্বয়ংক্রিয় ম্যাপ প্রদর্শিত হবে।
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* TAB 5: Super Admin User & Role Management */}
        {activeTab === "users" && <UserRoleManager />}

        {/* Save button footer when not in users tab */}
        {activeTab !== "users" && (
          <div className="flex justify-end pt-4 border-t border-slate-200">
            <Button
              type="submit"
              size="md"
              isLoading={saving}
              className="gap-2 font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 px-6 py-2.5 rounded-xl"
            >
              <Save className="h-4 w-4" />
              সকল পরিবর্তন সংরক্ষণ করুন
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}

interface UserItem {
  _id: string;
  email: string;
  name: string;
  role: string;
  phone?: string;
  photoUrl?: string;
  avatar?: string;
  createdAt?: string;
  isActive?: boolean;
  status?: string;
}

function UserRoleManager() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);

  // New user form state
  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("TEACHER");
  const [newPassword, setNewPassword] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newPhotoUrl, setNewPhotoUrl] = useState("");

  // Edit User state
  const [editingUser, setEditingUser] = useState<UserItem | null>(null);
  const [editName, setEditName] = useState("");
  const [editRole, setEditRole] = useState("TEACHER");
  const [editPhone, setEditPhone] = useState("");
  const [editStatus, setEditStatus] = useState("ACTIVE");
  const [editPassword, setEditPassword] = useState("");
  const [editPhotoUrl, setEditPhotoUrl] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);

  // Delete User state
  const [deletingUser, setDeletingUser] = useState<UserItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/users");
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users || []);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail || !newName || !newPassword) {
      toast.error("অনুগ্রহ করে ইমেইল, নাম ও পাসওয়ার্ড প্রদান করুন।");
      return;
    }

    try {
      setCreating(true);
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: newEmail,
          name: newName,
          role: newRole,
          password: newPassword,
          phone: newPhone,
          photoUrl: newPhotoUrl || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "ইউজার তৈরি ব্যর্থ হয়েছে");
      }

      toast.success(data.message || "নতুন ইউজার সফলভাবে তৈরি হয়েছে!");
      setNewEmail("");
      setNewName("");
      setNewPassword("");
      setNewPhone("");
      setNewPhotoUrl("");
      fetchUsers();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error creating user";
      toast.error(msg);
    } finally {
      setCreating(false);
    }
  };

  const openEditModal = (u: UserItem) => {
    setEditingUser(u);
    setEditName(u.name || "");
    setEditRole(u.role || "TEACHER");
    setEditPhone(u.phone || "");
    setEditStatus(u.status || (u.isActive ? "ACTIVE" : "SUSPENDED"));
    setEditPhotoUrl(u.photoUrl || u.avatar || "");
    setEditPassword("");
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    try {
      setSavingEdit(true);
      const res = await fetch("/api/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingUser._id,
          name: editName,
          role: editRole,
          phone: editPhone,
          status: editStatus,
          password: editPassword || undefined,
          photoUrl: editPhotoUrl,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "ইউজার সংশোধন ব্যর্থ হয়েছে");
      }

      toast.success(data.message || "ইউজারের তথ্য সফলভাবে সংশোধন হয়েছে!");
      setEditingUser(null);
      fetchUsers();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error updating user";
      toast.error(msg);
    } finally {
      setSavingEdit(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!deletingUser) return;

    try {
      setDeleting(true);
      const res = await fetch(`/api/users?id=${deletingUser._id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "ইউজার মুছতে ব্যর্থ হয়েছে");
      }

      toast.success(data.message || "ইউজার সফলভাবে মুছে ফেলা হয়েছে!");
      setDeletingUser(null);
      fetchUsers();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error deleting user";
      toast.error(msg);
    } finally {
      setDeleting(false);
    }
  };

  const ROLES_LIST = [
    { value: "SUPER_ADMIN", label: "সুপার অ্যাডমিন (সর্বোচ্চ ক্ষমতা)" },
    { value: "SCHOOL_ADMIN", label: "বিদ্যালয় প্রশাসক" },
    { value: "PRINCIPAL", label: "প্রধান শিক্ষক / অধ্যক্ষ" },
    { value: "VICE_PRINCIPAL", label: "সহকারী প্রধান শিক্ষক" },
    { value: "TEACHER", label: "বিষয় শিক্ষক" },
    { value: "CLASS_TEACHER", label: "শ্রেণি শিক্ষক" },
    { value: "ACCOUNTANT", label: "হিসাবরক্ষক" },
    { value: "LIBRARIAN", label: "গ্রন্থাগারিক" },
    { value: "STAFF", label: "অফিস সহকারী / স্টাফ" },
    { value: "STUDENT", label: "শিক্ষার্থী" },
    { value: "PARENT", label: "অভিভাবক" },
  ];

  return (
    <Card className="border-indigo-200 shadow-md">
      <CardHeader className="bg-gradient-to-r from-indigo-50/70 to-blue-50/50 border-b border-indigo-100">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse" />
            ইউজার ও প্রাতিষ্ঠানিক রোল ব্যবস্থাপনা (সুপার অ্যাডমিন নিয়ন্ত্রণ)
          </CardTitle>
          <span className="text-[11px] bg-indigo-100 text-indigo-800 border border-indigo-300 px-2.5 py-0.5 rounded-full font-bold">
            সুপার অ্যাডমিন বিশেষ ক্ষমতা
          </span>
        </div>
        <CardDescription>
          Md. Aulad Hossen (সুপার অ্যাডমিন) এখান থেকে শিক্ষক, কর্মকর্তা ও কর্মচারীদের নতুন রোল ও অ্যাকাউন্ট তৈরি, তথ্য সংশোধন এবং মুছে ফেলতে পারবেন।
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* New User Creation Form */}
        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-4">
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <span>+ নতুন প্রাতিষ্ঠানিক ইউজার ও রোল তৈরি করুন</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
            {/* Cloudinary Photo Upload */}
            <div className="md:col-span-1">
              <label className="text-xs font-bold text-slate-700 block mb-1">প্রোফাইল ছবি (Cloudinary)</label>
              <ImageUpload
                value={newPhotoUrl}
                onChange={(url) => setNewPhotoUrl(url)}
                folder="staff"
                label="ছবি নির্বাচন করুন"
              />
            </div>

            <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">ইউজার পুরো নাম *</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="নাম লিখুন"
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">ইমেইল অ্যাড্রেস *</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="teacher@school.edu.bd"
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">প্রাতিষ্ঠানিক রোল *</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white font-medium"
                >
                  {ROLES_LIST.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">লগইন পাসওয়ার্ড *</label>
                <input
                  type="text"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="গোপন পাসওয়ার্ড"
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">ফোন নম্বর (ঐচ্ছিক)</label>
                <input
                  type="text"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="০১৭০০-০০০০০১"
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white"
                />
              </div>

              <div className="flex items-end">
                <Button
                  type="button"
                  onClick={handleCreateUser}
                  size="sm"
                  isLoading={creating}
                  className="w-full font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
                >
                  ইউজার তৈরি ও সংরক্ষণ
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Existing Users Table */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              ডাটাবেজে সংরক্ষিত বর্তমান ইউজার তালিকা ({users.length} জন):
            </h4>
            <Button type="button" variant="outline" size="sm" onClick={fetchUsers} isLoading={loading} className="text-xs">
              <RefreshCw className="h-3 w-3 mr-1" />
              রিফ্রেশ
            </Button>
          </div>

          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                <tr>
                  <th className="p-3">ইউজার ও ছবি</th>
                  <th className="p-3">ইমেইল</th>
                  <th className="p-3">রোল</th>
                  <th className="p-3">মোবাইল</th>
                  <th className="p-3">স্ট্যাটাস</th>
                  <th className="p-3 text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-4 text-center text-slate-500">
                      কোন ইউজার পাওয়া যায়নি
                    </td>
                  </tr>
                ) : (
                  users.map((u) => {
                    const isMasterAdmin = u.email === "auladinfo@gmail.com";
                    const photo = u.photoUrl || u.avatar;
                    return (
                      <tr key={u._id} className="hover:bg-slate-50/50">
                        <td className="p-3">
                          <div className="flex items-center gap-2.5">
                            <div className="h-8 w-8 rounded-full overflow-hidden border border-slate-200 bg-indigo-50 flex items-center justify-center shrink-0">
                              {photo ? (
                                <img src={photo} alt={u.name} className="h-full w-full object-cover" />
                              ) : (
                                <User className="h-4 w-4 text-indigo-400" />
                              )}
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                                {u.name}
                                {isMasterAdmin && (
                                  <span className="text-[9px] bg-amber-100 text-amber-800 border border-amber-300 px-1.5 py-0.2 rounded font-bold">
                                    মূল মালিক
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 font-mono text-slate-600">{u.email}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                            {u.role}
                          </span>
                        </td>
                        <td className="p-3 text-slate-600 font-mono">{u.phone || "—"}</td>
                        <td className="p-3">
                          {u.status === "SUSPENDED" ? (
                            <span className="text-rose-600 font-bold text-[11px] bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
                              স্থগিত
                            </span>
                          ) : (
                            <span className="text-emerald-600 font-bold text-[11px] bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1 w-fit">
                              <CheckCircle2 className="h-3 w-3" /> সক্রিয়
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => openEditModal(u)}
                              className="h-7 px-2 text-xs text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 border-indigo-200"
                              title="সংশোধন করুন"
                            >
                              <Edit className="h-3.5 w-3.5 mr-1" />
                              সংশোধন
                            </Button>
                            {!isMasterAdmin && (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setDeletingUser(u)}
                                className="h-7 px-2 text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 border-rose-200"
                                title="মুছে ফেলুন"
                              >
                                <Trash2 className="h-3.5 w-3.5 mr-1" />
                                মুছুন
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit User Dialog */}
        <Dialog
          open={!!editingUser}
          onOpenChange={(open) => !open && setEditingUser(null)}
          title="ইউজারের তথ্য সংশোধন ও আপডেট"
          description="ব্যবহারকারী বা কর্মকর্তার ব্যক্তিগত তথ্য, পদবী এবং প্রোফাইল ছবি আপডেট করুন।"
        >
          {editingUser && (
            <form onSubmit={handleUpdateUser} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1">
                  <label className="text-xs font-bold text-slate-700 block mb-1">প্রোফাইল ছবি (Cloudinary)</label>
                  <ImageUpload
                    value={editPhotoUrl}
                    onChange={(url) => setEditPhotoUrl(url)}
                    folder="staff"
                    label="নতুন ছবি দিন"
                  />
                </div>

                <div className="md:col-span-2 space-y-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">ইমেইল (পরিবর্তনযোগ্য নয়)</label>
                    <input
                      type="text"
                      disabled
                      value={editingUser.email}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 bg-slate-100 text-slate-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">পুরো নাম *</label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      required
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">প্রাতিষ্ঠানিক রোল *</label>
                    <select
                      value={editRole}
                      disabled={editingUser.email === "auladinfo@gmail.com"}
                      onChange={(e) => setEditRole(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white font-medium"
                    >
                      {ROLES_LIST.map((r) => (
                        <option key={r.value} value={r.value}>
                          {r.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">ফোন নম্বর</label>
                  <input
                    type="text"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    placeholder="০১৭০০-০০০০০১"
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">অ্যাকাউন্ট স্ট্যাটাস</label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white font-medium"
                  >
                    <option value="ACTIVE">সক্রিয় (Active)</option>
                    <option value="SUSPENDED">স্থগিত (Suspended)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  নতুন পাসওয়ার্ড (পরিবর্তন করতে চাইলে লিখুন)
                </label>
                <input
                  type="text"
                  value={editPassword}
                  onChange={(e) => setEditPassword(e.target.value)}
                  placeholder="পাসওয়ার্ড অপরিবর্তিত রাখতে ফাঁকা রাখুন"
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingUser(null)}
                  disabled={savingEdit}
                >
                  বাতিল
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  isLoading={savingEdit}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                >
                  আপডেট সংরক্ষণ করুন
                </Button>
              </div>
            </form>
          )}
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={!!deletingUser}
          onOpenChange={(open) => !open && setDeletingUser(null)}
          title="ইউজার মুছে ফেলার নিশ্চিতকরণ"
        >
          {deletingUser && (
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <p className="font-bold">আপনি কি নিশ্চিত যে এই ইউজারকে মুছে ফেলতে চান?</p>
                  <p>
                    ইউজার: <span className="font-bold text-rose-900">{deletingUser.name}</span> ({deletingUser.email})
                  </p>
                  <p className="text-slate-600">মুছে ফেললে উক্ত ব্যক্তি আর সিস্টেমে লগইন করতে পারবে না।</p>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setDeletingUser(null)}
                  disabled={deleting}
                >
                  বাতিল
                </Button>
                <Button
                  type="button"
                  size="sm"
                  isLoading={deleting}
                  onClick={handleDeleteUser}
                  className="bg-rose-600 hover:bg-rose-700 text-white font-bold"
                >
                  হ্যাঁ, মুছে ফেলুন
                </Button>
              </div>
            </div>
          )}
        </Dialog>
      </CardContent>
    </Card>
  );
}
