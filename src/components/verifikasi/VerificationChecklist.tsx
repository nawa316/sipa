import { VerificationItem } from "@/types";
import { CheckCircle2, Circle, AlertCircle } from "lucide-react";

export function VerificationChecklist({
  documents,
  activeDocId,
  onSelectDoc,
}: {
  documents: VerificationItem[];
  activeDocId: string;
  onSelectDoc: (id: string) => void;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-4 border-b border-slate-100 bg-slate-50/50">
        <h3 className="font-bold text-slate-800">Checklist Dokumen</h3>
      </div>
      <div className="divide-y divide-slate-100">
        {documents.map((doc) => (
          <button
            key={doc.id}
            onClick={() => onSelectDoc(doc.id)}
            className={`w-full text-left p-4 flex items-center justify-between transition-colors ${
              activeDocId === doc.id ? "bg-blue-50" : "hover:bg-slate-50"
            }`}
          >
            <div className="flex items-center gap-3">
              {doc.status === "Valid" ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              ) : doc.status === "Revisi" ? (
                <AlertCircle className="w-5 h-5 text-amber-500" />
              ) : (
                <Circle className="w-5 h-5 text-slate-300" />
              )}
              <div>
                <p className={`font-medium ${activeDocId === doc.id ? "text-blue-700" : "text-slate-700"}`}>
                  {doc.name}
                </p>
                {doc.status === "Revisi" && (
                  <p className="text-xs text-amber-600 mt-0.5 max-w-[200px] truncate">
                    Catatan: {doc.notes}
                  </p>
                )}
              </div>
            </div>
            {doc.status !== "Menunggu" && (
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                doc.status === "Valid" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
              }`}>
                {doc.status}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
