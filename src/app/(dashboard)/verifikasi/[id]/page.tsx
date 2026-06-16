"use client";

import { useState } from "react";
import { mockVerification } from "@/data/mockData";
import { VerificationChecklist } from "@/components/verifikasi/VerificationChecklist";
import { DocumentPreview } from "@/components/verifikasi/DocumentPreview";
import { VerificationProgress } from "@/components/verifikasi/VerificationProgress";
import { ReviewerNotes } from "@/components/verifikasi/ReviewerNotes";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function VerificationDetailPage() {
  const params = useParams();
  const router = useRouter();
  
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const verification = mockVerification.find(v => v.id === id);
  
  const [activeDocId, setActiveDocId] = useState(verification?.dokumen[0]?.id || "");

  if (!verification) {
    return <div className="p-8 text-center text-slate-500">Data verifikasi tidak ditemukan.</div>;
  }

  const activeDoc = verification.dokumen.find(d => d.id === activeDocId);

  return (
    <div className="pb-24 max-w-7xl mx-auto h-[calc(100vh-100px)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/verifikasi">
            <button className="p-2 bg-white text-slate-500 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Verifikasi: {verification.cotaNames}</h1>
            <p className="text-sm text-slate-500">ID Pengajuan: {verification.id}</p>
          </div>
        </div>
      </div>

      {/* Split Screen Workspace */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
        
        {/* Left Column (35%) */}
        <div className="lg:col-span-4 flex flex-col gap-6 overflow-y-auto pr-2 pb-4">
          <VerificationProgress progress={verification.progress} />
          <VerificationChecklist 
            documents={verification.dokumen} 
            activeDocId={activeDocId} 
            onSelectDoc={setActiveDocId} 
          />
        </div>

        {/* Right Column (65%) */}
        <div className="lg:col-span-8 flex flex-col gap-6 min-h-0">
          <div className="flex-1 min-h-0">
            <DocumentPreview document={activeDoc} />
          </div>
          <div className="shrink-0">
            <ReviewerNotes initialNotes={activeDoc?.notes} />
          </div>
        </div>
      </div>

      {/* Floating Action Bar */}
      <div className="fixed bottom-0 left-0 lg:left-64 right-0 bg-white border-t border-slate-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-40 flex justify-end gap-3">
        <Button variant="outline" className="border-rose-200 text-rose-600 hover:bg-rose-50" onClick={() => { alert('Simulasi: Dokumen Ditolak'); router.push('/verifikasi'); }}>
          <XCircle className="w-4 h-4 mr-2" /> Tolak Pengajuan
        </Button>
        <Button variant="outline" className="border-amber-200 text-amber-600 hover:bg-amber-50" onClick={() => alert('Simulasi: Meminta COTA merevisi dokumen yang ditandai')}>
          <AlertCircle className="w-4 h-4 mr-2" /> Minta Revisi
        </Button>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => { alert('Simulasi: Verifikasi Disetujui 100%'); router.push('/verifikasi'); }}>
          <CheckCircle2 className="w-4 h-4 mr-2" /> Setujui Verifikasi
        </Button>
      </div>
    </div>
  );
}
