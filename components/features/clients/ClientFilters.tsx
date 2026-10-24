"use client";

import React from "react";
import { Search, LayoutList, LayoutGrid, Kanban, Download, Upload, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export interface ClientFiltersProps {
  search: string;
  setSearch: (v: string) => void;
  statusFilter: string;
  setStatusFilter: (v: string) => void;
  countryFilter: string;
  setCountryFilter: (v: string) => void;
  viewMode: "list" | "grid" | "kanban";
  setViewMode: (v: "list" | "grid" | "kanban") => void;
  onExportCsv: () => void;
  onImportCsv: () => void;
}

export function ClientFilters({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  countryFilter,
  setCountryFilter,
  viewMode,
  setViewMode,
  onExportCsv,
  onImportCsv,
}: ClientFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[#FFFDF8] dark:bg-[#241D17] border border-[#E4DAC6] dark:border-[#382C23] p-3 rounded-xl shadow-sm">
      <div className="flex flex-1 flex-wrap items-center gap-2.5">
        <div className="relative min-w-[200px] flex-1 max-w-sm">
          <Search className="w-4 h-4 text-[#7A6B5D] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search patron name, tax ID, city..."
            className="w-full h-9 pl-9 pr-3 text-xs bg-[#F7F1E5]/50 dark:bg-[#1B1511] border border-[#E4DAC6] dark:border-[#382C23] rounded-lg text-[#2A1F1A] dark:text-[#F7F1E5] placeholder-[#7A6B5D]/60 focus:outline-none focus:border-[#B8975A]"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-9 px-2.5 text-xs bg-[#F7F1E5]/50 dark:bg-[#1B1511] border border-[#E4DAC6] dark:border-[#382C23] rounded-lg text-[#2A1F1A] dark:text-[#F7F1E5] cursor-pointer"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="onboarded">Onboarded</option>
          <option value="under_review">Under Review</option>
          <option value="docs_pending">Docs Pending</option>
          <option value="contacted">Contacted</option>
          <option value="lead">Lead</option>
          <option value="on_hold">On Hold</option>
          <option value="churned">Churned</option>
        </select>

        <select
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
          className="h-9 px-2.5 text-xs bg-[#F7F1E5]/50 dark:bg-[#1B1511] border border-[#E4DAC6] dark:border-[#382C23] rounded-lg text-[#2A1F1A] dark:text-[#F7F1E5] cursor-pointer"
        >
          <option value="all">All Territories</option>
          <option value="India">India</option>
          <option value="UAE">UAE</option>
          <option value="Italy">Italy</option>
        </select>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <div className="flex border border-[#E4DAC6] dark:border-[#382C23] rounded-lg overflow-hidden p-0.5 bg-[#F7F1E5]/50 dark:bg-[#1B1511]">
          <button
            onClick={() => setViewMode("list")}
            className={`p-1.5 rounded transition-colors ${viewMode === "list" ? "bg-[#1F3A2E] text-white" : "text-[#7A6B5D] hover:text-[#2A1F1A]"}`}
            title="List View"
          >
            <LayoutList className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`p-1.5 rounded transition-colors ${viewMode === "grid" ? "bg-[#1F3A2E] text-white" : "text-[#7A6B5D] hover:text-[#2A1F1A]"}`}
            title="Grid View"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("kanban")}
            className={`p-1.5 rounded transition-colors ${viewMode === "kanban" ? "bg-[#1F3A2E] text-white" : "text-[#7A6B5D] hover:text-[#2A1F1A]"}`}
            title="Kanban Board"
          >
            <Kanban className="w-4 h-4" />
          </button>
        </div>

        <Button variant="secondary" size="sm" onClick={onExportCsv} title="Export CSV">
          <Download className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Export</span>
        </Button>
        <Button variant="secondary" size="sm" onClick={onImportCsv} title="Import CSV">
          <Upload className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Import</span>
        </Button>
        <Link href="/clients/new">
          <Button variant="primary" size="sm">
            <Plus className="w-3.5 h-3.5" />
            <span>Add Client</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
