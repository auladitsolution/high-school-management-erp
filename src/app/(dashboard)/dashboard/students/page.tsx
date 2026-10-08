"use client";

import React, { useState } from "react";
import {
  Users,
  UserPlus,
  Search,
  Filter,
  Download,
  QrCode,
  Edit,
  Trash2,
  CheckCircle2,
  Eye,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog } from "@/components/ui/dialog";
import { ImageUpload } from "@/components/ui/image-upload";
import { toBanglaNumber } from "@/lib/utils/bangla";
import { toast } from "sonner";

interface StudentItem {
  id: string;
  studentId: string;
  admissionNo: string;
  nameBn: string;
  nameEn: string;
  className: string;
  section: string;
  rollNumber: number;
  guardianName: string;
  guardianPhone: string;
  bloodGroup: string;
  photoUrl?: string;
  status: "ACTIVE" | "INACTIVE";
}

const INITIAL_STUDENTS: StudentItem[] = [
  {
    id: "1",
    studentId: "STD-2026-001",
    admissionNo: "ADM-8901",
    nameBn: "সাদিয়া ইসলাম",
    nameEn: "Sadia Islam",
    className: "১০ম শ্রেণি",
    section: "ক",
    rollNumber: 1,
    guardianName: "মোঃ রফিকুল হাসান",
    guardianPhone: "০১৭০০-১১২২৩৩",
    bloodGroup: "A+",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    status: "ACTIVE",
  },
  {
    id: "2",
    studentId: "STD-2026-002",
    admissionNo: "ADM-8902",
    nameBn: "তানভীর আহমেদ",
    nameEn: "Tanvir Ahmed",
    className: "১০ম শ্রেণি",
    section: "ক",
    rollNumber: 2,
    guardianName: "কামাল উদ্দিন",
    guardianPhone: "০১৮০০-২২৩৩৪৪",
    bloodGroup: "B+",
    photoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    status: "ACTIVE",
  },
  {
    id: "3",
    studentId: "STD-2026-003",
    admissionNo: "ADM-8903",
    nameBn: "ফাতেমা তুজ জোহরা",
    nameEn: "Fatema Tuz Zohra",
    className: "৯ম শ্রেণি",
    section: "খ",
    rollNumber: 1,
    guardianName: "মাহবুবুর রহমান",
    guardianPhone: "০১৯০০-৩৩৪৪৫৫",
    bloodGroup: "O+",
    status: "ACTIVE",
  },
  {
    id: "4",
    studentId: "STD-2026-004",
    admissionNo: "ADM-8904",
    nameBn: "রাকিবুল হাসান",
    nameEn: "Rakibul Hasan",
    className: "৮ম শ্রেণি",
    section: "ক",
    rollNumber: 4,
    guardianName: "মকবুল হোসেন",
    guardianPhone: "০১৬০০-৪৪৫৫৬৬",
    bloodGroup: "AB+",
    status: "ACTIVE",
  },
  {
    id: "5",
    studentId: "STD-2026-005",
    admissionNo: "ADM-8905",
    nameBn: "নুসরাত জাহান",
    nameEn: "Nusrat Jahan",
    className: "৭ম শ্রেণি",
    section: "ক",
    rollNumber: 3,
    guardianName: "জাহাঙ্গীর আলম",
    guardianPhone: "০১৫০০-৫৫৬৬৭৭",
    bloodGroup: "A+",
    status: "ACTIVE",
  },
  {
    id: "6",
    studentId: "STD-2026-006",
    admissionNo: "ADM-8906",
    nameBn: "মাহিন চৌধুরী",
    nameEn: "Mahin Chowdhury",
    className: "৬ষ্ঠ শ্রেণি",
    section: "ক",
    rollNumber: 1,
    guardianName: "শাহেদ চৌধুরী",
    guardianPhone: "০১৭৫০-৬৬৭৭৮৮",
    bloodGroup: "O-",
    status: "ACTIVE",
  },
];

export default function StudentsManagementPage() {
  const [students, setStudents] = useState<StudentItem[]>(INITIAL_STUDENTS);
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("ALL");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [idCardModalStudent, setIdCardModalStudent] = useState<StudentItem | null>(null);
  const [deleteConfirmStudent, setDeleteConfirmStudent] = useState<StudentItem | null>(null);

  // Form State for Add
  const [formData, setFormData] = useState({
    nameBn: "",
    nameEn: "",
    className: "১০ম শ্রেণি",
    section: "ক",
    rollNumber: "",
    guardianName: "",
    guardianPhone: "",
    bloodGroup: "A+",
    photoUrl: "",
    address: "ঢাকা, বাংলাদেশ",
  });

  // Form State for Edit
  const [editFormData, setEditFormData] = useState<StudentItem>({
    id: "",
    studentId: "",
    admissionNo: "",
    nameBn: "",
    nameEn: "",
    className: "১০ম শ্রেণি",
    section: "ক",
    rollNumber: 1,
    guardianName: "",
    guardianPhone: "",
    bloodGroup: "A+",
    photoUrl: "",
    status: "ACTIVE",
  });

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.nameBn.includes(search) ||
      s.nameEn.toLowerCase().includes(search.toLowerCase()) ||
      s.studentId.toLowerCase().includes(search.toLowerCase()) ||
      s.rollNumber.toString() === search;

    const matchesClass = selectedClass === "ALL" || s.className === selectedClass;
    return matchesSearch && matchesClass;
  });

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nameBn || !formData.guardianPhone || !formData.rollNumber) {
      toast.error("অনুগ্রহ করে প্রয়োজনীয় তথ্যগুলো পূরণ করুন।");
      return;
    }

    const newIdNum = students.length + 1;
    const newStudent: StudentItem = {
      id: newIdNum.toString(),
      studentId: `STD-2026-${String(newIdNum).padStart(3, "0")}`,
      admissionNo: `ADM-${8900 + newIdNum}`,
      nameBn: formData.nameBn,
      nameEn: formData.nameEn || "Student Name",
      className: formData.className,
      section: formData.section,
      rollNumber: parseInt(formData.rollNumber, 10),
      guardianName: formData.guardianName,
      guardianPhone: formData.guardianPhone,
      bloodGroup: formData.bloodGroup,
      photoUrl: formData.photoUrl,
      status: "ACTIVE",
    };

    setStudents([newStudent, ...students]);
    setAddModalOpen(false);
    toast.success(`${newStudent.nameBn} সফলভাবে নিবন্ধিত হয়েছে!`);
    setFormData({
      nameBn: "",
      nameEn: "",
      className: "১০ম শ্রেণি",
      section: "ক",
      rollNumber: "",
      guardianName: "",
      guardianPhone: "",
      bloodGroup: "A+",
      photoUrl: "",
      address: "ঢাকা, বাংলাদেশ",
    });
  };

  const handleOpenEdit = (student: StudentItem) => {
    setEditFormData({ ...student });
    setEditModalOpen(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editFormData.nameBn || !editFormData.guardianPhone) {
      toast.error("অনুগ্রহ করে প্রয়োজনীয় তথ্যগুলো পূরণ করুন।");
      return;
    }

    setStudents((prev) =>
      prev.map((s) => (s.id === editFormData.id ? { ...editFormData } : s))
    );
    setEditModalOpen(false);
    toast.success(`${editFormData.nameBn}-এর তথ্য সফলভাবে সংশোধন করা হয়েছে!`);
  };

  const handleConfirmDelete = () => {
    if (!deleteConfirmStudent) return;
    const name = deleteConfirmStudent.nameBn;
    setStudents((prev) => prev.filter((s) => s.id !== deleteConfirmStudent.id));
    setDeleteConfirmStudent(null);
    toast.success(`${name}-এর তথ্য সফলভাবে মুছে ফেলা হয়েছে।`);
  };

  const handleExport = () => {
    toast.success("শিক্ষার্থী তালিকা (CSV/Excel) এক্সপোর্ট প্রস্তুত করা হয়েছে।");
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            শিক্ষার্থী ব্যবস্থাপনা (Student Directory)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            শিক্ষার্থীদের রোল, শ্রেণি, ছবি, প্রোফাইল সংশোধন ও ডিজিটাল পরিচয়পত্র ব্যবস্থাপনা
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExport} className="gap-1.5">
            <Download className="h-4 w-4" />
            এক্সপোর্ট
          </Button>
          <Button size="sm" onClick={() => setAddModalOpen(true)} className="gap-1.5 font-semibold">
            <UserPlus className="h-4 w-4" />
            নতুন শিক্ষার্থী ভর্তি
          </Button>
        </div>
      </div>

      {/* Filters & Search */}
      <Card>
        <CardContent className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="নাম, আইডি বা রোল দিয়ে খুঁজুন..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <span className="text-xs text-slate-500 shrink-0 flex items-center gap-1 font-medium">
              <Filter className="h-3.5 w-3.5" /> শ্রেণি বাছাই:
            </span>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-3 py-2 text-xs font-semibold rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="ALL">সকল শ্রেণি</option>
              <option value="৬ষ্ঠ শ্রেণি">৬ষ্ঠ শ্রেণি</option>
              <option value="৭ম শ্রেণি">৭ম শ্রেণি</option>
              <option value="৮ম শ্রেণি">৮ম শ্রেণি</option>
              <option value="৯ম শ্রেণি">৯ম শ্রেণি</option>
              <option value="১০ম শ্রেণি">১০ম শ্রেণি</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Students Data Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>রোল</TableHead>
                <TableHead>শিক্ষার্থীর নাম ও ছবি</TableHead>
                <TableHead>শ্রেণি ও শাখা</TableHead>
                <TableHead>অভিভাবকের তথ্য</TableHead>
                <TableHead>রক্তের গ্রুপ</TableHead>
                <TableHead>অবস্থা</TableHead>
                <TableHead className="text-right">অ্যাকশন</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-slate-500">
                    কোন শিক্ষার্থী খুঁজে পাওয়া যায়নি।
                  </TableCell>
                </TableRow>
              ) : (
                filteredStudents.map((s) => (
                  <TableRow key={s.id} className="hover:bg-slate-50/60">
                    <TableCell className="font-bold text-slate-900">
                      {toBanglaNumber(s.rollNumber)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {s.photoUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={s.photoUrl}
                            alt={s.nameBn}
                            className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0 shadow-2xs"
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs shrink-0 border border-blue-200">
                            {s.nameBn.slice(0, 1)}
                          </div>
                        )}
                        <div>
                          <span className="font-bold text-slate-900 text-sm block">
                            {s.nameBn}
                          </span>
                          <span className="text-xs text-slate-500 font-mono">
                            {s.studentId} | {s.nameEn}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs font-semibold bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
                        {s.className} ({s.section})
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs">
                        <span className="font-medium text-slate-800 block">{s.guardianName}</span>
                        <span className="text-slate-500 font-mono">{s.guardianPhone}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {s.bloodGroup}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="success" className="text-xs">
                        {s.status === "ACTIVE" ? "সক্রিয়" : "নিষ্ক্রিয়"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Edit Button */}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenEdit(s)}
                          className="h-8 px-2 text-xs gap-1 text-blue-700 hover:bg-blue-50 hover:border-blue-300"
                          title="তথ্য সংশোধন করুন"
                        >
                          <Edit className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">সংশোধন</span>
                        </Button>

                        {/* ID Card Button */}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIdCardModalStudent(s)}
                          className="h-8 px-2 text-xs gap-1 text-indigo-700 hover:bg-indigo-50 hover:border-indigo-300"
                          title="আইডি কার্ড দেখুন"
                        >
                          <QrCode className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">আইডি কার্ড</span>
                        </Button>

                        {/* Delete Button */}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setDeleteConfirmStudent(s)}
                          className="h-8 px-2 text-xs gap-1 text-rose-600 hover:bg-rose-50 hover:border-rose-300 hover:text-rose-700"
                          title="শিক্ষার্থী মুছুন"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">মুছুন</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Student Modal Dialog */}
      <Dialog
        open={addModalOpen}
        onOpenChange={setAddModalOpen}
        title="নতুন শিক্ষার্থী ভর্তি নিবন্ধন"
        description="শিক্ষার্থীর ছবি (Cloudinary), অ্যাকাডেমিক ও অভিভাবক সংক্রান্ত তথ্য পূরণ করুন"
      >
        <form onSubmit={handleCreateStudent} className="space-y-4">
          {/* Cloudinary Image Upload */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <ImageUpload
              value={formData.photoUrl}
              onChange={(url) => setFormData({ ...formData, photoUrl: url })}
              folder="students"
              label="শিক্ষার্থীর ছবি সংযুক্ত করুন"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="শিক্ষার্থীর নাম (বাংলায়) *"
              placeholder="যেমন: মোঃ সাকিব হোসেন"
              value={formData.nameBn}
              onChange={(e) => setFormData({ ...formData, nameBn: e.target.value })}
              required
            />
            <Input
              label="শিক্ষার্থীর নাম (ইংরেজিতে)"
              placeholder="Md. Sakib Hossain"
              value={formData.nameEn}
              onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">শ্রেণি *</label>
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
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">শাখা *</label>
              <select
                className="w-full text-xs font-semibold px-3 py-2 border border-slate-300 rounded-lg bg-white"
                value={formData.section}
                onChange={(e) => setFormData({ ...formData, section: e.target.value })}
              >
                <option value="ক">ক শাখা</option>
                <option value="খ">খ শাখা</option>
              </select>
            </div>
            <Input
              label="রোল নম্বর *"
              type="number"
              placeholder="যেমন: ৫"
              value={formData.rollNumber}
              onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Input
              label="অভিভাবকের নাম *"
              placeholder="পিতা / মাতার নাম"
              value={formData.guardianName}
              onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
              required
            />
            <Input
              label="অভিভাবকের মোবাইল নম্বর *"
              placeholder="০১৭xxxxxxxx"
              value={formData.guardianPhone}
              onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
              required
            />
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">রক্তের গ্রুপ</label>
              <select
                className="w-full text-xs font-semibold px-3 py-2 border border-slate-300 rounded-lg bg-white"
                value={formData.bloodGroup}
                onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <Button type="button" variant="outline" size="sm" onClick={() => setAddModalOpen(false)}>
              বাতিল
            </Button>
            <Button type="submit" size="sm" variant="primary">
              নিবন্ধন সম্পন্ন করুন
            </Button>
          </div>
        </form>
      </Dialog>

      {/* Edit Student Modal Dialog */}
      <Dialog
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        title="শিক্ষার্থীর তথ্য সংশোধন ও আপডেট"
        description="শিক্ষার্থীর নাম, শ্রেণি, রোল, অভিভাবকের তথ্য ও Cloudinary ছবি আপডেট করুন"
      >
        <form onSubmit={handleSaveEdit} className="space-y-4">
          {/* Cloudinary Image Upload */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <ImageUpload
              value={editFormData.photoUrl}
              onChange={(url) => setEditFormData({ ...editFormData, photoUrl: url })}
              folder="students"
              label="শিক্ষার্থীর ছবি পরিবর্তন / আপলোড (Cloudinary)"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="শিক্ষার্থীর নাম (বাংলায়) *"
              value={editFormData.nameBn}
              onChange={(e) => setEditFormData({ ...editFormData, nameBn: e.target.value })}
              required
            />
            <Input
              label="শিক্ষার্থীর নাম (ইংরেজিতে)"
              value={editFormData.nameEn}
              onChange={(e) => setEditFormData({ ...editFormData, nameEn: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">শ্রেণি *</label>
              <select
                className="w-full text-xs font-semibold px-3 py-2 border border-slate-300 rounded-lg bg-white"
                value={editFormData.className}
                onChange={(e) => setEditFormData({ ...editFormData, className: e.target.value })}
              >
                <option value="৬ষ্ঠ শ্রেণি">৬ষ্ঠ শ্রেণি</option>
                <option value="৭ম শ্রেণি">৭ম শ্রেণি</option>
                <option value="৮ম শ্রেণি">৮ম শ্রেণি</option>
                <option value="৯ম শ্রেণি">৯ম শ্রেণি</option>
                <option value="১০ম শ্রেণি">১০ম শ্রেণি</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">শাখা *</label>
              <select
                className="w-full text-xs font-semibold px-3 py-2 border border-slate-300 rounded-lg bg-white"
                value={editFormData.section}
                onChange={(e) => setEditFormData({ ...editFormData, section: e.target.value })}
              >
                <option value="ক">ক শাখা</option>
                <option value="খ">খ শাখা</option>
              </select>
            </div>
            <Input
              label="রোল নম্বর *"
              type="number"
              value={editFormData.rollNumber.toString()}
              onChange={(e) =>
                setEditFormData({
                  ...editFormData,
                  rollNumber: parseInt(e.target.value, 10) || 1,
                })
              }
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Input
              label="অভিভাবকের নাম *"
              value={editFormData.guardianName}
              onChange={(e) => setEditFormData({ ...editFormData, guardianName: e.target.value })}
              required
            />
            <Input
              label="অভিভাবকের মোবাইল নম্বর *"
              value={editFormData.guardianPhone}
              onChange={(e) => setEditFormData({ ...editFormData, guardianPhone: e.target.value })}
              required
            />
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">রক্তের গ্রুপ</label>
              <select
                className="w-full text-xs font-semibold px-3 py-2 border border-slate-300 rounded-lg bg-white"
                value={editFormData.bloodGroup}
                onChange={(e) => setEditFormData({ ...editFormData, bloodGroup: e.target.value })}
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <Button type="button" variant="outline" size="sm" onClick={() => setEditModalOpen(false)}>
              বাতিল
            </Button>
            <Button type="submit" size="sm" variant="primary">
              সংশোধন সংরক্ষণ করুন
            </Button>
          </div>
        </form>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      {deleteConfirmStudent && (
        <Dialog
          open={!!deleteConfirmStudent}
          onOpenChange={() => setDeleteConfirmStudent(null)}
          title="শিক্ষার্থী তথ্য মুছে ফেলার নিশ্চিতকরণ"
          description="আপনি কি নিশ্চিতভাবে এই শিক্ষার্থীর সমস্ত তথ্য সিস্টেম থেকে মুছে ফেলতে চান?"
        >
          <div className="space-y-4 py-2">
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-sm space-y-1">
              <p className="font-bold">
                নাম: {deleteConfirmStudent.nameBn} ({deleteConfirmStudent.studentId})
              </p>
              <p className="text-xs text-rose-700">
                শ্রেণি: {deleteConfirmStudent.className} | রোল: {toBanglaNumber(deleteConfirmStudent.rollNumber)}
              </p>
              <p className="text-xs text-rose-600 pt-1">
                ⚠️ এই অ্যাকশনটি অপরিবর্তনীয়। নিশ্চিত করার পর তথ্য আর পুনরুদ্ধার করা যাবে না।
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setDeleteConfirmStudent(null)}
              >
                বাতিল করুন
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={handleConfirmDelete}
                className="bg-rose-600 hover:bg-rose-700 text-white font-bold"
              >
                মুছে ফেলুন
              </Button>
            </div>
          </div>
        </Dialog>
      )}

      {/* Student QR ID Card Preview Dialog */}
      {idCardModalStudent && (
        <Dialog
          open={!!idCardModalStudent}
          onOpenChange={() => setIdCardModalStudent(null)}
          title="শিক্ষার্থী ডিজিটাল পরিচয়পত্র (Smart ID Card)"
          description="কিউআর কোড সম্বলিত প্রিন্টযোগ্য অফিসিয়াল আইডি কার্ড"
        >
          <div className="p-6 bg-linear-to-b from-blue-700 to-indigo-900 rounded-2xl text-white shadow-xl max-w-sm mx-auto space-y-4 text-center">
            <div className="flex items-center justify-center gap-2 border-b border-blue-400/40 pb-3">
              <GraduationCap className="h-6 w-6 text-amber-300" />
              <div>
                <h4 className="text-sm font-bold">অগ্রদূত আদর্শ উচ্চ বিদ্যালয়</h4>
                <p className="text-[10px] text-blue-200">EIIN: ১২৩৪৫৬ | ঢাকা</p>
              </div>
            </div>

            {/* Student Photo */}
            <div className="w-24 h-28 mx-auto rounded-xl bg-white/20 border-2 border-white/60 flex items-center justify-center overflow-hidden shadow-inner">
              {idCardModalStudent.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={idCardModalStudent.photoUrl}
                  alt={idCardModalStudent.nameBn}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="font-bold text-xs text-blue-100">[ছবি সংযুক্ত নেই]</span>
              )}
            </div>

            <div>
              <h3 className="text-lg font-bold">{idCardModalStudent.nameBn}</h3>
              <p className="text-xs text-blue-200">{idCardModalStudent.nameEn}</p>
            </div>

            <div className="bg-white/10 rounded-xl p-3 text-xs space-y-1 text-left border border-white/10">
              <div className="flex justify-between">
                <span className="text-blue-200">আইডি নং:</span>
                <span className="font-mono font-bold">{idCardModalStudent.studentId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-200">শ্রেণি ও শাখা:</span>
                <span className="font-bold">{idCardModalStudent.className} ({idCardModalStudent.section})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-200">রোল নং:</span>
                <span className="font-bold">{toBanglaNumber(idCardModalStudent.rollNumber)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-200">রক্তের গ্রুপ:</span>
                <span className="font-bold text-amber-300">{idCardModalStudent.bloodGroup}</span>
              </div>
            </div>

            {/* QR Mock */}
            <div className="pt-2 flex flex-col items-center gap-1">
              <div className="p-2 bg-white rounded-lg inline-block">
                <QrCode className="h-12 w-12 text-slate-900" />
              </div>
              <span className="text-[10px] text-blue-200">স্কুল ম্যানেজমেন্ট সিস্টেম ভেরিফাইড</span>
            </div>

            <Button
              size="sm"
              className="w-full bg-white text-blue-900 hover:bg-slate-100 font-bold"
              onClick={() => {
                toast.success("আইডি কার্ড প্রিন্টার প্রেরিত হয়েছে।");
                setIdCardModalStudent(null);
              }}
            >
              প্রিন্ট আইডি কার্ড
            </Button>
          </div>
        </Dialog>
      )}
    </div>
  );
}
