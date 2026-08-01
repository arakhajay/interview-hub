'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, Mail, Sparkles, KeyRound, AlertCircle, ArrowRight } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      // Validate Admin Credentials
      const validEmail = email.trim().toLowerCase() === 'admin@theinterviewhub.ai' || email.trim().toLowerCase() === 'admin';
      const validPass = password === 'AdminHub2026!';

      if (validEmail && validPass) {
        localStorage.setItem('interview_hub_admin_auth', 'true');
        sessionStorage.setItem('interview_hub_admin_auth', 'true');
        localStorage.setItem('interview_hub_admin_user', JSON.stringify({ email: 'admin@theinterviewhub.ai', role: 'Super Admin' }));
        router.push('/admin');
      } else {
        setError('Invalid Admin ID or Password. Check your credentials.');
        setIsLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 relative overflow-hidden py-12">
      {/* Glow Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-600/20 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-purple-400" /> Executive System Control
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Admin Governance Portal</h1>
          <p className="text-xs text-slate-400">Authorized platform administrators only</p>
        </div>

        <GlassCard className="p-8 space-y-6 border-purple-500/20 shadow-2xl">
          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-purple-400" /> Admin Email / ID
              </label>
              <input
                type="text"
                required
                placeholder="admin@theinterviewhub.ai"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-purple-400" /> Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition"
              />
            </div>

            {/* Quick Fill Credentials Hint */}
            <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/20 text-[11px] space-y-1">
              <span className="font-bold text-indigo-300 block">🔑 Administrator Credentials:</span>
              <div className="flex justify-between text-slate-400 font-mono">
                <span>ID: <strong className="text-white">admin@theinterviewhub.ai</strong></span>
                <span>Pass: <strong className="text-white">AdminHub2026!</strong></span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-purple-600/30 transition flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span>Authenticating Admin...</span>
              ) : (
                <>
                  <span>Sign In to Admin Hub</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </GlassCard>
      </div>
    </div>
  );
}
