'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, ShieldCheck } from 'lucide-react';
import { GaugeMeter } from '@/components/ui/GaugeMeter';

interface CinematicHeroProps {
  onOpenAuth: (mode: 'signup' | 'login') => void;
  user: any;
}

export function CinematicHero({ onOpenAuth, user }: CinematicHeroProps) {
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

  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number; delay: number }>>([]);

  useEffect(() => {
    setMounted(true);
    setParticles(
      Array.from({ length: 28 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 6 + 4,
        delay: Math.random() * 2,
      }))
    );
  }, []);

  // Framer Motion variants
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
    <div
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden select-none py-12"
    >
      {/* Cinematic Video Background - Absolute to Hero */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-20 pointer-events-none opacity-40"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260514_135830_bb6491d1-9b66-4aec-9722-13b4dfe3fb46.mp4"
      />

      {/* Dark Overlay with Blur */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(2,5,20,0.45), rgba(5,8,30,0.85))',
          backdropFilter: 'blur(2px)',
        }}
      />

      {/* Floating Background Glow Orbs */}
      <motion.div
        animate={{
          x: [-20, 20, -20],
          y: [15, -15, 15],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-purple-600/30 blur-[120px] rounded-full pointer-events-none -z-10"
      />
      <motion.div
        animate={{
          x: [20, -20, 20],
          y: [-15, 15, -15],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/25 blur-[120px] rounded-full pointer-events-none -z-10"
      />

      {/* Decorative Particles */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {mounted && particles.map((pt) => (
          <motion.div
            key={pt.id}
            initial={{ opacity: 0.2 }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: pt.duration,
              repeat: Infinity,
              delay: pt.delay,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              left: `${pt.x}%`,
              top: `${pt.y}%`,
              width: `${pt.size}px`,
              height: `${pt.size}px`,
              borderRadius: '50%',
              backgroundColor: '#a855f7',
              boxShadow: '0 0 8px #a855f7',
            }}
          />
        ))}
      </div>

      {/* Hero Content Container */}
      <div className="max-w-[1100px] w-full mx-auto px-4 text-center flex flex-col items-center justify-center space-y-8 z-10">
        {/* Floating Announcement Pill with Parallax */}
        <motion.div
          style={{ x: isTouch ? 0 : pillX, y: isTouch ? 0 : pillY }}
          initial={{ opacity: 0, y: -25, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-[12px] shadow-2xl cursor-pointer hover:border-purple-400/40 hover:bg-white/[0.08] transition duration-300"
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-semibold tracking-wide text-slate-200">
              ✨ Introducing AI Resume Audit 3.0 • ATS + Workday + Taleo Ready
            </span>
          </motion.div>
        </motion.div>

        {/* Main Heading with Staggered Word Entrances & Mouse Parallax */}
        <motion.div style={{ x: isTouch ? 0 : titleX, y: isTouch ? 0 : titleY }} className="w-full">
          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="text-[clamp(44px,7.5vw,105px)] font-[900] leading-[0.96] tracking-[-0.06em] text-white flex flex-wrap items-center justify-center gap-x-4 gap-y-1"
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

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.75, delay: 1.0, ease: [0.22, 1, 0.36, 1] as any }}
          className="text-lg sm:text-[22px] max-w-[820px] text-white/80 leading-relaxed font-normal"
        >
          The ultimate AI Career Hub for job seekers — professional resume reviews, instant ATS scoring, STAR bullet rewriters and live AI mock interviews.
        </motion.p>

        {/* CTA Buttons with Entrance & Hover Effects */}
        <motion.div
          style={{ x: isTouch ? 0 : buttonX, y: isTouch ? 0 : buttonY }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.25 }}
          className="flex flex-wrap items-center justify-center gap-5 pt-2"
        >
          {user ? (
            <Link
              href="/dashboard"
              className="relative group px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-black text-base shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_50px_rgba(168,85,247,0.7)] hover:scale-[1.05] -translate-y-1 transition duration-300 flex items-center gap-2 overflow-hidden"
            >
              Go to Dashboard <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </Link>
          ) : (
            <>
              {/* Primary CTA */}
              <motion.button
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onOpenAuth('signup')}
                className="relative group px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 text-white font-extrabold text-base shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_50px_rgba(168,85,247,0.75)] transition-all duration-300 flex items-center gap-2.5 overflow-hidden"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                🚀 Get Started Free <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
              </motion.button>

              {/* Secondary CTA */}
              <motion.div whileHover={{ scale: 1.04, y: -4 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/review"
                  className="px-8 py-4 rounded-2xl border border-white/20 bg-white/[0.05] hover:bg-white/[0.12] hover:border-white/40 backdrop-blur-[12px] text-white font-extrabold text-base shadow-xl flex items-center gap-2.5 transition duration-300"
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
          className="pt-8 w-full max-w-5xl mx-auto"
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
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Taleo & Workday Approved
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
    </div>
  );
}
