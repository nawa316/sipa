import { mockAnak } from "@/data/mockData";
import { ChildProfileHeader } from "@/components/anak/ChildProfileHeader";
import { ChildTimeline } from "@/components/anak/ChildTimeline";
import { ChildDocumentList } from "@/components/anak/ChildDocumentList";
import { notFound } from "next/navigation";
import { HeartPulse, GraduationCap, MapPin, ClipboardList } from "lucide-react";

export default async function ChildDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const child = mockAnak.find(a => a.id === resolvedParams.id);
  
  if (!child) {
    notFound();
  }

  const age = new Date().getFullYear() - parseInt(child.tanggalLahir.split('-')[0]);

  return (
    <div className="pb-8 max-w-6xl mx-auto">
      <ChildProfileHeader child={child} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (Main Info) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Card: Biodata Lengkap */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Biodata Lengkap</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
              <div>
                <p className="text-sm text-slate-500 mb-1">Nama Lengkap</p>
                <p className="font-medium text-slate-900">{child.nama}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Tanggal Lahir (Estimasi Umur)</p>
                <p className="font-medium text-slate-900">{child.tanggalLahir} <span className="text-slate-500 font-normal">({age} Tahun)</span></p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Jenis Kelamin</p>
                <p className="font-medium text-slate-900">{child.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan'}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Agama</p>
                <p className="font-medium text-slate-900">{child.agama}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card: Informasi Kesehatan */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <HeartPulse className="w-5 h-5 text-rose-500" /> Kesehatan
              </h3>
              <ul className="space-y-4">
                <li className="flex justify-between">
                  <span className="text-sm text-slate-500">Golongan Darah</span>
                  <span className="font-medium text-slate-900">{child.informasiKesehatan.golonganDarah}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-sm text-slate-500">Tinggi / Berat</span>
                  <span className="font-medium text-slate-900">{child.informasiKesehatan.tinggiBadan} cm / {child.informasiKesehatan.beratBadan} kg</span>
                </li>
                <li>
                  <span className="text-sm text-slate-500 block mb-1">Riwayat Penyakit</span>
                  <span className="font-medium text-slate-900 text-sm leading-relaxed">{child.informasiKesehatan.riwayatPenyakit}</span>
                </li>
                <li>
                  <span className="text-sm text-slate-500 block mb-1">Alergi</span>
                  <span className="font-medium text-slate-900 text-sm">{child.informasiKesehatan.alergi}</span>
                </li>
              </ul>
            </div>

            {/* Card: Informasi Pendidikan */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-blue-500" /> Pendidikan
              </h3>
              <ul className="space-y-4">
                <li className="flex justify-between">
                  <span className="text-sm text-slate-500">Tingkat Pendidikan</span>
                  <span className="font-medium text-slate-900">{child.pendidikan.tingkat}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-sm text-slate-500">Nama Sekolah</span>
                  <span className="font-medium text-slate-900">{child.pendidikan.namaSekolah}</span>
                </li>
                <li>
                  <span className="text-sm text-slate-500 block mb-1">Catatan Perkembangan</span>
                  <span className="font-medium text-slate-900 text-sm leading-relaxed">{child.pendidikan.catatan}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Card: Latar Belakang & Penempatan */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-indigo-500" /> Latar Belakang & Penempatan
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
              <div>
                <p className="text-sm text-slate-500 mb-1">Asal Usul</p>
                <p className="font-medium text-slate-900">{child.latarBelakangSosial.asalUsul}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Alasan Masuk Panti</p>
                <p className="font-medium text-slate-900">{child.latarBelakangSosial.alasanMasuk}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Wisma Saat Ini</p>
                <p className="font-medium text-slate-900">{child.informasiPenempatan.wisma}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Pengasuh Penanggung Jawab</p>
                <p className="font-medium text-slate-900">{child.informasiPenempatan.pengasuh}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (Sidebar components) */}
        <div className="space-y-8">
          {/* Card: Catatan Pekerja Sosial */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl shadow-sm border border-amber-200 p-6">
            <h3 className="text-lg font-bold text-amber-900 mb-3 flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-amber-600" /> Catatan Pekerja Sosial
            </h3>
            <p className="text-amber-800 text-sm leading-relaxed font-medium">
              "{child.catatanPekerjaSosial}"
            </p>
          </div>
          
          <ChildTimeline timeline={child.timeline} />
          <ChildDocumentList documents={child.dokumen} />
        </div>
      </div>
    </div>
  );
}
