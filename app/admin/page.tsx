'use client';

import React, { useState } from 'react';
import { ShieldAlert, Users, CreditCard, LayoutTemplate, Zap, BarChart3, MessageSquare, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'users' | 'subscriptions' | 'templates' | 'analytics' | 'tickets'>('users');

  const mockUsers = [
    { id: 'usr-1', name: 'Alex Vance', email: 'alex.vance@example.com', plan: 'Pro SaaS', credits: 45, status: 'Active' },
    { id: 'usr-2', name: 'Sarah Connor', email: 'sarah.c@example.com', plan: 'Executive', credits: 120, status: 'Active' },
    { id: 'usr-3', name: 'Michael Scott', email: 'm.scott@example.com', plan: 'Free', credits: 5, status: 'Active' },
  ];

  const mockTickets = [
    { id: 't-101', user: 'Alex Vance', subject: 'PDF Export formatting issue', status: 'Resolved', date: '2026-07-29' },
    { id: 't-102', user: 'Sarah Connor', subject: 'Requesting custom AI Engineer template', status: 'In Progress', date: '2026-07-30' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-panel bg-gradient-to-r from-purple-900/40 via-indigo-900/30 to-slate-900/60 border border-purple-500/20">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-purple-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" /> Platform Governance & System Control
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Admin Management Panel</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage users, subscriptions, template registry, AI credit distribution, and support tickets.
          </p>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <GlassCard className="p-4 space-y-1">
          <span className="text-slate-400 font-semibold uppercase text-[10px]">Total Users</span>
          <p className="text-2xl font-extrabold text-white">1,420</p>
          <span className="text-emerald-400 text-[10px]">+18% this month</span>
        </GlassCard>

        <GlassCard className="p-4 space-y-1">
          <span className="text-slate-400 font-semibold uppercase text-[10px]">Active Subscriptions</span>
          <p className="text-2xl font-extrabold text-indigo-400">850 Pro</p>
          <span className="text-slate-400 text-[10px]">Stripe integration active</span>
        </GlassCard>

        <GlassCard className="p-4 space-y-1">
          <span className="text-slate-400 font-semibold uppercase text-[10px]">AI Tokens Used</span>
          <p className="text-2xl font-extrabold text-purple-400">4.2M</p>
          <span className="text-slate-400 text-[10px]">OpenAI GPT-4o usage</span>
        </GlassCard>

        <GlassCard className="p-4 space-y-1">
          <span className="text-slate-400 font-semibold uppercase text-[10px]">Support Tickets</span>
          <p className="text-2xl font-extrabold text-amber-400">2 Pending</p>
          <span className="text-slate-400 text-[10px]">Avg response: 15m</span>
        </GlassCard>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        {[
          { id: 'users', label: 'User Directory', icon: Users },
          { id: 'subscriptions', label: 'Subscriptions', icon: CreditCard },
          { id: 'templates', label: 'Resume Templates', icon: LayoutTemplate },
          { id: 'analytics', label: 'Usage Analytics', icon: BarChart3 },
          { id: 'tickets', label: 'Support Tickets', icon: MessageSquare }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      {activeTab === 'users' && (
        <GlassCard className="space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Managed Users</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase text-[10px]">
                <tr>
                  <th className="p-3">User</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Subscription Plan</th>
                  <th className="p-3">AI Credits</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {mockUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">{u.name}</td>
                    <td className="p-3">{u.email}</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold">{u.plan}</span></td>
                    <td className="p-3 font-bold text-amber-400">{u.credits}</td>
                    <td className="p-3"><span className="text-emerald-400 font-semibold">{u.status}</span></td>
                    <td className="p-3 text-right">
                      <button className="text-xs text-indigo-400 hover:underline">Add Credits</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      )}

      {activeTab === 'tickets' && (
        <GlassCard className="space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Platform Feedback & Tickets</h3>
          <div className="space-y-2 text-xs">
            {mockTickets.map((t) => (
              <div key={t.id} className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white">{t.subject}</span>
                  <p className="text-slate-400 text-[11px]">Submitted by {t.user} • {t.date}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                  t.status === 'Resolved' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                }`}>
                  {t.status}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {['subscriptions', 'templates', 'analytics'].includes(activeTab) && (
        <GlassCard className="p-8 text-center text-slate-400 text-xs">
          Operational telemetry and {activeTab} control active. Everything running smoothly.
        </GlassCard>
      )}
    </div>
  );
}
