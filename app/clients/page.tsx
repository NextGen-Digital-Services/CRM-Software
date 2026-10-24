"use client";

import React, { useState, useMemo } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { useCrmStore } from "@/store/useCrmStore";
import { ClientFilters } from "@/components/features/clients/ClientFilters";
import { ClientList } from "@/components/features/clients/ClientList";
import { ClientGrid } from "@/components/features/clients/ClientGrid";
import { ClientKanban } from "@/components/features/clients/ClientKanban";
import { EmptyState } from "@/components/ui/EmptyState";
import { toast } from "sonner";

export default function ClientsPage() {
  const clients = useCrmStore((state) => state.clients);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [countryFilter, setCountryFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"list" | "grid" | "kanban">("list");

  const filteredClients = useMemo(() => {
    return clients.filter((c) => {
      const matchSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.taxId.toLowerCase().includes(search.toLowerCase()) ||
        c.city.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "all" || c.status === statusFilter;
      const matchCountry = countryFilter === "all" || c.country === countryFilter;
      return matchSearch && matchStatus && matchCountry;
    });
  }, [clients, search, statusFilter, countryFilter]);

  const handleExportCsv = () => {
    const headers = "ID,Name,Type,Industry,TaxID,City,Country,Status,HealthScore\n";
    const rows = filteredClients
      .map(
        (c) =>
          `"${c.id}","${c.name}","${c.type}","${c.industry}","${c.taxId}","${c.city}","${c.country}","${c.status}","${c.healthScore}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `bellezza_clients_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Clients ledger exported as CSV.");
  };

  const handleImportCsv = () => {
    toast.info("CSV Import Protocol", {
      description: "Select CSV formatted file with Client headers. Sample templates available.",
    });
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#2A1F1A] dark:text-[#F7F1E5] gold-hairline">
            Patron Roster & Client Accounts
          </h1>
          <p className="text-xs sm:text-sm text-[#7A6B5D] dark:text-[#A89B8E] mt-2">
            Private clientele directory across India, United Arab Emirates, and Italian ateliers.
          </p>
        </div>

        <ClientFilters
          search={search}
          setSearch={setSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          countryFilter={countryFilter}
          setCountryFilter={setCountryFilter}
          viewMode={viewMode}
          setViewMode={setViewMode}
          onExportCsv={handleExportCsv}
          onImportCsv={handleImportCsv}
        />

        {filteredClients.length === 0 ? (
          <EmptyState
            title="Nessun cliente trovato"
            italianSubtitle="No Clients Matched"
            description="No patron accounts matched your search and filter criteria. Adjust your filters or register a new client."
            actionLabel="Clear Filters"
            onAction={() => {
              setSearch("");
              setStatusFilter("all");
              setCountryFilter("all");
            }}
          />
        ) : viewMode === "list" ? (
          <ClientList clients={filteredClients} />
        ) : viewMode === "grid" ? (
          <ClientGrid clients={filteredClients} />
        ) : (
          <ClientKanban clients={filteredClients} />
        )}
      </div>
    </AppShell>
  );
}
