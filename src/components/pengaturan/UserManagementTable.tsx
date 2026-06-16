"use client";

import { SystemUser } from "@/types";
import { UserCog, MoreVertical } from "lucide-react";
import { DataTable, ColumnDef } from "@/components/ui/DataTable";
import { useState } from "react";

export function UserManagementTable({ users }: { users: SystemUser[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns: ColumnDef<SystemUser>[] = [
    {
      header: "Nama / Email",
      cell: (user) => (
        <>
          <div className="font-bold text-slate-900">{user.name}</div>
          <div className="text-xs text-slate-500">{user.email}</div>
        </>
      )
    },
    {
      header: "Role",
      cell: (user) => (
        <span className="font-medium text-slate-700 bg-slate-100 px-2 py-1 rounded-md text-xs">
          {user.role}
        </span>
      )
    },
    {
      header: "Status",
      cell: (user) => (
        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
          user.status === 'Aktif' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
        }`}>
          {user.status}
        </span>
      )
    },
    {
      header: "Login Terakhir",
      cell: (user) => (
        <span className="text-slate-500">
          {new Date(user.lastLogin).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
        </span>
      )
    },
    {
      header: "Aksi",
      className: "text-center",
      cell: () => (
        <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors rounded-full hover:bg-blue-50" aria-label="Aksi Pengguna">
          <MoreVertical className="w-4 h-4" />
        </button>
      )
    }
  ];

  const actions = (
    <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
      + Tambah User
    </button>
  );

  return (
    <DataTable
      data={filteredUsers}
      columns={columns}
      title="Manajemen Pengguna"
      subtitle="Kelola staf, petugas lapangan, dan akses admin."
      icon={UserCog}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      searchPlaceholder="Cari pengguna..."
      actions={actions}
      itemsPerPage={5}
    />
  );
}
