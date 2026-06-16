'use client';

import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  title: string;
  value: number | string;
  subtitle?: string;
  color?: 'blue' | 'purple' | 'indigo';
}

export default function StatsCard({ 
  icon: Icon, 
  title, 
  value, 
  subtitle,
  color = 'blue' 
}: StatsCardProps) {
  const colorClasses = {
    blue: 'bg-[#6b8af6] text-white',
    purple: 'bg-[#483D8B] text-white',
    indigo: 'bg-[#3c45b9] text-white',
  };

  const bgColorClasses = {
    blue: 'bg-[#6b8af6]/10',
    purple: 'bg-[#483D8B]/10',
    indigo: 'bg-[#3c45b9]/10',
  };

  const iconColorClasses = {
    blue: 'text-[#6b8af6]',
    purple: 'text-[#483D8B]',
    indigo: 'text-[#3c45b9]',
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {subtitle && (
            <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
        
        <div className={`p-3 rounded-lg ${bgColorClasses[color]}`}>
          <Icon size={24} className={iconColorClasses[color]} />
        </div>
      </div>
    </div>
  );
}
