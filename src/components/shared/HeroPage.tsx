'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Zap, Activity, Cpu, Globe } from 'lucide-react';

export default function HeroPage() {
    return (
        <div className="min-h-screen bg-[#0A2920] text-white font-sans selection:bg-[#10B981] selection:text-white relative overflow-hidden flex flex-col justify-between">
            
            {/* Ambient Background Glows & Dot Grid */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#10B981]/15 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(#10b98115_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-28 pb-20 w-full">
                <div className="text-center max-w-4xl mx-auto space-y-8">
                    
                    {/* Top Announcement Badge */}
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0F382B] border border-[#10B981]/30 text-[#34D399] text-xs font-medium shadow-xl backdrop-blur-md"
                    >
                        <Sparkles className="w-3.5 h-3.5 text-[#34D399]" />
                        <span>EcoTrack v3.0 is live — Explore automated Scope 1, 2 & 3 accounting</span>
                        <ArrowRight className="w-3 h-3 text-[#34D399]" />
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]"
                    >
                        The Operating System for <br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-[#34D399] via-[#10B981] to-[#059669]">
                            Sustainable Enterprise
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-base sm:text-lg text-[#94A3B8] max-w-2xl mx-auto leading-relaxed"
                    >
                        Harness autonomous AI analytics to measure carbon intensity, optimize real-time resource pipelines, and achieve verifiable compliance effortlessly.
                    </motion.p>

                    {/* CTA Group */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
                    >
                        <Link 
                            href="/explore" 
                            className="w-full sm:w-auto px-4 py-3 rounded-md bg-[#10B981] hover:bg-[#059669] text-white font-medium text-sm transition-all shadow-lg shadow-[#10B981]/25 flex items-center justify-center gap-2 group cursor-pointer"
                        >
                            Start Free Trial
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link 
                            href="/ai-advisor" 
                            className="w-full sm:w-auto px-4 py-3 rounded-md bg-[#0F382B] hover:bg-[#0F382B]/80 border border-[#10B981]/30 text-white font-medium text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                            Schedule Demo
                        </Link>
                    </motion.div>

                    {/* Feature Trust Pills */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs text-[#94A3B8]"
                    >
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#34D399]" />
                            <span>No credit card required</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-[#34D399]" />
                            <span>ISO-14064 Verified</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-[#34D399]" />
                            <span>5-minute setup</span>
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* Seamless Integrated Dashboard Stream Preview */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                className="max-w-5xl mx-auto px-4 w-full relative z-10 pb-16"
            >
                <div className="rounded-2xl border border-[#10B981]/30 bg-[#0F382B]/70 backdrop-blur-xl p-4 shadow-2xl">
                    <div className="flex items-center justify-between pb-3 border-b border-[#10B981]/20 px-2">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                            <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                        </div>
                        <span className="text-xs text-[#34D399] font-mono">ecotrack-ai-live-telemetry.sys</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
                        <div className="bg-[#0A2920] border border-[#10B981]/20 rounded-xl p-4 space-y-2">
                            <div className="flex items-center justify-between text-[#F8FAFC]/60 text-xs">
                                <span>Scope 1 & 2 Emissions</span>
                                <Activity className="w-4 h-4 text-[#34D399]" />
                            </div>
                            <div className="text-2xl font-bold font-mono text-white">1,428 <span className="text-xs font-normal text-[#34D399]">tCO2e</span></div>
                            <div className="text-xs text-[#34D399] flex items-center gap-1">↓ 12.4% vs last month</div>
                        </div>
                        <div className="bg-[#0A2920] border border-[#10B981]/20 rounded-xl p-4 space-y-2">
                            <div className="flex items-center justify-between text-[#F8FAFC]/60 text-xs">
                                <span>AI Reduction Efficiency</span>
                                <Cpu className="w-4 h-4 text-[#34D399]" />
                            </div>
                            <div className="text-2xl font-bold font-mono text-white">94.8%</div>
                            <div className="text-xs text-[#34D399] flex items-center gap-1">↑ Optimized automatically</div>
                        </div>
                        <div className="bg-[#0A2920] border border-[#10B981]/20 rounded-xl p-4 space-y-2">
                            <div className="flex items-center justify-between text-[#F8FAFC]/60 text-xs">
                                <span>Offset Compliance</span>
                                <Globe className="w-4 h-4 text-[#34D399]" />
                            </div>
                            <div className="text-2xl font-bold font-mono text-white">ISO 14064</div>
                            <div className="text-xs text-[#34D399] flex items-center gap-1">Fully Verified</div>
                        </div>
                    </div>
                </div>
            </motion.div>

        </div>
    );
}