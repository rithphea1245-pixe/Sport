"use client";

import React, { useState, useEffect } from "react";
import { Sport, SportCategory } from "@/types/sport";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Upload, Loader2, Edit3, Image as ImageIcon } from "lucide-react";
import { updateSport, uploadImage } from "@/lib/sport-api";

interface EditSportModalProps {
  sport: Sport | null;
  isOpen: boolean;
  onClose: () => void;
  categories: SportCategory[];
  onSportUpdated: () => void;
}

export function EditSportModal({
  sport,
  isOpen,
  onClose,
  categories,
  onSportUpdated,
}: EditSportModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (sport) {
      setName(sport.name || "");
      setDescription(sport.description || "");
      setCategoryName(sport.category?.name || categories[0]?.name || "Football");
      setImageUrl(sport.imageUrls?.[0] || "");
    }
  }, [sport, categories]);

  if (!isOpen || !sport) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const urls = await uploadImage(file);
      if (urls && urls[0]) {
        setImageUrl(urls[0]);
      }
    } catch {
      alert("Image upload failed via backend. Please paste an image URL instead.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) {
      alert("Name and description are required.");
      return;
    }

    setSubmitting(true);
    try {
      await updateSport(sport.uuid, {
        name: name.trim(),
        description: description.trim(),
        imageUrls: imageUrl.trim() ? [imageUrl.trim()] : sport.imageUrls,
        categoryName: categoryName || "Football",
      });
      alert("Sport updated successfully!");
      onSportUpdated();
      onClose();
    } catch {
      alert("Failed to update sport. Check API connection.");
    } finally {
      setSubmitting(false);
    }
  };

  const availableCategories = Array.from(
    new Set(categories.map((c) => c.name).filter(Boolean))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg max-h-[90dvh] overflow-y-auto bg-white dark:bg-[#151B10] border border-[#E2E6D5] dark:border-[#26331B] text-[#12150D] dark:text-[#F8F9F3] rounded-3xl p-4 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-muted dark:bg-[#1E2816] flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="mb-6">
          <Badge className="bg-[#C6FE56] text-[#12150D] hover:bg-[#A5DE32] border-0 mb-2 font-bold">
            <Edit3 className="w-3.5 h-3.5 mr-1" />
            Admin Edit (PATCH)
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight text-[#12150D] dark:text-[#F8F9F3]">
            Edit Sport Item
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Updating UUID: <code className="text-xs">{sport.uuid}</code>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold block mb-1 text-[#12150D] dark:text-[#F8F9F3]">
              Sport Title *
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="rounded-xl border-[#E2E6D5] dark:border-[#26331B] bg-[#F8F9F3] dark:bg-[#0D1009] text-[#12150D] dark:text-[#F8F9F3]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold block mb-1 text-[#12150D] dark:text-[#F8F9F3]">
              Category Discipline *
            </label>
            <select
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full h-10 px-3 rounded-xl border border-[#E2E6D5] dark:border-[#26331B] bg-[#F8F9F3] dark:bg-[#0D1009] text-[#12150D] dark:text-[#F8F9F3] text-sm focus:outline-hidden focus:ring-2 focus:ring-[#C6FE56]"
            >
              {availableCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold block mb-1 text-[#12150D] dark:text-[#F8F9F3]">
              Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
              className="w-full p-3 rounded-xl border border-[#E2E6D5] dark:border-[#26331B] bg-[#F8F9F3] dark:bg-[#0D1009] text-[#12150D] dark:text-[#F8F9F3] text-sm focus:outline-hidden focus:ring-2 focus:ring-[#C6FE56]"
            />
          </div>

          <div className="pt-2 border-t border-[#E2E6D5] dark:border-[#26331B]">
            <label className="text-xs font-semibold block mb-1 text-[#12150D] dark:text-[#F8F9F3]">
              Cover Image
            </label>
            <div className="flex gap-2 mb-2">
              <label className="cursor-pointer inline-flex items-center px-4 py-2 rounded-xl text-xs font-semibold border border-[#E2E6D5] dark:border-[#26331B] bg-muted dark:bg-[#1E2816] hover:bg-muted/80 text-foreground transition">
                {uploading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Upload className="w-4 h-4 mr-2 text-emerald-700 dark:text-[#C6FE56]" />
                )}
                {uploading ? "Uploading..." : "Replace Image File"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
            </div>
            <Input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Or enter image URL"
              className="rounded-xl text-xs border-[#E2E6D5] dark:border-[#26331B] bg-[#F8F9F3] dark:bg-[#0D1009] text-[#12150D] dark:text-[#F8F9F3]"
            />
            {imageUrl && (
              <div className="mt-2 w-28 h-20 rounded-xl overflow-hidden border border-[#E2E6D5] dark:border-[#26331B]">
                <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          <div className="pt-4 flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-full border-[#E2E6D5] dark:border-[#26331B] dark:text-[#F8F9F3] dark:hover:bg-[#1E2816]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={submitting}
              className="bg-[#12150D] dark:bg-[#C6FE56] hover:bg-[#1C2215] dark:hover:bg-[#B3E848] text-[#C6FE56] dark:text-[#12150D] font-bold rounded-full px-6 shadow-md"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
