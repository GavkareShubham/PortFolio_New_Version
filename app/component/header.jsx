'use client'
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import ProfileSystemPanel from './ProfileSystemPanel';

// Infrastructure system nodes shown in hero background
const OFFSET_X = 26;

const NODES = [
    { id: 'market-data', label: 'Market Data', x: 10 + OFFSET_X, y: 22, color: '#8B5CF6' },
    { id: 'order-engine', label: 'Order Engine', x: 22 + OFFSET_X, y: 68, color: '#00E5FF' },
    { id: 'fix-gateway', label: 'FIX Gateway', x: 6 + OFFSET_X, y: 50, color: '#00E5FF' },
    { id: 'exec-router', label: 'Exec Router', x: 35 + OFFSET_X, y: 35, color: '#28C840' },
    { id: 'risk-engine', label: 'Risk Engine', x: 18 + OFFSET_X, y: 84, color: '#F59E0B' },
];

const EDGES = [
    ['market-data', 'fix-gateway'],
    ['fix-gateway', 'order-engine'],
    ['order-engine', 'exec-router'],
    ['order-engine', 'risk-engine'],
    ['market-data', 'exec-router'],
];

// const SystemNodes = () => {
//     const nodeMap = Object.fromEntries(NODES.map(n => [n.id, n]));
//     return (
//         <div className="absolute inset-0 overflow-hidden pointer-events-none scale-90">
//             <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
//                 {EDGES.map(([a, b]) => {
//                     const na = nodeMap[a];
//                     const nb = nodeMap[b];
//                     return (
//                         <motion.line
//                             key={`${a}-${b}`}
//                             x1={`${na.x}%`} y1={`${na.y}%`}
//                             x2={`${nb.x}%`} y2={`${nb.y}%`}
//                             stroke="#1E1E26" strokeWidth="1"
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             transition={{ duration: 1.5, delay: 0.6 }}
//                         />
//                     );
//                 })}
//             </svg>
//             {NODES.map((node, i) => (
//                 <motion.div
//                     key={node.id}
//                     className="absolute flex flex-col items-center gap-1"
//                     style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
//                     animate={{ y: [0, -5, 0] }}
//                     transition={{ duration: 4 + i * 0.8, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
//                     initial={{ opacity: 0 }}
//                     whileInView={{ opacity: 1 }}
//                     viewport={{ once: true }}
//                 >
//                     <div
//                         className="w-2 h-2 rounded-full"
//                         style={{ backgroundColor: node.color, boxShadow: `0 0 8px ${node.color}80` }}
//                     />
//                     <span className="font-mono text-[8px] whitespace-nowrap" style={{ color: node.color, opacity: 0.5 }}>
//                         {node.label}
//                     </span>
//                 </motion.div>
//             ))}
//         </div>
//     );
// };

const BADGES = ['Multithreading', 'Distributed Systems', 'Low Latency', 'FIX Protocol'];

const Hero = () => {
    const heroRef = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    const panelX = useTransform(springX, [-1, 1], [-12, 12]);
    const panelY = useTransform(springY, [-1, 1], [-8, 8]);

    const handleMouseMove = (e) => {
        const rect = heroRef.current?.getBoundingClientRect();
        if (!rect) return;
        mouseX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
        mouseY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };

    return (
        <section
            id="top"
            ref={heroRef}
            onMouseMove={handleMouseMove}
            className="relative min-h-screen flex items-center pt-20 pb-12 overflow-hidden"
        >
            {/* Background system nodes */}
            {/* <SystemNodes /> */}

            <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

                    {/* Left column: text content */}
                    <div>
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="font-mono text-[#00E5FF] text-[11px] tracking-[0.25em] uppercase mb-6 block"
                        >
                            Open to opportunities
                        </motion.span>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-5xl sm:text-6xl font-bold text-[#E5E5E5] tracking-tight leading-[1.08] mb-3"
                        >
                            Shubham<br />Gavkare
                        </motion.h1>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="font-mono text-base text-[#8B5CF6] mb-4 font-medium tracking-wide"
                        >
                            C++ Systems Engineer
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.28 }}
                            className="text-[#8B8B90] text-sm leading-relaxed mb-6 max-w-md"
                        >
                            Building low-latency systems where microseconds matter.
                        </motion.p>

                        {/* Domain badges */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.35 }}
                            className="flex flex-wrap gap-2 mb-8"
                        >
                            {BADGES.map((badge) => (
                                <span
                                    key={badge}
                                    className="font-mono text-[10px] px-2.5 py-1 bg-[#121214] border border-[#1E1E22] text-[#8B8B90] rounded hover:border-[#00E5FF]/30 hover:text-[#00E5FF] transition-all duration-200 cursor-default"
                                >
                                    {badge}
                                </span>
                            ))}
                        </motion.div>

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

                    {/* Right column: profile system panel with mouse parallax */}
                    <motion.div
                        style={{ x: panelX, y: panelY }}
                        initial={{ opacity: 0, x: 32 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.9, delay: 0.5 }}
                        className="flex justify-center lg:justify-end"
                    >
                        <ProfileSystemPanel />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

