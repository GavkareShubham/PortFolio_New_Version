'use client'
import React from 'react'
import Navbar from './component/navbar'
import Hero from './component/header'
import Metrics from './component/metrics'
import Projects from './component/projects'
import Architecture from './component/architecture'
import Experience from './component/experience'
import CodingActivity from './component/coding-activity'
import Contact from './component/contact'
import Footer from './component/footer'

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
        <Architecture />
        <Experience />
        <CodingActivity />
        <Contact />
        <Footer />
      </div>
    </main>
  )
}

export default Page