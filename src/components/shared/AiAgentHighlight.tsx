'use client';
import { useState, useEffect, useRef } from 'react';
import { Bot, CheckCircle2, User, Send } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

interface Message {
    id: number;
    sender: 'ai' | 'user';
    text: string;
}

const chatScript: { user: string; ai: string }[] = [
    {
        user: "How does EcoTrack AI help reduce our corporate carbon footprint?",
        ai: "I analyze your real-time utility, cloud, and supply chain data, then apply machine learning models to recommend the most cost-effective green reduction strategies."
    },
    {
        user: "Are Scope 1, 2, and 3 emissions tracked automatically?",
        ai: "Yes. Using pre-built enterprise API connectors, we continuously ingest and process emission data directly from your ERP and cloud infrastructure without manual entries."
    },
    {
        user: "Will audit-ready compliance reporting be readily available?",
        ai: "Absolutely. I automatically generate disclosure reports fully compliant with ISO 14064 and GHG Protocol guidelines, ready for stakeholder review."
    }
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { 
            duration: 0.7, 
            ease: [0.22, 1, 0.36, 1] as const
        } 
    },
};

export default function AiAgentHighlight() {
    const initialAiMessage: Message = { 
        id: 1, 
        sender: 'ai', 
        text: "Hello! I am your EcoTrack AI Sustainability Agent. How can I assist your enterprise decarbonization goals today?" 
    };

    const [messages, setMessages] = useState<Message[]>([initialAiMessage]);
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let isMounted = true;
        let messageIndex = 0;
        let timeoutId: NodeJS.Timeout;

        const runAutonomousLoop = () => {
            if (!isMounted) return;

            if (messageIndex >= chatScript.length) {
                setTimeout(() => {
                    if (!isMounted) return;
                    setMessages([initialAiMessage]);
                    messageIndex = 0;
                    timeoutId = setTimeout(runAutonomousLoop, 2000);
                }, 5000); 
                return;
            }

            const currentPair = chatScript[messageIndex];

            // Add User Message with slight breathing room
            timeoutId = setTimeout(() => {
                if (!isMounted) return;
                setMessages(prev => [
                    ...prev,
                    { id: Date.now(), sender: 'user', text: currentPair.user }
                ]);

                // Start AI typing indicator after user message
                timeoutId = setTimeout(() => {
                    if (!isMounted) return;
                    setIsTyping(true);

                    // Deliver AI response after a deliberate typing delay so it feels natural
                    timeoutId = setTimeout(() => {
                        if (!isMounted) return;
                        setIsTyping(false);
                        setMessages(prev => [
                            ...prev,
                            { id: Date.now(), sender: 'ai', text: currentPair.ai }
                        ]);

                        messageIndex++;
                        timeoutId = setTimeout(runAutonomousLoop, 3500);
                    }, 2400);
                }, 1200);
            }, 1000);
        };

        timeoutId = setTimeout(runAutonomousLoop, 2000);

        return () => {
            isMounted = false;
            clearTimeout(timeoutId);
        };
    }, []);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages, isTyping]);

    return (
        <section className="py-24 bg-white border-b border-gray-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
                >
                    
                    {/* Left Text Content */}
                    <motion.div variants={itemVariants} className="lg:col-span-6 space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold">
                            <Bot className="w-4 h-4" /> Autonomous Copilot
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-[1.15]">
                            Meet Your Dedicated AI Sustainability Agent
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                            Our LLM-driven advisor constantly audits energy usage, recommends green vendor swaps, and auto-generates compliance reporting for stakeholders seamlessly in real-time.
                        </p>
                        <div className="space-y-3 pt-2">
                            <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
                                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" /> Automated Scope 1-3 anomaly detection
                            </div>
                            <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
                                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" /> Instant audit-ready PDF disclosures
                            </div>
                            <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
                                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" /> Natural language data querying interface
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Chat Box Container */}
                    <motion.div variants={itemVariants} className="lg:col-span-6 bg-gray-50 border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4 flex flex-col justify-between">
                        
                        {/* Chat Header */}
                        <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                            <div className="flex items-center gap-2.5">
                                <div className="relative">
                                    <div className="w-9 h-9 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700">
                                        <Bot className="w-5 h-5" />
                                    </div>
                                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white animate-ping" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-xs sm:text-sm">EcoTrack AI Assistant</h3>
                                    <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                                        ● Autonomous Live Feed
                                    </span>
                                </div>
                            </div>
                            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-mono bg-white px-2 py-1 rounded border border-gray-200">v2.1 Active</span>
                        </div>

                        {/* Chat Messages Scroll Area */}
                        <div 
                            ref={chatContainerRef}
                            className="h-[340px] overflow-y-auto space-y-4 pr-3 pb-4 text-xs sm:text-sm scroll-smooth [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full"
                        >
                            <AnimatePresence initial={false}>
                                {messages.map((msg) => (
                                    <motion.div 
                                        key={msg.id}
                                        initial={{ opacity: 0, y: 15, scale: 0.98 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                        className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        {msg.sender === 'ai' && (
                                            <div className="w-7 h-7 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 flex-shrink-0 mt-0.5">
                                                <Bot className="w-4 h-4" />
                                            </div>
                                        )}
                                        <div className={`p-3.5 rounded-xl max-w-[82%] leading-relaxed shadow-sm ${
                                            msg.sender === 'user' 
                                                ? 'bg-emerald-600 text-white rounded-br-none' 
                                                : 'bg-white border border-gray-200 text-gray-700 rounded-bl-none'
                                        }`}>
                                            {msg.text}
                                        </div>
                                        {msg.sender === 'user' && (
                                            <div className="w-7 h-7 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center text-gray-600 flex-shrink-0 mt-0.5">
                                                <User className="w-4 h-4" />
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {/* Typing Indicator with Motion */}
                            <AnimatePresence>
                                {isTyping && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.25 }}
                                        className="flex justify-start items-center gap-2.5 pt-1"
                                    >
                                        <div className="w-7 h-7 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 flex-shrink-0">
                                            <Bot className="w-4 h-4" />
                                        </div>
                                        <div className="bg-white border border-gray-200 p-3.5 rounded-xl rounded-bl-none shadow-sm flex items-center space-x-1.5">
                                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                            <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce"></div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Functional Input Bar */}
                        <div className="pt-3 border-t border-gray-200">
                            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 shadow-sm opacity-90">
                                <input 
                                    type="text" 
                                    placeholder="Simulating live conversation..." 
                                    disabled 
                                    className="w-full bg-transparent text-xs text-gray-500 focus:outline-none cursor-default"
                                />
                                <button disabled className="text-emerald-600 flex-shrink-0 cursor-default">
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                    </motion.div>

                </motion.div>
            </div>
        </section>
    );
}