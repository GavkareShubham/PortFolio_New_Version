'use client'
import React, { useEffect, useState } from "react";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: "Home", href: "#top" },
        { label: "Projects", href: "#projects" },
        { label: "Contact", href: "#contact" },
    ];

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-[#0B0B0C]/90 backdrop-blur-md border-b border-[#1E1E22]" : ""}`}>
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <a href="#top" className="font-mono text-[#00E5FF] text-sm font-medium tracking-widest hover:opacity-75 transition-opacity">
                    sg<span className="text-[#8B8B90]">.dev</span>
                </a>

                {/* Desktop Nav */}
                <ul className="hidden md:flex items-center gap-8">
                    {navLinks.map((item) => (
                        <li key={item.href}>
                            <a
                                href={item.href}
                                className="text-[#8B8B90] text-sm font-medium hover:text-[#E5E5E5] transition-colors duration-200 tracking-wide"
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* GitHub CTA */}
                <a
                    href="https://github.com/GavkareShubham"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden md:block font-mono text-xs border border-[#1E1E22] text-[#00E5FF] px-4 py-2 rounded hover:border-[#00E5FF]/40 hover:bg-[#00E5FF]/5 transition-all duration-200"
                >
                    GitHub ↗
                </a>

                {/* Mobile menu button */}
                <button
                    className="md:hidden text-[#8B8B90] hover:text-[#E5E5E5] transition-colors"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {menuOpen
                            ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                            : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                        }
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-[#121214] border-b border-[#1E1E22] px-6 py-4 space-y-3">
                    {navLinks.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            onClick={() => setMenuOpen(false)}
                            className="block text-sm text-[#8B8B90] hover:text-[#E5E5E5] transition-colors"
                        >
                            {item.label}
                        </a>
                    ))}
                    <a
                        href="https://github.com/GavkareShubham"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block font-mono text-xs text-[#00E5FF] pt-1"
                    >
                        GitHub ↗
                    </a>
                </div>
            )}
        </nav>
    );
};

export default Navbar;