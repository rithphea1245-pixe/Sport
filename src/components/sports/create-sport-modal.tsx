"use client";

import React, { useState } from "react";
import { SportCategory } from "@/types/sport";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Upload, PlusCircle, Loader2, Sparkles, Shield } from "lucide-react";
import { createSport, createEvent, createSportCategory, uploadImage } from "@/lib/sport-api";

interface CreateSportModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: SportCategory[];
  onSportCreated: () => void;
  onEventCreated: () => void;
  onCategoryCreated?: () => void;
}

export function CreateSportModal({
  isOpen,
  onClose,
  categories,
  onSportCreated,
  onEventCreated,
  onCategoryCreated,
}: CreateSportModalProps) {
  const [mode, setMode] = useState<"sport" | "event" | "category">("sport");

  // Common fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryName, setCategoryName] = useState(
    categories[0]?.name || "Football"
  );
  const [imageUrl, setImageUrl] = useState("");

  // Event specific fields
  const [locationName, setLocationName] = useState("");
  const [latitude, setLatitude] = useState(11.572356);
  const [longitude, setLongitude] = useState(104.923874);

  // Upload state
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

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
      alert("Image upload failed via backend. You can manually enter an image URL instead.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) {
      alert("Please fill in both name and description");
      return;
    }

    const finalImage =
      imageUrl.trim() ||
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop&q=60";

    setSubmitting(true);
    try {
      if (mode === "sport") {
        await createSport({
          name: name.trim(),
          description: description.trim(),
          imageUrls: [finalImage],
          categoryName: categoryName || "Football",
        });
        alert("Sport item created successfully!");
        onSportCreated();
      } else if (mode === "event") {
        await createEvent({
          name: name.trim(),
          description: description.trim(),
          imageUrls: [finalImage],
          locationName: locationName.trim() || "National Stadium",
          latitude: Number(latitude) || 11.572356,
          longitude: Number(longitude) || 104.923874,
          categoryName: categoryName || "Football",
        });
        alert("Event venue created successfully!");
        onEventCreated();
      } else {
        await createSportCategory({
          name: name.trim(),
          description: description.trim(),
        });
        alert("Sport category created successfully!");
        if (onCategoryCreated) onCategoryCreated();
        onSportCreated();
      }
      onClose();
    } catch {
      alert("Creation failed. Please verify API fields.");
    } finally {
      setSubmitting(false);
    }
  };

  const availableCategories = Array.from(
    new Set(categories.map((c) => c.name).filter(Boolean))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#151B10] border border-[#E2E6D5] dark:border-[#26331B] text-[#12150D] dark:text-[#F8F9F3] rounded-[2.5rem] p-6 sm:p-10 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#EEF2E4] dark:bg-[#1E2816] flex items-center justify-center text-[#12150D] dark:text-[#F8F9F3] hover:bg-[#12150D] hover:text-[#C6FE56] cursor-pointer transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title */}
        <div className="mb-6">
          <Badge className="bg-[#C6FE56] text-[#12150D] border-0 mb-2 font-black">
            <Shield className="w-3.5 h-3.5 mr-1" />
            Admin Action: Create Content (POST)
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#12150D] dark:text-[#F8F9F3]">
            Add New Content
          </h2>
          <p className="text-xs text-[#8E9B7E] dark:text-[#A2AF93] font-medium mt-1">
            Choose what you want to publish directly to the live Sport database
          </p>

          {/* Type Switcher: Sport / Event / Category */}
          <div className="flex gap-1.5 p-1 bg-[#F8F9F3] dark:bg-[#0D1009] border border-[#E2E6D5] dark:border-[#26331B] rounded-full mt-4 max-w-md">
            <button
              type="button"
              onClick={() => setMode("sport")}
              className={`flex-1 py-2 px-3 rounded-full text-xs font-bold transition-all cursor-pointer ${
                mode === "sport"
                  ? "bg-[#12150D] dark:bg-[#C6FE56] text-[#C6FE56] dark:text-[#12150D] shadow-sm"
                  : "text-[#616D54] dark:text-[#A2AF93] hover:text-[#12150D] dark:hover:text-[#C6FE56]"
              }`}
            >
              Sport Item
            </button>
            <button
              type="button"
              onClick={() => setMode("event")}
              className={`flex-1 py-2 px-3 rounded-full text-xs font-bold transition-all cursor-pointer ${
                mode === "event"
                  ? "bg-[#12150D] dark:bg-[#C6FE56] text-[#C6FE56] dark:text-[#12150D] shadow-sm"
                  : "text-[#616D54] dark:text-[#A2AF93] hover:text-[#12150D] dark:hover:text-[#C6FE56]"
              }`}
            >
              Venue / Stadium
            </button>
            <button
              type="button"
              onClick={() => setMode("category")}
              className={`flex-1 py-2 px-3 rounded-full text-xs font-bold transition-all cursor-pointer ${
                mode === "category"
                  ? "bg-[#12150D] dark:bg-[#C6FE56] text-[#C6FE56] dark:text-[#12150D] shadow-sm"
                  : "text-[#616D54] dark:text-[#A2AF93] hover:text-[#12150D] dark:hover:text-[#C6FE56]"
              }`}
            >
              Category
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold block mb-1 text-[#12150D] dark:text-[#F8F9F3]">
              {mode === "sport"
                ? "Sport / Highlight Title"
                : mode === "event"
                ? "Venue / Stadium Name"
                : "Category Name"}{" "}
              *
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={
                mode === "sport"
                  ? "e.g. Cambodian Premier League Ball"
                  : mode === "event"
                  ? "e.g. Phnom Penh National Stadium"
                  : "e.g. Rugby"
              }
              required
              className="rounded-2xl border-[#E2E6D5] dark:border-[#26331B] bg-[#F8F9F3] dark:bg-[#0D1009] text-[#12150D] dark:text-[#F8F9F3]"
            />
          </div>

          {mode === "sport" && (
            <div>
              <label className="text-xs font-bold block mb-1 text-[#12150D] dark:text-[#F8F9F3]">
                Discipline Category *
              </label>
              <select
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="w-full h-11 px-3.5 rounded-2xl border border-[#E2E6D5] dark:border-[#26331B] bg-[#F8F9F3] dark:bg-[#0D1009] text-[#12150D] dark:text-[#F8F9F3] text-sm focus:outline-hidden focus:ring-2 focus:ring-[#C6FE56] font-medium"
              >
                {availableCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="text-xs font-bold block mb-1 text-[#12150D] dark:text-[#F8F9F3]">
              Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Provide complete story or description..."
              required
              className="w-full p-3.5 rounded-2xl border border-[#E2E6D5] dark:border-[#26331B] bg-[#F8F9F3] dark:bg-[#0D1009] text-[#12150D] dark:text-[#F8F9F3] text-sm focus:outline-hidden focus:ring-2 focus:ring-[#C6FE56]"
            />
          </div>

          {/* Event Specific */}
          {mode === "event" && (
            <>
              <div>
                <label className="text-xs font-bold block mb-1 text-[#12150D] dark:text-[#F8F9F3]">
                  Location / City *
                </label>
                <Input
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  placeholder="e.g. Phnom Penh Riverside Complex"
                  required
                  className="rounded-2xl border-[#E2E6D5] dark:border-[#26331B] bg-[#F8F9F3] dark:bg-[#0D1009] text-[#12150D] dark:text-[#F8F9F3]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold block mb-1 text-[#12150D] dark:text-[#F8F9F3]">
                    Latitude
                  </label>
                  <Input
                    type="number"
                    step="any"
                    value={latitude}
                    onChange={(e) => setLatitude(Number(e.target.value))}
                    className="rounded-2xl border-[#E2E6D5] dark:border-[#26331B] bg-[#F8F9F3] dark:bg-[#0D1009] text-[#12150D] dark:text-[#F8F9F3]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold block mb-1 text-[#12150D] dark:text-[#F8F9F3]">
                    Longitude
                  </label>
                  <Input
                    type="number"
                    step="any"
                    value={longitude}
                    onChange={(e) => setLongitude(Number(e.target.value))}
                    className="rounded-2xl border-[#E2E6D5] dark:border-[#26331B] bg-[#F8F9F3] dark:bg-[#0D1009] text-[#12150D] dark:text-[#F8F9F3]"
                  />
                </div>
              </div>
            </>
          )}

          {/* Image & File Upload (for Sport and Event) */}
          {mode !== "category" && (
            <div className="pt-2 border-t border-[#EEF2E4] dark:border-[#212C18]">
              <label className="text-xs font-bold block mb-1.5 text-[#12150D] dark:text-[#F8F9F3]">
                Cover Image (File Upload via API or URL)
              </label>
              <div className="flex gap-2 mb-2">
                <label className="cursor-pointer inline-flex items-center px-4 py-2.5 rounded-2xl text-xs font-bold border border-[#E2E6D5] dark:border-[#26331B] bg-[#F8F9F3] dark:bg-[#1E2816] hover:bg-[#EEF2E4] dark:hover:bg-[#28351D] text-[#12150D] dark:text-[#F8F9F3] transition">
                  {uploading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4 mr-2 text-emerald-700 dark:text-[#C6FE56]" />
                  )}
                  {uploading ? "Uploading to API..." : "Upload from Computer"}
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
                placeholder="Or paste image URL (https://...)"
                className="rounded-2xl text-xs border-[#E2E6D5] dark:border-[#26331B] bg-[#F8F9F3] dark:bg-[#0D1009] text-[#12150D] dark:text-[#F8F9F3]"
              />
              {imageUrl && (
                <div className="mt-2.5 w-24 h-24 rounded-2xl overflow-hidden border border-[#E2E6D5] dark:border-[#26331B]">
                  <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          )}

          <div className="pt-4 flex items-center justify-end gap-2.5">
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
              className="bg-[#12150D] dark:bg-[#C6FE56] hover:bg-[#1C2215] dark:hover:bg-[#B3E848] text-[#C6FE56] dark:text-[#12150D] font-black rounded-full px-7 shadow-lg shadow-[#12150D]/10"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Publish {mode === "sport" ? "Sport" : mode === "event" ? "Venue" : "Category"}
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
