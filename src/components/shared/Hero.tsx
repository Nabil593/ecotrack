import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, ShieldCheck, BarChart3, Globe } from 'lucide-react';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-[#0A2920] text-white font-sans selection:bg-[#10B981] selection:text-white">
            
            {/* Hero Section (60-70vh) */}
            <section className="relative overflow-hidden pt-20 pb-28 lg:pt-28 lg:pb-36 border-b border-[#10B981]/20">
                {/* Background Glow Effect */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#10B981]/15 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto space-y-6">
                        
                        {/* Top Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0F382B] border border-[#10B981]/30 text-[#34D399] text-xs font-medium shadow-inner">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Powered by Advanced AI Analytics</span>
                        </div>

                        {/* Energetic Headline */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
                            Measure, Reduce & Offset <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#34D399] to-[#10B981]">Corporate Carbon</span> Emissions with AI
                        </h1>

                        {/* Subtext */}
                        <p className="text-base sm:text-lg text-[#F8FAFC]/70 max-w-2xl mx-auto leading-relaxed">
                            Automate Scope 1, 2, and 3 carbon accounting, gain real-time predictive insights, and scale your corporate sustainability initiatives seamlessly.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <Link 
                                href="/explore" 
                                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#10B981] hover:bg-[#10B981]/90 text-white font-semibold text-sm transition-all shadow-xl shadow-[#10B981]/25 flex items-center justify-center gap-2 group"
                            >
                                Explore Green Initiatives 
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link 
                                href="/ai-advisor" 
                                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#0F382B] hover:bg-[#0F382B]/80 border border-[#10B981]/30 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2"
                            >
                                Try AI Advisor
                            </Link>
                        </div>

                    </div>

                    {/* Animated Preview Element / Dashboard Mockup */}
                    <div className="mt-16 relative max-w-5xl mx-auto rounded-2xl border border-[#10B981]/30 bg-[#0F382B]/60 backdrop-blur-xl p-4 shadow-2xl">
                        <div className="flex items-center justify-between pb-4 border-b border-[#10B981]/20 px-2">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                                <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                            </div>
                            <span className="text-xs text-[#34D399] font-mono">ecotrack-ai-live-telemetry.sys</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                            <div className="bg-[#0A2920] border border-[#10B981]/20 rounded-xl p-5 space-y-2">
                                <div className="flex items-center justify-between text-[#F8FAFC]/60 text-xs">
                                    <span>Scope 1 & 2 Emissions</span>
                                    <BarChart3 className="w-4 h-4 text-[#34D399]" />
                                </div>
                                <div className="text-2xl font-bold font-mono text-white">1,428 <span className="text-xs font-normal text-[#34D399]">tCO2e</span></div>
                                <div className="text-xs text-[#34D399] flex items-center gap-1">↓ 12.4% vs last month</div>
                            </div>
                            <div className="bg-[#0A2920] border border-[#10B981]/20 rounded-xl p-5 space-y-2">
                                <div className="flex items-center justify-between text-[#F8FAFC]/60 text-xs">
                                    <span>AI Reduction Efficiency</span>
                                    <Globe className="w-4 h-4 text-[#34D399]" />
                                </div>
                                <div className="text-2xl font-bold font-mono text-white">94.8%</div>
                                <div className="text-xs text-[#34D399] flex items-center gap-1">↑ Optimized automatically</div>
                            </div>
                            <div className="bg-[#0A2920] border border-[#10B981]/20 rounded-xl p-5 space-y-2">
                                <div className="flex items-center justify-between text-[#F8FAFC]/60 text-xs">
                                    <span>Offset Compliance</span>
                                    <ShieldCheck className="w-4 h-4 text-[#34D399]" />
                                </div>
                                <div className="text-2xl font-bold font-mono text-white">ISO 14064</div>
                                <div className="text-xs text-[#34D399] flex items-center gap-1">Fully Verified</div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

        </div>
    );
}