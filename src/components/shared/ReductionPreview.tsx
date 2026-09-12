'use client';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { month: 'Jan', emissions: 4200, optimized: 4200 },
    { month: 'Feb', emissions: 3900, optimized: 3500 },
    { month: 'Mar', emissions: 4100, optimized: 3100 },
    { month: 'Apr', emissions: 3800, optimized: 2700 },
    { month: 'May', emissions: 3500, optimized: 2200 },
    { month: 'Jun', emissions: 3200, optimized: 1800 },
];

export default function ReductionPreview() {
    return (
        <section className="py-20 bg-gray-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">Predictive Modeling</span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">AI-Driven Reduction Preview</h2>
                    <p className="text-gray-600">Simulate corporate sustainability milestones using real-time predictive analytics.</p>
                </div>

                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm max-w-4xl mx-auto">
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorOptimized" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="month" stroke="#9CA3AF" />
                                <YAxis stroke="#9CA3AF" />
                                <Tooltip />
                                <Area type="monotone" dataKey="emissions" stroke="#94A3B8" fill="#F1F5F9" name="Standard Trajectory" />
                                <Area type="monotone" dataKey="optimized" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorOptimized)" name="EcoTrack AI Optimized" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </section>
    );
}