"use client";

import React, { useState } from "react";
import {
  RefreshCw,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function DemoResetPage() {
  const [confirmText, setConfirmText] = useState("");
  const [tokenInput, setTokenInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetDone, setResetDone] = useState(false);
  const isDemo =
    process.env.NEXT_PUBLIC_DEMO_MODE_ENABLED === "true" ||
    process.env.NEXT_PUBLIC_APP_MODE === "demo";

  if (!isDemo) {
    return (
      <div className="max-w-2xl mx-auto space-y-6 pt-6">
        <Card className="border-rose-200 bg-rose-50/40 shadow-md">
          <CardHeader className="bg-rose-50/80 border-b border-rose-200 text-center pb-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-2">
              <Lock className="h-6 w-6" />
            </div>
            <CardTitle className="text-xl font-bold text-rose-950">
              প্রোডাকশন মোডে রিসেট সম্পূর্ণ নিষিদ্ধ
            </CardTitle>
            <CardDescription className="text-rose-900 font-medium">
              আপনার ইআরপি সিস্টেমটি বর্তমানে লাইভ ক্লাউড ডাটাবেজ মোডে পরিচালিত হচ্ছে।
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 text-center space-y-4">
            <p className="text-sm text-slate-700 leading-relaxed">
              আসল শিক্ষার্থী, শিক্ষক, হাজিরা এবং আর্থিক রেকর্ড সুরক্ষার স্বার্থে লাইভ মোডে যে কোনো ধরনের নমুনা ডেটা রিসেট স্বয়ংক্রিয়ভাবে বন্ধ রাখা হয়েছে।
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-100/80 px-3 py-1.5 rounded-full border border-emerald-300">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>MongoDB Atlas ক্লাউড ডেটা সুরক্ষিত ও এনক্রিপ্টেড</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (confirmText !== "রিসেট নিশ্চিত") {
      toast.error("অনুগ্রহ করে নিশ্চিতকরণ বক্সে 'রিসেট নিশ্চিত' টাইপ করুন।");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/demo/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: tokenInput }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "রিসেট ব্যর্থ হয়েছে");
      }

      setResetDone(true);
      toast.success(data.message);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
          <RefreshCw className="h-6 w-6" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          ডেমো ডাটাবেজ রিসেট নিয়ন্ত্রণ
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          ডেমো উপস্থাপনা বা প্রশিক্ষণের পর কৃত্রিম নমুনা ডেটা পূর্বাবস্থায় ফিরিয়ে আনুন
        </p>
      </div>

      <Card className="border-amber-300 shadow-md">
        <CardHeader className="bg-amber-50/50 border-b border-amber-100">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
            <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0" />
            <span>কঠোর আইসোলেশন ও ডেটা সুরক্ষা সতর্কতা</span>
          </div>
          <CardDescription className="text-amber-950">
            এই কার্যক্রমটি কেবল <strong>DEMO DATABASE</strong>-এ সংরক্ষিত পরীক্ষামূলক ডেটা রিসেট করবে। উৎপাদনমুখী আসল স্কুল ডাটাবেজের সাথে এর কোনো সংযোগ নেই।
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {resetDone ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                ডেমো ডাটা সফলভাবে রিসেট সম্পন্ন হয়েছে!
              </h3>
              <p className="text-xs text-slate-500">
                সকল নমুনা শিক্ষার্থী, উপস্থিতি ও পরীক্ষার নম্বর ডিফল্ট অবস্থায় পুনর্গঠন করা হয়েছে।
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setResetDone(false);
                  setConfirmText("");
                  setTokenInput("");
                }}
              >
                আবার রিসেট করুন
              </Button>
            </div>
          ) : (
            <form onSubmit={handleReset} className="space-y-4">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
                <p>• সকল ডেমো শিক্ষার্থীর হাজিরা রিসেট হবে।</p>
                <p>• সকল পরীক্ষামূলক ফি ইনভয়েস প্রাথমিক অবস্থায় ফিরে যাবে।</p>
                <p>• মূল প্রোডাকশন ডাটাবেজ ১০০% সুরক্ষিত থাকবে।</p>
              </div>

              <Input
                label="রিসেট সিক্রেট টোকেন (ঐচ্ছিক / অ্যাডমিন সেশন)"
                type="password"
                placeholder="demo-secret-token-..."
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
              />

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  নিশ্চিত করতে নিচে <strong>রিসেট নিশ্চিত</strong> লিখুন *
                </label>
                <input
                  type="text"
                  placeholder="রিসেট নিশ্চিত"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  className="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-amber-500"
                  required
                />
              </div>

              <Button
                type="submit"
                variant="destructive"
                className="w-full justify-center bg-amber-600 hover:bg-amber-700 text-white font-bold"
                isLoading={loading}
              >
                <RefreshCw className="h-4 w-4 mr-1.5" />
                ডেমো ডাটা রিসেট সম্পন্ন করুন
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
