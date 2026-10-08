import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/database/connection";
import { createSession } from "@/lib/auth/session";
import { UserRole } from "@/types";

const VALID_ROLES: UserRole[] = [
  "SUPER_ADMIN",
  "SCHOOL_ADMIN",
  "PRINCIPAL",
  "VICE_PRINCIPAL",
  "TEACHER",
  "CLASS_TEACHER",
  "STUDENT",
  "PARENT",
  "ACCOUNTANT",
  "LIBRARIAN",
  "STAFF",
];

function normalizeRole(rawRole?: string): UserRole {
  if (!rawRole) return "STAFF";
  const upper = rawRole.toUpperCase();
  if (upper === "ADMIN") return "SCHOOL_ADMIN";
  if (VALID_ROLES.includes(upper as UserRole)) {
    return upper as UserRole;
  }
  return "STAFF";
}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "অনুগ্রহ করে একটি সঠিক ইমেইল প্রদান করুন।" },
        { status: 400 }
      );
    }

    if (!password) {
      return NextResponse.json(
        { error: "পাসওয়ার্ড আবশ্যক।" },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    // Verify Master Admin Credentials
    if (cleanEmail === "auladinfo@gmail.com") {
      if (password !== "aulad@02061989") {
        return NextResponse.json(
          { error: "ভুল পাসওয়ার্ড! সঠিক পাসওয়ার্ড প্রদান করুন।" },
          { status: 401 }
        );
      }
    }

    // Connect to Production MongoDB Atlas
    await connectToDatabase();
    const db = mongoose.connection.db;

    if (!db) {
      return NextResponse.json(
        { error: "ডাটাবেজ সংযোগ স্থাপন সম্ভব হয়নি।" },
        { status: 500 }
      );
    }

    const usersCol = db.collection("users");

    // Search case-insensitively
    let user = await usersCol.findOne({
      email: { $regex: new RegExp(`^${cleanEmail}$`, "i") },
    });

    // If user not in database yet, check if it's the designated primary admin account
    if (!user) {
      if (cleanEmail === "auladinfo@gmail.com") {
        const newAdminDoc = {
          uid: "hqUjbKgsh9eEYyIel1uMBR08UD33",
          email: cleanEmail,
          name: "Md. Aulad Hossen",
          displayName: "Md. Aulad Hossen",
          role: "SUPER_ADMIN",
          isActive: true,
          status: "ACTIVE",
          canCreateTask: true,
          isDemoUser: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        const insertRes = await usersCol.insertOne(newAdminDoc);
        user = { ...newAdminDoc, _id: insertRes.insertedId };
      } else {
        return NextResponse.json(
          { error: "অননুমোদিত অ্যাকাউন্ট। প্রোডাকশন মোডে শুধুমাত্র অনুমোদিত সুপার অ্যাডমিন ও নিবন্ধিত ইউজার লগইন করতে পারবেন।" },
          { status: 401 }
        );
      }
    }

    // Check account status
    if (user.isActive === false || user.status === "SUSPENDED") {
      return NextResponse.json(
        { error: "এই অ্যাকাউন্টটি বর্তমানে নিষ্ক্রিয় বা স্থগিত।" },
        { status: 403 }
      );
    }

    // Check password for other users if they have a stored password
    if (cleanEmail !== "auladinfo@gmail.com") {
      if (user.password && user.password !== password) {
        return NextResponse.json(
          { error: "ভুল পাসওয়ার্ড! সঠিক পাসওয়ার্ড প্রদান করুন।" },
          { status: 401 }
        );
      }
    }

    const userRole = cleanEmail === "auladinfo@gmail.com" ? "SUPER_ADMIN" : normalizeRole(user.role);
    const displayName = user.name || user.displayName || (cleanEmail === "auladinfo@gmail.com" ? "Md. Aulad Hossen" : cleanEmail.split("@")[0]);
    const uid = user.uid || user.firebaseUid || user._id.toString();

    // Update last login timestamp in MongoDB
    await usersCol.updateOne(
      { _id: user._id },
      { $set: { lastLoginAt: new Date(), updatedAt: new Date(), role: userRole } }
    );

    // Create session cookie
    await createSession({
      uid,
      email: cleanEmail,
      displayName,
      role: userRole,
      isDemoUser: false,
      schoolId: user.schoolId || "school-001",
    });

    return NextResponse.json({
      success: true,
      message: `${displayName} (${userRole === "SUPER_ADMIN" ? "সুপার অ্যাডমিন" : userRole}) হিসেবে সফলভাবে লগইন হয়েছে!`,
      redirect: "/dashboard",
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "অভ্যন্তরীণ সমস্যা দেখা দিয়েছে";
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
