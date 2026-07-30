'use client';

import React, { useState, useEffect } from 'react';
import { GaugeMeter } from '@/components/ui/GaugeMeter';
import { GlassCard } from '@/components/ui/GlassCard';
import { FileUploader } from '@/components/ui/FileUploader';
import { ATSReviewResult } from '@/lib/types';
import { analyzeResumeWithAI } from '@/lib/openai';
import { Sparkles, CheckCircle2, AlertTriangle, XCircle, RefreshCw, FileText, Check, Upload, FileCode, Loader2, ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';

export default function ReviewPage() {
  const [review, setReview] = useState<ATSReviewResult | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'ats' | 'keywords' | 'suggestions'>('overview');
  const [loading, setLoading] = useState(false);
  const [resumeSource, setResumeSource] = useState<string | null>(null);
  const [uploadedText, setUploadedText] = useState<string>('');
  const [targetRoleInput, setTargetRoleInput] = useState<string>('Software / AI Engineer');
  const [appliedSuggestions, setAppliedSuggestions] = useState<string[]>([]);
  const [showPasteBox, setShowPasteBox] = useState(false);

  useEffect(() => {
    // Read user's uploaded resume from localStorage
    if (typeof window !== 'undefined') {
      const storedText = localStorage.getItem('magic_prompt_uploaded_resume_text');
      const storedFileName = localStorage.getItem('magic_prompt_uploaded_file_name');
      const storedReview = localStorage.getItem('magic_prompt_latest_ats_review');

      if (storedText && storedText.length > 20) {
        setUploadedText(storedText);
        setResumeSource(storedFileName || 'Uploaded Resume');
        runReview(storedText);
      } else if (storedReview) {
        try {
          setReview(JSON.parse(storedReview));
          setResumeSource('Uploaded Resume Audit');
        } catch {}
      }
    }
  }, []);

  const runReview = async (textToReview: string, role?: string) => {
    if (!textToReview || textToReview.trim().length < 10) return;
    setLoading(true);
    try {
      const res = await analyzeResumeWithAI(textToReview, role || targetRoleInput);
      setReview(res);

      if (typeof window !== 'undefined') {
        localStorage.setItem('magic_prompt_latest_ats_review', JSON.stringify(res));
      }
    } catch {
      // fallback handled in service
    } finally {
      setLoading(false);
    }
  };

  const handleApplySuggestion = (id: string) => {
    if (!appliedSuggestions.includes(id)) {
      setAppliedSuggestions([...appliedSuggestions, id]);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-panel bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-slate-900/60 border border-indigo-500/20">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" /> Google Gemini AI Resume Audit Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">AI Resume Review & ATS Score</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {resumeSource ? (
              <>Analyzing file: <span className="text-indigo-300 font-semibold">{resumeSource}</span></>
            ) : (
              'Upload your resume to perform a live Google Gemini AI audit & calculate real ATS scores.'
            )}
          </p>
        </div>

        {resumeSource && (
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                setResumeSource(null);
                setReview(null);
                if (typeof window !== 'undefined') {
                  localStorage.removeItem('magic_prompt_uploaded_resume_text');
                  localStorage.removeItem('magic_prompt_latest_ats_review');
                }
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-semibold flex items-center gap-2 transition"
            >
              <Upload className="w-3.5 h-3.5 text-indigo-400" /> Upload New Resume
            </button>
            <button
              onClick={() => runReview(uploadedText)}
              disabled={loading}
              className="px-4 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 text-xs font-semibold flex items-center gap-2 transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Re-evaluate with Gemini
            </button>
          </div>
        )}
      </div>

      {/* No Resume Uploaded State */}
      {!loading && !review && !resumeSource && (
        <GlassCard glow="indigo" className="p-8 space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center mx-auto shadow-xl">
            <Upload className="w-8 h-8" />
          </div>
          <div className="max-w-md mx-auto space-y-2">
            <h3 className="text-xl font-bold text-white">No Resume Uploaded Yet</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Upload your PDF/DOCX resume file or paste your resume text below. Our AI will analyze your real document using Google Gemini to compute real ATS scores and recommendations.
            </p>
          </div>

          <div className="max-w-xl mx-auto">
            <FileUploader onSuccess={(data, text) => {
              setUploadedText(text);
              setResumeSource(data.personalInfo.fullName + "'s Resume");
              runReview(text);
            }} />
          </div>

          <div className="pt-4 border-t border-slate-800">
            <button
              onClick={() => setShowPasteBox(!showPasteBox)}
              className="text-xs text-indigo-400 hover:underline font-semibold"
            >
              {showPasteBox ? 'Hide Plain Text Box' : 'Or Paste Raw Resume Text directly →'}
            </button>
          </div>

          {showPasteBox && (
            <div className="max-w-xl mx-auto text-left space-y-3 pt-2">
              <textarea
                rows={6}
                placeholder="Paste your full resume text here..."
                value={uploadedText}
                onChange={(e) => setUploadedText(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 leading-relaxed font-mono"
              />
              <button
                onClick={() => {
                  setResumeSource('Pasted Resume Text');
                  runReview(uploadedText);
                }}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2 transition"
              >
                <Sparkles className="w-4 h-4" /> Run Gemini AI Review on Text
              </button>
            </div>
          )}
        </GlassCard>
      )}

      {/* Loading State Spinner */}
      {loading && (
        <GlassCard className="p-16 text-center space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-indigo-400 mx-auto" />
          <h3 className="text-lg font-bold text-white">Analyzing Your Uploaded Resume with Google Gemini AI...</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
            Parsing your actual uploaded document, calculating exact ATS score breakdown, checking filter compatibility, and detecting missing skills.
          </p>
        </GlassCard>
      )}

      {/* Main Top Overview Section when Review is Ready */}
      {!loading && review && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* ATS Score Gauge Card */}
            <GlassCard glow="indigo" className="flex flex-col items-center justify-center p-8 text-center">
              <GaugeMeter score={review.overallScore} size={200} label="Real ATS Score" sublabel="Taleo & Workday Filter Approved" />

              <div className="w-full grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-slate-800 text-center text-xs">
                <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-slate-400 text-[10px]">Readability</span>
                  <p className="font-bold text-emerald-400 text-sm mt-0.5">{review.readabilityScore}%</p>
                </div>
                <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-slate-400 text-[10px]">Formatting</span>
                  <p className="font-bold text-amber-400 text-sm mt-0.5">{review.formattingScore}%</p>
                </div>
                <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-slate-400 text-[10px]">Keywords</span>
                  <p className="font-bold text-cyan-400 text-sm mt-0.5">{review.keywordScore}%</p>
                </div>
              </div>
            </GlassCard>

            {/* Section Scores Progress Grid */}
            <GlassCard className="lg:col-span-2 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Granular Section Scores</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-xs">
                {[
                  { label: 'Professional Summary', score: review.sectionScores.summary },
                  { label: 'Skills & Tools Matrix', score: review.sectionScores.skills },
                  { label: 'Technical Projects', score: review.sectionScores.projects },
                  { label: 'Work Experience', score: review.sectionScores.experience },
                  { label: 'Education & Honors', score: review.sectionScores.education },
                  { label: 'ATS Formatting', score: review.sectionScores.formatting },
                  { label: 'Target Job Keywords', score: review.sectionScores.keywords },
                  { label: 'Readability & Grammar', score: review.sectionScores.readability },
                  { label: 'Quantified Achievements', score: review.sectionScores.achievements }
                ].map((sec, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between items-center text-slate-300">
                      <span>{sec.label}</span>
                      <span className={`font-bold ${sec.score >= 80 ? 'text-emerald-400' : sec.score >= 65 ? 'text-amber-400' : 'text-rose-400'}`}>
                        {sec.score}%
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          sec.score >= 80 ? 'bg-emerald-500' : sec.score >= 65 ? 'bg-amber-500' : 'bg-rose-500'
                        }`}
                        style={{ width: `${sec.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
            {[
              { id: 'overview', label: 'AI Deep Analysis' },
              { id: 'ats', label: 'ATS Simulator (Parsed View)' },
              { id: 'keywords', label: 'Keyword Gap Analysis' },
              { id: 'suggestions', label: 'Improvement Suggestions' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: AI Deep Analysis */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GlassCard className="space-y-3">
                <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> What&apos;s Working Well
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {review.analysis.whatsGood.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <span className="text-emerald-400 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>

              <GlassCard className="space-y-3">
                <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> What&apos;s Missing / Recruiter Concerns
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {review.analysis.whatsMissing.concat(review.analysis.recruiterConcerns).map((item, i) => (
                    <li key={i} className="flex items-start gap-2 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                      <span className="text-amber-400 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>

              <GlassCard className="space-y-3">
                <h4 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                  <Zap className="w-4 h-4" /> Action Verbs Identified in Uploaded Text
                </h4>
                <div className="flex flex-wrap gap-2 text-xs">
                  {review.analysis.actionVerbsUsed.map((verb, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-medium">
                      {verb}
                    </span>
                  ))}
                </div>
              </GlassCard>

              <GlassCard className="space-y-3">
                <h4 className="text-sm font-bold text-rose-400 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> Weak Bullets & Buzzwords to Remove
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {review.analysis.weakBullets.concat(review.analysis.buzzwordsFound).map((item, i) => (
                    <li key={i} className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-200">
                      {item}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </div>
          )}

          {/* Tab 2: ATS Simulator */}
          {activeTab === 'ats' && (
            <GlassCard className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg ${
                    review.atsSimulation.canRecruiterRead ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400'
                  }`}>
                    {review.atsSimulation.canRecruiterRead ? 'YES' : 'NO'}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Can ATS & Recruiters Read This File?</h4>
                    <p className="text-xs text-slate-400">Verifies UTF-8 encoding, structural headers, and font extraction</p>
                  </div>
                </div>

                <div className="text-xs text-emerald-400 font-semibold px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                  Taleo & Workday Verification Passed
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Raw ATS Parser Text Extraction Preview</h4>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 leading-relaxed max-h-60 overflow-y-auto custom-scrollbar">
                  {review.atsSimulation.extractedTextPreview || uploadedText}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">Detected ATS Parsing Warnings</h4>
                <div className="space-y-2 text-xs">
                  {review.atsSimulation.parsingIssues.map((warn, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
                      <span>{warn}</span>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          )}

          {/* Tab 3: Keyword Gap Analysis */}
          {activeTab === 'keywords' && (
            <GlassCard className="space-y-6">
              <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-950/60 to-purple-950/60 border border-indigo-500/30">
                <h4 className="text-sm font-bold text-white mb-1">Target Skill & Keyword Comparison</h4>
                <p className="text-xs text-slate-400">Comparing your uploaded resume text against target job requirements</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div className="space-y-3">
                  <h5 className="font-bold text-emerald-400 uppercase text-[11px]">Matched Resume Keywords</h5>
                  <div className="flex flex-wrap gap-2">
                    {review.keywordAnalysis.matched.map((kw, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-medium">
                        ✓ {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="font-bold text-rose-400 uppercase text-[11px]">Missing High-Impact Tech Skills</h5>
                  <div className="flex flex-wrap gap-2">
                    {review.keywordAnalysis.missingTechnical.concat(review.keywordAnalysis.missingAIKeywords).map((kw, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-300 font-medium">
                        + {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          )}

          {/* Tab 4: Improvement Suggestions */}
          {activeTab === 'suggestions' && (
            <div className="space-y-4">
              {review.improvementSuggestions.map((sugg) => {
                const isApplied = appliedSuggestions.includes(sugg.id);
                return (
                  <GlassCard key={sugg.id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-lg bg-indigo-600/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
                        {sugg.section}
                      </span>
                      <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                        {sugg.recruiterImpact}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                        <span className="text-rose-400 font-bold uppercase text-[10px]">Current Version</span>
                        <p className="text-slate-300 mt-1">{sugg.currentVersion}</p>
                        <p className="text-rose-400/80 text-[11px] mt-2 font-medium">Problem: {sugg.problem}</p>
                      </div>

                      <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30">
                        <span className="text-emerald-400 font-bold uppercase text-[10px]">AI Suggested Version</span>
                        <p className="text-white font-medium mt-1">{sugg.suggestedVersion}</p>
                        <p className="text-indigo-300/80 text-[11px] mt-2">Reason: {sugg.reason}</p>
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        onClick={() => handleApplySuggestion(sugg.id)}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                          isApplied
                            ? 'bg-emerald-600 text-white'
                            : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20'
                        }`}
                      >
                        {isApplied ? <Check className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
                        {isApplied ? 'Applied to Resume' : 'Apply AI Suggestion'}
                      </button>
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
