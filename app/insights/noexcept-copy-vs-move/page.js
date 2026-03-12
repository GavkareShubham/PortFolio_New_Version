'use client'
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '../../component/navbar';
import NoexceptMoveVisualizer from '../../component/NoexceptMoveVisualizer';
import CommentSection from '../../component/CommentSection';

const CodeBlock = ({ code, filename }) => (
    <div className="bg-[#0D0D0F] border border-[#1E1E22] rounded-lg overflow-hidden my-6">
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[#1E1E22] bg-[#0B0B0C]">
            <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
            <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
            <div className="w-2 h-2 rounded-full bg-[#28C840]" />
            {filename && <span className="ml-2 font-mono text-[10px] text-[#8B8B90]">{filename}</span>}
        </div>
        <pre className="p-5 font-mono text-xs text-[#E5E5E5] overflow-x-auto leading-6">
            <code>{code}</code>
        </pre>
    </div>
);

const WITHOUT_CODE = `// No noexcept — vector is FORCED to copy on reallocation
class OrderBook {
public:
    std::vector<Order> orders;

    // Move constructor WITHOUT noexcept
    OrderBook(OrderBook&& other) {
        orders = std::move(other.orders);
    }
    // std::vector cannot use this move — it must fall back to copy
    // because if an exception is thrown mid-reallocation, it needs
    // to guarantee the strong exception safety invariant.
};`;

const WITH_CODE = `// With noexcept — vector can SAFELY move on reallocation
class OrderBook {
public:
    std::vector<Order> orders;

    // Move constructor WITH noexcept — signals: "I will not throw"
    OrderBook(OrderBook&& other) noexcept {
        orders = std::move(other.orders);  // O(1) pointer transfer
    }
    // std::vector sees noexcept guarantee, picks move over copy.
    // Result: O(1) reallocation instead of O(n).
};`;

const STL_BEHAVIOR_CODE = `// How std::vector decides at compile time using type traits:

if constexpr (
    std::is_nothrow_move_constructible<T>::value  // noexcept move?
    || !std::is_copy_constructible<T>::value       // or no copy?
) {
    // MOVE — O(1): transfer pointer + size + capacity
    new_buffer[i] = std::move(old_buffer[i]);
} else {
    // COPY — O(n): duplicate every element into new buffer
    new_buffer[i] = old_buffer[i];
}`;

export default function NoexceptPage() {
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
                        <span className="text-[#E5E5E5]">noexcept: Copy vs Move</span>
                    </motion.div>

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.05 }}
                        className="mb-10"
                    >
                        <div className="flex flex-wrap gap-2 mb-4">
                            {['Move Semantics', 'noexcept', 'STL', 'Performance'].map(tag => (
                                <span key={tag} className="font-mono text-[9px] px-2 py-0.5 bg-[#121214] border border-[#1E1E22] text-[#8B5CF6] rounded">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-[#E5E5E5] leading-tight mb-4">
                            noexcept: Copy vs Move
                        </h1>
                        <p className="text-[#8B8B90] text-sm leading-relaxed max-w-2xl">
                            A single keyword — <code className="font-mono text-[#00E5FF] text-xs bg-[#121214] px-1 py-0.5 rounded">noexcept</code> — can
                            change STL container behavior from O(n) copies to O(1) pointer transfers.
                            Here is why the C++ standard library cares deeply about exception specifications.
                        </p>
                    </motion.div>

                    {/* Copy vs Move semantics explanation */}
                    <motion.section
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mb-8"
                    >
                        <h2 className="text-[#E5E5E5] font-semibold text-lg mb-3">
                            The Core Problem
                        </h2>
                        <p className="text-[#8B8B90] text-sm leading-relaxed mb-3">
                            When a <code className="font-mono text-[#00E5FF] text-xs bg-[#121214] px-1 py-0.5 rounded">std::vector</code> runs
                            out of capacity and reallocates, it must transfer all existing elements into the
                            new larger buffer. The question is: should it <em className="text-[#F97316]">copy</em> or <em className="text-[#00E5FF]">move</em> them?
                        </p>
                        <p className="text-[#8B8B90] text-sm leading-relaxed mb-3">
                            Copying is safe — if something goes wrong halfway through, the original buffer
                            still has all its data intact. But moving is faster — it just transfers ownership
                            of internal resources (pointers, handles) without duplicating data.
                        </p>
                        <p className="text-[#8B8B90] text-sm leading-relaxed">
                            The problem: if a move throws an exception halfway through reallocation, both
                            the old buffer (partially moved-out) and the new buffer are corrupted. You have
                            lost data. So <code className="font-mono text-[#00E5FF] text-xs bg-[#121214] px-1 py-0.5 rounded">std::vector</code> will
                            only use move if the move constructor is marked <code className="font-mono text-[#00E5FF] text-xs bg-[#121214] px-1 py-0.5 rounded">noexcept</code>.
                        </p>
                    </motion.section>

                    {/* Pipeline: Without noexcept */}
                    <motion.section
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mb-4"
                    >
                        <h2 className="text-[#E5E5E5] font-semibold text-lg mb-3">
                            Without <code className="font-mono text-[#00E5FF]">noexcept</code> — Forced to Copy
                        </h2>
                        <p className="text-[#8B8B90] text-sm leading-relaxed mb-2">
                            Without the <code className="font-mono text-[#00E5FF] text-xs bg-[#121214] px-1 py-0.5 rounded">noexcept</code> specifier,
                            the container cannot trust that the move will succeed. It conservatively copies every element
                            — O(n) allocations each time the vector grows.
                        </p>
                        <CodeBlock code={WITHOUT_CODE} filename="orderbook.hpp" />
                    </motion.section>

                    {/* Pipeline: With noexcept */}
                    <motion.section
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mb-4"
                    >
                        <h2 className="text-[#E5E5E5] font-semibold text-lg mb-3">
                            With <code className="font-mono text-[#00E5FF]">noexcept</code> — Safe to Move
                        </h2>
                        <p className="text-[#8B8B90] text-sm leading-relaxed mb-2">
                            Adding <code className="font-mono text-[#00E5FF] text-xs bg-[#121214] px-1 py-0.5 rounded">noexcept</code> is a compile-time
                            contract: &ldquo;this function will never throw.&rdquo; The STL checks this at compile time using
                            type traits and enables the O(1) move path.
                        </p>
                        <CodeBlock code={WITH_CODE} filename="orderbook_fast.hpp" />
                    </motion.section>

                    {/* STL decision logic */}
                    <motion.section
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mb-8"
                    >
                        <h2 className="text-[#E5E5E5] font-semibold text-lg mb-3">
                            How the STL Decides at Compile Time
                        </h2>
                        <CodeBlock code={STL_BEHAVIOR_CODE} filename="stl_vector_internals.hpp" />

                        <div className="border-l-2 border-[#00E5FF]/40 pl-5 py-1">
                            <p className="font-mono text-[#8B8B90] text-xs italic leading-relaxed">
                                &ldquo;The type trait <code className="text-[#00E5FF] not-italic">std::is_nothrow_move_constructible&lt;T&gt;</code> evaluates to
                                true only if T&apos;s move constructor is declared noexcept. This check happens entirely
                                at compile time &mdash; zero runtime overhead.&rdquo;
                            </p>
                        </div>
                    </motion.section>

                    {/* Interactive visualizer */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <NoexceptMoveVisualizer />
                    </motion.div>

                    {/* Summary table */}
                    <motion.section
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mt-12"
                    >
                        <h2 className="text-[#E5E5E5] font-semibold text-lg mb-4">
                            When to Mark noexcept
                        </h2>
                        <div className="bg-[#121214] border border-[#1E1E22] rounded-lg overflow-hidden">
                            <div className="grid grid-cols-2 font-mono text-[9px] border-b border-[#1E1E22]">
                                <div className="px-4 py-2.5 text-[#8B8B90] uppercase tracking-wider">Scenario</div>
                                <div className="px-4 py-2.5 text-[#8B8B90] uppercase tracking-wider border-l border-[#1E1E22]">Recommendation</div>
                            </div>
                            {[
                                { scenario: 'Move constructor / assignment', rec: 'Always noexcept if possible', color: '#28C840' },
                                { scenario: 'Swap operations', rec: 'Always noexcept', color: '#28C840' },
                                { scenario: 'Destructors', rec: 'Implicitly noexcept — do not add throwing logic', color: '#00E5FF' },
                                { scenario: 'Copy constructor', rec: 'Conditional — allocations can fail', color: '#F59E0B' },
                                { scenario: 'Functions with malloc/new', rec: 'Not noexcept unless caught internally', color: '#FF5F57' },
                            ].map(row => (
                                <div key={row.scenario} className="grid grid-cols-2 border-b border-[#1E1E22] last:border-0">
                                    <div className="px-4 py-3 font-mono text-[10px] text-[#8B8B90]">{row.scenario}</div>
                                    <div className="px-4 py-3 font-mono text-[10px] border-l border-[#1E1E22]" style={{ color: row.color }}>{row.rec}</div>
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Comment section */}
                    <CommentSection slug="noexcept-copy-vs-move" />
                </article>
            </div>
        </main>
    );
}
