"use client";

import { Anak } from "@/types";
import { DataTable, ColumnDef } from "@/components/ui/DataTable";
import { Users, Eye, Edit, Download } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSearch } from "@/hooks/useSearch";

export function ChildTable({ data }: { data: Anak[] }) {
  const router = useRouter();
  const { searchQuery, setSearchQuery, filteredData } = useSearch(data, ["nama", "id"]);

  const columns: ColumnDef<Anak>[] = [
    {
      header: "ID",
      accessorKey: "id",
      className: "font-mono font-bold text-slate-900",
    },
    {
      header: "Nama Lengkap",
      cell: (anak) => (
        <div className="font-medium text-slate-900">{anak.nama}</div>
      ),
    },
    {
      header: "Usia",
      cell: (anak) => {
        const birthYear = new Date(anak.tanggalLahir).getFullYear();
        const currentYear = new Date().getFullYear();
        return `${currentYear - birthYear} Tahun`;
      },
    },
    {
      header: "Gender",
      cell: (anak) => (
        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
          anak.jenisKelamin === 'L' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'
        }`}>
          {anak.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan'}
        </span>
      ),
    },
    {
      header: "Status",
      cell: (anak) => {
        const bgColors = {
          'Tersedia': 'bg-emerald-100 text-emerald-700',
          'Proses Matching': 'bg-amber-100 text-amber-700',
          'Diadopsi': 'bg-slate-100 text-slate-700'
        };
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-bold ${bgColors[anak.status]}`}>
            {anak.status}
          </span>
        );
      },
    },
    {
      header: "Aksi",
      className: "text-right",
      cell: (anak) => (
        <div className="flex gap-2 justify-end">
          <button 
            onClick={() => router.push(`/anak/${anak.id}`)}
            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Lihat Detail"
            aria-label={`Lihat Detail ${anak.nama}`}
          >
            <Eye className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Edit" aria-label={`Edit ${anak.nama}`}>
            <Edit className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Unduh Berkas" aria-label={`Unduh Berkas ${anak.nama}`}>
            <Download className="w-4 h-4" />
          </button>
        </div>
      ),
    }
  ];

  return (
    <DataTable
      data={filteredData}
      columns={columns}
      itemsPerPage={10}
      title="Daftar Anak"
      icon={Users}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      searchPlaceholder="Cari nama atau ID anak..."
      emptyTitle="Tidak Ada Data Anak"
      emptyDescription="Sistem belum mencatat data anak atau tidak ada yang cocok dengan filter pencarian."
    />
  );
}
