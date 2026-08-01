'use client';

import React from 'react';
import { ShieldCheck, Users, BarChart3, CreditCard, Cpu, MessageSquare, Settings, LogOut, Sparkles, UserCheck } from 'lucide-react';

interface AdminSidebarProps {
  activeTab: 'users' | 'analytics' | 'subscriptions' | 'ai-engine' | 'tickets' | 'settings';
  onSelectTab: (tab: 'users' | 'analytics' | 'subscriptions' | 'ai-engine' | 'tickets' | 'settings') => void;
  onAdminLogout: () => void;
  candidatesCount: number;
}

export function AdminSidebar({ activeTab, onSelectTab, onAdminLogout, candidatesCount }: AdminSidebarProps) {
  const adminNavItems = [
    { id: 'users', label: 'Candidate Directory', icon: Users, badge: `${candidatesCount}` },
    { id: 'analytics', label: 'Telemetry & Analytics', icon: BarChart3, badge: 'Live' },
    { id: 'subscriptions', label: 'Subscriptions & MRR', icon: CreditCard, badge: '$24.6k' },
    { id: 'ai-engine', label: 'AI Engine Config', icon: Cpu, badge: 'Gemini 2.5' },
    { id: 'tickets', label: 'Support Tickets', icon: MessageSquare, badge: '3 Active' },
    { id: 'settings', label: 'System Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 shrink-0 hidden md:flex flex-col h-[calc(100vh-6rem)] sticky top-20 glass-panel bg-slate-950/95 border border-purple-500/20 p-4 rounded-2xl shadow-2xl justify-between">
      <div className="space-y-4">
        {/* Admin Header Badge */}
        <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-purple-600 flex items-center justify-center text-white">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-black text-white tracking-wide">ADMIN PORTAL</span>
          </div>
          <p className="text-[10px] text-purple-300 font-mono">admin@theinterviewhub.ai</p>
        </div>

        {/* Admin Main Navigation */}
        <div className="space-y-1">
          <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-purple-400/80 block mb-2">
            Admin Governance
          </span>
          <nav className="space-y-1">
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id as any)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                    active
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 border border-purple-400/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-purple-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && !active && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-purple-500/10 text-purple-300 border border-purple-500/20">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Admin Sign Out Footer */}
      <div className="pt-3 border-t border-slate-800/80">
        <button
          onClick={onAdminLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold transition"
        >
          <LogOut className="w-3.5 h-3.5" /> Sign Out Admin
        </button>
      </div>
    </aside>
  );
}
