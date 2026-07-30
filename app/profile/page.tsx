'use client';

import React, { useState, useEffect } from 'react';
import { User, Sparkles, Save, CheckCircle2, Shield, Globe, DollarSign, MapPin, Briefcase, ArrowRight } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  const { user, profile, updateProfile } = useAuth();

  const [fullName, setFullName] = useState('');
  const [preferredRole, setPreferredRole] = useState('');
  const [preferredLocation, setPreferredLocation] = useState('');
  const [expectedSalary, setExpectedSalary] = useState('');
  const [skillsText, setSkillsText] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [linkedInUrl, setLinkedInUrl] = useState('');
  const [gitHubUrl, setGitHubUrl] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Populate form fields with logged-in user profile
    setFullName(user?.fullName || profile.fullName || 'Sanghamitra Gawai');
    setPreferredRole(profile.preferredRole || 'Senior AI Engineer / Full Stack Lead');
    setPreferredLocation(profile.preferredLocation || 'San Francisco, CA / Remote');
    setExpectedSalary(profile.expectedSalary || '$140,000 - $170,000');
    setSkillsText(profile.skills.length > 0 ? profile.skills.join(', ') : 'Python, TypeScript, React, Next.js, FastAPI, AWS, Docker, RAG');
    setPortfolioUrl(profile.portfolioUrl || 'https://sanghamitra.dev');
    setLinkedInUrl(profile.linkedInUrl || 'https://linkedin.com/in/sanghamitragawai');
    setGitHubUrl(profile.gitHubUrl || 'https://github.com/sanghamitragawai');
  }, [user, profile]);

  const handleSaveAndProceed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !preferredRole.trim()) {
      alert('Please fill out your Full Name and Preferred Job Role before proceeding.');
      return;
    }

    const skillsArray = skillsText.split(',').map(s => s.trim()).filter(Boolean);

    // Save user profile state
    updateProfile({
      fullName,
      preferredRole,
      preferredLocation,
      expectedSalary,
      skills: skillsArray,
      portfolioUrl,
      linkedInUrl,
      gitHubUrl,
      isComplete: true
    });

    setSaved(true);

    setTimeout(() => {
      router.push('/dashboard');
    }, 600);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-panel bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-slate-900/60 border border-indigo-500/20">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" /> Step 1 of Onboarding: User Profile Setup
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">User Profile Details</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Fill in your target career preferences to customize your AI Assistant and Dashboard.
          </p>
        </div>
      </div>

      <form onSubmit={handleSaveAndProceed} className="space-y-8">
        {/* User Profile & Career Details */}
        <GlassCard glow="indigo" className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4 text-indigo-400" /> Career Profile & Preferences
            </h3>
            <span className="text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20">
              Account: {user?.email || profile.email || 'sanghamitra.g97@gmail.com'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Sanghamitra Gawai"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white font-bold focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-indigo-400" /> Preferred Job Role / Title
              </label>
              <input
                type="text"
                required
                value={preferredRole}
                onChange={(e) => setPreferredRole(e.target.value)}
                placeholder="Senior AI Engineer / Full Stack Lead"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" /> Preferred Location
              </label>
              <input
                type="text"
                value={preferredLocation}
                onChange={(e) => setPreferredLocation(e.target.value)}
                placeholder="San Francisco, CA / Remote"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Expected Salary Range
              </label>
              <input
                type="text"
                value={expectedSalary}
                onChange={(e) => setExpectedSalary(e.target.value)}
                placeholder="$140,000 - $170,000"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-slate-300 font-semibold mb-1">Key Technical & Soft Skills (Comma separated)</label>
              <input
                type="text"
                value={skillsText}
                onChange={(e) => setSkillsText(e.target.value)}
                placeholder="Python, TypeScript, React, Next.js, FastAPI, LLMs, RAG, AWS, Docker"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1">
                <Globe className="w-3.5 h-3.5" /> Portfolio URL
              </label>
              <input
                type="text"
                value={portfolioUrl}
                onChange={(e) => setPortfolioUrl(e.target.value)}
                placeholder="https://sanghamitra.dev"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-indigo-400" /> LinkedIn Profile
              </label>
              <input
                type="text"
                value={linkedInUrl}
                onChange={(e) => setLinkedInUrl(e.target.value)}
                placeholder="https://linkedin.com/in/sanghamitragawai"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
              />
            </div>
          </div>
        </GlassCard>

        {/* Save & Proceed CTA */}
        <button
          type="submit"
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-sm shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 transition"
        >
          {saved ? (
            <span className="flex items-center gap-2 text-emerald-300"><CheckCircle2 className="w-5 h-5" /> Profile Saved! Redirecting to Dashboard...</span>
          ) : (
            <>Save Profile Details & Continue to Dashboard <ArrowRight className="w-5 h-5" /></>
          )}
        </button>
      </form>
    </div>
  );
}
