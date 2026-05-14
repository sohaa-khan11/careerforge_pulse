"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Navbar } from "@/components/ui/Navbar";
import { HeroShowcase } from "@/components/landing/HeroShowcase";
import { ManifestoSection } from "@/components/landing/ManifestoSection";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function LandingPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <main ref={containerRef} className="min-h-screen bg-zinc-950 selection:bg-zinc-100 selection:text-zinc-950 overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-20 md:pt-32 pb-16 px-6 lg:px-12">
        {/* Animated Mesh Gradients */}
        <div className="absolute top-0 left-1/4 w-[300px] md:w-[800px] h-[300px] md:h-[600px] bg-zinc-100/5 blur-[80px] md:blur-[120px] rounded-full pointer-events-none -z-10" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={stagger}
            style={{ y: y1, opacity }}
            className="flex flex-col items-start"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-white/5 mb-6 md:mb-8 group cursor-default">
              <Sparkles className="w-3 h-3 text-zinc-400 group-hover:rotate-12 transition-transform" />
              <span className="text-[9px] md:text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Intelligence v1.0</span>
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl md:text-8xl font-medium tracking-tighter text-zinc-100 mb-6 md:mb-8 leading-[1] md:leading-[0.95]">
              The AI that <br className="hidden sm:block" />
              <span className="text-zinc-500 italic">really knows</span> you.
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-base md:text-xl text-zinc-400 mb-10 md:mb-12 max-w-lg font-light leading-relaxed">
              CareerForge Pulse simulates high-stakes technical interviews to expose critical gaps in your logic before recruiters do.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-stretch sm:items-center w-full sm:w-auto">
              <Link href="/upload" className="w-full sm:w-auto">
                <button className="w-full px-8 py-4 bg-zinc-100 text-zinc-950 text-[11px] uppercase tracking-widest font-bold rounded-full hover:bg-white transition-all duration-500 shadow-[0_20px_50px_rgba(255,255,255,0.1)] flex items-center justify-center gap-3">
                  Begin Evaluation
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <button 
                onClick={() => document.getElementById('manifesto')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto px-8 py-4 bg-transparent text-zinc-100 text-[11px] uppercase tracking-widest font-medium rounded-full border border-white/10 hover:bg-white/5 transition-all duration-500 backdrop-blur-sm"
              >
                Read Manifesto
              </button>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-16 md:mt-20 flex flex-wrap items-center gap-6 md:gap-10 grayscale opacity-40 contrast-125">
              <div className="text-[9px] font-mono text-zinc-600 uppercase tracking-[0.3em] w-full md:w-auto mb-2 md:mb-0">Trusted Intelligence</div>
              <div className="text-xs md:text-sm font-bold text-zinc-400 tracking-tighter">LINEAR</div>
              <div className="text-xs md:text-sm font-bold text-zinc-400 tracking-tighter">VERCEL</div>
              <div className="text-xs md:text-sm font-bold text-zinc-400 tracking-tighter">STRIPE</div>
            </motion.div>
          </motion.div>

          {/* Right Panel - Visible on Tablet and Desktop */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="hidden sm:flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-md lg:max-w-none">
              <HeroShowcase />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Storytelling */}
      <ManifestoSection />

      {/* Feature Grid */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Signal Extraction",
              desc: "Deep analysis of technical depth, reasoning patterns, and communication signals beyond resume keywords.",
              icon: "01"
            },
            {
              title: "Adaptive Interrogator",
              desc: "A live recruiter simulation that evolves based on your responses to find your true technical ceiling.",
              icon: "02"
            },
            {
              title: "Verdict Engine",
              desc: "Receive an honest, data-driven evaluation that mirrors how Tier-1 hiring managers actually think.",
              icon: "03"
            }
          ].map((feature, i) => (
            <SpotlightCard key={i} className="p-10 group bg-zinc-900/10 border-white/[0.02]">
              <div className="text-3xl font-mono text-zinc-800 mb-10 group-hover:text-zinc-100 transition-colors duration-700">{feature.icon}</div>
              <h3 className="text-xl font-medium text-zinc-100 mb-4 group-hover:translate-x-2 transition-transform duration-500">{feature.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed font-light group-hover:text-zinc-400 transition-colors duration-500">
                {feature.desc}
              </p>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/[0.02] px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[9px] font-mono text-zinc-600 uppercase tracking-[0.4em]">
            © 2026 CAREERFORGE PULSE. DESIGNED FOR THE ELITE.
          </div>
          <div className="flex gap-10">
            {['Twitter', 'LinkedIn', 'GitHub'].map(platform => (
              <a key={platform} href="#" className="text-[9px] font-mono text-zinc-600 hover:text-zinc-100 uppercase tracking-[0.2em] transition-colors">{platform}</a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
