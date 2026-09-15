"use client";

import React, { useEffect, useState } from "react";
import {
  Trash2,
  Edit3,
  Loader2,
  AlertCircle,
  CheckCircle2,
  X,
  Sparkles,
  AlertTriangle,
  Upload,
} from "lucide-react";
import Image from "next/image";
import { useSession } from "@/lib/auth-client";

type Category =
  | "Energy"
  | "Waste"
  | "Transport"
  | "Supply Chain"
  | "Water"
  | "Biodiversity";

interface IItem {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: Category;
  impactScore: number;
  cost: number;
  fundingGoal: number;
  location: string;
  imageUrl: string;
  userEmail: string;
  userId?: string;
  aiAnalysisReport?: string;
  status?: "pending" | "approved" | "rejected";
  createdAt?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

export default function ItemManagePages() {
  const { data: session, isPending: sessionLoading } = useSession();

  const user = session?.user;
  const currentUserEmail = user?.email;

  const [items, setItems] = useState<IItem[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // ==============================
  // Edit Modal States
  // ==============================

  const [editingItem, setEditingItem] = useState<IItem | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  // ImgBB upload states
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // ==============================
  // Delete Modal States
  // ==============================

  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // ==============================
  // Fetch User Items
  // ==============================

  const fetchUserItems = async () => {
    if (!currentUserEmail) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      if (!API_URL) {
        throw new Error("NEXT_PUBLIC_API_URL is not configured.");
      }

      const encodedEmail = encodeURIComponent(currentUserEmail);

      const res = await fetch(
        `${API_URL}/api/items/user/email/${encodedEmail}`,
        {
          method: "GET",
          cache: "no-store",
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(
          data.message || "Failed to load your initiatives."
        );
      }

      setItems(data.data || []);
    } catch (err) {
      console.error("Fetch user items error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Server connection error."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // Fetch after session is ready
  // ==============================

  useEffect(() => {
    if (sessionLoading) {
      return;
    }

    if (!currentUserEmail) {
      setLoading(false);
      setError("Please log in to view your initiatives.");
      return;
    }

    fetchUserItems();
  }, [currentUserEmail, sessionLoading]);

  // ==============================
  // Open Delete Modal
  // ==============================

  const openDeleteModal = (id: string) => {
    setItemToDelete(id);
    setIsDeleteModalOpen(true);
  };

  // ==============================
  // Confirm Delete
  // ==============================

  const handleConfirmDelete = async () => {
    if (!itemToDelete) {
      return;
    }

    if (!API_URL) {
      setError("NEXT_PUBLIC_API_URL is not configured.");
      return;
    }

    setDeleting(true);

    try {
      const res = await fetch(
        `${API_URL}/api/items/${itemToDelete}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(
          data.message || "Failed to delete item."
        );
      }

      setItems((prevItems) =>
        prevItems.filter(
          (item) => item._id !== itemToDelete
        )
      );

      setSuccessMessage(
        "Initiative deleted successfully."
      );

      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);

      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error("Delete item error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Error deleting item."
      );
    } finally {
      setDeleting(false);
      setItemToDelete(null);
    }
  };

  // ==============================
  // Open Edit Modal
  // ==============================

  const handleEditClick = (item: IItem) => {
    setEditingItem({ ...item });

    // Show current image inside modal
    setImagePreview(item.imageUrl || null);

    setIsEditModalOpen(true);

    setError(null);
  };

  // ==============================
  // Close Edit Modal
  // ==============================

  const closeEditModal = () => {
    if (updating || uploadingImage) {
      return;
    }

    setIsEditModalOpen(false);
    setEditingItem(null);
    setImagePreview(null);
  };

  // ==============================
  // Handle Edit Input
  // ==============================

  const handleEditInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (!editingItem) {
      return;
    }

    const { name, value } = e.target;

    setEditingItem((prev) => {
      if (!prev) {
        return null;
      }

      if (name === "impactScore") {
        return {
          ...prev,
          impactScore: Number(value),
        };
      }

      if (name === "cost") {
        return {
          ...prev,
          cost: Number(value),
        };
      }

      if (name === "fundingGoal") {
        return {
          ...prev,
          fundingGoal: Number(value),
        };
      }

      if (name === "category") {
        return {
          ...prev,
          category: value as Category,
        };
      }

      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // ==============================
  // ImgBB Upload For Edit Modal
  // ==============================

  const handleEditImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file || !editingItem) {
      return;
    }

    setError(null);

    // Basic validation
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    // 5MB limit
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB.");
      return;
    }

    if (!IMGBB_API_KEY) {
      setError(
        "ImgBB API key is not configured. Please check your environment variables."
      );
      return;
    }

    setUploadingImage(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(
          result.error?.message ||
            "Failed to upload image to ImgBB."
        );
      }

      const uploadedImageUrl = result.data.url;

      // Update editing item with new image URL
      setEditingItem((prev) => {
        if (!prev) {
          return null;
        }

        return {
          ...prev,
          imageUrl: uploadedImageUrl,
        };
      });

      // Update preview
      setImagePreview(uploadedImageUrl);
    } catch (err) {
      console.error("ImgBB upload error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Network error while uploading image."
      );
    } finally {
      setUploadingImage(false);
    }
  };

  // ==============================
  // Update Item
  // ==============================

  const handleUpdateSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!editingItem) {
      return;
    }

    if (!API_URL) {
      setError("NEXT_PUBLIC_API_URL is not configured.");
      return;
    }

    if (uploadingImage) {
      setError(
        "Please wait until the image upload is finished."
      );
      return;
    }

    setUpdating(true);
    setError(null);

    try {
      const payload = {
        title: editingItem.title,
        shortDescription: editingItem.shortDescription,
        fullDescription: editingItem.fullDescription,
        category: editingItem.category,
        impactScore: Number(editingItem.impactScore),
        cost: Number(editingItem.cost),
        fundingGoal: Number(editingItem.fundingGoal),
        location: editingItem.location,
        imageUrl: editingItem.imageUrl,

        // Keep ownership unchanged
        userId: editingItem.userId,
        userEmail: editingItem.userEmail,

        // Keep existing AI report/status if available
        aiAnalysisReport:
          editingItem.aiAnalysisReport,

        status: editingItem.status,
      };

      const res = await fetch(
        `${API_URL}/api/items/${editingItem._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(
          data.message || "Failed to update item."
        );
      }

      // Update UI immediately
      setItems((prevItems) =>
        prevItems.map((item) =>
          item._id === editingItem._id
            ? data.data
            : item
        )
      );

      setIsEditModalOpen(false);
      setEditingItem(null);
      setImagePreview(null);

      setSuccessMessage(
        "Initiative updated successfully."
      );

      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (err) {
      console.error("Update item error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Error updating item."
      );
    } finally {
      setUpdating(false);
    }
  };

  // ==============================
  // Render
  // ==============================

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <div className="bg-gradient-to-r from-[#0F382B] to-[#10B981]/90 text-white rounded-2xl p-6 sm:p-8 shadow-xl flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Manage Your Initiatives
            </h1>

            <p className="text-[#34D399] text-xs sm:text-sm font-medium mt-1">
              View, modify, or remove the green initiatives
              you have published.
            </p>
          </div>

          <div className="hidden sm:flex p-3 bg-[#10B981]/30 rounded-xl text-[#34D399] backdrop-blur-md border border-[#34D399]/30">
            <Sparkles className="w-8 h-8" />
          </div>
        </div>

        {/* Success */}
        {successMessage && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center space-x-2 text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-sm flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>

            <button
              type="button"
              onClick={() => setError(null)}
              className="ml-auto"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Loading */}
        {sessionLoading || loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#10B981]" />
          </div>
        ) : items.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 p-8">
            <p className="text-slate-500 text-sm">
              You haven't created any initiatives yet.
            </p>
          </div>
        ) : (
          /* Items */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Image */}
                  <div className="h-48 w-full relative overflow-hidden bg-slate-100">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">
                        No Image
                      </div>
                    )}

                    <span className="absolute top-3 left-3 bg-[#0F382B]/80 text-[#34D399] text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-md">
                      {item.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-2">
                    <h3 className="font-bold text-slate-900 text-base line-clamp-1">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-2">
                      {item.shortDescription}
                    </p>

                    <div className="flex justify-between items-center text-xs font-medium pt-2 text-slate-600 border-t border-slate-100">
                      <span>
                        Cost: ${item.cost}
                      </span>

                      <span>
                        Goal: ${item.fundingGoal}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-5 pt-0 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      handleEditClick(item)
                    }
                    className="flex items-center justify-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-xl text-xs font-semibold transition-colors"
                  >
                    <Edit3 className="w-4 h-4 text-slate-600" />
                    <span>Edit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      openDeleteModal(item._id)
                    }
                    className="flex items-center justify-center space-x-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 py-2.5 rounded-xl text-xs font-semibold transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-rose-600" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================================================= */}
        {/* EDIT MODAL */}
        {/* ================================================= */}

        {isEditModalOpen && editingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">

              {/* Modal Header */}
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Edit Initiative
                  </h2>

                  <p className="text-xs text-slate-500 mt-1">
                    Update your initiative information.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeEditModal}
                  disabled={updating || uploadingImage}
                  className="text-slate-400 hover:text-slate-600 disabled:opacity-50"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form
                onSubmit={handleUpdateSubmit}
                className="space-y-5"
              >

                {/* Title */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Title
                  </label>

                  <input
                    type="text"
                    name="title"
                    required
                    value={editingItem.title}
                    onChange={handleEditInputChange}
                    className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-[#10B981] focus:outline-none bg-slate-50/50"
                  />
                </div>

                {/* Category + Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Category
                    </label>

                    <select
                      name="category"
                      value={editingItem.category}
                      onChange={handleEditInputChange}
                      className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-[#10B981] focus:outline-none bg-slate-50/50"
                    >
                      <option value="Energy">
                        Energy
                      </option>

                      <option value="Waste">
                        Waste
                      </option>

                      <option value="Transport">
                        Transport
                      </option>

                      <option value="Supply Chain">
                        Supply Chain
                      </option>

                      <option value="Water">
                        Water
                      </option>

                      <option value="Biodiversity">
                        Biodiversity
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Location
                    </label>

                    <input
                      type="text"
                      name="location"
                      required
                      value={editingItem.location}
                      onChange={handleEditInputChange}
                      className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-[#10B981] focus:outline-none bg-slate-50/50"
                    />
                  </div>
                </div>

                {/* Cost + Funding + Impact */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Cost ($)
                    </label>

                    <input
                      type="number"
                      name="cost"
                      min="0"
                      required
                      value={editingItem.cost}
                      onChange={handleEditInputChange}
                      className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-[#10B981] focus:outline-none bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Funding Goal ($)
                    </label>

                    <input
                      type="number"
                      name="fundingGoal"
                      min="0"
                      required
                      value={editingItem.fundingGoal}
                      onChange={handleEditInputChange}
                      className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-[#10B981] focus:outline-none bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Impact Score
                    </label>

                    <input
                      type="number"
                      name="impactScore"
                      min="0"
                      max="100"
                      required
                      value={editingItem.impactScore}
                      onChange={handleEditInputChange}
                      className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-[#10B981] focus:outline-none bg-slate-50/50"
                    />
                  </div>
                </div>

                {/* ================================================= */}
                {/* IMGBB IMAGE UPLOAD */}
                {/* ================================================= */}

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Initiative Image
                  </label>

                  {/* Current / New Image Preview */}
                  <div className="relative w-full h-48 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 mb-3">

                    {imagePreview ? (
                      <Image
                        src={imagePreview}
                        alt="Initiative preview"
                        fill
                        sizes="(max-width: 768px) 100vw, 600px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">
                        No image selected
                      </div>
                    )}

                    {uploadingImage && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="flex flex-col items-center text-white">
                          <Loader2 className="w-7 h-7 animate-spin mb-2" />
                          <span className="text-xs font-medium">
                            Uploading image...
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Upload Button */}
                  <label
                    className={`cursor-pointer w-full flex items-center justify-center gap-2 border border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-3 rounded-xl text-xs font-semibold transition-colors ${
                      uploadingImage
                        ? "opacity-50 pointer-events-none"
                        : ""
                    }`}
                  >
                    <Upload className="w-4 h-4" />

                    <span>
                      {uploadingImage
                        ? "Uploading..."
                        : "Choose New Image"}
                    </span>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleEditImageUpload}
                      disabled={uploadingImage}
                      className="hidden"
                    />
                  </label>

                  <p className="text-[11px] text-slate-400 mt-2">
                    JPG, PNG, WEBP • Maximum 5MB
                  </p>
                </div>

                {/* Short Description */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Short Description
                  </label>

                  <input
                    type="text"
                    name="shortDescription"
                    required
                    maxLength={120}
                    value={editingItem.shortDescription}
                    onChange={handleEditInputChange}
                    className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-[#10B981] focus:outline-none bg-slate-50/50"
                  />
                </div>

                {/* Full Description */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Full Description
                  </label>

                  <textarea
                    name="fullDescription"
                    rows={4}
                    required
                    value={editingItem.fullDescription}
                    onChange={handleEditInputChange}
                    className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-[#10B981] focus:outline-none bg-slate-50/50"
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">

                  <button
                    type="button"
                    onClick={closeEditModal}
                    disabled={updating || uploadingImage}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={
                      updating ||
                      uploadingImage
                    }
                    className="px-5 py-2.5 rounded-xl bg-[#0F382B] hover:bg-[#10B981] text-white text-xs font-semibold flex items-center space-x-2 transition-colors disabled:opacity-50"
                  >
                    {updating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>
                          Saving...
                        </span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>
                          Save Changes
                        </span>
                      </>
                    )}
                  </button>

                </div>
              </form>
            </div>
          </div>
        )}

        {/* ================================================= */}
        {/* DELETE MODAL */}
        {/* ================================================= */}

        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl relative">

              <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-bold text-slate-900">
                Are you sure?
              </h3>

              <p className="text-xs text-slate-500">
                This action cannot be undone. This will
                permanently delete your green initiative
                from the platform.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">

                <button
                  type="button"
                  onClick={() =>
                    setIsDeleteModalOpen(false)
                  }
                  disabled={deleting}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  disabled={deleting}
                  onClick={handleConfirmDelete}
                  className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold flex items-center justify-center space-x-2 transition-colors disabled:opacity-50"
                >
                  {deleting && (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  )}

                  <span>
                    {deleting
                      ? "Deleting..."
                      : "Delete"}
                  </span>
                </button>

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}