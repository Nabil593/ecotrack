'use client';
import { CloudRain, Cpu, Truck, Building, Zap, Database } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

const categories = [
    { title: 'Cloud & Data Centers', desc: 'Server load and multi-cloud infrastructure carbon tracking.', icon: Cpu },
    { title: 'Supply Chain Logistics', desc: 'Freight, shipping, and global distribution emission indexing.', icon: Truck },
    { title: 'Corporate Real Estate', desc: 'Smart building utilities, HVAC, and power consumption.', icon: Building },
    { title: 'Business Travel', desc: 'Flight analytics, commuting fleet management metrics.', icon: CloudRain },
    { title: 'Grid Electricity', desc: 'Renewable energy transition & fossil fuel breakdown.', icon: Zap },
    { title: 'Procured Goods', desc: 'Embedded carbon footprints of raw materials and software.', icon: Database },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
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

export default function EmissionCategoriesGrid() {
    return (
        <section className="py-24 bg-white border-b border-gray-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Header Animation */}
                <motion.div 
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center max-w-2xl mx-auto mb-16 space-y-3"
                >
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full inline-block">
                        Sectors
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                        Emission Categories Grid
                    </h2>
                    <p className="text-gray-600">
                        Categorize and analyze emission metrics down to granular sub-sectors.
                    </p>
                </motion.div>

                {/* Grid Container with Staggered Motion */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {categories.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <motion.div 
                                key={idx} 
                                variants={itemVariants}
                                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                                className="p-6 rounded-2xl bg-white border border-gray-200 hover:border-emerald-500 hover:shadow-lg transition-colors space-y-4 group cursor-pointer"
                            >
                                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}