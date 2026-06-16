import { RadarData } from "@/lib/mockMatchingAlgo";
import { Check, AlertTriangle, Minus } from "lucide-react";

export function CriteriaComparisonTable({ radarData }: { radarData: RadarData[] }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-4 border-b border-slate-100 bg-slate-50/50">
        <h3 className="font-bold text-slate-800">Rincian Skor Per Kriteria</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white border-b border-slate-100 text-sm font-semibold text-slate-500">
              <th className="py-4 px-6 font-medium">Dimensi / Kriteria</th>
              <th className="py-4 px-6 font-medium text-center">Kebutuhan Anak</th>
              <th className="py-4 px-6 font-medium text-center">Kapasitas COTA</th>
              <th className="py-4 px-6 font-medium text-center">Gap</th>
              <th className="py-4 px-6 font-medium text-center">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm text-slate-700">
            {radarData.map((data, idx) => {
              const gap = data.B - data.A;
              const isGood = gap >= -10;
              const isWarning = gap < -10 && gap >= -25;
              
              return (
                <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-slate-800">{data.subject}</td>
                  <td className="py-4 px-6 text-center font-medium text-blue-600">{data.A}</td>
                  <td className="py-4 px-6 text-center font-bold text-slate-900">{data.B}</td>
                  <td className="py-4 px-6 text-center">
                    <span className={`font-semibold ${gap >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {gap > 0 ? '+' : ''}{gap}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex justify-center">
                      {isGood ? (
                        <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded-full">
                          <Check className="w-3 h-3" /> Memenuhi
                        </span>
                      ) : isWarning ? (
                        <span className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-100 px-2 py-1 rounded-full">
                          <Minus className="w-3 h-3" /> Kurang
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-100 px-2 py-1 rounded-full">
                          <AlertTriangle className="w-3 h-3" /> Kritis
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
