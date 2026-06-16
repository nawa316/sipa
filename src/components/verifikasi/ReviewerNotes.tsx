import { useState } from "react";
import { MessageSquare } from "lucide-react";

export function ReviewerNotes({ initialNotes = "" }: { initialNotes?: string }) {
  const [notes, setNotes] = useState(initialNotes);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-indigo-500" /> Catatan Reviewer
      </h3>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Tambahkan catatan khusus untuk dokumen ini... (Misal: Dokumen buram, perlu revisi nama)"
        className="w-full h-32 p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm text-slate-700 bg-slate-50"
      />
    </div>
  );
}
