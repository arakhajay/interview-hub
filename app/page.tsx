'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { BeforeAfterDemo } from '@/components/landing/BeforeAfterDemo';
import { LinkedParticles } from '@/components/landing/LinkedParticles';
import { AuthModal } from '@/components/auth/AuthModal';
import { useAuth } from '@/context/AuthContext';

export default function LandingPage() {
  const { user } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');

  const openAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <div className="space-y-20 pb-16 overflow-hidden relative">
      {/* Full Page Fixed Linked Particles Background */}
      <LinkedParticles />
      {/* Auth Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} initialMode={authMode} />

      {/* Hero Section */}
      <HeroSection onOpenAuth={openAuth} user={user} />

      {/* Trust & Social Proof Bar */}
      <section className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center p-6 rounded-2xl glass-panel bg-slate-900/40 border border-slate-800 shadow-xl"
        >
          <div>
            <div className="text-3xl font-black text-white">50,000+</div>
            <div className="text-xs text-slate-400 mt-0.5 font-medium">Resumes Audited</div>
          </div>
          <div>
            <div className="text-3xl font-black text-emerald-400">94%</div>
            <div className="text-xs text-slate-400 mt-0.5 font-medium">Interview Callback Rate</div>
          </div>
          <div>
            <div className="text-3xl font-black text-cyan-400">&lt; 10s</div>
            <div className="text-xs text-slate-400 mt-0.5 font-medium">Gemini AI Review Time</div>
          </div>
          <div>
            <div className="text-3xl font-black text-purple-400">10+</div>
            <div className="text-xs text-slate-400 mt-0.5 font-medium">ATS Resume Templates</div>
          </div>
        </motion.div>

        <div className="mt-8 text-center space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
            Tailored to Hiring Standards at Top Tech Companies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 text-slate-400 font-bold text-sm">
            <span>Google</span>
            <span>Meta</span>
            <span>Amazon</span>
            <span>Microsoft</span>
            <span>Netflix</span>
            <span>Apple</span>
          </div>
        </div>
      </section>

      {/* 6 Core Feature Modules */}
      <FeaturesSection />

      {/* Interactive Before & After STAR Demo */}
      <section id="demo" className="max-w-6xl mx-auto px-4">
        <BeforeAfterDemo />
      </section>

      {/* 3-Step How It Works Workflow */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-4 space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <h2 className="text-3xl font-black text-white tracking-tight">How THE INTERVIEW HUB Works</h2>
          <p className="text-sm text-slate-400">Simple 3-step process to optimize your career application.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: '1', color: 'indigo', title: 'Upload Your Resume', desc: 'Drag & drop your PDF/DOCX resume file or paste raw resume text into the parser.' },
            { step: '2', color: 'purple', title: 'Google Gemini AI Review', desc: 'Receive your overall ATS score, keyword gap analysis, and section improvement recommendations.' },
            { step: '3', color: 'emerald', title: 'Apply Rewrites & Export', desc: 'Apply 1-click STAR bullet optimizations and export clean ATS-friendly PDF/DOCX resumes.' }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3 relative shadow-lg"
            >
              <div className={`w-10 h-10 rounded-xl bg-${item.color}-600/20 text-${item.color}-400 font-black text-lg flex items-center justify-center border border-${item.color}-500/30`}>
                {item.step}
              </div>
              <h4 className="text-base font-bold text-white tracking-wide">{item.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing Plans */}
      <section id="pricing" className="max-w-6xl mx-auto px-4 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <h2 className="text-3xl font-black text-white tracking-tight">Flexible Plans for Job Seekers</h2>
          <p className="text-sm text-slate-400">Start for free today and upgrade as you apply to target roles.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Starter */}
          <GlassCard className="p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Starter Plan</span>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-white">$0</span>
                <span className="text-xs text-slate-400">/ forever free</span>
              </div>
              <p className="text-xs text-slate-400">Perfect for quick ATS resume audits and template previews.</p>

              <ul className="space-y-2 text-xs text-slate-300 pt-4 border-t border-slate-800">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> 50 AI Resume Credits</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Complete ATS Resume Audit</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Taleo & Workday Keyword Filter Check</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> PDF & DOCX Resume Exports</li>
              </ul>
            </div>

            <button
              onClick={() => openAuth('signup')}
              className="w-full py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition"
            >
              Get Started Free
            </button>
          </GlassCard>

          {/* Pro Accelerator */}
          <GlassCard glow="indigo" className="p-8 space-y-6 flex flex-col justify-between border-indigo-500/40 relative">
            <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-[10px] font-black text-white uppercase tracking-wider shadow-lg">
              Most Popular
            </div>

            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Pro Career Accelerator</span>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-white">$19</span>
                <span className="text-xs text-slate-400">/ month</span>
              </div>
              <p className="text-xs text-slate-400">For serious applicants aiming for top tech callbacks.</p>

              <ul className="space-y-2 text-xs text-slate-300 pt-4 border-t border-slate-800">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Unlimited Gemini AI Resume Reviews</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Unlimited STAR & Google XYZ Bullet Rewrites</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> All 10+ Modern ATS Resume Templates</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Interactive Voice AI Mock Interview Studio</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> 24/7 AI Career Coach & Offer Negotiation</li>
              </ul>
            </div>

            <button
              onClick={() => openAuth('signup')}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-xs shadow-lg shadow-indigo-600/30 transition"
            >
              Upgrade to Pro Accelerator
            </button>
          </GlassCard>
        </div>
      </section>

      {/* Final Call To Action Banner */}
      <section className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-10 rounded-3xl glass-panel bg-gradient-to-r from-indigo-900/60 via-purple-900/40 to-slate-900/80 border border-indigo-500/30 text-center space-y-6 shadow-2xl"
        >
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Ready to Land Your Dream Tech Role?</h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Join candidates using THE INTERVIEW HUB to optimize their resumes and ace tech interviews.
          </p>
          <button
            onClick={() => openAuth('signup')}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white font-black text-sm shadow-xl shadow-indigo-600/30 hover:scale-105 transition duration-300 inline-flex items-center gap-2"
          >
            Start Building Your Resume Free <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </section>
    </div>
  );
}
