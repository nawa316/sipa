import { AnakDocument } from "@/types";
import { FileText, Image, FileBox, Download } from "lucide-react";

export function ChildDocumentList({ documents }: { documents: AnakDocument[] }) {
  const getIcon = (type: AnakDocument["type"]) => {
    switch (type) {
      case "pdf": return <FileText className="w-6 h-6 text-rose-500" />;
      case "image": return <Image className="w-6 h-6 text-blue-500" />;
      case "word": return <FileBox className="w-6 h-6 text-blue-700" />;
      default: return <FileText className="w-6 h-6 text-slate-500" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
        Dokumen Terlampir
      </h3>
      {documents.length > 0 ? (
        <div className="grid gap-4">
          {documents.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-colors group cursor-pointer" onClick={() => alert(`Simulasi: Buka dokumen ${doc.name}`)}>
              <div className="flex items-center gap-4">
                <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-white transition-colors">
                  {getIcon(doc.type)}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800 group-hover:text-blue-700 transition-colors">{doc.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">Diunggah pada {doc.uploadDate}</p>
                </div>
              </div>
              <button className="text-slate-400 group-hover:text-blue-600 transition-colors p-2">
                <Download className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-200">
          Belum ada dokumen yang dilampirkan.
        </div>
      )}
    </div>
  );
}
