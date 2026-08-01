'use client';

import React from 'react';
import { CinematicHero } from './CinematicHero';

interface HeroSectionProps {
  onOpenAuth: (mode: 'signup' | 'login') => void;
  user: any;
}

export function HeroSection({ onOpenAuth, user }: HeroSectionProps) {
  return <CinematicHero onOpenAuth={onOpenAuth} user={user} />;
}
