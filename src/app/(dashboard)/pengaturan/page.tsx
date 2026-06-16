"use client";

import { useState } from "react";
import { UserManagementTable } from "@/components/pengaturan/UserManagementTable";
import { RolePermissionMatrix } from "@/components/pengaturan/RolePermissionMatrix";
import { AHPWeightManager } from "@/components/pengaturan/AHPWeightManager";
import { NotificationSettings } from "@/components/pengaturan/NotificationSettings";
import { AuditLogTable } from "@/components/pengaturan/AuditLogTable";
import { SecurityStatusCard } from "@/components/pengaturan/SecurityStatusCard";
import { BackupManager } from "@/components/pengaturan/BackupManager";

import { mockSystemUsers, mockAHPWeights, mockAuditLogs } from "@/data/mockData";
import { 
  Settings2, Users, Shield, SlidersHorizontal, 
  Bell, Activity, Lock, Database 
} from "lucide-react";

export default function PengaturanPage() {
  const [activeTab, setActiveTab] = useState<string>("umum");

  const tabs = [
    { id: "umum", label: "Ringkasan", icon: Settings2 },
    { id: "users", label: "User Management", icon: Users },
    { id: "roles", label: "Role & Permissions", icon: Shield },
    { id: "ahp", label: "AHP Weights", icon: SlidersHorizontal },
    { id: "notif", label: "Notifikasi", icon: Bell },
    { id: "audit", label: "Audit Logs", icon: Activity },
    { id: "security", label: "Keamanan", icon: Lock },
    { id: "backup", label: "Backup & Recovery", icon: Database },
  ];

  return (
    <div className="pb-16 max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-start">
      {/* Sidebar Tabs */}
      <div className="w-full md:w-64 shrink-0 bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sticky top-6">
        <h2 className="font-bold text-slate-800 px-4 mb-4 mt-2">Pengaturan Sistem</h2>
        <nav className="flex flex-col gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl transition-all font-medium text-sm
                  ${isActive 
                    ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100' 
                    : 'text-slate-600 hover:bg-slate-50 border border-transparent'}
                `}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 w-full min-w-0">
        
        {activeTab === "umum" && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-900 mb-6">Ringkasan Pengaturan</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Users className="w-6 h-6" /></div>
                <div><p className="text-sm text-slate-500">Total Pengguna</p><p className="font-bold text-xl">5 Akun Aktif</p></div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><Shield className="w-6 h-6" /></div>
                <div><p className="text-sm text-slate-500">Status Keamanan</p><p className="font-bold text-xl">Optimal</p></div>
              </div>
            </div>
            <p className="text-slate-500 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              Sistem Informasi Pelayanan Adopsi (SIPA) beroperasi pada mode normal (v2.1.0). Gunakan menu di samping untuk memodifikasi parameter sistem. Semua perubahan yang bersifat struktural akan dicatat secara otomatis dalam Audit Log.
            </p>
          </div>
        )}

        {activeTab === "users" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <UserManagementTable users={mockSystemUsers} />
          </div>
        )}

        {activeTab === "roles" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <RolePermissionMatrix />
          </div>
        )}

        {activeTab === "ahp" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <AHPWeightManager initialWeights={mockAHPWeights} />
          </div>
        )}

        {activeTab === "notif" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <NotificationSettings />
          </div>
        )}

        {activeTab === "audit" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <AuditLogTable logs={mockAuditLogs} />
          </div>
        )}

        {activeTab === "security" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
            <SecurityStatusCard />
          </div>
        )}

        {activeTab === "backup" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <BackupManager />
          </div>
        )}

      </div>
    </div>
  );
}
