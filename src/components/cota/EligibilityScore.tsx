export function EligibilityScore({ score }: { score: number }) {
  // SVG Circular progress math
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getColorClass = () => {
    if (score >= 80) return "text-emerald-500";
    if (score >= 60) return "text-amber-500";
    return "text-rose-500";
  };

  const getStatusText = () => {
    if (score >= 80) return "Sangat Layak";
    if (score >= 60) return "Memenuhi Syarat Minimum";
    return "Belum Memenuhi Syarat";
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col items-center text-center">
      <h3 className="font-bold text-slate-900 mb-6">Skor Kelayakan (Sistem)</h3>
      
      <div className="relative flex items-center justify-center mb-4">
        <svg className="w-32 h-32 transform -rotate-90">
          <circle
            className="text-slate-100"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="64"
            cy="64"
          />
          <circle
            className={`${getColorClass()} transition-all duration-1000 ease-out`}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="64"
            cy="64"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-3xl font-extrabold text-slate-800">{score}%</span>
        </div>
      </div>
      
      <p className={`font-semibold ${getColorClass()}`}>{getStatusText()}</p>
      <p className="text-xs text-slate-500 mt-2 max-w-[200px]">Skor ini dikalkulasikan otomatis dari parameter finansial, umur pernikahan, dan kelengkapan dokumen.</p>
    </div>
  );
}
