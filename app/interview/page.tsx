'use client';

import React, { useState } from 'react';
import { Mic, Sparkles, Send, CheckCircle2, Play, RefreshCw, Trophy, Award, MessageSquare, Volume2, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { evaluateMockAnswerWithAI } from '@/lib/openai';
import { MockInterviewAnswerEvaluation } from '@/lib/types';

export default function InterviewPage() {
  const [role, setRole] = useState('Senior AI Systems Engineer');
  const [experience, setExperience] = useState('Senior (5-8 yrs)');
  const [company, setCompany] = useState('OpenAI / Google');
  const [difficulty, setDifficulty] = useState('Hard');
  const [interviewType, setInterviewType] = useState('Technical & System Design');

  const [sessionActive, setSessionActive] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [evaluating, setEvaluating] = useState(false);
  const [evaluations, setEvaluations] = useState<MockInterviewAnswerEvaluation[]>([]);
  const [currentEval, setCurrentEval] = useState<MockInterviewAnswerEvaluation | null>(null);

  const mockQuestions = [
    {
      id: 'q1',
      category: 'Generative AI & LLM Systems',
      question: 'How do you design a real-time Retrieval-Augmented Generation (RAG) system with hybrid BM25 + Vector Search to achieve <200ms p99 latency?',
      tips: 'Mention vector store indexing (HNSW), embedding quantization, reranking, and Redis prompt cache.'
    },
    {
      id: 'q2',
      category: 'System Design & High Availability',
      question: 'Walk me through how you architect microservices to handle 12,000 requests/sec with 99.99% uptime. How do you manage database connection pools and circuit breakers?',
      tips: 'Cover async event queues (Kafka), PostgreSQL connection pooling (pgBouncer), and resilience patterns.'
    },
    {
      id: 'q3',
      category: 'Behavioral & Leadership',
      question: 'Tell me about a time when a critical production service went down due to an unhandled edge case. How did you lead the incident response and post-mortem?',
      tips: 'Use the STAR method (Situation, Task, Action, Result). Highlight blameless post-mortem and automated regression testing.'
    }
  ];

  const handleStartSession = () => {
    setSessionActive(true);
    setCurrentQuestionIdx(0);
    setEvaluations([]);
    setCurrentEval(null);
    setUserAnswer('');
  };

  const handleSubmitAnswer = async () => {
    if (!userAnswer.trim()) {
      alert('Please type or record your answer before submitting.');
      return;
    }

    setEvaluating(true);
    const q = mockQuestions[currentQuestionIdx];
    try {
      const evaluation = await evaluateMockAnswerWithAI(q.question, userAnswer, q.category);
      setCurrentEval(evaluation);
      setEvaluations(prev => [...prev, evaluation]);
    } catch {
      // fallback
    } finally {
      setEvaluating(false);
    }
  };

  const handleNextQuestion = () => {
    setCurrentEval(null);
    setUserAnswer('');
    if (currentQuestionIdx < mockQuestions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      // Completed session
    }
  };

  const activeQuestion = mockQuestions[currentQuestionIdx];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-panel bg-gradient-to-r from-emerald-900/40 via-teal-900/30 to-slate-900/60 border border-emerald-500/20">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" /> AI Interactive Mock Interview Studio
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Interview Preparation & Mock Studio</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Practice live questions scored across Confidence, Technical Depth, Correctness, and Communication.
          </p>
        </div>
      </div>

      {/* Setup Configurator vs Active Studio */}
      {!sessionActive ? (
        <GlassCard className="max-w-2xl mx-auto space-y-6">
          <div className="text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-3">
              <Mic className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Configure Your AI Mock Interview</h3>
            <p className="text-xs text-slate-400 mt-1">Customize the environment to match target company standards</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Target Role</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Experience Level</label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              >
                <option>Entry Level (0-2 yrs)</option>
                <option>Mid Level (2-5 yrs)</option>
                <option>Senior (5-8 yrs)</option>
                <option>Lead / Staff (8+ yrs)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Target Company</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Interview Type</label>
              <select
                value={interviewType}
                onChange={(e) => setInterviewType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              >
                <option>Technical & System Design</option>
                <option>Generative AI & LLM Engineering</option>
                <option>Coding & Algorithm</option>
                <option>Behavioral & STAR</option>
                <option>Managerial & Case Study</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleStartSession}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition"
          >
            <Play className="w-4 h-4 fill-white" /> Start AI Mock Interview Session <ArrowRight className="w-4 h-4" />
          </button>
        </GlassCard>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Interview Stream (7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Active Question Banner */}
            <GlassCard glow="emerald" className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                  Question {currentQuestionIdx + 1} of {mockQuestions.length}
                </span>
                <span className="text-xs text-slate-400 font-semibold uppercase">{activeQuestion.category}</span>
              </div>

              <h3 className="text-base font-bold text-white leading-relaxed">{activeQuestion.question}</h3>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Tip: {activeQuestion.tips}</span>
              </div>
            </GlassCard>

            {/* Answer Input Field */}
            <GlassCard className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Your Answer (Type or Speak)</label>
                <span className="text-[11px] text-slate-500">{userAnswer.length} chars</span>
              </div>

              <textarea
                rows={7}
                placeholder="Type your structured answer here (e.g. using STAR approach or technical architectural details)..."
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                disabled={evaluating || !!currentEval}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 leading-relaxed disabled:opacity-60"
              />

              {!currentEval ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={evaluating}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition disabled:opacity-50"
                >
                  {evaluating ? (
                    <span className="flex items-center gap-2"><RefreshCw className="w-4 h-4 animate-spin" /> Evaluating Answer with AI...</span>
                  ) : (
                    <>Submit & Grade Answer <Send className="w-4 h-4" /></>
                  )}
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition"
                >
                  Next Question <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </GlassCard>
          </div>

          {/* Right Column: AI Grade & Evaluation Breakdown (5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            {currentEval ? (
              <GlassCard glow="emerald" className="space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-emerald-400" /> AI Response Evaluation
                  </h4>
                  <span className="text-xl font-extrabold text-emerald-400">{currentEval.score} / 100</span>
                </div>

                {/* Score Breakdown Radar Metrics */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 text-[10px]">Confidence</span>
                    <p className="font-bold text-emerald-400 text-sm">{currentEval.confidence}%</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 text-[10px]">Technical Accuracy</span>
                    <p className="font-bold text-indigo-400 text-sm">{currentEval.technicalAccuracy}%</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 text-[10px]">Depth & Detail</span>
                    <p className="font-bold text-cyan-400 text-sm">{currentEval.depth}%</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 text-[10px]">Communication</span>
                    <p className="font-bold text-purple-400 text-sm">{currentEval.communication}%</p>
                  </div>
                </div>

                {/* AI Recruiter Feedback */}
                <div>
                  <span className="text-xs font-bold uppercase text-slate-300 block mb-1">Recruiter Feedback & Critique</span>
                  <p className="text-xs text-slate-300 leading-relaxed p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                    {currentEval.feedback}
                  </p>
                </div>

                {/* Ideal Answer Benchmark */}
                <div>
                  <span className="text-xs font-bold uppercase text-emerald-400 block mb-1">Benchmark Ideal Answer</span>
                  <p className="text-xs text-emerald-200/90 leading-relaxed p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20">
                    {currentEval.idealAnswer}
                  </p>
                </div>
              </GlassCard>
            ) : (
              <GlassCard className="p-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">Ready for Question #{currentQuestionIdx + 1}</h4>
                <p className="text-xs text-slate-400">
                  Type your response on the left and submit. AI will grade your technical depth and confidence.
                </p>
              </GlassCard>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
