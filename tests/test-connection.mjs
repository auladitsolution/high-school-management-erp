import fs from "fs";
import mongoose from "mongoose";
import crypto from "crypto";

const envContent = fs.readFileSync(".env.local", "utf-8");
const parsedEnv = {};

envContent.split(/\r?\n/).forEach((line) => {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) {
    const key = match[1].trim();
    let val = match[2].trim();
    if (val.startsWith('"') && val.endsWith('"')) {
      val = val.slice(1, -1);
    }
    parsedEnv[key] = val;
  }
});

console.log("=== Checking Configurations ===");
console.log("APP_MODE:", parsedEnv.APP_MODE);
console.log("DEMO_MODE_ENABLED:", parsedEnv.DEMO_MODE_ENABLED);
console.log("NEXT_PUBLIC_DEMO_BANNER:", parsedEnv.NEXT_PUBLIC_DEMO_BANNER);
console.log("MONGODB_URI present:", Boolean(parsedEnv.MONGODB_URI));
console.log("FIREBASE_ADMIN_PROJECT_ID:", parsedEnv.FIREBASE_ADMIN_PROJECT_ID);
console.log("FIREBASE_ADMIN_CLIENT_EMAIL:", parsedEnv.FIREBASE_ADMIN_CLIENT_EMAIL);
console.log("CLOUDINARY_CLOUD_NAME:", parsedEnv.CLOUDINARY_CLOUD_NAME);

async function testMongo() {
  console.log("\n[1/3] Testing MongoDB Atlas Connection...");
  try {
    const conn = await mongoose.connect(parsedEnv.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log("✅ MongoDB Atlas connection successful!");
    console.log("Connected DB name:", conn.connection.name);
    console.log("Ready state:", conn.connection.readyState);
    
    // Check ping
    const adminDb = conn.connection.db?.admin();
    if (adminDb) {
      const ping = await adminDb.ping();
      console.log("✅ Admin Ping response:", JSON.stringify(ping));
    }

    // List collections
    const collections = await conn.connection.db?.listCollections().toArray();
    console.log("Existing collections:", collections?.map((c) => c.name) || []);

    await mongoose.disconnect();
    console.log("MongoDB connection closed cleanly.");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
  }
}

async function testFirebaseKey() {
  console.log("\n[2/3] Testing Firebase Private Key Format...");
  try {
    const rawKey = parsedEnv.FIREBASE_ADMIN_PRIVATE_KEY || "";
    const formattedKey = rawKey.replace(/\\n/g, "\n");
    if (!formattedKey.includes("BEGIN PRIVATE KEY") || !formattedKey.includes("END PRIVATE KEY")) {
      throw new Error("Private key does not contain valid PEM headers");
    }
    const keyObj = crypto.createPrivateKey(formattedKey);
    console.log("✅ Firebase Private Key is valid RSA format! Key type:", keyObj.asymmetricKeyType);
  } catch (err) {
    console.error("❌ Firebase key validation failed:", err.message);
  }
}

async function testCloudinary() {
  console.log("\n[3/3] Testing Cloudinary credentials...");
  try {
    const cloudName = parsedEnv.CLOUDINARY_CLOUD_NAME;
    const apiKey = parsedEnv.CLOUDINARY_API_KEY;
    const apiSecret = parsedEnv.CLOUDINARY_API_SECRET;
    if (!cloudName || !apiKey || !apiSecret) {
      console.log("⚠️ Cloudinary credentials missing.");
      return;
    }
    const authHeader = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/ping`, {
      headers: {
        Authorization: `Basic ${authHeader}`,
      },
    });
    if (res.ok) {
      const data = await res.json();
      console.log("✅ Cloudinary API ping successful:", data);
    } else {
      console.log("⚠️ Cloudinary ping returned status:", res.status, res.statusText);
    }
  } catch (err) {
    console.error("❌ Cloudinary ping failed:", err.message);
  }
}

async function main() {
  await testMongo();
  await testFirebaseKey();
  await testCloudinary();
  console.log("\nVerification finished.");
  process.exit(0);
}

main();
