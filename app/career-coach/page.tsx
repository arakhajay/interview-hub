'use client';

import React, { useState } from 'react';
import { Bot, Sparkles, Send, User, Lightbulb, ArrowRight } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

export default function CareerCoachPage() {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; time: string }>>([
    {
      sender: 'ai',
      text: 'Hello Alex! I am your AI Executive Career Coach. How can I help you accelerate your job search, negotiate salary, or prepare for technical interviews today?',
      time: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const samplePrompts = [
    'How do I negotiate my salary for a Senior AI role?',
    'Prepare me for a Google Systems Engineering interview',
    'Which AI & LLM skills should I learn in 2026?',
    'Review my LinkedIn profile headline & summary',
    'Should I pivot from Full Stack to Machine Learning Engineering?'
  ];

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMsg = { sender: 'user' as const, text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    setTimeout(() => {
      let responseText = 'That is a great career objective! ';
      if (text.toLowerCase().includes('salary') || text.toLowerCase().includes('negotiate')) {
        responseText += 'When negotiating a Senior Tech salary ($160k - $200k+), focus on value delivery rather than personal need. Always wait for the employer to make the first monetary offer, and anchor your target based on market data for your region.';
      } else if (text.toLowerCase().includes('google') || text.toLowerCase().includes('interview')) {
        responseText += 'For Google / Big Tech interviews, prioritize: 1) System Scalability (handling 1M QPS), 2) Data Structures & Algorithms, 3) Google Leadership Principles & STAR behavioral stories.';
      } else if (text.toLowerCase().includes('skills') || text.toLowerCase().includes('learn')) {
        responseText += 'In 2026, the highest ROI technical skills are: Vector Databases (Qdrant, Pinecone), LangChain / LlamaIndex agentic workflows, FastAPI microservices, and Kubernetes Helm automation.';
      } else {
        responseText += 'I recommend reviewing your resume ATS score first, ensuring every bullet point includes STAR quantified metrics, and matching your profile against top job descriptions.';
      }

      setMessages(prev => [...prev, {
        sender: 'ai',
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-panel bg-gradient-to-r from-purple-900/40 via-indigo-900/30 to-slate-900/60 border border-purple-500/20">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-purple-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" /> AI Executive Career Advisor
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">AI Career Coach</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Get 24/7 expert advice on salary negotiation, interview strategies, and career roadmaps.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Chat Window (8 Columns) */}
        <GlassCard className="lg:col-span-8 flex flex-col h-[600px]">
          {/* Message Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 text-xs ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[80%] p-3.5 rounded-2xl ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-none shadow-md shadow-indigo-600/20'
                    : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none leading-relaxed'
                }`}>
                  <p>{msg.text}</p>
                  <span className="block text-[10px] text-slate-400/80 mt-1 text-right">{msg.time}</span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex gap-2 items-center text-xs text-slate-400 p-2">
                <Bot className="w-4 h-4 text-purple-400 animate-spin" /> Coach is thinking...
              </div>
            )}
          </div>

          {/* Input Bar */}
          <div className="p-3 border-t border-slate-800/80 bg-slate-950/60 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask your AI Career Coach anything (e.g. How to answer salary expectation questions?)..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
            <button
              onClick={() => handleSend()}
              disabled={loading}
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 transition shadow-md shadow-purple-600/20 disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </GlassCard>

        {/* Quick Sample Prompts Sidebar (4 Columns) */}
        <GlassCard className="lg:col-span-4 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-400" /> Recommended Coach Prompts
          </h4>

          <div className="space-y-2">
            {samplePrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="w-full text-left p-3 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800 hover:border-purple-500/40 text-xs text-slate-300 hover:text-white transition flex items-center justify-between group"
              >
                <span>{prompt}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition" />
              </button>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
