'use client'
import React from 'react';
import { motion } from 'framer-motion';

const experiences = [
    {
        role: 'Associate Software Developer',
        company: 'FlexTrade Systems',
        period: 'Nov 2025 – Present',
        desc: 'Develop high-performance C++ trading infrastructure for the Fixed Income stack of FlexTRADER EMS used by institutional trading desks globally. Build market-data normalization layers integrating 40+ brokers and venues, translating venue-specific FIX dialects into unified internal protocols. Design low-latency event-driven pipelines for market data ingestion, asynchronous processing, and real-time order book aggregation while supporting end-to-end trade lifecycle including RFQ workflows, order routing, and execution reporting.',
        tags: ['C++20', 'FIX Protocol', 'Market Data', 'Multithreading', 'Linux'],
    },
    {
        role: 'Associate Engineer + Trainee',
        company: 'KPIT Technologies',
        period: 'Dec 2023 – Oct 2025',
        desc: 'Engineered backend systems and agentic AI workflows using LangGraph, Langflow, and RAG pipelines integrated with PostgreSQL + pgvector, improving automation accuracy and team productivity by 20%. Built high-performance C++ modules on Linux using STL, multithreading, and design patterns while optimizing CAN Bus communication via efficient bit-level manipulation and deterministic memory management. Developed containerized MCP servers and automated CI/CD pipelines with CMake, GitLab CI, and GitHub Actions.',
        tags: ['C++17/20', 'Docker', 'LangGraph', 'PostgreSQL', 'CI/CD'],
    },
];

const education = [
    {
        degree: 'B.Tech Information Technology',
        institution: 'JSPM Rajarshi Shahu College of Engineering',
        period: 'Aug 2020 – Jun 2024',
        note: 'Savitribai Phule Pune University · CGPA: 9.02/10 · Percentage: 82.7 · Relevant: Data Structures, Algorithms, OOP, Operating Systems',
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
                                    'Modern C++ (11/14/17/20)',
                                    'Go',
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
