'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const terminalLines = [
    { text: '$ ./orderbook --benchmark', type: 'cmd' },
    { text: 'initializing lock-free queue...', type: 'muted' },
    { text: 'warming up SPSC ring buffer...', type: 'muted' },
    { text: 'throughput:  1.2M ops/sec', type: 'accent' },
    { text: 'p50 latency: 48Âµs', type: 'accent' },
    { text: 'p99 latency: 92Âµs', type: 'accent' },
    { text: '[OK] benchmark complete', type: 'green' },
];

const TerminalWidget = () => {
    const [visibleCount, setVisibleCount] = useState(0);

    useEffect(() => {
        if (visibleCount >= terminalLines.length) return;
        const timer = setTimeout(() => {
            setVisibleCount((c) => c + 1);
        }, visibleCount === 0 ? 800 : 400);
        return () => clearTimeout(timer);
    }, [visibleCount]);

    const colorMap = {
        cmd: 'text-[#E5E5E5]',
        muted: 'text-[#8B8B90]',
        accent: 'text-[#00E5FF]',
        green: 'text-[#28C840]',
    };

    return (
        <div className="bg-[#121214] border border-[#1E1E22] rounded-lg overflow-hidden w-full max-w-sm shadow-2xl">
            {/* Title bar */}
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[#1E1E22] bg-[#0F0F11]">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                <span className="ml-2 text-[#8B8B90] text-[10px] font-mono">orderbook_bench.cpp</span>
            </div>
            {/* Terminal output */}
            <div className="p-5 font-mono text-xs space-y-1 min-h-[140px]">
                {terminalLines.slice(0, visibleCount).map((line, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.25 }}
                        className={`leading-5 ${colorMap[line.type]}`}
                    >
                        {line.text}
                    </motion.div>
                ))}
                {visibleCount < terminalLines.length && (
                    <span className="text-[#00E5FF] animate-pulse inline-block">â–Š</span>
                )}
            </div>
        </div>
    );
};

const Hero = () => {
    return (
        <section id="top" className="min-h-screen flex items-center pt-20 pb-12">
            <div className="max-w-6xl mx-auto px-6 w-full">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left â€” text */}
                    <div>
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="font-mono text-[#00E5FF] text-[11px] tracking-[0.25em] uppercase mb-5 block"
                        >
                            Open to opportunities
                        </motion.span>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-5xl sm:text-6xl font-bold text-[#E5E5E5] tracking-tight leading-[1.1] mb-3"
                        >
                            Shubham<br />Gavkare
                        </motion.h1>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="font-mono text-lg text-[#8B5CF6] mb-4 font-medium"
                        >
                            C++ Systems Engineer
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="font-mono text-[#8B8B90] text-[11px] tracking-wide leading-5 mb-2"
                        >
                            Low-Latency Trading Systems Â· Multithreading<br />
                            Distributed Systems Â· FIX Protocol
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.35 }}
                            className="text-[#8B8B90] text-sm leading-relaxed mt-4 mb-8 max-w-md"
                        >
                            Building high-performance trading infrastructure and real-time market-data pipelines.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.45 }}
                            className="flex flex-wrap gap-3"
                        >
                            <a
                                href="https://github.com/GavkareShubham"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-mono text-sm px-5 py-2.5 bg-[#00E5FF] text-[#0B0B0C] rounded font-semibold hover:bg-[#00E5FF]/90 transition-all duration-200 hover:shadow-[0_0_24px_rgba(0,229,255,0.35)]"
                            >
                                GitHub
                            </a>
                            <a
                                href="/Shubham-Gavkare-Resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-mono text-sm px-5 py-2.5 border border-[#1E1E22] text-[#E5E5E5] rounded hover:border-[#8B5CF6]/50 hover:bg-[#8B5CF6]/5 transition-all duration-200"
                            >
                                Resume
                            </a>
                            <a
                                href="https://leetcode.com/u/shubhamgavkare/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-mono text-sm px-5 py-2.5 border border-[#1E1E22] text-[#8B8B90] rounded hover:border-[#8B8B90]/30 hover:text-[#E5E5E5] transition-all duration-200"
                            >
                                LeetCode
                            </a>
                        </motion.div>
                    </div>

                    {/* Right â€” terminal widget */}
                    <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.55 }}
                        className="flex justify-center lg:justify-end"
                    >
                        <TerminalWidget />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
