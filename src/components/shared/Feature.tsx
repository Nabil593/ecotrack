'use client';

import { Factory, Zap, Globe2 } from 'lucide-react';
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

export default function FeatureOverview() {
    return (
        <section className="py-24 bg-white border-b border-gray-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center max-w-2xl mx-auto mb-16 space-y-3"
                >
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full inline-block">
                        Comprehensive Scope Tracking
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                        Granular Carbon Accounting
                    </h2>
                    <p className="text-gray-600">
                        Automate data collection across your entire value chain with absolute precision.
                    </p>
                </motion.div>

                {/* Feature Cards Grid with Staggered Motion Container */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    
                    {/* Card 1: Factory / Scope 1 */}
                    <motion.div 
                        variants={itemVariants}
                        whileHover={{ y: -6, transition: { duration: 0.2 } }}
                        className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:border-emerald-500/50 transition-colors space-y-4 shadow-sm"
                    >
                        <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                            <Factory className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Scope 1: Direct Emissions</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">Track facility fuels, company-owned vehicles, and direct industrial manufacturing releases instantly.</p>
                    </motion.div>

                    {/* Card 2: Zap / Scope 2 */}
                    <motion.div 
                        variants={itemVariants}
                        whileHover={{ y: -6, transition: { duration: 0.2 } }}
                        className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:border-emerald-500/50 transition-colors space-y-4 shadow-sm"
                    >
                        <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                            <Zap className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Scope 2: Energy Indirect</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">Monitor purchased electricity, steam, heating, and cooling utility grids seamlessly in real-time.</p>
                    </motion.div>

                    {/* Card 3: Globe2 / Scope 3 */}
                    <motion.div 
                        variants={itemVariants}
                        whileHover={{ y: -6, transition: { duration: 0.2 } }}
                        className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:border-emerald-500/50 transition-colors space-y-4 shadow-sm"
                    >
                        <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                            <Globe2 className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Scope 3: Supply Chain</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">Calculate upstream and downstream activities, business travel, procurement, and logistics impacts.</p>
                    </motion.div>

                </motion.div>
            </div>
        </section>
    );
}