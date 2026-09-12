import React from 'react';
import Link from 'next/link';
import { Leaf, Mail, ArrowRight } from 'lucide-react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
    return (
        <footer className="w-full bg-[#dcffe7] border-t border-[#c3f5d3] text-gray-700 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
                    
                    {/* Brand & Mission (Spans 2 columns on large screens) */}
                    <div className="lg:col-span-2 space-y-4">
                        <Link href="/" className="flex items-center gap-1.5 group">
                            <div>
                                <Leaf className="w-6 h-6 text-emerald-600" />
                            </div>
                            <span className="text-xl font-sans font-bold text-gray-900">
                                EcoTrack <span className="text-emerald-600">AI</span>
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed text-gray-600 max-w-sm">
                            Empowering individuals and organizations with AI-driven insights to track, reduce, and offset carbon footprints for a sustainable tomorrow.
                        </p>
                        
                        {/* Social Links */}
                        <div className="flex items-center gap-3 pt-2">
                            <a 
                                href="https://facebook.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/80 border border-emerald-200/60 flex items-center justify-center text-emerald-700 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all shadow-sm"
                                aria-label="Facebook"
                            >
                                <FaFacebook className="w-4 h-4" />
                            </a>
                            <a 
                                href="https://instagram.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/80 border border-emerald-200/60 flex items-center justify-center text-emerald-700 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all shadow-sm"
                                aria-label="Instagram"
                            >
                                <FaInstagram className="w-4 h-4" />
                            </a>
                            <a 
                                href="https://twitter.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/80 border border-emerald-200/60 flex items-center justify-center text-emerald-700 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all shadow-sm"
                                aria-label="Twitter"
                            >
                                <FaXTwitter className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Quick Links</h3>
                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
                            </li>
                            <li>
                                <Link href="/explore" className="hover:text-emerald-600 transition-colors">Explore</Link>
                            </li>
                            <li>
                                <Link href="/ai-advisor" className="hover:text-emerald-600 transition-colors">AI Advisor</Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-emerald-600 transition-colors">About Us</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support & Legal */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Support</h3>
                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <Link href="/help" className="hover:text-emerald-600 transition-colors">Help Center</Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="hover:text-emerald-600 transition-colors">Privacy Policy</Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-emerald-600 transition-colors">Terms of Service</Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-emerald-600 transition-colors">Contact Support</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter Subscription */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Stay Updated</h3>
                        <p className="text-sm text-gray-600">
                            Get eco-tips and platform updates directly in your inbox.
                        </p>
                        <form className="space-y-2">
                            <div className="relative">
                                <Mail className="absolute left-3 top-2.75 w-4 h-4 text-emerald-600" />
                                <input 
                                    type="email" 
                                    placeholder="Enter your email" 
                                    className="w-full bg-white border border-emerald-200/80 rounded-md pl-9 pr-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all shadow-sm"
                                />
                            </div>
                            <button 
                                type="submit" 
                                className="w-full py-2 px-4 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                            >
                                Subscribe <ArrowRight className="w-4 h-4" />
                            </button>
                        </form>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-[#c3f5d3] flex flex-col sm:flex-row items-center justify-between text-xs text-gray-600 gap-4">
                    <p>© {new Date().getFullYear()} EcoTrack AI. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <Link href="/privacy" className="hover:text-emerald-600 transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-emerald-600 transition-colors">Terms</Link>
                        <Link href="/cookies" className="hover:text-emerald-600 transition-colors">Cookies</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;