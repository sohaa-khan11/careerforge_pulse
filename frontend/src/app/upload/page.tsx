"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, FileText, ArrowRight, X, AlertCircle, Sparkles } from "lucide-react";
import { Navbar } from "@/components/ui/Navbar";
import { useRouter } from "next/navigation";

import { pulseFetch } from "@/lib/api";

const QUICK_ROLES = [
  "Frontend Engineer",
  "AI Engineer",
  "ML Intern",
  "Product Designer",
  "DevOps Engineer",
  "Data Scientist"
];

export default function UploadScreen() {
  const [file, setFile] = useState<File | null>(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setError(null);
    }
  };

  const handleStartAnalysis = async () => {
    if (!file || !selectedRole) return;
    setIsUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("role", selectedRole);
      
      const data = await pulseFetch("/api/analyze", { 
        method: "POST", 
        body: formData 
      });

      localStorage.setItem("careerforge_pulse_data", JSON.stringify(data));
      setTimeout(() => router.push("/processing"), 800);
    } catch (err: any) {
      setError(err.message || "Intelligence pipeline temporarily unavailable.");
      setIsUploading(false);
    }
  };

  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <main className="relative min-h-screen flex flex-col bg-zinc-950 text-zinc-100 overflow-hidden selection:bg-zinc-800">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-zinc-100/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      <Navbar />

      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-24 pb-12 relative z-10">
        <motion.div initial="initial" animate="animate" className="w-full max-w-2xl">
          <motion.div variants={fadeUp} className="mb-10 md:mb-12 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/50 border border-white/5 mb-6">
              <Sparkles className="w-3 h-3 text-zinc-500" />
              <span className="text-[9px] md:text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Pipeline Initialization</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-medium tracking-tighter text-zinc-100 mb-6 leading-none">
              Start Pulse <span className="text-zinc-500">Scan.</span>
            </h1>
            <p className="text-zinc-400 text-base md:text-lg font-light max-w-md leading-relaxed mx-auto md:mx-0">
              Upload your engineering credentials to begin the evaluation sequence.
            </p>
          </motion.div>

          <AnimatePresence>
            {error && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="mb-8 p-5 bg-red-950/10 border border-red-900/20 rounded-[2rem] flex items-start gap-4 backdrop-blur-xl">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="text-[9px] font-mono uppercase tracking-widest text-red-400 mb-1">Interrupt Detected</div>
                  <p className="text-xs md:text-sm text-red-200/70 font-light">{error}</p>
                </div>
                <button onClick={() => setError(null)} className="text-red-900 hover:text-red-400 transition-colors"><X className="w-4 h-4" /></button>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div variants={fadeUp} className="space-y-10 md:space-y-12">
            <div className="space-y-4">
              <div className="flex justify-between items-center px-2">
                <label className="text-[9px] md:text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Resume Artifact</label>
                {file && (
                  <button onClick={() => setFile(null)} className="text-[9px] md:text-[10px] font-mono text-zinc-700 hover:text-zinc-300 transition-colors uppercase tracking-widest flex items-center gap-2">
                    Reset <X className="w-3 h-3" />
                  </button>
                )}
              </div>
              <div 
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`relative group cursor-pointer h-40 md:h-56 border border-white/5 rounded-[2rem] transition-all duration-1000 flex flex-col items-center justify-center gap-4 overflow-hidden backdrop-blur-xl
                  ${file ? 'bg-zinc-900/30 border-white/[0.08]' : 'bg-zinc-900/10 hover:bg-zinc-900/20 hover:border-white/[0.05]'}
                  ${isDragging ? 'border-zinc-100 scale-[0.98]' : ''}
                `}
              >
                <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileChange} accept=".pdf" />
                <AnimatePresence mode="wait">
                  {file ? (
                    <motion.div key="file" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-3">
                      <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-zinc-100 flex items-center justify-center shadow-2xl shadow-zinc-100/10"><FileText className="w-5 h-5 md:w-6 md:h-6 text-zinc-950" /></div>
                      <div className="text-center px-6">
                        <div className="text-xs md:text-sm font-medium text-zinc-100 truncate max-w-[200px] md:max-w-none">{file.name}</div>
                        <div className="text-[9px] md:text-[10px] font-mono text-zinc-600 uppercase tracking-widest mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB • READY</div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                        <UploadCloud className="w-4 h-4 md:w-5 md:h-5 text-zinc-700 group-hover:text-zinc-100 transition-colors duration-500" />
                      </div>
                      <div className="text-xs md:text-sm font-light text-zinc-600 group-hover:text-zinc-400 transition-colors duration-500">Drop PDF or click to browse</div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-tr from-zinc-100/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <label className="text-[9px] md:text-[10px] font-mono text-zinc-600 uppercase tracking-widest px-2">Target Trajectory</label>
                <div className="flex flex-wrap gap-2 mb-6">
                  {QUICK_ROLES.map((role, i) => (
                    <motion.button 
                      key={role} 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      transition={{ delay: 0.1 + i * 0.05 }} 
                      onClick={() => setSelectedRole(role)}
                      className={`px-4 md:px-5 py-2 rounded-full border text-[9px] md:text-[10px] font-mono transition-all duration-700 uppercase tracking-widest
                        ${selectedRole === role ? 'bg-zinc-100 border-zinc-100 text-zinc-950 shadow-xl shadow-zinc-100/10' : 'bg-transparent border-white/5 text-zinc-600 hover:border-white/10 hover:text-zinc-400'}
                      `}
                    > {role} </motion.button>
                  ))}
                </div>
                
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-zinc-100/10 to-zinc-500/10 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-1000"></div>
                  <div className="relative flex items-center bg-zinc-950/40 border border-white/[0.03] backdrop-blur-xl rounded-2xl overflow-hidden group-focus-within:border-white/10 transition-all duration-1000">
                    <input 
                      type="text" 
                      value={selectedRole} 
                      onChange={(e) => setSelectedRole(e.target.value)} 
                      placeholder="Enter custom trajectory..."
                      className="w-full bg-transparent px-6 py-4 md:py-5 text-base md:text-lg font-medium text-zinc-100 placeholder-zinc-800 focus:outline-none transition-all duration-1000"
                    />
                    <div className="pr-6 flex items-center">
                      <div className={`w-1.5 h-1.5 rounded-full transition-all duration-1000 ${selectedRole ? 'bg-zinc-100 shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'bg-zinc-900'}`} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 md:pt-10">
              <button
                onClick={handleStartAnalysis} disabled={!file || !selectedRole || isUploading}
                className={`w-full group h-14 md:h-16 rounded-[1.5rem] md:rounded-[2rem] font-bold text-[10px] md:text-[11px] uppercase tracking-[0.2em] transition-all duration-1000
                  ${!file || !selectedRole || isUploading ? 'bg-zinc-900/50 text-zinc-700 border border-white/5 cursor-not-allowed' : 'bg-zinc-100 text-zinc-950 hover:bg-white hover:scale-[1.01] shadow-2xl'}
                `}
              >
                <div className="flex items-center justify-center gap-3">
                  {isUploading ? (<><div className="w-3 h-3 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" /> Sequencing...</>) : (<>Start Pulse Evaluation <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-700" /></>)}
                </div>
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
