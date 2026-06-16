"use client";

import { mockAdoptionProcess } from "@/data/mockData";
import { Search, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TrackingListPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filteredProcesses = mockAdoptionProcess.filter(p => 
    p.cotaNames.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pb-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Tracking Proses Adopsi</h1>
        <p className="text-slate-500 text-sm mt-1">Pantau perkembangan status permohonan Calon Orang Tua Angkat (COTA)</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-8">
        <div className="relative max-w-md">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Cari berdasarkan Nama COTA atau ID Proses..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProcesses.map(process => (
          <div 
            key={process.id}
            onClick={() => router.push(`/tracking/${process.id}`)}
            className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 cursor-pointer transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{process.id}</span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">{process.cotaNames}</h3>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                ${process.status === 'Selesai' ? 'bg-emerald-100 text-emerald-700' : 
                  process.status === 'Aktif' ? 'bg-blue-100 text-blue-700' : 
                  'bg-amber-100 text-amber-700'}
              `}>
                {process.status}
              </span>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-500 font-medium">{process.currentStage}</span>
                <span className="text-blue-600 font-bold">{process.progressPercentage}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${process.progressPercentage}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-50">
              <p className="text-xs text-slate-400">
                Update Terakhir: {new Date(process.lastUpdated).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
              </p>
              <div className="flex items-center gap-1 text-sm font-semibold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-300">
                Lihat Detail <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}

        {filteredProcesses.length === 0 && (
          <div className="col-span-1 md:col-span-2 text-center py-12 text-slate-500 bg-white rounded-2xl border border-slate-100">
            Tidak ada data proses adopsi yang cocok dengan pencarian Anda.
          </div>
        )}
      </div>
    </div>
  );
}
