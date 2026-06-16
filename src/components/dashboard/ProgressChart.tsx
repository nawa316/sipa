"use client";

import { ChartDataPoint } from "@/types";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function ProgressChart({ data }: { data: ChartDataPoint[] }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-full min-h-[350px] flex flex-col">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-900">Tren Adopsi Bulanan</h3>
        <p className="text-sm text-slate-500">Statistik Anak Masuk vs Adopsi Selesai (6 bulan terakhir)</p>
      </div>
      <div className="flex-1 w-full min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorMasuk" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorSelesai" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Area type="monotone" dataKey="anakMasuk" name="Anak Masuk" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorMasuk)" />
            <Area type="monotone" dataKey="adopsiSelesai" name="Adopsi Selesai" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorSelesai)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
