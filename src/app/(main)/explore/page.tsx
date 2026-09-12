'use client';

import React, { useState, useEffect } from 'react';
import { Search, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Item {
  _id: string;
  title: string;
  shortDescription: string;
  category: string;
  impactScore: number;
  cost: number;
  location: string;
  imageUrl: string;
}

export default function ExplorePage() {
  const [items, setItems] = useState<Item[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [impactTier, setImpactTier] = useState('');
  const [sort, setSort] = useState('impact');
  
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const limit = 8;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, [search, category, impactTier, sort, page]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (search) queryParams.append('search', search);
      if (category) queryParams.append('category', category);
      if (impactTier) queryParams.append('impactTier', impactTier);
      if (sort) queryParams.append('sort', sort);
      queryParams.append('page', page.toString());
      queryParams.append('limit', limit.toString());

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/items?${queryParams.toString()}`);
      const data = await res.json();
      if (data.success) {
        setItems(data.data);
        setTotalPages(data.totalPages);
        setTotalItems(data.totalItems);
      }
    } catch (err) {
      console.error('Failed to fetch items', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Header */}
        <div className="bg-linear-to-r from-[#0F382B] to-[#10B981] text-white rounded-2xl p-8 shadow-xl">
          <h1 className="text-3xl font-extrabold tracking-tight">Explore Certified Carbon Initiatives & Metrics</h1>
          <p className="text-emerald-100 text-sm mt-2 max-w-2xl">
            Discover verified corporate carbon reduction projects, renewable energy transitions, and efficiency tracking metrics across global facilities.
          </p>
        </div>

        {/* Filters & Search Bar */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search initiatives..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981]"
            />
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#10B981]"
          >
            <option value="">All Categories</option>
            <option value="Energy">Energy</option>
            <option value="Waste Management">Waste Management</option>
            <option value="Transport">Transport</option>
            <option value="Supply Chain">Supply Chain</option>
          </select>

          <select
            value={impactTier}
            onChange={(e) => setImpactTier(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#10B981]"
          >
            <option value="">All Impact Tiers</option>
            <option value="High">High Impact (80+)</option>
            <option value="Medium">Medium Impact (40-79)</option>
            <option value="Low">Low Impact (&lt;40)</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#10B981]"
          >
            <option value="impact">Sort by Impact Score</option>
            <option value="cost-asc">Cost: Low to High</option>
            <option value="cost-desc">Cost: High to Low</option>
          </select>
        </div>

        {/* 4 Cards per Row Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="bg-white rounded-xl h-80 animate-pulse border border-slate-200" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <p className="text-slate-500 text-sm">No corporate carbon initiatives found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((item) => (
              <div key={item._id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="relative h-44 bg-slate-100">
                    <Image src={item.imageUrl || "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9"} alt={item.title} width={400} height={176} className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 bg-[#0F382B] text-[#34D399] text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-md">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-5 space-y-2">
                    <h3 className="font-bold text-[#0F382B] text-base line-clamp-1">{item.title}</h3>
                    <p className="text-slate-600 text-xs line-clamp-2">{item.shortDescription}</p>
                  </div>
                </div>
                <div className="p-5 pt-0 space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3">
                    <span className="flex items-center space-x-1"><MapPin className="w-3.5 h-3.5 text-[#10B981]" /><span>{item.location || 'Global'}</span></span>
                    <span className="font-bold text-[#0F382B]">${item.cost?.toLocaleString()}</span>
                  </div>
                  <Link href={`/explore/item/${item._id}`} className="block w-full text-center bg-[#0F382B] hover:bg-[#10B981] text-white text-xs font-semibold py-2.5 rounded-xl transition-colors">
                     View Details & Analytics
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Section */}
        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-between bg-white rounded-2xl px-6 py-4 border border-slate-200 shadow-sm">
            <p className="text-xs text-slate-500">
              Showing page <span className="font-semibold text-[#0F382B]">{page}</span> of <span className="font-semibold text-[#0F382B]">{totalPages}</span> ({totalItems} total items)
            </p>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="flex items-center space-x-1 px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="hidden sm:flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    onClick={() => setPage(num)}
                    className={`w-9 h-9 rounded-xl text-xs font-semibold transition-colors ${
                      page === num
                        ? 'bg-[#0F382B] text-white'
                        : 'border border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={page === totalPages}
                className="flex items-center space-x-1 px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}