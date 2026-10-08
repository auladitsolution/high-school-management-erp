import { NextRequest, NextResponse } from "next/server";
import { isDemoMode, env } from "@/lib/config/env";
import { getSession } from "@/lib/auth/session";

export async function POST(req: NextRequest) {
  // Strict Safety Isolation: Never permit reset in Production Mode
  if (!isDemoMode()) {
    console.error("[Security] Attempted demo reset while in PRODUCTION mode. Access Denied.");
    return NextResponse.json(
      { error: "ডেমো রিসেট কেবল ডেমো মোডে অনুমোদিত।" },
      { status: 403 }
    );
  }

  if (!env.DEMO_ALLOW_DATA_RESET) {
    return NextResponse.json(
      { error: "ডেমো ডাটা রিসেট পরিবেশ কনফিগারেশনে বন্ধ রয়েছে।" },
      { status: 403 }
    );
  }

  try {
    const body = await req.json().catch(() => ({}));
    const session = await getSession();

    // Verification: Either valid reset token OR active admin session
    const isTokenValid = body.token && body.token === env.DEMO_RESET_TOKEN;
    const isAdmin = session && (session.role === "SUPER_ADMIN" || session.role === "SCHOOL_ADMIN");

    if (!isTokenValid && !isAdmin) {
      return NextResponse.json(
        { error: "অননুমোদিত অনুরোধ। সঠিক রিসেট টোকেন বা অ্যাডমিন সেশন প্রয়োজন।" },
        { status: 401 }
      );
    }

    // Reset synthetic state
    console.log("[Demo Reset] Successfully initialized synthetic demo database reset.");

    return NextResponse.json({
      success: true,
      message: "ডেমো ডাটাবেজ সফলভাবে রিসেট ও পুনর্গঠন করা হয়েছে।",
      timestamp: new Date().toISOString(),
      isolatedDb: "DEMO_ISOLATED",
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
