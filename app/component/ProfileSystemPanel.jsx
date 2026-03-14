'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import userImage from '@/assets/user_image.jpg';

const METRICS = [
    { label: 'CPU Threads', value: '8' },
    { label: 'Memory Access', value: 'Direct' },
    { label: 'Latency Target', value: '< 10µs' },
    { label: 'Language', value: 'C++23' },
];

// Dot positions calculated once at module level
const THREAD_DOTS = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * 2 * Math.PI;
    return {
        id: i,
        cx: 50 + 50 * Math.cos(angle),
        cy: 50 + 50 * Math.sin(angle),
        highlight: i % 3 === 0,
    };
});

// Corner bracket SVG overlay aligned to the image frame
const CornerBrackets = ({ orbitSize, imageSize }) => {
    const pad = (orbitSize - imageSize) / 2;
    const gap = 12;
    const arm = 22;
    const x0 = pad - gap;
    const y0 = pad - gap;
    const x1 = orbitSize - pad + gap;
    const y1 = orbitSize - pad + gap;

    return (
        <svg
            className="absolute inset-0 pointer-events-none"
            width={orbitSize}
            height={orbitSize}
            viewBox={`0 0 ${orbitSize} ${orbitSize}`}
            fill="none"
        >
            {/* TL */}
            <path d={`M${x0 + arm},${y0} H${x0} V${y0 + arm}`} stroke="#00E5FF" strokeWidth="2" strokeOpacity="0.9" strokeLinecap="square" />
            {/* TR */}
            <path d={`M${x1 - arm},${y0} H${x1} V${y0 + arm}`} stroke="#00E5FF" strokeWidth="2" strokeOpacity="0.9" strokeLinecap="square" />
            {/* BL */}
            <path d={`M${x0},${y1 - arm} V${y1} H${x0 + arm}`} stroke="#00E5FF" strokeWidth="2" strokeOpacity="0.9" strokeLinecap="square" />
            {/* BR */}
            <path d={`M${x1 - arm},${y1} H${x1} V${y1 - arm}`} stroke="#00E5FF" strokeWidth="2" strokeOpacity="0.9" strokeLinecap="square" />
        </svg>
    );
};

// Face detection grid drawn inside the circular image
const FaceGrid = () => (
    <div className="absolute inset-0 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            {Array.from({ length: 8 }, (_, i) => (
                <line
                    key={`h${i}`}
                    x1="0" y1={(i + 1) * 22}
                    x2="200" y2={(i + 1) * 22}
                    stroke="#00E5FF" strokeWidth="0.5" strokeOpacity="0.18"
                />
            ))}
            {Array.from({ length: 8 }, (_, i) => (
                <line
                    key={`v${i}`}
                    x1={(i + 1) * 22} y1="0"
                    x2={(i + 1) * 22} y2="200"
                    stroke="#00E5FF" strokeWidth="0.5" strokeOpacity="0.18"
                />
            ))}
            {/* Centre crosshair */}
            <line x1="100" y1="80" x2="100" y2="120" stroke="#00E5FF" strokeWidth="0.8" strokeOpacity="0.35" />
            <line x1="80" y1="100" x2="120" y2="100" stroke="#00E5FF" strokeWidth="0.8" strokeOpacity="0.35" />
            <circle cx="100" cy="100" r="18" stroke="#00E5FF" strokeWidth="0.6" strokeOpacity="0.25" fill="none" />
        </svg>
    </div>
);

const ProfileSystemPanel = () => {
    const [hovered, setHovered] = useState(false);

    const FRAME = 224;       // px — profile image diameter
    const ORBIT_EXTRA = 44;  // px — how far orbiting dots extend beyond frame
    const ORBIT = FRAME + ORBIT_EXTRA * 2;  // 312px total

    return (
        <div className="relative flex flex-col items-center gap-6 select-none">

            {/* ── Orbit + image wrapper ── */}
            <div
                className="relative flex items-center justify-center"
                style={{ width: ORBIT, height: ORBIT }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                {/* Ambient glow behind image */}
                <div
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        inset: ORBIT_EXTRA,
                        background: 'radial-gradient(circle, rgba(0,229,255,0.1) 0%, transparent 70%)',
                        boxShadow: '0 0 60px rgba(0,229,255,0.18), 0 0 120px rgba(0,229,255,0.07)',
                        borderRadius: '50%',
                    }}
                />

                {/* Outer rotating dashed ring */}
                <motion.div
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        inset: 6,
                        border: '1px dashed rgba(0,229,255,0.22)',
                        borderRadius: '50%',
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
                />

                {/* Inner counter-rotating ring */}
                <motion.div
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        inset: 0,
                        border: '1px solid rgba(0,229,255,0.07)',
                        borderRadius: '50%',
                    }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
                />

                {/* CPU thread orbit — 8 dots spinning in a group */}
                <motion.div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: hovered ? 5 : 14,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                >
                    {THREAD_DOTS.map((d) => (
                        <div
                            key={d.id}
                            className="absolute rounded-full"
                            style={{
                                left: `${d.cx}%`,
                                top: `${d.cy}%`,
                                width: d.highlight ? 8 : 5,
                                height: d.highlight ? 8 : 5,
                                transform: 'translate(-50%, -50%)',
                                backgroundColor: '#00E5FF',
                                boxShadow: d.highlight
                                    ? '0 0 10px rgba(0,229,255,1), 0 0 22px rgba(0,229,255,0.5)'
                                    : '0 0 6px rgba(0,229,255,0.7)',
                                opacity: d.highlight ? 1 : 0.55,
                            }}
                        />
                    ))}
                </motion.div>

                {/* ── Profile image frame ── */}
                <motion.div
                    className="relative rounded-full overflow-hidden"
                    style={{
                        width: FRAME,
                        height: FRAME,
                        border: '2px solid rgba(0,229,255,0.25)',
                        boxShadow: '0 0 32px rgba(0,229,255,0.2), 0 0 64px rgba(0,229,255,0.07)',
                        borderRadius: '50%',
                    }}
                    animate={{ y: [0, -9, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <Image
                        src={userImage}
                        alt="Shubham Gavkare"
                        fill
                        className="object-cover object-top"
                        priority
                    />

                    {/* Face detection grid */}
                    <FaceGrid />

                    {/* Thin gradient overlay */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{ background: 'linear-gradient(to bottom, rgba(0,229,255,0.04) 0%, rgba(0,0,0,0.15) 100%)' }}
                    />

                    {/* Neural scan line */}
                    <motion.div
                        className="absolute inset-x-0 pointer-events-none"
                        style={{
                            height: 2,
                            background: 'linear-gradient(90deg, transparent 0%, rgba(0,229,255,0.7) 30%, rgba(0,229,255,1) 50%, rgba(0,229,255,0.7) 70%, transparent 100%)',
                            filter: 'blur(1px)',
                            boxShadow: '0 0 10px rgba(0,229,255,0.5)',
                        }}
                        animate={{ top: ['6%', '92%', '6%'] }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
                    />
                </motion.div>

                {/* Corner brackets aligned to image frame */}
                <CornerBrackets orbitSize={ORBIT} imageSize={FRAME} />

                {/* Status badge — bottom right */}
                <motion.div
                    className="absolute flex items-center gap-1.5 bg-[#0F0F11]/90 border border-[#1E1E22] rounded px-2.5 py-1.5"
                    style={{ bottom: ORBIT_EXTRA - 6, right: ORBIT_EXTRA - 14 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 }}
                >
                    <div
                        className="w-1.5 h-1.5 rounded-full bg-[#28C840]"
                        style={{ boxShadow: '0 0 6px rgba(40,200,64,0.8)' }}
                    />
                    <span className="font-mono text-[9px] text-[#8B8B90] uppercase tracking-wider">ONLINE</span>
                </motion.div>

                {/* Thread count badge — top right */}
                <motion.div
                    className="absolute bg-[#0F0F11]/90 border border-[#00E5FF]/20 rounded px-2.5 py-1.5"
                    style={{ top: ORBIT_EXTRA - 6, right: ORBIT_EXTRA - 20 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 }}
                >
                    <span className="font-mono text-[9px] text-[#00E5FF] uppercase tracking-wider">
                        THREADS: 8
                    </span>
                </motion.div>

                {/* Latency badge — top left */}
                <motion.div
                    className="absolute bg-[#0F0F11]/90 border border-[#8B5CF6]/20 rounded px-2.5 py-1.5"
                    style={{ top: ORBIT_EXTRA - 6, left: ORBIT_EXTRA - 20 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.4 }}
                >
                   
                </motion.div>
            </div>

            {/* ── System metrics panel ── */}
            <div className="grid grid-cols-2 gap-2" style={{ width: ORBIT }}>
                {METRICS.map((m, i) => (
                    <motion.div
                        key={m.label}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 + i * 0.1 }}
                        className="bg-[#121214] border border-[#1E1E22] rounded px-3 py-2.5 hover:border-[#00E5FF]/20 transition-colors duration-200"
                    >
                        <p className="font-mono text-[#8B8B90] text-[9px] uppercase tracking-wider leading-none">
                            {m.label}
                        </p>
                        <p className="font-mono text-[#00E5FF] text-xs font-semibold mt-1">
                            {m.value}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ProfileSystemPanel;
