import { VerificationItem } from "@/types";
import { FileText, ZoomIn, Download, ExternalLink } from "lucide-react";

export function DocumentPreview({ document }: { document: VerificationItem | undefined }) {
  if (!document) {
    return (
      <div className="bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 h-[600px] flex flex-col items-center justify-center text-slate-400">
        <FileText className="w-16 h-16 mb-4 opacity-50" />
        <p className="font-medium">Pilih dokumen dari checklist</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 h-full flex flex-col">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-500" /> Preview: {document.name}
        </h3>
        <div className="flex gap-2">
          <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">
            <ZoomIn className="w-4 h-4" />
          </button>
          <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">
            <ExternalLink className="w-4 h-4" />
          </button>
          <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 bg-slate-100 p-8 flex items-center justify-center overflow-hidden min-h-[500px]">
        {/* Mocking a PDF Document View */}
        <div className="bg-white w-full max-w-2xl h-full shadow-lg border border-slate-200 flex flex-col p-12 text-slate-300">
          <div className="h-8 bg-slate-200 w-1/2 mb-8 rounded"></div>
          <div className="h-4 bg-slate-200 w-full mb-3 rounded"></div>
          <div className="h-4 bg-slate-200 w-full mb-3 rounded"></div>
          <div className="h-4 bg-slate-200 w-5/6 mb-8 rounded"></div>
          
          <div className="h-48 bg-slate-200 w-full mb-8 rounded"></div>
          
          <div className="h-4 bg-slate-200 w-full mb-3 rounded"></div>
          <div className="h-4 bg-slate-200 w-4/5 rounded"></div>
          
          <div className="mt-auto flex justify-center">
            <div className="w-32 h-32 border-4 border-slate-200 rounded-full flex items-center justify-center font-bold text-xl rotate-[-15deg]">
              {document.name.split(' ')[0]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
