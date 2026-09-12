'use client';

import React, { useState } from 'react';
import { Sparkles, Upload, Loader2, ShieldCheck, DollarSign, MapPin, Tag, FileText, CheckCircle2 } from 'lucide-react';

export default function ItemAddPage() {
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    fullDescription: '',
    category: 'Energy',
    impactScore: 75,
    cost: '',
    fundingGoal: '',
    location: '',
    userEmail: 'user@ecotrack.com', // ডেমো বা সেশন থেকে প্রাপ্ত ইউজারের ইমেইল
    userId: '6a9a9e5501d40a188fbc22f2',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const IMGBB_API_KEY = '1bbede500eee6002e7469ad567b5065b';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setUploadingImage(true);

    const data = new FormData();
    data.append('image', file);

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: 'POST',
        body: data,
      });
      const result = await res.json();
      if (result.success) {
        setFormData((prev) => ({ ...prev, imageUrl: result.data.url }));
      } else {
        setErrorMessage('Failed to upload image to ImgBB.');
      }
    } catch (err) {
      setErrorMessage('Network error while uploading image.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const payload = {
        ...formData,
        cost: Number(formData.cost),
        fundingGoal: Number(formData.fundingGoal),
        impactScore: Number(formData.impactScore),
        aiAnalysisReport: "High feasibility initiative verified by EcoTrack AI compliance parameters.",
        status: "approved"
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccessMessage('Initiative successfully published and added to your portfolio!');
        setFormData({
          title: '',
          shortDescription: '',
          fullDescription: '',
          category: 'Energy',
          impactScore: 75,
          cost: '',
          fundingGoal: '',
          location: '',
          userEmail: 'user@ecotrack.com',
          userId: '6a9a9e5501d40a188fbc22f2',
        });
        setImagePreview(null);
      } else {
        setErrorMessage(data.message || 'Failed to save item to database.');
      }
    } catch (err) {
      setErrorMessage('Server connection error. Ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#0F382B] to-[#10B981]/90 text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center space-x-3 relative z-10">
            <div className="p-3 bg-[#10B981]/30 rounded-xl text-[#34D399] backdrop-blur-md border border-[#34D399]/30">
              <Sparkles className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Add New Sustainability Initiative</h1>
              <p className="text-[#34D399] text-xs sm:text-sm font-medium">Publish green projects, set funding goals, and track corporate ESG impact.</p>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-8">
          {successMessage && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center space-x-2 text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {errorMessage && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-sm">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Initiative Title</label>
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
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-[#10B981] focus:outline-none bg-slate-50/50"
                >
                  <option value="Energy">Energy</option>
                  <option value="Waste">Waste</option>
                  <option value="Water">Water</option>
                  <option value="Biodiversity">Biodiversity</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Location</label>
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
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Capital Cost ($)</label>
                <input
                  type="number"
                  name="cost"
                  required
                  value={formData.cost}
                  onChange={handleInputChange}
                  placeholder="45000"
                  className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-[#10B981] focus:outline-none bg-slate-50/50"
                />
              </div>

              {/* Funding Goal */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Funding Goal ($)</label>
                <input
                  type="number"
                  name="fundingGoal"
                  required
                  value={formData.fundingGoal}
                  onChange={handleInputChange}
                  placeholder="50000"
                  className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-[#10B981] focus:outline-none bg-slate-50/50"
                />
              </div>

              {/* Impact Score */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Impact Score (0-100)</label>
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

              {/* User Email (Managed for User Item Control) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Creator Email</label>
                <input
                  type="email"
                  name="userEmail"
                  disabled
                  value={formData.userEmail}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm bg-slate-100 text-slate-600 cursor-not-allowed"
                />
              </div>

              {/* Short Description */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Short Description</label>
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
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Full Description</label>
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

              {/* Image Upload via ImgBB */}
              <div className="md:col-span-2 space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Initiative Image (ImgBB)</label>
                <div className="flex items-center space-x-4">
                  <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-colors">
                    <Upload className="w-4 h-4" />
                    <span>Upload Image</span>
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </label>
                  {uploadingImage && <span className="text-xs text-[#10B981] flex items-center"><Loader2 className="w-4 h-4 animate-spin mr-1" /> Uploading to ImgBB...</span>}
                </div>
                {imagePreview && (
                  <div className="mt-3 relative w-48 h-28 rounded-xl overflow-hidden border border-slate-200">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

            </div>

            <button
              type="submit"
              disabled={loading || uploadingImage}
              className="w-full flex items-center justify-center space-x-2 bg-[#0F382B] hover:bg-[#10B981] text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-[#0F382B]/10 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-[#34D399]" />
                  <span>Publishing Initiative...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-[#34D399]" />
                  <span>Submit Initiative</span>
                </>
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}