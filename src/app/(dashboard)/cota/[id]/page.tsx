import { mockCOTA } from "@/data/mockData";
import { CotaProfileHeader } from "@/components/cota/CotaProfileHeader";
import { EligibilityScore } from "@/components/cota/EligibilityScore";
import { VerificationTimeline } from "@/components/cota/VerificationTimeline";
import { SocialWorkerReview } from "@/components/cota/SocialWorkerReview";
import { notFound } from "next/navigation";
import { Users, Briefcase, Wallet, Heart, FileCheck } from "lucide-react";

export default async function CotaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const cota = mockCOTA.find(c => c.id === resolvedParams.id);
  
  if (!cota) {
    notFound();
  }

  return (
    <div className="pb-8 max-w-6xl mx-auto">
      <CotaProfileHeader cota={cota} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (Main Info) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Card: Informasi Pribadi & Keluarga */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" /> Informasi Pribadi & Keluarga
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
              <div>
                <p className="text-sm text-slate-500 mb-1">Nama Suami</p>
                <p className="font-medium text-slate-900">{cota.namaSuami} <span className="text-xs text-slate-400 font-normal ml-2">{cota.nikSuami}</span></p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Nama Istri</p>
                <p className="font-medium text-slate-900">{cota.namaIstri} <span className="text-xs text-slate-400 font-normal ml-2">{cota.nikIstri}</span></p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Status Pernikahan</p>
                <p className="font-medium text-slate-900">{cota.statusPernikahan} ({cota.lamaPernikahan} Tahun)</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Jumlah Anak Kandung</p>
                <p className="font-medium text-slate-900">{cota.jumlahAnakKandung} Anak</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-slate-500 mb-1">Alamat Lengkap</p>
                <p className="font-medium text-slate-900">{cota.alamatLengkap}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card: Pekerjaan & Finansial */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-emerald-500" /> Pekerjaan & Finansial
              </h3>
              <ul className="space-y-4">
                <li className="flex justify-between">
                  <span className="text-sm text-slate-500">Pekerjaan Suami</span>
                  <span className="font-medium text-slate-900 text-right">{cota.pekerjaanSuami}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-sm text-slate-500">Pekerjaan Istri</span>
                  <span className="font-medium text-slate-900 text-right">{cota.pekerjaanIstri}</span>
                </li>
                <li className="flex justify-between items-center pt-2 border-t border-slate-100">
                  <span className="text-sm text-slate-500 flex items-center gap-1"><Wallet className="w-4 h-4" /> Penghasilan (Gabungan)</span>
                  <span className="font-bold text-emerald-600">Rp {cota.kemampuanFinansial.penghasilanGabungan.toLocaleString('id-ID')}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-sm text-slate-500">Estimasi Pengeluaran</span>
                  <span className="font-medium text-rose-600">Rp {cota.kemampuanFinansial.rataRataPengeluaran.toLocaleString('id-ID')}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-sm text-slate-500">Status Rumah</span>
                  <span className="font-medium text-slate-900">{cota.kemampuanFinansial.kepemilikanRumah}</span>
                </li>
              </ul>
            </div>

            {/* Card: Motivasi & Dokumen */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-500" /> Motivasi Adopsi
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed italic">
                  "{cota.motivasiAdopsi}"
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-indigo-500" /> Dokumen Berkas
                </h3>
                <div className="space-y-3">
                  {cota.dokumen.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg border border-slate-100">
                      <span className="text-sm font-medium text-slate-700 truncate w-3/4">{doc.name}</span>
                      {doc.verified ? (
                        <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">Valid</span>
                      ) : (
                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-semibold">Proses</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (Sidebar components) */}
        <div className="space-y-8">
          <EligibilityScore score={cota.eligibilityScore} />
          <SocialWorkerReview review={cota.penilaianPekerjaSosial} />
          <VerificationTimeline timeline={cota.riwayatVerifikasi} />
        </div>
      </div>
    </div>
  );
}
