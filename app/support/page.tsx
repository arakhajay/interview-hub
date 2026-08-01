'use client';

import React, { useEffect, useState } from 'react';
import { LifeBuoy, Send, MessageSquare, CheckCircle2, Clock, HelpCircle, AlertCircle, Sparkles, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { useAuth } from '@/context/AuthContext';

export interface SupportTicketRecord {
  id: string;
  user: string;
  email: string;
  category: string;
  priority: string;
  subject: string;
  description: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  adminResponse?: string;
  createdAt: string;
}

export default function SupportPage() {
  const { user, profile } = useAuth();

  const [tickets, setTickets] = useState<SupportTicketRecord[]>([]);
  const [category, setCategory] = useState('Resume Audit & ATS');
  const [priority, setPriority] = useState('Medium');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    loadTickets();
  }, [user]);

  const loadTickets = () => {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem('interview_hub_support_tickets');
      let loaded: SupportTicketRecord[] = raw ? JSON.parse(raw) : [];

      if (!loaded || loaded.length === 0) {
        // Initial seed tickets
        loaded = [
          {
            id: 'TKT-101',
            user: profile?.fullName || 'Sanghamitra Gawai',
            email: profile?.email || 'sanghamitra.g97@gmail.com',
            category: 'Resume Audit & ATS',
            priority: 'High',
            subject: 'ATS Score optimization question for Senior Role',
            description: 'Wanted to verify if STAR bullet points are recognized by Taleo ATS scanners.',
            status: 'Resolved',
            adminResponse: 'Yes! STAR formula bullet points receive a 98% Taleo compliance score.',
            createdAt: '2026-07-29',
          },
          {
            id: 'TKT-102',
            user: profile?.fullName || 'Sanghamitra Gawai',
            email: profile?.email || 'sanghamitra.g97@gmail.com',
            category: 'Resume Builder / PDF Export',
            priority: 'Medium',
            subject: 'Request for custom Cloud Architect resume template',
            description: 'Can we add a dedicated Cloud & DevOps certification section layout?',
            status: 'In Progress',
            adminResponse: 'Our design team is building 2 new DevOps templates in release v3.5.',
            createdAt: '2026-07-30',
          },
        ];
        localStorage.setItem('interview_hub_support_tickets', JSON.stringify(loaded));
      }

      setTickets(loaded);
    } catch (e) {
      console.error('Error loading tickets:', e);
    }
  };

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) return;

    const newTicket: SupportTicketRecord = {
      id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
      user: profile?.fullName || user?.fullName || 'Candidate',
      email: profile?.email || user?.email || 'candidate@example.com',
      category,
      priority,
      subject: subject.trim(),
      description: description.trim(),
      status: 'Open',
      createdAt: new Date().toISOString().split('T')[0],
    };

    const updated = [newTicket, ...tickets];
    setTickets(updated);
    localStorage.setItem('interview_hub_support_tickets', JSON.stringify(updated));

    showToast(`Support Ticket ${newTicket.id} submitted successfully!`);
    setSubject('');
    setDescription('');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const faqs = [
    {
      q: 'How does the AI Resume Audit score my resume?',
      a: 'Google Gemini 2.5 Flash analyzes your uploaded resume against Taleo & Workday hiring algorithms, checking STAR action verbs, technical keywords, and executive readability.',
    },
    {
      q: 'How do I download my resume in PDF or DOCX format?',
      a: 'Navigate to the Resume Builder tab, select your preferred template, and click "Download PDF" or "Download DOCX". A print window fallback is also provided.',
    },
    {
      q: 'How do AI Credits work and how are they refilled?',
      a: 'Every candidate receives 50 free AI credits upon onboarding. Custom credit top-ups can also be granted by the platform administrators.',
    },
    {
      q: 'Is my uploaded resume kept private and secure?',
      a: 'Yes, your uploaded documents and profile data are protected with strict RLS policies on Supabase and backend environment encryption.',
    },
  ];

  return (
    <div className="space-y-8 relative">
      {/* Confirmation Toast */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-purple-600 text-white font-bold text-xs shadow-2xl animate-bounce border border-purple-400">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-panel bg-gradient-to-r from-purple-900/40 via-indigo-900/30 to-slate-900/60 border border-purple-500/20">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-purple-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" /> 24/7 Candidate Success & Technical Assistance
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Support & Ticket Portal</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Submit technical inquiries, feedback, or template requests. Our AI Support team responds within 15 minutes.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Ticket Submission Form */}
        <div className="lg:col-span-2 space-y-6">
          <GlassCard className="p-6 space-y-6 border-purple-500/20">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <LifeBuoy className="w-4 h-4 text-purple-400" /> Raise New Support Ticket
            </h3>

            <form onSubmit={handleTicketSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Issue Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="Resume Audit & ATS">Resume Audit & ATS</option>
                    <option value="Resume Builder / PDF Export">Resume Builder / PDF Export</option>
                    <option value="AI Mock Interview">AI Mock Interview</option>
                    <option value="AI Credits & Billing">AI Credits & Billing</option>
                    <option value="Account & Profile">Account & Profile</option>
                    <option value="Feature Request / Feedback">Feature Request / Feedback</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Priority Level *</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="Low">Low - Normal Query</option>
                    <option value="Medium">Medium - Standard Request</option>
                    <option value="High">High - Feature Impairment</option>
                    <option value="Urgent">Urgent - Blocking Issue</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Subject Line *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Need assistance with STAR formula rewrite formatting..."
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Detailed Description *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your question or issue in detail..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Submit Support Ticket
              </button>
            </form>
          </GlassCard>

          {/* Ticket History List */}
          <GlassCard className="p-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-indigo-400" /> Your Submitted Tickets ({tickets.length})
            </h3>

            {tickets.length === 0 ? (
              <p className="text-slate-500 text-xs text-center py-6">You have no active support tickets.</p>
            ) : (
              <div className="space-y-3 text-xs">
                {tickets.map((t) => (
                  <div key={t.id} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-purple-400 font-bold text-xs">{t.id}</span>
                        <span className="font-bold text-white text-sm">{t.subject}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 font-semibold">{t.category}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          t.status === 'Resolved'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : t.status === 'In Progress'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                        }`}>
                          {t.status}
                        </span>
                      </div>
                    </div>

                    <p className="text-slate-300 leading-relaxed text-[11px]">{t.description}</p>

                    {t.adminResponse && (
                      <div className="p-3 rounded-lg bg-purple-950/40 border border-purple-500/30 text-purple-200 mt-2 text-[11px]">
                        <span className="font-bold text-purple-300 block mb-1">💬 Admin Response:</span>
                        {t.adminResponse}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </GlassCard>
        </div>

        {/* Sidebar FAQs */}
        <div className="space-y-6">
          <GlassCard className="p-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-cyan-400" /> Frequently Asked Questions
            </h3>

            <div className="space-y-2 text-xs">
              {faqs.map((faq, idx) => (
                <div key={idx} className="rounded-xl border border-slate-800 bg-slate-950/80 overflow-hidden">
                  <button
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full p-3.5 text-left font-bold text-slate-200 hover:text-white flex items-center justify-between gap-2 transition"
                  >
                    <span>{faq.q}</span>
                    {activeFaq === idx ? <ChevronUp className="w-4 h-4 text-purple-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                  </button>

                  {activeFaq === idx && (
                    <div className="px-3.5 pb-3.5 text-slate-400 leading-relaxed text-[11px] border-t border-slate-800/60 pt-2">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
