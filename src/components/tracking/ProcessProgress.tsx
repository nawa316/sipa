import { AdoptionProcess } from "@/types";
import { Clock, CheckCircle2, AlertCircle } from "lucide-react";

export function ProcessProgress({ process }: { process: AdoptionProcess }) {
  const isFinished = process.status === 'Selesai';

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 relative overflow-hidden">
      {/* Background Graphic */}
      <div 
        className="absolute top-0 right-0 bottom-0 w-32 opacity-10 bg-gradient-to-r from-transparent to-blue-600 rounded-l-full blur-3xl -mr-16"
      />

      <div className="flex flex-col md:flex-row justify-between gap-6 relative z-10">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xl font-bold text-slate-900">Status Permohonan</h2>
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
              ${process.status === 'Selesai' ? 'bg-emerald-100 text-emerald-700' : 
                process.status === 'Aktif' ? 'bg-blue-100 text-blue-700' : 
                'bg-amber-100 text-amber-700'}
            `}>
              {process.status}
            </span>
          </div>
          
          <p className="text-slate-500 text-sm mb-1">Tahap Saat Ini</p>
          <p className="text-2xl font-black text-blue-900">{process.currentStage}</p>
          
          <div className="mt-6 flex items-center gap-2 text-sm text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
            {isFinished ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            ) : (
              <Clock className="w-5 h-5 text-amber-500 shrink-0" />
            )}
            <span><strong className="text-slate-800">Estimasi Selanjutnya:</strong> {process.estimatedNextStep}</span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center shrink-0 w-full md:w-48 bg-slate-50 rounded-2xl p-6 border border-slate-100">
          <div className="relative flex items-center justify-center">
            {/* Simple CSS Circle Progress */}
            <svg className="w-24 h-24 transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-slate-200"
              />
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 - (251.2 * process.progressPercentage) / 100}
                className="text-blue-500 transition-all duration-1000 ease-out"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-slate-900">{process.progressPercentage}%</span>
            </div>
          </div>
          <p className="text-xs font-bold text-slate-400 mt-4 uppercase tracking-widest">Progress</p>
        </div>
      </div>
    </div>
  );
}
