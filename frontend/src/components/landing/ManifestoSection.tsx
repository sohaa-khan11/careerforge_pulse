"use client";

import { motion } from "framer-motion";

export function ManifestoSection() {
  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  const sections = [
    {
      title: "The Problem",
      text: "Most students discover they are unprepared only after rejection. The gap between graduation and employment isn't just about skills—it's about understanding the recruiter's lens.",
      highlight: "Unprepared only after rejection."
    },
    {
      title: "The Broken Signal",
      text: "Resumes reward formatting, but interviews reward clarity under pressure. A list of keywords doesn't tell the story of your technical depth or your ability to reason through complex trade-offs.",
      highlight: "Keywords don't tell the story."
    },
    {
      title: "The Recruiter Reality",
      text: "Real recruiters evaluate confidence, communication, and first-principles thinking. CareerForge Pulse was built to simulate this human intelligence at scale, giving you an objective mirror before the stakes are real.",
      highlight: "Human intelligence at scale."
    }
  ];

  return (
    <section id="manifesto" className="py-20 md:py-32 px-6 bg-zinc-950 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-64 bg-gradient-to-b from-transparent via-zinc-800 to-transparent" />
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-900 to-transparent" />

      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          variants={fadeUp} 
          className="mb-16 md:mb-24 text-center"
        >
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-6 block">Our Philosophy</span>
          <h2 className="text-4xl md:text-7xl font-medium tracking-tight text-zinc-100 mb-8 leading-[1.1]">
            The AI that tells you how a recruiter <span className="text-zinc-500">actually sees you.</span>
          </h2>
        </motion.div>

        <div className="space-y-32">
          {sections.map((section, i) => (
            <motion.div 
              key={i}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              variants={fadeUp}
              className={`flex flex-col ${i % 2 === 0 ? 'md:items-start' : 'md:items-end'} relative`}
            >
              <div className="max-w-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-8 h-px bg-zinc-700" />
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-[0.2em]">{section.title}</span>
                </div>
                <p className="text-2xl md:text-3xl text-zinc-300 leading-relaxed font-light">
                  {section.text.split(section.highlight)[0]}
                  <span className="text-zinc-100 font-normal underline decoration-zinc-800 underline-offset-8 decoration-2">
                    {section.highlight}
                  </span>
                  {section.text.split(section.highlight)[1]}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mt-48 p-12 border border-zinc-900 bg-zinc-900/20 rounded-3xl text-center relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-400/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <h3 className="text-3xl font-medium text-zinc-100 mb-6">Ready to find your edge?</h3>
          <p className="text-zinc-400 mb-10 max-w-lg mx-auto text-lg font-light leading-relaxed">
            Don't wait for a rejection letter to find out where you stand. Get your Pulse Evaluation today.
          </p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-10 py-4 bg-zinc-100 text-zinc-950 text-sm font-medium rounded-full hover:bg-white hover:scale-105 transition-all duration-300"
          >
            Start Your Evaluation
          </button>
        </motion.div>
      </div>
    </section>
  );
}
