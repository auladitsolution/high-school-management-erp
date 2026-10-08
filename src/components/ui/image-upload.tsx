"use client";

import React, { useState, useRef } from "react";
import { Upload, X, Loader2, Image as ImageIcon, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  folder?: "students" | "teachers" | "staff" | "general";
  label?: string;
  className?: string;
}

export function ImageUpload({
  value,
  onChange,
  folder = "general",
  label = "ছবি সংযুক্ত করুন (Cloudinary)",
  className = "",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("শুধুমাত্র ছবি ফাইল (JPG, PNG, WEBP ইত্যাদি) নির্বাচন করুন।");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("ছবির সাইজ সর্বোচ্চ ৫ মেগাবাইট (5MB) হতে পারে।");
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "আপলোড ব্যর্থ হয়েছে");
      }

      onChange(data.url);
      toast.success("Cloudinary-তে ছবি সফলভাবে আপলোড হয়েছে!");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "ছবি আপলোডে সমস্যা হয়েছে";
      toast.error(msg);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = () => {
    onChange("");
    toast.info("ছবি সরানো হয়েছে।");
  };

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-xs font-bold text-slate-700 flex items-center justify-between">
          <span>{label}</span>
          <span className="text-[10px] text-blue-600 font-semibold flex items-center gap-1">
            <CheckCircle2 className="h-2.5 w-2.5 text-blue-500" /> Cloudinary স্টোরেজ
          </span>
        </label>
      )}

      <div className="flex items-center gap-3">
        {/* Preview Container */}
        <div className="relative w-16 h-16 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden shrink-0 shadow-2xs group">
          {value ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={value}
                alt="Uploaded"
                className="w-full h-full object-cover rounded-xl"
              />
              <button
                type="button"
                onClick={handleRemove}
                disabled={uploading}
                className="absolute top-1 right-1 p-1 bg-rose-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-700"
                title="ছবি মুছুন"
              >
                <X className="h-3 w-3" />
              </button>
            </>
          ) : (
            <div className="text-slate-400 flex flex-col items-center">
              <ImageIcon className="h-6 w-6 stroke-[1.5]" />
            </div>
          )}

          {uploading && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-xs flex items-center justify-center">
              <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
            </div>
          )}
        </div>

        {/* Upload Button & Hidden Input */}
        <div className="flex-1 space-y-1">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            disabled={uploading}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs hover:border-blue-400 hover:text-blue-600 transition-all cursor-pointer disabled:opacity-50"
          >
            {uploading ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin text-blue-600" />
                <span>আপলোড হচ্ছে...</span>
              </>
            ) : (
              <>
                <Upload className="h-3.5 w-3.5" />
                <span>{value ? "ছবি পরিবর্তন করুন" : "ছবি আপলোড করুন"}</span>
              </>
            )}
          </button>
          <p className="text-[10px] text-slate-400">
            JPG, PNG বা WEBP (সর্বোচ্চ ৫MB)। সরাসরি ক্লাউডিনারিতে সংরক্ষিত হবে।
          </p>
        </div>
      </div>
    </div>
  );
}
