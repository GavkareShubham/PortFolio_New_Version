import React from 'react';

const Footer = () => {
    const links = [
        { label: 'GitHub', href: 'https://github.com/GavkareShubham' },
        { label: 'LinkedIn', href: 'https://linkedin.com/in/shubhamgavkare' },
        { label: 'LeetCode', href: 'https://leetcode.com/u/shubhamgavkare/' },
    ];

    return (
        <footer className="border-t border-[#1E1E22] py-8">
            <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <span className="font-mono text-[#00E5FF] text-xs">sg.dev</span>
                    <span className="text-[#1E1E22]">·</span>
                    <span className="font-mono text-[#8B8B90] text-xs"><p className="text-[#8B8B90] text-xs">
                        © {new Date().getFullYear()} Shubham Gavkare
                    </p></span>
                </div>
                <div className="flex items-center gap-6">
                    {links.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-xs text-[#8B8B90] hover:text-[#E5E5E5] transition-colors duration-200"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
