'use client';

import React, { useState } from 'react';
import { History, Sparkles, Clock, CheckCircle2, RotateCcw, ArrowRight, Eye, FileText } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { INITIAL_VERSION_HISTORY } from '@/lib/mock-data';
import { ResumeVersion } from '@/lib/types';
import Link from 'next/link';

export default function HistoryPage() {
  const [history, setHistory] = useState<ResumeVersion[]>(INITIAL_VERSION_HISTORY);
  const [selectedVersion, setSelectedVersion] = useState<ResumeVersion | null>(INITIAL_VERSION_HISTORY[0]);

  const handleRestore = (ver: ResumeVersion) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('magic_prompt_active_resume', JSON.stringify(ver.data));
    }
    alert(`Restored Version ${ver.versionNumber}: ${ver.title} to your active Resume Editor.`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-panel bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-slate-900/60 border border-indigo-500/20">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" /> Resume Version Control & Timeline
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Resume History & Version Control</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Track improvements across iterations and restore any previous version with 1-click.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Timeline View (5 Columns) */}
        <GlassCard className="lg:col-span-5 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-400" /> Saved Versions Timeline
          </h3>

          <div className="space-y-3 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
            {history.map((ver) => (
              <div
                key={ver.id}
                onClick={() => setSelectedVersion(ver)}
                className={`relative pl-8 p-3 rounded-xl cursor-pointer transition border ${
                  selectedVersion?.id === ver.id
                    ? 'bg-indigo-600/15 border-indigo-500/40'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className={`absolute left-2.5 top-4 w-3 h-3 rounded-full border-2 ${
                  selectedVersion?.id === ver.id ? 'bg-indigo-500 border-white' : 'bg-slate-800 border-slate-600'
                }`} />

                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-white">v{ver.versionNumber}: {ver.title}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                    {ver.atsScore} ATS
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">{ver.changeSummary}</p>
                <span className="text-[10px] text-slate-500 block mt-1">{ver.date}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Selected Version Detail (7 Columns) */}
        <div className="lg:col-span-7 space-y-6">
          {selectedVersion ? (
            <GlassCard glow="indigo" className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-base font-bold text-white">Version {selectedVersion.versionNumber}: {selectedVersion.title}</h3>
                  <p className="text-xs text-slate-400">Created: {selectedVersion.date}</p>
                </div>
                <button
                  onClick={() => handleRestore(selectedVersion)}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 flex items-center gap-1.5 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Restore This Version
                </button>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <span className="text-slate-400 font-semibold uppercase text-[10px]">Change Summary</span>
                <p className="text-slate-200 mt-0.5">{selectedVersion.changeSummary}</p>
              </div>

              <div className="space-y-2 text-xs">
                <span className="text-slate-400 font-semibold uppercase text-[10px]">Version Content Preview</span>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
                  <p className="font-bold text-white">{selectedVersion.data.personalInfo.fullName} ({selectedVersion.data.personalInfo.email})</p>
                  <p className="text-slate-400">{selectedVersion.data.personalInfo.summary}</p>
                  <p className="font-semibold text-indigo-400">Skills: {selectedVersion.data.skills.technical.join(', ')}</p>
                </div>
              </div>
            </GlassCard>
          ) : (
            <GlassCard className="p-8 text-center text-slate-400 text-xs">
              Select a version from the timeline to view details or restore.
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
}
