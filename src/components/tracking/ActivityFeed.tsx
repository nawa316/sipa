import { TrackingActivity } from "@/types";
import { UserCircle } from "lucide-react";

export function ActivityFeed({ activities }: { activities: TrackingActivity[] }) {
  // Take top 5 latest activities
  const recent = [...activities].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <h3 className="font-bold text-slate-800 mb-6">Aktivitas Sistem Terbaru</h3>
      
      <div className="space-y-6">
        {recent.map(item => (
          <div key={item.id} className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center shrink-0">
              <UserCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900">
                <span className="font-bold">{item.actor}</span> mencatat log baru pada tahap <span className="text-indigo-600 font-semibold">{item.stage}</span>
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {new Date(item.date).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
