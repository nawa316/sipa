"use client";

import { motion } from "framer-motion";
import { Users, UserPlus, FileCheck, CheckCircle2 } from "lucide-react";

import { StatCard } from "@/components/dashboard/StatCard";
import { ActivityTimeline } from "@/components/dashboard/ActivityTimeline";
import { ProgressChart } from "@/components/dashboard/ProgressChart";
import { RecommendationTable } from "@/components/dashboard/RecommendationTable";

import { mockActivities, mockChartData, mockMatching } from "@/data/mockData";

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Anak Terdaftar",
      value: 124,
      icon: <Users className="w-6 h-6" />,
      trend: { value: "12%", isPositive: true },
    },
    {
      title: "Total COTA Aktif",
      value: 86,
      icon: <UserPlus className="w-6 h-6" />,
      trend: { value: "5%", isPositive: true },
    },
    {
      title: "Menunggu Verifikasi",
      value: 12,
      icon: <FileCheck className="w-6 h-6" />,
      trend: { value: "2", isPositive: false },
    },
    {
      title: "Adopsi Selesai (Bulan Ini)",
      value: 8,
      icon: <CheckCircle2 className="w-6 h-6" />,
      trend: { value: "14%", isPositive: true },
    },
  ];

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard Interaktif</h1>
        <p className="text-slate-500 mt-1">
          Ringkasan aktivitas dan metrik pelayanan adopsi anak SIPA.
        </p>
      </div>

      {/* Stat Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, idx) => (
          <StatCard
            key={idx}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
          />
        ))}
      </motion.div>

      {/* Middle Section: Chart & Timeline */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        <div className="lg:col-span-2">
          <ProgressChart data={mockChartData} />
        </div>
        <div>
          <ActivityTimeline activities={mockActivities} />
        </div>
      </motion.div>

      {/* Bottom Section: Recommendation Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <RecommendationTable recommendations={mockMatching} />
      </motion.div>
    </div>
  );
}
