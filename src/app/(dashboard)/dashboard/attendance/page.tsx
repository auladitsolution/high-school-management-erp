"use client";

import React, { useState } from "react";
import {
  CalendarCheck,
  Check,
  X,
  Clock,
  Coffee,
  Save,
  CheckCheck,
  Calendar,
  Users,
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
import { toBanglaNumber } from "@/lib/utils/bangla";
import { toast } from "sonner";

type AttendanceStatus = "PRESENT" | "ABSENT" | "LATE" | "LEAVE";

interface StudentAttendanceRow {
  studentId: string;
  rollNumber: number;
  nameBn: string;
  status: AttendanceStatus;
}

const INITIAL_ATTENDANCE: StudentAttendanceRow[] = [
  { studentId: "STD-2026-001", rollNumber: 1, nameBn: "সাদিয়া ইসলাম", status: "PRESENT" },
  { studentId: "STD-2026-002", rollNumber: 2, nameBn: "তানভীর আহমেদ", status: "PRESENT" },
  { studentId: "STD-2026-003", rollNumber: 3, nameBn: "আরিফুল ইসলাম", status: "ABSENT" },
  { studentId: "STD-2026-004", rollNumber: 4, nameBn: "মেহজাবিন চৌধুরী", status: "PRESENT" },
  { studentId: "STD-2026-005", rollNumber: 5, nameBn: "নাসির উদ্দিন", status: "LATE" },
  { studentId: "STD-2026-006", rollNumber: 6, nameBn: "সুমাইয়া জাহান", status: "LEAVE" },
  { studentId: "STD-2026-007", rollNumber: 7, nameBn: "হাসিবুর রহমান", status: "PRESENT" },
  { studentId: "STD-2026-008", rollNumber: 8, nameBn: "রাইসা তাসনিম", status: "PRESENT" },
];

export default function DailyAttendancePage() {
  const [selectedClass, setSelectedClass] = useState("১০ম শ্রেণি");
  const [selectedSection, setSelectedSection] = useState("ক");
  const [dateStr, setDateStr] = useState("2026-10-07");
  const [attendance, setAttendance] = useState<StudentAttendanceRow[]>(INITIAL_ATTENDANCE);
  const [isSaving, setIsSaving] = useState(false);

  const presentCount = attendance.filter((a) => a.status === "PRESENT").length;
  const absentCount = attendance.filter((a) => a.status === "ABSENT").length;
  const lateCount = attendance.filter((a) => a.status === "LATE").length;
  const leaveCount = attendance.filter((a) => a.status === "LEAVE").length;
  const percentage = Math.round((presentCount / attendance.length) * 100);

  const setStatus = (studentId: string, status: AttendanceStatus) => {
    setAttendance((prev) =>
      prev.map((item) => (item.studentId === studentId ? { ...item, status } : item))
    );
  };

  const markAllPresent = () => {
    setAttendance((prev) => prev.map((item) => ({ ...item, status: "PRESENT" })));
    toast.info("সকল শিক্ষার্থীকে উপস্থিত চিহ্নিত করা হয়েছে।");
  };

  const handleSaveAttendance = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success(
        `${selectedClass} (${selectedSection} শাখা)-এর আজকের হাজিরা ডাটাবেজে সংরক্ষিত হয়েছে!`
      );
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            দৈনিক হাজিরা গ্রহণ (Daily Student Attendance)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            শ্রেণি ও শাখা ভিত্তিক শিক্ষার্থীদের উপস্থিতি ও অনুপস্থিতি রেকর্ড
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={markAllPresent} className="gap-1.5 text-xs">
            <CheckCheck className="h-4 w-4 text-emerald-600" />
            সবাইকে উপস্থিত করুন
          </Button>
          <Button
            size="sm"
            onClick={handleSaveAttendance}
            isLoading={isSaving}
            className="gap-1.5 font-semibold bg-emerald-600 hover:bg-emerald-700"
          >
            <Save className="h-4 w-4" />
            হাজিরা সংরক্ষণ করুন
          </Button>
        </div>
      </div>

      {/* Selectors Bar */}
      <Card>
        <CardContent className="p-4 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-slate-600">শ্রেণি:</label>
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

          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-slate-600">শাখা:</label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 bg-white"
            >
              <option value="ক">ক শাখা</option>
              <option value="খ">খ শাখা</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-slate-600 flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" /> তারিখ:
            </label>
            <input
              type="date"
              value={dateStr}
              onChange={(e) => setDateStr(e.target.value)}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 bg-white"
            />
          </div>
        </CardContent>
      </Card>

      {/* Real-time Attendance Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-3 rounded-xl border border-slate-200 bg-white text-center">
          <span className="text-xs text-slate-500 block">মোট শিক্ষার্থী</span>
          <span className="text-xl font-bold text-slate-900">{toBanglaNumber(attendance.length)}</span>
        </div>
        <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50 text-center">
          <span className="text-xs text-emerald-700 block">উপস্থিত</span>
          <span className="text-xl font-bold text-emerald-800">{toBanglaNumber(presentCount)}</span>
        </div>
        <div className="p-3 rounded-xl border border-rose-200 bg-rose-50 text-center">
          <span className="text-xs text-rose-700 block">অনুপস্থিত</span>
          <span className="text-xl font-bold text-rose-800">{toBanglaNumber(absentCount)}</span>
        </div>
        <div className="p-3 rounded-xl border border-amber-200 bg-amber-50 text-center">
          <span className="text-xs text-amber-700 block">বিলম্ব</span>
          <span className="text-xl font-bold text-amber-800">{toBanglaNumber(lateCount)}</span>
        </div>
        <div className="p-3 rounded-xl border border-blue-200 bg-blue-50 text-center">
          <span className="text-xs text-blue-700 block">উপস্থিতির হার</span>
          <span className="text-xl font-bold text-blue-800">{toBanglaNumber(percentage)}%</span>
        </div>
      </div>

      {/* Attendance Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">রোল</TableHead>
                <TableHead>শিক্ষার্থীর নাম ও আইডি</TableHead>
                <TableHead className="text-center">বর্তমান অবস্থা</TableHead>
                <TableHead className="text-right">উপস্থিতি নির্বাচন করুন</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendance.map((row) => (
                <TableRow key={row.studentId}>
                  <TableCell className="font-bold text-base text-slate-900">
                    {toBanglaNumber(row.rollNumber)}
                  </TableCell>
                  <TableCell>
                    <span className="font-bold text-slate-900 text-sm block">{row.nameBn}</span>
                    <span className="text-xs text-slate-500 font-mono">{row.studentId}</span>
                  </TableCell>
                  <TableCell className="text-center">
                    {row.status === "PRESENT" && (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-md border border-emerald-300">
                        উপস্থিত
                      </span>
                    )}
                    {row.status === "ABSENT" && (
                      <span className="text-xs font-bold text-rose-700 bg-rose-100 px-2.5 py-1 rounded-md border border-rose-300">
                        অনুপস্থিত
                      </span>
                    )}
                    {row.status === "LATE" && (
                      <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-md border border-amber-300">
                        বিলম্ব
                      </span>
                    )}
                    {row.status === "LEAVE" && (
                      <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2.5 py-1 rounded-md border border-blue-300">
                        ছুটি
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="inline-flex rounded-lg border border-slate-200 p-1 bg-slate-50 gap-1">
                      <button
                        onClick={() => setStatus(row.studentId, "PRESENT")}
                        className={`px-2.5 py-1 rounded text-xs font-bold transition-colors ${
                          row.status === "PRESENT"
                            ? "bg-emerald-600 text-white shadow-xs"
                            : "text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        উপস্থিত
                      </button>
                      <button
                        onClick={() => setStatus(row.studentId, "ABSENT")}
                        className={`px-2.5 py-1 rounded text-xs font-bold transition-colors ${
                          row.status === "ABSENT"
                            ? "bg-rose-600 text-white shadow-xs"
                            : "text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        অনুপস্থিত
                      </button>
                      <button
                        onClick={() => setStatus(row.studentId, "LATE")}
                        className={`px-2.5 py-1 rounded text-xs font-bold transition-colors ${
                          row.status === "LATE"
                            ? "bg-amber-600 text-white shadow-xs"
                            : "text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        বিলম্ব
                      </button>
                      <button
                        onClick={() => setStatus(row.studentId, "LEAVE")}
                        className={`px-2.5 py-1 rounded text-xs font-bold transition-colors ${
                          row.status === "LEAVE"
                            ? "bg-blue-600 text-white shadow-xs"
                            : "text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        ছুটি
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
