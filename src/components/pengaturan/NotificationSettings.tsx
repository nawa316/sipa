import { Bell } from "lucide-react";

export function NotificationSettings() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <div className="border-b border-slate-100 pb-6 mb-6">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <Bell className="w-5 h-5 text-amber-500" /> Preferensi Notifikasi
        </h3>
        <p className="text-sm text-slate-500 mt-1">Atur pengiriman surel dan peringatan sistem.</p>
      </div>

      <div className="space-y-6">
        {[
          { title: "Notifikasi Pendaftar Baru", desc: "Kirim email setiap ada COTA yang berhasil menyelesaikan pendaftaran.", active: true },
          { title: "Peringatan Dokumen Kedaluwarsa", desc: "Beri tahu jika ada dokumen kesehatan COTA yang berumur > 6 bulan.", active: true },
          { title: "Pembaruan Status Verifikasi", desc: "Otomatis kirim email ke COTA saat verifikator mengubah status berkas.", active: false },
          { title: "Laporan Mingguan Sistem", desc: "Ringkasan statistik adopsi yang dikirim tiap Senin pagi ke Kepala UPT.", active: true },
        ].map((item, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <div className="pr-8">
              <h4 className="font-medium text-slate-800">{item.title}</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
            </div>
            {/* Toggle Switch Simulation */}
            <div className={`w-12 h-6 rounded-full relative shrink-0 cursor-pointer transition-colors ${item.active ? 'bg-amber-500' : 'bg-slate-200'}`}>
              <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${item.active ? 'left-7' : 'left-1'}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
