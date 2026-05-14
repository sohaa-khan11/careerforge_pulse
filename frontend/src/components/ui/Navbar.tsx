"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export const Navbar = () => {
  const scrollToManifesto = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('manifesto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 bg-zinc-950/10 backdrop-blur-md border-b border-white/[0.01]"
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href="/" className="flex items-center gap-3 group">
        <div className="w-5 h-5 rounded-[4px] bg-zinc-100 flex items-center justify-center overflow-hidden">
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-950 group-hover:scale-[4] transition-transform duration-700 ease-in-out" />
        </div>
        <span className="text-sm font-medium text-zinc-100 tracking-[0.3em] uppercase">
          Pulse
        </span>
      </Link>

      <nav className="flex items-center gap-8">
        <Link 
          href="#manifesto" 
          onClick={scrollToManifesto}
          className="text-[9px] font-mono text-zinc-500 hover:text-zinc-100 uppercase tracking-widest transition-colors hidden sm:block"
        >
          Manifesto
        </Link>
        <Link href="/upload" className="text-[9px] font-mono text-zinc-100 bg-zinc-900/50 hover:bg-zinc-800 px-5 py-2 rounded-full border border-white/5 uppercase tracking-widest transition-all backdrop-blur-sm">
          Pulse Check
        </Link>
      </nav>
    </motion.header>
  );
};
