import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITeacher extends Document {
  employeeId: string;
  nameBn: string;
  nameEn: string;
  designation: string;
  department: string;
  phone: string;
  email: string;
  qualification: string;
  joiningDate: Date;
  assignedSubjects: string[];
  assignedClasses: string[];
  isClassTeacherOf?: {
    className: string;
    section: string;
  };
  photoUrl?: string;
  salaryPaisa: number;
  status: "ACTIVE" | "ON_LEAVE" | "RESIGNED";
  createdAt: Date;
  updatedAt: Date;
}

const TeacherSchema = new Schema<ITeacher>(
  {
    employeeId: { type: String, required: true, unique: true, index: true },
    nameBn: { type: String, required: true },
    nameEn: { type: String, required: true },
    designation: { type: String, required: true },
    department: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    qualification: { type: String, required: true },
    joiningDate: { type: Date, default: Date.now },
    assignedSubjects: [{ type: String }],
    assignedClasses: [{ type: String }],
    isClassTeacherOf: {
      className: { type: String },
      section: { type: String },
    },
    photoUrl: { type: String },
    salaryPaisa: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["ACTIVE", "ON_LEAVE", "RESIGNED"],
      default: "ACTIVE",
    },
  },
  { timestamps: true }
);

export const TeacherModel: Model<ITeacher> =
  mongoose.models.Teacher || mongoose.model<ITeacher>("Teacher", TeacherSchema);
