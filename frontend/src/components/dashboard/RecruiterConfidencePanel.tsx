"use client";

import { motion } from "framer-motion";
import { ShieldCheck, TrendingUp, Info } from "lucide-react";

interface RecruiterConfidencePanelProps {
  score: number;
  verdict: string;
  note: string;
}

export function RecruiterConfidencePanel({ score, verdict, note }: RecruiterConfidencePanelProps) {
  return (
    <div className="relative group">
      {/* Background Glass */}
      <div className="absolute inset-0 bg-zinc-900/20 backdrop-blur-2xl border border-white/[0.03] rounded-[2rem] transition-all duration-700 group-hover:border-white/[0.08]" />
      
      {/* Glow Effect */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-zinc-100/5 blur-[60px] rounded-full pointer-events-none" />

      <div className="relative z-10 p-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-500" />
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em]">Recruiter Integrity</span>
            </div>
            <h3 className="text-xl font-medium text-zinc-100">Confidence Metric</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-zinc-100/5 border border-white/5 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-zinc-400" />
          </div>
        </div>

        {/* Confidence Meter */}
        <div className="mb-10">
          <div className="flex justify-between items-end mb-4">
            <div className="text-4xl font-medium text-zinc-100 tracking-tighter">
              {score}% <span className="text-xs text-zinc-600 font-normal uppercase tracking-widest ml-2">Match</span>
            </div>
            <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Calculated Signals</div>
          </div>
          <div className="h-1.5 w-full bg-zinc-900/50 rounded-full overflow-hidden border border-white/[0.02]">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${score}%` }}
              transition={{ duration: 1.5, ease: "circOut", delay: 0.5 }}
              className="h-full bg-gradient-to-r from-zinc-500 to-zinc-100 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
            />
          </div>
        </div>

        {/* Intelligence Note */}
        <div className="mt-auto space-y-6">
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.03]">
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-3 h-3 text-zinc-600" />
              <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">Hiring Manager Insight</span>
            </div>
            <p className="text-sm text-zinc-400 font-light leading-relaxed italic">
              "{note}"
            </p>
          </div>

          <div className="flex gap-3">
            {['Logic Stability', 'Context Awareness'].map((label, i) => (
              <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/50 border border-white/5">
                <div className="w-1 h-1 rounded-full bg-zinc-500" />
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
