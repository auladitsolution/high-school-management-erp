import React from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { isDemoMode } from "@/lib/config/env";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  const isDemo = isDemoMode();

  // Strict Production Enforcement: Require authenticated session when demo mode is disabled
  if (!isDemo && !session) {
    redirect("/login");
  }

  const userRole = session?.role || "SCHOOL_ADMIN";
  const userName = session?.displayName || (isDemo ? "অ্যাডমিন (ডেমো)" : "ইউজার");

  return (
    <DashboardShell userRole={userRole} userName={userName} isDemo={isDemo}>
      {children}
    </DashboardShell>
  );
}
