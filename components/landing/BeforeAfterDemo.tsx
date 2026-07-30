'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, CheckCircle2, Wand2, Zap, AlertTriangle } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

export function BeforeAfterDemo() {
  const [activeTab, setActiveTab] = useState<'star' | 'xyz' | 'technical'>('star');

  const examples = {
    star: {
      before: "Responsible for managing backend services and working on API endpoints.",
      after: "Architected high-availability FastAPI & Node.js microservices processing 12,000 req/sec, reducing API query latency by 42ms for 150k active users.",
      method: "Google STAR Formula (Situation, Task, Action, Result)",
      impact: "+35% Interview Callback Rate Increase"
    },
    xyz: {
      before: "Wrote SQL queries and updated database tables for user data.",
      after: "Optimized PostgreSQL indexing and vector DB queries, improving data retrieval throughput by 68% and saving $24,000/mo in AWS RDS cloud infrastructure.",
      method: "Google XYZ Metric Formula (Accomplished X by Y as measured by Z)",
      impact: "+40% Recruiter Engagement Boost"
    },
    technical: {
      before: "Built ML models and deployed them to server environments.",
      after: "Engineered scalable LLM & RAG retrieval pipelines using LangChain, OpenAI GPT-4o, and Qdrant Vector DB with 99.9% uptime SLA across multi-region EKS clusters.",
      method: "Deep Tech & Cloud Keyword Optimization",
      impact: "Passes Taleo & Workday Hard Filters"
    }
  };

  const current = examples[activeTab];

  return (
    <GlassCard glow="indigo" className="p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">
            <Zap className="w-3.5 h-3.5" /> 1-Click AI Transformation Engine
          </div>
          <h3 className="text-xl font-black text-white tracking-wide">See the AI STAR Bullet Point Difference</h3>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs">
          {(['star', 'xyz', 'technical'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg font-bold transition uppercase ${
                activeTab === tab ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab === 'star' ? 'STAR Method' : tab === 'xyz' ? 'XYZ Formula' : 'Tech Keywords'}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs"
        >
          {/* Before Box */}
          <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-3 relative group">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 font-bold text-[10px] uppercase border border-rose-500/30">
                Before • Plain Resume Text
              </span>
              <AlertTriangle className="w-4 h-4 text-rose-400" />
            </div>
            <p className="text-rose-200/90 font-mono text-sm leading-relaxed pt-2">
              &quot;{current.before}&quot;
            </p>
            <div className="pt-2 text-[11px] text-rose-400 font-medium">
              ⚠️ Problem: Vague wording without quantifiable business metrics or strong action verbs.
            </div>
          </div>

          {/* After Box */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/60 to-purple-950/60 border border-indigo-500/40 space-y-3 relative shadow-xl shadow-indigo-500/10">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold text-[10px] uppercase border border-emerald-500/30">
                After • AI Optimized Bullet
              </span>
              <span className="text-[10px] font-extrabold text-indigo-300 bg-indigo-500/20 px-2 py-0.5 rounded border border-indigo-500/30">
                {current.impact}
              </span>
            </div>
            <p className="text-white font-medium text-sm leading-relaxed pt-2">
              &quot;{current.after}&quot;
            </p>
            <div className="pt-2 text-[11px] text-indigo-300 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Method: {current.method}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </GlassCard>
  );
}
