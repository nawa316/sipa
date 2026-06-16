export function VerificationProgress({ progress }: { progress: number }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-slate-800">Progres Verifikasi</h3>
        <span className="text-sm font-bold text-blue-600">{progress}%</span>
      </div>
      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
        <div 
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-xs text-slate-500 mt-3 text-right">
        {Math.floor((progress / 100) * 6)} dari 6 dokumen telah divalidasi
      </p>
    </div>
  );
}
