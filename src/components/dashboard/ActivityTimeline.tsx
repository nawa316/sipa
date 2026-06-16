import { ActivityLog } from "@/types";
import { User, FileText, HeartHandshake, Settings } from "lucide-react";

export function ActivityTimeline({ activities }: { activities: ActivityLog[] }) {
  const getIcon = (type: ActivityLog["iconType"]) => {
    switch (type) {
      case "user": return <User className="w-4 h-4" />;
      case "document": return <FileText className="w-4 h-4" />;
      case "match": return <HeartHandshake className="w-4 h-4" />;
      case "system": return <Settings className="w-4 h-4" />;
    }
  };

  const getIconBg = (type: ActivityLog["iconType"]) => {
    switch (type) {
      case "user": return "bg-blue-100 text-blue-600";
      case "document": return "bg-amber-100 text-amber-600";
      case "match": return "bg-emerald-100 text-emerald-600";
      case "system": return "bg-slate-100 text-slate-600";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <h3 className="text-lg font-bold text-slate-900 mb-6">Aktivitas Terkini</h3>
      <div className="space-y-6">
        {activities.map((activity, index) => (
          <div key={activity.id} className="relative flex gap-4">
            {/* Timeline Line */}
            {index !== activities.length - 1 && (
              <div className="absolute left-4 top-10 bottom-[-24px] w-px bg-slate-200" />
            )}
            
            <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${getIconBg(activity.iconType)}`}>
              {getIcon(activity.iconType)}
            </div>
            
            <div>
              <p className="text-sm font-medium text-slate-900">{activity.action}</p>
              <p className="text-sm text-slate-500 mt-0.5">{activity.description}</p>
              <p className="text-xs text-slate-400 mt-1">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
