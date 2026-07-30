'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { UserProfile } from '@/lib/types';
import { INITIAL_USER_PROFILE } from '@/lib/mock-data';

interface AuthContextType {
  user: { email: string; fullName: string } | null;
  profile: UserProfile;
  loading: boolean;
  login: (email: string, fullName?: string) => void;
  signup: (email: string, fullName: string) => void;
  logout: () => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: INITIAL_USER_PROFILE,
  loading: false,
  login: () => {},
  signup: () => {},
  logout: () => {},
  updateProfile: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ email: string; fullName: string } | null>(null);
  const [profile, setProfile] = useState<UserProfile>(INITIAL_USER_PROFILE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const storedUser = localStorage.getItem('magic_prompt_user');
        const storedProfile = localStorage.getItem('magic_prompt_user_profile');

        let nameToUse = 'Sanghamitra Gawai';
        let emailToUse = 'sanghamitra.g97@gmail.com';

        if (storedUser) {
          const parsed = JSON.parse(storedUser);
          setUser(parsed);
          nameToUse = parsed.fullName || nameToUse;
          emailToUse = parsed.email || emailToUse;
        }

        if (storedProfile) {
          const parsedProf = JSON.parse(storedProfile);
          setProfile(parsedProf);
        } else {
          setProfile(prev => ({
            ...prev,
            fullName: nameToUse,
            email: emailToUse
          }));
        }

        // Supabase session listener
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const name = session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || nameToUse;
          const authUser = { email: session.user.email || emailToUse, fullName: name };
          setUser(authUser);
          localStorage.setItem('magic_prompt_user', JSON.stringify(authUser));
          setProfile(prev => ({
            ...prev,
            fullName: name,
            email: session.user.email || emailToUse
          }));
        }
      } catch (e) {
        console.error('Error loading session:', e);
      } finally {
        setLoading(false);
      }
    };

    loadSession();
  }, []);

  const signup = (email: string, fullName: string) => {
    const newUser = { email, fullName };
    setUser(newUser);
    localStorage.setItem('magic_prompt_user', JSON.stringify(newUser));

    const newProfile: UserProfile = {
      ...INITIAL_USER_PROFILE,
      fullName,
      email,
      isComplete: false
    };
    setProfile(newProfile);
    localStorage.setItem('magic_prompt_user_profile', JSON.stringify(newProfile));
  };

  const login = (email: string, fullName?: string) => {
    const userName = fullName || email.split('@')[0];
    const loggedInUser = { email, fullName: userName };
    setUser(loggedInUser);
    localStorage.setItem('magic_prompt_user', JSON.stringify(loggedInUser));

    const storedProfile = localStorage.getItem('magic_prompt_user_profile');
    if (storedProfile) {
      try {
        setProfile(JSON.parse(storedProfile));
        return;
      } catch {}
    }

    const newProfile: UserProfile = {
      ...INITIAL_USER_PROFILE,
      fullName: userName,
      email,
      isComplete: false
    };
    setProfile(newProfile);
    localStorage.setItem('magic_prompt_user_profile', JSON.stringify(newProfile));
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    setProfile(prev => {
      const next = { ...prev, ...updated };
      localStorage.setItem('magic_prompt_user_profile', JSON.stringify(next));
      return next;
    });
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch {}
    setUser(null);
    localStorage.removeItem('magic_prompt_user');
    localStorage.removeItem('magic_prompt_user_profile');
    setProfile(INITIAL_USER_PROFILE);
    
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
