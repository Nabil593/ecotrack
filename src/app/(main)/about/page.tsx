'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Leaf, ShieldCheck, Sparkles, CheckCircle2, ArrowRight, Cpu, Lock, Globe2, RefreshCw } from 'lucide-react';

export default function AboutPage() {
  const pillars = [
    {
      icon: Cpu,
      title: 'Agentic AI Intelligence',
      description: 'Leveraging Gemini SDK to parse complex utility PDFs and formulate real-time, multi-step carbon reduction roadmaps automatically.'
    },
    {
      icon: Lock,
      title: 'Enterprise-Grade Security & RBAC',
      description: 'Strict Role-Based Access Control, HTTP-Only JWT cookies, and soft-block mechanics ensuring data integrity across global teams.'
    },
    {
      icon: Globe2,
      title: 'Decentralized Green Funding',
      description: 'Direct Stripe-powered transactions enabling verified enterprises to fund certified reforestation and renewable energy projects safely.'
    },
    {
      icon: RefreshCw,
      title: 'Real-Time ESG Analytics',
      description: 'Dynamic Recharts integration providing live MRR/ARR metrics, emission scopes tracking, and instant compliance forecasting.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] overflow-hidden">
      
      {/* Hero Section */}
      <section className="bg-[#0F382B] text-white py-24 px-6 relative">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#34D399_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#10B981]/20 text-[#34D399] text-xs font-semibold mb-6 border border-[#10B981]/30"
          >
            <Leaf className="w-4 h-4" /> About EcoTrack AI Platform
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6"
          >
            Engineering the Future of <span className="text-[#34D399]">Corporate Net-Zero</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
          >
            We combine high-performance full-stack architecture with advanced AI agents to automate carbon accounting, ESG compliance, and green fund management.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#10B981] mb-2">Our Core Philosophy</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">
              Transforming Fragmented Carbon Data into Actionable Strategy
            </h3>
            <p className="text-slate-600 leading-relaxed mb-6 text-base">
              Traditional sustainability reporting is overwhelmed by manual bottlenecks and opaque calculations. EcoTrack AI solves this by integrating multi-scope emission metrics directly with automated AI advisors, ensuring enterprises meet regulatory compliance effortlessly.
            </p>
            <div className="space-y-3">
              {[
                'Automated Scope 1, 2, and 3 emission data ingestion',
                'Seamless Stripe SaaS subscription and billing integration',
                'Comprehensive admin control panel with real-time audit logs',
                'Optimized Next.js App Router for blazing-fast performance'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0" />
                  <span className="text-sm font-medium text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 flex items-start gap-4 transition-transform hover:-translate-y-1">
              <div className="p-3 bg-[#0F382B] text-[#34D399] rounded-xl flex-shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#0F172A]">Multimodal AI Parsing</h4>
                <p className="text-sm text-slate-600 mt-1">
                  Upload utility invoices or images; Gemini SDK instantly extracts and categorizes exact carbon footprints.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 flex items-start gap-4 transition-transform hover:-translate-y-1">
              <div className="p-3 bg-[#10B981] text-white rounded-xl flex-shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#0F172A]">Verified Green Offsets</h4>
                <p className="text-sm text-slate-600 mt-1">
                  Direct contribution channels to verified global environmental initiatives backed by secure transaction hashes.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Technology Pillars Grid (Replaces redundant stats counter) */}
      <section className="bg-white py-24 border-y border-slate-200 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#10B981] mb-2">Platform Architecture</h2>
            <h3 className="text-3xl font-bold text-[#0F172A]">Built on Scalable Enterprise Standards</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-[#F8FAFC] p-8 rounded-2xl border border-slate-200/80 hover:border-[#10B981]/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#0F382B] text-[#34D399] flex items-center justify-center mb-6 shadow-md shadow-[#0F382B]/20">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-[#0F172A] mb-3">{pillar.title}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{pillar.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">Ready to Accelerate Your Net-Zero Journey?</h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            Experience automated carbon accounting and real-time AI optimization tailored for modern enterprise workflows.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/register" 
              className="px-6 py-3 rounded-xl bg-[#10B981] hover:bg-[#0E9F6E] text-white font-semibold shadow-lg shadow-[#10B981]/30 transition-all flex items-center gap-2"
            >
              Get Started Free <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/explore" 
              className="px-6 py-3 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold transition-all"
            >
              Explore Initiatives
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
}