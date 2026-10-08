"use client";

import React, { useState } from "react";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { PublicFooter } from "@/components/layout/public-footer";
import { UserPlus, CheckCircle2, FileText, ArrowRight, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function PublicAdmissionsPage() {
  const [formData, setFormData] = useState({
    nameBn: "",
    nameEn: "",
    targetClass: "৬ষ্ঠ শ্রেণি",
    gender: "ছেলে",
    dob: "",
    bloodGroup: "A+",
    guardianName: "",
    guardianPhone: "",
    guardianNid: "",
    address: "",
    previousSchool: "",
    previousGpa: "",
  });

  const [submittedAppNo, setSubmittedAppNo] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nameBn || !formData.guardianPhone) {
      toast.error("অনুগ্রহ করে প্রয়োজনীয় তথ্যগুলো প্রদান করুন।");
      return;
    }

    const appNo = `ADM-2026-${Math.floor(100 + Math.random() * 900)}`;
    setSubmittedAppNo(appNo);
    toast.success("আপনার ভর্তি আবেদন সফলভাবে গৃহীত হয়েছে!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <PublicNavbar />

      <section className="bg-blue-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-2">
          <span className="text-xs uppercase tracking-wider text-blue-300 font-bold bg-blue-800/80 px-3 py-1 rounded-full">
            ২০২৬ শিক্ষাবর্ষ
          </span>
          <h1 className="text-3xl font-extrabold">অনলাইন ভর্তি আবেদন ফরম</h1>
          <p className="text-sm text-blue-200">
            অগ্রদূত আদর্শ উচ্চ বিদ্যালয়ে ৬ষ্ঠ থেকে ৯ম শ্রেণিতে ভর্তির আনুষ্ঠানিক আবেদন
          </p>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 py-10 w-full flex-1">
        {submittedAppNo ? (
          <Card className="border-emerald-300 shadow-lg text-center p-8 space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-900">
                ভর্তি আবেদন সফলভাবে সম্পন্ন হয়েছে!
              </h2>
              <p className="text-sm text-slate-600">
                আপনার আবেদনের ট্র্যাকিং নম্বর (Application ID):
              </p>
              <div className="text-2xl font-mono font-extrabold text-blue-700 bg-blue-50 py-2 px-4 rounded-xl border border-blue-200 inline-block">
                {submittedAppNo}
              </div>
            </div>

            <p className="text-xs text-slate-500 max-w-md mx-auto">
              ভর্তি পরীক্ষার সময়সূচি ও প্রবেশপত্রের আপডেট আপনার অভিভাবকের মোবাইল নম্বরে ({formData.guardianPhone}) এসএমএস-এর মাধ্যমে জানিয়ে দেওয়া হবে।
            </p>

            <div className="flex justify-center gap-3 pt-4">
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5"
                onClick={() => toast.success("আবেদনপত্র প্রিন্ট সম্পন্ন হয়েছে!")}
              >
                <Printer className="h-4 w-4" />
                আবেদন ফরম প্রিন্ট করুন
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  setSubmittedAppNo(null);
                  setFormData({
                    nameBn: "",
                    nameEn: "",
                    targetClass: "৬ষ্ঠ শ্রেণি",
                    gender: "ছেলে",
                    dob: "",
                    bloodGroup: "A+",
                    guardianName: "",
                    guardianPhone: "",
                    guardianNid: "",
                    address: "",
                    previousSchool: "",
                    previousGpa: "",
                  });
                }}
              >
                নতুন আবেদন করুন
              </Button>
            </div>
          </Card>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-bold text-slate-900">
                  ১. শিক্ষার্থীর ব্যক্তিগত ও অ্যাকাডেমিক তথ্য
                </CardTitle>
                <CardDescription>জন্ম নিবন্ধন সনদ অনুযায়ী তথ্য প্রদান করুন</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="শিক্ষার্থীর পূর্ণ নাম (বাংলায়) *"
                    placeholder="যেমন: মোঃ সাকিব হোসেন"
                    value={formData.nameBn}
                    onChange={(e) => setFormData({ ...formData, nameBn: e.target.value })}
                    required
                  />
                  <Input
                    label="শিক্ষার্থীর নাম (ইংরেজিতে ক্যাপিটাল লেটারে)"
                    placeholder="MD. SAKIB HOSSAIN"
                    value={formData.nameEn}
                    onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      ইচ্ছুক শ্রেণি *
                    </label>
                    <select
                      className="w-full text-xs font-semibold px-3 py-2 border border-slate-300 rounded-lg bg-white"
                      value={formData.targetClass}
                      onChange={(e) => setFormData({ ...formData, targetClass: e.target.value })}
                    >
                      <option value="৬ষ্ঠ শ্রেণি">৬ষ্ঠ শ্রেণি</option>
                      <option value="৭ম শ্রেণি">৭ম শ্রেণি</option>
                      <option value="৮ম শ্রেণি">৮ম শ্রেণি</option>
                      <option value="৯ম শ্রেণি (বিজ্ঞান)">৯ম শ্রেণি (বিজ্ঞান)</option>
                      <option value="৯ম শ্রেণি (ব্যবসায় শিক্ষা)">৯ম শ্রেণি (ব্যবসায় শিক্ষা)</option>
                      <option value="৯ম শ্রেণি (মানবিক)">৯ম শ্রেণি (মানবিক)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">লিঙ্গ *</label>
                    <select
                      className="w-full text-xs font-semibold px-3 py-2 border border-slate-300 rounded-lg bg-white"
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    >
                      <option value="ছেলে">ছেলে</option>
                      <option value="মেয়ে">মেয়ে</option>
                    </select>
                  </div>

                  <Input
                    label="জন্ম তারিখ *"
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="পূর্ববর্তী শিক্ষা প্রতিষ্ঠান"
                    placeholder="আগের স্কুলের নাম"
                    value={formData.previousSchool}
                    onChange={(e) => setFormData({ ...formData, previousSchool: e.target.value })}
                  />
                  <Input
                    label="পূর্ববর্তী ক্লাসের জিপিএ / প্রাপ্ত গ্রেড"
                    placeholder="যেমন: ৫.০০"
                    value={formData.previousGpa}
                    onChange={(e) => setFormData({ ...formData, previousGpa: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base font-bold text-slate-900">
                  ২. অভিভাবক ও যোগাযোগের ঠিকানা
                </CardTitle>
                <CardDescription>জরুরি যোগাযোগের জন্য সঠিক ফোন নম্বর প্রদান করুন</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="পিতা / মাতার নাম *"
                    placeholder="অভিভাবকের নাম"
                    value={formData.guardianName}
                    onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                    required
                  />
                  <Input
                    label="অভিভাবকের মোবাইল নম্বর *"
                    placeholder="০১৭xxxxxxxx"
                    value={formData.guardianPhone}
                    onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                    required
                  />
                </div>

                <Input
                  label="বর্তমান ঠিকানা *"
                  placeholder="বাড়ি নং, সড়ক, গ্রাম/মহল্লা, থানা, জেলা"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
                />
              </CardContent>
            </Card>

            <div className="flex justify-end gap-3">
              <Button type="submit" size="lg" className="font-bold gap-2">
                আবেদনপত্র জমা দিন <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </form>
        )}
      </main>

      <PublicFooter />
    </div>
  );
}
