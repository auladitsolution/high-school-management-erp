"use client";

import React, { useState } from "react";
import {
  Wallet,
  Receipt,
  Download,
  Plus,
  CheckCircle2,
  AlertCircle,
  Printer,
  Search,
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
import { toBanglaNumber, formatCurrencyBn } from "@/lib/utils/bangla";
import { takaToPaisa, sumPaisa } from "@/lib/utils/currency";
import { toast } from "sonner";

interface InvoiceItem {
  id: string;
  invoiceNo: string;
  studentNameBn: string;
  studentId: string;
  className: string;
  rollNumber: number;
  month: string;
  feeHead: string;
  amountPaisa: number;
  paidPaisa: number;
  status: "PAID" | "UNPAID";
  date: string;
}

const INITIAL_INVOICES: InvoiceItem[] = [
  {
    id: "1",
    invoiceNo: "INV-2026-001",
    studentNameBn: "সাদিয়া ইসলাম",
    studentId: "STD-2026-001",
    className: "১০ম শ্রেণি",
    rollNumber: 1,
    month: "অক্টোবর ২০২৬",
    feeHead: "মাসিক বেতন",
    amountPaisa: 150000, // ৳ 1,500
    paidPaisa: 150000,
    status: "PAID",
    date: "০৫ অক্টোবর, ২০২৬",
  },
  {
    id: "2",
    invoiceNo: "INV-2026-002",
    studentNameBn: "তানভীর আহমেদ",
    studentId: "STD-2026-002",
    className: "১০ম শ্রেণি",
    rollNumber: 2,
    month: "অক্টোবর ২০২৬",
    feeHead: "মাসিক বেতন",
    amountPaisa: 150000,
    paidPaisa: 0,
    status: "UNPAID",
    date: "০১ অক্টোবর, ২০২৬",
  },
  {
    id: "3",
    invoiceNo: "INV-2026-003",
    studentNameBn: "আরিফুল ইসলাম",
    studentId: "STD-2026-003",
    className: "৯ম শ্রেণি",
    rollNumber: 3,
    month: "অক্টোবর ২০২৬",
    feeHead: "অর্ধ-বার্ষিক পরীক্ষা ফি",
    amountPaisa: 80000, // ৳ 800
    paidPaisa: 80000,
    status: "PAID",
    date: "০৪ অক্টোবর, ২০২৬",
  },
  {
    id: "4",
    invoiceNo: "INV-2026-004",
    studentNameBn: "মেহজাবিন চৌধুরী",
    studentId: "STD-2026-004",
    className: "৮ম শ্রেণি",
    rollNumber: 4,
    month: "অক্টোবর ২০২৬",
    feeHead: "মাসিক বেতন",
    amountPaisa: 120000, // ৳ 1,200
    paidPaisa: 0,
    status: "UNPAID",
    date: "০১ অক্টোবর, ২০২৬",
  },
];

export default function FinancePage() {
  const [invoices, setInvoices] = useState<InvoiceItem[]>(INITIAL_INVOICES);
  const [search, setSearch] = useState("");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [receiptModal, setReceiptModal] = useState<InvoiceItem | null>(null);

  const [formData, setFormData] = useState({
    studentNameBn: "",
    studentId: "STD-2026-001",
    className: "১০ম শ্রেণি",
    rollNumber: "১",
    month: "অক্টোবর ২০২৬",
    feeHead: "মাসিক বেতন",
    amountTaka: "1500",
  });

  const totalCollectedPaisa = sumPaisa(
    ...invoices.filter((i) => i.status === "PAID").map((i) => i.paidPaisa)
  );
  const totalDuePaisa = sumPaisa(
    ...invoices.filter((i) => i.status === "UNPAID").map((i) => i.amountPaisa)
  );

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const amountPaisa = takaToPaisa(formData.amountTaka);
    const newId = invoices.length + 1;
    const newInv: InvoiceItem = {
      id: newId.toString(),
      invoiceNo: `INV-2026-${String(newId).padStart(3, "0")}`,
      studentNameBn: formData.studentNameBn,
      studentId: formData.studentId,
      className: formData.className,
      rollNumber: parseInt(formData.rollNumber, 10) || 1,
      month: formData.month,
      feeHead: formData.feeHead,
      amountPaisa: amountPaisa,
      paidPaisa: amountPaisa, // Marked as collected immediately
      status: "PAID",
      date: "০৭ অক্টোবর, ২০২৬",
    };

    setInvoices([newInv, ...invoices]);
    setCreateModalOpen(false);
    toast.success(`${newInv.studentNameBn}-এর ফি রসিদ সফলভাবে তৈরি হয়েছে!`);
  };

  const markPaid = (id: string) => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === id ? { ...inv, status: "PAID", paidPaisa: inv.amountPaisa } : inv
      )
    );
    toast.success("ফি পরিশোধ নিশ্চিত করা হয়েছে।");
  };

  const filtered = invoices.filter(
    (i) =>
      i.studentNameBn.includes(search) ||
      i.invoiceNo.toLowerCase().includes(search.toLowerCase()) ||
      i.studentId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            ফি ও হিসাবরক্ষণ (Finance & Fees)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            শিক্ষার্থীদের মাসিক বেতন, পরীক্ষা ফি, বকেয়া রশিদ ও ইনভয়েস ব্যবস্থাপনা
          </p>
        </div>
        <Button size="sm" onClick={() => setCreateModalOpen(true)} className="gap-1.5 font-semibold">
          <Plus className="h-4 w-4" />
          নতুন ফি রসিদ তৈরি
        </Button>
      </div>

      {/* Financial Summary KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/60">
          <span className="text-xs font-semibold text-emerald-800 block">মোট আদায়কৃত ফি</span>
          <span className="text-2xl font-bold text-emerald-900">
            {formatCurrencyBn(totalCollectedPaisa)}
          </span>
          <span className="text-[11px] text-emerald-700 block pt-1">অক্টোবর ২০২৬ সেশন</span>
        </div>

        <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/60">
          <span className="text-xs font-semibold text-amber-800 block">মোট বকেয়া ফি</span>
          <span className="text-2xl font-bold text-amber-900">
            {formatCurrencyBn(totalDuePaisa)}
          </span>
          <span className="text-[11px] text-amber-700 block pt-1">তাগাদা পত্রযোগ্য</span>
        </div>

        <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/60">
          <span className="text-xs font-semibold text-blue-800 block">মোট ইনভয়েস সংখ্যা</span>
          <span className="text-2xl font-bold text-blue-900">
            {toBanglaNumber(invoices.length)} টি
          </span>
          <span className="text-[11px] text-blue-700 block pt-1">১০০% ডিজিটাল ট্র্যাকিং</span>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="রসিদ নং বা শিক্ষার্থীর নাম..."
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
                <TableHead>রসিদ নং</TableHead>
                <TableHead>শিক্ষার্থীর নাম ও আইডি</TableHead>
                <TableHead>শ্রেণি</TableHead>
                <TableHead>ফি বিবরণী ও মাস</TableHead>
                <TableHead>মোট পরিমাণ</TableHead>
                <TableHead>স্ট্যাটাস</TableHead>
                <TableHead className="text-right">অ্যাকশন</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell className="font-mono text-xs font-bold text-slate-700">
                    {inv.invoiceNo}
                  </TableCell>
                  <TableCell>
                    <span className="font-bold text-slate-900 text-sm block">{inv.studentNameBn}</span>
                    <span className="text-xs text-slate-500 font-mono">{inv.studentId}</span>
                  </TableCell>
                  <TableCell className="text-xs font-semibold text-slate-700">
                    {inv.className} (রোল: {toBanglaNumber(inv.rollNumber)})
                  </TableCell>
                  <TableCell>
                    <span className="text-xs font-semibold text-slate-800 block">{inv.feeHead}</span>
                    <span className="text-[11px] text-slate-500">{inv.month}</span>
                  </TableCell>
                  <TableCell className="font-bold text-sm text-slate-900">
                    {formatCurrencyBn(inv.amountPaisa)}
                  </TableCell>
                  <TableCell>
                    {inv.status === "PAID" ? (
                      <Badge variant="success">পরিশোধিত</Badge>
                    ) : (
                      <Badge variant="warning">অপরিশোধিত</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {inv.status === "UNPAID" && (
                        <Button
                          size="sm"
                          variant="success"
                          className="h-8 px-2 text-xs"
                          onClick={() => markPaid(inv.id)}
                        >
                          পরিশোধ করুন
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 px-2 text-xs gap-1"
                        onClick={() => setReceiptModal(inv)}
                      >
                        <Receipt className="h-3.5 w-3.5" />
                        রসিদ
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* New Invoice Modal */}
      <Dialog
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        title="নতুন ফি রসিদ তৈরি করুন"
        description="শিক্ষার্থীর ফি বিবরণ ও অর্থ আদায়ের পরিমাণ নির্ধারণ করুন"
      >
        <form onSubmit={handleCreateInvoice} className="space-y-4">
          <Input
            label="শিক্ষার্থীর নাম *"
            placeholder="যেমন: সাদিয়া ইসলাম"
            value={formData.studentNameBn}
            onChange={(e) => setFormData({ ...formData, studentNameBn: e.target.value })}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">শ্রেণি</label>
              <select
                className="w-full text-xs font-semibold px-3 py-2 border border-slate-300 rounded-lg bg-white"
                value={formData.className}
                onChange={(e) => setFormData({ ...formData, className: e.target.value })}
              >
                <option value="৬ষ্ঠ শ্রেণি">৬ষ্ঠ শ্রেণি</option>
                <option value="৭ম শ্রেণি">৭ম শ্রেণি</option>
                <option value="৮ম শ্রেণি">৮ম শ্রেণি</option>
                <option value="৯ম শ্রেণি">৯ম শ্রেণি</option>
                <option value="১০ম শ্রেণি">১০ম শ্রেণি</option>
              </select>
            </div>
            <Input
              label="রোল নম্বর"
              type="number"
              value={formData.rollNumber}
              onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">ফি বিবরণী</label>
              <select
                className="w-full text-xs font-semibold px-3 py-2 border border-slate-300 rounded-lg bg-white"
                value={formData.feeHead}
                onChange={(e) => setFormData({ ...formData, feeHead: e.target.value })}
              >
                <option value="মাসিক বেতন">মাসিক বেতন</option>
                <option value="ভর্তি ফি">ভর্তি ফি</option>
                <option value="পরীক্ষা ফি">পরীক্ষা ফি</option>
                <option value="সেশন ফি">সেশন ফি</option>
              </select>
            </div>
            <Input
              label="টাকার পরিমাণ (৳) *"
              type="number"
              value={formData.amountTaka}
              onChange={(e) => setFormData({ ...formData, amountTaka: e.target.value })}
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <Button type="button" variant="outline" size="sm" onClick={() => setCreateModalOpen(false)}>
              বাতিল
            </Button>
            <Button type="submit" size="sm" variant="primary">
              রসিদ তৈরি ও জমা করুন
            </Button>
          </div>
        </form>
      </Dialog>

      {/* Official Money Receipt Modal */}
      {receiptModal && (
        <Dialog
          open={!!receiptModal}
          onOpenChange={() => setReceiptModal(null)}
          title="অফিসিয়াল মানি রিসিট (Official Money Receipt)"
          description="বিদ্যালয় হিসাব শাখার আনুষ্ঠানিক টাকা প্রাপ্তি স্বীকারপত্র"
        >
          <div className="space-y-4">
            <div className="p-4 border-2 border-slate-300 rounded-xl bg-white space-y-3 text-center text-xs">
              <div className="border-b border-slate-200 pb-2">
                <h3 className="text-base font-bold text-slate-900">অগ্রদূত আদর্শ উচ্চ বিদ্যালয়</h3>
                <p className="text-slate-500">EIIN: ১২৩৪৫৬ | ধানমন্ডি, ঢাকা</p>
                <p className="text-blue-700 font-bold pt-1">মানি রিসিট নং: {receiptModal.invoiceNo}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-left bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <div>শিক্ষার্থী: <strong>{receiptModal.studentNameBn}</strong></div>
                <div>আইডি: <strong className="font-mono">{receiptModal.studentId}</strong></div>
                <div>শ্রেণি: <strong>{receiptModal.className}</strong></div>
                <div>রোল: <strong>{toBanglaNumber(receiptModal.rollNumber)}</strong></div>
                <div>তারিখ: <strong>{receiptModal.date}</strong></div>
                <div>মাস: <strong>{receiptModal.month}</strong></div>
              </div>

              <div className="border border-slate-200 rounded-lg p-3 flex justify-between items-center bg-slate-100/50">
                <span className="font-semibold text-slate-800">{receiptModal.feeHead}</span>
                <span className="font-bold text-base text-slate-900">
                  {formatCurrencyBn(receiptModal.amountPaisa)}
                </span>
              </div>

              <div className="pt-4 flex justify-between text-[11px] text-slate-400 border-t border-slate-100">
                <span>শিক্ষার্থী / অভিভাবকের স্বাক্ষর</span>
                <span>হিসাবরক্ষকের স্বাক্ষর ও সিল</span>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                size="sm"
                className="gap-1 bg-slate-900 hover:bg-slate-800 font-bold"
                onClick={() => {
                  toast.success("রসিদ প্রিন্ট সম্পন্ন হয়েছে!");
                  setReceiptModal(null);
                }}
              >
                <Printer className="h-4 w-4" />
                রসিদ প্রিন্ট করুন
              </Button>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
}
