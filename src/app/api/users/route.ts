import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { getSession } from "@/lib/auth/session";
import { connectToDatabase } from "@/lib/database/connection";
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

export async function GET() {
  try {
    const session = await getSession();
    if (!session || (session.role !== "SUPER_ADMIN" && session.role !== "SCHOOL_ADMIN")) {
      return NextResponse.json({ error: "অননুমোদিত অ্যাক্সেস" }, { status: 403 });
    }

    await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) {
      return NextResponse.json({ error: "ডাটাবেজ সংযোগ ব্যর্থ" }, { status: 500 });
    }

    const users = await db
      .collection("users")
      .find({})
      .sort({ createdAt: -1 })
      .project({ password: 0 }) // Do not expose password
      .toArray();

    return NextResponse.json({ users });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Error fetching users";
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== "SUPER_ADMIN") {
      return NextResponse.json(
        { error: "শুধুমাত্র সুপার অ্যাডমিন নতুন ইউজার ও রোল তৈরি করতে পারবেন।" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { email, name, role, password, phone, photoUrl } = body;

    if (!email || !name || !role || !password) {
      return NextResponse.json(
        { error: "ইমেইল, নাম, রোল ও পাসওয়ার্ড আবশ্যক।" },
        { status: 400 }
      );
    }

    const cleanEmail = String(email).trim().toLowerCase();
    if (!VALID_ROLES.includes(role as UserRole)) {
      return NextResponse.json(
        { error: "সঠিক প্রাতিষ্ঠানিক রোল নির্বাচন করুন।" },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) {
      return NextResponse.json({ error: "ডাটাবেজ সংযোগ ব্যর্থ" }, { status: 500 });
    }

    const usersCol = db.collection("users");

    // Check existing email
    const existing = await usersCol.findOne({
      email: { $regex: new RegExp(`^${cleanEmail}$`, "i") },
    });

    if (existing) {
      return NextResponse.json(
        { error: "এই ইমেইলটি ইতিমধ্যে ডাটাবেজে ব্যবহৃত হচ্ছে।" },
        { status: 409 }
      );
    }

    const newUserDoc = {
      uid: `usr-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      email: cleanEmail,
      name: String(name).trim(),
      displayName: String(name).trim(),
      role,
      password: String(password).trim(),
      phone: phone ? String(phone).trim() : undefined,
      photoUrl: photoUrl ? String(photoUrl).trim() : undefined,
      avatar: photoUrl ? String(photoUrl).trim() : undefined,
      isActive: true,
      status: "ACTIVE",
      canCreateTask: role === "SUPER_ADMIN" || role === "SCHOOL_ADMIN",
      createdBy: session.email,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await usersCol.insertOne(newUserDoc);

    return NextResponse.json({
      success: true,
      message: `${name} (${role}) সফলভাবে নতুন ইউজার হিসেবে তৈরি হয়েছে!`,
      user: {
        email: newUserDoc.email,
        name: newUserDoc.name,
        role: newUserDoc.role,
      },
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Error creating user";
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== "SUPER_ADMIN") {
      return NextResponse.json(
        { error: "শুধুমাত্র সুপার অ্যাডমিন ইউজার তথ্য সংশোধন করতে পারবেন।" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { id, name, role, status, phone, password, photoUrl } = body;

    if (!id) {
      return NextResponse.json({ error: "ইউজার আইডি আবশ্যক।" }, { status: 400 });
    }

    await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) {
      return NextResponse.json({ error: "ডাটাবেজ সংযোগ ব্যর্থ" }, { status: 500 });
    }

    const usersCol = db.collection("users");
    const { ObjectId } = mongoose.Types;

    let filter: any;
    try {
      filter = { _id: new ObjectId(id) };
    } catch {
      filter = { uid: id };
    }

    const targetUser = await usersCol.findOne(filter);
    if (!targetUser) {
      return NextResponse.json({ error: "ইউজার খুঁজে পাওয়া যায়নি।" }, { status: 404 });
    }

    // Safety: Protect primary super admin
    if (targetUser.email === "auladinfo@gmail.com" && role && role !== "SUPER_ADMIN") {
      return NextResponse.json(
        { error: "প্রধান সুপার অ্যাডমিনের রোল পরিবর্তন করা যাবে না।" },
        { status: 400 }
      );
    }

    const updateDoc: Record<string, unknown> = {
      updatedAt: new Date(),
    };
    if (name) {
      updateDoc.name = String(name).trim();
      updateDoc.displayName = String(name).trim();
    }
    if (role && VALID_ROLES.includes(role as UserRole)) {
      updateDoc.role = role;
    }
    if (status) {
      updateDoc.status = status;
      updateDoc.isActive = status === "ACTIVE";
    }
    if (phone !== undefined) {
      updateDoc.phone = phone ? String(phone).trim() : "";
    }
    if (password) {
      updateDoc.password = String(password).trim();
    }
    if (photoUrl !== undefined) {
      updateDoc.photoUrl = photoUrl;
      updateDoc.avatar = photoUrl;
    }

    await usersCol.updateOne(filter, { $set: updateDoc });

    return NextResponse.json({
      success: true,
      message: "ইউজারের তথ্য সফলভাবে সংশোধন ও আপডেট হয়েছে!",
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Error updating user";
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== "SUPER_ADMIN") {
      return NextResponse.json(
        { error: "শুধুমাত্র সুপার অ্যাডমিন ইউজার মুছে ফেলতে পারবেন।" },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ইউজার আইডি আবশ্যক।" }, { status: 400 });
    }

    await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) {
      return NextResponse.json({ error: "ডাটাবেজ সংযোগ ব্যর্থ" }, { status: 500 });
    }

    const usersCol = db.collection("users");
    const { ObjectId } = mongoose.Types;

    let filter: any;
    try {
      filter = { _id: new ObjectId(id) };
    } catch {
      filter = { uid: id };
    }

    const targetUser = await usersCol.findOne(filter);
    if (!targetUser) {
      return NextResponse.json({ error: "ইউজার খুঁজে পাওয়া যায়নি।" }, { status: 404 });
    }

    // Safety: Protect primary super admin
    if (targetUser.email === "auladinfo@gmail.com") {
      return NextResponse.json(
        { error: "প্রধান সুপার অ্যাডমিন অ্যাকাউন্ট মুছে ফেলা স্থায়ীভাবে নিষিদ্ধ।" },
        { status: 400 }
      );
    }

    await usersCol.deleteOne(filter);

    return NextResponse.json({
      success: true,
      message: `${targetUser.name || targetUser.email} অ্যাকাউন্টটি সফলভাবে মুছে ফেলা হয়েছে!`,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Error deleting user";
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
