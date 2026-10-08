import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAdmissionApplication extends Document {
  applicationNo: string;
  applicantNameBn: string;
  applicantNameEn: string;
  targetClass: string;
  dob: Date;
  gender: "ছেলে" | "মেয়ে";
  bloodGroup?: string;
  guardianName: string;
  guardianPhone: string;
  guardianNid?: string;
  address: string;
  previousSchool?: string;
  previousGpa?: number;
  status: "PENDING" | "APPROVED" | "REJECTED";
  rejectionReason?: string;
  reviewedBy?: string;
  reviewedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AdmissionApplicationSchema = new Schema<IAdmissionApplication>(
  {
    applicationNo: { type: String, required: true, unique: true, index: true },
    applicantNameBn: { type: String, required: true },
    applicantNameEn: { type: String, required: true },
    targetClass: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, enum: ["ছেলে", "মেয়ে"], required: true },
    bloodGroup: { type: String },
    guardianName: { type: String, required: true },
    guardianPhone: { type: String, required: true, index: true },
    guardianNid: { type: String },
    address: { type: String, required: true },
    previousSchool: { type: String },
    previousGpa: { type: Number },
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },
    rejectionReason: { type: String },
    reviewedBy: { type: String },
    reviewedAt: { type: Date },
  },
  { timestamps: true }
);

export const AdmissionApplicationModel: Model<IAdmissionApplication> =
  mongoose.models.AdmissionApplication ||
  mongoose.model<IAdmissionApplication>("AdmissionApplication", AdmissionApplicationSchema);
