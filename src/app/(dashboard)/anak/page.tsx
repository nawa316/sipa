"use client";

import { useState } from "react";
import { mockAnak } from "@/data/mockData";
import { ChildTable } from "@/components/anak/ChildTable";
import { ChildStatsCard } from "@/components/anak/ChildStatsCard";

export default function AnakListPage() {
  const [filterGender, setFilterGender] = useState("ALL");
  const [filterStatus, setFilterStatus] = useState("ALL");

  // In a real app, filtering would happen here or server-side.
  // We apply basic client-side filtering for demonstration.
  const filteredData = mockAnak.filter((anak) => {
    if (filterGender !== "ALL" && anak.jenisKelamin !== filterGender) return false;
    if (filterStatus !== "ALL" && anak.status !== filterStatus) return false;
    return true;
  });

  const total = mockAnak.length;
  const available = mockAnak.filter(a => a.status === 'Tersedia').length;
  const matching = mockAnak.filter(a => a.status === 'Proses Matching').length;

  return (
    <div className="flex flex-col lg:flex-row gap-8 pb-8">
      {/* Sidebar Stats & Filters */}
      <div className="w-full lg:w-80 shrink-0 space-y-6">
        <ChildStatsCard total={total} available={available} matching={matching} />
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900">Filter Pencarian</h3>
            <button 
              onClick={() => { setFilterGender("ALL"); setFilterStatus("ALL"); }}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              Reset Filter
            </button>
          </div>
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Jenis Kelamin</label>
              <select 
                value={filterGender}
                onChange={(e) => setFilterGender(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ALL">Semua Jenis Kelamin</option>
                <option value="L">Laki-laki</option>
                <option value="P">Perempuan</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Status Adopsi</label>
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ALL">Semua Status</option>
                <option value="Tersedia">Tersedia</option>
                <option value="Proses Matching">Proses Matching</option>
                <option value="Diadopsi">Diadopsi</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0">
        <ChildTable data={filteredData} />
      </div>
    </div>
  );
}
