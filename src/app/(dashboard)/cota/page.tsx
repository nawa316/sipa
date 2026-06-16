"use client";

import { useState } from "react";
import { mockCOTA } from "@/data/mockData";
import { CotaTable } from "@/components/cota/CotaTable";

export default function CotaListPage() {
  const [filterDomisili, setFilterDomisili] = useState("ALL");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [filterPernikahan, setFilterPernikahan] = useState("ALL");

  const filteredData = mockCOTA.filter((cota) => {
    if (filterDomisili !== "ALL" && cota.domisili !== filterDomisili) return false;
    if (filterStatus !== "ALL" && cota.statusVerifikasi !== filterStatus) return false;
    if (filterPernikahan !== "ALL" && cota.statusPernikahan !== filterPernikahan) return false;
    return true;
  });

  return (
    <div className="flex flex-col lg:flex-row gap-8 pb-8">
      {/* Sidebar Filters */}
      <div className="w-full lg:w-80 shrink-0 space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900">Filter COTA</h3>
            <button 
              onClick={() => { setFilterDomisili("ALL"); setFilterStatus("ALL"); setFilterPernikahan("ALL"); }}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              Reset Filter
            </button>
          </div>
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Domisili</label>
              <select 
                value={filterDomisili}
                onChange={(e) => setFilterDomisili(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ALL">Semua Domisili</option>
                <option value="Surabaya">Surabaya</option>
                <option value="Sidoarjo">Sidoarjo</option>
                <option value="Malang">Malang</option>
                <option value="Gresik">Gresik</option>
                <option value="Mojokerto">Mojokerto</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Status Verifikasi</label>
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ALL">Semua Status</option>
                <option value="Belum Diverifikasi">Belum Diverifikasi</option>
                <option value="Proses">Proses</option>
                <option value="Terverifikasi">Terverifikasi</option>
                <option value="Ditolak">Ditolak</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Status Pernikahan</label>
              <select 
                value={filterPernikahan}
                onChange={(e) => setFilterPernikahan(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ALL">Semua Status</option>
                <option value="Menikah">Menikah</option>
                <option value="Janda/Duda">Janda/Duda</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0">
        <CotaTable data={filteredData} />
      </div>
    </div>
  );
}
