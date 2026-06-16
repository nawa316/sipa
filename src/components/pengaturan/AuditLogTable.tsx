"use client";

import { SystemAuditLog } from "@/types";
import { Activity } from "lucide-react";
import { DataTable, ColumnDef } from "@/components/ui/DataTable";
import { useState } from "react";

export function AuditLogTable({ logs }: { logs: SystemAuditLog[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLogs = logs.filter(log => 
    log.actor.toLowerCase().includes(searchQuery.toLowerCase()) || 
    log.action.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns: ColumnDef<SystemAuditLog>[] = [
    {
      header: "Timestamp",
      cell: (log) => (
        <span className="text-slate-500 font-mono text-xs">
          {new Date(log.timestamp).toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'medium' })}
        </span>
      )
    },
    {
      header: "Aktor (User)",
      cell: (log) => <span className="font-semibold text-slate-800 text-xs">{log.actor}</span>
    },
    {
      header: "Tindakan",
      cell: (log) => (
        <span className="px-2 py-1 rounded bg-slate-100 text-slate-600 font-bold text-xs font-mono">
          {log.action}
        </span>
      )
    },
    {
      header: "Target Objek",
      cell: (log) => <span className="text-slate-600 text-xs">{log.target}</span>
    },
    {
      header: "IP Address",
      cell: (log) => <span className="text-slate-400 font-mono text-xs">{log.ipAddress}</span>
    }
  ];

  return (
    <DataTable
      data={filteredLogs}
      columns={columns}
      title="Riwayat Aktivitas Sistem (Audit Log)"
      subtitle="Rekam jejak forensik untuk pemantauan keamanan."
      icon={Activity}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      searchPlaceholder="Cari riwayat..."
      itemsPerPage={5}
    />
  );
}
