"use client";

import React, { useEffect, useState } from "react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar 
} from "recharts";
import { Sparkles, TrendingDown, ShieldCheck, Activity, ArrowUpRight, DollarSign } from "lucide-react";
import { useSession } from "@/lib/auth-client";

interface ChartItem {
  month: string;
  emissions: number;
  offset: number;
}

interface UserStats {
  carbonFootprint: number;
  aiRecommendations: number;
  currentPlan: string;
  activeProjects: number;
  totalMetricsLogged: number;
  totalFundingReceived: number;
  chartData: ChartItem[];
}

export default function UserOverview() {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
    async function fetchStats() {
      if (!user?.email) return;

      try {
        setLoading(true);
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || "${process.env.NEXT_PUBLIC_API_URL}"}/api/items/user/stats?email=${encodeURIComponent(user.email)}`;

        const res = await fetch(apiUrl, {
            credentials: "include",
        });
        const json = await res.json();
        if (json.success) {
          setStats(json.data);
        }
      } catch (err) {
        console.error("Failed to load user statistics", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, [user?.email]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#10B981]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#0F382B] to-[#10B981] p-6 lg:p-8 rounded-2xl text-white shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-black mt-2">User Sustainability Dashboard</h1>
          <p className="text-emerald-100 text-sm mt-1 max-w-xl">
            Live metrics aggregated directly from your personal MongoDB collections and payment nodes.
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 flex items-center space-x-4">
          <Sparkles className="w-8 h-8 text-[#34D399]" />
          <div>
            <p className="text-xs font-bold text-emerald-200 uppercase">AI Recommendations</p>
            <p className="text-lg font-black">{stats?.aiRecommendations || 0} Active Items</p>
          </div>
        </div>
      </div>

      {/* 4 Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Total Impact Score</span>
            <Activity className="w-5 h-5 text-[#10B981]" />
          </div>
          <p className="text-3xl font-black text-[#0F172A] mt-3">{stats?.carbonFootprint || 0}</p>
          <div className="flex items-center space-x-1 mt-2 text-emerald-600 text-xs font-bold">
            <TrendingDown className="w-4 h-4" />
            <span>User Specific</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Active Projects</span>
            <ShieldCheck className="w-5 h-5 text-[#34D399]" />
          </div>
          <p className="text-3xl font-black text-[#0F172A] mt-3">{stats?.activeProjects || 0}</p>
          <p className="text-xs font-semibold text-slate-500 mt-2">Approved status items</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Total Funding Raised</span>
            <DollarSign className="w-5 h-5 text-emerald-500" />
          </div>
          <p className="text-3xl font-black text-[#0F172A] mt-3">${stats?.totalFundingReceived || 0}</p>
          <p className="text-xs font-semibold text-slate-500 mt-2">From connected payments</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Logged Metrics</span>
            <ArrowUpRight className="w-5 h-5 text-indigo-500" />
          </div>
          <p className="text-3xl font-black text-[#0F172A] mt-3">{stats?.totalMetricsLogged || 0}</p>
          <p className="text-xs font-semibold text-slate-500 mt-2">Your created items count</p>
        </div>
      </div>

      {/* Recharts Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <h3 className="text-lg font-bold text-[#0F172A] mb-4">Carbon Emission vs Offset Trend</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats?.chartData || []} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorEmissions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F8FAFC" />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} />
                <YAxis stroke="#94A3B8" fontSize={12} />
                <Tooltip />
                <Area type="monotone" dataKey="emissions" stroke="#10B981" fillOpacity={1} fill="url(#colorEmissions)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <h3 className="text-lg font-bold text-[#0F172A] mb-4">Green Project Offsets Performance</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats?.chartData || []} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F8FAFC" />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} />
                <YAxis stroke="#94A3B8" fontSize={12} allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="offset" fill="#0F382B" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}