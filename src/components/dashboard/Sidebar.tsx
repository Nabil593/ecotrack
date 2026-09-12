"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Sparkles,
  PlusCircle,
  FolderKanban,
  Trees,
  CreditCard,
  LogOut,
  X,
  Users,
  Settings,
  ShieldAlert,
  ChevronRight,
  Command,
  ArrowUpRight,
  LucideIcon
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

interface SidebarProps {
  isAdmin?: boolean;
  sidebarOpen?: boolean;
  setSidebarOpen?: (open: boolean) => void;
}

export default function Sidebar({ isAdmin = false, sidebarOpen = false, setSidebarOpen }: SidebarProps) {
  const pathname = usePathname();

  const userNavItems: NavItem[] = [
    { name: "Dashboard Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "AI Sustainability Advisor", href: "/dashboard/ai-advisor", icon: Sparkles },
    { name: "Add Emission Metric", href: "/dashboard/item/add", icon: PlusCircle },
    { name: "Manage Records", href: "/dashboard/item/manage", icon: FolderKanban },
    { name: "Green Funding & Offset", href: "/dashboard/funding", icon: Trees },
  ];

  const adminNavItems: NavItem[] = [
    { name: "Global Statistics", href: "/dashboard", icon: LayoutDashboard },
    { name: "User & Role Management", href: "/dashboard/users", icon: Users },
    { name: "Transactions Log", href: "/dashboard/transactions", icon: CreditCard },
    { name: "Platform Settings", href: "/dashboard/settings", icon: Settings },
  ];

  const currentNavItems: NavItem[] = isAdmin ? adminNavItems : userNavItems;

  return (
    <aside
      className={`fixed lg:static inset-y-0 left-0 z-50 w-72 flex flex-col transition-transform duration-300 shadow-xl overflow-hidden ${
        isAdmin ? "bg-[#12141C] border-r border-slate-800" : "bg-[#0F382B] border-r border-emerald-900/20"
      } ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
    >
      {/* Header */}
      <div className={`h-20 px-6 border-b ${isAdmin ? "border-slate-800" : "border-emerald-800/40"} flex items-center justify-between shrink-0`}>
        <Link href="/dashboard" className="flex items-center space-x-3 group">
          <div className={`w-9 h-9 rounded-xl ${isAdmin ? "bg-rose-500/20 text-rose-400" : "bg-emerald-500/20 text-emerald-300"} flex items-center justify-center font-bold text-sm`}>
            {isAdmin ? <ShieldAlert className="w-5 h-5" /> : <Command className="w-5 h-5" />}
          </div>
          <div>
            <span className="text-base font-extrabold text-white block">
              EcoTrack <span className={isAdmin ? "text-rose-400" : "text-emerald-400"}>{isAdmin ? "Admin" : "AI"}</span>
            </span>
          </div>
        </Link>
        {setSidebarOpen && (
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-300">
            <X className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto overscroll-contain">
        {currentNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setSidebarOpen && setSidebarOpen(false)}
              className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all ${
                isActive
                  ? isAdmin 
                    ? "bg-rose-600 text-white shadow-lg shadow-rose-900/20" 
                    : "bg-emerald-600 text-white shadow-lg shadow-emerald-950/20"
                  : isAdmin 
                    ? "text-slate-300 hover:bg-slate-900 hover:text-white" 
                    : "text-emerald-100 hover:bg-emerald-900/50 hover:text-white"
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </div>
              <ChevronRight className={`w-4 h-4 opacity-50 ${isActive ? "opacity-100" : ""}`} />
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className={`p-4 border-t shrink-0 ${isAdmin ? "border-slate-800" : "border-emerald-800/40"}`}>
        <Link href="/" className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-slate-400 hover:bg-white/5 transition-colors">
          <span className="flex items-center space-x-2">
            <LogOut className="w-4 h-4 text-rose-400" />
            <span>Main Website</span>
          </span>
          <ArrowUpRight className="w-4 h-4 opacity-60" />
        </Link>
      </div>
    </aside>
  );
}