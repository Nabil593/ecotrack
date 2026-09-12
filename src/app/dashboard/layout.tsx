"use client";

import React, { useState } from "react";
import { useSession } from "@/lib/auth-client";
import Sidebar from "@/components/dashboard/Sidebar";
import { Menu } from "lucide-react";

interface UserSession {
  name?: string;
  email?: string;
  role?: string;
}

interface SessionData {
  user?: UserSession;
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const { data: session, isPending } = useSession() as { data: SessionData | null; isPending: boolean };

  const user = session?.user;
  const isAdmin = user?.role === "admin";

  if (isPending) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600"></div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#F8FAFC] flex text-slate-900 font-sans overflow-hidden">
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar কম্পোনেন্টে প্রপস পাস করা হয়েছে যাতে এটি স্ক্রল করলে উপরে না যায় */}
      <Sidebar isAdmin={isAdmin} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <header className="h-20 bg-white border-b border-slate-200 px-6 lg:px-10 flex items-center justify-between sticky top-0 z-30 shrink-0">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-1.5 rounded-lg hover:bg-slate-100">
            <Menu className="w-6 h-6" />
          </button>
          <div className="hidden sm:block text-xs font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-3 py-1.5 rounded-lg">
            {isAdmin ? "Admin Security Clearance" : "Client Workspace Node"}
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-bold text-slate-900">{user?.name || "Authorized User"}</p>
              <p className="text-xs font-semibold text-slate-500 capitalize">{user?.role || "Standard"}</p>
            </div>
            <div className={`w-10 h-10 rounded-xl ${isAdmin ? "bg-rose-600 text-white" : "bg-[#0F382B] text-emerald-300"} font-black flex items-center justify-center shadow-xs`}>
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
}