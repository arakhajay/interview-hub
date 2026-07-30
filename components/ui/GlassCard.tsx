'use client';

import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: 'none' | 'indigo' | 'emerald' | 'violet';
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  glow = 'none'
}) => {
  let glowStyle = '';
  if (glow === 'indigo') glowStyle = 'glow-indigo';
  if (glow === 'emerald') glowStyle = 'glow-emerald';

  return (
    <div className={`glass-panel glass-panel-hover p-6 ${glowStyle} ${className}`}>
      {children}
    </div>
  );
};
