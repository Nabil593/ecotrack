'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Search, ChevronDown, Mail, MessageSquare, BookOpen, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does EcoTrack AI parse utility bills and carbon data?',
      a: 'EcoTrack AI leverages advanced multimodal AI (Google Gemini SDK) to instantly scan uploaded utility PDFs, invoices, or images, extracting exact energy consumption and converting them into Scope 1, 2, and 3 emission metrics.'
    },
    {
      q: 'How secure is my enterprise data and user authentication?',
      a: 'We implement strict Role-Based Access Control (RBAC), HTTP-Only JWT cookies, and enterprise-grade encryption standards to ensure all your corporate sustainability data remains completely private and secure.'
    },
    {
      q: 'How do the Stripe green funding and offsets work?',
      a: 'Our platform integrates directly with Stripe to allow verified enterprises to fund certified global reforestation and renewable energy projects with immutable transaction records and receipts.'
    },
    {
      q: 'Can I invite team members to collaborate on carbon tracking?',
      a: 'Yes! Depending on your subscription plan, you can invite team members, assign specific roles, and monitor collective corporate ESG analytics from a unified dashboard.'
    },
    {
      q: 'How do I upgrade or change my subscription plan?',
      a: 'You can easily upgrade, downgrade, or manage your billing details anytime by navigating to your account Dashboard and accessing the subscription settings.'
    }
  ];

  const filteredFaqs = faqs.filter(
    faq => faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
           faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] overflow-hidden">
      
      {/* Hero / Search Header */}
      <section className="bg-[#0F382B] text-white py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#34D399_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#10B981]/20 text-[#34D399] text-xs font-semibold mb-6 border border-[#10B981]/30"
          >
            <HelpCircle className="w-4 h-4" /> Help Center & Support
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6"
          >
            How Can We Help You <span className="text-[#34D399]">Today?</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Explore our guides, FAQs, and support channels to get the most out of EcoTrack AI.
          </motion.p>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="max-w-xl mx-auto relative"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text"
              placeholder="Search for articles, billing, AI parsing, security..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl py-4 pl-12 pr-6 text-white placeholder:text-slate-400 text-sm focus:outline-none focus:border-[#34D399] transition-all shadow-xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Quick Support Cards Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto -mt-10 relative z-20">
        <div className="grid md:grid-cols-3 gap-6">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200/80 hover:border-[#10B981]/50 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#0F382B] text-[#34D399] flex items-center justify-center mb-6 shadow-md shadow-[#0F382B]/20 group-hover:scale-105 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#0F172A] mb-2">Documentation</h3>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              Read comprehensive guides about carbon scopes, API integration, and account management.
            </p>
            <Link href="/explore" className="inline-flex items-center gap-2 text-xs font-bold text-[#10B981] hover:underline">
              Browse Docs <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200/80 hover:border-[#10B981]/50 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#10B981] text-white flex items-center justify-center mb-6 shadow-md shadow-[#10B981]/20 group-hover:scale-105 transition-transform">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#0F172A] mb-2">AI Advisor Support</h3>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              Get instant automated recommendations and solutions directly through our integrated AI agent.
            </p>
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-xs font-bold text-[#10B981] hover:underline">
              Open Dashboard <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200/80 hover:border-[#10B981]/50 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#0F382B] text-[#34D399] flex items-center justify-center mb-6 shadow-md shadow-[#0F382B]/20 group-hover:scale-105 transition-transform">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#0F172A] mb-2">Priority Email</h3>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              Need direct technical assistance? Reach out to our engineering support team anytime.
            </p>
            <a href="mailto:support@ecotrack.ai" className="inline-flex items-center gap-2 text-xs font-bold text-[#10B981] hover:underline">
              support@ecotrack.ai <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#10B981] mb-2">Got Questions?</h2>
          <h3 className="text-3xl font-bold text-[#0F172A]">Frequently Asked Questions</h3>
        </div>

        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-[#0F172A] hover:text-[#10B981] transition-colors cursor-pointer"
                  >
                    <span className="text-base">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180 text-[#10B981]' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
              <p className="text-slate-500 text-sm">No matching questions found. Try searching with different keywords.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#0F382B] text-white rounded-3xl p-12 relative overflow-hidden shadow-xl"
        >
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#34D399_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Still Need Help?</h2>
            <p className="text-slate-300 mb-8 text-sm md:text-base leading-relaxed">
              Our support team and AI advisor are available 24/7 to resolve any issues regarding enterprise carbon setups or billing.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/register" 
                className="px-6 py-3 rounded-xl bg-[#10B981] hover:bg-[#0E9F6E] text-white font-semibold shadow-lg shadow-[#10B981]/30 transition-all flex items-center gap-2 text-sm"
              >
                Get Started Now <Zap className="w-4 h-4" />
              </Link>
              <Link 
                href="/about" 
                className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 font-semibold transition-all text-sm"
              >
                Learn About Us
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}