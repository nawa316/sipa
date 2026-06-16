import { ClipboardList } from "lucide-react";

export function SocialWorkerReview({ review }: { review: string }) {
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-sm border border-indigo-100 p-6">
      <h3 className="text-lg font-bold text-indigo-900 mb-3 flex items-center gap-2">
        <ClipboardList className="w-5 h-5 text-indigo-600" /> Penilaian Tim Pekerja Sosial
      </h3>
      <p className="text-indigo-800 text-sm leading-relaxed font-medium italic">
        "{review}"
      </p>
    </div>
  );
}
