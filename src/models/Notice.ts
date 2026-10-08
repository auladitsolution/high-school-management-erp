import mongoose, { Schema, Document, Model } from "mongoose";

export interface INotice extends Document {
  title: string;
  category: "ভর্তি" | "পরীক্ষা" | "ছুটি" | "অনুষ্ঠান" | "জরুরি" | "একাডেমিক" | "সাধারণ";
  content: string;
  attachmentUrl?: string;
  isPinned: boolean;
  targetRole: "ALL" | "STUDENT" | "TEACHER" | "PARENT";
  publishedDate: Date;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const NoticeSchema = new Schema<INotice>(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ["ভর্তি", "পরীক্ষা", "ছুটি", "অনুষ্ঠান", "জরুরি", "একাডেমিক", "সাধারণ"],
      default: "সাধারণ",
    },
    content: { type: String, required: true },
    attachmentUrl: { type: String },
    isPinned: { type: Boolean, default: false },
    targetRole: {
      type: String,
      enum: ["ALL", "STUDENT", "TEACHER", "PARENT"],
      default: "ALL",
    },
    publishedDate: { type: Date, default: Date.now },
    createdBy: { type: String, default: "School Admin" },
  },
  { timestamps: true }
);

export const NoticeModel: Model<INotice> =
  mongoose.models.Notice || mongoose.model<INotice>("Notice", NoticeSchema);
