"use client";

import React, { useState } from "react";
import {
  UserCheck,
  UserPlus,
  Search,
  Phone,
  Mail,
  BookOpen,
  Award,
  CheckCircle2,
  Edit,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { ImageUpload } from "@/components/ui/image-upload";
import { toast } from "sonner";

interface TeacherItem {
  id: string;
  employeeId: string;
  nameBn: string;
  nameEn: string;
  designation: string;
  department: string;
  phone: string;
  email: string;
  qualification: string;
  assignedSubjects: string;
  isClassTeacher?: string;
  photoUrl?: string;
  status: "ACTIVE" | "ON_LEAVE";
}

const INITIAL_TEACHERS: TeacherItem[] = [
  {
    id: "1",
    employeeId: "TCH-001",
    nameBn: "ড. মোহাম্মদ আব্দুল্লাহ",
    nameEn: "Dr. Mohammad Abdullah",
    designation: "প্রধান শিক্ষক",
    department: "প্রশাসন ও গণিত",
    phone: "০১৭০০-০০০০০১",
    email: "principal@school.edu.bd",
    qualification: "এম.এসসি (গণিত), বি.এড, পিএইচডি",
    assignedSubjects: "উচ্চতর গণিত",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    status: "ACTIVE",
  },
  {
    id: "2",
    employeeId: "TCH-002",
    nameBn: "কাজী রফিকুল ইসলাম",
    nameEn: "Kazi Rafiqul Islam",
    designation: "সিনিয়র সহকারী শিক্ষক",
    department: "বিজ্ঞান বিভাগ",
    phone: "০১৮০০-০০০০০২",
    email: "rafiqul@school.edu.bd",
    qualification: "এম.এসসি (পদার্থবিজ্ঞান), বি.এড",
    assignedSubjects: "পদার্থবিজ্ঞান, সাধারণ গণিত",
    isClassTeacher: "১০ম শ্রেণি (ক শাখা)",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    status: "ACTIVE",
  },
  {
    id: "3",
    employeeId: "TCH-003",
    nameBn: "মোছাঃ নাজমুন নাহার",
    nameEn: "Most. Nazmun Nahar",
    designation: "সহকারী শিক্ষক",
    department: "বাংলা বিভাগ",
    phone: "০১৯০০-০০০০০৩",
    email: "nazmun@school.edu.bd",
    qualification: "এম.এ (বাংলা ভাষা ও সাহিত্য)",
    assignedSubjects: "বাংলা ১ম ও ২য় পত্র",
    isClassTeacher: "৯ম শ্রেণি (খ শাখা)",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    status: "ACTIVE",
  },
  {
    id: "4",
    employeeId: "TCH-004",
    nameBn: "মোঃ শফিকুল আলম",
    nameEn: "Md. Shafiqul Alam",
    designation: "সহকারী শিক্ষক",
    department: "ইংরেজি বিভাগ",
    phone: "০১৬০০-০০০০০৪",
    email: "shafiqul@school.edu.bd",
    qualification: "এম.এ (ইংরেজি), বি.এড",
    assignedSubjects: "English 1st & 2nd Paper",
    photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    status: "ACTIVE",
  },
  {
    id: "5",
    employeeId: "TCH-005",
    nameBn: "মাহমুদুল হাসান",
    nameEn: "Mahmudul Hasan",
    designation: "প্রধান হিসাবরক্ষক",
    department: "হিসাব বিভাগ",
    phone: "০১৫০০-০০০০০৫",
    email: "accounts@school.edu.bd",
    qualification: "এম.কম (হিসাববিজ্ঞান)",
    assignedSubjects: "হিসাব পরিচালনা",
    photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    status: "ACTIVE",
  },
];

export default function TeachersManagementPage() {
  const [teachers, setTeachers] = useState<TeacherItem[]>(INITIAL_TEACHERS);
  const [search, setSearch] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteConfirmTeacher, setDeleteConfirmTeacher] = useState<TeacherItem | null>(null);

  const [formData, setFormData] = useState({
    nameBn: "",
    nameEn: "",
    designation: "সহকারী শিক্ষক",
    department: "বিজ্ঞান বিভাগ",
    phone: "",
    email: "",
    qualification: "বি.এসসি, বি.এড",
    assignedSubjects: "সাধারণ বিজ্ঞান",
    isClassTeacher: "",
    photoUrl: "",
  });

  const [editFormData, setEditFormData] = useState<TeacherItem>({
    id: "",
    employeeId: "",
    nameBn: "",
    nameEn: "",
    designation: "",
    department: "",
    phone: "",
    email: "",
    qualification: "",
    assignedSubjects: "",
    isClassTeacher: "",
    photoUrl: "",
    status: "ACTIVE",
  });

  const filteredTeachers = teachers.filter(
    (t) =>
      t.nameBn.includes(search) ||
      t.nameEn.toLowerCase().includes(search.toLowerCase()) ||
      t.department.includes(search) ||
      t.designation.includes(search)
  );

  const handleCreateTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nameBn || !formData.phone) {
      toast.error("শিক্ষকের নাম ও ফোন নম্বর প্রদান করুন।");
      return;
    }

    const newId = teachers.length + 1;
    const newTeacher: TeacherItem = {
      id: newId.toString(),
      employeeId: `TCH-${String(newId).padStart(3, "0")}`,
      nameBn: formData.nameBn,
      nameEn: formData.nameEn || "Teacher Name",
      designation: formData.designation,
      department: formData.department,
      phone: formData.phone,
      email: formData.email || `teacher${newId}@school.edu.bd`,
      qualification: formData.qualification,
      assignedSubjects: formData.assignedSubjects,
      isClassTeacher: formData.isClassTeacher || undefined,
      photoUrl: formData.photoUrl,
      status: "ACTIVE",
    };

    setTeachers([newTeacher, ...teachers]);
    setAddModalOpen(false);
    toast.success(`${newTeacher.nameBn} সফলভাবে শিক্ষক তালিকায় যুক্ত হয়েছেন!`);
    setFormData({
      nameBn: "",
      nameEn: "",
      designation: "সহকারী শিক্ষক",
      department: "বিজ্ঞান বিভাগ",
      phone: "",
      email: "",
      qualification: "বি.এসসি, বি.এড",
      assignedSubjects: "সাধারণ বিজ্ঞান",
      isClassTeacher: "",
      photoUrl: "",
    });
  };

  const handleOpenEdit = (teacher: TeacherItem) => {
    setEditFormData({ ...teacher });
    setEditModalOpen(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editFormData.nameBn || !editFormData.phone) {
      toast.error("অনুগ্রহ করে প্রয়োজনীয় তথ্যগুলো পূরণ করুন।");
      return;
    }

    setTeachers((prev) =>
      prev.map((t) => (t.id === editFormData.id ? { ...editFormData } : t))
    );
    setEditModalOpen(false);
    toast.success(`${editFormData.nameBn}-এর তথ্য সফলভাবে সংশোধন করা হয়েছে!`);
  };

  const handleConfirmDelete = () => {
    if (!deleteConfirmTeacher) return;
    const name = deleteConfirmTeacher.nameBn;
    setTeachers((prev) => prev.filter((t) => t.id !== deleteConfirmTeacher.id));
    setDeleteConfirmTeacher(null);
    toast.success(`${name}-এর তথ্য সফলভাবে মুছে ফেলা হয়েছে।`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            শিক্ষক ও কর্মকর্তা ব্যবস্থাপনা
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            শিক্ষকমণ্ডলী, শ্রেণি শিক্ষক অ্যাসাইনমেন্ট, কর্মকর্তা প্রোফাইল ও Cloudinary ছবি ব্যবস্থাপনা
          </p>
        </div>
        <Button size="sm" onClick={() => setAddModalOpen(true)} className="gap-1.5 font-semibold">
          <UserPlus className="h-4 w-4" />
          নতুন শিক্ষক / কর্মকর্তা যোগ করুন
        </Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="নাম, পদবী বা বিভাগ দিয়ে খুঁজুন..."
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
                <TableHead>আইডি</TableHead>
                <TableHead>শিক্ষক / কর্মকর্তার নাম ও ছবি</TableHead>
                <TableHead>বিভাগ ও যোগ্যতা</TableHead>
                <TableHead>দায়িত্ব / বিষয়</TableHead>
                <TableHead>যোগাযোগ</TableHead>
                <TableHead>শ্রেণি শিক্ষক দায়িত্ব</TableHead>
                <TableHead>অবস্থা</TableHead>
                <TableHead className="text-right">অ্যাকশন</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeachers.map((t) => (
                <TableRow key={t.id} className="hover:bg-slate-50/60">
                  <TableCell className="font-mono text-xs font-bold text-slate-600">
                    {t.employeeId}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {t.photoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={t.photoUrl}
                          alt={t.nameBn}
                          className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0 shadow-2xs"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs shrink-0 border border-emerald-200">
                          {t.nameBn.slice(0, 1)}
                        </div>
                      )}
                      <div>
                        <span className="font-bold text-slate-900 text-sm block">{t.nameBn}</span>
                        <span className="text-xs text-blue-600 font-medium">{t.designation}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-xs">
                      <span className="font-semibold text-slate-800 block">{t.department}</span>
                      <span className="text-slate-500">{t.qualification}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs text-slate-700 bg-slate-100 px-2 py-0.5 rounded font-medium">
                      {t.assignedSubjects}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="text-xs space-y-0.5">
                      <p className="flex items-center gap-1 text-slate-700 font-mono">
                        <Phone className="h-3 w-3 text-slate-400" /> {t.phone}
                      </p>
                      <p className="flex items-center gap-1 text-slate-500">
                        <Mail className="h-3 w-3 text-slate-400" /> {t.email}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {t.isClassTeacher ? (
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                        {t.isClassTeacher}
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant="success" className="text-xs">
                      {t.status === "ACTIVE" ? "সক্রিয়" : "ছুটিতে"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenEdit(t)}
                        className="h-8 px-2 text-xs gap-1 text-blue-700 hover:bg-blue-50 hover:border-blue-300"
                        title="তথ্য সংশোধন করুন"
                      >
                        <Edit className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">সংশোধন</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDeleteConfirmTeacher(t)}
                        className="h-8 px-2 text-xs gap-1 text-rose-600 hover:bg-rose-50 hover:border-rose-300 hover:text-rose-700"
                        title="তথ্য মুছুন"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">মুছুন</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Teacher Modal Dialog */}
      <Dialog
        open={addModalOpen}
        onOpenChange={setAddModalOpen}
        title="নতুন শিক্ষক / কর্মকর্তা যোগ করুন"
        description="ছবি (Cloudinary), প্রাতিষ্ঠানিক তথ্য ও পাঠদানের বিষয় নির্ধারণ করুন"
      >
        <form onSubmit={handleCreateTeacher} className="space-y-4">
          {/* Cloudinary Photo Upload */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <ImageUpload
              value={formData.photoUrl}
              onChange={(url) => setFormData({ ...formData, photoUrl: url })}
              folder="teachers"
              label="শিক্ষক / কর্মকর্তার ছবি সংযুক্ত করুন"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="নাম (বাংলায়) *"
              placeholder="যেমন: মোঃ আব্দুল করিম"
              value={formData.nameBn}
              onChange={(e) => setFormData({ ...formData, nameBn: e.target.value })}
              required
            />
            <Input
              label="পদবী *"
              placeholder="সহকারী শিক্ষক / সিনিয়র শিক্ষক"
              value={formData.designation}
              onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="বিভাগ *"
              placeholder="যেমন: বিজ্ঞান বিভাগ / মানবিক বিভাগ"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              required
            />
            <Input
              label="মোবাইল নম্বর *"
              placeholder="০১৭xxxxxxxx"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="ইমেইল অ্যাড্রেস"
              type="email"
              placeholder="teacher@school.edu.bd"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <Input
              label="শ্রেণি শিক্ষক দায়িত্ব (ঐচ্ছিক)"
              placeholder="যেমন: ১০ম শ্রেণি (ক শাখা)"
              value={formData.isClassTeacher}
              onChange={(e) => setFormData({ ...formData, isClassTeacher: e.target.value })}
            />
          </div>

          <Input
            label="শিক্ষাগত যোগ্যতা *"
            placeholder="বি.এসসি (সম্মান), এম.এসসি, বি.এড"
            value={formData.qualification}
            onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
            required
          />

          <Input
            label="পাঠদানের বিষয় / দায়িত্ব *"
            placeholder="পদার্থবিজ্ঞান, সাধারণ গণিত"
            value={formData.assignedSubjects}
            onChange={(e) => setFormData({ ...formData, assignedSubjects: e.target.value })}
            required
          />

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <Button type="button" variant="outline" size="sm" onClick={() => setAddModalOpen(false)}>
              বাতিল
            </Button>
            <Button type="submit" size="sm" variant="primary">
              শিক্ষক যুক্ত করুন
            </Button>
          </div>
        </form>
      </Dialog>

      {/* Edit Teacher Modal Dialog */}
      <Dialog
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        title="শিক্ষক / কর্মকর্তার তথ্য সংশোধন"
        description="ব্যক্তিগত তথ্য, পদবী, যোগাযোগ ও Cloudinary ছবি আপডেট করুন"
      >
        <form onSubmit={handleSaveEdit} className="space-y-4">
          {/* Cloudinary Photo Upload */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <ImageUpload
              value={editFormData.photoUrl}
              onChange={(url) => setEditFormData({ ...editFormData, photoUrl: url })}
              folder="teachers"
              label="শিক্ষক / কর্মকর্তার ছবি পরিবর্তন / আপলোড"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="নাম (বাংলায়) *"
              value={editFormData.nameBn}
              onChange={(e) => setEditFormData({ ...editFormData, nameBn: e.target.value })}
              required
            />
            <Input
              label="পদবী *"
              value={editFormData.designation}
              onChange={(e) => setEditFormData({ ...editFormData, designation: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="বিভাগ *"
              value={editFormData.department}
              onChange={(e) => setEditFormData({ ...editFormData, department: e.target.value })}
              required
            />
            <Input
              label="মোবাইল নম্বর *"
              value={editFormData.phone}
              onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="ইমেইল অ্যাড্রেস"
              type="email"
              value={editFormData.email}
              onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
            />
            <Input
              label="শ্রেণি শিক্ষক দায়িত্ব (ঐচ্ছিক)"
              value={editFormData.isClassTeacher || ""}
              onChange={(e) => setEditFormData({ ...editFormData, isClassTeacher: e.target.value })}
            />
          </div>

          <Input
            label="শিক্ষাগত যোগ্যতা *"
            value={editFormData.qualification}
            onChange={(e) => setEditFormData({ ...editFormData, qualification: e.target.value })}
            required
          />

          <Input
            label="পাঠদানের বিষয় / দায়িত্ব *"
            value={editFormData.assignedSubjects}
            onChange={(e) => setEditFormData({ ...editFormData, assignedSubjects: e.target.value })}
            required
          />

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
      {deleteConfirmTeacher && (
        <Dialog
          open={!!deleteConfirmTeacher}
          onOpenChange={() => setDeleteConfirmTeacher(null)}
          title="শিক্ষক / কর্মকর্তার তথ্য মুছে ফেলার নিশ্চিতকরণ"
          description="আপনি কি নিশ্চিতভাবে এই শিক্ষক বা কর্মকর্তার সমস্ত তথ্য সিস্টেম থেকে মুছে ফেলতে চান?"
        >
          <div className="space-y-4 py-2">
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-sm space-y-1">
              <p className="font-bold">
                নাম: {deleteConfirmTeacher.nameBn} ({deleteConfirmTeacher.employeeId})
              </p>
              <p className="text-xs text-rose-700">
                পদবী: {deleteConfirmTeacher.designation} | বিভাগ: {deleteConfirmTeacher.department}
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
                onClick={() => setDeleteConfirmTeacher(null)}
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
    </div>
  );
}
