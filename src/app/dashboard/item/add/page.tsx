"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Upload,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { useSession } from "@/lib/auth-client";

export default function ItemAddPage() {
  const { data: session, isPending: sessionLoading } = useSession();

  const currentUser = session?.user;

  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    category: "Energy",
    impactScore: 75,
    cost: "",
    fundingGoal: "",
    location: "",
    imageUrl: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [uploadingImage, setUploadingImage] = useState(false);
  const [loading, setLoading] = useState(false);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "impactScore"
          ? Number(value)
          : value,
    }));
  };

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setErrorMessage(null);

    if (!IMGBB_API_KEY) {
      setErrorMessage(
        "ImgBB API key is not configured. Please check your environment variables."
      );
      return;
    }

    setUploadingImage(true);

    const data = new FormData();
    data.append("image", file);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        {
          method: "POST",
          body: data,
        }
      );

      const result = await res.json();

      if (result.success) {
        setFormData((prev) => ({
          ...prev,
          imageUrl: result.data.url,
        }));
      } else {
        setErrorMessage("Failed to upload image to ImgBB.");
      }
    } catch (error) {
      console.error("ImgBB upload error:", error);

      setErrorMessage(
        "Network error while uploading image."
      );
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSuccessMessage(null);
    setErrorMessage(null);

    // Make sure session is loaded
    if (sessionLoading) {
      setErrorMessage("Please wait while your account is loading.");
      return;
    }

    // Make sure user is logged in
    if (!currentUser) {
      setErrorMessage(
        "You must be logged in to create an initiative."
      );
      return;
    }

    // Make sure required user information exists
    if (!currentUser.id || !currentUser.email) {
      setErrorMessage(
        "User information is missing. Please login again."
      );
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...formData,

        cost: Number(formData.cost),
        fundingGoal: Number(formData.fundingGoal),
        impactScore: Number(formData.impactScore),

        // Current logged-in user
        userId: currentUser.id,
        userEmail: currentUser.email,

        // AI analysis
        aiAnalysisReport:
          "High feasibility initiative verified by EcoTrack AI compliance parameters.",

        status: "approved",
      };

      console.log("Creating item for:", {
        userId: currentUser.id,
        userEmail: currentUser.email,
      });

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/items`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Failed to save item to database."
        );
      }

      setSuccessMessage(
        "Initiative successfully published and added to your portfolio!"
      );

      // Reset only initiative fields.
      // DO NOT reset userId/userEmail because they are not in formData anymore.
      setFormData({
        title: "",
        shortDescription: "",
        fullDescription: "",
        category: "Energy",
        impactScore: 75,
        cost: "",
        fundingGoal: "",
        location: "",
        imageUrl: "",
      });

      setImageFile(null);
      setImagePreview(null);

      // Reset file input if needed
      const fileInput = document.getElementById(
        "initiative-image"
      ) as HTMLInputElement | null;

      if (fileInput) {
        fileInput.value = "";
      }
    } catch (error) {
      console.error("Create item error:", error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Server connection error. Ensure backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div className="bg-gradient-to-r from-[#0F382B] to-[#10B981]/90 text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center space-x-3 relative z-10">
            <div className="p-3 bg-[#10B981]/30 rounded-xl text-[#34D399] backdrop-blur-md border border-[#34D399]/30">
              <Sparkles className="w-8 h-8" />
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Add New Sustainability Initiative
              </h1>

              <p className="text-[#34D399] text-xs sm:text-sm font-medium">
                Publish green projects, set funding goals, and track
                corporate ESG impact.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-8">

          {/* Success */}
          {successMessage && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center space-x-2 text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Error */}
          {errorMessage && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-sm">
              {errorMessage}
            </div>
          )}

          {/* Logged-in user */}
          {currentUser && (
            <div className="mb-6 p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Creating initiative as
              </p>

              <p className="text-sm font-semibold text-slate-800">
                {currentUser.name || "User"}
              </p>

              <p className="text-xs text-slate-500 mt-1">
                {currentUser.email}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Title */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Initiative Title
                </label>

                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g. Industrial Rooftop Solar Array Integration"
                  className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-[#10B981] focus:outline-none bg-slate-50/50"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Category
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-[#10B981] focus:outline-none bg-slate-50/50"
                >
                  <option value="Energy">Energy</option>
                  <option value="Waste">Waste</option>
                  <option value="Transport">Transport</option>
                  <option value="Supply Chain">
                    Supply Chain
                  </option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g. Dhaka Industrial Zone, Bangladesh"
                  className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-[#10B981] focus:outline-none bg-slate-50/50"
                />
              </div>

              {/* Cost */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Capital Cost ($)
                </label>

                <input
                  type="number"
                  name="cost"
                  min="0"
                  required
                  value={formData.cost}
                  onChange={handleInputChange}
                  placeholder="45000"
                  className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-[#10B981] focus:outline-none bg-slate-50/50"
                />
              </div>

              {/* Funding Goal */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Funding Goal ($)
                </label>

                <input
                  type="number"
                  name="fundingGoal"
                  min="0"
                  required
                  value={formData.fundingGoal}
                  onChange={handleInputChange}
                  placeholder="50000"
                  className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-[#10B981] focus:outline-none bg-slate-50/50"
                />
              </div>

              {/* Impact Score */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Impact Score (0-100)
                </label>

                <input
                  type="number"
                  name="impactScore"
                  min="0"
                  max="100"
                  required
                  value={formData.impactScore}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-[#10B981] focus:outline-none bg-slate-50/50"
                />
              </div>

              {/* Creator Email */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Creator Email
                </label>

                <input
                  type="email"
                  disabled
                  value={currentUser?.email || ""}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm bg-slate-100 text-slate-600 cursor-not-allowed"
                />
              </div>

              {/* Short Description */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Short Description
                </label>

                <input
                  type="text"
                  name="shortDescription"
                  required
                  maxLength={120}
                  value={formData.shortDescription}
                  onChange={handleInputChange}
                  placeholder="Brief summary for card display..."
                  className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-[#10B981] focus:outline-none bg-slate-50/50"
                />
              </div>

              {/* Full Description */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Full Description
                </label>

                <textarea
                  name="fullDescription"
                  rows={4}
                  required
                  value={formData.fullDescription}
                  onChange={handleInputChange}
                  placeholder="Detailed initiative overview..."
                  className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-[#10B981] focus:outline-none bg-slate-50/50"
                />
              </div>

              {/* Image Upload */}
              <div className="md:col-span-2 space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Initiative Image
                </label>

                <div className="flex items-center space-x-4">
                  <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-colors">
                    <Upload className="w-4 h-4" />

                    <span>Upload Image</span>

                    <input
                      id="initiative-image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>

                  {uploadingImage && (
                    <span className="text-xs text-[#10B981] flex items-center">
                      <Loader2 className="w-4 h-4 animate-spin mr-1" />
                      Uploading to ImgBB...
                    </span>
                  )}
                </div>

                {imagePreview && (
                  <div className="mt-3 relative w-48 h-28 rounded-xl overflow-hidden border border-slate-200">
                    <img
                      src={imagePreview}
                      alt="Initiative preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={
                loading ||
                uploadingImage ||
                sessionLoading ||
                !currentUser
              }
              className="w-full flex items-center justify-center space-x-2 bg-[#0F382B] hover:bg-[#10B981] text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-[#0F382B]/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-[#34D399]" />
                  <span>Publishing Initiative...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-[#34D399]" />
                  <span>
                    {sessionLoading
                      ? "Loading Account..."
                      : "Submit Initiative"}
                  </span>
                </>
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}