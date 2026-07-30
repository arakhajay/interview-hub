'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileSearch, Wand2, LayoutTemplate, FileText, Mic, Bot } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

export function FeaturesSection() {
  const features = [
    {
      icon: <FileSearch className="w-6 h-6 text-indigo-400" />,
      glow: 'indigo' as const,
      title: 'AI Resume Audit & ATS Scoring',
      desc: 'Get instant Taleo & Workday ATS compatibility scores, recruiter readability checks, and 9 section rating metrics.'
    },
    {
      icon: <Wand2 className="w-6 h-6 text-emerald-400" />,
      glow: 'emerald' as const,
      title: 'STAR & Google XYZ Rewriter',
      desc: 'Transform weak bullets with 1 click using Google STAR action verbs and quantified revenue/latency percentage metrics.'
    },
    {
      icon: <LayoutTemplate className="w-6 h-6 text-purple-400" />,
      glow: 'indigo' as const,
      title: '2-Option AI Resume Builder',
      desc: 'Improve existing resumes side-by-side or synthesize a brand-new resume from scratch using Gemini AI Audit insights.'
    },
    {
      icon: <FileText className="w-6 h-6 text-cyan-400" />,
      glow: 'none' as const,
      title: 'Job Description Matcher',
      desc: 'Paste target job descriptions to identify missing technical keywords, frameworks, and cloud certifications.'
    },
    {
      icon: <Mic className="w-6 h-6 text-amber-400" />,
      glow: 'none' as const,
      title: 'Interactive AI Mock Interviews',
      desc: 'Practice role-specific behavioral and system design interview questions with instant voice/text feedback scores.'
    },
    {
      icon: <Bot className="w-6 h-6 text-indigo-400" />,
      glow: 'none' as const,
      title: '24/7 AI Career Coach',
      desc: 'Ask career questions, get customized skill roadmaps, and receive offer negotiation advice anytime.'
    }
  ];

  return (
    <section id="features" className="max-w-6xl mx-auto px-4 space-y-12 py-6">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h2 className="text-3xl font-black text-white tracking-tight">Everything You Need to Get Hired Faster</h2>
        <p className="text-sm text-slate-400 leading-relaxed font-sans">
          THE INTERVIEW HUB combines advanced AI resume optimization with real-time interview preparation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ y: -6, scale: 1.02 }}
          >
            <GlassCard glow={feat.glow} className="p-6 space-y-4 h-full flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center shadow-md">
                  {feat.icon}
                </div>
                <h3 className="text-lg font-bold text-white tracking-wide">{feat.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">{feat.desc}</p>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
