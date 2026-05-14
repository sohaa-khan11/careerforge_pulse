"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/ui/Navbar";
import { InterviewerUI } from "@/components/interview/InterviewerUI";
import { Answer } from "@shared/types";
import { Sparkles, BrainCircuit, ShieldCheck } from "lucide-react";

import { pulseFetch } from "@/lib/api";

export default function QuestionPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem("careerforge_pulse_data");
    if (!data) {
      router.push("/upload");
      return;
    }
    try {
      const parsed = JSON.parse(data);
      if (!parsed.questions || parsed.questions.length === 0) throw new Error("No questions");
      setQuestions(parsed.questions);
      setSessionId(parsed.sessionId);
      setIsLoading(false);
    } catch (err) {
      router.push("/upload");
    }
  }, [router]);

  const handleNext = async () => {
    if (!currentAnswer.trim()) return;
    const newAnswer: Answer = { questionId: questions[currentIndex].id, text: currentAnswer };
    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);
    setCurrentAnswer("");

    if (currentIndex < questions.length - 1) {
      setIsThinking(true);
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        setIsThinking(false);
      }, 1000);
    } else {
      setIsThinking(true);
      try {
        const evaluation = await pulseFetch("/api/evaluate", {
          method: "POST",
          body: JSON.stringify({ sessionId, answers: updatedAnswers }),
        });
        localStorage.setItem("careerforge_pulse_evaluation", JSON.stringify(evaluation));
        router.push("/results");
      } catch (err: any) {
        alert(err.message || "Evaluation pipeline interrupted. Please retry.");
        setIsThinking(false);
      }
    }
  };

  if (isLoading) return null;

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col overflow-hidden selection:bg-zinc-800">
      <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-zinc-100/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      <Navbar />

      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-24 pb-12 relative z-10 overflow-y-auto">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 lg:gap-12 items-start">
          
          {/* Intelligence Panel - Narrower */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} 
            className="flex flex-col gap-6 md:gap-8 order-2 lg:order-1 lg:col-span-5 xl:col-span-4"
          >
            <InterviewerUI isThinking={isThinking} questionIndex={currentIndex} totalQuestions={questions.length} />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: <BrainCircuit className="w-4 h-4" />, label: 'Logic Analysis', desc: 'Evaluating architectural reasoning against benchmarks.' },
                { icon: <ShieldCheck className="w-4 h-4" />, label: 'Signal Guard', desc: 'Real-time extraction of technical seniority cues.' }
              ].map((item, i) => (
                <div key={i} className="p-5 rounded-[2rem] bg-zinc-900/20 border border-white/[0.03] backdrop-blur-xl">
                  <div className="text-zinc-500 mb-4">{item.icon}</div>
                  <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">{item.label}</div>
                  <div className="text-xs text-zinc-500 leading-relaxed font-light">{item.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Question & Answer Area - Wider */}
          <div className="relative order-1 lg:order-2 lg:col-span-7 xl:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-8"
              >
                <div className="w-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="px-3 py-1 bg-zinc-900/50 border border-white/5 rounded-full text-[9px] font-mono text-zinc-600 uppercase tracking-widest">Live Prompt {currentIndex + 1}</div>
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-zinc-100 shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                  </div>
                  <h2 className="text-zinc-100 font-medium tracking-tighter leading-[1.15] mb-2 max-w-4xl" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.75rem)' }}>
                    {questions[currentIndex]?.text}
                  </h2>
                </div>

                <div className="relative group">
                  <textarea
                    autoFocus value={currentAnswer} onChange={(e) => setCurrentAnswer(e.target.value)} placeholder="Provide technical reasoning..."
                    className="w-full h-44 md:h-64 bg-zinc-900/10 border border-white/[0.03] rounded-[2.5rem] p-8 md:p-10 text-lg md:text-xl text-zinc-200 placeholder-zinc-900 focus:outline-none focus:border-white/10 focus:bg-zinc-900/20 transition-all duration-1000 resize-none font-light leading-relaxed backdrop-blur-xl shadow-2xl"
                  />
                  <div className="absolute bottom-8 right-10 flex items-center gap-4 hidden sm:flex">
                    <div className="flex flex-col items-end">
                      <span className="text-[9px] font-mono text-zinc-700 uppercase tracking-widest">Signal Density</span>
                      <div className="flex gap-1 mt-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div key={i} className={`w-1 h-2 rounded-full transition-all duration-700 ${currentAnswer.length > i * 100 ? 'bg-zinc-400' : 'bg-zinc-900'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleNext} disabled={isThinking || !currentAnswer.trim()}
                  className={`w-full group h-16 rounded-[1.5rem] font-bold text-[10px] md:text-[11px] uppercase tracking-[0.2em] transition-all duration-1000
                    ${isThinking || !currentAnswer.trim() ? 'bg-zinc-900/50 text-zinc-700 border border-white/5' : 'bg-zinc-100 text-zinc-950 hover:bg-white hover:scale-[1.01] shadow-2xl'}
                  `}
                >
                  <div className="flex items-center justify-center gap-3">
                    {isThinking ? (<><div className="w-3 h-3 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" /> Analyzing...</>) : (<>{currentIndex === questions.length - 1 ? "Generate Final Verdict" : "Submit Signal"} <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform duration-500" /></>)}
                  </div>
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}
