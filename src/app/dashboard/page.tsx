"use client";

import React from "react";
import { useSession } from "@/lib/auth-client";
import UserOverview from "@/components/dashboard/UserDashboard/UserOverview";

interface UserSession {
  user?: {
    id: string;
    email: string;
    name: string;
    role: "user" | string;
    [key: string]: unknown; // For Extra property 
  };
}

export default function DashboardPage() {
  const { data: session, isPending } = useSession() as {
    data: UserSession | null;
    isPending: boolean;
  };

  if (isPending) {
    return <div className="p-10 text-center font-medium text-slate-500">Loading...</div>;
  }

  const isUser = session?.user?.role === "user";

  return (
    <div className="space-y-6">
      {isUser && <UserOverview />}
    </div>
  );
}