import React from 'react';

interface StatBadgeProps {
  icon: string;
  value: number;
  label: string;
}

export default function StatBadge({ icon, value, label }: StatBadgeProps) {
  // Format large numbers
  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="flex items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
      <span className="text-2xl mr-3">{icon}</span>
      <div>
        <div className="font-bold text-xl">{formatNumber(value)}</div>
        <div className="text-xs text-gray-400 mt-1">{label}</div>
      </div>
    </div>
  );
}
