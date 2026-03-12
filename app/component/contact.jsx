'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setResult('');
        const formData = new FormData(event.target);
        formData.append('access_key', process.env.NEXT_PUBLIC_WEB3FORM_KEY);

        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();
        setLoading(false);

        if (data.success) {
            setResult('Message sent successfully.');
            event.target.reset();
        } else {
            setResult('Failed to send. Please try again.');
        }
    };

    const contactLinks = [
        {
            label: 'Email',
            value: 'shubhamgavkare07@gmail.com',
            href: 'mailto:shubhamgavkare07@gmail.com',
        },
        {
            label: 'LinkedIn',
            value: 'linkedin.com/in/shubhamgavkare',
            href: 'https://linkedin.com/in/shubhamgavkare',
        },
        {
            label: 'GitHub',
            value: 'github.com/GavkareShubham',
            href: 'https://github.com/GavkareShubham',
        },
    ];

    return (
        <section id="contact" className="py-24 border-t border-[#1E1E22]">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-10"
                >
                    <span className="font-mono text-[#00E5FF] text-[11px] tracking-[0.25em] uppercase mb-2 block">
                        Get In Touch
                    </span>
                    <h2 className="text-3xl font-bold text-[#E5E5E5]">Contact</h2>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Left â€” description + links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="text-[#8B8B90] text-sm leading-relaxed mb-8 max-w-md">
                            Building fast systems where performance matters. Always up for talking C++, Go, low-latency engineering, or cool system designs.
                        </p>

                        <div className="space-y-3">
                            {contactLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target={link.label !== 'Email' ? '_blank' : '_self'}
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between bg-[#121214] border border-[#1E1E22] rounded-lg px-5 py-3.5 hover:border-[#00E5FF]/20 transition-all duration-200 group"
                                >
                                    <span className="font-mono text-[11px] text-[#8B8B90] group-hover:text-[#E5E5E5] transition-colors">
                                        {link.label}
                                    </span>
                                    <span className="font-mono text-[11px] text-[#00E5FF] opacity-70 group-hover:opacity-100 transition-opacity">
                                        {link.value}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right â€” form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                    >
                        <form onSubmit={onSubmit} className="space-y-4">
                            <div>
                                <label className="font-mono text-[10px] text-[#8B8B90] tracking-widest uppercase block mb-1.5">
                                    name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    placeholder="Firstname Lastname"
                                    className="w-full bg-[#121214] border border-[#1E1E22] rounded-lg px-4 py-3 text-sm text-[#E5E5E5] placeholder-[#8B8B90]/40 focus:outline-none focus:border-[#00E5FF]/30 transition-colors font-mono"
                                />
                            </div>
                            <div>
                                <label className="font-mono text-[10px] text-[#8B8B90] tracking-widest uppercase block mb-1.5">
                                    email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="you@example.com"
                                    className="w-full bg-[#121214] border border-[#1E1E22] rounded-lg px-4 py-3 text-sm text-[#E5E5E5] placeholder-[#8B8B90]/40 focus:outline-none focus:border-[#00E5FF]/30 transition-colors font-mono"
                                />
                            </div>
                            <div>
                                <label className="font-mono text-[10px] text-[#8B8B90] tracking-widest uppercase block mb-1.5">
                                    message
                                </label>
                                <textarea
                                    name="message"
                                    required
                                    rows={5}
                                    placeholder="What's on your mind..."
                                    className="w-full bg-[#121214] border border-[#1E1E22] rounded-lg px-4 py-3 text-sm text-[#E5E5E5] placeholder-[#8B8B90]/40 focus:outline-none focus:border-[#00E5FF]/30 transition-colors font-mono resize-none"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full font-mono text-sm py-3 bg-[#00E5FF] text-[#0B0B0C] rounded font-semibold hover:bg-[#00E5FF]/90 transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,229,255,0.2)] disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Sending...' : 'Send Message →'}
                            </button>
                            {result && (
                                <p className="font-mono text-xs text-center text-[#8B8B90]">{result}</p>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
