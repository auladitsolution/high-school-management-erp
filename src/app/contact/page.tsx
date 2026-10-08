"use client";

import React, { useState } from "react";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { PublicFooter } from "@/components/layout/public-footer";
import { Phone, Mail, MapPin, Send, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function PublicContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("আপনার বার্তাটি সফলভাবে বিদ্যালয় দপ্তরে প্রেরণ করা হয়েছে!");
      setFormData({ name: "", phone: "", subject: "", message: "" });
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <PublicNavbar />

      <section className="bg-blue-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-2">
          <span className="text-xs uppercase tracking-wider text-blue-300 font-bold bg-blue-800/80 px-3 py-1 rounded-full">
            যোগাযোগ
          </span>
          <h1 className="text-3xl font-extrabold">বিদ্যালয় কার্যালয় ও যোগাযোগ</h1>
          <p className="text-sm text-blue-200">
            যেকোনো তথ্য, পরামর্শ বা অভিযোগের জন্য আমাদের সাথে যোগাযোগ করুন
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-12 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-xl font-bold text-slate-900">যোগাযোগের ঠিকানা</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 bg-white">
                <MapPin className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-slate-900">বিদ্যালয় প্রাঙ্গণ</h4>
                  <p className="text-xs text-slate-600">কলেজ রোড, ধানমন্ডি, ঢাকা - ১২০৫, বাংলাদেশ</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 bg-white">
                <Phone className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-slate-900">হটলাইন ও অফিস নম্বর</h4>
                  <p className="text-xs text-slate-600">+৮৮০ ১৮০০-০০০০০০ (হেল্পলাইন)</p>
                  <p className="text-xs text-slate-600">+৮৮০ ২-৯৮৭৬৫৪৩ (অফিস)</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 bg-white">
                <Mail className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-slate-900">ইমেইল ঠিকানা</h4>
                  <p className="text-xs text-slate-600">info@schoolname.edu.bd</p>
                  <p className="text-xs text-slate-600">principal@schoolname.edu.bd</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 bg-white">
                <Clock className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-slate-900">অফিস সময়সূচি</h4>
                  <p className="text-xs text-slate-600">রবিবার - বৃহস্পতিবার: সকাল ৮:০০ - বিকাল ৩:৩০</p>
                  <p className="text-xs text-slate-600">শুক্রবার ও শনিবার: সাপ্তাহিক ছুটি</p>
                </div>
              </div>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="lg:col-span-7">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-base font-bold text-slate-900">
                  সরাসরি বার্তা বা অনুসন্ধান পাঠান
                </CardTitle>
                <CardDescription>
                  আপনার প্রশ্ন বা মতামত পাঠালে আমরা দ্রুত যোগাযোগ করব
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="আপনার নাম *"
                      placeholder="মোঃ আনোয়ার হোসেন"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                    <Input
                      label="মোবাইল নম্বর *"
                      placeholder="০১৭xxxxxxxx"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>

                  <Input
                    label="বিষয় *"
                    placeholder="যেমন: ভর্তি সংক্রান্ত তথ্য জানতে চাই"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                  />

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      বার্তার বিস্তারিত বিবরণ *
                    </label>
                    <textarea
                      rows={5}
                      className="w-full text-sm p-3 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-500"
                      placeholder="আপনার বার্তা বিস্তারিত লিখুন..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>

                  <Button type="submit" size="md" className="gap-2 font-bold" isLoading={loading}>
                    <Send className="h-4 w-4" />
                    বার্তা প্রেরণ করুন
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
