'use client';

import React, { useEffect, useState } from 'react';
import { Trash2, Edit3, Loader2, AlertCircle, CheckCircle2, X, Sparkles, AlertTriangle } from 'lucide-react';
import Image from 'next/image';
import { useSession } from '@/lib/auth-client';

interface IItem {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: 'Energy' | 'Waste' | 'Transport' | 'Supply Chain' | 'Water' | 'Biodiversity';
  impactScore: number;
  cost: number;
  fundingGoal: number;
  location: string;
  imageUrl: string;
  userEmail: string;
}

export default function ItemManagePages() {
  const [items, setItems] = useState<IItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Edit Modal States
  const [editingItem, setEditingItem] = useState<IItem | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  // Delete Modal States
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const { data: session } = useSession();
  const user = session?.user;

  const currentUserEmail = user?.email;

  // Fetch User Items
  const fetchUserItems = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/items/user/email/${currentUserEmail}`);
      const data = await res.json();
      if (data.success) {
        setItems(data.data);
      } else {
        setError('Failed to load your initiatives.');
      }
    } catch (err) {
      setError('Server connection error.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserItems();
  }, []);

  // Open Delete Modal
  const openDeleteModal = (id: string) => {
    setItemToDelete(id);
    setIsDeleteModalOpen(true);
  };

  // Confirm Delete Item
  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;

    setDeleting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/items/${itemToDelete}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setItems(items.filter((item) => item._id !== itemToDelete));
        setSuccessMessage('Initiative deleted successfully.');
        setTimeout(() => setSuccessMessage(null), 3000);
        setIsDeleteModalOpen(false);
      } else {
        alert(data.message || 'Failed to delete item.');
      }
    } catch (err) {
      alert('Error deleting item.');
    } finally {
      setDeleting(false);
      setItemToDelete(null);
    }
  };

  // Open Edit Modal
  const handleEditClick = (item: IItem) => {
    setEditingItem({ ...item });
    setIsEditModalOpen(true);
  };

  // Update Item Submit
  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setUpdating(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/items/${editingItem._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingItem),
      });
      const data = await res.json();
      if (data.success) {
        setItems(items.map((item) => (item._id === editingItem._id ? data.data : item)));
        setIsEditModalOpen(false);
        setSuccessMessage('Initiative updated successfully.');
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        alert(data.message || 'Failed to update item.');
      }
    } catch (err) {
      alert('Error updating item.');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0F382B] to-[#10B981]/90 text-white rounded-2xl p-6 sm:p-8 shadow-xl flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Manage Your Initiatives</h1>
            <p className="text-[#34D399] text-xs sm:text-sm font-medium mt-1">View, modify, or remove the green initiatives you have published.</p>
          </div>
          <div className="hidden sm:flex p-3 bg-[#10B981]/30 rounded-xl text-[#34D399] backdrop-blur-md border border-[#34D399]/30">
            <Sparkles className="w-8 h-8" />
          </div>
        </div>

        {successMessage && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center space-x-2 text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Content Section */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#10B981]" />
          </div>
        ) : error ? (
          <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-sm flex items-center space-x-2">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 p-8">
            <p className="text-slate-500 text-sm">You haven't created any initiatives yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div key={item._id} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="h-48 w-full relative overflow-hidden bg-slate-100">
                    <Image src={item.imageUrl || 'https://images.unsplash.com/photo-1509391365360-b1458951d7c3'} alt={item.title} width={300} height={200} className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 bg-[#0F382B]/80 text-[#34D399] text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-md">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-5 space-y-2">
                    <h3 className="font-bold text-slate-900 text-base line-clamp-1">{item.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2">{item.shortDescription}</p>
                    <div className="flex justify-between items-center text-xs font-medium pt-2 text-slate-600 border-t border-slate-100">
                      <span>Cost: ${item.cost}</span>
                      <span>Goal: ${item.fundingGoal}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleEditClick(item)}
                    className="flex items-center justify-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-xl text-xs font-semibold transition-colors"
                  >
                    <Edit3 className="w-4 h-4 text-slate-600" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => openDeleteModal(item._id)}
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

        {/* Edit Modal (Full Fields) */}
        {isEditModalOpen && editingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <h2 className="text-lg font-bold text-slate-900">Edit Initiative Details</h2>
                <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUpdateSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={editingItem.title}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-[#10B981] focus:outline-none bg-slate-50/50"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Category</label>
                    <select
                      value={editingItem.category}
                      onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value as any })}
                      className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-[#10B981] focus:outline-none bg-slate-50/50"
                    >
                      <option value="Energy">Energy</option>
                      <option value="Waste">Waste</option>
                      <option value="Transport">Transport</option>
                      <option value="Supply Chain">Supply Chain</option>
                      <option value="Water">Water</option>
                      <option value="Biodiversity">Biodiversity</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Location</label>
                    <input
                      type="text"
                      required
                      value={editingItem.location}
                      onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-[#10B981] focus:outline-none bg-slate-50/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Cost ($)</label>
                    <input
                      type="number"
                      required
                      value={editingItem.cost}
                      onChange={(e) => setEditingItem({ ...editingItem, cost: Number(e.target.value) })}
                      className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-[#10B981] focus:outline-none bg-slate-50/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Funding Goal ($)</label>
                    <input
                      type="number"
                      required
                      value={editingItem.fundingGoal}
                      onChange={(e) => setEditingItem({ ...editingItem, fundingGoal: Number(e.target.value) })}
                      className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-[#10B981] focus:outline-none bg-slate-50/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Impact Score</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      required
                      value={editingItem.impactScore}
                      onChange={(e) => setEditingItem({ ...editingItem, impactScore: Number(e.target.value) })}
                      className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-[#10B981] focus:outline-none bg-slate-50/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Image URL</label>
                  <input
                    type="text"
                    required
                    value={editingItem.imageUrl}
                    onChange={(e) => setEditingItem({ ...editingItem, imageUrl: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-[#10B981] focus:outline-none bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Short Description</label>
                  <input
                    type="text"
                    required
                    maxLength={120}
                    value={editingItem.shortDescription}
                    onChange={(e) => setEditingItem({ ...editingItem, shortDescription: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-[#10B981] focus:outline-none bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Full Description</label>
                  <textarea
                    rows={3}
                    required
                    value={editingItem.fullDescription}
                    onChange={(e) => setEditingItem({ ...editingItem, fullDescription: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-[#10B981] focus:outline-none bg-slate-50/50"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={updating}
                    className="px-5 py-2.5 rounded-xl bg-[#0F382B] hover:bg-[#10B981] text-white text-xs font-semibold flex items-center space-x-2 transition-colors disabled:opacity-50"
                  >
                    {updating && <Loader2 className="w-4 h-4 animate-spin text-[#34D399]" />}
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl relative">
              <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Are you sure?</h3>
              <p className="text-xs text-slate-500">This action cannot be undone. This will permanently delete your green initiative from the platform.</p>
              
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={deleting}
                  onClick={handleConfirmDelete}
                  className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold flex items-center justify-center space-x-2 transition-colors disabled:opacity-50"
                >
                  {deleting && <Loader2 className="w-4 h-4 animate-spin text-white" />}
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}