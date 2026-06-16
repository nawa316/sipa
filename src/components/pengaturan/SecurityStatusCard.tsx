import { ShieldCheck, Key, SmartphoneNfc } from "lucide-react";

export function SecurityStatusCard() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 shrink-0">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <div>
          <h3 className="font-bold text-slate-800 text-lg">Tingkat Keamanan: Optimal</h3>
          <p className="text-sm text-slate-500 mt-1">Sistem saat ini dilindungi oleh enkripsi dan kebijakan kata sandi ketat.</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
          <div className="flex items-center gap-3">
            <Key className="w-5 h-5 text-slate-400" />
            <div>
              <p className="font-medium text-slate-800 text-sm">Pembaruan Kata Sandi Berkala</p>
              <p className="text-xs text-slate-500">Wajib diubah setiap 90 hari.</p>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">AKTIF</span>
        </div>

        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
          <div className="flex items-center gap-3">
            <SmartphoneNfc className="w-5 h-5 text-slate-400" />
            <div>
              <p className="font-medium text-slate-800 text-sm">Autentikasi Dua Langkah (2FA)</p>
              <p className="text-xs text-slate-500">Gunakan Google Authenticator saat login admin.</p>
            </div>
          </div>
          <button className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
            Konfigurasi
          </button>
        </div>
      </div>
    </div>
  );
}
