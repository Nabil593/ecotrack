'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, Variants } from 'framer-motion';

interface StatItem {
    value: number;
    suffix: string;
    decimals?: number;
    label: string;
    isPercentage?: boolean;
}

const statsData: StatItem[] = [
    { value: 2.4, suffix: 'M+', decimals: 1, label: 'tCO2e Tracked' },
    { value: 99.9, suffix: '%', decimals: 1, label: 'AI Accuracy Rate' },
    { value: 450, suffix: '+', decimals: 0, label: 'Enterprise Clients' },
    { value: 35, suffix: '%', decimals: 0, label: 'Avg. Cost Reduction' }
];

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
    hidden: { opacity: 0, y: 35, scale: 0.96 },
    visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { 
            duration: 0.7, 
            ease: [0.22, 1, 0.36, 1] as const
        } 
    },
};

export default function LivePlatformStats() {
    const [counts, setCounts] = useState<number[]>(statsData.map(() => 0));
    const [hasAnimated, setHasAnimated] = useState<boolean>(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    
                    const duration = 2000; // 2 seconds animation duration
                    const steps = 60;
                    const intervalTime = duration / steps;
                    let currentStep = 0;

                    const timer = setInterval(() => {
                        currentStep++;
                        const progress = currentStep / steps;
                        // Ease out exponential effect for smooth slowdown near completion
                        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

                        setCounts(
                            statsData.map(stat => stat.value * easeProgress)
                        );

                        if (currentStep >= steps) {
                            clearInterval(timer);
                            setCounts(statsData.map(stat => stat.value));
                        }
                    }, intervalTime);

                    return () => clearInterval(timer);
                }
            },
            { threshold: 0.2 } // Trigger when 20% of the section is visible
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, [hasAnimated]);

    return (
        <section ref={sectionRef} className="py-20 bg-emerald-900 text-white border-b border-emerald-800 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center"
                >
                    {statsData.map((stat, index) => (
                        <motion.div 
                            key={index} 
                            variants={itemVariants}
                            whileHover={{ y: -6, transition: { duration: 0.2 } }}
                            className="p-8 bg-emerald-950/40 rounded-2xl border border-emerald-800/60 backdrop-blur-sm transition-colors hover:border-emerald-600/60 shadow-sm"
                        >
                            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
                                {counts[index].toFixed(stat.decimals)}
                                <span className="text-emerald-400">{stat.suffix}</span>
                            </div>
                            <div className="text-sm font-medium text-emerald-200/80 mt-2">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}