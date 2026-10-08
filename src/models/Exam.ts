import mongoose, { Schema, Document, Model } from "mongoose";

export interface IExamMark {
  studentId: string;
  rollNumber: number;
  writtenMarks: number;
  mcqMarks: number;
  practicalMarks: number;
  totalMarks: number;
  grade: "A+" | "A" | "A-" | "B" | "C" | "D" | "F";
  gradePoint: number; // 0.0 to 5.0
  isPassed: boolean;
}

export interface IExam extends Document {
  titleBn: string; // e.g. "অর্ধ-বার্ষিক পরীক্ষা ২০২৬"
  examType: "HALF_YEARLY" | "ANNUAL" | "PRE_TEST" | "TEST" | "MODEL_TEST";
  academicYear: string;
  className: string;
  subjectName: string;
  maxWritten: number;
  maxMcq: number;
  maxPractical: number;
  totalFullMarks: number;
  passMarks: number;
  isPublished: boolean;
  marks: IExamMark[];
  createdAt: Date;
  updatedAt: Date;
}

const ExamSchema = new Schema<IExam>(
  {
    titleBn: { type: String, required: true },
    examType: {
      type: String,
      required: true,
      enum: ["HALF_YEARLY", "ANNUAL", "PRE_TEST", "TEST", "MODEL_TEST"],
    },
    academicYear: { type: String, required: true, default: "2026" },
    className: { type: String, required: true },
    subjectName: { type: String, required: true },
    maxWritten: { type: Number, default: 70 },
    maxMcq: { type: Number, default: 30 },
    maxPractical: { type: Number, default: 0 },
    totalFullMarks: { type: Number, default: 100 },
    passMarks: { type: Number, default: 33 },
    isPublished: { type: Boolean, default: false },
    marks: [
      {
        studentId: { type: String, required: true },
        rollNumber: { type: Number, required: true },
        writtenMarks: { type: Number, default: 0 },
        mcqMarks: { type: Number, default: 0 },
        practicalMarks: { type: Number, default: 0 },
        totalMarks: { type: Number, default: 0 },
        grade: { type: String, default: "F" },
        gradePoint: { type: Number, default: 0 },
        isPassed: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

export const ExamModel: Model<IExam> =
  mongoose.models.Exam || mongoose.model<IExam>("Exam", ExamSchema);

export { calculateBanglaGrade } from "@/lib/utils/grading";
