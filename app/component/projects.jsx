'use client'
import React from 'react';
import { motion } from 'framer-motion';

const GithubIcon = () => (
    <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
);

const projects = [
    {
        title: 'Mini Kafka Distributed Queue',
        summary: 'Lightweight distributed message queue inspired by Kafka with topic partitions, consumer groups, and persistent logs. Containerized using Docker and implemented in Go.',
        tech: ['Go', 'C++', 'Docker', 'Distributed Systems', 'DSA'],
        metrics: [
            { val: 'Topic-based', lbl: 'message routing' },
            { val: 'Consumer groups', lbl: 'parallel processing' },
            { val: 'Log-based', lbl: 'message storage' },
        ],
        github: 'https://github.com/GavkareShubham',
    },
    {
        title: 'Vehicle Tracking & Lane Departure System',
        summary: 'Real-time vehicle detection, tracking, and speed estimation system built with OpenCV using Haar cascades and KCF trackers. Includes lane-departure warning via robust lane marking detection with fault-tolerant diagnostics.',
        tech: ['C++17', 'OpenCV', 'STL', 'Image Processing'],
        metrics: [
            { val: 'Real-time', lbl: 'video processing' },
            { val: '20% fewer', lbl: 'system errors' },
            { val: 'Modular', lbl: 'OOP design' },
        ],
        github: 'https://github.com/GavkareShubham',
    },
    {
        title: 'Brain Tumor Classification System',
        summary: 'Machine learning pipeline for brain tumor detection using HOG feature extraction and PCA-based dimensionality reduction with XGBoost classification. Deployed using Anvil with MongoDB backend.',
        tech: ['Python', 'XGBoost', 'HOG', 'MongoDB'],
        metrics: [
            { val: 'ML pipeline', lbl: 'architecture' },
            { val: 'PCA', lbl: 'dimensionality reduction' },
            { val: 'Cloud-ready', lbl: 'deployment' },
        ],
        github: 'https://github.com/GavkareShubham',
    },
];

const ProjectCard = ({ project, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.08, duration: 0.5 }}
        className="group bg-[#121214] border border-[#1E1E22] rounded-lg p-6 hover:border-[#00E5FF]/20 transition-all duration-300 flex flex-col"
    >
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
            <h3 className="text-[#E5E5E5] font-semibold text-sm leading-snug group-hover:text-[#00E5FF] transition-colors duration-200 pr-2">
                {project.title}
            </h3>
            <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8B8B90] hover:text-[#E5E5E5] transition-colors shrink-0 mt-0.5"
                aria-label="View on GitHub"
            >
                <GithubIcon />
            </a>
        </div>

        {/* Summary */}
        <p className="text-[#8B8B90] text-xs leading-relaxed mb-4 flex-1">{project.summary}</p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.map((t) => (
                <span key={t} className="font-mono text-[10px] px-2 py-0.5 bg-[#0F0F11] border border-[#1E1E22] text-[#8B5CF6] rounded">
                    {t}
                </span>
            ))}
        </div>

        {/* Metrics */}
        <div className="border-t border-[#1E1E22] pt-3 grid grid-cols-3 gap-2">
            {project.metrics.map((m) => (
                <div key={m.lbl}>
                    <p className="font-mono text-[#00E5FF] text-[11px] font-medium">{m.val}</p>
                    <p className="text-[#8B8B90] text-[9px] capitalize mt-0.5">{m.lbl}</p>
                </div>
            ))}
        </div>
    </motion.div>
);

const Projects = () => {
    return (
        <section id="projects" className="py-24 border-t border-[#1E1E22]">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-10"
                >
                    <span className="font-mono text-[#00E5FF] text-[11px] tracking-[0.25em] uppercase mb-2 block">
                        Featured Work
                    </span>
                    <h2 className="text-3xl font-bold text-[#E5E5E5]">Projects</h2>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-4">
                    {projects.map((project, i) => (
                        <ProjectCard key={project.title} project={project} index={i} />
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="mt-8 text-center"
                >
                    <a
                        href="https://github.com/GavkareShubham"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-[#8B8B90] hover:text-[#00E5FF] transition-colors"
                    >
                        View all repositories on GitHub →
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
