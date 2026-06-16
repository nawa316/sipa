import { Sparkles } from "lucide-react";

export function ExecutiveSummary() {
  return (
    <div className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-2xl shadow-sm p-8 text-white relative overflow-hidden">
      <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
      <Sparkles className="absolute right-8 top-8 w-24 h-24 text-white/5" />
      
      <div className="relative z-10 max-w-3xl">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-blue-400" /> Ringkasan Eksekutif (AI Insight)
        </h2>
        <p className="text-blue-100 leading-relaxed text-lg">
          Kinerja layanan adopsi (SIPA) di triwulan ini menunjukkan <strong>peningkatan konversi sebesar 15%</strong>. Konsentrasi pelamar COTA tertinggi masih dipegang oleh wilayah Aglomerasi Surabaya Raya. 
        </p>
        <p className="text-blue-100 leading-relaxed mt-4 text-sm opacity-80">
          *Rekomendasi Sistem: Terdapat lonjakan penumpukan berkas pada tahap 'Verifikasi'. Disarankan menambah alokasi tenaga peninjau administratif di bulan depan untuk mempercepat throughput aplikasi.
        </p>
      </div>
    </div>
  );
}
