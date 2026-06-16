import { COTA } from "@/types";
import { CheckCircle2, Clock, XCircle, FileInput } from "lucide-react";

export function VerificationTimeline({ timeline }: { timeline: COTA['riwayatVerifikasi'] }) {
  const getIcon = (status: string) => {
    switch (status) {
      case "Belum Diverifikasi": return <FileInput className="w-4 h-4" />;
      case "Proses": return <Clock className="w-4 h-4" />;
      case "Terverifikasi": return <CheckCircle2 className="w-4 h-4" />;
      case "Ditolak": return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getIconColor = (status: string) => {
    switch (status) {
      case "Belum Diverifikasi": return "bg-slate-100 text-slate-600 border-slate-200";
      case "Proses": return "bg-amber-100 text-amber-600 border-amber-200";
      case "Terverifikasi": return "bg-emerald-100 text-emerald-600 border-emerald-200";
      case "Ditolak": return "bg-rose-100 text-rose-600 border-rose-200";
      default: return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <h3 className="text-lg font-bold text-slate-900 mb-6">Riwayat Verifikasi</h3>
      <div className="space-y-6">
        {timeline.map((event, index) => (
          <div key={index} className="relative flex gap-4">
            {index !== timeline.length - 1 && (
              <div className="absolute left-4 top-10 bottom-[-24px] w-px bg-slate-200" />
            )}
            <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${getIconColor(event.status)}`}>
              {getIcon(event.status)}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">{event.status}</p>
              <p className="text-sm text-slate-600 mt-1">{event.note}</p>
              <p className="text-xs font-medium text-slate-400 mt-2">{event.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
