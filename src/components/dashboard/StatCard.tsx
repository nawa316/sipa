import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  className?: string;
}

export function StatCard({ title, value, icon, trend, className }: StatCardProps) {
  return (
    <div className={cn("bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between", className)}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-medium text-slate-500">{title}</h3>
        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
          {icon}
        </div>
      </div>
      <div>
        <p className="text-3xl font-bold text-slate-900">{value}</p>
        {trend && (
          <p className="mt-2 text-sm flex items-center gap-1">
            <span className={trend.isPositive ? "text-emerald-600 font-medium" : "text-rose-600 font-medium"}>
              {trend.isPositive ? "↑" : "↓"} {trend.value}
            </span>
            <span className="text-slate-500">dari bulan lalu</span>
          </p>
        )}
      </div>
    </div>
  );
}
