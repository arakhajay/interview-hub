'use client';

import React, { useState } from 'react';
import { Target, Sparkles, FileText, CheckCircle2, AlertCircle, Copy, Check, ArrowRight, Building, User, RefreshCw, Send } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GaugeMeter } from '@/components/ui/GaugeMeter';
import { INITIAL_RESUME_DATA } from '@/lib/mock-data';
import { matchJobDescriptionWithAI } from '@/lib/openai';
import { JobMatchResult } from '@/lib/types';

export default function JobMatchPage() {
  const [jobDescription, setJobDescription] = useState('');
  const [companyName, setCompanyName] = useState('OpenAI');
  const [roleTitle, setRoleTitle] = useState('Senior AI Systems Engineer');
  const [recruiterName, setRecruiterName] = useState('Hiring Committee');
  const [coverTone, setCoverTone] = useState<'Professional' | 'Friendly' | 'Executive' | 'Technical'>('Technical');

  const [matchResult, setMatchResult] = useState<JobMatchResult | null>(null);
  const [coverLetter, setCoverLetter] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleRunMatch = async () => {
    if (!jobDescription.trim()) {
      alert('Please paste a Job Description to match against your resume.');
      return;
    }

    setLoading(true);
    try {
      const res = await matchJobDescriptionWithAI(INITIAL_RESUME_DATA, jobDescription);
      setMatchResult(res);

      // Generate customized cover letter
      const letter = `Dear ${recruiterName || 'Hiring Team'},

I am writing to express my enthusiastic interest in the ${roleTitle} position at ${companyName}. With over 6 years of hands-on experience designing high-performance distributed microservices, scalable RAG architectures, and cloud infrastructure, I am confident in my ability to make an immediate, measurable impact on your engineering objectives.

In my recent work at Apex AI Labs, I architected an enterprise Retrieval-Augmented Generation (RAG) pipeline utilizing LangChain, OpenAI GPT-4o, and Qdrant Vector DB, which reduced average query resolution latency by 42% for over 150k monthly active users. Furthermore, I have led high-throughput FastAPI and Node.js microservice deployments processing 12,000 requests/sec with 99.99% SLA across multi-region AWS EKS clusters.

Your position's emphasis on ${res.matchedSkills.slice(0, 3).join(', ')} aligns seamlessly with my core technical background. I am eager to bring my expertise in STAR-quantified system optimization to ${companyName}.

Thank you for your time and consideration. I look forward to the opportunity to discuss how my background and technical leadership align with your vision.

Sincerely,
Alex Vance
alex.vance@example.com | +1 (555) 234-5678`;

      setCoverLetter(letter);
    } catch {
      alert('Match failed.');
    } finally {
      setLoading(false);
    }
  };

  const copyCoverLetter = () => {
    if (coverLetter) {
      navigator.clipboard.writeText(coverLetter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-panel bg-gradient-to-r from-cyan-900/40 via-indigo-900/30 to-slate-900/60 border border-cyan-500/20">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" /> AI Job Matcher & Cover Letter Generator
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Job Description Matching</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Compare your resume against target job postings to uncover skill gaps & generate tailored cover letters.
          </p>
        </div>
      </div>

      {/* Input Section Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Job Input Form (5 Columns) */}
        <GlassCard className="lg:col-span-5 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Building className="w-4 h-4 text-cyan-400" /> Target Position Details
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Role Title</label>
              <input
                type="text"
                value={roleTitle}
                onChange={(e) => setRoleTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Recruiter Name</label>
              <input
                type="text"
                value={recruiterName}
                onChange={(e) => setRecruiterName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Cover Letter Tone</label>
              <select
                value={coverTone}
                onChange={(e) => setCoverTone(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="Technical">Technical</option>
                <option value="Professional">Professional</option>
                <option value="Friendly">Friendly</option>
                <option value="Executive">Executive</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-400 font-semibold text-xs mb-1">Paste Job Description (JD)</label>
            <textarea
              rows={8}
              placeholder="Paste job requirements, tech stack details, and key responsibilities..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 leading-relaxed"
            />
          </div>

          <button
            onClick={handleRunMatch}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 via-indigo-600 to-cyan-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-cyan-600/30 flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin" /> Matching Skills & Generating Cover Letter...
              </span>
            ) : (
              <>
                <Target className="w-4 h-4" /> Calculate Job Match & Cover Letter <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </GlassCard>

        {/* Right Column: Match Analysis & Cover Letter (7 Columns) */}
        <div className="lg:col-span-7 space-y-6">
          {matchResult ? (
            <div className="space-y-6">
              {/* Match Score Summary Card */}
              <GlassCard glow="emerald" className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center p-6 text-center">
                <div className="sm:col-span-1">
                  <GaugeMeter score={matchResult.matchScore} size={150} label="Job Match Score" sublabel={matchResult.hiringProbability} />
                </div>
                <div className="sm:col-span-2 space-y-2 text-left text-xs">
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="text-slate-400 font-semibold uppercase text-[10px]">Estimated Hiring Probability</span>
                    <p className="text-sm font-bold text-emerald-400 mt-0.5">{matchResult.hiringProbability}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="text-slate-400 font-semibold uppercase text-[10px]">Matched vs Missing Ratio</span>
                    <p className="text-slate-200 mt-0.5">
                      <strong className="text-emerald-400">{matchResult.matchedSkills.length} Matched</strong> • <strong className="text-rose-400">{matchResult.missingSkills.length} Missing</strong>
                    </p>
                  </div>
                </div>
              </GlassCard>

              {/* Matched vs Missing Skills */}
              <GlassCard className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Skill Breakdown Analysis</h4>
                
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-emerald-400 font-semibold block mb-1.5">✓ Matched Technical Skills & Keywords</span>
                    <div className="flex flex-wrap gap-2">
                      {matchResult.matchedSkills.map((sk, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-medium">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-rose-400 font-semibold block mb-1.5">✗ Missing High-Priority Requirements</span>
                    <div className="flex flex-wrap gap-2">
                      {matchResult.missingSkills.map((sk, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-300 font-medium">
                          + {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* AI Generated Cover Letter Card */}
              {coverLetter && (
                <GlassCard className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                      <FileText className="w-4 h-4" /> AI Generated Cover Letter ({coverTone})
                    </h4>
                    <button
                      onClick={copyCoverLetter}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? 'Copied!' : 'Copy Letter'}
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 font-sans leading-relaxed whitespace-pre-wrap">
                    {coverLetter}
                  </div>
                </GlassCard>
              )}
            </div>
          ) : (
            <GlassCard className="p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">Paste a Job Description to Begin</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Our AI will analyze keyword density, evaluate skill match percentages, and craft a tailored cover letter in seconds.
              </p>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
}
