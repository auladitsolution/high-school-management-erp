import mongoose from "mongoose";
import { env, isDemoMode } from "@/lib/config/env";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
  activeMode: "demo" | "production" | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache || {
  conn: null,
  promise: null,
  activeMode: null,
};

global.mongooseCache = cached;

export async function connectToDatabase(): Promise<typeof mongoose | null> {
  const currentMode = isDemoMode() ? "demo" : "production";

  // Re-verification: If mode switched between demo and production in runtime, reset cached connection
  if (cached.conn && cached.activeMode !== currentMode) {
    console.log(`[Database] Mode switched from ${cached.activeMode} to ${currentMode}. Disconnecting existing pool.`);
    await mongoose.disconnect();
    cached.conn = null;
    cached.promise = null;
    cached.activeMode = null;
  }

  if (cached.conn) {
    return cached.conn;
  }

  const targetUri = isDemoMode() ? env.DEMO_DATABASE_URI : env.MONGODB_URI;

  if (!targetUri) {
    console.warn(`[Database] No URI configured for mode: ${currentMode}. Running in mock-fallback mode.`);
    return null;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    };

    cached.promise = mongoose
      .connect(targetUri, opts)
      .then((m) => {
        console.log(`[Database] Successfully connected to ${currentMode} database.`);
        cached.activeMode = currentMode;
        return m;
      })
      .catch((err) => {
        console.error(`[Database] Connection error to ${currentMode} database:`, err.message);
        cached.promise = null;
        return null as unknown as typeof mongoose;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (err) {
    console.error("[Database] Failed to establish database connection:", err);
    return null;
  }
}
