"use client";

import { useState } from "react";
import { mockVerification } from "@/data/mockData";
import { Search, Filter, ClipboardCheck, ArrowRight, Clock, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function VerificationListPage() {
  const [filterStatus, setFilterStatus] = useState("ALL");

  const filteredData = mockVerification.filter((v) => {
    if (filterStatus !== "ALL" && v.status !== filterStatus) return false;
    return true;
  });

  const total = mockVerification.length;
  const selesai = mockVerification.filter(v => v.status === "Selesai").length;
  const proses = mockVerification.filter(v => v.status === "Proses").length;
  const menunggu = mockVerification.filter(v => v.status === "Menunggu").length;

  return (
    <div className="pb-8">
      {/* Header & Stats */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Verifikasi Berkas COTA</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-sm font-medium text-slate-500 mb-1">Total Pengajuan</p>
            <p className="text-2xl font-bold text-slate-800">{total}</p>
          </div>
          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 shadow-sm">
            <p className="text-sm font-medium text-emerald-600 mb-1">Selesai</p>
            <p className="text-2xl font-bold text-emerald-700">{selesai}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 shadow-sm">
            <p className="text-sm font-medium text-blue-600 mb-1">Sedang Diproses</p>
            <p className="text-2xl font-bold text-blue-700">{proses}</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-sm font-medium text-slate-600 mb-1">Menunggu</p>
            <p className="text-2xl font-bold text-slate-700">{menunggu}</p>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/50">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Cari ID Verifikasi atau Nama..." 
                className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-slate-500" />
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="py-2 px-3 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">Semua Status</option>
              <option value="Selesai">Selesai</option>
              <option value="Proses">Proses</option>
              <option value="Menunggu">Menunggu</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-slate-100 text-sm font-semibold text-slate-500">
                <th className="py-4 px-6 font-medium">ID Verifikasi</th>
                <th className="py-4 px-6 font-medium">Calon Orang Tua Angkat</th>
                <th className="py-4 px-6 font-medium">Status & Progress</th>
                <th className="py-4 px-6 font-medium text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-sm text-slate-700">
              {filteredData.map((v) => (
                <tr key={v.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6 font-medium text-slate-900">{v.id}</td>
                  <td className="py-4 px-6">
                    <p className="font-semibold text-slate-800">{v.cotaNames}</p>
                    <p className="text-xs text-slate-500">ID COTA: {v.cotaId}</p>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3 mb-1.5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${
                        v.status === 'Selesai' ? 'bg-emerald-100 text-emerald-700' :
                        v.status === 'Proses' ? 'bg-blue-100 text-blue-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {v.status === 'Selesai' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                        {v.status === 'Proses' && <Clock className="w-3 h-3 mr-1" />}
                        {v.status}
                      </span>
                      <span className="text-xs font-bold text-slate-600">{v.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden max-w-[150px]">
                      <div 
                        className={`h-1.5 rounded-full ${v.progress === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`}
                        style={{ width: `${v.progress}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Link href={`/verifikasi/${v.id}`}>
                      <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm">
                        <ClipboardCheck className="w-4 h-4 text-blue-600" />
                        Cek Berkas
                        <ArrowRight className="w-4 h-4 ml-1 text-slate-400" />
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-slate-500">Tidak ada pengajuan ditemukan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
