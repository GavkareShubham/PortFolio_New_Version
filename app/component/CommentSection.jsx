'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CommentSection = ({ slug }) => {
    const [comments, setComments] = useState([]);
    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        try {
            const stored = localStorage.getItem(`comments_${slug}`);
            if (stored) setComments(JSON.parse(stored));
        } catch {
            // localStorage unavailable in some environments
        }
    }, [slug]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmedName = name.trim();
        const trimmedText = text.trim();
        if (!trimmedName || !trimmedText) return;

        const newComment = {
            id: Date.now(),
            name: trimmedName,
            text: trimmedText,
            timestamp: new Date().toISOString(),
        };

        const updated = [...comments, newComment];
        setComments(updated);
        try {
            localStorage.setItem(`comments_${slug}`, JSON.stringify(updated));
        } catch { /* silent */ }

        setName('');
        setText('');
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <section className="mt-16 border-t border-[#1E1E22] pt-12">
            <div className="flex items-center gap-3 mb-8">
                <span className="font-mono text-[#00E5FF] text-[11px] tracking-[0.2em] uppercase">Discussion</span>
                {comments.length > 0 && (
                    <span className="font-mono text-[9px] px-2 py-0.5 bg-[#121214] border border-[#1E1E22] text-[#8B8B90] rounded">
                        {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
                    </span>
                )}
            </div>

            {/* Existing comments */}
            {comments.length > 0 && (
                <div className="space-y-4 mb-10">
                    {comments.map((c) => (
                        <motion.div
                            key={c.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-[#121214] border border-[#1E1E22] rounded-lg p-4"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-mono text-[#00E5FF] text-xs font-medium">{c.name}</span>
                                <span className="font-mono text-[#8B8B90] text-[10px]">
                                    {new Date(c.timestamp).toLocaleDateString('en-US', {
                                        month: 'short', day: 'numeric', year: 'numeric',
                                    })}
                                </span>
                            </div>
                            <p className="text-[#8B8B90] text-sm leading-relaxed">{c.text}</p>
                        </motion.div>
                    ))}
                </div>
            )}

            {comments.length === 0 && (
                <p className="text-[#8B8B90] text-sm mb-8 font-mono">No comments yet. Be the first to contribute.</p>
            )}

            {/* Comment form */}
            <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
                <div>
                    <label className="font-mono text-[#8B8B90] text-[10px] uppercase tracking-wider mb-1.5 block">
                        Name
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        maxLength={60}
                        required
                        className="w-full bg-[#121214] border border-[#1E1E22] rounded px-4 py-2.5 text-[#E5E5E5] text-sm font-mono placeholder-[#3a3a40] focus:outline-none focus:border-[#00E5FF]/40 transition-colors duration-200"
                    />
                </div>
                <div>
                    <label className="font-mono text-[#8B8B90] text-[10px] uppercase tracking-wider mb-1.5 block">
                        Comment
                    </label>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Suggestions, corrections, or thoughts..."
                        maxLength={1000}
                        required
                        rows={4}
                        className="w-full bg-[#121214] border border-[#1E1E22] rounded px-4 py-2.5 text-[#E5E5E5] text-sm font-mono placeholder-[#3a3a40] focus:outline-none focus:border-[#00E5FF]/40 transition-colors duration-200 resize-none"
                    />
                </div>
                <div className="flex items-center gap-4">
                    <button
                        type="submit"
                        className="font-mono text-xs bg-[#00E5FF] text-[#0B0B0C] px-5 py-2.5 rounded font-bold hover:shadow-[0_0_20px_rgba(0,229,255,0.35)] hover:bg-[#00E5FF]/90 transition-all duration-200"
                    >
                        Post Comment
                    </button>
                    <AnimatePresence>
                        {submitted && (
                            <motion.span
                                initial={{ opacity: 0, x: -4 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0 }}
                                className="font-mono text-[#28C840] text-xs"
                            >
                                Comment posted.
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>
            </form>
        </section>
    );
};

export default CommentSection;
