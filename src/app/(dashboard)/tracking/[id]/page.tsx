"use client";

import { mockAdoptionProcess } from "@/data/mockData";
import { AdoptionStepper } from "@/components/tracking/AdoptionStepper";
import { ProcessProgress } from "@/components/tracking/ProcessProgress";
import { ProcessTimeline } from "@/components/tracking/ProcessTimeline";
import { ActivityFeed } from "@/components/tracking/ActivityFeed";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TrackingDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  
  const process = mockAdoptionProcess.find(p => p.id === id);

  if (!process) {
    return <div className="p-8 text-center text-slate-500">Data tracking tidak ditemukan.</div>;
  }

  return (
    <div className="pb-16 max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/tracking">
          <button className="p-2 bg-white text-slate-500 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm">
            <ArrowLeft className="w-5 h-5" />
          </button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Detail Tracking Adopsi</h1>
          <p className="text-slate-500 text-sm">ID Proses: <span className="font-bold text-slate-700">{process.id}</span> • Kandidat: <span className="font-bold text-slate-700">{process.cotaNames}</span></p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Top Progress Overview */}
        <ProcessProgress process={process} />

        {/* Stepper Visualization */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 overflow-hidden">
          <h3 className="font-bold text-slate-800 mb-2">Peta Tahapan</h3>
          <p className="text-xs text-slate-500 mb-8">Visualisasi lintasan birokrasi adopsi sesuai standar operasional dinas sosial.</p>
          <AdoptionStepper currentStage={process.currentStage} />
        </div>

        {/* Bottom Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ProcessTimeline activities={process.timeline} />
          </div>
          <div className="lg:col-span-1">
            <ActivityFeed activities={process.timeline} />
          </div>
        </div>
      </div>
    </div>
  );
}
