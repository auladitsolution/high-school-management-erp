"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GraduationCap,
  LayoutDashboard,
  Users,
  UserCheck,
  CalendarCheck,
  Award,
  Wallet,
  UserPlus,
  BookMarked,
  Bell,
  BarChart3,
  Settings,
  RefreshCw,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { UserRole } from "@/types";
import { ROLE_LABELS_BN } from "@/lib/auth/rbac";

interface DashboardSidebarProps {
  userRole?: UserRole;
  userName?: string;
  isDemo?: boolean;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function DashboardSidebar({
  userRole = "SCHOOL_ADMIN",
  userName = "প্রশাসক",
  isDemo = true,
  mobileOpen = false,
  onMobileClose,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const menuSections = [
    {
      title: "প্রধান মেনু",
      items: [
        { label: "ড্যাশবোর্ড", href: "/dashboard", icon: LayoutDashboard, roles: ["ALL"], activeColor: "from-blue-600 to-indigo-600", iconColor: "text-blue-400" },
        { label: "শিক্ষার্থী ব্যবস্থাপনা", href: "/dashboard/students", icon: Users, roles: ["SUPER_ADMIN", "SCHOOL_ADMIN", "PRINCIPAL", "CLASS_TEACHER", "TEACHER", "ACCOUNTANT"], activeColor: "from-sky-600 to-blue-600", iconColor: "text-sky-400" },
        { label: "শিক্ষক ও কর্মকর্তা", href: "/dashboard/teachers", icon: UserCheck, roles: ["SUPER_ADMIN", "SCHOOL_ADMIN", "PRINCIPAL"], activeColor: "from-emerald-600 to-teal-600", iconColor: "text-emerald-400" },
        { label: "দৈনিক হাজিরা", href: "/dashboard/attendance", icon: CalendarCheck, roles: ["SUPER_ADMIN", "SCHOOL_ADMIN", "PRINCIPAL", "CLASS_TEACHER", "TEACHER", "STUDENT", "PARENT"], activeColor: "from-teal-600 to-emerald-600", iconColor: "text-teal-400" },
        { label: "পরীক্ষা ও ফলাফল", href: "/dashboard/examinations", icon: Award, roles: ["SUPER_ADMIN", "SCHOOL_ADMIN", "PRINCIPAL", "CLASS_TEACHER", "TEACHER", "STUDENT", "PARENT"], activeColor: "from-purple-600 to-violet-600", iconColor: "text-purple-400" },
      ],
    },
    {
      title: "প্রশাসন ও সেবা",
      items: [
        { label: "ফি ও হিসাবরক্ষণ", href: "/dashboard/finance", icon: Wallet, roles: ["SUPER_ADMIN", "SCHOOL_ADMIN", "PRINCIPAL", "ACCOUNTANT", "STUDENT", "PARENT"], activeColor: "from-amber-600 to-orange-600", iconColor: "text-amber-400" },
        { label: "অনলাইন ভর্তি", href: "/dashboard/admissions", icon: UserPlus, roles: ["SUPER_ADMIN", "SCHOOL_ADMIN", "PRINCIPAL"], activeColor: "from-cyan-600 to-blue-600", iconColor: "text-cyan-400" },
        { label: "লাইব্রেরি পোর্টাল", href: "/dashboard/library", icon: BookMarked, roles: ["SUPER_ADMIN", "SCHOOL_ADMIN", "PRINCIPAL", "LIBRARIAN", "STUDENT", "TEACHER"], activeColor: "from-rose-600 to-pink-600", iconColor: "text-rose-400" },
        { label: "নোটিশ ও ঘোষণা", href: "/dashboard/notices", icon: Bell, roles: ["ALL"], activeColor: "from-orange-600 to-amber-600", iconColor: "text-orange-400" },
        { label: "রিপোর্ট ও বিশ্লেষণ", href: "/dashboard/reports", icon: BarChart3, roles: ["SUPER_ADMIN", "SCHOOL_ADMIN", "PRINCIPAL", "ACCOUNTANT"], activeColor: "from-indigo-600 to-purple-600", iconColor: "text-indigo-400" },
      ],
    },
    {
      title: "সিস্টেম ও কনফিগ",
      items: [
        { label: "বিদ্যালয় সেটিংস", href: "/dashboard/settings", icon: Settings, roles: ["SUPER_ADMIN", "SCHOOL_ADMIN"], activeColor: "from-slate-700 to-slate-800", iconColor: "text-slate-400" },
        { label: "ডেমো ডাটা রিসেট", href: "/dashboard/demo-reset", icon: RefreshCw, roles: ["SUPER_ADMIN", "SCHOOL_ADMIN", "PRINCIPAL"], demoOnly: true, activeColor: "from-amber-600 to-red-600", iconColor: "text-amber-400" },
      ],
    },
  ];

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  };

  const renderNavContent = (isMobileView: boolean) => (
    <>
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-white/10 bg-white/[0.02] shrink-0">
        <Link
          href="/dashboard"
          onClick={isMobileView ? onMobileClose : undefined}
          className="flex items-center gap-2.5 truncate group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-blue-500/30 group-hover:scale-105 transition-all shrink-0">
            <GraduationCap className="h-5 w-5" />
          </div>
          {(!collapsed || isMobileView) && (
            <div className="truncate text-left">
              <h2 className="text-sm font-bold text-white tracking-tight truncate">
                অগ্রদূত মডেল স্কুল
              </h2>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] bg-blue-500/20 text-blue-300 border border-blue-400/30 px-1.5 py-0.2 rounded font-semibold">
                  ইআরপি সিস্টেম
                </span>
              </div>
            </div>
          )}
        </Link>

        {/* Desktop Collapse Toggle */}
        {!isMobileView && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 hidden lg:block transition-colors"
            title={collapsed ? "মেনু বড় করুন" : "মেনু ছোট করুন"}
            aria-label="টগল সাইডবার"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        )}

        {/* Mobile Close Button */}
        {isMobileView && (
          <button
            onClick={onMobileClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title="মেনু বন্ধ করুন"
            aria-label="মেনু বন্ধ করুন"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-5">
        {menuSections.map((section, sIdx) => {
          const visibleItems = section.items.filter((item) => {
            if (item.demoOnly && !isDemo) return false;
            if (item.roles.includes("ALL")) return true;
            return item.roles.includes(userRole);
          });

          if (visibleItems.length === 0) return null;

          return (
            <div key={sIdx} className="space-y-1">
              {(!collapsed || isMobileView) && (
                <div className="text-[11px] font-bold text-slate-400 uppercase px-3 pb-1 tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500/70" />
                  {section.title}
                </div>
              )}
              {visibleItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={isMobileView ? onMobileClose : undefined}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                      isActive
                        ? `bg-gradient-to-r ${item.activeColor} text-white shadow-md shadow-indigo-500/25 font-semibold ring-1 ring-white/20`
                        : "text-slate-300 hover:text-white hover:bg-white/10 hover:translate-x-0.5"
                    )}
                    title={collapsed && !isMobileView ? item.label : undefined}
                  >
                    <Icon
                      className={cn(
                        "h-5 w-5 shrink-0 transition-transform group-hover:scale-110",
                        isActive ? "text-white" : item.iconColor
                      )}
                    />
                    {(!collapsed || isMobileView) && <span className="truncate">{item.label}</span>}
                    {isActive && (!collapsed || isMobileView) && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    )}
                  </Link>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* User profile card & Logout */}
      <div className="p-3 border-t border-white/10 bg-black/20 shrink-0">
        {(!collapsed || isMobileView) && (
          <div className="p-2.5 rounded-xl bg-white/[0.06] border border-white/10 mb-2.5 flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md ring-2 ring-white/20">
                {userName.slice(0, 1)}
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-900" />
            </div>
            <div className="truncate flex-1 text-left">
              <p className="text-xs font-bold text-white truncate leading-tight">{userName}</p>
              <div className="flex items-center gap-1.5 pt-0.5">
                <span className="text-[10px] bg-amber-400/20 text-amber-300 border border-amber-400/30 px-1.5 py-0.2 rounded font-semibold truncate">
                  {ROLE_LABELS_BN[userRole] || userRole}
                </span>
                <span className="text-[9px] text-emerald-400 font-medium shrink-0">অনলাইন</span>
              </div>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className={cn(
            "w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-300 hover:bg-rose-500/20 hover:text-rose-100 transition-colors border border-rose-500/20",
            collapsed && !isMobileView && "justify-center"
          )}
          title="লগআউট"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {(!collapsed || isMobileView) && <span>লগআউট করুন</span>}
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* 1. Desktop Persistent Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col h-full bg-gradient-to-b from-[#0d1627] via-[#101c34] to-[#0a1020] text-slate-200 transition-all duration-300 border-r border-slate-800/80 shrink-0 select-none z-30 shadow-xl overflow-hidden",
          collapsed ? "w-20" : "w-64"
        )}
      >
        {renderNavContent(false)}
      </aside>

      {/* 2. Mobile Drawer Slide-over */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs transition-opacity"
            onClick={onMobileClose}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <aside
            className="fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-gradient-to-b from-[#0d1627] via-[#101c34] to-[#0a1020] text-slate-200 flex flex-col shadow-2xl z-50 border-r border-slate-800"
            role="dialog"
            aria-modal="true"
          >
            {renderNavContent(true)}
          </aside>
        </div>
      )}
    </>
  );
}
