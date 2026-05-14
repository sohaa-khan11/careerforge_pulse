"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface InterviewerUIProps {
  isThinking: boolean;
  questionIndex: number;
  totalQuestions: number;
}

export function InterviewerUI({ isThinking, questionIndex, totalQuestions }: InterviewerUIProps) {
  const [pulse, setPulse] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(prev => (prev === 1 ? 1.1 : 1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const signals = [
    { label: "Technical Depth", status: "Analyzing" },
    { label: "Communication", status: "Evaluating" },
    { label: "Reasoning", status: "Tracking" },
  ];

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-zinc-950/50 border border-zinc-900 rounded-3xl backdrop-blur-xl relative overflow-hidden group">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-zinc-400/5 blur-[80px] rounded-full group-hover:bg-zinc-400/10 transition-colors duration-1000" />
      
      {/* Question Progress */}
      <div className="absolute top-6 left-8 flex items-center gap-3">
        <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Question</div>
        <div className="flex gap-1.5">
          {Array.from({ length: totalQuestions }).map((_, i) => (
            <div 
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${
                i < questionIndex ? 'bg-zinc-400' : i === questionIndex ? 'bg-zinc-100 pulse' : 'bg-zinc-800'
              }`}
            />
          ))}
        </div>
      </div>

      {/* AI Orb / Interviewer */}
      <div className="relative mb-12">
        <motion.div 
          animate={{ scale: isThinking ? [1, 1.15, 1] : pulse }}
          transition={{ duration: isThinking ? 1 : 2, repeat: Infinity }}
          className={`w-32 h-32 rounded-full flex items-center justify-center relative ${
            isThinking ? 'bg-zinc-100 shadow-[0_0_50px_rgba(255,255,255,0.2)]' : 'bg-zinc-900 border border-zinc-800'
          } transition-all duration-700`}
        >
          {isThinking ? (
            <div className="flex gap-1">
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1.5 h-1.5 bg-zinc-950 rounded-full" />
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-zinc-950 rounded-full" />
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-zinc-950 rounded-full" />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center">
              <div className="w-4 h-4 bg-zinc-700 rounded-full blur-[2px]" />
            </div>
          )}
        </motion.div>
        
        {/* Floating Signal Rings */}
        <div className="absolute inset-0 -m-4">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="w-full h-full border border-dashed border-zinc-800 rounded-full"
          />
        </div>
      </div>

      {/* Interviewer Name */}
      <div className="text-center mb-8">
        <div className="text-zinc-100 font-medium mb-1">CareerForge Intelligence</div>
        <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Lead Recruiter Simulation</div>
      </div>

      {/* Live Signals */}
      <div className="flex gap-4 w-full justify-center">
        {signals.map((sig, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div className="text-[9px] font-mono text-zinc-600 uppercase tracking-wider">{sig.label}</div>
            <div className="flex items-center gap-1.5">
              <div className={`w-1 h-1 rounded-full ${isThinking ? 'bg-zinc-100' : 'bg-zinc-500'} transition-colors duration-500`} />
              <span className="text-[10px] text-zinc-500">{isThinking ? 'Processing...' : 'Live'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
