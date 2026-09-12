'use client';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 35 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { 
            duration: 0.7, 
            ease: [0.22, 1, 0.36, 1] as const
        } 
    },
};

export default function PricingTiers() {
    return (
        <section className="py-24 bg-gray-50 border-b border-gray-100 overflow-hidden font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Header Animation */}
                <motion.div 
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center max-w-2xl mx-auto mb-16 space-y-3"
                >
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#10B981] bg-[#dcffe7] px-3 py-1 rounded-full inline-block">
                        Transparent Pricing
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                        SaaS Subscription Plans
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base">
                        Choose the right scaling tier for your corporate carbon accounting and AI optimization needs.
                    </p>
                </motion.div>

                {/* Pricing Grid with Staggered Motion */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
                >
                    
                    {/* Free Plan */}
                    <motion.div 
                        variants={itemVariants}
                        whileHover={{ y: -6, transition: { duration: 0.2 } }}
                        className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between transition-colors hover:border-gray-300"
                    >
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-gray-900">Free Plan</h3>
                            <div className="text-3xl font-extrabold text-gray-900">
                                $0 <span className="text-sm font-normal text-gray-500">/mo</span>
                            </div>
                            <p className="text-sm text-gray-600">Essential manual tracking and basic community access for starters.</p>
                            <ul className="space-y-2.5 text-sm text-gray-600 pt-4">
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#10B981] flex-shrink-0" /> Manual Carbon Metric Logging</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#10B981] flex-shrink-0" /> 3 AI Utility Bill Parses / mo</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#10B981] flex-shrink-0" /> Basic Sustainability Summary</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#10B981] flex-shrink-0" /> Public Explore & Community Access</li>
                            </ul>
                        </div>
                        <Link href="/register" className="mt-8 w-full py-3 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-medium text-center text-sm transition-all block">
                            Get Started Free
                        </Link>
                    </motion.div>

                    {/* Basic Green Plan (Featured) */}
                    <motion.div 
                        variants={itemVariants}
                        whileHover={{ y: -6, transition: { duration: 0.2 } }}
                        className="bg-white p-8 rounded-2xl border-2 border-[#10B981] shadow-xl flex flex-col justify-between relative md:-translate-y-2"
                    >
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#10B981] text-white text-xs font-semibold px-3 py-1 rounded-full">
                            Most Popular
                        </span>
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-gray-900">Basic Green</h3>
                            <div className="text-3xl font-extrabold text-gray-900">
                                $499 <span className="text-sm font-normal text-gray-500">/mo</span>
                            </div>
                            <p className="text-sm text-gray-600">Extended AI analytics and standard green project matching for growing teams.</p>
                            <ul className="space-y-2.5 text-sm text-gray-600 pt-4">
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#10B981] flex-shrink-0" /> Everything in Free Plan</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#10B981] flex-shrink-0" /> Extended AI Utility Bill Parsing</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#10B981] flex-shrink-0" /> Standard Recharts Forecasting</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#10B981] flex-shrink-0" /> Standard Green Project Matching</li>
                            </ul>
                        </div>
                        <Link href="/register" className="mt-8 w-full py-3 rounded-xl bg-[#10B981] hover:bg-[#10B981]/90 text-white font-medium text-center text-sm transition-all shadow-lg shadow-[#10B981]/20 block">
                            Upgrade to Basic
                        </Link>
                    </motion.div>

                    {/* Enterprise Plan */}
                    <motion.div 
                        variants={itemVariants}
                        whileHover={{ y: -6, transition: { duration: 0.2 } }}
                        className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between transition-colors hover:border-gray-300"
                    >
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-gray-900">Enterprise</h3>
                            <div className="text-3xl font-extrabold text-gray-900">
                                $1,299 <span className="text-sm font-normal text-gray-500">/mo</span>
                            </div>
                            <p className="text-sm text-gray-600">Unlimited AI capabilities and custom ESG reporting for large organizations.</p>
                            <ul className="space-y-2.5 text-sm text-gray-600 pt-4">
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#10B981] flex-shrink-0" /> Unlimited AI Bill Parsing</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#10B981] flex-shrink-0" /> Advanced Recharts Analytics</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#10B981] flex-shrink-0" /> Priority Green Project Matching</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#10B981] flex-shrink-0" /> Customized Corporate ESG Reports</li>
                            </ul>
                        </div>
                        <Link href="/register" className="mt-8 w-full py-3 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-medium text-center text-sm transition-all block">
                            Get Enterprise
                        </Link>
                    </motion.div>

                </motion.div>
            </div>
        </section>
    );
}