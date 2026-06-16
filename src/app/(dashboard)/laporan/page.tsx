"use client";

import { KPIGrid } from "@/components/laporan/KPIGrid";
import { AnalyticsChart } from "@/components/laporan/AnalyticsChart";
import { GeoDistribution } from "@/components/laporan/GeoDistribution";
import { ExecutiveSummary } from "@/components/laporan/ExecutiveSummary";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, Area, AreaChart, PieChart, Pie, Cell, ScatterChart, Scatter, ZAxis } from "recharts";

// Mock Data for Line Chart (Trends)
const trendData = [
  { month: "Jan", pendaftar: 12, adopsi: 3 },
  { month: "Feb", pendaftar: 19, adopsi: 5 },
  { month: "Mar", pendaftar: 15, adopsi: 8 },
  { month: "Apr", pendaftar: 22, adopsi: 12 },
  { month: "Mei", pendaftar: 28, adopsi: 15 },
  { month: "Jun", pendaftar: 35, adopsi: 20 },
];

// Mock Data for Pie/Donut (Verification Status)
const verificationData = [
  { name: 'Disetujui', value: 84 },
  { name: 'Proses Review', value: 35 },
  { name: 'Ditolak', value: 12 },
];
const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

// Mock Data for Scatter (Matching Analytics - Score vs Duration)
const scatterData = [
  { score: 95, duration: 10, name: 'C001' },
  { score: 88, duration: 25, name: 'C002' },
  { score: 75, duration: 40, name: 'C003' },
  { score: 92, duration: 15, name: 'C004' },
  { score: 81, duration: 30, name: 'C005' },
  { score: 65, duration: 60, name: 'C006' },
  { score: 98, duration: 5, name: 'C007' },
];

export default function LaporanPage() {
  return (
    <div className="pb-16 max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="mb-2">
        <h1 className="text-2xl font-bold text-slate-900">Executive Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Sistem Pelaporan Terpadu Pelayanan Adopsi Anak Jawa Timur</p>
      </div>

      {/* 1. Executive Summary */}
      <ExecutiveSummary />

      {/* 2. KPI Cards */}
      <KPIGrid />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 3. Line Chart - Trends */}
        <AnalyticsChart 
          title="Tren Pendaftaran vs Adopsi Berhasil" 
          subtitle="Pertumbuhan komparatif selama 6 bulan terakhir."
        >
          <AreaChart data={trendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPendaftar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorAdopsi" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} dx={-10} />
            <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
            <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }} />
            <Area type="monotone" dataKey="pendaftar" name="Pendaftar Baru" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorPendaftar)" />
            <Area type="monotone" dataKey="adopsi" name="Adopsi Final" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorAdopsi)" />
          </AreaChart>
        </AnalyticsChart>

        {/* 4. Geographic Distribution */}
        <GeoDistribution />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 5. Donut Chart - Verification Status */}
        <div className="lg:col-span-1">
          <AnalyticsChart 
            title="Status Verifikasi COTA" 
            subtitle="Proporsi pendaftar berdasarkan kelengkapan berkas."
            height={280}
          >
            <PieChart>
              <Pie
                data={verificationData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {verificationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '12px' }} />
            </PieChart>
          </AnalyticsChart>
        </div>

        {/* 6. Smart Matching Analytics (Scatter Plot) */}
        <div className="lg:col-span-2">
          <AnalyticsChart 
            title="Korelasi Smart Matching" 
            subtitle="Distribusi Confidence Score berbanding Durasi Penantian (hari)."
            height={280}
          >
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis type="number" dataKey="score" name="Skor Kecocokan (%)" domain={[50, 100]} tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <YAxis type="number" dataKey="duration" name="Waktu Tunggu (Hari)" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <ZAxis type="category" dataKey="name" name="ID COTA" />
              <RechartsTooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Scatter name="Kandidat Adopsi" data={scatterData} fill="#8b5cf6" />
            </ScatterChart>
          </AnalyticsChart>
        </div>
      </div>
    </div>
  );
}
