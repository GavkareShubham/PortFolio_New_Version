'use client'
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '../../component/navbar';
import MemoryVisualizer from '../../component/MemoryVisualizer';
import CommentSection from '../../component/CommentSection';

const CodeBlock = ({ code }) => (
    <div className="bg-[#0D0D0F] border border-[#1E1E22] rounded-lg overflow-hidden my-6">
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[#1E1E22] bg-[#0B0B0C]">
            <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
            <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
            <div className="w-2 h-2 rounded-full bg-[#28C840]" />
        </div>
        <pre className="p-5 font-mono text-xs text-[#E5E5E5] overflow-x-auto leading-6">
            <code>{code}</code>
        </pre>
    </div>
);

const INTRO_CODE = `// Direct pointer access — zero abstraction, deterministic latency
int value = 42;
int* ptr = &value;

// Read the address ptr points to
std::cout << *ptr;   // 42 — L1 cache hit: ~4 cycles

// Write through the pointer
*ptr = 99;           // direct store, no bounds check

// Pool allocator — O(1), no heap fragmentation
int* p2 = pool.allocate<int>();
*p2 = 0xDEAD;

// Atomic CAS — lock-free, hardware ordering
std::atomic<int> atom{0};
int expected = 0;
atom.compare_exchange_strong(expected, 42, std::memory_order_seq_cst);

// Explicit deallocation — no GC pause
p2->~T();
pool.release(p2);
p2 = nullptr;        // guard against dangling`;

export default function MemoryAccessPage() {
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
                        'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,229,255,0.04) 0%, transparent 70%)',
                }}
            />

            <div className="relative z-10">
                <Navbar />

                <article className="max-w-4xl mx-auto px-6 pt-32 pb-24">

                    {/* Breadcrumb */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="flex items-center gap-2 font-mono text-[10px] text-[#8B8B90] mb-8"
                    >
                        <Link href="/insights" className="hover:text-[#00E5FF] transition-colors">Engineering Insights</Link>
                        <span>/</span>
                        <span className="text-[#E5E5E5]">Memory Access Visualization</span>
                    </motion.div>

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.05 }}
                        className="mb-10"
                    >
                        <div className="flex flex-wrap gap-2 mb-4">
                            {['Pointers', 'Memory Model', 'Cache', 'Lock-Free'].map(tag => (
                                <span key={tag} className="font-mono text-[9px] px-2 py-0.5 bg-[#121214] border border-[#1E1E22] text-[#8B5CF6] rounded">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-[#E5E5E5] leading-tight mb-4">
                            Memory Access Visualization in C++
                        </h1>
                        <p className="text-[#8B8B90] text-sm leading-relaxed max-w-2xl">
                            C++ gives you the keys to the machine. Unlike managed languages that abstract away
                            memory, C++ lets you interact directly with addresses, pointer arithmetic, and
                            hardware memory ordering. This insight walks through the core patterns used in
                            high-performance systems.
                        </p>
                    </motion.div>

                    {/* Introduction */}
                    <motion.section
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="prose-section mb-10"
                    >
                        <h2 className="text-[#E5E5E5] font-semibold text-lg mb-3">
                            Pointer-Based Memory Access
                        </h2>
                        <p className="text-[#8B8B90] text-sm leading-relaxed mb-3">
                            A pointer in C++ is simply an integer that holds a memory address. When you
                            dereference it (<code className="font-mono text-[#00E5FF] text-xs bg-[#121214] px-1 py-0.5 rounded">*ptr</code>),
                            the CPU loads or stores the value at that address. There is no bounds checking,
                            no garbage collector scanning, no runtime overhead — just a direct memory access.
                        </p>
                        <p className="text-[#8B8B90] text-sm leading-relaxed mb-3">
                            In latency-critical systems (trading engines, real-time pipelines), this matters
                            enormously. An L1 cache hit costs ~4 cycles; a cache miss to DRAM can cost 200+
                            cycles. Knowing how your data layout maps to cache lines is the difference between
                            a 50ns and a 500ns operation.
                        </p>
                        <p className="text-[#8B8B90] text-sm leading-relaxed">
                            The interactive visualization below shows five memory operations in sequence:
                            pool allocation, pointer write, L1 cache-warm read, lock-free compare-and-swap,
                            and explicit deallocation. Each operation lights up the active memory address
                            with its corresponding accent color.
                        </p>
                    </motion.section>

                    {/* Code example */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <CodeBlock code={INTRO_CODE} />
                    </motion.div>

                    {/* Key insight callout */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="border-l-2 border-[#00E5FF]/40 pl-5 py-1 mb-10"
                    >
                        <p className="font-mono text-[#8B8B90] text-xs italic leading-relaxed">
                            &ldquo;Pool allocators avoid OS heap calls. Once the pool is sized at startup,
                            each allocation is a pointer bump or freelist pop &mdash; O(1) and lock-free when
                            the pool is thread-local.&rdquo;
                        </p>
                    </motion.div>

                    {/* Interactive visualizer */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <MemoryVisualizer />
                    </motion.div>

                    {/* Memory model tables */}
                    <motion.section
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mt-12"
                    >
                        <h2 className="text-[#E5E5E5] font-semibold text-lg mb-4">
                            Memory Hierarchy Reference
                        </h2>
                        <div className="bg-[#121214] border border-[#1E1E22] rounded-lg overflow-hidden">
                            <div className="grid grid-cols-3 font-mono text-[9px] border-b border-[#1E1E22]">
                                <div className="px-4 py-2.5 text-[#8B8B90] uppercase tracking-wider">Level</div>
                                <div className="px-4 py-2.5 text-[#8B8B90] uppercase tracking-wider border-l border-[#1E1E22]">Latency</div>
                                <div className="px-4 py-2.5 text-[#8B8B90] uppercase tracking-wider border-l border-[#1E1E22]">Typical Size</div>
                            </div>
                            {[
                                { level: 'L1 Cache', latency: '~4 cycles', size: '32–64 KB', color: '#28C840' },
                                { level: 'L2 Cache', latency: '~12 cycles', size: '256 KB – 1 MB', color: '#00E5FF' },
                                { level: 'L3 Cache', latency: '~40 cycles', size: '4–32 MB', color: '#8B5CF6' },
                                { level: 'DRAM', latency: '~200 cycles', size: '8–64 GB', color: '#F59E0B' },
                            ].map(row => (
                                <div key={row.level} className="grid grid-cols-3 border-b border-[#1E1E22] last:border-0">
                                    <div className="px-4 py-3 font-mono text-[10px]" style={{ color: row.color }}>{row.level}</div>
                                    <div className="px-4 py-3 font-mono text-[10px] text-[#8B8B90] border-l border-[#1E1E22]">{row.latency}</div>
                                    <div className="px-4 py-3 font-mono text-[10px] text-[#8B8B90] border-l border-[#1E1E22]">{row.size}</div>
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Comment section */}
                    <CommentSection slug="memory-access" />
                </article>
            </div>
        </main>
    );
}
