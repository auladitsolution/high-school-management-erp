"use client";

import React from "react";
import Link from "next/link";
import { Bell, UserCheck, Sparkles, ExternalLink, Menu } from "lucide-react";
import { UserRole } from "@/types";
import { ROLE_LABELS_BN } from "@/lib/auth/rbac";

interface DashboardHeaderProps {
  userRole?: UserRole;
  userName?: string;
  isDemo?: boolean;
  onMenuClick?: () => void;
}

export function DashboardHeader({
  userRole = "SCHOOL_ADMIN",
  userName = "প্রশাসক",
  isDemo = true,
  onMenuClick,
}: DashboardHeaderProps) {
  const getRoleBadgeVariant = (role: UserRole) => {
    switch (role) {
      case "SUPER_ADMIN":
      case "SCHOOL_ADMIN":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "PRINCIPAL":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "CLASS_TEACHER":
      case "TEACHER":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "ACCOUNTANT":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "STUDENT":
        return "bg-purple-50 text-purple-700 border-purple-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  return (
    <header className="h-16 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-3 sm:px-6 flex items-center justify-between z-20 shadow-xs shrink-0">
      {/* Left side: Hamburger (mobile), Title & Role Badge */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          aria-label="মেনু খুলুন"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 min-w-0">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse shrink-0 hidden sm:block" />
          <h1 className="text-sm sm:text-lg font-extrabold text-slate-900 tracking-tight truncate">
            ইআরপি ড্যাশবোর্ড
          </h1>
        </div>

        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] sm:text-xs font-bold border shrink-0 ${getRoleBadgeVariant(
            userRole
          )}`}
        >
          {ROLE_LABELS_BN[userRole] || userRole}
        </span>

        {isDemo ? (
          <span className="hidden xl:inline-flex items-center gap-1 text-[11px] bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-amber-700 font-bold px-2.5 py-0.5 rounded-full border border-amber-300 shrink-0">
            <Sparkles className="h-3 w-3 text-amber-600 animate-spin" />
            ডেমো মোড
          </span>
        ) : (
          <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] bg-emerald-50 text-emerald-700 font-bold px-2.5 py-0.5 rounded-full border border-emerald-300 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            লাইভ প্রোডাকশন
          </span>
        )}
      </div>

      {/* Right side: Actions & Profile */}
      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
        {/* Public Website Preview Link */}
        <Link
          href="/"
          target="_blank"
          className="text-xs font-bold text-slate-700 hover:text-blue-600 flex items-center gap-1 px-2 py-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-blue-50/50 hover:border-blue-200 transition-all shadow-2xs"
          title="পাবলিক ওয়েবসাইট"
        >
          <ExternalLink className="h-3.5 w-3.5 text-blue-600 shrink-0" />
          <span className="hidden md:inline">ওয়েবসাইট</span>
        </Link>

        {/* Switch persona quick button in Demo */}
        {isDemo && (
          <Link
            href="/login"
            className="text-xs font-bold text-amber-800 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 hover:border-amber-300 hover:shadow-xs px-2 py-1.5 sm:px-2.5 sm:py-1.5 rounded-xl transition-all flex items-center gap-1 shadow-2xs"
            title="রোল পরিবর্তন করুন"
          >
            <UserCheck className="h-3.5 w-3.5 text-amber-600 shrink-0" />
            <span className="hidden sm:inline">রোল পরিবর্তন</span>
          </Link>
        )}

        {/* Notification bell */}
        <button
          className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          title="নোটিফিকেশন"
          aria-label="নোটিফিকেশন"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
        </button>

        {/* User initials badge */}
        <div className="flex items-center gap-2 pl-1 sm:pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center text-xs shadow-xs ring-2 ring-blue-100 shrink-0">
            {userName.slice(0, 1)}
          </div>
          <div className="hidden lg:block text-left">
            <span className="text-xs font-bold text-slate-800 block leading-tight truncate max-w-[100px]">
              {userName}
            </span>
            <span className="text-[10px] text-emerald-600 font-bold block">অনলাইন</span>
          </div>
        </div>
      </div>
    </header>
  );
}
