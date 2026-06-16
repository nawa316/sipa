import { COTA } from "@/types";
import { ArrowLeft, CheckCircle2, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function CotaProfileHeader({ cota }: { cota: COTA }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
      <div className="flex items-start gap-6">
        <Link href="/cota">
          <button className="p-2 bg-slate-50 text-slate-500 rounded-full hover:bg-slate-100 hover:text-slate-700 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
        </Link>
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-slate-900">
              Keluarga {cota.namaSuami} & {cota.namaIstri}
            </h1>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
              cota.statusVerifikasi === 'Terverifikasi' ? 'bg-emerald-100 text-emerald-700' :
              cota.statusVerifikasi === 'Proses' ? 'bg-amber-100 text-amber-700' :
              cota.statusVerifikasi === 'Ditolak' ? 'bg-rose-100 text-rose-700' :
              'bg-slate-100 text-slate-700'
            }`}>
              {cota.statusVerifikasi}
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-500 font-medium">
            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {cota.domisili}</span>
            <span className="flex items-center gap-1"><Phone className="w-4 h-4" /> {cota.telepon}</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-3">
        <Button variant="outline" onClick={() => alert('Simulasi: Verifikasi dokumen')}>Verifikasi Dokumen</Button>
        {cota.statusVerifikasi === 'Terverifikasi' && (
          <Button onClick={() => alert('Simulasi: Setujui COTA sebagai kandidat')}>
            <CheckCircle2 className="w-4 h-4 mr-2" /> Tandai Kandidat Siap
          </Button>
        )}
      </div>
    </div>
  );
}
