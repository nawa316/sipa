import { mockAnak, mockCOTA } from "@/data/mockData";
import { simulateMatching } from "@/lib/mockMatchingAlgo";
import { RadarComparison } from "@/components/matching/RadarComparison";
import { ExplainableRecommendation } from "@/components/matching/ExplainableRecommendation";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, User, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default async function PerbandinganPage({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams;
  const anakId = typeof resolvedParams.anakId === 'string' ? resolvedParams.anakId : undefined;
  const cotaId = typeof resolvedParams.cotaId === 'string' ? resolvedParams.cotaId : undefined;
  
  const anak = mockAnak.find(a => a.id === anakId);
  const cota = mockCOTA.find(c => c.id === cotaId);

  if (!anak || !cota) return notFound();

  // Run the algorithm but filter only the specific COTA to get their radar data
  const matchingData = simulateMatching(anak, mockCOTA).find(res => res.cota.id === cota.id);

  if (!matchingData) return notFound();

  return (
    <div className="pb-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex items-center gap-4">
          <Link href={`/matching/rekomendasi?anakId=${anak.id}`}>
            <button className="p-2 bg-white text-slate-500 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Perbandingan Detail</h1>
            <p className="text-slate-500 text-sm">Analisis 1-on-1 kecocokan profil</p>
          </div>
        </div>
        
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
          Tetapkan sebagai Pasangan Adopsi
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Anak Profile Summary */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
            <User className="w-8 h-8 text-blue-500" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-500 mb-1">Profil Anak</h3>
            <p className="text-xl font-bold text-slate-900">{anak.nama}</p>
            <p className="text-sm text-slate-600 mt-1">Usia: {new Date().getFullYear() - parseInt(anak.tanggalLahir.split('-')[0])} Tahun • Kebutuhan Khusus: {anak.kebutuhanKhusus}</p>
          </div>
        </div>

        {/* COTA Profile Summary */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
            <Users className="w-8 h-8 text-emerald-500" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-500 mb-1">Kandidat Orang Tua</h3>
            <p className="text-xl font-bold text-slate-900">{cota.namaSuami} & {cota.namaIstri}</p>
            <p className="text-sm text-slate-600 mt-1">Status: {cota.statusVerifikasi} • Kelayakan: {cota.eligibilityScore}%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <RadarComparison data={matchingData.radarData} anak={anak} cota={cota} />
        </div>
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 text-center">
            <p className="text-sm text-slate-500 font-medium uppercase tracking-wider mb-2">Final Confidence Score</p>
            <div className={`text-6xl font-black ${
              matchingData.score >= 85 ? 'text-emerald-500' : 
              matchingData.score >= 70 ? 'text-amber-500' : 'text-slate-700'
            }`}>
              {matchingData.score}%
            </div>
            <p className="text-xs text-slate-400 mt-4 px-4">Berdasarkan hasil kalkulasi algoritma hibrida pembobotan multikriteria.</p>
          </div>

          <ExplainableRecommendation explanation={matchingData.explanation} />
        </div>
      </div>
    </div>
  );
}
