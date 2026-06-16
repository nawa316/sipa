export function LoadingSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-100 p-6 animate-pulse">
      <div className="h-6 bg-slate-200 rounded w-1/4 mb-6"></div>
      <div className="space-y-4">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex gap-4">
            <div className="h-10 bg-slate-100 rounded w-full"></div>
            <div className="h-10 bg-slate-100 rounded w-full"></div>
            <div className="h-10 bg-slate-100 rounded w-1/3"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
