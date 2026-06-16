"use client";

import { ReactNode } from "react";
import { ResponsiveContainer } from "recharts";

interface AnalyticsChartProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  height?: number;
}

export function AnalyticsChart({ title, subtitle, children, height = 300 }: AnalyticsChartProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col">
      <div className="mb-6">
        <h3 className="font-bold text-slate-800">{title}</h3>
        {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
      </div>
      <div className="flex-1 w-full" style={{ height: `${height}px`, minHeight: `${height}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          {children as any}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
