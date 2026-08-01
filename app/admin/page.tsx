'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldAlert, Users, CreditCard, LayoutTemplate, Zap, BarChart3, MessageSquare, AlertCircle, Sparkles, PlusCircle, CheckCircle2, UserPlus, LogOut, ShieldCheck, Settings, Activity, Cpu, Sliders, UserX, UserCheck, MessageSquarePlus, Reply } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { AdminSidebar } from '@/components/ui/AdminSidebar';
import { useAuth, RegisteredUserRecord } from '@/context/AuthContext';
import { SupportTicketRecord } from '@/app/support/page';

export default function AdminPage() {
  const router = useRouter();
  const { user, profile } = useAuth();
  const [isAdminAuth, setIsAdminAuth] = useState<boolean | null>(null);

  const [activeTab, setActiveTab] = useState<'users' | 'analytics' | 'subscriptions' | 'ai-engine' | 'tickets' | 'settings'>('users');
  const [usersList, setUsersList] = useState<RegisteredUserRecord[]>([]);
  const [ticketsList, setTicketsList] = useState<SupportTicketRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [replyTextMap, setReplyTextMap] = useState<Record<string, string>>({});

  // New user modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');

  // System settings state
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [welcomeCredits, setWelcomeCredits] = useState(50);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const auth = localStorage.getItem('interview_hub_admin_auth');
      if (auth !== 'true') {
        router.push('/admin/login');
      } else {
        setIsAdminAuth(true);
        loadUsers();
        loadTickets();
      }
    }
  }, [router]);

  const handleAdminLogout = () => {
    localStorage.removeItem('interview_hub_admin_auth');
    sessionStorage.removeItem('interview_hub_admin_auth');
    localStorage.removeItem('interview_hub_admin_user');
    router.push('/admin/login');
  };

  const loadUsers = () => {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem('interview_hub_all_users');
      let loaded: RegisteredUserRecord[] = raw ? JSON.parse(raw) : [];

      const defaultSeed: RegisteredUserRecord[] = [
        { id: 'usr-1', name: profile?.fullName || 'Sanghamitra Gawai', email: profile?.email || 'sanghamitra.g97@gmail.com', plan: 'Pro SaaS', credits: profile?.aiCreditsRemaining || 50, status: 'Active', createdAt: '2026-07-28' },
        { id: 'usr-2', name: 'Ajay ML', email: 'ajay.ml@example.com', plan: 'Executive', credits: 100, status: 'Active', createdAt: '2026-07-29' },
      ];

      if (!loaded || loaded.length === 0) {
        loaded = defaultSeed;
      }

      setUsersList(loaded);
      localStorage.setItem('interview_hub_all_users', JSON.stringify(loaded));
    } catch (e) {
      console.error('Error loading admin users:', e);
    }
  };

  const loadTickets = () => {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem('interview_hub_support_tickets');
      let loaded: SupportTicketRecord[] = raw ? JSON.parse(raw) : [];

      if (!loaded || loaded.length === 0) {
        loaded = [
          {
            id: 'TKT-101',
            user: 'Sanghamitra Gawai',
            email: 'sanghamitra.g97@gmail.com',
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
            user: 'Ajay ML',
            email: 'ajay.ml@example.com',
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

      setTicketsList(loaded);
    } catch (e) {
      console.error('Error loading support tickets:', e);
    }
  };

  const handleAddCredits = (userId: string, amount: number = 25) => {
    const updated = usersList.map(u => {
      if (u.id === userId) {
        const newCredits = u.credits + amount;
        showToast(`Allocated +${amount} AI credits to ${u.name}`);
        return { ...u, credits: newCredits };
      }
      return u;
    });

    setUsersList(updated);
    localStorage.setItem('interview_hub_all_users', JSON.stringify(updated));
  };

  const handleToggleUserStatus = (userId: string) => {
    const updated = usersList.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === 'Active' ? 'Suspended' : 'Active';
        showToast(`User ${u.name} status set to ${nextStatus}`);
        return { ...u, status: nextStatus };
      }
      return u;
    });

    setUsersList(updated);
    localStorage.setItem('interview_hub_all_users', JSON.stringify(updated));
  };

  const handleUpdateTicketStatus = (ticketId: string, nextStatus: 'Open' | 'In Progress' | 'Resolved') => {
    const updated = ticketsList.map(t => {
      if (t.id === ticketId) {
        const reply = replyTextMap[ticketId];
        showToast(`Ticket ${t.id} set to ${nextStatus}`);
        return {
          ...t,
          status: nextStatus,
          adminResponse: reply ? reply.trim() : t.adminResponse,
        };
      }
      return t;
    });

    setTicketsList(updated);
    localStorage.setItem('interview_hub_support_tickets', JSON.stringify(updated));
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserEmail.trim()) return;

    const name = newUserName.trim() || newUserEmail.split('@')[0];
    const newUser: RegisteredUserRecord = {
      id: `usr-${Date.now()}`,
      name,
      email: newUserEmail.trim(),
      plan: 'Pro SaaS',
      credits: welcomeCredits,
      status: 'Active',
      createdAt: new Date().toISOString().split('T')[0],
    };

    const updated = [newUser, ...usersList];
    setUsersList(updated);
    localStorage.setItem('interview_hub_all_users', JSON.stringify(updated));
    showToast(`Added candidate account ${name} (${newUserEmail})`);

    setNewUserName('');
    setNewUserEmail('');
    setShowAddModal(false);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredUsers = usersList.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isAdminAuth === null) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-slate-400 text-xs">
        Verifying Admin Credentials...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex gap-6">
      {/* Dedicated Admin Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onAdminLogout={handleAdminLogout}
        candidatesCount={usersList.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 space-y-8 relative">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed top-20 right-8 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-purple-600 text-white font-bold text-xs shadow-2xl animate-bounce border border-purple-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            {toastMessage}
          </div>
        )}

        {/* Admin Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-panel bg-gradient-to-r from-purple-950/80 via-slate-900/90 to-indigo-950/80 border border-purple-500/30 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-purple-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] font-bold text-purple-300">
                <Sparkles className="w-3.5 h-3.5" /> THE INTERVIEW HUB • Super Admin Hub
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">Executive Control & Telemetry</h1>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 flex items-center gap-2 transition"
            >
              <UserPlus className="w-4 h-4" /> Add Candidate
            </button>
          </div>
        </div>

        {/* Top Telemetry KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <GlassCard className="p-4 space-y-1">
            <span className="text-slate-400 font-semibold uppercase text-[10px]">Registered Candidates</span>
            <p className="text-2xl font-extrabold text-white">{usersList.length}</p>
            <span className="text-emerald-400 text-[10px]">Active Directory Session</span>
          </GlassCard>

          <GlassCard className="p-4 space-y-1">
            <span className="text-slate-400 font-semibold uppercase text-[10px]">Active Subscriptions</span>
            <p className="text-2xl font-extrabold text-indigo-400">{usersList.length} Pro SaaS</p>
            <span className="text-slate-400 text-[10px]">MRR: $24,650/mo</span>
          </GlassCard>

          <GlassCard className="p-4 space-y-1">
            <span className="text-slate-400 font-semibold uppercase text-[10px]">Support Tickets</span>
            <p className="text-2xl font-extrabold text-amber-400">{ticketsList.length} Total</p>
            <span className="text-slate-400 text-[10px]">Live Candidate Queue</span>
          </GlassCard>

          <GlassCard className="p-4 space-y-1">
            <span className="text-slate-400 font-semibold uppercase text-[10px]">ATS Audit Engine</span>
            <p className="text-2xl font-extrabold text-cyan-400">v3.4-Taleo</p>
            <span className="text-slate-400 text-[10px]">Workday Compliant</span>
          </GlassCard>
        </div>

        {/* TAB 1: User Directory */}
        {activeTab === 'users' && (
          <GlassCard className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">MANAGED CANDIDATE DIRECTORY ({filteredUsers.length})</h3>
              <input
                type="text"
                placeholder="Search candidate by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs w-full sm:w-64 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Candidate</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Subscription</th>
                    <th className="p-3">AI Credits</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Admin Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-900/50 transition">
                      <td className="p-3 font-semibold text-white flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-xs font-bold text-purple-300">
                          {u.name ? u.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        {u.name}
                      </td>
                      <td className="p-3 font-mono text-slate-300">{u.email}</td>
                      <td className="p-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 font-bold text-[11px]">
                          {u.plan}
                        </span>
                      </td>
                      <td className="p-3 font-bold text-amber-400">{u.credits}</td>
                      <td className="p-3">
                        <span className={`font-semibold text-[11px] flex items-center gap-1.5 ${
                          u.status === 'Active' ? 'text-emerald-400' : 'text-rose-400'
                        }`}>
                          <span className={`w-2 h-2 rounded-full ${u.status === 'Active' ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                          {u.status}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-2">
                        <button
                          onClick={() => handleAddCredits(u.id, 25)}
                          className="px-2.5 py-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/40 border border-indigo-500/30 text-indigo-300 hover:text-white text-[11px] font-bold transition inline-flex items-center gap-1"
                        >
                          <PlusCircle className="w-3 h-3 text-indigo-400" /> +25 Credits
                        </button>

                        <button
                          onClick={() => handleToggleUserStatus(u.id)}
                          className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold transition inline-flex items-center gap-1 ${
                            u.status === 'Active'
                              ? 'bg-rose-500/10 hover:bg-rose-500/20 border-rose-500/30 text-rose-300'
                              : 'bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/30 text-emerald-300'
                          }`}
                        >
                          {u.status === 'Active' ? <UserX className="w-3 h-3" /> : <UserCheck className="w-3 h-3" />}
                          {u.status === 'Active' ? 'Suspend' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        )}

        {/* TAB 2: Telemetry & Analytics */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <GlassCard className="space-y-4">
              <h3 className="font-bold text-white uppercase text-xs">Target Role Demand Distribution</h3>
              <div className="space-y-3">
                {[
                  { role: 'AI / LLM Engineer', pct: '42%', color: 'bg-purple-500' },
                  { role: 'Full Stack Software Engineer', pct: '28%', color: 'bg-indigo-500' },
                  { role: 'Cloud & DevOps Architect', pct: '18%', color: 'bg-cyan-500' },
                  { role: 'Engineering Manager', pct: '12%', color: 'bg-emerald-500' },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-slate-300 font-semibold">
                      <span>{item.role}</span>
                      <span>{item.pct}</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full`} style={{ width: item.pct }} />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="space-y-4">
              <h3 className="font-bold text-white uppercase text-xs">ATS Review Score Histogram</h3>
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 text-slate-300">
                <div className="flex justify-between">
                  <span>Average Candidate Match:</span>
                  <strong className="text-emerald-400">84.2%</strong>
                </div>
                <div className="flex justify-between">
                  <span>STAR Formula Usage:</span>
                  <strong className="text-cyan-400">92.6%</strong>
                </div>
                <div className="flex justify-between">
                  <span>Taleo / Workday Compliance:</span>
                  <strong className="text-purple-400">98.1%</strong>
                </div>
              </div>
            </GlassCard>
          </div>
        )}

        {/* TAB 3: Subscriptions & MRR */}
        {activeTab === 'subscriptions' && (
          <GlassCard className="space-y-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Subscription Tiers & Revenue Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Free Candidate Tier</span>
                <p className="text-2xl font-extrabold text-white">500 Active</p>
                <p className="text-slate-500 text-[11px]">Basic ATS Review + 5 AI Rewrites</p>
              </div>
              <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-2">
                <span className="text-indigo-400 font-bold uppercase text-[10px]">Pro SaaS ($29/mo)</span>
                <p className="text-2xl font-extrabold text-indigo-300">750 Subscribers</p>
                <p className="text-slate-400 text-[11px]">$21,750 Monthly Revenue</p>
              </div>
              <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 space-y-2">
                <span className="text-purple-400 font-bold uppercase text-[10px]">Executive ($79/mo)</span>
                <p className="text-2xl font-extrabold text-purple-300">85 Subscribers</p>
                <p className="text-slate-400 text-[11px]">$6,715 Monthly Revenue</p>
              </div>
            </div>
          </GlassCard>
        )}

        {/* TAB 4: AI Engine Config */}
        {activeTab === 'ai-engine' && (
          <GlassCard className="space-y-4 text-xs">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Google Gemini 2.5 Flash Telemetry</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <span className="font-bold text-purple-400 block">Primary Model API Key</span>
                <p className="font-mono text-slate-300">GEMINI_API_KEY (Backend .env secured)</p>
                <span className="text-emerald-400 font-semibold text-[10px]">✓ Active & Connected</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <span className="font-bold text-cyan-400 block">Average Model Latency</span>
                <p className="text-2xl font-extrabold text-white">420ms</p>
                <span className="text-slate-400 text-[10px]">Structured JSON parsing enabled</span>
              </div>
            </div>
          </GlassCard>
        )}

        {/* TAB 5: Support Tickets */}
        {activeTab === 'tickets' && (
          <GlassCard className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Candidate Support Tickets ({ticketsList.length})</h3>
              <span className="text-xs text-amber-400 font-bold">Real-time Candidate Submissions</span>
            </div>

            <div className="space-y-3 text-xs">
              {ticketsList.map((t) => (
                <div key={t.id} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-purple-400 font-bold text-xs">{t.id}</span>
                        <span className="font-bold text-white text-sm">{t.subject}</span>
                      </div>
                      <p className="text-slate-400 text-[11px]">Submitted by <strong className="text-slate-200">{t.user}</strong> ({t.email}) • {t.createdAt}</p>
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

                  <p className="text-slate-300 text-[11px] leading-relaxed">{t.description}</p>

                  {/* Reply Input & Status Toggle */}
                  <div className="pt-2 border-t border-slate-800/60 space-y-2">
                    <input
                      type="text"
                      placeholder="Type admin response for candidate..."
                      value={replyTextMap[t.id] ?? t.adminResponse ?? ''}
                      onChange={(e) => setReplyTextMap({ ...replyTextMap, [t.id]: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-purple-500"
                    />

                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleUpdateTicketStatus(t.id, 'In Progress')}
                        className="px-3 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[11px] font-bold transition"
                      >
                        Set In Progress
                      </button>
                      <button
                        onClick={() => handleUpdateTicketStatus(t.id, 'Resolved')}
                        className="px-3 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/40 border border-emerald-500/40 text-emerald-300 text-[11px] font-bold transition flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Save & Mark Resolved
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        )}

        {/* TAB 6: System Settings */}
        {activeTab === 'settings' && (
          <GlassCard className="space-y-6 text-xs">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Platform Governance Settings</h3>
            <div className="space-y-4 max-w-xl">
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                <div>
                  <span className="font-bold text-white block">Maintenance Mode</span>
                  <span className="text-slate-400 text-[11px]">Pause platform access for system upgrades</span>
                </div>
                <button
                  onClick={() => {
                    setMaintenanceMode(!maintenanceMode);
                    showToast(`Maintenance mode set to ${!maintenanceMode}`);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl font-bold transition ${
                    maintenanceMode ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {maintenanceMode ? 'ON' : 'OFF'}
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <label className="font-bold text-white block">Default Candidate Welcome Credits</label>
                <input
                  type="number"
                  value={welcomeCredits}
                  onChange={(e) => setWelcomeCredits(Number(e.target.value))}
                  className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white w-full max-w-xs"
                />
              </div>
            </div>
          </GlassCard>
        )}

        {/* Add Candidate Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 text-left shadow-2xl">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-purple-400" /> Add Candidate Account
              </h3>
              <form onSubmit={handleCreateUser} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Ajay ML"
                    value={newUserName}
                    onChange={e => setNewUserName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. ajay.ml@example.com"
                    value={newUserEmail}
                    onChange={e => setNewUserEmail(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition shadow-lg shadow-purple-600/30"
                  >
                    Create User
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
