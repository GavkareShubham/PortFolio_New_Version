'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';

// ── Config ──────────────────────────────────────────────────────────────────────────────
const ITEMS = [
    { id: 0, sym: 'OB₀', hint: 'price' },
    { id: 1, sym: 'OB₁', hint: 'qty'   },
    { id: 2, sym: 'OB₂', hint: 'side'  },
    { id: 3, sym: 'OB₃', hint: 'ts'    },
];
const EXTRA_SLOTS = 4;   // empty slots in new buffer to show expanded capacity
const COPY_MS     = 750; // ms between each copy operation (slow, expensive)
const MOVE_MS     = 160; // ms between each move operation (fast, cheap)

// ── Code snippets ───────────────────────────────────────────────────────────────────────
const COPY_CODE = [
    { t: 'struct OrderBook {',            k: 'kw'    },
    { t: '  std::vector<Order> orders;',  k: 'plain' },
    { t: '  // no move ctor declared',    k: 'cmt'   },
    { t: '  // vector uses copy ctor',    k: 'cmt'   },
    { t: '  // on every reallocation',    k: 'cmt'   },
    { t: '};',                            k: 'kw'    },
];
const MOVE_CODE = [
    { t: 'struct OrderBook {',              k: 'kw'     },
    { t: '  std::vector<Order> orders;',    k: 'plain'  },
    { t: '  OrderBook(OrderBook&& o)',       k: 'plain'  },
    { t: '      noexcept',                  k: 'accent' },
    { t: '  {',                             k: 'plain'  },
    { t: '    orders = std::move(o.orders);', k: 'plain' },
    { t: '  }',                             k: 'plain'  },
    { t: '};',                              k: 'kw'     },
];

// ── MemBlock ─────────────────────────────────────────────────────────────────────────────
// A single "object" in the vector — rendered as a memory block cell.
const MemBlock = ({ sym, hint, filled, accent, ghosted, empty }) => {
    const border = filled ? `${accent}55` : '#1a1a20';
    const bg     = filled ? `${accent}18` : empty ? 'transparent' : '#0A0A0C';
    const glow   = filled ? `0 0 14px ${accent}45` : 'none';

    return (
        <div
            className="flex flex-col items-center justify-center rounded shrink-0 select-none"
            style={{
                width: 50, height: 50,
                border         : `1px solid ${border}`,
                backgroundColor: bg,
                boxShadow      : glow,
                opacity        : ghosted ? 0.12 : 1,
                transition     : 'all 0.28s ease',
            }}
        >
            {filled && (
                <>
                    <span className="font-mono text-[10px] font-bold leading-tight" style={{ color: accent }}>
                        {sym}
                    </span>
                    <span className="font-mono text-[7px] text-[#8B8B90] mt-0.5">{hint}</span>
                </>
            )}
            {!filled && !empty && (
                <span className="font-mono text-[10px] text-[#2a2a30]">·</span>
            )}
        </div>
    );
};

// ── Panel ────────────────────────────────────────────────────────────────────────────────
// Renders one vector panel — "copy" or "move".
// `phase`: 0 = idle, 1..N = item [phase-1] transferred, >N = done
const Panel = ({ mode, phase }) => {
    const isCopy  = mode === 'copy';
    const accent  = isCopy ? '#F97316' : '#00E5FF';
    const n       = Math.min(phase, ITEMS.length); // how many transferred so far
    const done    = phase > ITEMS.length;
    const running = phase > 0 && !done;
    const code    = isCopy ? COPY_CODE : MOVE_CODE;
    const colorMap = {
        kw    : '#8B5CF6',
        cmt   : '#8B8B90',
        plain : '#E5E5E5',
        accent: accent,
    };

    return (
        <div className="flex-1 min-w-0 bg-[#121214] border border-[#1E1E22] rounded-lg p-5 flex flex-col gap-4">

            {/* Header badge */}
            <div className="flex items-center gap-2 flex-wrap">
                <span
                    className="font-mono text-[9px] font-bold px-2 py-0.5 rounded"
                    style={{ background: `${accent}20`, color: accent, border: `1px solid ${accent}35` }}
                >
                    {isCopy ? 'WITHOUT noexcept' : 'WITH noexcept'}
                </span>
                <span className="font-mono text-[9px] text-[#8B8B90]">
                    {isCopy ? '// forced to copy' : '// safe to move'}
                </span>
            </div>

            {/* Old buffer — source */}
            <div>
                <p className="font-mono text-[9px] text-[#8B8B90] mb-2">
                    <span className="text-[#2a2a30]">◂ </span>old_buf
                    <span className="text-[#2a2a30]"> [cap=4]</span>
                </p>
                <div className="flex gap-1.5">
                    {ITEMS.map(item => (
                        <MemBlock
                            key={item.id}
                            sym={item.sym}
                            hint={item.hint}
                            filled
                            accent={accent}
                            // copy: original stays (data duplicated); move: original ghosts out
                            ghosted={!isCopy && item.id < n}
                        />
                    ))}
                </div>
            </div>

            {/* Reallocation status divider */}
            <div className="flex items-center gap-2">
                <div className="flex-1 border-t border-dashed" style={{ borderColor: '#1E1E22' }} />
                <span
                    className="font-mono text-[8px] px-2 whitespace-nowrap transition-colors duration-300"
                    style={{ color: done ? '#28C840' : running ? accent : '#2a2a30' }}
                >
                    {done
                        ? '✓ realloc complete'
                        : running
                            ? (isCopy
                                ? `copy  ${n} / ${ITEMS.length}  ···`
                                : `move  ${n} / ${ITEMS.length}  ···`)
                            : 'realloc →'}
                </span>
                <div className="flex-1 border-t border-dashed" style={{ borderColor: '#1E1E22' }} />
            </div>

            {/* New buffer — destination */}
            <div>
                <p className="font-mono text-[9px] text-[#8B8B90] mb-2">
                    <span className="text-[#2a2a30]">▸ </span>new_buf
                    <span className="text-[#2a2a30]"> [cap=8]</span>
                </p>
                <div className="flex gap-1.5 flex-wrap">
                    {ITEMS.map(item => (
                        <MemBlock
                            key={item.id}
                            sym={item.sym}
                            hint={item.hint}
                            filled={item.id < n}
                            accent={accent}
                        />
                    ))}
                    {Array.from({ length: EXTRA_SLOTS }, (_, i) => (
                        <MemBlock key={`e${i}`} empty />
                    ))}
                </div>
            </div>

            {/* Code snippet */}
            <div className="bg-[#0D0D0F] border border-[#1E1E22] rounded-md p-3.5">
                <p className="font-mono text-[8px] text-[#8B8B90] mb-2 uppercase tracking-wider">
                    orderbook.hpp
                </p>
                {code.map((line, i) => (
                    <p
                        key={i}
                        className="font-mono text-[9px] sm:text-[10px] leading-5 whitespace-pre"
                        style={{ color: colorMap[line.k] }}
                    >
                        {line.t}
                    </p>
                ))}
            </div>

            {/* Runtime stats */}
            <div className="grid grid-cols-3 gap-2 border-t border-[#1E1E22] pt-3">
                {[
                    { k: 'ctor',   v: isCopy ? 'copy ctor'           : 'move ctor' },
                    { k: 'allocs', v: isCopy ? `${ITEMS.length + 1}×` : '1×'       },
                    { k: 'cost',   v: isCopy ? 'O(n)'                 : 'O(1)'     },
                ].map(({ k, v }) => (
                    <div key={k}>
                        <p className="font-mono text-[7px] uppercase tracking-wide text-[#8B8B90]">{k}</p>
                        <p
                            className="font-mono text-[10px] font-semibold mt-0.5 transition-colors duration-300"
                            style={{ color: done ? accent : '#3a3a45' }}
                        >
                            {v}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ── Comparison bar ────────────────────────────────────────────────────────────────────────
const ComparisonBar = ({ copyPhase, movePhase }) => {
    const copyDone = copyPhase > ITEMS.length;
    const moveDone = movePhase > ITEMS.length;

    const rows = [
        {
            label    : 'Mechanism',
            copy     : 'T::copy_constructor()',
            move     : 'T::move_constructor() noexcept',
            copyAccent: '#F97316',
            moveAccent: '#00E5FF',
        },
        {
            label    : 'Heap allocs',
            copy     : `${ITEMS.length + 1}× new/delete`,
            move     : '1× (new buffer only)',
            copyAccent: '#F97316',
            moveAccent: '#00E5FF',
        },
        {
            label    : 'Complexity',
            copy     : 'O(n) — copies every element',
            move     : 'O(1) — transfers ownership',
            copyAccent: '#F97316',
            moveAccent: '#00E5FF',
        },
        {
            label    : 'Exception safety',
            copy     : 'strong (can rollback)',
            move     : 'strong (noexcept guarantee)',
            copyAccent: '#F97316',
            moveAccent: '#00E5FF',
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="bg-[#121214] border border-[#1E1E22] rounded-lg overflow-hidden"
        >
            <div className="grid grid-cols-3 font-mono text-[9px] border-b border-[#1E1E22]">
                <div className="px-4 py-2.5 text-[#8B8B90] uppercase tracking-wider">Property</div>
                <div className="px-4 py-2.5 text-[#F97316] uppercase tracking-wider border-l border-[#1E1E22]">Without noexcept</div>
                <div className="px-4 py-2.5 text-[#00E5FF] uppercase tracking-wider border-l border-[#1E1E22]">With noexcept</div>
            </div>
            {rows.map((row) => (
                <div key={row.label} className="grid grid-cols-3 border-b border-[#1E1E22] last:border-0 hover:bg-[#0F0F11] transition-colors">
                    <div className="px-4 py-3 font-mono text-[10px] text-[#8B8B90]">{row.label}</div>
                    <div className="px-4 py-3 font-mono text-[10px] border-l border-[#1E1E22]" style={{ color: row.copyAccent }}>{row.copy}</div>
                    <div className="px-4 py-3 font-mono text-[10px] border-l border-[#1E1E22]" style={{ color: row.moveAccent }}>{row.move}</div>
                </div>
            ))}
        </motion.div>
    );
};

// ── Main Component ────────────────────────────────────────────────────────────────────────
const NoexceptMoveVisualizer = () => {
    const sectionRef = useRef(null);
    const inView     = useInView(sectionRef, { once: false, margin: '-80px' });
    const triggered  = useRef(false);

    const [runKey,    setRunKey]    = useState(0);
    const [copyPhase, setCopyPhase] = useState(0);
    const [movePhase, setMovePhase] = useState(0);

    // Kick off a fresh simulation run
    const run = useCallback(() => {
        setCopyPhase(0);
        setMovePhase(0);
        setRunKey(k => k + 1);
    }, []);

    // Auto-start on first scroll-into-view
    useEffect(() => {
        if (inView && !triggered.current) {
            triggered.current = true;
            run();
        }
    }, [inView, run]);

    // Copy stepping — slow (COPY_MS per item)
    useEffect(() => {
        if (runKey === 0) return;
        let step = 0;
        const t = setInterval(() => {
            step++;
            setCopyPhase(step);
            if (step >= ITEMS.length) clearInterval(t);
        }, COPY_MS);
        return () => clearInterval(t);
    }, [runKey]);

    // Move stepping — fast (MOVE_MS per item), 300ms head-start delay so
    // the user can observe both starting before move zooms past copy.
    useEffect(() => {
        if (runKey === 0) return;
        let step = 0;
        let inner;
        const outer = setTimeout(() => {
            inner = setInterval(() => {
                step++;
                setMovePhase(step);
                if (step >= ITEMS.length) clearInterval(inner);
            }, MOVE_MS);
        }, 320);
        return () => {
            clearTimeout(outer);
            clearInterval(inner);
        };
    }, [runKey]);

    return (
        <section className="py-24 border-t border-[#1E1E22]" ref={sectionRef}>
            <div className="max-w-6xl mx-auto px-6">

                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-10"
                >
                    <span className="font-mono text-[#00E5FF] text-[11px] tracking-[0.25em] uppercase mb-2 block">
                        C++ Semantics
                    </span>
                    <h2 className="text-3xl font-bold text-[#E5E5E5]">
                        noexcept: Copy vs Move
                    </h2>
                    <p className="text-[#8B8B90] text-sm mt-2 max-w-xl leading-relaxed">
                        C++ containers
                        {' '}<strong className="text-[#E5E5E5] font-medium">move</strong>{' '}
                        objects only when it is guaranteed safe—determined at compile time by the
                        {' '}<code className="font-mono text-[#00E5FF] text-xs bg-[#00E5FF]/5 px-1 rounded">noexcept</code>{' '}
                        specifier on the move constructor.
                    </p>
                </motion.div>

                {/* Timing comparison pill */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap gap-3 mb-6"
                >
                    {[
                        { label: 'Copy realloc', time: `${(ITEMS.length * COPY_MS / 1000).toFixed(1)}s`, accent: '#F97316' },
                        { label: 'Move realloc', time: `${(ITEMS.length * MOVE_MS / 1000).toFixed(1)}s`, accent: '#00E5FF' },
                        { label: 'Speedup',      time: `~${Math.round(COPY_MS / MOVE_MS)}×`,             accent: '#28C840' },
                    ].map(({ label, time, accent }) => (
                        <div
                            key={label}
                            className="font-mono text-[10px] px-3 py-1.5 rounded border flex items-center gap-2"
                            style={{ background: `${accent}10`, borderColor: `${accent}35`, color: accent }}
                        >
                            <span className="text-[#8B8B90]">{label}:</span>
                            <span className="font-bold">{time}</span>
                        </div>
                    ))}
                </motion.div>

                {/* Two simulation panels */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <motion.div
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="flex-1 flex"
                    >
                        <Panel mode="copy" phase={copyPhase} />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.05 }}
                        className="flex-1 flex"
                    >
                        <Panel mode="move" phase={movePhase} />
                    </motion.div>
                </div>

                {/* Comparison table */}
                <div className="mb-6">
                    <ComparisonBar copyPhase={copyPhase} movePhase={movePhase} />
                </div>

                {/* Replay button */}
                <div className="flex justify-center mb-10">
                    <button
                        onClick={run}
                        className="font-mono text-xs border border-[#1E1E22] text-[#8B8B90] px-5 py-2 rounded hover:border-[#00E5FF]/30 hover:text-[#E5E5E5] transition-all duration-200 hover:bg-[#00E5FF]/3"
                    >
                        ↺ &nbsp;Replay simulation
                    </button>
                </div>

                {/* Footer caption */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="font-mono text-[11px] text-[#8B8B90] text-center tracking-widest uppercase"
                >
                    One keyword can change how the entire container behaves.
                </motion.p>
            </div>
        </section>
    );
};

export default NoexceptMoveVisualizer;
