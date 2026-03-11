'use client'
import React from 'react';
import { motion } from 'framer-motion';

const pipeline = [
    {
        label: 'Market Feeds',
        desc: 'ITCH 5.0 · OUCH · FIX 4.2/4.4',
        color: '#8B5CF6',
        tag: 'ingestion',
    },
    {
        label: 'Feed Handler',
        desc: 'UDP Multicast · Zero-copy · Kernel bypass',
        color: '#8B5CF6',
        tag: 'ingestion',
    },
    {
        label: 'Normalization Engine',
        desc: 'Parsing · Validation · Deduplication',
        color: '#00E5FF',
        tag: 'processing',
    },
    {
        label: 'Order Book',
        desc: 'Lock-free · <50µs · Pool allocator',
        color: '#00E5FF',
        tag: 'processing',
    },
    {
        label: 'Execution Gateway',
        desc: 'FIX Session Layer · Risk checks · Order routing',
        color: '#28C840',
        tag: 'execution',
    },
];

const legend = [
    { color: '#8B5CF6', label: 'Data Ingestion' },
    { color: '#00E5FF', label: 'Processing' },
    { color: '#28C840', label: 'Execution' },
];

const Architecture = () => {
    return (
        <section className="py-24 border-t border-[#1E1E22]">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <span className="font-mono text-[#00E5FF] text-[11px] tracking-[0.25em] uppercase mb-2 block">
                        System Design
                    </span>
                    <h2 className="text-3xl font-bold text-[#E5E5E5]">Trading System Architecture</h2>
                    <p className="text-[#8B8B90] text-sm mt-2 max-w-lg">
                        End-to-end pipeline from raw market feed ingestion to order execution.
                    </p>
                </motion.div>

                {/* Pipeline */}
                <div className="flex flex-col items-center max-w-lg mx-auto">
                    {pipeline.map((node, i) => (
                        <React.Fragment key={node.label}>
                            <motion.div
                                initial={{ opacity: 0, x: -16 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.45 }}
                                className="w-full bg-[#121214] border rounded-lg px-5 py-4 flex items-center justify-between hover:bg-[#121214]/60 transition-all duration-300 group"
                                style={{ borderColor: node.color + '30' }}
                            >
                                <div>
                                    <p className="text-[#E5E5E5] font-medium text-sm group-hover:text-white transition-colors">
                                        {node.label}
                                    </p>
                                    <p className="font-mono text-[#8B8B90] text-[10px] mt-0.5">{node.desc}</p>
                                </div>
                                <div className="flex items-center gap-2 shrink-0 ml-4">
                                    <span
                                        className="font-mono text-[9px] px-2 py-0.5 rounded border opacity-70"
                                        style={{ color: node.color, borderColor: node.color + '40' }}
                                    >
                                        {node.tag}
                                    </span>
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: node.color }} />
                                </div>
                            </motion.div>

                            {i < pipeline.length - 1 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 + 0.08 }}
                                    className="flex flex-col items-center py-0.5"
                                >
                                    <div className="w-px h-5 bg-[#1E1E22]" />
                                    <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
                                        <path d="M4 5L0 0h8L4 5z" fill="#2a2a30" />
                                    </svg>
                                </motion.div>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Legend */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="flex justify-center gap-8 mt-10"
                >
                    {legend.map((item) => (
                        <div key={item.label} className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                            <span className="font-mono text-[10px] text-[#8B8B90]">{item.label}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Architecture;
