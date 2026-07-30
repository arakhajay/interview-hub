'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Shield, Cpu, Zap, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full glass-panel border-t border-slate-800/80 bg-slate-950/90 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-white gradient-text">Magic Prompt</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              All-in-One AI Career Assistant for automated resume audits, ATS score optimization, STAR bullet point rewrites, job description matching, and interactive mock interview practice.
            </p>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Core Modules</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/review" className="hover:text-indigo-400 transition">AI Resume Audit & ATS Score</Link></li>
              <li><Link href="/builder" className="hover:text-indigo-400 transition">Interactive Resume Builder</Link></li>
              <li><Link href="/job-match" className="hover:text-indigo-400 transition">Job Description Matcher</Link></li>
              <li><Link href="/interview" className="hover:text-indigo-400 transition">AI Mock Interview Studio</Link></li>
              <li><Link href="/career-coach" className="hover:text-indigo-400 transition">AI Career Assistant Chat</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Resume Templates</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/builder" className="hover:text-indigo-400 transition">Modern Tech & AI Template</Link></li>
              <li><Link href="/builder" className="hover:text-indigo-400 transition">Executive Leadership Suite</Link></li>
              <li><Link href="/builder" className="hover:text-indigo-400 transition">Data Science & ML Focused</Link></li>
              <li><Link href="/builder" className="hover:text-indigo-400 transition">100% ATS Clean Minimalist</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Platform Tech</h5>
            <div className="flex flex-wrap gap-2 text-[11px] text-slate-300">
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 flex items-center gap-1"><Cpu className="w-3 h-3 text-indigo-400" /> OpenAI GPT-4o</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 flex items-center gap-1"><Shield className="w-3 h-3 text-emerald-400" /> Supabase DB</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 flex items-center gap-1"><Zap className="w-3 h-3 text-cyan-400" /> Next.js App Router</span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Magic Prompt AI Platform. Production Ready & Recruiter Approved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-300 cursor-pointer">Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
