'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileSearch, FileEdit, Target, Mic, Bot, History, BarChart3, User, ShieldAlert, LogOut, Zap } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { ThemeToggle } from './ThemeToggle';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { profile, logout } = useAuth();

  const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'AI Resume Audit', href: '/review', icon: FileSearch, badge: 'ATS Audit' },
    { label: 'Resume Builder', href: '/builder', icon: FileEdit, badge: '10 Templates' },
    { label: 'Job Description Match', href: '/job-match', icon: Target },
    { label: 'AI Mock Interview', href: '/interview', icon: Mic, badge: 'Interactive' },
    { label: 'AI Career Coach', href: '/career-coach', icon: Bot },
    { label: 'Resume History', href: '/history', icon: History },
    { label: 'Analytics Hub', href: '/analytics', icon: BarChart3 },
    { label: 'User Profile', href: '/profile', icon: User },
    { label: 'Admin Panel', href: '/admin', icon: ShieldAlert },
  ];

  return (
    <aside className="w-64 shrink-0 hidden md:flex flex-col h-[calc(100vh-6rem)] sticky top-20 glass-panel bg-slate-950/90 border border-slate-800/80 p-4 rounded-2xl shadow-xl justify-between">
      <div className="space-y-4">
        {/* Navigation Section */}
        <div className="space-y-1">
          <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">Main Navigation</span>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                    active
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && !active && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer Controls & Logout */}
      <div className="space-y-3 pt-3 border-t border-slate-800/80">
        <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-400 text-[11px]">AI Credits: <strong className="text-white">{profile.aiCreditsRemaining}</strong></span>
          </div>
          <ThemeToggle />
        </div>

        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold transition"
        >
          <LogOut className="w-3.5 h-3.5" /> Sign Out
        </button>
      </div>
    </aside>
  );
};
