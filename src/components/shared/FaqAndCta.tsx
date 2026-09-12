'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';

export default function FaqAndCta() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        {
            question: "Is my company data secure?",
            answer: "Yes, all data is encrypted at rest and in transit using industry-standard AES-256 protocols. We comply fully with enterprise security standards and regulatory frameworks."
        },
        {
            question: "How does API integration work with our ERP?",
            answer: "Our pre-built connectors integrate smoothly with major ERP systems, allowing automated data synchronization for Scope 1, 2, and 3 emissions within 48 hours."
        },
        {
            question: "Are reports compliant with the GHG Protocol?",
            answer: "Yes, all generated sustainability disclosures and reports strictly comply with the GHG Protocol corporate standard and ISO 14064 guidelines."
        },
        {
            question: "How accurate is the AI Advisor's Scope 3 mapping?",
            answer: "Our AI model utilizes advanced machine learning trained on verified global supply chain emission databases, achieving over 99.9% predictive accuracy."
        }
    ];

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
                
                {/* FAQ Container - Aligned width */}
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="text-center space-y-3">
                        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">Support</span>
                        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Frequently Asked Questions</h2>
                        <p className="text-sm text-gray-600">Addressing your enterprise concerns regarding integration, security, and compliance.</p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => {
                            const isOpen = openIndex === index;
                            return (
                                <div 
                                    key={index} 
                                    className="rounded-xl bg-gray-50/80 border border-gray-200 overflow-hidden transition-all duration-300"
                                >
                                    <button
                                        onClick={() => toggleFaq(index)}
                                        className="w-full flex items-center justify-between p-6 text-left font-bold text-gray-900 focus:outline-none"
                                    >
                                        <span>{faq.question}</span>
                                        <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-emerald-600' : ''}`} />
                                    </button>

                                    {/* Smooth Height & Opacity Transition */}
                                    <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 pb-6 px-6' : 'grid-rows-[0fr] opacity-0 px-6'}`}>
                                        <div className="overflow-hidden text-sm text-gray-600 leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Fancy Enhanced Green CTA Box */}
                <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 rounded-3xl p-8 sm:p-16 text-center text-white space-y-4 shadow-2xl relative overflow-hidden border border-emerald-800/60">
                    
                    {/* Decorative Background Glows & Pattern Grids */}
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#052e16_1px,transparent_1px),linear-gradient(to_bottom,#052e16_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

                    <div className="relative z-10 max-w-2xl mx-auto space-y-4">
                        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-900/80 border border-emerald-700/50 px-3.5 py-1.5 rounded-full inline-block shadow-inner">
                            Get Started Today
                        </span>
                        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                            Ready to accelerate your net-zero goals?
                        </h2>
                        <p className="text-emerald-100/90 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
                            Join hundreds of forward-thinking enterprises automating carbon accounting with EcoTrack AI.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4 relative z-10">
                        <Link 
                            href="/register" 
                            className="px-4 py-3 rounded-md bg-white hover:bg-emerald-50 text-emerald-950 font-bold text-sm transition-all duration-300 shadow-xl shadow-black/10 flex items-center justify-center gap-2.5 group hover:scale-[1.02]"
                        >
                            Start Free Trial <ArrowRight className="w-4 h-4 text-emerald-700 group-hover:translate-x-1.5 transition-transform" />
                        </Link>
                        <Link 
                            href="/contact" 
                            className="px-4 py-3 rounded-md bg-emerald-900/60 hover:bg-emerald-800/80 text-white font-semibold text-sm transition-all duration-300 border border-emerald-700/60 backdrop-blur-sm flex items-center justify-center"
                        >
                            Schedule a Demo
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
}