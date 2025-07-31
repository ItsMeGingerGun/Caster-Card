import React from 'react';

interface ScoreRadialProps {
  score: number;
}

export function ScoreRadial({ score }: ScoreRadialProps) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-32 h-32">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#1f2937"
          strokeWidth="10"
        />
        
        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#8b5cf6"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 50 50)"
        />
        
        {/* Score text */}
        <text
          x="50"
          y="55"
          textAnchor="middle"
          fontSize="24"
          fontWeight="bold"
          fill="#ffffff"
          className="font-sans"
        >
          {score}
        </text>
      </svg>
      
      {/* Label */}
      <div className="absolute bottom-0 w-full text-center text-sm text-gray-300 mt-1">
        Neynar Score
      </div>
    </div>
  );
}
