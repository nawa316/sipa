import { TrackingActivity } from "@/types";
import { Check, Clock } from "lucide-react";

export function ProcessTimeline({ activities }: { activities: TrackingActivity[] }) {
  // Sort activities by date descending
  const sorted = [...activities].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
        <Clock className="w-5 h-5 text-blue-500" /> Riwayat Historis Tahapan
      </h3>
      
      <div className="relative border-l-2 border-slate-100 ml-4 space-y-8 pb-4">
        {sorted.map((item, idx) => (
          <div key={item.id} className="relative pl-8 group">
            {/* Dot */}
            <div className={`absolute -left-[11px] top-1 w-5 h-5 rounded-full border-4 border-white flex items-center justify-center
              ${idx === 0 ? 'bg-blue-500 ring-4 ring-blue-50' : 'bg-slate-300'}
            `}>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 group-hover:border-blue-200 transition-colors">
              <div className="flex justify-between items-start mb-1">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full mb-2 inline-block
                  ${idx === 0 ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-600'}
                `}>
                  {item.stage}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {new Date(item.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </div>
              <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
              <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
