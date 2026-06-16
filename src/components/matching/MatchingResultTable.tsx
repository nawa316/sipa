import { MatchingResultAlgo } from "@/lib/mockMatchingAlgo";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Anak } from "@/types";

export function MatchingResultTable({ 
  results,
  anak
}: { 
  results: MatchingResultAlgo[],
  anak: Anak
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mt-8">
      <div className="p-4 border-b border-slate-100 bg-slate-50/50">
        <h3 className="font-bold text-slate-800">Kandidat Lainnya (Peringkat 4-10)</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white border-b border-slate-100 text-sm font-semibold text-slate-500">
              <th className="py-4 px-6 font-medium">Peringkat</th>
              <th className="py-4 px-6 font-medium">Keluarga</th>
              <th className="py-4 px-6 font-medium">Skor Keseluruhan</th>
              <th className="py-4 px-6 font-medium">Faktor Penentu</th>
              <th className="py-4 px-6 font-medium text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-sm text-slate-700">
            {results.map((result, idx) => {
              const rank = idx + 4; // Because top 3 are rendered as cards
              return (
                <tr key={result.cota.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-slate-400">#{rank}</td>
                  <td className="py-4 px-6 font-medium text-slate-900">
                    {result.cota.namaSuami} & {result.cota.namaIstri}
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-bold text-slate-700">{result.score}%</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-slate-500">{result.topFactors.join(', ')}</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Link href={`/matching/perbandingan?anakId=${anak.id}&cotaId=${result.cota.id}`}>
                      <button className="text-blue-600 hover:text-blue-800 font-medium text-xs flex items-center justify-center w-full gap-1">
                        Bandingkan <ChevronRight className="w-3 h-3" />
                      </button>
                    </Link>
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
