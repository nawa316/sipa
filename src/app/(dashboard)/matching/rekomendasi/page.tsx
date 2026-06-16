import { mockAnak, mockCOTA } from "@/data/mockData";
import { simulateMatching } from "@/lib/mockMatchingAlgo";
import { CandidateRankingCard } from "@/components/matching/CandidateRankingCard";
import { MatchingResultTable } from "@/components/matching/MatchingResultTable";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function RekomendasiPage({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams;
  const anakId = typeof resolvedParams.anakId === 'string' ? resolvedParams.anakId : undefined;
  
  const anak = mockAnak.find(a => a.id === anakId);
  if (!anak) return notFound();

  const results = simulateMatching(anak, mockCOTA);
  const top3 = results.slice(0, 3);
  const others = results.slice(3);

  return (
    <div className="pb-8 max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/matching">
          <button className="p-2 bg-white text-slate-500 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm">
            <ArrowLeft className="w-5 h-5" />
          </button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Hasil Rekomendasi</h1>
          <p className="text-slate-500 text-sm">Menampilkan kandidat COTA terbaik untuk anak: <span className="font-bold text-slate-700">{anak.nama}</span></p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {top3.map((res, idx) => (
          <CandidateRankingCard 
            key={res.cota.id} 
            result={res} 
            rank={idx + 1} 
            anak={anak} 
          />
        ))}
      </div>

      <MatchingResultTable results={others} anak={anak} />
    </div>
  );
}
