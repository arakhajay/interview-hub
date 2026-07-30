'use client';

import React from 'react';

interface GaugeMeterProps {
  score: number; // 0 to 100
  size?: number;
  label?: string;
  sublabel?: string;
}

export const GaugeMeter: React.FC<GaugeMeterProps> = ({
  score,
  size = 180,
  label = 'ATS Score',
  sublabel = 'Recruiter Approved'
}) => {
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let colorClass = '#EF4444'; // Red
  let badgeText = 'Needs Work';
  if (score >= 80) {
    colorClass = '#10B981'; // Green
    badgeText = 'Excellent';
  } else if (score >= 65) {
    colorClass = '#F59E0B'; // Amber
    badgeText = 'Moderate';
  }

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div style={{ width: size, height: size }} className="relative flex items-center justify-center">
        <svg width={size} height={size} className="rotate-[-90deg]">
          {/* Background Ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Animated Gauge Ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={colorClass}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="none"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center Score Counter */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-4xl font-extrabold tracking-tight text-white">
            {score}
            <span className="text-lg font-normal text-slate-400">/100</span>
          </span>
          <span className="text-xs font-semibold px-2 py-0.5 mt-1 rounded-full text-white" style={{ backgroundColor: colorClass }}>
            {badgeText}
          </span>
        </div>
      </div>

      <div className="mt-3 text-center">
        <div className="text-sm font-semibold text-slate-200">{label}</div>
        {sublabel && <div className="text-xs text-slate-400">{sublabel}</div>}
      </div>
    </div>
  );
};
