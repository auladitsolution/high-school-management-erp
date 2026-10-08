import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
  isbn?: string;
  category: string;
  totalCopies: number;
  availableCopies: number;
  shelfLocation: string;
}

const BookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn: { type: String },
    category: { type: String, required: true },
    totalCopies: { type: Number, required: true, default: 1 },
    availableCopies: { type: Number, required: true, default: 1 },
    shelfLocation: { type: String, default: "র‌্যাক-১" },
  },
  { timestamps: true }
);

export const BookModel: Model<IBook> =
  mongoose.models.Book || mongoose.model<IBook>("Book", BookSchema);
