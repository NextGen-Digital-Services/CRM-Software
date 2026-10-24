"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { useCrmStore } from "@/store/useCrmStore";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { ClientOverviewTab } from "@/components/features/clients/profile/ClientOverviewTab";
import { ClientRequirementsTab } from "@/components/features/clients/profile/ClientRequirementsTab";
import { ClientDocumentsTab } from "@/components/features/clients/profile/ClientDocumentsTab";
import { ClientInvoicesTab } from "@/components/features/clients/profile/ClientInvoicesTab";
import { ClientPaymentsTab } from "@/components/features/clients/profile/ClientPaymentsTab";
import { ClientCommunicationTab } from "@/components/features/clients/profile/ClientCommunicationTab";
import { ClientNotesTab } from "@/components/features/clients/profile/ClientNotesTab";
import { OnboardingStatus } from "@/types";
import { ArrowLeft, Trash2, ExternalLink } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function ClientProfilePage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const client = useCrmStore((state) => state.clients).find((c) => c.id === id);
  const updateClient = useCrmStore((state) => state.updateClient);
  const deleteClient = useCrmStore((state) => state.deleteClient);

  const [activeTab, setActiveTab] = useState<
    "overview" | "requirements" | "documents" | "invoices" | "payments" | "communication" | "notes"
  >("overview");

  if (!client) {
    return (
      <AppShell>
        <div className="py-20 text-center space-y-4">
          <h2 className="font-serif text-2xl font-semibold">Cliente non trovato</h2>
          <p className="text-xs text-[#7A6B5D]">The requested patron dossier could not be located.</p>
          <Link href="/clients"><Button variant="primary">Return to Roster</Button></Link>
        </div>
      </AppShell>
    );
  }

  const handleStatusChange = (status: OnboardingStatus) => {
    updateClient(client.id, { status });
    toast.success(`Patron status updated to: ${status.replace("_", " ").toUpperCase()}`);
  };

  const handleDelete = () => {
    if (confirm(`Permanently remove dossier for ${client.name}?`)) {
      deleteClient(client.id);
      toast.success("Client dossier removed from archive");
      router.push("/clients");
    }
  };

  const TABS = [
    { key: "overview", label: "Overview" },
    { key: "requirements", label: "Requirements" },
    { key: "documents", label: "Documents" },
    { key: "invoices", label: "Invoices" },
    { key: "payments", label: "Payments" },
    { key: "communication", label: "Communication" },
    { key: "notes", label: "Notes" },
  ];

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E4DAC6] dark:border-[#382C23]">
          <div className="flex items-center gap-4">
            <Link href="/clients" className="p-2 rounded-lg border border-[#E4DAC6] hover:bg-[#FFFDF8] dark:border-[#382C23] text-[#7A6B5D]">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="relative w-14 h-14 rounded-full overflow-hidden border border-[#B8975A]/60 shrink-0">
              <ImageWithFallback src={client.avatarUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"} alt={client.name} fill className="object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="font-serif text-2xl font-semibold text-[#2A1F1A] dark:text-[#F7F1E5]">{client.name}</h1>
                <Badge status={client.status} />
              </div>
              <p className="text-xs text-[#7A6B5D] dark:text-[#A89B8E] mt-0.5">
                {client.type} · {client.city}, {client.country} · Manager: {client.commercials.assignedManagerName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={client.status}
              onChange={(e) => handleStatusChange(e.target.value as OnboardingStatus)}
              className="h-9 px-3 text-xs bg-[#FFFDF8] border border-[#E4DAC6] rounded-lg text-[#2A1F1A] dark:bg-[#241D17] dark:border-[#382C23] dark:text-[#F7F1E5] cursor-pointer"
            >
              <option value="lead">Lead</option>
              <option value="contacted">Contacted</option>
              <option value="docs_pending">Docs Pending</option>
              <option value="under_review">Under Review</option>
              <option value="onboarded">Onboarded</option>
              <option value="active">Active Patron</option>
              <option value="on_hold">On Hold</option>
              <option value="churned">Churned</option>
            </select>
            <Link href={`/portal/${client.id}`} target="_blank">
              <Button variant="secondary" size="sm"><ExternalLink className="w-3.5 h-3.5" /> Portal View</Button>
            </Link>
            <Button variant="danger" size="sm" onClick={handleDelete}><Trash2 className="w-3.5 h-3.5" /></Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 border-b border-[#E4DAC6] dark:border-[#382C23] overflow-x-auto pb-1 text-xs">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-4 py-2 font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === tab.key
                  ? "border-[#B8975A] text-[#1F3A2E] dark:text-[#FFFDF8] font-semibold"
                  : "border-transparent text-[#7A6B5D] hover:text-[#2A1F1A] dark:hover:text-[#F7F1E5]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Body */}
        {activeTab === "overview" && <ClientOverviewTab client={client} />}
        {activeTab === "requirements" && <ClientRequirementsTab clientId={client.id} />}
        {activeTab === "documents" && <ClientDocumentsTab clientId={client.id} />}
        {activeTab === "invoices" && <ClientInvoicesTab clientId={client.id} />}
        {activeTab === "payments" && <ClientPaymentsTab clientId={client.id} clientName={client.name} />}
        {activeTab === "communication" && <ClientCommunicationTab clientId={client.id} clientName={client.name} />}
        {activeTab === "notes" && <ClientNotesTab clientId={client.id} initialNotes={client.notes} />}
      </div>
    </AppShell>
  );
}
