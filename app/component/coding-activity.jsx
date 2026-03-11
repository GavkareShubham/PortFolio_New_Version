'use client'
import React from 'react';
import { motion } from 'framer-motion';

const CodingActivity = () => {
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
                        Coding Activity
                    </span>
                    <h2 className="text-3xl font-bold text-[#E5E5E5]">GitHub &amp; LeetCode</h2>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-5">
                    {/* GitHub contribution graph */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-[#121214] border border-[#1E1E22] rounded-lg p-6 hover:border-[#00E5FF]/20 transition-colors duration-300"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-[#E5E5E5] font-medium text-sm">GitHub Activity</h3>
                            <a
                                href="https://github.com/GavkareShubham"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-mono text-[11px] text-[#00E5FF] hover:opacity-75 transition-opacity"
                            >
                                @GavkareShubham ↗
                            </a>
                        </div>
                        {/* GitHub contribution chart */}
                        <img
                            src="https://ghchart.rshah.org/00E5FF/GavkareShubham"
                            alt="GitHub contribution chart for GavkareShubham"
                            className="w-full rounded opacity-80 hover:opacity-100 transition-opacity"
                            loading="lazy"
                            width="600"
                            height="110"
                        />
                        <p className="font-mono text-[9px] text-[#8B8B90] mt-3 text-center tracking-wide">
                            Contribution activity · past 12 months
                        </p>
                    </motion.div>

                    {/* LeetCode stats card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="bg-[#121214] border border-[#1E1E22] rounded-lg p-6 hover:border-[#8B5CF6]/20 transition-colors duration-300"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-[#E5E5E5] font-medium text-sm">LeetCode Stats</h3>
                            <a
                                href="https://leetcode.com/u/shubhamgavkare/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-mono text-[11px] text-[#8B5CF6] hover:opacity-75 transition-opacity"
                            >
                                @shubhamgavkare ↗
                            </a>
                        </div>
                        <img
                            src="https://leetcard.jacoblin.cool/shubhamgavkare?theme=dark&ext=contest&border=0&radius=6&font=JetBrains+Mono"
                            alt="LeetCode statistics for shubhamgavkare"
                            className="w-full rounded"
                            loading="lazy"
                            width="600"
                            height="200"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CodingActivity;
