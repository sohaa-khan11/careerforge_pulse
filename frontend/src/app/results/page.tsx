"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Navbar } from "@/components/ui/Navbar";
import { CompetencyMap } from "@/components/dashboard/CompetencyMap";
import { RecruiterConfidencePanel } from "@/components/dashboard/RecruiterConfidencePanel";
import { FinalEvaluation } from "@shared/types";
import { ArrowLeft, Zap } from "lucide-react";

import { CountUp } from "@/components/ui/CountUp";

export default function ResultsPage() {
  const router = useRouter();
  const [data, setData] = useState<FinalEvaluation | null>(null);
  const [analysisData, setAnalysisData] = useState<any>(null);

  useEffect(() => {
    const evalData = localStorage.getItem("careerforge_pulse_evaluation");
    const analysis = localStorage.getItem("careerforge_pulse_data");
    if (!evalData || !analysis) {
      router.push("/upload");
      return;
    }
    setData(JSON.parse(evalData));
    setAnalysisData(JSON.parse(analysis));
  }, [router]);

  if (!data || !analysisData) return null;

  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
  };

  const stagger = {
    animate: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-zinc-800 pb-24">
      <Navbar />
      <div className="absolute top-0 left-0 w-full h-[600px] bg-zinc-100/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      
      <div className="flex-1 max-w-7xl mx-auto w-full px-6 pt-12">
        {/* Simplified Header */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
          <button 
            onClick={() => router.push('/')}
            className="group flex items-center gap-2 text-[10px] font-mono text-zinc-600 hover:text-zinc-100 transition-colors uppercase tracking-[0.3em]"
          >
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Exit Terminal
          </button>
        </motion.div>

        {/* Verdict Header */}
        <motion.div initial="initial" animate="animate" variants={stagger} className="mb-12 md:mb-16">
          <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                <span className="text-[9px] md:text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Evaluation Verified</span>
                <div className="px-3 py-1 bg-zinc-900 border border-white/5 rounded-full text-[9px] font-mono text-zinc-400 uppercase tracking-widest">
                  {analysisData.profile.seniority} Trajectory
                </div>
              </div>
              <h1 className="text-4xl md:text-7xl font-medium tracking-tighter text-zinc-100 leading-none">
                Pulse Verdict: <span className="text-zinc-500">{analysisData.profile.name.split(' ')[0]}</span>
              </h1>
            </div>

            <div className="flex items-center justify-center gap-6 sm:gap-10 bg-zinc-900/10 p-6 sm:p-8 rounded-[2rem] border border-white/[0.03] backdrop-blur-2xl relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-100/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="relative z-10">
                <div className="text-[8px] md:text-[9px] font-mono text-zinc-600 uppercase tracking-[0.3em] md:tracking-[0.4em] mb-2 text-center">Ready Index</div>
                <div className="text-4xl md:text-6xl font-medium text-zinc-100 tracking-tighter"><CountUp value={data.overallScore} />%</div>
              </div>
              <div className="w-px h-10 md:h-12 bg-white/5" />
              <div className="relative z-10 flex flex-col items-center">
                 <Zap className="w-4 h-4 md:w-5 md:h-5 text-zinc-500 mb-2 animate-pulse" />
                 <div className="text-[8px] md:text-[9px] font-mono text-zinc-500 uppercase tracking-widest text-center">Status</div>
                 <div className="text-xs md:text-sm font-medium text-zinc-400 uppercase tracking-widest">{data.verdictTier.split(' ')[0]}</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Intelligence Grid */}
        <motion.div initial="initial" animate="animate" variants={stagger} className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 md:mb-20">
          <motion.div variants={fadeUp} className="lg:col-span-8">
            <SpotlightCard className="h-full p-6 md:p-10 bg-zinc-900/10 border-white/[0.02] rounded-[2.5rem] relative group overflow-hidden">
              <div className="absolute top-0 right-0 p-6 md:p-8">
                <div className="w-2 h-2 rounded-full bg-zinc-100 animate-pulse shadow-[0_0_15px_rgba(255,255,255,0.4)]" />
              </div>
              <div className="relative z-10 h-full flex flex-col">
                <div className="text-[9px] md:text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-6 md:mb-10">Executive Intelligence</div>
                <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-zinc-100 mb-6 md:mb-8 leading-tight">{data.verdictTier}</h2>
                <p className="text-zinc-400 text-lg md:text-xl leading-relaxed font-light italic mb-8 md:mb-12 max-w-2xl">
                  "{data.verdict}"
                </p>
                <div className="mt-auto flex flex-wrap gap-2 md:gap-3">
                  {analysisData.profile.strengths.map((s: string, i: number) => (
                    <span key={i} className="px-3 md:px-4 py-1.5 md:py-2 bg-zinc-100/5 border border-white/[0.03] rounded-full text-[9px] md:text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          <motion.div variants={fadeUp} className="lg:col-span-4">
            <SpotlightCard className="h-full p-6 md:p-10 bg-zinc-950 border border-white/[0.03] rounded-[2.5rem] flex flex-col items-center justify-center">
               <div className="text-[9px] md:text-[10px] font-mono text-zinc-600 uppercase tracking-[0.3em] md:tracking-[0.4em] mb-6 md:mb-10 text-center">Competency Matrix</div>
               <div className="w-full aspect-square max-w-[280px] md:max-w-none">
                 <CompetencyMap data={data.metrics} />
               </div>
            </SpotlightCard>
          </motion.div>
        </motion.div>

        {/* Actionable Strategy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger} className="lg:col-span-7">
            <div className="mb-10 md:mb-12 text-center md:text-left">
               <h3 className="text-2xl md:text-3xl font-medium text-zinc-100 mb-3 tracking-tight">Acceleration Roadmap</h3>
               <p className="text-zinc-500 font-light text-base md:text-lg">Targeted 3-week trajectory for Tier-1 engineering readiness.</p>
            </div>
            <div className="space-y-10 md:space-y-12">
              {data.roadmap.map((step, i) => (
                <motion.div key={i} variants={fadeUp} className="group relative pl-8 md:pl-12 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[1px] before:bg-zinc-900 hover:before:bg-zinc-400 transition-colors">
                  <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-zinc-950 border border-zinc-800 group-hover:bg-zinc-100 transition-colors" />
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                    <div className="flex flex-col">
                      <span className="text-[9px] md:text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">{step.phase}</span>
                      <h4 className="text-xl md:text-2xl font-medium text-zinc-200 leading-tight">{step.focus}</h4>
                    </div>
                    <span className={`px-3 md:px-4 py-1 rounded-full text-[8px] md:text-[9px] font-mono uppercase tracking-widest ${
                      step.impact === 'High Priority' ? 'bg-zinc-100 text-zinc-950 font-bold' : 'bg-zinc-900 text-zinc-500'
                    }`}>
                      {step.impact}
                    </span>
                  </div>
                  <p className="text-zinc-500 text-sm md:text-base leading-relaxed font-light group-hover:text-zinc-400 transition-colors max-w-2xl">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger} className="lg:col-span-5 flex flex-col gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.metrics.map((metric, i) => (
                <motion.div key={i} variants={fadeUp} className="p-5 md:p-6 rounded-[2rem] bg-zinc-900/10 border border-white/[0.02]">
                  <div className="text-[8px] md:text-[9px] font-mono text-zinc-600 uppercase tracking-widest mb-3">{metric.label}</div>
                  <div className="text-2xl md:text-3xl font-medium text-zinc-100 mb-3">{metric.score}%</div>
                  <div className="h-1 w-full bg-zinc-900/50 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${metric.score}%` }} transition={{ duration: 1.5, delay: 0.5 }} className="h-full bg-zinc-500" />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeUp} className="h-full">
              <RecruiterConfidencePanel 
                score={data.overallScore} 
                verdict={data.verdictTier} 
                note={data.hiringManagerNote} 
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
