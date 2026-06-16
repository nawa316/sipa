import { MatchingResult } from "@/types";

export function RecommendationTable({ recommendations }: { recommendations: MatchingResult[] }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Rekomendasi Smart Matching</h3>
          <p className="text-sm text-slate-500">Hasil pencocokan algoritma sistem terbaru</p>
        </div>
        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">Lihat Semua</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-sm font-medium text-slate-500">
              <th className="py-3 px-6">ID Match</th>
              <th className="py-3 px-6">Nama Anak</th>
              <th className="py-3 px-6">Nama COTA</th>
              <th className="py-3 px-6 text-center">Skor Kecocokan</th>
              <th className="py-3 px-6">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm text-slate-700">
            {recommendations.map((rec) => (
              <tr key={rec.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-6 font-medium">{rec.id}</td>
                <td className="py-4 px-6">{rec.anakName}</td>
                <td className="py-4 px-6">{rec.cotaNames}</td>
                <td className="py-4 px-6 text-center">
                  <div className="inline-flex items-center justify-center px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 font-bold">
                    {rec.skor}%
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                    {rec.status}
                  </span>
                </td>
              </tr>
            ))}
            {recommendations.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-500">
                  Tidak ada rekomendasi saat ini.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
