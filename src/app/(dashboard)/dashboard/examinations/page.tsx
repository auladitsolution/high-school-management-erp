"use client";

import React, { useState } from "react";
import {
  Award,
  BookOpen,
  Save,
  Printer,
  FileCheck2,
  CheckCircle2,
  AlertCircle,
  Download,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog } from "@/components/ui/dialog";
import { toBanglaNumber } from "@/lib/utils/bangla";
import { calculateBanglaGrade } from "@/lib/utils/grading";
import { toast } from "sonner";

interface StudentMarkRow {
  studentId: string;
  rollNumber: number;
  nameBn: string;
  written: number;
  mcq: number;
  practical: number;
}

const INITIAL_MARKS: StudentMarkRow[] = [
  { studentId: "STD-2026-001", rollNumber: 1, nameBn: "সাদিয়া ইসলাম", written: 65, mcq: 28, practical: 0 },
  { studentId: "STD-2026-002", rollNumber: 2, nameBn: "তানভীর আহমেদ", written: 58, mcq: 24, practical: 0 },
  { studentId: "STD-2026-003", rollNumber: 3, nameBn: "আরিফুল ইসলাম", written: 42, mcq: 20, practical: 0 },
  { studentId: "STD-2026-004", rollNumber: 4, nameBn: "মেহজাবিন চৌধুরী", written: 50, mcq: 26, practical: 0 },
  { studentId: "STD-2026-005", rollNumber: 5, nameBn: "নাসির উদ্দিন", written: 25, mcq: 12, practical: 0 },
  { studentId: "STD-2026-006", rollNumber: 6, nameBn: "সুমাইয়া জাহান", written: 62, mcq: 29, practical: 0 },
];

export default function ExaminationsPage() {
  const [examName, setExamName] = useState("অর্ধ-বার্ষিক পরীক্ষা ২০২৬");
  const [selectedClass, setSelectedClass] = useState("১০ম শ্রেণি");
  const [selectedSubject, setSelectedSubject] = useState("সাধারণ গণিত");
  const [marksList, setMarksList] = useState<StudentMarkRow[]>(INITIAL_MARKS);
  const [marksheetModal, setMarksheetModal] = useState<StudentMarkRow | null>(null);

  const updateMark = (
    studentId: string,
    field: "written" | "mcq" | "practical",
    val: string
  ) => {
    const num = Math.max(0, parseInt(val, 10) || 0);
    setMarksList((prev) =>
      prev.map((row) => (row.studentId === studentId ? { ...row, [field]: num } : row))
    );
  };

  const handleSaveMarks = () => {
    toast.success(`${selectedSubject} বিষয়ের নম্বর সফলভাবে সংরক্ষিত ও গ্রেড হিসাব সম্পন্ন হয়েছে!`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            পরীক্ষা ও ফলাফল ব্যবস্থাপনা (Exam & Results)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            বিষয়ভিত্তিক লিখিত, এমসিকিউ ও ব্যবহারিক নম্বর এন্ট্রি এবং স্বয়ংক্রিয় জিপিএ হিসাব
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={handleSaveMarks}
            className="gap-1.5 font-semibold bg-blue-600 hover:bg-blue-700"
          >
            <Save className="h-4 w-4" />
            নম্বর সংরক্ষণ করুন
          </Button>
        </div>
      </div>

      {/* Selectors */}
      <Card>
        <CardContent className="p-4 flex flex-wrap items-center gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">পরীক্ষার নাম:</label>
            <select
              value={examName}
              onChange={(e) => setExamName(e.target.value)}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 bg-white"
            >
              <option value="অর্ধ-বার্ষিক পরীক্ষা ২০২৬">অর্ধ-বার্ষিক পরীক্ষা ২০২৬</option>
              <option value="বার্ষিক পরীক্ষা ২০২৬">বার্ষিক পরীক্ষা ২০২৬</option>
              <option value="১ম সাময়িক মূল্যায়ন">১ম সাময়িক মূল্যায়ন</option>
              <option value="মডেল টেস্ট পরীক্ষা">মডেল টেস্ট পরীক্ষা</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">শ্রেণি:</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 bg-white"
            >
              <option value="৬ষ্ঠ শ্রেণি">৬ষ্ঠ শ্রেণি</option>
              <option value="৭ম শ্রেণি">৭ম শ্রেণি</option>
              <option value="৮ম শ্রেণি">৮ম শ্রেণি</option>
              <option value="৯ম শ্রেণি">৯ম শ্রেণি</option>
              <option value="১০ম শ্রেণি">১০ম শ্রেণি</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">বিষয়:</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 bg-white"
            >
              <option value="সাধারণ গণিত">সাধারণ গণিত (মোট: ১০০)</option>
              <option value="বাংলা ১ম পত্র">বাংলা ১ম পত্র (মোট: ১০০)</option>
              <option value="ইংরেজি ১ম পত্র">ইংরেজি ১ম পত্র (মোট: ১০০)</option>
              <option value="পদার্থবিজ্ঞান">পদার্থবিজ্ঞান (মোট: ১০০)</option>
              <option value="উচ্চতর গণিত">উচ্চতর গণিত (মোট: ১০০)</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Marks Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">রোল</TableHead>
                <TableHead>শিক্ষার্থীর নাম ও আইডি</TableHead>
                <TableHead className="w-28 text-center">লিখিত (৭০)</TableHead>
                <TableHead className="w-28 text-center">এমসিকিউ (৩০)</TableHead>
                <TableHead className="w-24 text-center">মোট (১০০)</TableHead>
                <TableHead className="w-20 text-center">গ্রেড</TableHead>
                <TableHead className="w-24 text-center">জিপিএ (GPA)</TableHead>
                <TableHead className="text-right">মার্কশিট</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {marksList.map((row) => {
                const total = row.written + row.mcq + row.practical;
                const { grade, gradePoint, isPassed } = calculateBanglaGrade(total, 100);

                return (
                  <TableRow key={row.studentId}>
                    <TableCell className="font-bold text-base text-slate-900">
                      {toBanglaNumber(row.rollNumber)}
                    </TableCell>
                    <TableCell>
                      <span className="font-bold text-slate-900 text-sm block">{row.nameBn}</span>
                      <span className="text-xs text-slate-500 font-mono">{row.studentId}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <input
                        type="number"
                        max={70}
                        min={0}
                        value={row.written}
                        onChange={(e) => updateMark(row.studentId, "written", e.target.value)}
                        className="w-18 mx-auto px-2 py-1 text-center font-bold text-slate-900 border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500"
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <input
                        type="number"
                        max={30}
                        min={0}
                        value={row.mcq}
                        onChange={(e) => updateMark(row.studentId, "mcq", e.target.value)}
                        className="w-18 mx-auto px-2 py-1 text-center font-bold text-slate-900 border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500"
                      />
                    </TableCell>
                    <TableCell className="text-center font-bold text-base text-slate-900">
                      {toBanglaNumber(total)}
                    </TableCell>
                    <TableCell className="text-center">
                      <span
                        className={`text-xs font-extrabold px-2 py-0.5 rounded ${
                          isPassed
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                            : "bg-rose-100 text-rose-800 border border-rose-300"
                        }`}
                      >
                        {grade}
                      </span>
                    </TableCell>
                    <TableCell className="text-center font-bold text-sm">
                      {toBanglaNumber(gradePoint.toFixed(2))}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setMarksheetModal(row)}
                        className="h-8 px-2.5 text-xs gap-1 text-blue-700 hover:bg-blue-50"
                      >
                        <FileCheck2 className="h-3.5 w-3.5" />
                        নম্বরপত্র
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Official Marksheet Dialog */}
      {marksheetModal && (
        <Dialog
          open={!!marksheetModal}
          onOpenChange={() => setMarksheetModal(null)}
          title="অফিসিয়াল শিক্ষার্থী নম্বরপত্র (Academic Marksheet)"
          description="বাংলাদেশ শিক্ষা বোর্ড আদর্শ মান অনুসারে প্রস্তুতকৃত আনুষ্ঠানিক গ্রেডশিট"
        >
          {(() => {
            const total = marksheetModal.written + marksheetModal.mcq + marksheetModal.practical;
            const { grade, gradePoint, isPassed } = calculateBanglaGrade(total, 100);

            return (
              <div className="space-y-4">
                <div className="p-4 border-2 border-slate-200 rounded-xl bg-white space-y-4 text-center">
                  <div className="border-b border-slate-200 pb-3">
                    <h3 className="text-base font-bold text-slate-900">
                      অগ্রদূত আদর্শ উচ্চ বিদ্যালয়
                    </h3>
                    <p className="text-xs text-slate-500">
                      EIIN: ১২৩৪৫৬ | কলেজ রোড, ধানমন্ডি, ঢাকা
                    </p>
                    <p className="text-xs font-semibold text-blue-700 pt-1">
                      {examName} - শিক্ষাবর্ষ ২০২৬
                    </p>
                  </div>

                  <div className="grid grid-cols-2 text-xs text-left bg-slate-50 p-3 rounded-lg gap-2 border border-slate-100">
                    <div>
                      <span className="text-slate-500">শিক্ষার্থীর নাম:</span>{" "}
                      <strong className="text-slate-900">{marksheetModal.nameBn}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500">আইডি:</span>{" "}
                      <strong className="font-mono">{marksheetModal.studentId}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500">শ্রেণি:</span>{" "}
                      <strong className="text-slate-900">{selectedClass}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500">রোল নম্বর:</span>{" "}
                      <strong className="text-slate-900">{toBanglaNumber(marksheetModal.rollNumber)}</strong>
                    </div>
                  </div>

                  {/* Subject Grade Table */}
                  <div className="border border-slate-200 rounded-lg overflow-hidden text-xs">
                    <div className="bg-slate-100 grid grid-cols-5 p-2 font-bold text-slate-700">
                      <span className="col-span-2 text-left">বিষয়</span>
                      <span>লিখিত</span>
                      <span>এমসিকিউ</span>
                      <span>মোট নম্বর</span>
                    </div>
                    <div className="grid grid-cols-5 p-2 border-t border-slate-100 text-slate-800">
                      <span className="col-span-2 text-left font-medium">{selectedSubject}</span>
                      <span>{toBanglaNumber(marksheetModal.written)}</span>
                      <span>{toBanglaNumber(marksheetModal.mcq)}</span>
                      <span className="font-bold">{toBanglaNumber(total)}</span>
                    </div>
                  </div>

                  {/* Summary GPA card */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50 border border-blue-200">
                    <div className="text-left">
                      <span className="text-xs text-blue-700 block">লেটার গ্রেড:</span>
                      <span className="text-xl font-black text-blue-900">{grade}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-blue-700 block">জিপিএ (GPA):</span>
                      <span className="text-xl font-black text-blue-900">
                        {toBanglaNumber(gradePoint.toFixed(2))}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between items-center text-[11px] text-slate-400 border-t border-slate-100">
                    <span>শ্রেণি শিক্ষকের স্বাক্ষর</span>
                    <span>প্রধান শিক্ষকের স্বাক্ষর</span>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    size="sm"
                    className="gap-1 font-bold bg-slate-900 hover:bg-slate-800"
                    onClick={() => {
                      toast.success("নম্বরপত্র ডাউনলোড সম্পন্ন হয়েছে (PDF)");
                      setMarksheetModal(null);
                    }}
                  >
                    <Printer className="h-4 w-4" />
                    প্রিন্ট / ডাউনলোড করুন
                  </Button>
                </div>
              </div>
            );
          })()}
        </Dialog>
      )}
    </div>
  );
}
