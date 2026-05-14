"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Sparkles, Cpu, Search, Fingerprint, Activity, BarChart3, Database, Zap } from "lucide-react";

const STEPS = [
  { text: "Initializing semantic parser...", icon: <Cpu className="w-4 h-4" /> },
  { text: "Extracting structural hierarchies...", icon: <Search className="w-4 h-4" /> },
  { text: "Tokenizing experience blocks...", icon: <Fingerprint className="w-4 h-4" /> },
  { text: "Mapping to engineering rubrics...", icon: <Activity className="w-4 h-4" /> },
  { text: "Generating adaptive scenarios...", icon: <Sparkles className="w-4 h-4" /> },
  { text: "Analysis complete. Preparing interface...", icon: <BarChart3 className="w-4 h-4" /> }
];



export default function ProcessingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [profileData, setProfileData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const dataStr = localStorage.getItem("careerforge_pulse_data");
    if (!dataStr) {
      router.push("/upload");
      return;
    }
    const data = JSON.parse(dataStr);
    setProfileData(data.profile);

    // Step Progress
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= STEPS.length - 1) {
          clearInterval(stepInterval);
          setTimeout(() => router.push("/question"), 1200);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);

    return () => {
      clearInterval(stepInterval);
    };
  }, [router]);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-zinc-950 overflow-hidden px-6 selection:bg-zinc-800">
      {/* Refined Cinematic Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-zinc-100/[0.02] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Main Focus Area */}
      <div className="relative flex flex-col items-center max-w-2xl w-full">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative mb-12 md:mb-16"
        >
          {/* Layered Rings */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-48 h-48 md:w-64 md:h-64 rounded-full border border-zinc-800/30 flex items-center justify-center relative"
          >
            <div className="absolute inset-0 rounded-full border-t border-zinc-100/10 blur-[1px]" />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="w-36 h-36 md:w-48 md:h-48 rounded-full border border-zinc-900/50 flex items-center justify-center relative"
            >
              {/* Core Orb */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.05, 1],
                  boxShadow: ["0 0 40px rgba(255,255,255,0.02)", "0 0 60px rgba(255,255,255,0.08)", "0 0 40px rgba(255,255,255,0.02)"]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-zinc-100/5 via-transparent to-transparent animate-pulse" />
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-zinc-100 blur-[20px] md:blur-[30px] opacity-20"
                />
                <div className="relative z-10 w-1 h-1 md:w-1.5 md:h-1.5 bg-zinc-100 rounded-full shadow-[0_0_20px_rgba(255,255,255,1)]" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Orbiting Signal */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-15px] md:inset-[-20px] pointer-events-none"
          >
            <div className="w-1 h-1 bg-zinc-400/50 rounded-full blur-[0.5px] absolute top-0 left-1/2" />
          </motion.div>
        </motion.div>

        {/* Content HUD */}
        <div className="w-full flex flex-col items-center gap-8 md:gap-12">
          <div className="text-center">
             <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-[9px] md:text-[10px] font-mono text-zinc-600 uppercase tracking-[0.4em] md:tracking-[0.5em] mb-3"
             >
               Analyzing Trajectory
             </motion.div>
             <h1 className="text-xl md:text-2xl font-medium text-zinc-100 tracking-tight mb-2">
               {profileData?.name || "Initializing..."}
             </h1>
             <div className="text-[9px] md:text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em]">
               {profileData?.seniority || "System"} // Core Sync Active
             </div>
          </div>

          {/* Simplified Pipeline */}
          <div className="w-full max-w-sm space-y-4">
            {STEPS.map((step, index) => {
              const isCurrent = index === currentStep;
              const isPast = index < currentStep;
              if (!isCurrent && !isPast) return null;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: isCurrent ? 1 : 0.3, x: 0 }}
                  className="flex items-center gap-4"
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${isCurrent ? 'bg-zinc-100 animate-pulse' : 'bg-zinc-800'}`} />
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400">
                    {step.text}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Simple Progress Bar */}
          <div className="w-full max-w-xs h-[1px] bg-zinc-900 overflow-hidden">
             <motion.div 
              animate={{ width: `${(currentStep + 1) / STEPS.length * 100}%` }}
              className="h-full bg-zinc-400"
             />
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-12 text-[9px] font-mono text-zinc-800 uppercase tracking-[0.4em] pointer-events-none">
        PULSE INTELLIGENCE SYSTEM // SESSION_{profileData?.name?.toUpperCase().replace(' ', '_') || 'ALPHA'}
      </div>
    </main>
  );
}
