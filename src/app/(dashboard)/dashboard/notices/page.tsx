"use client";

import React, { useState } from "react";
import {
  Bell,
  Plus,
  Calendar,
  Pin,
  Trash2,
  Users,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface NoticeItem {
  id: string;
  title: string;
  category: string;
  content: string;
  date: string;
  targetRole: string;
  isPinned: boolean;
}

const INITIAL_NOTICES: NoticeItem[] = [
  {
    id: "1",
    title: "২০২৬ শিক্ষাবর্ষে ৬ষ্ঠ থেকে ৯ম শ্রেণিতে নতুন ভর্তি বিজ্ঞপ্তি ও ফরম পূরণ",
    category: "ভর্তি",
    content: "অগ্রদূত আদর্শ উচ্চ বিদ্যালয়ে ২০২৬ শিক্ষাবর্ষে ৬ষ্ঠ থেকে ৯ম শ্রেণির শূন্য আসনে ছাত্র-ছাত্রী ভর্তির অনলাইন আবেদন প্রক্রিয়া শুরু হয়েছে।",
    date: "১৫ জানুয়ারি, ২০২৬",
    targetRole: "সকলের জন্য",
    isPinned: true,
  },
  {
    id: "2",
    title: "এসএসসি পরীক্ষা ২০২৬-এর ফরম পূরণ সংক্রান্ত জরুরি নির্দেশনা",
    category: "পরীক্ষা",
    content: "ঢাকা শিক্ষা বোর্ডের বিজ্ঞপ্তি অনুসারে ২০২৬ সালের এসএসসি পরীক্ষার্থীদের ফরম পূরণ আগামী ২০ জানুয়ারির মধ্যে সম্পন্ন করতে হবে।",
    date: "১২ জানুয়ারি, ২০২৬",
    targetRole: "শিক্ষার্থী ও অভিভাবক",
    isPinned: true,
  },
  {
    id: "3",
    title: "বার্ষিক ক্রীড়া প্রতিযোগিতা ও সাংস্কৃতিক সপ্তাহ ২০২৬ এর সময়সূচি",
    category: "অনুষ্ঠান",
    content: "আগামী ২৫ জানুয়ারি থেকে বিদ্যালয় প্রাঙ্গণে ৩ দিনব্যাপী বার্ষিক ক্রীড়া ও সাংস্কৃতিক প্রতিযোগিতা অনুষ্ঠিত হবে।",
    date: "০৮ জানুয়ারি, ২০২৬",
    targetRole: "সকলের জন্য",
    isPinned: false,
  },
];

export default function NoticesPage() {
  const [notices, setNotices] = useState<NoticeItem[]>(INITIAL_NOTICES);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "সাধারণ",
    content: "",
    targetRole: "সকলের জন্য",
    isPinned: false,
  });

  const handleCreateNotice = (e: React.FormEvent) => {
    e.preventDefault();
    const newNotice: NoticeItem = {
      id: (notices.length + 1).toString(),
      title: formData.title,
      category: formData.category,
      content: formData.content,
      date: "০৭ অক্টোবর, ২০২৬",
      targetRole: formData.targetRole,
      isPinned: formData.isPinned,
    };
    setNotices([newNotice, ...notices]);
    setAddModalOpen(false);
    toast.success("নতুন নোটিশ সফলভাবে প্রকাশিত হয়েছে!");
  };

  const handleDelete = (id: string) => {
    setNotices((prev) => prev.filter((n) => n.id !== id));
    toast.error("নোটিশটি মুছে ফেলা হয়েছে।");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            নোটিশ বোর্ড ও প্রাতিষ্ঠানিক ঘোষণা
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            শিক্ষার্থী, শিক্ষক ও অভিভাবকদের জন্য জরুরি বিজ্ঞপ্তি প্রকাশ
          </p>
        </div>
        <Button size="sm" onClick={() => setAddModalOpen(true)} className="gap-1.5 font-semibold">
          <Plus className="h-4 w-4" />
          নতুন নোটিশ প্রকাশ
        </Button>
      </div>

      <div className="space-y-4">
        {notices.map((n) => (
          <Card key={n.id} className="hover:border-blue-300 transition-colors">
            <CardContent className="p-5 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Badge variant={n.category === "ভর্তি" ? "warning" : "default"}>
                    {n.category}
                  </Badge>
                  {n.isPinned && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                      <Pin className="h-3 w-3" /> পিন করা নোটিশ
                    </span>
                  )}
                  <span className="text-xs text-slate-500 font-medium">
                    প্রাপক: {n.targetRole}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" /> {n.date}
                  </span>
                  <button
                    onClick={() => handleDelete(n.id)}
                    className="text-rose-500 hover:text-rose-700 p-1"
                    title="মুছে ফেলুন"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <h3 className="text-base font-bold text-slate-900">{n.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{n.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Notice Dialog */}
      <Dialog
        open={addModalOpen}
        onOpenChange={setAddModalOpen}
        title="নতুন প্রাতিষ্ঠানিক নোটিশ প্রকাশ"
        description="বিজ্ঞপ্তির শিরোনাম ও বিস্তারিত বিবরণ লিখুন"
      >
        <form onSubmit={handleCreateNotice} className="space-y-4">
          <Input
            label="নোটিশের শিরোনাম *"
            placeholder="যেমন: অর্ধ-বার্ষিক পরীক্ষা ২০২৬ এর সময়সূচি"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">ক্যাটাগরি</label>
              <select
                className="w-full text-xs font-semibold px-3 py-2 border border-slate-300 rounded-lg bg-white"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="ভর্তি">ভর্তি</option>
                <option value="পরীক্ষা">পরীক্ষা</option>
                <option value="ছুটি">ছুটি</option>
                <option value="অনুষ্ঠান">অনুষ্ঠান</option>
                <option value="সাধারণ">সাধারণ</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">উদ্দিষ্ট প্রাপক</label>
              <select
                className="w-full text-xs font-semibold px-3 py-2 border border-slate-300 rounded-lg bg-white"
                value={formData.targetRole}
                onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
              >
                <option value="সকলের জন্য">সকলের জন্য</option>
                <option value="শিক্ষার্থী">শিক্ষার্থী</option>
                <option value="শিক্ষক">শিক্ষক</option>
                <option value="অভিভাবক">অভিভাবক</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              বিস্তারিত বিবরণ *
            </label>
            <textarea
              rows={4}
              className="w-full text-sm p-3 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-500"
              placeholder="নোটিশের সম্পূর্ণ বিবরণ লিখুন..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
            />
          </div>

          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isPinned}
              onChange={(e) => setFormData({ ...formData, isPinned: e.target.checked })}
              className="rounded border-slate-300"
            />
            <span>শীর্ষে পিন করে রাখুন (Pinned Notice)</span>
          </label>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <Button type="button" variant="outline" size="sm" onClick={() => setAddModalOpen(false)}>
              বাতিল
            </Button>
            <Button type="submit" size="sm" variant="primary">
              প্রকাশ করুন
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
