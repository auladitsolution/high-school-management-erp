"use client";

import React, { useState } from "react";
import {
  BookMarked,
  Search,
  Plus,
  BookOpen,
  CheckCircle2,
  Clock,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toBanglaNumber } from "@/lib/utils/bangla";
import { toast } from "sonner";

interface BookItem {
  id: string;
  title: string;
  author: string;
  category: string;
  totalCopies: number;
  availableCopies: number;
  shelf: string;
}

const INITIAL_BOOKS: BookItem[] = [
  { id: "1", title: "আমার বন্ধু রাশেদ", author: "মুহম্মদ জাফর ইকবাল", category: "কিশোর সাহিত্য", totalCopies: 10, availableCopies: 7, shelf: "র‌্যাক-১ (ক)" },
  { id: "2", title: "পদার্থবিজ্ঞানের সহজ কথা", author: "ড. আব্দুল্লাহ আল মুতী", category: "বিজ্ঞান", totalCopies: 8, availableCopies: 4, shelf: "র‌্যাক-২ (খ)" },
  { id: "3", title: "দীপু নাম্বার টু", author: "মুহম্মদ জাফর ইকবাল", category: "কিশোর উপন্যাস", totalCopies: 12, availableCopies: 9, shelf: "র‌্যাক-১ (খ)" },
  { id: "4", title: "গণিতের রঙ্গশালা", author: "চমক হাসান", category: "গণিত ও যুক্তি", totalCopies: 6, availableCopies: 2, shelf: "র‌্যাক-৩ (ক)" },
  { id: "5", title: "একাত্তরের দিনগুলি", author: "জাহানারা ইমাম", category: "মুক্তিযুদ্ধ ও ইতিহাস", totalCopies: 15, availableCopies: 11, shelf: "র‌্যাক-৪ (ক)" },
];

export default function LibraryPage() {
  const [books, setBooks] = useState<BookItem[]>(INITIAL_BOOKS);
  const [search, setSearch] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "বিজ্ঞান",
    totalCopies: "5",
    shelf: "র‌্যাক-১",
  });

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    const copies = parseInt(formData.totalCopies, 10) || 1;
    const newBook: BookItem = {
      id: (books.length + 1).toString(),
      title: formData.title,
      author: formData.author,
      category: formData.category,
      totalCopies: copies,
      availableCopies: copies,
      shelf: formData.shelf,
    };
    setBooks([newBook, ...books]);
    setAddModalOpen(false);
    toast.success(`"${newBook.title}" বইটি ক্যাটালগে যুক্ত হয়েছে!`);
  };

  const handleIssueBook = (id: string, title: string) => {
    setBooks((prev) =>
      prev.map((b) =>
        b.id === id && b.availableCopies > 0
          ? { ...b, availableCopies: b.availableCopies - 1 }
          : b
      )
    );
    toast.success(`"${title}" বইটি ইস্যু করা হয়েছে!`);
  };

  const filtered = books.filter(
    (b) =>
      b.title.includes(search) ||
      b.author.includes(search) ||
      b.category.includes(search)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            বিদ্যালয় গ্রন্থাগার (School Library)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            বইয়ের ক্যাটালগ, বিষয়ভিত্তিক ইনভেন্টরি ও ইস্যু/ফেরত ট্র্যাকিং
          </p>
        </div>
        <Button size="sm" onClick={() => setAddModalOpen(true)} className="gap-1.5 font-semibold">
          <Plus className="h-4 w-4" />
          নতুন বই যুক্ত করুন
        </Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="বইয়ের নাম, লেখক বা বিষয়..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>বইয়ের নাম</TableHead>
                <TableHead>লেখক</TableHead>
                <TableHead>বিষয় / ক্যাটাগরি</TableHead>
                <TableHead>শেলফ নম্বর</TableHead>
                <TableHead className="text-center">মোট কপি</TableHead>
                <TableHead className="text-center">উপলব্ধ কপি</TableHead>
                <TableHead className="text-right">অ্যাকশন</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((b) => (
                <TableRow key={b.id}>
                  <TableCell className="font-bold text-sm text-slate-900">{b.title}</TableCell>
                  <TableCell className="text-xs text-slate-600">{b.author}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {b.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs font-semibold text-slate-700">{b.shelf}</TableCell>
                  <TableCell className="text-center font-bold text-xs">
                    {toBanglaNumber(b.totalCopies)}
                  </TableCell>
                  <TableCell className="text-center">
                    <span
                      className={`text-xs font-extrabold px-2 py-0.5 rounded ${
                        b.availableCopies > 0
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-rose-100 text-rose-800"
                      }`}
                    >
                      {toBanglaNumber(b.availableCopies)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={b.availableCopies === 0}
                      className="h-8 px-2.5 text-xs gap-1"
                      onClick={() => handleIssueBook(b.id, b.title)}
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                      ইস্যু করুন
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Book Modal */}
      <Dialog
        open={addModalOpen}
        onOpenChange={setAddModalOpen}
        title="নতুন বই ক্যাটালগ নিবন্ধন"
        description="গ্রন্থাগারে নতুন বইয়ের তথ্য ও কপি সংখ্যা যুক্ত করুন"
      >
        <form onSubmit={handleAddBook} className="space-y-4">
          <Input
            label="বইয়ের শিরোনাম *"
            placeholder="যেমন: পদ্মা নদীর মাঝি"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <Input
            label="লেখক / রচয়িতা *"
            placeholder="যেমন: মানিক বন্দ্যোপাধ্যায়"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="বিষয় / ক্যাটাগরি"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            />
            <Input
              label="মোট কপি *"
              type="number"
              value={formData.totalCopies}
              onChange={(e) => setFormData({ ...formData, totalCopies: e.target.value })}
              required
            />
          </div>
          <Input
            label="শেলফ / আলমারি অবস্থান"
            placeholder="র‌্যাক-১ (ক)"
            value={formData.shelf}
            onChange={(e) => setFormData({ ...formData, shelf: e.target.value })}
          />
          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <Button type="button" variant="outline" size="sm" onClick={() => setAddModalOpen(false)}>
              বাতিল
            </Button>
            <Button type="submit" size="sm" variant="primary">
              সংরক্ষণ করুন
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
