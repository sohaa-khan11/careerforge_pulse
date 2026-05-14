"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts";
import { Sparkles, Activity, ShieldCheck, Cpu } from "lucide-react";

const mockData = [
  { value: 40 }, { value: 65 }, { value: 45 }, { value: 80 }, 
  { value: 55 }, { value: 90 }, { value: 70 }, { value: 95 }
];

export function HeroShowcase() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative w-full max-w-xl aspect-square lg:aspect-video xl:aspect-square flex items-center justify-center p-8 group">
      {/* Animated Mesh Gradient Background */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
          rotate: [0, 90, 180, 270, 360]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-gradient-to-br from-zinc-100 via-transparent to-zinc-500 blur-[100px] rounded-full pointer-events-none"
      />

      {/* Floating Signal Cards */}
      <motion.div 
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-4 right-4 z-20 p-5 rounded-3xl bg-zinc-900/40 backdrop-blur-2xl border border-white/5 shadow-2xl"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-xl bg-zinc-100 flex items-center justify-center">
            <Activity className="w-4 h-4 text-zinc-950" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Logic Stream</div>
            <div className="text-sm font-medium text-zinc-100">89.4% Stability</div>
          </div>
        </div>
        <div className="h-10 w-32">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData}>
              <Line type="monotone" dataKey="value" stroke="#f4f4f5" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-12 left-4 z-20 p-5 rounded-3xl bg-zinc-900/40 backdrop-blur-2xl border border-white/5 shadow-2xl"
      >
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Identity Verified</span>
        </div>
      </motion.div>

      {/* Main Analysis Hub */}
      <div className="relative z-10 w-full h-full rounded-[3rem] border border-white/[0.03] bg-zinc-950/40 backdrop-blur-xl overflow-hidden flex flex-col shadow-[0_0_80px_rgba(255,255,255,0.02)]">
        {/* Terminal Header */}
        <div className="h-12 border-b border-white/[0.03] px-6 flex items-center justify-between">
          <div className="flex gap-2">
            {[1, 2, 3].map(i => <div key={i} className="w-2 h-2 rounded-full bg-zinc-800" />)}
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
            <Cpu className="w-3 h-3" /> System_Core.v2
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8 flex flex-col justify-center">
          <div className="mb-8">
            <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-[0.4em] mb-4">Integrity Scan</div>
            <div className="space-y-3">
              {[
                { label: 'Technical Depth', val: 94 },
                { label: 'Reasoning Logic', val: 82 },
                { label: 'Context Awareness', val: 76 }
              ].map((m, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-mono text-zinc-600">
                    <span>{m.label}</span>
                    <span>{m.val}%</span>
                  </div>
                  <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${m.val}%` }}
                      transition={{ duration: 2, delay: 0.5 + i * 0.2 }}
                      className="h-full bg-zinc-400"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/[0.02]">
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-3 h-3 text-zinc-500" />
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Recruiter Verdict</span>
            </div>
            <div className="text-sm font-light text-zinc-400 leading-relaxed italic">
              "Logic stream displays high architectural stability. Primary signal: Strong Hire."
            </div>
          </div>
        </div>

        {/* Animated Light Ray */}
        <motion.div 
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
          className="absolute top-0 bottom-0 w-24 bg-white/[0.02] skew-x-12 blur-2xl"
        />
      </div>

      {/* Outer Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {mounted && [1, 2, 3, 4, 5].map(i => (
          <motion.div 
            key={i}
            animate={{ 
              y: [-20, 20, -20],
              opacity: [0, 0.5, 0]
            }}
            transition={{ 
              duration: 5 + i, 
              repeat: Infinity, 
              delay: i * 1,
              ease: "easeInOut"
            }}
            className="absolute w-1 h-1 bg-zinc-400 rounded-full"
            style={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%` 
            }}
          />
        ))}
      </div>
    </div>
  );
}
