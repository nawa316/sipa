import { Database, HardDriveDownload, RefreshCw } from "lucide-react";

export function BackupManager() {
  return (
    <div className="bg-slate-900 rounded-2xl shadow-sm border border-slate-800 p-8 text-white relative overflow-hidden">
      <div className="absolute right-0 bottom-0 opacity-5 -mb-4 -mr-4 pointer-events-none">
        <Database className="w-48 h-48" />
      </div>

      <div className="relative z-10">
        <h3 className="text-xl font-bold flex items-center gap-2 mb-2">
          <Database className="w-6 h-6 text-blue-400" /> Pencadangan Data (Backup)
        </h3>
        <p className="text-slate-400 text-sm max-w-lg mb-8 leading-relaxed">
          Sistem mencadangkan basis data ke *cloud storage* secara berkala. Anda juga dapat mengunduh salinan manual (*dump*) untuk arsip luring.
        </p>

        <div className="grid grid-cols-2 gap-4 max-w-md mb-8">
          <div className="bg-white/5 p-4 rounded-xl border border-white/10">
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Backup Terakhir</p>
            <p className="font-bold text-white">Hari Ini, 02:00 WIB</p>
          </div>
          <div className="bg-white/5 p-4 rounded-xl border border-white/10">
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Ukuran Database</p>
            <p className="font-bold text-white">128.4 MB</p>
          </div>
        </div>

        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors">
            <HardDriveDownload className="w-4 h-4" /> Unduh SQL Dump
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-colors">
            <RefreshCw className="w-4 h-4" /> Sinkronisasi Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}
