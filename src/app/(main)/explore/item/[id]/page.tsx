"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import {
  ShieldCheck,
  Sparkles,
  ArrowLeft,
  BarChart3,
  CreditCard,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Target,
  TrendingUp,
  Award,
  Leaf,
  Trees,
} from "lucide-react";
import Link from "next/link";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import Image from "next/image";
import { useSession } from "@/lib/auth-client";

interface Item {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: "Energy" | "Waste" | "Transport" | "Supply Chain";
  impactScore: number;
  cost: number;
  totalFunded?: number;
  location: string;
  imageUrl: string;
  userId: string;
  aiAnalysisReport: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

interface ChartPoint {
  month: string;
  reduction: number;
}

export default function ItemDetailsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = params?.id as string;

  const { data: session } = useSession();
  const user = session?.user;

  const [item, setItem] = useState<Item | null>(null);
  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const [relatedItems, setRelatedItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [paying, setPaying] = useState<boolean>(false);
  const [paymentStatusMsg, setPaymentStatusMsg] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [customAmount, setCustomAmount] = useState<number>(100);

  const success = searchParams.get("success");
  const canceled = searchParams.get("canceled");
  const hasRecorded = useRef(false);

  const fetchItemDetails = async (): Promise<void> => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/items/${id}`);
      const data = await res.json();
      if (data.success) {
        setItem(data.data);
        setChartData(data.chartData);
        setRelatedItems(data.relatedItems);
        if (data.data?.cost && !customAmount) {
          setCustomAmount(Math.min(100, data.data.cost));
        }
      }
    } catch (err: unknown) {
      console.error("Failed to fetch item details", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchItemDetails();
    }
  }, [id]);

  useEffect(() => {
    if (success && item && !hasRecorded.current) {
      hasRecorded.current = true;
      const recordPayment = async () => {
        try {
          const paidAmount = Number(searchParams.get("amount")) || 100;
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/payment/save-payment`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                itemId: item._id,
                title: item.title,
                amount: paidAmount,
                sessionId:
                  searchParams.get("session_id") || `sess_${Date.now()}`,
                userEmail: user?.email || "user@example.com",
                paymentType: "Funding",
              }),
            },
          );
          const data = await res.json();
          if (data.success) {
            setPaymentStatusMsg({
              type: "success",
              text: `Thank you! Your funding payment of $${paidAmount} was successful and added to this project.`,
            });

            // পেমেন্ট সফলভাবে সেভ হওয়ার পর ডাটাবেজ থেকে লেটেস্ট ডাটা রি-ফেচ করা হচ্ছে যাতে প্রোগ্রেস বার পারফেক্টলি সিঙ্ক থাকে
            await fetchItemDetails();

            // ইউআরএল থেকে স্ট্রাইপের কুয়েরি প্যারামিটারগুলো ক্লিন করে দেওয়া হচ্ছে
            router.replace(`/explore/item/${id}`, { scroll: false });
          }
        } catch (err) {
          console.error("Failed to save payment record:", err);
          setPaymentStatusMsg({
            type: "error",
            text: "Payment was successful, but failed to record in our system. Please contact support.",
          });
        }
      };
      recordPayment();
    } else if (canceled) {
      setPaymentStatusMsg({
        type: "error",
        text: "Payment was canceled. You can try again whenever you are ready.",
      });
      router.replace(`/explore/item/${id}`, { scroll: false });
    }
  }, [success, canceled, item, searchParams, id, router]);

  const handleStripePayment = async () => {
    if (!item) return;
    if (!customAmount || customAmount <= 0) {
      alert("Please enter a valid funding amount.");
      return;
    }

    setPaying(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payment/create-checkout-session`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            itemId: item._id,
            title: item.title,
            cost: customAmount,
            paymentType: "project-fund", // Explicitly added to indicate fund type
          }),
        },
      );
      const data = await res.json();
      if (data.success && data.url) {
        window.location.href = data.url;
      } else {
        alert(data.message || "Failed to initiate payment session");
        setPaying(false);
      }
    } catch (err) {
      console.error("Payment error:", err);
      alert("Network error. Please try again later.");
      setPaying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center text-[#0F382B] font-medium">
        Loading initiative details...
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center text-slate-500">
        Initiative not found.
      </div>
    );
  }

  const goalCost = item.cost || 1000;
  const currentFunded = item.totalFunded || 0;
  const progressPercent =
    goalCost > 0
      ? Math.min(Math.round((currentFunded / goalCost) * 100), 100)
      : 0;

  const estimatedCO2Reduction = Math.round((customAmount || 0) * 2.5);
  const estimatedTreesPlanted = Math.max(
    1,
    Math.floor((customAmount || 0) * 0.1),
  );

  const getTierInfo = (amt: number) => {
    if (amt >= 500)
      return {
        name: "Gold Partner",
        color: "text-amber-600 bg-amber-50 border-amber-200",
        desc: "Real-time carbon offset certificate & VIP status",
      };
    if (amt >= 100)
      return {
        name: "Bronze Green Contributor",
        color: "text-emerald-700 bg-emerald-50 border-emerald-200",
        desc: "Exclusive impact report & Supporter badge",
      };
    return {
      name: "Supporter Badge",
      color: "text-slate-700 bg-slate-100 border-slate-200",
      desc: "Name listed on project wall",
    };
  };
  const currentTier = getTierInfo(customAmount);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {paymentStatusMsg && (
          <div
            className={`p-4 rounded-xl border flex items-center space-x-3 ${
              paymentStatusMsg.type === "success"
                ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                : "bg-rose-50 border-rose-300 text-rose-800"
            }`}
          >
            {paymentStatusMsg.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            )}
            <span className="text-sm font-medium">{paymentStatusMsg.text}</span>
          </div>
        )}

        <Link
          href="/explore"
          className="inline-flex items-center space-x-2 text-xs font-semibold text-[#0F382B] hover:text-[#10B981] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Explore</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="h-72 bg-slate-100 relative">
                <Image
                  src={
                    item.imageUrl ||
                    "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9"
                  }
                  alt={item.title}
                  width={600}
                  height={300}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 bg-[#0F382B] text-[#34D399] text-xs font-bold px-3 py-1.5 rounded-full">
                  {item.category}
                </span>
              </div>
              <div className="p-8 space-y-6">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F382B]">
                  {item.title}
                </h1>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {item.fullDescription || item.shortDescription}
                </p>

                {/* Funding Progress */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-bold text-[#0F382B] flex items-center space-x-1.5">
                      <Target className="w-4 h-4 text-[#10B981]" />
                      <span>Funding Progress</span>
                    </span>
                    <span className="font-extrabold text-[#10B981]">
                      {progressPercent}% Funded
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-[#10B981] h-3 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 font-medium">
                    <span>Raised: ${currentFunded.toLocaleString()}</span>
                    <span>Goal: ${goalCost.toLocaleString()}</span>
                  </div>
                </div>

                {/* Milestone-Based Tracker Section */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
                  <h4 className="text-xs font-bold text-[#0F382B] uppercase tracking-wider flex items-center space-x-1.5">
                    <TrendingUp className="w-4 h-4 text-[#10B981]" />
                    <span>Milestone-Based Execution Roadmap</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 space-y-1">
                      <span className="font-bold text-emerald-800">
                        Phase 1: Planning
                      </span>
                      <p className="text-slate-600">
                        Resource allocation & site surveying.
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                      <span className="font-bold text-[#0F382B]">
                        Phase 2: Implementation
                      </span>
                      <p className="text-slate-600">
                        Deployment of green tech hardware.
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                      <span className="font-bold text-[#0F382B]">
                        Phase 3: Monitoring
                      </span>
                      <p className="text-slate-600">
                        Live carbon reduction tracking.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 space-y-2">
                  <h4 className="text-xs font-bold text-[#0F382B] uppercase tracking-wider flex items-center space-x-1">
                    <Sparkles className="w-4 h-4 text-[#10B981]" />
                    <span>AI Verified Impact Assessment</span>
                  </h4>
                  <p className="text-xs text-slate-700">
                    {item.aiAnalysisReport ||
                      "Yields an immediate reduction in carbon footprint and optimizes resource allocation within the first quarter of deployment based on predictive modeling."}
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-[#10B981]" />
                    <h3 className="text-base font-bold text-[#0F382B]">
                      Real-Time Carbon Reduction Impact Trend (Tons CO2e)
                    </h3>
                  </div>
                  <div className="h-64 w-full bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData}>
                        <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                        <YAxis stroke="#64748b" fontSize={12} />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="reduction"
                          stroke="#10B981"
                          fill="#34D399"
                          fillOpacity={0.3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Funding & Live Calculator */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-base font-bold text-[#0F382B] flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-[#10B981]" />
                <span>Project Summary</span>
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Impact Score</span>
                  <span className="font-bold text-[#0F382B]">
                    {item.impactScore} / 100
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Capital Cost / Goal</span>
                  <span className="font-bold text-[#0F382B]">
                    ${item.cost?.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Location</span>
                  <span className="font-bold text-[#0F382B]">
                    {item.location || "Global Enterprise"}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-bold text-[#0F382B] uppercase tracking-wider">
                  Select or Enter Funding Amount ($)
                </label>

                <div className="grid grid-cols-3 gap-2">
                  {[50, 100, 500].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setCustomAmount(preset)}
                      className={`py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                        customAmount === preset
                          ? "bg-[#0F382B] text-[#34D399] border-[#0F382B]"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      ${preset}
                    </button>
                  ))}
                </div>

                {/* ইনপুট এবং প্লাস-মাইনাস বাটন অংশ */}
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() =>
                      setCustomAmount((prev) => Math.max(1, prev - 10))
                    }
                    className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl text-sm font-bold text-[#0F382B] transition-colors"
                    title="Decrease amount"
                  >
                    -
                  </button>

                  <input
                    type="number"
                    min="1"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(Number(e.target.value))}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-[#0F382B] text-center focus:outline-none focus:border-[#10B981]"
                    placeholder="Enter custom amount"
                  />

                  <button
                    type="button"
                    onClick={() => setCustomAmount((prev) => (prev || 0) + 10)}
                    className="px-3.5 py-2.5 bg-[#0F382B] hover:bg-[#10B981] text-white border border-[#0F382B] rounded-xl text-sm font-bold transition-colors"
                    title="Increase amount"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Live Impact Calculator Widget */}
              <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-4 space-y-3">
                <span className="text-[11px] font-bold text-[#0F382B] uppercase tracking-wider flex items-center space-x-1">
                  <Leaf className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Live Impact Calculator Preview</span>
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white p-2.5 rounded-lg border border-emerald-100 space-y-0.5">
                    <span className="text-slate-500 block text-[10px]">
                      CO2 Reduction
                    </span>
                    <span className="font-extrabold text-[#0F382B]">
                      {estimatedCO2Reduction} kg CO2e
                    </span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-emerald-100 space-y-0.5">
                    <span className="text-slate-500 block text-[10px]">
                      Trees Equivalent
                    </span>
                    <span className="font-extrabold text-[#0F382B] flex items-center space-x-1">
                      <Trees className="w-3 h-3 text-[#10B981]" />
                      <span>{estimatedTreesPlanted} Trees</span>
                    </span>
                  </div>
                </div>
                {/* Tiered Reward Preview */}
                <div
                  className={`p-2.5 rounded-lg border text-xs space-y-0.5 ${currentTier.color}`}
                >
                  <div className="font-bold flex items-center space-x-1">
                    <Award className="w-3.5 h-3.5" />
                    <span>{currentTier.name}</span>
                  </div>
                  <p className="text-[11px] opacity-80">{currentTier.desc}</p>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleStripePayment}
                  disabled={paying || !customAmount || customAmount <= 0}
                  className="w-full flex items-center justify-center space-x-2 bg-[#0F382B] hover:bg-[#10B981] text-white font-semibold py-3 px-4 rounded-xl transition-colors shadow-lg shadow-[#0F382B]/10 disabled:opacity-50 cursor-pointer"
                >
                  <CreditCard className="w-4 h-4 text-[#34D399]" />
                  <span>
                    {paying
                      ? "Redirecting..."
                      : `Fund $${customAmount || 0} Now`}
                  </span>
                </button>
                <p className="text-[11px] text-center text-slate-500">
                  You can contribute multiple times. Each transaction is
                  uniquely tracked.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Items */}
        {relatedItems.length > 0 && (
          <div className="space-y-4 pt-6 border-t border-slate-200">
            <h3 className="text-xl font-bold text-[#0F382B]">
              Related Initiatives in {item.category}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedItems.map((relItem) => (
                <div
                  key={relItem._id}
                  className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="relative h-36 bg-slate-100">
                      <Image
                        src={
                          relItem.imageUrl ||
                          "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9"
                        }
                        alt={relItem.title}
                        width={300}
                        height={144}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 left-2 bg-[#0F382B] text-[#34D399] text-[10px] font-semibold px-2 py-0.5 rounded-full">
                        {relItem.category}
                      </span>
                    </div>
                    <div className="p-4 space-y-1.5">
                      <h4 className="font-bold text-[#0F382B] text-sm line-clamp-1">
                        {relItem.title}
                      </h4>
                      <p className="text-slate-600 text-xs line-clamp-2">
                        {relItem.shortDescription}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 pt-0 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-2">
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-[#10B981]" />
                        <span>{relItem.location || "Global"}</span>
                      </span>
                      <span className="font-bold text-[#0F382B]">
                        ${relItem.cost?.toLocaleString()}
                      </span>
                    </div>
                    <Link
                      href={`/explore/item/${relItem._id}`}
                      className="block w-full text-center bg-[#0F382B] hover:bg-[#10B981] text-white text-xs font-semibold py-2 rounded-lg transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
