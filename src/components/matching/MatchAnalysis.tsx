import { RadarData } from "@/lib/mockMatchingAlgo";
import { TrendingUp, AlertCircle, Check } from "lucide-react";

export function MatchAnalysis({ radarData }: { radarData: RadarData[] }) {
  const sorted = [...radarData].sort((a, b) => (b.B - b.A) - (a.B - a.A));
  
  const strengths = sorted.slice(0, 3);
  const concerns = sorted.filter(d => (d.B - d.A) < 0).reverse().slice(0, 3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Strengths */}
      <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6">
        <h3 className="text-lg font-bold text-emerald-900 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-600" /> Kekuatan Kecocokan
        </h3>
        <ul className="space-y-4">
          {strengths.map((item, idx) => (
            <li key={idx} className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                {idx + 1}
              </div>
              <div>
                <p className="font-semibold text-slate-800">{item.subject}</p>
                <p className="text-sm text-slate-600 mt-1">Kapasitas kandidat melebihi standar kebutuhan anak pada dimensi ini sebesar <span className="font-semibold text-emerald-600">+{item.B - item.A} poin</span>.</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Concerns */}
      <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-6">
        <h3 className="text-lg font-bold text-amber-900 mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-amber-600" /> Area Perhatian (Risiko)
        </h3>
        {concerns.length > 0 ? (
          <ul className="space-y-4">
            {concerns.map((item, idx) => (
              <li key={idx} className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  !
                </div>
                <div>
                  <p className="font-semibold text-slate-800">{item.subject}</p>
                  <p className="text-sm text-slate-600 mt-1">Terdapat kesenjangan sebesar <span className="font-semibold text-rose-500">{item.B - item.A} poin</span> di bawah kebutuhan ideal anak.</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 py-8">
            <Check className="w-12 h-12 mb-2 text-emerald-200" />
            <p>Tidak ada area risiko signifikan.</p>
          </div>
        )}
      </div>
    </div>
  );
}
