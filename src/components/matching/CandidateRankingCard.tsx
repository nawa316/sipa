import { MatchingResultAlgo } from "@/lib/mockMatchingAlgo";
import { Star, TrendingUp, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Anak } from "@/types";

export function CandidateRankingCard({ 
  result, 
  rank, 
  anak 
}: { 
  result: MatchingResultAlgo; 
  rank: number;
  anak: Anak;
}) {
  const isTopRank = rank <= 3;

  return (
    <div className={`relative bg-white rounded-2xl shadow-sm border ${isTopRank ? 'border-amber-200/60' : 'border-slate-100'} p-6 overflow-hidden transition-all hover:shadow-md`}>
      {isTopRank && (
        <div className="absolute top-0 right-0 bg-gradient-to-bl from-amber-400 to-orange-400 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl shadow-sm flex items-center gap-1">
          <Star className="w-3 h-3 fill-current" /> Top {rank} Match
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-5">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl font-black ${
            rank === 1 ? 'bg-amber-100 text-amber-600' :
            rank === 2 ? 'bg-slate-100 text-slate-600' :
            rank === 3 ? 'bg-orange-100 text-orange-600' :
            'bg-slate-50 text-slate-400'
          }`}>
            #{rank}
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Kel. {result.cota.namaSuami} & {result.cota.namaIstri}
            </h3>
            <p className="text-sm text-slate-500 mt-1">{result.cota.domisili} • {result.cota.pekerjaanSuami}</p>
            <div className="flex gap-2 mt-2">
              {result.topFactors.map(factor => (
                <span key={factor} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> {factor}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 w-full md:w-auto">
          <div className="text-center md:text-right flex-1 md:flex-none">
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Confidence Score</p>
            <p className={`text-3xl font-black ${
              result.score >= 85 ? 'text-emerald-500' : 
              result.score >= 70 ? 'text-amber-500' : 'text-slate-700'
            }`}>
              {result.score}%
            </p>
          </div>
          <Link href={`/matching/perbandingan?anakId=${anak.id}&cotaId=${result.cota.id}`}>
            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors border border-slate-200 hover:border-blue-200">
              <ChevronRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
