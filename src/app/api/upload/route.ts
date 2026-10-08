import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { env } from "@/lib/config/env";
import { getSession } from "@/lib/auth/session";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    // Allow authenticated users to upload photos
    if (!session) {
      return NextResponse.json({ error: "অননুমোদিত অ্যাক্সেস। অনুগ্রহ করে লগইন করুন।" }, { status: 401 });
    }

    const cloudName = env.CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = env.CLOUDINARY_API_KEY || process.env.CLOUDINARY_API_KEY;
    const apiSecret = env.CLOUDINARY_API_SECRET || process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json(
        { error: "Cloudinary কনফিগারেশন পাওয়া যায়নি।" },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file");
    const subFolder = (formData.get("folder") as string) || "general";

    if (!file) {
      return NextResponse.json({ error: "কোন ফাইল নির্বাচন করা হয়নি।" }, { status: 400 });
    }

    const timestamp = Math.round(new Date().getTime() / 1000);
    const folder = `school_erp/${subFolder}`;
    const paramsToSign = `folder=${folder}&timestamp=${timestamp}`;
    const signature = crypto.createHash("sha1").update(paramsToSign + apiSecret).digest("hex");

    const uploadPayload = new FormData();
    uploadPayload.append("file", file as Blob);
    uploadPayload.append("api_key", apiKey);
    uploadPayload.append("timestamp", timestamp.toString());
    uploadPayload.append("folder", folder);
    uploadPayload.append("signature", signature);

    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const res = await fetch(cloudinaryUrl, {
      method: "POST",
      body: uploadPayload,
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error?.message || "Cloudinary এ ছবি আপলোড ব্যর্থ হয়েছে");
    }

    return NextResponse.json({
      success: true,
      url: data.secure_url,
      publicId: data.public_id,
      format: data.format,
      width: data.width,
      height: data.height,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "ছবি আপলোডে ত্রুটি দেখা দিয়েছে";
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
