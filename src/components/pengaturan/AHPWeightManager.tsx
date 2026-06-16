"use client";

import { AHPWeight } from "@/types";
import { SlidersHorizontal, Info } from "lucide-react";
import { useState } from "react";

export function AHPWeightManager({ initialWeights }: { initialWeights: AHPWeight[] }) {
  const [weights, setWeights] = useState(initialWeights);

  const total = weights.reduce((acc, curr) => acc + curr.weightPercentage, 0);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <div className="flex justify-between items-start border-b border-slate-100 pb-6 mb-6">
        <div>
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-purple-500" /> Bobot Kriteria Matching (AHP)
          </h3>
          <p className="text-sm text-slate-500 mt-1">Kalibrasi algoritma kecerdasan buatan untuk rekomendasi adopsi.</p>
        </div>
        <div className={`px-4 py-2 rounded-xl text-sm font-bold flex flex-col items-center
          ${total === 100 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}
        `}>
          <span>Total Bobot</span>
          <span className="text-xl">{total}%</span>
        </div>
      </div>

      <div className="space-y-6">
        {weights.map((w, idx) => (
          <div key={w.id}>
            <div className="flex justify-between mb-2">
              <div>
                <span className="font-semibold text-slate-700 text-sm">{w.criteria}</span>
                <p className="text-xs text-slate-400 mt-0.5">{w.description}</p>
              </div>
              <span className="font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded-md text-sm h-fit">
                {w.weightPercentage}%
              </span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="50" 
              value={w.weightPercentage}
              onChange={(e) => {
                const newWeights = [...weights];
                newWeights[idx].weightPercentage = parseInt(e.target.value);
                setWeights(newWeights);
              }}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>
        ))}
      </div>

      {total !== 100 && (
        <div className="mt-6 p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-start gap-3 text-rose-700 text-sm">
          <Info className="w-5 h-5 shrink-0" />
          <p>Total bobot kalkulasi <strong>harus sama dengan 100%</strong>. Harap kurangi atau tambah nilai pada beberapa kriteria agar sistem dapat menghitung secara valid.</p>
        </div>
      )}

      <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
        <button 
          disabled={total !== 100}
          className="px-6 py-2.5 bg-purple-600 text-white font-medium rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Simpan Kalibrasi
        </button>
      </div>
    </div>
  );
}
