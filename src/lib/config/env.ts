import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  APP_MODE: z.enum(["demo", "production"]).default("production"),
  DEMO_MODE_ENABLED: z
    .string()
    .default("false")
    .transform((val) => val === "true"),
  NEXT_PUBLIC_APP_MODE: z.enum(["demo", "production"]).default("production"),
  NEXT_PUBLIC_DEMO_MODE_ENABLED: z
    .string()
    .default("false")
    .transform((val) => val === "true"),
  DEMO_DATABASE_URI: z.string().optional(),
  MONGODB_URI: z.string().optional(),
  DEMO_ALLOW_DATA_RESET: z
    .string()
    .default("false")
    .transform((val) => val === "true"),
  DEMO_RESET_TOKEN: z.string().default("bangla-high-school-demo-reset-2026"),
  NEXT_PUBLIC_DEMO_BANNER: z
    .string()
    .default("false")
    .transform((val) => val === "true"),
  NEXT_PUBLIC_APP_NAME: z.string().default("উচ্চ বিদ্যালয় ব্যবস্থাপনা ইআরপি"),
  NEXT_PUBLIC_APP_URL: z.string().default("http://localhost:3000"),
  SESSION_SECRET: z.string().default("dev-secret-key-32-chars-minimum-length-2026"),
  // Firebase configuration
  NEXT_PUBLIC_FIREBASE_API_KEY: z.string().optional(),
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z.string().optional(),
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string().optional(),
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: z.string().optional(),
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: z.string().optional(),
  NEXT_PUBLIC_FIREBASE_APP_ID: z.string().optional(),
  // Firebase Admin
  FIREBASE_ADMIN_PROJECT_ID: z.string().optional(),
  FIREBASE_ADMIN_CLIENT_EMAIL: z.string().optional(),
  FIREBASE_ADMIN_PRIVATE_KEY: z.string().optional(),
  // Cloudinary
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
});

export type EnvConfig = z.infer<typeof envSchema>;

function validateEnv(): EnvConfig {
  const parsed = envSchema.safeParse({
    NODE_ENV: process.env.NODE_ENV,
    APP_MODE: process.env.APP_MODE,
    DEMO_MODE_ENABLED: process.env.DEMO_MODE_ENABLED,
    NEXT_PUBLIC_APP_MODE: process.env.NEXT_PUBLIC_APP_MODE,
    NEXT_PUBLIC_DEMO_MODE_ENABLED: process.env.NEXT_PUBLIC_DEMO_MODE_ENABLED,
    DEMO_DATABASE_URI: process.env.DEMO_DATABASE_URI,
    MONGODB_URI: process.env.MONGODB_URI,
    DEMO_ALLOW_DATA_RESET: process.env.DEMO_ALLOW_DATA_RESET,
    DEMO_RESET_TOKEN: process.env.DEMO_RESET_TOKEN,
    NEXT_PUBLIC_DEMO_BANNER: process.env.NEXT_PUBLIC_DEMO_BANNER,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    SESSION_SECRET: process.env.SESSION_SECRET,
    NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    FIREBASE_ADMIN_PROJECT_ID: process.env.FIREBASE_ADMIN_PROJECT_ID,
    FIREBASE_ADMIN_CLIENT_EMAIL: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    FIREBASE_ADMIN_PRIVATE_KEY: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  });

  if (!parsed.success) {
    console.error("❌ Environment configuration validation failed:", parsed.error.format());
    throw new Error("Invalid application environment configuration.");
  }

  // Safety check: Prevent contradictory demo/production mode configuration
  if (parsed.data.APP_MODE === "production" && parsed.data.DEMO_MODE_ENABLED) {
    console.warn("⚠️ Warning: APP_MODE is 'production' but DEMO_MODE_ENABLED is true. Forcing DEMO_MODE_ENABLED to false for safety.");
    parsed.data.DEMO_MODE_ENABLED = false;
  }

  return parsed.data;
}

export const env = validateEnv();

export function isDemoMode(): boolean {
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_DEMO_MODE_ENABLED === "true" || process.env.NEXT_PUBLIC_APP_MODE === "demo";
  }
  return env.APP_MODE === "demo" && env.DEMO_MODE_ENABLED;
}

export function isProductionMode(): boolean {
  return !isDemoMode();
}
