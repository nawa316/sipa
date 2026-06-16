import { FolderOpen } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export function EmptyState({ title = "Data Kosong", description = "Belum ada data yang tersedia." }: EmptyStateProps) {
  return (
    <div className="py-16 flex flex-col items-center justify-center text-center px-4">
      <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 mb-4 border border-slate-100">
        <FolderOpen className="w-8 h-8" />
      </div>
      <h3 className="font-bold text-slate-800 text-lg">{title}</h3>
      <p className="text-sm text-slate-500 mt-1 max-w-sm">{description}</p>
    </div>
  );
}
