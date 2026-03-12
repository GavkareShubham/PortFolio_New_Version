'use client'
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Navbar from './component/navbar'
import Hero from './component/header'
import Metrics from './component/metrics'
import Projects from './component/projects'
import Architecture from './component/architecture'
import Experience from './component/experience'
import CodingActivity from './component/coding-activity'
import Contact from './component/contact'
import Footer from './component/footer'

// Engineering Insights preview section on the home page
const INSIGHT_CARDS = [
  {
    slug: 'memory-access',
    title: 'Memory Access Visualization in C++',
    description: 'Pool allocation, cache-warm reads, lock-free CAS, and explicit deallocation — all visualized interactively.',
    tags: ['Pointers', 'Cache', 'Lock-Free'],
  },
  {
    slug: 'noexcept-copy-vs-move',
    title: 'noexcept: Copy vs Move',
    description: 'Why a single keyword changes std::vector reallocation from O(n) copies to O(1) pointer transfers.',
    tags: ['Move Semantics', 'noexcept', 'STL'],
  },
]

const InsightsPreview = () => (
  <section className="py-24 border-t border-[#1E1E22]">
    <div className="max-w-6xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
      >
        <div>
          <span className="font-mono text-[#00E5FF] text-[11px] tracking-[0.25em] uppercase mb-2 block">
            Engineering Notebook
          </span>
          <h2 className="text-3xl font-bold text-[#E5E5E5]">Engineering Insights</h2>
          <p className="text-[#8B8B90] text-sm mt-2 max-w-md">
            Deep dives into C++ internals with interactive visualizations.
          </p>
        </div>
        <Link
          href="/insights"
          className="font-mono text-xs border border-[#1E1E22] text-[#00E5FF] px-4 py-2 rounded hover:border-[#00E5FF]/40 hover:bg-[#00E5FF]/5 transition-all duration-200 whitespace-nowrap self-start sm:self-auto"
        >
          View all insights ↗
        </Link>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-5">
        {INSIGHT_CARDS.map((card, i) => (
          <motion.div
            key={card.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <Link href={`/insights/${card.slug}`} className="block h-full">
              <div className="h-full bg-[#121214] border border-[#1E1E22] rounded-lg p-6 hover:border-[#00E5FF]/25 hover:-translate-y-1 transition-all duration-300 group flex flex-col">
                <h3 className="text-[#E5E5E5] font-semibold text-sm leading-snug mb-2 group-hover:text-[#00E5FF] transition-colors duration-200">
                  {card.title}
                </h3>
                <p className="text-[#8B8B90] text-xs leading-relaxed flex-1 mb-4">
                  {card.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {card.tags.map(tag => (
                    <span key={tag} className="font-mono text-[9px] px-2 py-0.5 bg-[#0F0F11] border border-[#1E1E22] text-[#8B5CF6] rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

const Page = () => {
  return (
    <main className="relative min-h-screen bg-[#0B0B0C]">
      {/* Engineering grid background */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            'linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.07,
        }}
      />
      {/* Radial glow from top */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,229,255,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Metrics />
        <Projects />
        {/* <Architecture /> */}
        <InsightsPreview />
        <Experience />
        <CodingActivity />
        <Contact />
        <Footer />
      </div>
    </main>
  )
}

export default Page
