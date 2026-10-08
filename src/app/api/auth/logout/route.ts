import { NextResponse } from "next/server";
import { destroySession } from "@/lib/auth/session";

export async function POST() {
  await destroySession();
  return NextResponse.json({ success: true, message: "লগআউট সম্পন্ন হয়েছে।" });
}
