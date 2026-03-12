'use client'
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '../component/navbar';

const CARDS = [
    {
        slug: 'memory-access',
        title: 'Memory Access Visualization in C++',
        description:
            'How C++ gives low-level access to memory and how pointers interact with memory blocks. Explore pool allocation, cache-warm reads, lock-free CAS, and deallocation — visualized interactively.',
        tags: ['Pointers', 'Memory Model', 'Cache', 'Lock-Free'],
        icon: (
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#00E5FF" strokeWidth={1.5}>
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M8 4v16M16 4v16M2 12h20" />
            </svg>
        ),
    },
    {
        slug: 'noexcept-copy-vs-move',
        title: 'noexcept: Copy vs Move',
        description:
            'Why noexcept enables efficient move semantics and changes behavior inside STL containers. See how std::vector decides between copying and moving during reallocation.',
        tags: ['Move Semantics', 'noexcept', 'STL', 'Performance'],
        icon: (
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#00E5FF" strokeWidth={1.5}>
                <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
            </svg>
        ),
    },
];

const InsightCard = ({ card, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        className="group"
    >
        <Link href={`/insights/${card.slug}`} className="block h-full">
            <div className="h-full bg-[#121214] border border-[#1E1E22] rounded-lg p-6 hover:border-[#00E5FF]/25 hover:-translate-y-1 transition-all duration-300 flex flex-col">
                {/* Icon */}
                <div className="w-10 h-10 rounded-lg bg-[#0F0F11] border border-[#1E1E22] flex items-center justify-center mb-5 group-hover:border-[#00E5FF]/30 transition-colors duration-200">
                    {card.icon}
                </div>

                {/* Title */}
                <h3 className="text-[#E5E5E5] font-semibold text-sm leading-snug mb-3 group-hover:text-[#00E5FF] transition-colors duration-200">
                    {card.title}
                </h3>

                {/* Description */}
                <p className="text-[#8B8B90] text-xs leading-relaxed flex-1 mb-4">
                    {card.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                    {card.tags.map((tag) => (
                        <span
                            key={tag}
                            className="font-mono text-[9px] px-2 py-0.5 bg-[#0F0F11] border border-[#1E1E22] text-[#8B5CF6] rounded"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Read more arrow */}
                <div className="flex items-center gap-1 font-mono text-[10px] text-[#8B8B90] group-hover:text-[#00E5FF] transition-colors duration-200">
                    <span>Read insight</span>
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
        </Link>
    </motion.div>
);

export default function InsightsPage() {
    return (
        <main className="relative min-h-screen bg-[#0B0B0C]">
            {/* Grid background */}
            <div
                className="fixed inset-0 pointer-events-none z-0"
                style={{
                    backgroundImage:
                        'linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    opacity: 0.07,
                }}
            />
            <div
                className="fixed inset-0 pointer-events-none z-0"
                style={{
                    background:
                        'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,229,255,0.05) 0%, transparent 70%)',
                }}
            />

            <div className="relative z-10">
                <Navbar />

                <div className="max-w-6xl mx-auto px-6 pt-32 pb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-14"
                    >
                        <span className="font-mono text-[#00E5FF] text-[11px] tracking-[0.25em] uppercase mb-3 block">
                            Engineering Notebook
                        </span>
                        <h1 className="text-4xl font-bold text-[#E5E5E5] mb-4">Engineering Insights</h1>
                        <p className="text-[#8B8B90] text-sm max-w-xl leading-relaxed">
                            Deep dives into C++ internals, systems programming concepts, and low-latency
                            engineering patterns — with interactive visualizations.
                        </p>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {CARDS.map((card, i) => (
                            <InsightCard key={card.slug} card={card} index={i} />
                        ))}

                        {/* Coming soon placeholder */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="bg-[#0F0F11] border border-dashed border-[#1E1E22] rounded-lg p-6 flex flex-col items-center justify-center text-center min-h-[200px]"
                        >
                            <div className="w-8 h-8 rounded-full border border-[#1E1E22] flex items-center justify-center mb-3">
                                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#8B8B90" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                            <p className="font-mono text-[#8B8B90] text-[10px] uppercase tracking-wider">
                                More insights coming soon
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </main>
    );
}
