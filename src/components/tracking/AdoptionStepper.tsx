import { STAGES } from "@/data/mockData";
import { Check } from "lucide-react";

export function AdoptionStepper({ currentStage }: { currentStage: string }) {
  const currentIndex = STAGES.indexOf(currentStage);

  return (
    <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
      <div className="flex items-center min-w-[800px] justify-between relative px-4 mt-6">
        {/* Background Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 z-0 rounded-full" />
        
        {/* Progress Line */}
        <div 
          className="absolute top-1/2 left-0 h-1 bg-blue-500 -translate-y-1/2 z-0 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${(currentIndex / (STAGES.length - 1)) * 100}%` }}
        />

        {STAGES.map((stage, idx) => {
          const isCompleted = idx < currentIndex;
          const isActive = idx === currentIndex;
          const isPending = idx > currentIndex;

          return (
            <div key={stage} className="relative z-10 flex flex-col items-center group w-24">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 shadow-sm border-2
                  ${isCompleted ? 'bg-blue-500 text-white border-blue-500' : 
                    isActive ? 'bg-white text-blue-600 border-blue-500 scale-110 shadow-md ring-4 ring-blue-50' : 
                    'bg-white text-slate-400 border-slate-200'}
                `}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : idx + 1}
              </div>
              <span 
                className={`mt-3 text-xs text-center font-semibold tracking-tight transition-colors
                  ${isCompleted ? 'text-slate-800' : 
                    isActive ? 'text-blue-700' : 
                    'text-slate-400'}
                `}
              >
                {stage}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
