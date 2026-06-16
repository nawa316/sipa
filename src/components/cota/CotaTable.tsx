import { COTA } from "@/types";
import { Search, Filter, Eye, Edit, FileText } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface CotaTableProps {
  data: COTA[];
}

export function CotaTable({ data }: CotaTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      {/* Table Header / Toolbar */}
      <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/50">
        <h2 className="text-lg font-bold text-slate-800">Daftar COTA</h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Cari ID atau nama..." 
              className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white border-b border-slate-100 text-sm font-semibold text-slate-500">
              <th className="py-4 px-6 font-medium">ID & Pasangan</th>
              <th className="py-4 px-6 font-medium">Domisili</th>
              <th className="py-4 px-6 font-medium text-center">Skor Kelayakan</th>
              <th className="py-4 px-6 font-medium text-center">Status Verifikasi</th>
              <th className="py-4 px-6 font-medium text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-sm text-slate-700">
            {paginatedData.map((cota) => (
              <tr key={cota.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                <td className="py-4 px-6">
                  <p className="font-semibold text-slate-900">{cota.namaSuami} & {cota.namaIstri}</p>
                  <p className="text-xs text-slate-500">{cota.id}</p>
                </td>
                <td className="py-4 px-6">
                  <p className="font-medium text-slate-700">{cota.domisili}</p>
                </td>
                <td className="py-4 px-6 text-center">
                  <div className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full font-bold ${
                    cota.eligibilityScore >= 80 ? 'bg-emerald-50 text-emerald-700' :
                    cota.eligibilityScore >= 60 ? 'bg-amber-50 text-amber-700' :
                    'bg-rose-50 text-rose-700'
                  }`}>
                    {cota.eligibilityScore}%
                  </div>
                </td>
                <td className="py-4 px-6 text-center">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                    cota.statusVerifikasi === 'Terverifikasi' ? 'bg-emerald-100 text-emerald-700' :
                    cota.statusVerifikasi === 'Proses' ? 'bg-amber-100 text-amber-700' :
                    cota.statusVerifikasi === 'Ditolak' ? 'bg-rose-100 text-rose-700' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {cota.statusVerifikasi}
                  </span>
                </td>
                <td className="py-4 px-6 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Link href={`/cota/${cota.id}`}>
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Lihat Detail">
                        <Eye className="w-4 h-4" />
                      </button>
                    </Link>
                    <button className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Edit Data" onClick={() => alert('Simulasi: Form edit COTA')}>
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Cetak Berkas" onClick={() => alert('Simulasi: Cetak dokumen')}>
                      <FileText className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {paginatedData.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-8 text-slate-500">Tidak ada data COTA.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-white">
        <p className="text-sm text-slate-500">
          Menampilkan <span className="font-medium text-slate-900">{data.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</span> hingga <span className="font-medium text-slate-900">{Math.min(currentPage * itemsPerPage, data.length)}</span> dari <span className="font-medium text-slate-900">{data.length}</span> data
        </p>
        <div className="flex gap-1">
          <button 
            disabled={currentPage === 1 || data.length === 0}
            onClick={() => setCurrentPage(prev => prev - 1)}
            className="px-3 py-1 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Sebelumnya
          </button>
          <button 
            disabled={currentPage === totalPages || data.length === 0}
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="px-3 py-1 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Selanjutnya
          </button>
        </div>
      </div>
    </div>
  );
}
