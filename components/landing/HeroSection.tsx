'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { GaugeMeter } from '@/components/ui/GaugeMeter';
import { LinkedParticles } from './LinkedParticles';

interface HeroSectionProps {
  onOpenAuth: (mode: 'signup' | 'login') => void;
  user: any;
}

export function HeroSection({ onOpenAuth, user }: HeroSectionProps) {
  const [isTouch, setIsTouch] = useState(false);

  // Mouse Parallax Values
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const mouseX = useSpring(rawMouseX, springConfig);
  const mouseY = useSpring(rawMouseY, springConfig);

  const pillX = useTransform(mouseX, [-0.5, 0.5], [-12, 12]);
  const pillY = useTransform(mouseY, [-0.5, 0.5], [-12, 12]);

  const titleX = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);
  const titleY = useTransform(mouseY, [-0.5, 0.5], [-8, 8]);

  const buttonX = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);
  const buttonY = useTransform(mouseY, [-0.5, 0.5], [-15, 15]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    rawMouseX.set((clientX / innerWidth) - 0.5);
    rawMouseY.set((clientY / innerHeight) - 0.5);
  };

  // Staggered word animation variants
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      filter: 'blur(10px)',
      scale: 0.96,
    },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1] as any,
      },
    },
  };

  const headingWords = [
    { text: 'Ace', gradient: false },
    { text: 'Every', gradient: false },
    { text: 'Tech', gradient: false },
    { text: 'Interview', gradient: false },
    { text: '&', gradient: false },
    { text: 'Optimize', gradient: false },
    { text: 'Your', gradient: false },
    { text: 'Resume', gradient: false },
    { text: 'with', gradient: false },
    { text: 'Google', gradient: true },
    { text: 'Gemini', gradient: true },
    { text: 'AI', gradient: true },
  ];

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative pt-6 pb-12 overflow-hidden select-none"
    >
      {/* Existing Background Mesh Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-cyan-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Three.js WebGL Linked Particles Animation */}
      <LinkedParticles />

      <div className="max-w-6xl mx-auto px-4 text-center space-y-8 relative z-10">
        {/* 1. Announcement Pill Entrance & Infinite Float */}
        <motion.div
          style={{ x: isTouch ? 0 : pillX, y: isTouch ? 0 : pillY }}
          initial={{ opacity: 0, y: -25, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel bg-indigo-950/60 border border-indigo-500/30 shadow-lg shadow-indigo-500/10 backdrop-blur-xl cursor-pointer"
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-bold text-indigo-300">
              ✨ Introducing AI Resume Audit 3.0 • Taleo & Workday Ready
            </span>
          </motion.div>
        </motion.div>

        {/* 2. Main Heading with Individual Word Stagger Animations */}
        <motion.div
          style={{ x: isTouch ? 0 : titleX, y: isTouch ? 0 : titleY }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] flex flex-wrap items-center justify-center gap-x-3.5 gap-y-1"
          >
            {headingWords.map((word, idx) => (
              <motion.span key={idx} variants={wordVariants} className="inline-block">
                {word.gradient ? (
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400 animated-hero-gradient">
                    {word.text}
                  </span>
                ) : (
                  word.text
                )}
              </motion.span>
            ))}
          </motion.h1>
        </motion.div>

        {/* 3. Subtitle Entrance (Starts after heading) */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.75, delay: 1.0, ease: [0.22, 1, 0.36, 1] as any }}
          className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-sans"
        >
          The ultimate AI Career Hub for job seekers — professional resume reviews, instant ATS scoring, STAR bullet rewriters, and live interactive mock interviews.
        </motion.p>

        {/* 4. CTA Buttons Entrance & Hover Micro-Interactions */}
        <motion.div
          style={{ x: isTouch ? 0 : buttonX, y: isTouch ? 0 : buttonY }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.25 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-2"
        >
          {user ? (
            <Link
              href="/dashboard"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-sm shadow-xl shadow-indigo-600/30 hover:scale-[1.04] hover:-translate-y-1 transition duration-300 flex items-center gap-2"
            >
              Go to Dashboard <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <>
              {/* Primary Button */}
              <motion.button
                whileHover={{ scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onOpenAuth('signup')}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white font-extrabold text-sm shadow-xl shadow-indigo-600/30 hover:shadow-indigo-500/50 transition duration-300 flex items-center gap-2"
              >
                🚀 Get Started Free <ArrowRight className="w-4 h-4" />
              </motion.button>

              {/* Secondary Button */}
              <motion.div whileHover={{ scale: 1.03, y: -3 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/review"
                  className="px-8 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700 hover:border-slate-500 font-extrabold text-sm shadow-lg backdrop-blur-xl transition duration-300 flex items-center gap-2"
                >
                  ⚡ Try Live AI Resume Audit
                </Link>
              </motion.div>
            </>
          )}
        </motion.div>

        {/* Existing Hero Visual Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="pt-8 max-w-5xl mx-auto"
        >
          <div className="relative rounded-3xl p-1 bg-gradient-to-b from-indigo-500/30 via-purple-500/20 to-slate-900/80 shadow-2xl backdrop-blur-2xl">
            <div className="rounded-[22px] bg-slate-950/90 p-6 sm:p-8 space-y-6 text-left border border-slate-800/80">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs font-mono text-slate-400 ml-2">the-interview-hub.ai/dashboard</span>
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  ✓ Taleo & Workday Approved
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                <div className="flex flex-col items-center justify-center p-4 bg-slate-900/60 rounded-2xl border border-slate-800">
                  <GaugeMeter score={94} size={150} label="ATS Match Score" sublabel="Top 3% Candidate" />
                </div>

                <div className="lg:col-span-2 space-y-3 text-xs">
                  <div className="flex justify-between font-bold text-slate-200">
                    <span>STAR Impact Verbs</span>
                    <span className="text-emerald-400">96%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-emerald-400 rounded-full w-[96%]" />
                  </div>

                  <div className="flex justify-between font-bold text-slate-200 pt-1">
                    <span>Technical & Cloud Keywords</span>
                    <span className="text-cyan-400">92%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-cyan-400 rounded-full w-[92%]" />
                  </div>

                  <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 mt-2">
                    <span className="font-bold text-indigo-400">AI Bullet Suggestion:</span> &quot;Architected enterprise RAG pipeline using LangChain & Vector DB, reducing query latency by 42%.&quot;
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        .animated-hero-gradient {
          background-size: 300% 100%;
          animation: heroShift 8s linear infinite;
        }

        @keyframes heroShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
}
