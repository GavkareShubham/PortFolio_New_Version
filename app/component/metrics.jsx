'use client'
import React from 'react';
import { motion } from 'framer-motion';

const profileLines = [
    { key: 'languages', value: 'C++17/20, Python, Go' },
    { key: 'specialization', value: 'low-latency trading systems' },
    { key: 'focus', value: 'distributed market-data pipelines' },
    { key: 'infrastructure', value: 'Linux, TCP/IP, RDMA' },
    { key: 'patterns', value: 'lock-free queues, SPSC, MPSC' },
    { key: 'protocols', value: 'FIX 4.2/4.4, ITCH 5.0, OUCH' },
];

const stats = [
    { value: '1.2M+', label: 'ops/sec throughput' },
    { value: '<50µs', label: 'p50 order-book latency' },
    { value: '5M+', label: 'market msgs/sec' },
    { value: '500+', label: 'LeetCode problems' },
];

const Metrics = () => {
    return (
        <section className="py-24 border-t border-[#1E1E22]">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-start">

                    {/* Terminal profile block */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="font-mono text-[#00E5FF] text-[11px] tracking-[0.25em] uppercase mb-4 block">
                            Engineering Profile
                        </span>
                        <div className="bg-[#121214] border border-[#1E1E22] rounded-lg overflow-hidden">
                            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[#1E1E22] bg-[#0F0F11]">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                                <span className="ml-2 text-[#8B8B90] text-[10px] font-mono">engineer_profile.sh</span>
                            </div>
                            <div className="p-5 font-mono text-sm space-y-1.5">
                                <p className="text-[#E5E5E5]">$ engineer_profile</p>
                                <p className="text-[#8B8B90] text-xs"># loading engineer metadata...</p>
                                {profileLines.map((line, i) => (
                                    <motion.div
                                        key={line.key}
                                        initial={{ opacity: 0, x: -8 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.07, duration: 0.35 }}
                                        className="flex gap-2 text-xs"
                                    >
                                        <span className="text-[#8B5CF6] min-w-[140px] shrink-0">{line.key}:</span>
                                        <span className="text-[#00E5FF]">{line.value}</span>
                                    </motion.div>
                                ))}
                                <p className="text-[#28C840] text-xs pt-1">[OK] profile loaded successfully</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Stats grid */}
                    <div>
                        <span className="font-mono text-[#00E5FF] text-[11px] tracking-[0.25em] uppercase mb-4 block">
                            Performance Metrics
                        </span>
                        <div className="grid grid-cols-2 gap-3">
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.09, duration: 0.5 }}
                                    className="bg-[#121214] border border-[#1E1E22] rounded-lg p-5 hover:border-[#00E5FF]/20 transition-colors duration-300 group"
                                >
                                    <p className="font-mono text-2xl font-bold text-[#00E5FF] mb-1 group-hover:text-[#00E5FF] transition-colors">
                                        {stat.value}
                                    </p>
                                    <p className="text-[#8B8B90] text-xs leading-tight">{stat.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Metrics;
