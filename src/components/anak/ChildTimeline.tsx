import { AnakTimelineEvent } from "@/types";
import { LogIn, Activity, BookOpen, Users, HeartHandshake } from "lucide-react";

export function ChildTimeline({ timeline }: { timeline: AnakTimelineEvent[] }) {
  const getIcon = (type: AnakTimelineEvent["type"]) => {
    switch (type) {
      case "entry": return <LogIn className="w-4 h-4" />;
      case "health": return <Activity className="w-4 h-4" />;
      case "education": return <BookOpen className="w-4 h-4" />;
      case "social": return <Users className="w-4 h-4" />;
      case "matching": return <HeartHandshake className="w-4 h-4" />;
    }
  };

  const getIconColor = (type: AnakTimelineEvent["type"]) => {
    switch (type) {
      case "entry": return "bg-blue-100 text-blue-600 border-blue-200";
      case "health": return "bg-rose-100 text-rose-600 border-rose-200";
      case "education": return "bg-amber-100 text-amber-600 border-amber-200";
      case "social": return "bg-indigo-100 text-indigo-600 border-indigo-200";
      case "matching": return "bg-emerald-100 text-emerald-600 border-emerald-200";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
        Histori & Timeline Anak
      </h3>
      <div className="space-y-6">
        {timeline.map((event, index) => (
          <div key={event.id} className="relative flex gap-4">
            {index !== timeline.length - 1 && (
              <div className="absolute left-4 top-10 bottom-[-24px] w-px bg-slate-200" />
            )}
            <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${getIconColor(event.type)}`}>
              {getIcon(event.type)}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">{event.title}</p>
              <p className="text-sm text-slate-600 mt-1">{event.description}</p>
              <p className="text-xs font-medium text-slate-400 mt-2">{event.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
