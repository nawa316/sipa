"use client";

import { Anak } from "@/types";
import { Search, ChevronRight, User } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function MatchingWizard({ childrenList }: { childrenList: Anak[] }) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filteredChildren = childrenList.filter(c => 
    c.status === "Tersedia" && 
    c.nama.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 max-w-4xl mx-auto mt-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Mulai Proses Smart Matching</h2>
        <p className="text-slate-500 mt-2">Pilih anak yang berstatus "Tersedia" untuk dicarikan kandidat orang tua terbaik menggunakan algoritma Profile Matching & AHP.</p>
      </div>

      <div className="relative mb-6 max-w-xl mx-auto">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input 
          type="text" 
          placeholder="Cari nama anak..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto p-2">
        {filteredChildren.map((anak) => (
          <div 
            key={anak.id} 
            onClick={() => router.push(`/matching/rekomendasi?anakId=${anak.id}`)}
            className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all group"
          >
            <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden shrink-0">
              <img src={anak.fotoUrl} alt={anak.nama} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-slate-900 truncate">{anak.nama}</h4>
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <User className="w-3 h-3" /> {new Date().getFullYear() - parseInt(anak.tanggalLahir.split('-')[0])} Tahun • {anak.kondisiFisik}
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors" />
          </div>
        ))}
        {filteredChildren.length === 0 && (
          <div className="col-span-1 md:col-span-2 text-center py-12 text-slate-500">
            Tidak ada anak berstatus "Tersedia" yang cocok dengan pencarian.
          </div>
        )}
      </div>
    </div>
  );
}
