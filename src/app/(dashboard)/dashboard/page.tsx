import React from "react";
import Link from "next/link";
import {
  Users,
  UserCheck,
  CalendarCheck,
  UserX,
  Wallet,
  AlertCircle,
  FileText,
  UserPlus,
  Award,
  Bell,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  Calendar,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toBanglaNumber, formatCurrencyBn } from "@/lib/utils/bangla";

export default function DashboardOverviewPage() {
  const kpiStats = [
    {
      title: "মোট শিক্ষার্থী",
      value: "১,২৫০",
      unit: "জন শিক্ষার্থী",
      subtext: "৬ষ্ঠ থেকে ১০ম শ্রেণি",
      icon: Users,
      gradient: "from-blue-600 to-cyan-600",
      bgTint: "from-blue-50/50 via-white to-blue-50/20",
      border: "border-blue-200/80 hover:border-blue-400",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      change: "+৩.৪% বৃদ্ধি",
      iconShadow: "shadow-blue-500/25",
    },
    {
      title: "মোট শিক্ষক ও কর্মকর্তা",
      value: "৫২",
      unit: "জন স্টাফ",
      subtext: "৪৫ শিক্ষক • ৭ কর্মকর্তা",
      icon: UserCheck,
      gradient: "from-emerald-600 to-teal-600",
      bgTint: "from-emerald-50/50 via-white to-emerald-50/20",
      border: "border-emerald-200/80 hover:border-emerald-400",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      change: "১০০% সক্রিয়",
      iconShadow: "shadow-emerald-500/25",
    },
    {
      title: "আজকের উপস্থিতি",
      value: "৯৬.২%",
      unit: "উপস্থিতি হার",
      subtext: "উপস্থিত: ১,২০২ জন",
      icon: CalendarCheck,
      gradient: "from-indigo-600 to-violet-600",
      bgTint: "from-indigo-50/50 via-white to-indigo-50/20",
      border: "border-indigo-200/80 hover:border-indigo-400",
      badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
      change: "স্বাভাবিক উপস্থিতি",
      iconShadow: "shadow-indigo-500/25",
      progressBar: 96.2,
      progressColor: "bg-gradient-to-r from-indigo-500 to-emerald-500",
    },
    {
      title: "আজকের অনুপস্থিতি",
      value: "৪৮",
      unit: "জন অনুপস্থিত",
      subtext: "SMS স্বয়ংক্রিয় প্রেরিত",
      icon: UserX,
      gradient: "from-rose-600 to-pink-600",
      bgTint: "from-rose-50/50 via-white to-rose-50/20",
      border: "border-rose-200/80 hover:border-rose-400",
      badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
      change: "অভিভাবক নোটিফায়েড",
      iconShadow: "shadow-rose-500/25",
    },
    {
      title: "চলতি মাসের ফি আদায়",
      value: formatCurrencyBn(37500000), // 375,000 Taka
      unit: "সংগৃহীত ফি",
      subtext: "লক্ষ্যমাত্রার ৭৮% সম্পূর্ণ",
      icon: Wallet,
      gradient: "from-amber-500 to-orange-500",
      bgTint: "from-amber-50/50 via-white to-amber-50/20",
      border: "border-amber-200/80 hover:border-amber-400",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
      change: "+১২% প্রবৃদ্ধি",
      iconShadow: "shadow-amber-500/25",
      progressBar: 78,
      progressColor: "bg-gradient-to-r from-amber-500 to-orange-500",
    },
    {
      title: "বকেয়া ফি",
      value: formatCurrencyBn(8200000), // 82,000 Taka
      unit: "বকেয়া অর্থ",
      subtext: "বকেয়া শিক্ষার্থী: ৪৩ জন",
      icon: AlertCircle,
      gradient: "from-purple-600 to-rose-600",
      bgTint: "from-purple-50/50 via-white to-purple-50/20",
      border: "border-purple-200/80 hover:border-purple-400",
      badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
      change: "তাগাদা পত্র প্রস্তুত",
      iconShadow: "shadow-purple-500/25",
    },
  ];

  const quickActions = [
    {
      label: "নতুন শিক্ষার্থী",
      href: "/dashboard/students?action=create",
      icon: UserPlus,
      gradient: "from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700",
      shadow: "shadow-blue-500/20",
    },
    {
      label: "আজকের হাজিরা",
      href: "/dashboard/attendance",
      icon: CalendarCheck,
      gradient: "from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700",
      shadow: "shadow-emerald-500/20",
    },
    {
      label: "পরীক্ষার নম্বর",
      href: "/dashboard/examinations",
      icon: Award,
      gradient: "from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700",
      shadow: "shadow-purple-500/20",
    },
    {
      label: "ফি রসিদ তৈরি",
      href: "/dashboard/finance?action=create",
      icon: Wallet,
      gradient: "from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700",
      shadow: "shadow-amber-500/20",
    },
    {
      label: "জরুরি নোটিশ",
      href: "/dashboard/notices?action=create",
      icon: Bell,
      gradient: "from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700",
      shadow: "shadow-rose-500/20",
    },
  ];

  const recentActivities = [
    {
      title: "১০ম শ্রেণির গণিত পরীক্ষার নম্বর এন্ট্রি সম্পন্ন",
      time: "১০ মিনিট আগে",
      by: "কাজী রফিকুল ইসলাম",
      tag: "পরীক্ষা",
      tagColor: "bg-purple-100 text-purple-800 border-purple-200",
      iconBg: "bg-purple-100 text-purple-600",
    },
    {
      title: "সাদিয়া ইসলামের (রোল ০১) মাসিক বেতন ফি পরিশোধিত (৳ ১৫০০)",
      time: "২৫ মিনিট আগে",
      by: "হিসাব বিভাগ",
      tag: "ফি আদায়",
      tagColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      iconBg: "bg-emerald-100 text-emerald-600",
    },
    {
      title: "আজকের ৬ষ্ঠ ও ৭ম শ্রেণির হাজিরা হালনাগাদ করা হয়েছে",
      time: "১ ঘণ্টা আগে",
      by: "শ্রেণি শিক্ষক",
      tag: "হাজিরা",
      tagColor: "bg-blue-100 text-blue-800 border-blue-200",
      iconBg: "bg-blue-100 text-blue-600",
    },
    {
      title: "নতুন অনলাইন ভর্তি আবেদন গৃহীত হয়েছে (আবেদন নং: ADM-2026-104)",
      time: "২ ঘণ্টা আগে",
      by: "অনলাইন পোর্টাল",
      tag: "ভর্তি",
      tagColor: "bg-amber-100 text-amber-800 border-amber-200",
      iconBg: "bg-amber-100 text-amber-600",
    },
  ];

  const upcomingExams = [
    {
      title: "অর্ধ-বার্ষিক পরীক্ষা ২০২৬",
      class: "১০ম শ্রেণি",
      date: "১৫ মে, ২০২৬",
      status: "রুটিন প্রকাশিত",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
    },
    {
      title: "১ম সাময়িক মূল্যায়ন",
      class: "৮ম শ্রেণি",
      date: "২২ মে, ২০২৬",
      status: "প্রস্তুতি চলছে",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
    },
    {
      title: "মডেল টেস্ট পরীক্ষা",
      class: "১০ম শ্রেণি (এসএসসি)",
      date: "০১ জুন, ২০২৬",
      status: "আসন্ন",
      badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
    },
  ];

  const classAttendanceSummary = [
    { className: "৬ষ্ঠ শ্রেণি", present: "২৪২/২৪৮", percentage: 98, color: "from-blue-500 to-cyan-500" },
    { className: "৭ম শ্রেণি", present: "২৩৫/২৫০", percentage: 94, color: "from-teal-500 to-emerald-500" },
    { className: "৮ম শ্রেণি", present: "২৪০/২৪৬", percentage: 97, color: "from-indigo-500 to-blue-500" },
    { className: "৯ম শ্রেণি", present: "২৩৮/২৫২", percentage: 94, color: "from-purple-500 to-violet-500" },
    { className: "১০ম শ্রেণি", present: "২৪৭/২৫৪", percentage: 97, color: "from-rose-500 to-orange-500" },
  ];

  return (
    <div className="space-y-5 sm:space-y-6 w-full min-w-0">
      {/* Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-600 to-violet-700 p-4 sm:p-6 lg:p-8 text-white shadow-xl shadow-indigo-600/15">
        {/* Subtle decorative background blur orbs */}
        <div className="absolute -right-12 -bottom-12 w-60 h-60 sm:w-72 sm:h-72 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-12 -top-12 w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-blue-400/20 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 sm:gap-6">
          <div className="space-y-2 sm:space-y-2.5 max-w-2xl min-w-0">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/15 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold text-blue-100 border border-white/20">
              <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-amber-300 shrink-0" />
              <span>ডিজিটাল শিক্ষা ব্যবস্থাপনা ২০২৬</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white leading-tight break-words">
              স্বাগতম, অগ্রদূত আদর্শ উচ্চ বিদ্যালয় ইআরপিতে!
            </h2>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-blue-100">
              <span className="flex items-center gap-1.5 bg-black/15 px-2.5 py-1 rounded-lg border border-white/10">
                <Calendar className="h-3.5 w-3.5 text-blue-200 shrink-0" />
                {toBanglaNumber("০৭")} অক্টোবর, ২০২৬
              </span>
              <span className="bg-black/15 px-2.5 py-1 rounded-lg border border-white/10">
                শিক্ষাবর্ষ: ২০২৬
              </span>
              <span className="bg-black/15 px-2.5 py-1 rounded-lg border border-white/10 hidden sm:inline-block">
                ঢাকা শিক্ষা বোর্ড
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full lg:w-auto shrink-0">
            <Link href="/dashboard/attendance" className="w-full sm:w-auto">
              <Button
                size="md"
                className="w-full sm:w-auto justify-center bg-white text-blue-900 font-bold hover:bg-blue-50 shadow-md hover:shadow-lg transition-all rounded-xl text-xs sm:text-sm"
              >
                <CalendarCheck className="h-4 w-4 mr-1 text-blue-600 shrink-0" />
                দ্রুত হাজিরা শুরু করুন
              </Button>
            </Link>
            <Link href="/dashboard/students?action=create" className="w-full sm:w-auto">
              <Button
                size="md"
                variant="outline"
                className="w-full sm:w-auto justify-center border-white/40 text-blue-600 hover:bg-blue-50 font-semibold rounded-xl text-xs sm:text-sm"
              >
                <UserPlus className="h-4 w-4 mr-1 shrink-0" />
                নতুন শিক্ষার্থী
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Metric Grid - Responsive Mobile 1-col, Tablet 2-col, Desktop 3-col */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-5">
        {kpiStats.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <Card
              key={idx}
              className={`relative overflow-hidden bg-gradient-to-br ${kpi.bgTint} ${kpi.border} shadow-sm hover:shadow-md transition-all duration-300 group`}
            >
              <CardContent className="p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3 sm:gap-4">
                  <div className="space-y-1 sm:space-y-1.5 flex-1 min-w-0">
                    <p className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider truncate">
                      {kpi.title}
                    </p>
                    <div className="flex items-baseline gap-1.5 sm:gap-2">
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        {kpi.value}
                      </h3>
                      {kpi.unit && (
                        <span className="text-xs font-medium text-slate-500 hidden sm:inline truncate">
                          {kpi.unit}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Gradient Icon Badge */}
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-tr ${kpi.gradient} text-white flex items-center justify-center shrink-0 shadow-md ${kpi.iconShadow} group-hover:scale-105 transition-transform`}
                  >
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                </div>

                {/* Progress bar if present */}
                {kpi.progressBar && (
                  <div className="mt-3 space-y-1">
                    <div className="w-full h-1.5 sm:h-2 rounded-full bg-slate-200/80 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${kpi.progressColor} transition-all duration-500`}
                        style={{ width: `${kpi.progressBar}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Footer Subtext & Badge */}
                <div className="flex items-center justify-between pt-2.5 sm:pt-3 mt-1 border-t border-slate-200/60 text-xs gap-2">
                  <span className="text-slate-600 font-medium truncate text-[11px] sm:text-xs">
                    {kpi.subtext}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold border shrink-0 ${kpi.badgeColor}`}
                  >
                    {kpi.change}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Action Ribbon - Grid adapted for mobile */}
      <div className="space-y-2.5 sm:space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 sm:gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
            দ্রুত কার্যক্রম (Quick Actions)
          </h3>
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            সর্বাধিক ব্যবহৃত শর্টকাট
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3.5">
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <Link key={idx} href={action.href} className="group">
                <div
                  className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-r ${action.gradient} text-white flex flex-col items-center justify-center text-center gap-2 shadow-md ${action.shadow} hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer border border-white/20`}
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold leading-tight line-clamp-1">
                    {action.label}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Class Attendance Summary Strip - Mobile friendly */}
      <Card className="border-slate-200/90 bg-white">
        <CardHeader className="p-4 sm:p-5 pb-2 sm:pb-3 flex flex-row items-center justify-between gap-2">
          <div className="min-w-0">
            <CardTitle className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-1.5 sm:gap-2 truncate">
              <CalendarCheck className="h-4 w-4 text-emerald-600 shrink-0" />
              শ্রেণিভিত্তিক আজকের উপস্থিতি
            </CardTitle>
            <CardDescription className="hidden sm:block text-xs">
              ৬ষ্ঠ থেকে ১০ম শ্রেণি পর্যন্ত শিক্ষার্থীদের সরাসরি উপস্থিতি প্রতিবেদন
            </CardDescription>
          </div>
          <Link
            href="/dashboard/attendance"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-0.5 hover:underline shrink-0"
          >
            সম্পূর্ণ রিপোর্ট <ArrowRight className="h-3 w-3" />
          </Link>
        </CardHeader>
        <CardContent className="p-4 sm:p-5 pt-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3.5 pt-1">
            {classAttendanceSummary.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl border border-slate-100 bg-slate-50/70 space-y-1.5 hover:bg-white hover:shadow-xs transition-all"
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[11px] sm:text-xs font-bold text-slate-800 truncate">
                    {item.className}
                  </span>
                  <span className="text-[11px] sm:text-xs font-extrabold text-slate-900 shrink-0">
                    {toBanglaNumber(item.percentage)}%
                  </span>
                </div>
                <div className="w-full h-1.5 sm:h-2 rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium block truncate">
                  উপস্থিত: {item.present}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Middle Dual Section: Recent Activity & Upcoming Exams */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-7">
          <Card className="h-full border-slate-200/90 bg-white shadow-sm">
            <CardHeader className="p-4 sm:p-5 flex flex-row items-center justify-between pb-2 sm:pb-3 gap-2">
              <div className="min-w-0">
                <CardTitle className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-1.5 sm:gap-2 truncate">
                  <FileText className="h-4 w-4 text-blue-600 shrink-0" />
                  সাম্প্রতিক কার্যকলাপ ও অডিট লগ
                </CardTitle>
                <CardDescription className="hidden sm:block text-xs">
                  বিদ্যালয়ে চলমান রিয়েল-টাইম কার্যক্রমের বিবরণ
                </CardDescription>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-bold shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                লাইভ
              </span>
            </CardHeader>
            <CardContent className="p-4 sm:p-5 pt-0 space-y-2.5 sm:space-y-3">
              {recentActivities.map((act, i) => (
                <div
                  key={i}
                  className="p-3 sm:p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-200 hover:shadow-xs transition-all flex items-start gap-2.5 sm:gap-3.5 group min-w-0"
                >
                  <div
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl ${act.iconBg} flex items-center justify-center shrink-0 mt-0.5 font-bold shadow-2xs`}
                  >
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <p className="text-xs sm:text-sm font-bold text-slate-800 break-words flex-1 min-w-0">
                        {act.title}
                      </p>
                      <span className={`text-[9px] sm:text-[10px] font-bold px-1.5 py-0.2 rounded border ${act.tagColor} shrink-0`}>
                        {act.tag}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] text-slate-500 pt-1 font-medium">
                      <span className="truncate">দায়িত্বপ্রাপ্ত: <strong className="text-slate-700">{act.by}</strong></span>
                      <span className="hidden sm:inline">•</span>
                      <span className="flex items-center gap-1 text-slate-500 shrink-0">
                        <Clock className="h-3 w-3" /> {act.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Examinations */}
        <div className="lg:col-span-5">
          <Card className="h-full border-slate-200/90 bg-white shadow-sm">
            <CardHeader className="p-4 sm:p-5 flex flex-row items-center justify-between pb-2 sm:pb-3 gap-2">
              <div className="min-w-0">
                <CardTitle className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-1.5 sm:gap-2 truncate">
                  <Award className="h-4 w-4 text-purple-600 shrink-0" />
                  আসন্ন পরীক্ষার সূচি
                </CardTitle>
                <CardDescription className="hidden sm:block text-xs">
                  ২০২৬ শিক্ষাবর্ষের নির্ধারিত মূল্যায়ন
                </CardDescription>
              </div>
              <Link
                href="/dashboard/examinations"
                className="text-xs text-blue-600 font-bold hover:underline flex items-center gap-0.5 shrink-0"
              >
                সকল <ChevronRight className="h-3 w-3" />
              </Link>
            </CardHeader>
            <CardContent className="p-4 sm:p-5 pt-0 space-y-2.5 sm:space-y-3">
              {upcomingExams.map((exam, i) => (
                <div
                  key={i}
                  className="p-3 sm:p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-purple-200 hover:shadow-xs transition-all space-y-1.5 sm:space-y-2"
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className={`text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-md border ${exam.badgeColor} shrink-0`}>
                      {exam.class}
                    </span>
                    <span className="text-[11px] sm:text-xs text-slate-500 font-medium flex items-center gap-1 shrink-0">
                      <Calendar className="h-3 w-3 text-slate-400" />
                      {exam.date}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">{exam.title}</h4>
                  <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-500 pt-0.5 gap-2">
                    <span className="font-medium truncate">
                      অবস্থা: <strong className="text-slate-700">{exam.status}</strong>
                    </span>
                    <Link
                      href="/dashboard/examinations"
                      className="text-blue-600 font-bold hover:underline flex items-center gap-0.5 shrink-0"
                    >
                      রুটিন <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
