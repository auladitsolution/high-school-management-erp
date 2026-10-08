import mongoose, { Schema, Document, Model } from "mongoose";

export interface IFeeInvoice extends Document {
  invoiceNumber: string;
  studentId: string;
  studentNameBn: string;
  className: string;
  rollNumber: number;
  academicYear: string;
  month: string; // e.g. "জানুয়ারি"
  feeHead: "মাসিক বেতন" | "ভর্তি ফি" | "পরীক্ষা ফি" | "সেশন ফি" | "আইডি কার্ড ফি" | "অন্যান্য";
  amountInPaisa: number; // Integer Paisa
  discountInPaisa: number;
  payableInPaisa: number;
  paidInPaisa: number;
  status: "PAID" | "PARTIAL" | "UNPAID";
  dueDate: Date;
  paidDate?: Date;
  receiptNumber?: string;
  paymentMethod?: "CASH" | "BKASH" | "NAGAD" | "BANK";
  createdAt: Date;
  updatedAt: Date;
}

const FeeInvoiceSchema = new Schema<IFeeInvoice>(
  {
    invoiceNumber: { type: String, required: true, unique: true, index: true },
    studentId: { type: String, required: true, index: true },
    studentNameBn: { type: String, required: true },
    className: { type: String, required: true },
    rollNumber: { type: Number, required: true },
    academicYear: { type: String, required: true, default: "2026" },
    month: { type: String, required: true },
    feeHead: {
      type: String,
      required: true,
      enum: ["মাসিক বেতন", "ভর্তি ফি", "পরীক্ষা ফি", "সেশন ফি", "আইডি কার্ড ফি", "অন্যান্য"],
    },
    amountInPaisa: { type: Number, required: true },
    discountInPaisa: { type: Number, default: 0 },
    payableInPaisa: { type: Number, required: true },
    paidInPaisa: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["PAID", "PARTIAL", "UNPAID"],
      default: "UNPAID",
    },
    dueDate: { type: Date, required: true },
    paidDate: { type: Date },
    receiptNumber: { type: String },
    paymentMethod: {
      type: String,
      enum: ["CASH", "BKASH", "NAGAD", "BANK"],
    },
  },
  { timestamps: true }
);

export const FeeInvoiceModel: Model<IFeeInvoice> =
  mongoose.models.FeeInvoice ||
  mongoose.model<IFeeInvoice>("FeeInvoice", FeeInvoiceSchema);
