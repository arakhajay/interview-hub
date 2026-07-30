'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Sparkles, FileSearch, FileEdit, Mic, Bot, ArrowRight, Trophy, Clock, Zap, Upload, CheckCircle2, UserCheck, AlertCircle } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { FileUploader } from '@/components/ui/FileUploader';
import { useAuth } from '@/context/AuthContext';
import { ATSReviewResult } from '@/lib/types';

export default function DashboardPage() {
  const { user, profile } = useAuth();
  const [latestReview, setLatestReview] = useState<ATSReviewResult | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const userName = user?.fullName || profile.fullName || 'Sanghamitra Gawai';
  const userEmail = user?.email || profile.email || 'sanghamitra.g97@gmail.com';
  const userRole = profile.preferredRole || 'Software / AI Engineer';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedReview = localStorage.getItem('magic_prompt_latest_ats_review');
      const storedFileName = localStorage.getItem('magic_prompt_uploaded_file_name');

      if (storedReview) {
        try { setLatestReview(JSON.parse(storedReview)); } catch {}
      }
      if (storedFileName) setUploadedFileName(storedFileName);
    }
  }, []);

  return (
    <div className="space-y-8">
      {/* Onboarding Notice if Profile Incomplete */}
      {!profile.isComplete && (
        <div className="p-4 rounded-2xl bg-indigo-950/60 border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shrink-0">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-white text-sm">Complete Your Career Profile</span>
              <p className="text-slate-300">Set your preferred role, expected salary, and custom AI keys in your profile.</p>
            </div>
          </div>
          <Link
            href="/profile"
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold whitespace-nowrap shadow-md shadow-indigo-600/30 transition flex items-center gap-1.5"
          >
            Edit Profile Details <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* Welcome Back Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-panel bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-slate-900/60 border border-indigo-500/20">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" /> AI Career Assistant Dashboard
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Welcome Back, {userName}! 👋</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Account: <span className="text-indigo-300 font-semibold">{userEmail}</span> • Role: <span className="text-slate-200 font-semibold">{userRole}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-xs text-slate-300 flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>AI Credits: <strong className="text-white">{profile.aiCreditsRemaining}</strong></span>
          </div>
          <Link
            href="/builder"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition flex items-center gap-1.5"
          >
            <FileEdit className="w-3.5 h-3.5" /> Edit Resume
          </Link>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <GlassCard glow="emerald" className="p-4 flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">ATS Score</span>
          <div className="flex items-baseline justify-between mt-2">
            {latestReview ? (
              <span className="text-2xl font-extrabold text-emerald-400">{latestReview.overallScore} / 100</span>
            ) : (
              <span className="text-sm font-bold text-amber-400">Not Audited</span>
            )}
          </div>
          <span className="text-[10px] text-slate-400 mt-1">
            {uploadedFileName ? `Calculated from ${uploadedFileName}` : 'Upload resume to calculate real score'}
          </span>
        </GlassCard>

        <GlassCard className="p-4 flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Resume Status</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-extrabold text-indigo-400">{uploadedFileName ? 'Active' : 'No Resume'}</span>
          </div>
          <span className="text-[10px] text-slate-400 mt-1">{uploadedFileName || 'Drag & drop file below'}</span>
        </GlassCard>

        <GlassCard className="p-4 flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Interview Readiness</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-extrabold text-cyan-400">{latestReview ? `${latestReview.readabilityScore}%` : '85%'}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">Ready</span>
          </div>
          <span className="text-[10px] text-slate-400 mt-1">Practice mock interview</span>
        </GlassCard>

        <GlassCard className="p-4 flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Applications Prep</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-extrabold text-purple-400">12</span>
            <span className="text-[10px] text-slate-400">Target JDs</span>
          </div>
          <span className="text-[10px] text-slate-400 mt-1">12 Cover letters generated</span>
        </GlassCard>

        <GlassCard className="p-4 flex flex-col justify-between col-span-2 lg:col-span-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Skills Score</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-extrabold text-amber-400">{latestReview ? `${latestReview.sectionScores.skills}/100` : 'Not Audited'}</span>
          </div>
          <span className="text-[10px] text-slate-400 mt-1">Google Gemini Evaluated</span>
        </GlassCard>
      </div>

      {/* Large Action Buttons */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/review" className="group">
            <GlassCard glow="indigo" className="p-5 flex flex-col justify-between h-full group-hover:scale-[1.02] transition">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
                  <FileSearch className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Review Resume</h4>
                <p className="text-xs text-slate-400 mt-1">Live AI ATS audit & section scoring</p>
              </div>
            </GlassCard>
          </Link>

          <Link href="/builder" className="group">
            <GlassCard className="p-5 flex flex-col justify-between h-full group-hover:scale-[1.02] transition">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center border border-purple-500/30">
                  <FileEdit className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Build Resume</h4>
                <p className="text-xs text-slate-400 mt-1">10+ templates & STAR bullet rewriter</p>
              </div>
            </GlassCard>
          </Link>

          <Link href="/interview" className="group">
            <GlassCard className="p-5 flex flex-col justify-between h-full group-hover:scale-[1.02] transition">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                  <Mic className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Interview Preparation</h4>
                <p className="text-xs text-slate-400 mt-1">Interactive AI mock interview studio</p>
              </div>
            </GlassCard>
          </Link>

          <Link href="/career-coach" className="group">
            <GlassCard className="p-5 flex flex-col justify-between h-full group-hover:scale-[1.02] transition">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
                  <Bot className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">AI Career Coach</h4>
                <p className="text-xs text-slate-400 mt-1">Ask questions & plan career roadmap</p>
              </div>
            </GlassCard>
          </Link>
        </div>
      </div>

      {/* Drag & Drop Resume Upload Area */}
      <section className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Upload Your Resume for AI Audit</h3>
        <FileUploader />
      </section>
    </div>
  );
}
