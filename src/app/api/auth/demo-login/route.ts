import { NextRequest, NextResponse } from "next/server";
import { isDemoMode } from "@/lib/config/env";
import { DEMO_PERSONAS } from "@/lib/auth/demo-users";
import { createSession } from "@/lib/auth/session";

export async function POST(req: NextRequest) {
  // Strict Security Isolation: Demo login cannot be invoked in Production mode
  if (!isDemoMode()) {
    return NextResponse.json(
      { error: "ডেমো মোড নিষ্ক্রিয় করা আছে। সরাসরি লগইন ব্যবহার করুন।" },
      { status: 403 }
    );
  }

  try {
    const { personaId } = await req.json();
    const persona = DEMO_PERSONAS.find((p) => p.id === personaId);

    if (!persona) {
      return NextResponse.json(
        { error: "ডেমো ইউজার পাওয়া যায়নি।" },
        { status: 400 }
      );
    }

    await createSession({
      uid: persona.id,
      email: persona.email,
      displayName: persona.nameBn,
      role: persona.role,
      isDemoUser: true,
      schoolId: "demo-school-001",
    });

    return NextResponse.json({
      success: true,
      message: `${persona.nameBn} হিসেবে সফলভাবে লগইন হয়েছে।`,
      redirect: "/dashboard",
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
