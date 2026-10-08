"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { DashboardSidebar } from "./dashboard-sidebar";
import { DashboardHeader } from "./dashboard-header";
import { UserRole } from "@/types";

interface DashboardShellProps {
  userRole: UserRole;
  userName: string;
  isDemo: boolean;
  children: React.ReactNode;
}

export function DashboardShell({
  userRole,
  userName,
  isDemo,
  children,
}: DashboardShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile sidebar automatically on navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <div className="h-screen max-h-screen h-[100dvh] flex flex-col bg-slate-50 text-slate-900 font-sans overflow-hidden w-full max-w-full">
      {/* Middle Section: Fixed Sidebar + Header & Scrollable Main */}
      <div className="flex-1 min-h-0 flex min-w-0 overflow-hidden relative w-full">
        {/* Fixed Left Sidebar (Desktop persistent + Mobile off-canvas drawer) */}
        <DashboardSidebar
          userRole={userRole}
          userName={userName}
          isDemo={isDemo}
          mobileOpen={mobileMenuOpen}
          onMobileClose={() => setMobileMenuOpen(false)}
        />

        {/* Right Section: Fixed Header + Scrollable Content */}
        <div className="flex-1 min-w-0 flex flex-col h-full min-h-0 overflow-hidden bg-gradient-to-br from-slate-50 via-slate-50 to-blue-50/20 w-full">
          {/* Top Fixed Header - Never scrolls */}
          <div className="shrink-0 z-20 w-full">
            <DashboardHeader
              userRole={userRole}
              userName={userName}
              isDemo={isDemo}
              onMenuClick={() => setMobileMenuOpen(true)}
            />
          </div>

          {/* Main Content Area - ONLY this element scrolls vertically */}
          <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-3.5 sm:p-5 lg:p-8 max-w-7xl w-full mx-auto space-y-5 sm:space-y-6 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
