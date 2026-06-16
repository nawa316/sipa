import { Users, FileCheck, SearchCode } from "lucide-react";

export function ChildStatsCard({ total, available, matching }: { total: number; available: number; matching: number }) {
  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-2xl shadow-lg shadow-blue-600/20 text-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-blue-100">Total Anak Asuh</h3>
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Users className="w-5 h-5 text-white" />
          </div>
        </div>
        <p className="text-4xl font-extrabold">{total}</p>
        <p className="text-sm text-blue-200 mt-2">Terdaftar di sistem SIPA</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <FileCheck className="w-5 h-5 text-emerald-500 mb-2" />
          <p className="text-xs font-medium text-slate-500 mb-1">Tersedia</p>
          <p className="text-xl font-bold text-slate-800">{available}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <SearchCode className="w-5 h-5 text-amber-500 mb-2" />
          <p className="text-xs font-medium text-slate-500 mb-1">Matching</p>
          <p className="text-xl font-bold text-slate-800">{matching}</p>
        </div>
      </div>
    </div>
  );
}
