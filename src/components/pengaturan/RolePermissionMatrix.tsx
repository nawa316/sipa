import { Shield, Check, X } from "lucide-react";

const matrix = [
  { resource: "Manajemen Anak", super: true, kepala: true, peksos: true, verifikator: false },
  { resource: "Persetujuan Adopsi", super: true, kepala: true, peksos: false, verifikator: false },
  { retain: "Verifikasi Berkas COTA", super: true, kepala: true, peksos: false, verifikator: true },
  { resource: "Akses Audit Log", super: true, kepala: false, peksos: false, verifikator: false },
  { resource: "Algoritma Matching", super: true, kepala: true, peksos: false, verifikator: false },
];

export function RolePermissionMatrix() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <Shield className="w-5 h-5 text-indigo-500" /> Matriks Hak Akses (Role Permissions)
        </h3>
        <p className="text-sm text-slate-500 mt-1">Konfigurasi izin baca/tulis untuk setiap level jabatan.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-center border-collapse">
          <thead>
            <tr className="bg-white border-b border-slate-100 text-sm font-semibold text-slate-500">
              <th className="py-4 px-6 text-left font-medium border-r border-slate-50">Modul / Resource</th>
              <th className="py-4 px-6 font-medium">Super Admin</th>
              <th className="py-4 px-6 font-medium">Kepala UPT</th>
              <th className="py-4 px-6 font-medium">Pekerja Sosial</th>
              <th className="py-4 px-6 font-medium">Verifikator</th>
            </tr>
          </thead>
          <tbody className="text-sm text-slate-700">
            {matrix.map((row, idx) => (
              <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-6 text-left font-medium text-slate-700 border-r border-slate-50">
                  {row.resource || row.retain}
                </td>
                <td className="py-4 px-6">
                  {row.super ? <Check className="w-5 h-5 text-emerald-500 mx-auto" /> : <X className="w-4 h-4 text-slate-300 mx-auto" />}
                </td>
                <td className="py-4 px-6">
                  {row.kepala ? <Check className="w-5 h-5 text-emerald-500 mx-auto" /> : <X className="w-4 h-4 text-slate-300 mx-auto" />}
                </td>
                <td className="py-4 px-6">
                  {row.peksos ? <Check className="w-5 h-5 text-emerald-500 mx-auto" /> : <X className="w-4 h-4 text-slate-300 mx-auto" />}
                </td>
                <td className="py-4 px-6">
                  {row.verifikator ? <Check className="w-5 h-5 text-emerald-500 mx-auto" /> : <X className="w-4 h-4 text-slate-300 mx-auto" />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
