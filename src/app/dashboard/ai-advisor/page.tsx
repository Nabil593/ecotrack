'use client';

import React, { useState } from 'react';
import { Sparkles, Send, Loader2, ShieldCheck, Copy, Check, Terminal, Zap, Download, FileText, CheckCircle2 } from 'lucide-react';
import jsPDF from 'jspdf';

export default function AiAdvisorPage() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const presetQueries = [
    "Analyze Scope 2 electricity emissions and propose a solar offset transition roadmap.",
    "Generate an automated utility bill parsing strategy for multi-facility SaaS operations.",
    "Build a 3-step CSRD compliance data integration framework for Scope 3 emissions."
  ];

  const handleGenerate = async (e?: React.FormEvent, customPrompt?: string) => {
    if (e) e.preventDefault();
    const activePrompt = customPrompt || prompt;
    if (!activePrompt.trim()) return;

    if (customPrompt) setPrompt(customPrompt);
    setLoading(true);
    setReport(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ai/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: activePrompt })
      });
      const data = await res.json();
      if (data.success) {
        setReport(data.analysis);
      } else {
        setReport('Failed to generate report. Please try again.');
      }
    } catch (err) {
      setReport('Network error connecting to AI backend service. Ensure the server is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (report) {
      navigator.clipboard.writeText(report);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // ফিক্সড এবং ক্লিন পিডিএফ ডাউনলোড ফাংশন (টেবিল ও ব্রোকেন ক্যারেক্টার রিমুভ করা হয়েছে)
  const handleDownloadPDF = () => {
    if (!report) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    const maxLineWidth = pageWidth - margin * 2;

    // হেডার ব্যাকগ্রাউন্ড
    doc.setFillColor(15, 56, 43); // Dark Green #0F382B
    doc.rect(0, 0, pageWidth, 25, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("EcoTrack AI Sustainability Advisor - Roadmap", margin, 16);

    // তারিখ ও মেটাডাটা
    doc.setTextColor(100, 100, 100);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, margin, 34);

    // মার্কডাউন টেবিল বর্ডার এবং হাবিজাবি সিম্বল পরিষ্কার করা
    const cleanText = report
      .replace(/[+|~_-]{3,}/g, '') // টেবিলের বর্ডার বা লাইন রিমুভ
      .replace(/#{1,6}/g, '')      // হ্যাশ রিমুভ
      .replace(/\*\*/g, '')        // বোল্ড স্টার রিমুভ
      .replace(/[%]/g, 'percent')  // পার্সেন্টেজ সিম্বলজনিত রেন্ডারিং ইস্যু ফিক্স
      .replace(/\r\n/g, '\n');

    doc.setTextColor(30, 30, 30);
    doc.setFontSize(10);
    
    const lines = cleanText.split('\n');
    let cursorY = 44;
    const lineHeight = 6;

    lines.forEach((paragraph) => {
      if (!paragraph.trim()) {
        cursorY += 4; // খালি লাইনের জন্য ছোট স্পেস
        return;
      }

      const splitText = doc.splitTextToSize(paragraph.trim(), maxLineWidth);
      
      splitText.forEach((line: string) => {
        if (cursorY > pageHeight - 20) {
          doc.addPage();
          cursorY = 20; // নতুন পেজের মার্জিন
        }
        doc.text(line, margin, cursorY);
        cursorY += lineHeight;
      });
    });

    doc.save("EcoTrack-AI-Sustainability-Roadmap.pdf");

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  // স্ক্রিনে সুন্দরভাবে দেখানোর ফরম্যাটিং
  const renderFormattedReport = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, index) => {
      if (line.startsWith('#') || line.startsWith('**') || line.includes(':')) {
        return (
          <div key={index} className="flex items-start space-x-2 my-2">
            <CheckCircle2 className="w-4 h-4 text-[#10B981] mt-1 shrink-0" />
            <span className="font-semibold text-[#0F382B] text-sm">{line.replace(/#/g, '').replace(/\*\*/g, '')}</span>
          </div>
        );
      }
      if (line.trim().startsWith('-') || line.trim().startsWith('*')) {
        return (
          <div key={index} className="flex items-start space-x-2 ml-4 my-1">
            <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full mt-2 shrink-0" />
            <span className="text-slate-600 text-sm">{line.replace(/[-*]/g, '').trim()}</span>
          </div>
        );
      }
      return line.trim() ? (
        <p key={index} className="text-slate-600 text-sm my-1 leading-relaxed">
          {line}
        </p>
      ) : null;
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#0F382B] to-[#10B981]/90 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-[#34D399]/25 relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/5 rounded-full pointer-events-none blur-2xl" />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-[#10B981]/30 rounded-xl text-[#34D399] backdrop-blur-md border border-[#34D399]/30">
                  <Sparkles className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">EcoTrack AI Sustainability Advisor</h1>
                  <p className="text-[#34D399] text-xs sm:text-sm font-medium">Enterprise-grade multi-step carbon reduction & ESG compliance intelligence</p>
                </div>
              </div>
              <p className="text-slate-200 leading-relaxed text-xs sm:text-sm max-w-2xl">
                Leverage Google Gemini-powered intelligence to analyze corporate emissions scopes, identify structural inefficiencies, and output precise optimization roadmaps instantly.
              </p>
            </div>
            <div className="flex flex-row md:flex-col gap-3 bg-black/20 p-4 rounded-xl border border-white/10 backdrop-blur-md shrink-0">
              <div className="flex items-center space-x-2 text-xs text-[#34D399]">
                <Zap className="w-4 h-4" />
                <span>Model: gemini-3.6-flash</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-slate-300">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>Status: Connected</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Form & Presets */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-200/80 space-y-5">
              <h2 className="text-base font-bold text-[#0F382B] flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-[#10B981]" />
                <span>Advisory Query Builder</span>
              </h2>

              <form onSubmit={(e) => handleGenerate(e)} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Custom Enterprise Query
                  </label>
                  <textarea
                    rows={5}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Type enterprise scope data or query..."
                    className="w-full rounded-xl border border-slate-300 p-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-all bg-slate-50/50"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center space-x-2 bg-[#0F382B] hover:bg-[#10B981] text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-[#0F382B]/10 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin text-[#34D399]" />
                      <span>Synthesizing Strategy...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 text-[#34D399]" />
                      <span>Generate Roadmap</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Quick Action Presets */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-200/80 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Quick Enterprise Presets</h3>
              <div className="space-y-2">
                {presetQueries.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleGenerate(undefined, preset)}
                    disabled={loading}
                    className="w-full text-left text-xs p-3 rounded-xl bg-slate-50 hover:bg-[#10B981]/10 hover:text-[#0F382B] border border-slate-200/60 transition-all font-medium text-slate-700 line-clamp-2"
                  >
                    ✨ {preset}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Visual Structured Output & Post-Generation Action Panel */}
          <div className="lg:col-span-2 space-y-6">
            {report ? (
              <div className="bg-white rounded-2xl shadow-sm p-8 border border-[#10B981]/30 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-[#10B981]/10 rounded-lg text-[#10B981]">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#0F382B]">AI Generated Action Plan</h3>
                      <p className="text-xs text-slate-500">Structured zero-placeholder enterprise corporate compliance strategy</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleCopy}
                      className="flex items-center space-x-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-lg transition-colors"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </button>
                    {/* PDF Download Button */}
                    <button
                      onClick={handleDownloadPDF}
                      className="flex items-center space-x-1.5 text-xs font-semibold bg-[#0F382B] hover:bg-[#10B981] text-white px-3.5 py-2 rounded-lg transition-colors shadow-sm"
                    >
                      {downloaded ? <Check className="w-4 h-4 text-[#34D399]" /> : <Download className="w-4 h-4" />}
                      <span>{downloaded ? 'Downloaded PDF!' : 'Download PDF'}</span>
                    </button>
                  </div>
                </div>

                {/* Structured Visual Cards for Readability */}
                <div className="bg-slate-50/80 p-6 rounded-2xl border border-slate-200/60 space-y-3 max-h-[500px] overflow-y-auto">
                  {renderFormattedReport(report)}
                </div>

                {/* Post-Generation Guidance Card */}
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80 rounded-xl p-5 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F382B] flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-[#10B981]" />
                    <span>Recommended Next Steps After Review</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                    <div className="bg-white p-3 rounded-lg border border-emerald-100 shadow-xs space-y-1">
                      <p className="font-semibold text-[#0F382B]">1. Export & Archive</p>
                      <p className="text-slate-500">Download the plan as a professional PDF to submit into your corporate ESG compliance vault.</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-emerald-100 shadow-xs space-y-1">
                      <p className="font-semibold text-[#0F382B]">2. Integrate with Scopes</p>
                      <p className="text-slate-500">Apply these actionable milestones directly into your facility carbon tracking dashboard.</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[480px] bg-white rounded-2xl shadow-sm border border-slate-200/80 flex flex-col items-center justify-center p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-[#10B981]/10 rounded-full flex items-center justify-center text-[#10B981] mb-2">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-[#0F382B]">No Strategy Generated Yet</h3>
                <p className="text-sm text-slate-500 max-w-md">
                  Select a quick preset from the left sidebar or input your specific emission scope query to instantly generate an interactive, clean visual compliance roadmap.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}