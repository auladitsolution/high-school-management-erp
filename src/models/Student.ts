import mongoose, { Schema, Document, Model } from "mongoose";

export interface IStudent extends Document {
  studentId: string;
  admissionNo: string;
  nameBn: string;
  nameEn: string;
  className: string; // "৬ষ্ঠ", "৭ম", "৮ম", "৯ম", "১০ম"
  section: string; // "ক", "খ"
  rollNumber: number;
  academicYear: string;
  group?: "বিজ্ঞান" | "ব্যবসায় শিক্ষা" | "মানবিক" | "সাধারণ";
  dob: Date;
  gender: "ছেলে" | "মেয়ে";
  bloodGroup?: string;
  guardianName: string;
  guardianPhone: string;
  guardianRelation: string;
  address: string;
  photoUrl?: string;
  status: "ACTIVE" | "INACTIVE" | "TRANSFERRED" | "PASSED";
  createdAt: Date;
  updatedAt: Date;
}

const StudentSchema = new Schema<IStudent>(
  {
    studentId: { type: String, required: true, unique: true, index: true },
    admissionNo: { type: String, required: true, unique: true, index: true },
    nameBn: { type: String, required: true },
    nameEn: { type: String, required: true },
    className: { type: String, required: true, index: true },
    section: { type: String, required: true },
    rollNumber: { type: Number, required: true },
    academicYear: { type: String, required: true, default: "2026", index: true },
    group: {
      type: String,
      enum: ["বিজ্ঞান", "ব্যবসায় শিক্ষা", "মানবিক", "সাধারণ"],
      default: "সাধারণ",
    },
    dob: { type: Date, required: true },
    gender: { type: String, enum: ["ছেলে", "মেয়ে"], required: true },
    bloodGroup: { type: String },
    guardianName: { type: String, required: true },
    guardianPhone: { type: String, required: true, index: true },
    guardianRelation: { type: String, default: "পিতা" },
    address: { type: String, required: true },
    photoUrl: { type: String },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "TRANSFERRED", "PASSED"],
      default: "ACTIVE",
    },
  },
  { timestamps: true }
);

StudentSchema.index({ academicYear: 1, className: 1, section: 1, rollNumber: 1 }, { unique: true });

export const StudentModel: Model<IStudent> =
  mongoose.models.Student || mongoose.model<IStudent>("Student", StudentSchema);
