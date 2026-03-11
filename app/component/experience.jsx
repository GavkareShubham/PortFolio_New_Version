'use client'
import React from 'react';
import { motion } from 'framer-motion';

const experiences = [
    {
        role: 'C++ Systems Developer',
        company: 'Trading Infrastructure',
        period: '2023 – Present',
        desc: 'Designed and optimized lock-free order book engines and FIX protocol session layers for high-frequency trading. Reduced critical-path latency from 200µs to under 50µs through cache-aware data structures and CPU affinity pinning.',
        tags: ['C++20', 'FIX Protocol', 'Lock-Free', 'Linux', 'CPU Affinity'],
    },
    {
        role: 'Software Engineer — Market Data',
        company: 'Systems Engineering',
        period: '2022 – 2023',
        desc: 'Built real-time ITCH 5.0 and OUCH feed handlers using UDP multicast with zero-copy ring-buffer processing. Implemented kernel-bypass networking achieving sub-10µs parse latency at 5M messages per second.',
        tags: ['C++17', 'UDP Multicast', 'ITCH 5.0', 'Multithreading', 'RDMA'],
    },
];

const education = [
    {
        degree: 'B.E. Computer Engineering',
        institution: 'Savitribai Phule Pune University',
        period: '2020 – 2024',
        note: 'GPA: 8.5/10 · Relevant: OS, Networks, Data Structures, Algorithms',
    },
];

const Experience = () => {
    return (
        <section className="py-24 border-t border-[#1E1E22]">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-10"
                >
                    <span className="font-mono text-[#00E5FF] text-[11px] tracking-[0.25em] uppercase mb-2 block">
                        Background
                    </span>
                    <h2 className="text-3xl font-bold text-[#E5E5E5]">Experience</h2>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Experience timeline */}
                    <div className="lg:col-span-2 space-y-4">
                        {experiences.map((exp, i) => (
                            <motion.div
                                key={exp.role}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className="bg-[#121214] border border-[#1E1E22] rounded-lg p-6 hover:border-[#8B5CF6]/20 transition-colors duration-300"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-1">
                                    <div>
                                        <h3 className="text-[#E5E5E5] font-semibold text-sm">{exp.role}</h3>
                                        <p className="text-[#8B8B90] text-xs mt-0.5">{exp.company}</p>
                                    </div>
                                    <span className="font-mono text-[11px] text-[#8B5CF6] shrink-0">{exp.period}</span>
                                </div>
                                <p className="text-[#8B8B90] text-xs leading-relaxed mb-4">{exp.desc}</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {exp.tags.map((tag) => (
                                        <span key={tag} className="font-mono text-[9px] px-2 py-0.5 bg-[#0F0F11] border border-[#1E1E22] text-[#8B8B90] rounded">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Education + skills sidebar */}
                    <div className="space-y-4">
                        {/* Education */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15, duration: 0.5 }}
                            className="bg-[#121214] border border-[#1E1E22] rounded-lg p-5"
                        >
                            <p className="font-mono text-[#00E5FF] text-[10px] tracking-widest uppercase mb-3">Education</p>
                            {education.map((edu) => (
                                <div key={edu.degree}>
                                    <p className="text-[#E5E5E5] text-sm font-medium">{edu.degree}</p>
                                    <p className="text-[#8B8B90] text-xs mt-0.5">{edu.institution}</p>
                                    <p className="font-mono text-[#8B5CF6] text-[10px] mt-1">{edu.period}</p>
                                    <p className="text-[#8B8B90] text-[10px] mt-2 leading-relaxed">{edu.note}</p>
                                </div>
                            ))}
                        </motion.div>

                        {/* Core skills */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="bg-[#121214] border border-[#1E1E22] rounded-lg p-5"
                        >
                            <p className="font-mono text-[#00E5FF] text-[10px] tracking-widest uppercase mb-3">Core Skills</p>
                            <div className="space-y-2">
                                {[
                                    'Modern C++ (17/20)',
                                    'Multithreading & Concurrency',
                                    'Lock-free Data Structures',
                                    'Network Programming',
                                    'Linux Systems Programming',
                                    'Performance Profiling',
                                    'Distributed Systems',
                                ].map((skill) => (
                                    <div key={skill} className="flex items-center gap-2">
                                        <div className="w-1 h-1 rounded-full bg-[#8B5CF6] shrink-0" />
                                        <span className="text-[#8B8B90] text-xs">{skill}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
