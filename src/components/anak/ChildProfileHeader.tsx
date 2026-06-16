import { Anak } from "@/types";
import { Download, Edit, ArrowLeft, HeartHandshake } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function ChildProfileHeader({ child }: { child: Anak }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-8">
      {/* Cover Background */}
      <div className="h-32 bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 w-full relative">
        <Link href="/anak" className="absolute top-4 left-4">
          <Button variant="secondary" size="sm" className="bg-white/80 backdrop-blur hover:bg-white text-slate-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>
        </Link>
      </div>
      
      {/* Profile Info */}
      <div className="px-8 pb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end -mt-12 gap-6">
          <div className="flex items-end gap-6">
            <img 
              src={child.fotoUrl} 
              alt={child.nama} 
              className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-lg bg-white z-10"
            />
            <div className="mb-2">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold text-slate-900">{child.nama}</h1>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      child.status === 'Tersedia' ? 'bg-emerald-100 text-emerald-700' :
                      child.status === 'Proses Matching' ? 'bg-amber-100 text-amber-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                  {child.status}
                </span>
              </div>
              <p className="text-slate-500 font-medium">ID: {child.id} • Wisma {child.informasiPenempatan.wisma}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            <Button variant="outline" onClick={() => alert('Simulasi: Unduh ringkasan PDF anak')}>
              <Download className="w-4 h-4 mr-2" /> Unduh Profil
            </Button>
            <Button variant="outline" onClick={() => alert('Simulasi: Edit data anak')}>
              <Edit className="w-4 h-4 mr-2" /> Edit Data
            </Button>
            {child.status === 'Tersedia' && (
              <Button onClick={() => alert('Simulasi: Menjalankan algoritma matching')}>
                <HeartHandshake className="w-4 h-4 mr-2" /> Smart Match
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
