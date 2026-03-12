'use client'
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// ── Configuration ─────────────────────────────────────────────────────────────
const COLS = 10;
const ROWS = 5;
const TOTAL = COLS * ROWS; // 50 cells — 10×5 desktop, 5×10 mobile

const BASE_ADDR = 0x7fff8000;
const OP_STEP = 8; // change operation every N pointer moves

// ── Operations ────────────────────────────────────────────────────────────────
const OPS = [
    {
        id: 'alloc',
        tag: 'HEAP ALLOC',
        accent: '#8B5CF6',
        value: '??',
        code: [
            { text: 'int* ptr = pool.allocate<int>();', kind: 'stmt' },
            { text: '// pool allocator — O(1) amortized', kind: 'comment' },
            { text: '// base → 0x7fff8000', kind: 'comment' },
        ],
        desc: 'Pool allocator returns first free block in O(1) — no heap fragmentation or lock contention',
    },
    {
        id: 'write',
        tag: 'PTR WRITE',
        accent: '#00E5FF',
        value: '2A',
        code: [
            { text: '*ptr = 42;', kind: 'stmt' },
            { text: '// raw pointer dereference', kind: 'comment' },
            { text: '// mem[offset] ← 0x2A (42)', kind: 'comment' },
        ],
        desc: 'Direct write via raw pointer — zero bounds check, zero abstraction, deterministic latency',
    },
    {
        id: 'cache',
        tag: 'L1 CACHE HIT',
        accent: '#28C840',
        value: '2A',
        code: [
            { text: '__builtin_prefetch(ptr, 0, 3);', kind: 'stmt' },
            { text: 'const int v = *ptr;', kind: 'stmt' },
            { text: '// L1 hit: ~4 cycles', kind: 'comment' },
        ],
        desc: 'Cache-warm read — 4-cycle L1 latency. Cache-line prefetch eliminates stall on critical path',
    },
    {
        id: 'cas',
        tag: 'LOCK-FREE CAS',
        accent: '#F59E0B',
        value: 'CA',
        code: [
            { text: 'std::atomic<int> atom{0};', kind: 'stmt' },
            { text: 'atom.compare_exchange_strong(', kind: 'stmt' },
            { text: '  expected, 42, seq_cst);', kind: 'stmt' },
        ],
        desc: 'Atomic compare-and-swap — no mutex, no kernel crossing. Hardware-enforced memory ordering',
    },
    {
        id: 'free',
        tag: 'DEALLOC',
        accent: '#FF5F57',
        value: '__',
        code: [
            { text: 'ptr->~T();', kind: 'stmt' },
            { text: 'pool.release(ptr);  // O(1)', kind: 'stmt' },
            { text: 'ptr = nullptr;      // dangling guard', kind: 'comment' },
        ],
        desc: 'Explicit deallocation — deterministic destructor call, zero GC pause, block returned to pool',
    },
];

// ── Stable cell metadata (never changes) ─────────────────────────────────────
const CELLS = Array.from({ length: TOTAL }, (_, i) => ({
    id: i,
    addrShort: `+${(i * 4).toString(16).padStart(3, '0').toUpperCase()}h`,
    addrFull: `0x${(BASE_ADDR + i * 4).toString(16).toUpperCase()}`,
}));

// ── MemoryCell (memoized for performance) ─────────────────────────────────────
const MemoryCell = React.memo(
    ({ cell, isActive, accent, cellValue, hasFade }) => {
        return (
            <div
                className="relative flex flex-col items-center justify-center rounded border select-none cursor-default h-8 sm:h-10 md:h-11"
                style={{
                    borderColor: isActive ? accent : hasFade ? '#222228' : '#1E1E22',
                    backgroundColor: isActive
                        ? `${accent}18`
                        : hasFade
                            ? '#131316'
                            : '#0F0F11',
                    boxShadow: isActive
                        ? `0 0 14px ${accent}50, inset 0 0 10px ${accent}12`
                        : 'none',
                    transition:
                        'border-color 0.2s ease, background-color 0.3s ease, box-shadow 0.2s ease',
                }}
            >
                {/* Address offset — only md+ */}
                <span className="absolute top-0.5 left-0.5 font-mono text-[5px] leading-none text-[#8B8B90] opacity-25 hidden md:block">
                    {cell.addrShort}
                </span>

                {/* Hex value */}
                <span
                    className="font-mono text-[8px] sm:text-[9px] font-semibold leading-none"
                    style={{
                        color: isActive
                            ? accent
                            : hasFade
                                ? cellValue === '__'
                                    ? '#FF5F5740'
                                    : cellValue === 'CA'
                                        ? '#F59E0B30'
                                        : cellValue === '??'
                                            ? '#8B5CF630'
                                            : '#2a303a'
                                : '#1a1a20',
                        transition: 'color 0.2s ease',
                    }}
                >
                    {hasFade ? cellValue : '00'}
                </span>

                {/* PTR badge above active cell */}
                {isActive && (
                    <div
                        className="absolute font-mono text-[6px] font-bold px-1 rounded-sm z-10 pointer-events-none"
                        style={{
                            top: '-10px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            backgroundColor: accent,
                            color: '#0B0B0C',
                            lineHeight: '11px',
                        }}
                    >
                        PTR
                    </div>
                )}

                {/* Pulse ring on active cell */}
                {isActive && (
                    <motion.div
                        className="absolute inset-0 rounded pointer-events-none"
                        animate={{ opacity: [0.7, 0, 0.7] }}
                        transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
                        style={{ border: `1px solid ${accent}`, boxShadow: `0 0 5px ${accent}` }}
                    />
                )}
            </div>
        );
    },
    (prev, next) =>
        prev.isActive === next.isActive &&
        prev.cellValue === next.cellValue &&
        prev.accent === next.accent &&
        prev.hasFade === next.hasFade
);
MemoryCell.displayName = 'MemoryCell';

// ── Legend items ───────────────────────────────────────────────────────────────
const LEGEND = [
    { color: '#8B5CF6', label: 'ALLOC' },
    { color: '#00E5FF', label: 'WRITE' },
    { color: '#28C840', label: 'READ' },
    { color: '#F59E0B', label: 'CAS' },
    { color: '#FF5F57', label: 'FREE' },
];

// ── Main component ────────────────────────────────────────────────────────────
const MemoryVisualizer = () => {
    const sectionRef = useRef(null);
    const inView = useInView(sectionRef, { once: false, margin: '-80px' });

    const [step, setStep] = useState(0);
    const [written, setWritten] = useState({});

    // Derive everything from step
    const opIdx = Math.floor(step / OP_STEP) % OPS.length;
    const op = OPS[opIdx];
    const activeCell = step % TOTAL;

    // Animation loop — starts when in view, pauses when out of view
    useEffect(() => {
        if (!inView) return;
        const timer = setInterval(() => {
            setStep((s) => {
                const next = s + 1;
                const nextOp = OPS[Math.floor(next / OP_STEP) % OPS.length];
                setWritten((prev) => ({
                    ...prev,
                    [next % TOTAL]: nextOp.value,
                }));
                return next;
            });
        }, 480);
        return () => clearInterval(timer);
    }, [inView]);

    const writtenCount = Object.keys(written).length;

    return (
        <section className="py-24 border-t border-[#1E1E22]" ref={sectionRef}>
            <div className="max-w-6xl mx-auto px-6">

                {/* ── Section header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-10"
                >
                    <span className="font-mono text-[#00E5FF] text-[11px] tracking-[0.25em] uppercase mb-2 block">
                        C++ Memory Model
                    </span>
                    <h2 className="text-3xl font-bold text-[#E5E5E5]">
                        Memory Access Visualization
                    </h2>
                    <p className="font-mono text-[#8B8B90] text-sm mt-3 max-w-lg italic leading-relaxed">
                        "C++ doesn&apos;t hide the machine. It gives you the keys to it."
                    </p>
                </motion.div>

                {/* ── Main layout ── */}
                <div className="grid lg:grid-cols-[1fr_308px] gap-6 items-start">

                    {/* LEFT: Memory grid */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        {/* Process status bar */}
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2 font-mono text-[9px] sm:text-[10px] text-[#8B8B90]">
                            <div className="flex items-center gap-3">
                                <span>PROC: orderbook_engine</span>
                                <span>PID: 3142</span>
                                <span className="hidden sm:block">
                                    TID: 0x{(activeCell * 3 + 7).toString(16).padStart(4, '0').toUpperCase()}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span
                                    className="font-bold px-2 py-0.5 rounded text-[9px]"
                                    style={{
                                        backgroundColor: `${op.accent}22`,
                                        color: op.accent,
                                        border: `1px solid ${op.accent}40`,
                                        transition: 'color 0.3s, background-color 0.3s, border-color 0.3s',
                                    }}
                                >
                                    {op.tag}
                                </span>
                                <span>{CELLS[activeCell].addrFull}</span>
                            </div>
                        </div>

                        {/* Memory grid */}
                        <div
                            className="p-3 bg-[#0D0D0F] border border-[#1E1E22] rounded-lg"
                            style={{
                                display: 'grid',
                                gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
                                gap: '3px',
                            }}
                        >
                            {CELLS.map((cell) => (
                                <MemoryCell
                                    key={cell.id}
                                    cell={cell}
                                    isActive={cell.id === activeCell}
                                    accent={op.accent}
                                    cellValue={written[cell.id] || '00'}
                                    hasFade={!!written[cell.id]}
                                />
                            ))}
                        </div>

                        {/* Grid footer */}
                        <div className="flex flex-wrap items-center justify-between mt-2 font-mono text-[9px] text-[#8B8B90] gap-y-2">
                            <div className="flex items-center gap-3">
                                <span>BASE: 0x7FFF8000</span>
                                <span>SIZE: {TOTAL * 4}B</span>
                                <span>ALIGN: 4</span>
                            </div>
                            <div className="flex items-center gap-3">
                                {LEGEND.map(({ color, label }) => (
                                    <span key={label} className="flex items-center gap-1">
                                        <span
                                            className="w-1.5 h-1.5 rounded-full shrink-0"
                                            style={{ backgroundColor: color }}
                                        />
                                        {label}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT: Code panel */}
                    <motion.div
                        initial={{ opacity: 0, x: 16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="space-y-3"
                    >
                        {/* Terminal code block */}
                        <div className="bg-[#0D0D0F] border border-[#1E1E22] rounded-lg overflow-hidden">
                            {/* Mac-style title bar */}
                            <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-[#1E1E22] bg-[#0A0A0C]">
                                <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
                                <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                                <div className="w-2 h-2 rounded-full bg-[#28C840]" />
                                <span className="ml-2 font-mono text-[9px] text-[#8B8B90]">
                                    memory_ops.cpp
                                </span>
                            </div>

                            <div className="p-4 font-mono text-[11px] min-h-[130px]">
                                {/* Op tag + live address */}
                                <div className="flex items-center gap-2 mb-3">
                                    <motion.span
                                        key={op.id + '-badge'}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.2 }}
                                        className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                                        style={{
                                            backgroundColor: `${op.accent}22`,
                                            color: op.accent,
                                        }}
                                    >
                                        {op.tag}
                                    </motion.span>
                                    <span className="text-[#8B8B90] text-[9px]">
                                        {CELLS[activeCell].addrFull}
                                    </span>
                                </div>

                                {/* Code lines — re-animate on op change */}
                                <motion.div
                                    key={op.id + '-code'}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.25 }}
                                    className="space-y-0.5"
                                >
                                    {op.code.map((line, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -5 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.07, duration: 0.2 }}
                                            className="leading-5"
                                            style={{
                                                color: line.kind === 'comment'
                                                    ? '#8B8B90'
                                                    : '#E5E5E5',
                                            }}
                                        >
                                            {line.text}
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>
                        </div>

                        {/* Operation description */}
                        <div className="bg-[#0D0D0F] border border-[#1E1E22] rounded-lg p-4">
                            <motion.p
                                key={op.id + '-desc'}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="text-[#8B8B90] text-[11px] leading-relaxed"
                            >
                                {op.desc}
                            </motion.p>
                        </div>

                        {/* Live runtime stats */}
                        <div className="grid grid-cols-2 gap-2">
                            {[
                                {
                                    label: 'Active Ptr',
                                    value: CELLS[activeCell].addrFull,
                                    color: '#00E5FF',
                                },
                                {
                                    label: 'Operation',
                                    value: op.tag,
                                    color: op.accent,
                                },
                                {
                                    label: 'Cells Written',
                                    value: `${writtenCount} / ${TOTAL}`,
                                    color: '#00E5FF',
                                },
                                {
                                    label: 'Step',
                                    value: step.toString().padStart(4, '0'),
                                    color: '#00E5FF',
                                },
                            ].map(({ label, value, color }) => (
                                <div
                                    key={label}
                                    className="bg-[#0D0D0F] border border-[#1E1E22] rounded p-2.5"
                                >
                                    <p className="font-mono text-[8px] text-[#8B8B90] uppercase tracking-wide mb-0.5">
                                        {label}
                                    </p>
                                    <p
                                        className="font-mono text-[10px] font-medium truncate"
                                        style={{ color }}
                                    >
                                        {value}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* ── Bottom caption ── */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="font-mono text-[11px] text-[#8B8B90] text-center mt-10 tracking-widest uppercase"
                >
                    Direct memory access · Deterministic performance · Zero abstraction penalty
                </motion.p>
            </div>
        </section>
    );
};

export default MemoryVisualizer;
