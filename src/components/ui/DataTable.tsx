"use client";

import React, { ReactNode } from "react";
import { usePagination } from "@/hooks/usePagination";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { EmptyState } from "./EmptyState";

export interface ColumnDef<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  searchQuery?: string;
  onSearchChange?: (val: string) => void;
  searchPlaceholder?: string;
  itemsPerPage?: number;
  emptyTitle?: string;
  emptyDescription?: string;
  title?: string;
  subtitle?: string;
  icon?: React.ElementType;
  actions?: ReactNode;
}

export function DataTable<T>({
  data,
  columns,
  searchQuery,
  onSearchChange,
  searchPlaceholder = "Cari...",
  itemsPerPage = 10,
  emptyTitle = "Data Kosong",
  emptyDescription = "Tidak ada data yang ditemukan.",
  title,
  subtitle,
  icon: Icon,
  actions
}: DataTableProps<T>) {
  const { currentData, currentPage, totalPages, nextPage, prevPage } = usePagination(data, itemsPerPage);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      {/* Header section (Title & Search) */}
      {(title || onSearchChange || actions) && (
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            {title && (
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                {Icon && <Icon className="w-5 h-5 text-blue-500" />} {title}
              </h3>
            )}
            {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {onSearchChange && (
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            )}
            {actions && <div>{actions}</div>}
          </div>
        </div>
      )}

      {/* Table Section */}
      <div className="overflow-x-auto w-full">
        {data.length === 0 ? (
          <EmptyState title={emptyTitle} description={emptyDescription} />
        ) : (
          <table className="w-full text-left border-collapse" role="region" aria-label={title || "Data Table"}>
            <thead className="bg-white">
              <tr className="border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {columns.map((col, i) => (
                  <th key={i} className={`py-4 px-6 ${col.className || ''}`}>{col.header}</th>
                ))}
              </tr>
            </thead>
            <tbody className="text-sm text-slate-700">
              {currentData.map((item, rowIndex) => (
                <tr key={rowIndex} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className={`py-4 px-6 ${col.className || ''}`}>
                      {col.cell ? col.cell(item) : (col.accessorKey ? String(item[col.accessorKey]) : '')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination Section */}
      {data.length > 0 && totalPages > 1 && (
        <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/30">
          <span className="text-xs text-slate-500 font-medium">
            Halaman {currentPage} dari {totalPages}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
