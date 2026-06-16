"use client";

import { mockMatching, mockAnak, mockCOTA } from "@/data/mockData";
import { simulateMatching } from "@/lib/mockMatchingAlgo";
import { CriteriaComparisonTable } from "@/components/matching/CriteriaComparisonTable";
import { MatchAnalysis } from "@/components/matching/MatchAnalysis";
import { RecommendationSummary } from "@/components/matching/RecommendationSummary";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Printer, User, Users, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function LaporanDetailMatching() {
  const params = useParams();
  const router = useRouter();
  
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const matchRecord = mockMatching.find(m => m.id === id);

  if (!matchRecord) {
    return <div className="p-8 text-center text-slate-500">Laporan matching tidak ditemukan.</div>;
  }

  const anak = mockAnak.find(a => a.id === matchRecord.anakId);
  const cota = mockCOTA.find(c => c.id === matchRecord.cotaId);

  if (!anak || !cota) {
    return <div className="p-8 text-center text-slate-500">Data referensi tidak valid.</div>;
  }

  // Get deep simulation data
  const matchingData = simulateMatching(anak, mockCOTA).find(res => res.cota.id === cota.id);

  if (!matchingData) {
    return <div className="p-8 text-center text-slate-500">Simulasi gagal dimuat.</div>;
  }

  const handlePrint = () => {
    alert("Simulasi: Mengunduh Laporan PDF...");
  };

  return (
    <div className="pb-16 max-w-5xl mx-auto">
      {/* Top Action Bar (Not Printed) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4 print:hidden">
        <Link href={`/matching/rekomendasi?anakId=${anak.id}`}>
          <button className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-medium text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" /> Kembali
          </button>
        </Link>
        <Button onClick={handlePrint} className="bg-slate-900 hover:bg-slate-800 text-white">
          <Printer className="w-4 h-4 mr-2" /> Export PDF Laporan
        </Button>
      </div>

      {/* Report Document Sheet */}
      <div className="bg-white rounded-none sm:rounded-2xl sm:shadow-lg border border-slate-100 p-8 sm:p-12 print:shadow-none print:p-0 print:border-none">
        
        {/* Report Header */}
        <div className="border-b-2 border-slate-900 pb-6 mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Laporan Asesmen Pencocokan</h1>
            <p className="text-slate-500 font-medium mt-1">Sistem Informasi Pelayanan Adopsi Anak (SIPA)</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-slate-800">ID Dokumen: {matchRecord.id}</p>
            <p className="text-xs text-slate-500 mt-1">Tanggal: {new Date(matchRecord.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
        </div>

        {/* Profiles Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="p-6 bg-blue-50/50 border border-blue-100 rounded-xl">
            <h3 className="text-sm font-bold text-blue-800 uppercase tracking-wider mb-4 flex items-center gap-2">
              <User className="w-4 h-4" /> Subjek Adopsi (Anak)
            </h3>
            <div className="space-y-2 text-sm text-slate-700">
              <p><span className="text-slate-500 w-32 inline-block">Nama Lengkap</span> <span className="font-bold text-slate-900">: {anak.nama}</span></p>
              <p><span className="text-slate-500 w-32 inline-block">ID Anak</span> <span className="font-medium">: {anak.id}</span></p>
              <p><span className="text-slate-500 w-32 inline-block">Usia / Gender</span> <span className="font-medium">: {new Date().getFullYear() - parseInt(anak.tanggalLahir.split('-')[0])} Tahun / {anak.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan'}</span></p>
              <p><span className="text-slate-500 w-32 inline-block">Kondisi Medis</span> <span className="font-medium">: {anak.kondisiFisik}</span></p>
              <p><span className="text-slate-500 w-32 inline-block align-top">Kebutuhan Khusus</span> <span className="font-medium inline-block max-w-[200px]">: {anak.kebutuhanKhusus}</span></p>
            </div>
          </div>

          <div className="p-6 bg-emerald-50/50 border border-emerald-100 rounded-xl">
            <h3 className="text-sm font-bold text-emerald-800 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Users className="w-4 h-4" /> Calon Orang Tua Angkat (COTA)
            </h3>
            <div className="space-y-2 text-sm text-slate-700">
              <p><span className="text-slate-500 w-32 inline-block">Pasangan</span> <span className="font-bold text-slate-900">: {cota.namaSuami} & {cota.namaIstri}</span></p>
              <p><span className="text-slate-500 w-32 inline-block">ID COTA</span> <span className="font-medium">: {cota.id}</span></p>
              <p><span className="text-slate-500 w-32 inline-block">Domisili</span> <span className="font-medium">: {cota.domisili}</span></p>
              <p><span className="text-slate-500 w-32 inline-block">Pekerjaan Utama</span> <span className="font-medium">: {cota.pekerjaanSuami}</span></p>
              <p><span className="text-slate-500 w-32 inline-block align-top">Penghasilan</span> <span className="font-medium inline-block max-w-[200px]">: Rp {cota.kemampuanFinansial.penghasilanGabungan.toLocaleString('id-ID')}</span></p>
            </div>
          </div>
        </div>

        {/* Score Highlight */}
        <div className="flex items-center gap-6 p-6 border-2 border-slate-100 rounded-2xl mb-10">
          <div className="w-24 h-24 shrink-0 bg-slate-900 rounded-2xl flex flex-col items-center justify-center text-white">
            <span className="text-3xl font-black">{matchingData.score}%</span>
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-70 mt-1">Match</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-2">
              <ShieldCheck className="w-6 h-6 text-emerald-500" /> Hasil Kalkulasi Hibrida (AHP + Profile Matching)
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
              Skor ini menunjukkan probabilitas keberhasilan adopsi yang diukur berdasarkan kesenjangan (*gap*) antara kriteria yang dibutuhkan oleh anak dan kapasitas terukur yang dimiliki oleh kandidat COTA.
            </p>
          </div>
        </div>

        {/* Detailed Table */}
        <div className="mb-10">
          <CriteriaComparisonTable radarData={matchingData.radarData} />
        </div>

        {/* Strengths & Weaknesses Analysis */}
        <div className="mb-10">
          <MatchAnalysis radarData={matchingData.radarData} />
        </div>

        {/* Final Conclusion */}
        <RecommendationSummary score={matchingData.score} />

      </div>
    </div>
  );
}
