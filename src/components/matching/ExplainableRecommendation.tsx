import { Sparkles } from "lucide-react";

export function ExplainableRecommendation({ explanation }: { explanation: string }) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-sm border border-blue-100 p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-6 opacity-10">
        <Sparkles className="w-24 h-24 text-blue-600" />
      </div>
      
      <div className="relative z-10">
        <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-600" /> AI Insight (Explainable Recommendation)
        </h3>
        <p className="text-blue-800 text-sm leading-relaxed font-medium">
          {explanation}
        </p>
        
        <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-blue-500/70">
          <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
          Dihasilkan otomatis oleh SIPA Smart Matching Engine
        </div>
      </div>
    </div>
  );
}
