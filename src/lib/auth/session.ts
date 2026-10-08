import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { UserRole, UserSession } from "@/types";
import { env, isDemoMode } from "@/lib/config/env";

const COOKIE_NAME = "school_erp_session";
const SECRET_KEY = new TextEncoder().encode(env.SESSION_SECRET);

export async function createSession(sessionData: Omit<UserSession, "envMode">): Promise<string> {
  const currentMode = isDemoMode() ? "demo" : "production";
  const payload: UserSession = {
    ...sessionData,
    envMode: currentMode,
  };

  const jwt = await new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setAudience(`highschool-${currentMode}`)
    .setExpirationTime("24h")
    .sign(SECRET_KEY);

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, jwt, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
  });

  return jwt;
}

export async function getSession(): Promise<UserSession | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) return null;

    const currentMode = isDemoMode() ? "demo" : "production";
    const { payload } = await jwtVerify(token, SECRET_KEY, {
      audience: `highschool-${currentMode}`,
    });

    const session = payload as unknown as UserSession;

    // Strict Mode Isolation: Invalidate session minted under different operational mode
    if (session.envMode !== currentMode) {
      console.warn(`[Security] Session audience mismatch: expected ${currentMode}, received ${session.envMode}. Rejecting session.`);
      await destroySession();
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
