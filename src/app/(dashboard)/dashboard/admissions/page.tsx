"use client";

import React, { useState } from "react";
import {
  UserPlus,
  CheckCircle2,
  XCircle,
  Clock,
  Phone,
  Search,
  Filter,
  FileText,
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
import { toBanglaNumber } from "@/lib/utils/bangla";
import { toast } from "sonner";

interface ApplicantItem {
  id: string;
  applicationNo: string;
  nameBn: string;
  nameEn: string;
  targetClass: string;
  guardianName: string;
  guardianPhone: string;
  previousSchool: string;
  gpa: number;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

const INITIAL_APPLICANTS: ApplicantItem[] = [
  {
    id: "1",
    applicationNo: "ADM-2026-101",
    nameBn: "আসিফ ইকবাল",
    nameEn: "Asif Iqbal",
    targetClass: "৬ষ্ঠ শ্রেণি",
    guardianName: "মোঃ শহিদুল ইসলাম",
    guardianPhone: "০১৭০০-৯৯৮৮৭৭",
    previousSchool: "মডেল সরকারি প্রাথমিক বিদ্যালয়",
    gpa: 5.0,
    status: "PENDING",
  },
  {
    id: "2",
    applicationNo: "ADM-2026-102",
    nameBn: "সুমাইয়া ফারহানা",
    nameEn: "Sumaiya Farhana",
    targetClass: "৯ম শ্রেণি (বিজ্ঞান)",
    guardianName: "ফারুক আহমেদ",
    guardianPhone: "০১৮০০-৮৮৭৭৬৬",
    previousSchool: "অগ্রণী আদর্শ উচ্চ বিদ্যালয়",
    gpa: 4.85,
    status: "PENDING",
  },
  {
    id: "3",
    applicationNo: "ADM-2026-103",
    nameBn: "জুবায়ের আহমেদ",
    nameEn: "Zubair Ahmed",
    targetClass: "৭ম শ্রেণি",
    guardianName: "আব্দুল জলিল",
    guardianPhone: "০১৯০০-৭৭৬৬৫৫",
    previousSchool: "শান্তিনগর হাই স্কুল",
    gpa: 4.5,
    status: "APPROVED",
  },
  {
    id: "4",
    applicationNo: "ADM-2026-104",
    nameBn: "মেহজাবিন তাসনিম",
    nameEn: "Mehzabin Tasnim",
    targetClass: "৬ষ্ঠ শ্রেণি",
    guardianName: "তরিকুল ইসলাম",
    guardianPhone: "০১৬০০-৬৬৫৫৪৪",
    previousSchool: "কচি-কাঁচা কিন্ডারগার্টেন",
    gpa: 4.9,
    status: "PENDING",
  },
];

export default function AdmissionsManagementPage() {
  const [applicants, setApplicants] = useState<ApplicantItem[]>(INITIAL_APPLICANTS);
  const [search, setSearch] = useState("");

  const handleApprove = (id: string, name: string) => {
    setApplicants((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: "APPROVED" } : app))
    );
    toast.success(`${name}-এর ভর্তি আবেদন অনুমোদিত হয়েছে এবং রোল নম্বর বরাদ্দ করা হয়েছে!`);
  };

  const handleReject = (id: string, name: string) => {
    setApplicants((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: "REJECTED" } : app))
    );
    toast.error(`${name}-এর ভর্তি আবেদন বাতিল করা হয়েছে।`);
  };

  const filtered = applicants.filter(
    (a) =>
      a.nameBn.includes(search) ||
      a.applicationNo.toLowerCase().includes(search.toLowerCase()) ||
      a.guardianPhone.includes(search)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            ভর্তি আবেদন ব্যবস্থাপনা (Admissions Management)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            ২০২৬ শিক্ষাবর্ষের নতুন অনলাইন আবেদন যাচাই, অনুমোদন ও তালিকাভুক্তি
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="আবেদন নং, নাম বা মোবাইল..."
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
                <TableHead>আবেদন নং</TableHead>
                <TableHead>শিক্ষার্থীর নাম</TableHead>
                <TableHead>ইচ্ছুক শ্রেণি</TableHead>
                <TableHead>পূর্ববর্তী স্কুল ও জিপিএ</TableHead>
                <TableHead>অভিভাবকের যোগাযোগ</TableHead>
                <TableHead>স্ট্যাটাস</TableHead>
                <TableHead className="text-right">অ্যাকশন</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-mono text-xs font-bold text-slate-700">
                    {item.applicationNo}
                  </TableCell>
                  <TableCell>
                    <span className="font-bold text-slate-900 text-sm block">{item.nameBn}</span>
                    <span className="text-xs text-slate-500 font-mono">{item.nameEn}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs font-semibold bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
                      {item.targetClass}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs">
                    <span className="text-slate-800 block font-medium">{item.previousSchool}</span>
                    <span className="text-emerald-700 font-bold">
                      জিপিএ: {toBanglaNumber(item.gpa.toFixed(2))}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs">
                    <span className="text-slate-800 block font-medium">{item.guardianName}</span>
                    <span className="text-slate-500 font-mono flex items-center gap-1">
                      <Phone className="h-3 w-3" /> {item.guardianPhone}
                    </span>
                  </TableCell>
                  <TableCell>
                    {item.status === "PENDING" && <Badge variant="warning">বিবেচনাধীন</Badge>}
                    {item.status === "APPROVED" && <Badge variant="success">অনুমোদিত</Badge>}
                    {item.status === "REJECTED" && <Badge variant="destructive">বাতিলকৃত</Badge>}
                  </TableCell>
                  <TableCell className="text-right">
                    {item.status === "PENDING" ? (
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          size="sm"
                          variant="success"
                          className="h-8 px-2.5 text-xs gap-1"
                          onClick={() => handleApprove(item.id, item.nameBn)}
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          অনুমোদন
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="h-8 px-2.5 text-xs gap-1"
                          onClick={() => handleReject(item.id, item.nameBn)}
                        >
                          <XCircle className="h-3.5 w-3.5" />
                          বাতিল
                        </Button>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 font-medium">সম্পন্ন</span>
                    )}
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
