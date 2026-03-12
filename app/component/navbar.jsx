'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: "Home", href: "/" },
        { label: "Projects", href: "/#projects" },
        { label: "Engineering Insights", href: "/insights" },
        { label: "Contact", href: "/#contact" },
    ];

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-[#0B0B0C]/90 backdrop-blur-md border-b border-[#1E1E22]" : ""}`}>
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="font-mono text-[#00E5FF] text-sm font-medium tracking-widest hover:opacity-75 transition-opacity">
                    sg<span className="text-[#8B8B90]">.dev</span>
                </Link>

                {/* Desktop Nav */}
                <ul className="hidden md:flex items-center gap-7">
                    {navLinks.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className="text-[#8B8B90] text-sm font-medium hover:text-[#E5E5E5] transition-colors duration-200 tracking-wide whitespace-nowrap"
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Hire Me CTA */}
                <a
                    href="mailto:shubhamgavkare07@gmail.com?subject=Hiring%20Inquiry"
                    className="hidden md:block font-mono text-xs bg-[#00E5FF] text-[#0B0B0C] px-4 py-2 rounded font-bold hover:shadow-[0_0_22px_rgba(0,229,255,0.45)] hover:bg-[#00E5FF]/90 transition-all duration-200"
                >
                    Hire Me
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
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMenuOpen(false)}
                            className="block text-sm text-[#8B8B90] hover:text-[#E5E5E5] transition-colors"
                        >
                            {item.label}
                        </Link>
                    ))}
                    <a
                        href="mailto:shubhamgavkare07@gmail.com?subject=Hiring%20Inquiry"
                        className="block font-mono text-xs text-[#00E5FF] font-bold pt-1"
                    >
                        Hire Me →
                    </a>
                </div>
            )}
        </nav>
    );
};

export default Navbar;