import mongoose, { Schema, Document, Model } from "mongoose";
import { UserRole } from "@/types";

export interface IUser extends Document {
  firebaseUid: string;
  email: string;
  displayName: string;
  phone?: string;
  role: UserRole;
  status: "ACTIVE" | "SUSPENDED" | "PENDING_APPROVAL";
  isDemoUser: boolean;
  avatarUrl?: string;
  schoolId?: string;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    firebaseUid: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    displayName: { type: String, required: true, trim: true },
    phone: { type: String, trim: true },
    role: {
      type: String,
      required: true,
      enum: [
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
      ],
      default: "STUDENT",
    },
    status: {
      type: String,
      enum: ["ACTIVE", "SUSPENDED", "PENDING_APPROVAL"],
      default: "ACTIVE",
    },
    isDemoUser: { type: Boolean, default: false },
    avatarUrl: { type: String },
    schoolId: { type: String },
    lastLoginAt: { type: Date },
  },
  { timestamps: true }
);

export const UserModel: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
