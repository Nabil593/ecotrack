'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Leaf, User, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useSession, authClient } from '@/lib/auth-client';
import Image from 'next/image';

interface SessionUser {
    id: string;
    name?: string;
    email?: string;
    image?: string;
    subscriptionPlan?: string;
}

interface SessionData {
    user?: SessionUser;
}

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const router = useRouter();

    const { data: session, isPending } = useSession() as { data: SessionData | null; isPending: boolean };
    const user = session?.user;
    const isAuthenticated = !!user;

    const rawPlan = user?.subscriptionPlan || 'free';
    const userPlan = rawPlan.charAt(0).toUpperCase() + rawPlan.slice(1);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Explore', href: '/explore' },
        // { name: 'AI Advisor', href: '/ai-advisor' },
        { name: 'About', href: '/about' },
        { name: 'Help', href: '/help' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        handleScroll();

        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setProfileDropdownOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSignOut = async () => {
        try {
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        router.push('/login');
                    },
                },
            });
        } catch (error) {
            console.error('Sign out failed', error);
            router.push('/login');
        }
    };

    return (
        <header className={`sticky top-0 z-50 w-full transition-all duration-300 font-sans ${
            isScrolled 
                ? 'bg-[#dcffe7]/70 backdrop-blur-md border-b border-[#10B981]/20 shadow-sm' 
                : 'bg-[#dcffe7] border-b border-transparent shadow-none'
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-17 flex items-center justify-between">
                
                {/* Logo Section */}
                <Link href="/" className="flex items-center gap-1.5 group">
                    <div>
                        <Leaf className="w-6 h-6 text-[#10B981]" />
                    </div>
                    <span className="text-xl font-sans font-bold text-gray-900">
                        EcoTrack <span className="text-[#10B981]">AI</span>
                    </span>
                </Link>

                {/* Desktop Nav Links */}
                <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-black">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link 
                                key={link.name} 
                                href={link.href} 
                                className={`transition-colors py-1 relative ${
                                    isActive 
                                        ? 'text-[#10B981] font-semibold' 
                                        : 'hover:text-[#10B981]'
                                }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Right Actions & Auth State */}
                <div className="hidden md:flex items-center gap-4">
                    {isPending ? (
                        <div className="w-28 h-9 bg-slate-100 animate-pulse rounded-full" />
                    ) : isAuthenticated ? (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                                className="flex items-center gap-2.5 py-1.5 px-3 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all cursor-pointer focus:outline-none"
                            >
                                {user?.image && user.image.trim() !== "" ? (
                                    <Image
                                        src={user.image}
                                        alt={user?.name || "User"}
                                        className="w-8 h-8 rounded-full object-cover border border-[#10B981]"
                                        width={32}
                                        height={32}
                                    />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-[#10B981]/10 text-[#10B981] flex items-center justify-center font-bold text-xs">
                                        {user?.name ? user.name.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
                                    </div>
                                )}
                                <div className="flex flex-col text-left max-w-30">
                                    <span className="text-xs font-semibold text-slate-800 truncate">
                                        {user?.name || "Account"}
                                    </span>
                                </div>
                                <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Profile Dropdown Menu */}
                            {profileDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-60 rounded-2xl bg-white border border-slate-200 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                                    <div className="px-4 py-3 border-b border-slate-100">
                                        <p className="text-xs font-semibold text-slate-900 truncate">
                                            {user?.name}
                                        </p>
                                        <p className="text-[11px] text-slate-500 truncate mb-1.5">
                                            {user?.email}
                                        </p>
                                    </div>

                                    <div className="py-1">
                                        <Link 
                                            href="/dashboard"
                                            onClick={() => setProfileDropdownOpen(false)}
                                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-[#dcffe7]/30 hover:text-[#10B981] transition-colors"
                                        >
                                            <LayoutDashboard className="w-4 h-4 text-slate-400" />
                                            Dashboard
                                        </Link>
                                    </div>

                                    <div className="border-t border-slate-100 pt-1">
                                        <button
                                            onClick={() => {
                                                setProfileDropdownOpen(false);
                                                handleSignOut();
                                            }}
                                            className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer text-left"
                                        >
                                            <LogOut className="w-4 h-4 text-red-500" />
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link 
                                href="/login" 
                                className="px-4 py-2 text-sm font-medium text-black hover:bg-[#10B981]/20 rounded-md transition-colors"
                            >
                                Login
                            </Link>
                            <Link 
                                href="/register" 
                                className="px-4 py-2 rounded-md bg-[#10B981] hover:bg-[#10B981]/90 text-white font-medium text-sm transition-all shadow-lg shadow-[#10B981]/20"
                            >
                                Get Started
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="flex md:hidden items-center gap-3"> 
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 rounded-md hover:bg-[#10B981]/10 text-gray-800 transition-colors"
                    >
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>

            </div>

            {/* Mobile Dropdown Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-17 left-0 w-full bg-[#dcffe7] border-b border-[#10B981]/20 px-6 py-6 space-y-4 shadow-2xl animate-in slide-in-from-top duration-200">
                    <nav className="flex flex-col space-y-3 font-medium text-base text-gray-700">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link 
                                    key={link.name}
                                    href={link.href} 
                                    onClick={() => setIsOpen(false)}
                                    className={`py-1 transition-colors ${
                                        isActive ? 'text-[#10B981] font-semibold pl-2 border-l-2 border-[#10B981]' : 'hover:text-[#10B981]'
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="pt-4 border-t border-[#10B981]/20 flex flex-col gap-3">
                        {isPending ? (
                            <div className="w-full h-10 bg-slate-200 animate-pulse rounded-xl" />
                        ) : isAuthenticated ? (
                            <>
                                <div className="flex items-center gap-3 py-2.5 px-3 rounded-xl bg-white/60 border border-[#10B981]/20">
                                    {user?.image && user.image.trim() !== "" ? (
                                        <Image
                                            src={user.image}
                                            alt={user?.name || "User"}
                                            className="w-9 h-9 rounded-full object-cover border border-[#10B981]"
                                            width={36}
                                            height={36}
                                        />
                                    ) : (
                                        <div className="w-9 h-9 rounded-full bg-[#10B981]/10 text-[#10B981] flex items-center justify-center font-bold text-xs">
                                            {user?.name ? user.name.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
                                        </div>
                                    )}
                                    <div className="overflow-hidden">
                                        <p className="text-xs font-semibold text-slate-900 truncate">
                                            {user?.name}
                                        </p>
                                        <p className="text-[11px] text-slate-500 truncate">
                                            {user?.email}
                                        </p>
                                    </div>
                                </div>
                                <Link 
                                    href="/dashboard"
                                    onClick={() => setIsOpen(false)}
                                    className="w-full text-center py-2.5 rounded-xl bg-[#10B981] text-white font-medium text-sm shadow-md"
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        handleSignOut();
                                    }}
                                    className="w-full text-center py-2.5 rounded-xl border border-red-200 text-red-600 font-medium text-sm hover:bg-red-50 transition-all cursor-pointer"
                                >
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link 
                                    href="/login" 
                                    onClick={() => setIsOpen(false)}
                                    className="w-full text-center py-2.5 rounded-xl border border-[#10B981]/20 text-[#10B981] font-medium text-sm hover:bg-[#10B981]/10 transition-all"
                                >
                                    Login
                                </Link>
                                <Link 
                                    href="/register" 
                                    onClick={() => setIsOpen(false)}
                                    className="w-full text-center py-2.5 rounded-xl bg-[#10B981] hover:bg-[#10B981]/90 text-white font-medium text-sm transition-all shadow-lg shadow-[#10B981]/20"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;