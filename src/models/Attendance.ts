import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAttendance extends Document {
  date: string; // YYYY-MM-DD
  academicYear: string;
  className: string;
  section: string;
  studentId: string;
  rollNumber: number;
  status: "PRESENT" | "ABSENT" | "LATE" | "LEAVE";
  note?: string;
  recordedBy: string; // Teacher or Admin employeeId
  updatedHistory?: Array<{
    previousStatus: string;
    newStatus: string;
    updatedBy: string;
    reason: string;
    updatedAt: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const AttendanceSchema = new Schema<IAttendance>(
  {
    date: { type: String, required: true, index: true },
    academicYear: { type: String, required: true, default: "2026" },
    className: { type: String, required: true, index: true },
    section: { type: String, required: true },
    studentId: { type: String, required: true, index: true },
    rollNumber: { type: Number, required: true },
    status: {
      type: String,
      enum: ["PRESENT", "ABSENT", "LATE", "LEAVE"],
      default: "PRESENT",
    },
    note: { type: String },
    recordedBy: { type: String, required: true },
    updatedHistory: [
      {
        previousStatus: String,
        newStatus: String,
        updatedBy: String,
        reason: String,
        updatedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

AttendanceSchema.index({ date: 1, studentId: 1 }, { unique: true });

export const AttendanceModel: Model<IAttendance> =
  mongoose.models.Attendance || mongoose.model<IAttendance>("Attendance", AttendanceSchema);
