'use client';

import React from 'react';
import { BarChart3, TrendingUp, Sparkles, Trophy, Target, Mic, FileEdit, Award } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

export default function AnalyticsPage() {
  const scoreHistory = [
    { version: 'v1.0 (Initial)', score: 65, date: 'Jun 1' },
    { version: 'v2.0 (Draft)', score: 78, date: 'Jul 15' },
    { version: 'v3.0 (AI Optimized)', score: 87, date: 'Jul 28' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-panel bg-gradient-to-r from-cyan-900/40 via-indigo-900/30 to-slate-900/60 border border-cyan-500/20">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" /> Performance & Career Growth Metrics
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Career Analytics Dashboard</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Track your ATS score trajectory, mock interview performance, and application readiness.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <GlassCard glow="emerald" className="p-4 space-y-1">
          <span className="text-slate-400 font-semibold uppercase text-[10px]">ATS Score Improvement</span>
          <p className="text-2xl font-extrabold text-emerald-400">+22 pts</p>
          <span className="text-slate-400 text-[10px]">From 65 to 87</span>
        </GlassCard>

        <GlassCard className="p-4 space-y-1">
          <span className="text-slate-400 font-semibold uppercase text-[10px]">Average Interview Grade</span>
          <p className="text-2xl font-extrabold text-cyan-400">88%</p>
          <span className="text-slate-400 text-[10px]">Based on 4 sessions</span>
        </GlassCard>

        <GlassCard className="p-4 space-y-1">
          <span className="text-slate-400 font-semibold uppercase text-[10px]">Applications Prepared</span>
          <p className="text-2xl font-extrabold text-indigo-400">12</p>
          <span className="text-slate-400 text-[10px]">Custom JDs matched</span>
        </GlassCard>

        <GlassCard className="p-4 space-y-1">
          <span className="text-slate-400 font-semibold uppercase text-[10px]">Skill Keywords Matched</span>
          <p className="text-2xl font-extrabold text-purple-400">92%</p>
          <span className="text-slate-400 text-[10px]">Senior AI Engineer pool</span>
        </GlassCard>
      </div>

      {/* Progress Bars & Growth Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GlassCard className="space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" /> ATS Score Growth Curve
          </h3>

          <div className="space-y-4 pt-2">
            {scoreHistory.map((item, idx) => (
              <div key={idx} className="space-y-1 text-xs">
                <div className="flex justify-between items-center text-slate-300">
                  <span className="font-semibold">{item.version} <span className="text-slate-500 font-normal">({item.date})</span></span>
                  <span className="font-bold text-emerald-400">{item.score} / 100</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-900 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-700"
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Award className="w-4 h-4 text-purple-400" /> Interview Metric Ratings
          </h3>

          <div className="space-y-3 text-xs pt-2">
            {[
              { label: 'Technical Accuracy & System Architecture', score: 90, color: 'bg-emerald-500' },
              { label: 'Communication & Structuring (STAR)', score: 92, color: 'bg-indigo-500' },
              { label: 'Response Depth & Metrics', score: 85, color: 'bg-cyan-500' },
              { label: 'Confidence & Delivery', score: 88, color: 'bg-purple-500' }
            ].map((m, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-slate-300 font-medium">
                  <span>{m.label}</span>
                  <span className="font-bold text-white">{m.score}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-900 overflow-hidden">
                  <div className={`h-full rounded-full ${m.color}`} style={{ width: `${m.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
