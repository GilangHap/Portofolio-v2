"use client";

import { useState } from "react";
import { UploadCloud, X, Loader2 } from "lucide-react";
import Image from "next/image";

import { supabase } from "@/lib/supabase";

interface ImageUploaderProps {
  onUpload: (url: string) => void;
  currentImage?: string;
  bucket?: string;
}

export default function ImageUploader({ onUpload, currentImage, bucket = "images" }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentImage || "");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show local preview immediately
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    setUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);
      
      onUpload(publicUrl);
      setPreview(publicUrl);
      
    } catch (error: any) {
      console.error("Upload failed", error);
      alert(`Upload failed: ${error.message || 'Unknown error'}. Make sure the bucket "${bucket}" exists and is public.`);
      setPreview(currentImage || ""); 
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setPreview("");
    onUpload("");
  };

  return (
    <div className="w-full">
      {preview ? (
        <div className="relative w-full h-48 bg-background border border-border rounded-xl overflow-hidden group">
          <Image 
            src={preview} 
            alt="Preview" 
            fill 
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button 
              type="button"
              onClick={removeImage}
              className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          {uploading && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <Loader2 size={32} className="animate-spin text-primary" />
            </div>
          )}
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-border border-dashed rounded-xl cursor-pointer bg-background hover:bg-surface hover:border-primary/50 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <UploadCloud size={40} className="text-text-secondary mb-3" />
            <p className="mb-2 text-sm text-text-secondary">
              <span className="font-semibold text-primary">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-text-secondary/70">PNG, JPG, WebP (Max 2MB)</p>
          </div>
          <input 
            type="file" 
            className="hidden" 
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </label>
      )}
    </div>
  );
}
