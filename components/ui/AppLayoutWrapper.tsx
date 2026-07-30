'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { useAuth } from '@/context/AuthContext';

export function AppLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();

  // Root Landing Page (/) is Full Width without Left Sidebar
  const isLandingPage = pathname === '/';

  // Route Protection: If user is logged out on an internal route, redirect to Landing Page (/)
  useEffect(() => {
    if (!loading && !user && !isLandingPage) {
      router.push('/');
    }
  }, [user, loading, isLandingPage, router]);

  if (isLandingPage) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
      </div>
    );
  }

  // Internal SaaS Dashboard pages (/dashboard, /review, /builder, etc.) have the Left Sidebar layout
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      <Navbar />
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex gap-6">
        <aside className="hidden lg:block w-64 shrink-0">
          <Sidebar />
        </aside>
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
