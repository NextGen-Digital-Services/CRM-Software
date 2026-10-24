"use client";

import React from "react";
import { Client, OnboardingChecklist } from "@/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { HealthScoreRing } from "@/components/ui/HealthScoreRing";
import { useCrmStore } from "@/store/useCrmStore";
import { formatCurrency } from "@/lib/utils";
import { Check, Shield, MapPin, Globe, CreditCard } from "lucide-react";
import { toast } from "sonner";

export function ClientOverviewTab({ client }: { client: Client }) {
  const updateClient = useCrmStore((state) => state.updateClient);

  const toggleChecklist = (key: keyof OnboardingChecklist) => {
    const updated = { ...client.checklist, [key]: !client.checklist[key] };
    updateClient(client.id, { checklist: updated });
    toast.success("Onboarding checklist updated");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left 2 Cols: Details & Contacts */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Business Identification</CardTitle>
            <span className="text-xs font-mono text-[#B8975A] font-semibold">
              Tax ID: {client.taxId}
            </span>
          </CardHeader>
          <CardContent className="space-y-4 text-xs">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <span className="text-[#7A6B5D] block">Classification</span>
                <span className="font-semibold text-sm text-[#2A1F1A] dark:text-[#F7F1E5]">{client.type}</span>
              </div>
              <div>
                <span className="text-[#7A6B5D] block">Industry</span>
                <span className="font-semibold text-sm text-[#2A1F1A] dark:text-[#F7F1E5]">{client.industry}</span>
              </div>
              <div>
                <span className="text-[#7A6B5D] block">Territory</span>
                <span className="font-semibold text-sm text-[#2A1F1A] dark:text-[#F7F1E5]">{client.city}, {client.country}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E4DAC6]/60 dark:border-[#382C23]/60 flex items-center justify-between">
              <span className="text-[#7A6B5D]">{client.address}</span>
              {client.website && (
                <a href={client.website} target="_blank" rel="noreferrer" className="text-[#B8975A] hover:underline flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5" /> {client.website.replace("https://", "")}
                </a>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Patron Key Contacts ({client.contacts.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-[#E4DAC6]/60 dark:divide-[#382C23]/60 text-xs">
              {client.contacts.map((c) => (
                <div key={c.id} className="p-4 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-sm text-[#2A1F1A] dark:text-[#F7F1E5]">
                      {c.name} {c.isPrimary && <span className="text-[10px] text-[#B8975A] font-normal">★ Primary</span>}
                    </div>
                    <div className="text-[#7A6B5D] dark:text-[#A89B8E]">{c.role}</div>
                  </div>
                  <div className="text-right space-y-0.5">
                    <div className="text-[#2A1F1A] dark:text-[#F7F1E5] font-medium">{c.email}</div>
                    <div className="text-[#7A6B5D]">{c.phone} {c.whatsapp && `· WA: ${c.whatsapp}`}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Col: Commercials & Checklist */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Onboarding Protocol</CardTitle>
            <HealthScoreRing score={client.healthScore} size={32} showLabel={false} />
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { key: "kycDocsVerified" as const, label: "KYC & Corporate Registry Verified" },
              { key: "agreementSigned" as const, label: "Master Service Agreement Signed" },
              { key: "advanceReceived" as const, label: "Retainer / Advance Remitted" },
              { key: "kickoffCallCompleted" as const, label: "Architectural Kickoff Completed" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => toggleChecklist(item.key)}
                className="w-full flex items-center justify-between p-2.5 rounded-lg border border-[#E4DAC6] dark:border-[#382C23] bg-[#F7F1E5]/30 hover:bg-[#F7F1E5] text-left transition-colors text-xs cursor-pointer"
              >
                <span className={client.checklist[item.key] ? "line-through text-[#7A6B5D]" : "font-medium text-[#2A1F1A] dark:text-[#F7F1E5]"}>
                  {item.label}
                </span>
                <span className={`w-5 h-5 rounded flex items-center justify-center shrink-0 border ${client.checklist[item.key] ? "bg-[#5E7A3A] border-[#5E7A3A] text-white" : "border-[#E4DAC6]"}`}>
                  {client.checklist[item.key] && <Check className="w-3.5 h-3.5" />}
                </span>
              </button>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Commercial Covenants</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5 text-xs">
            <div className="flex justify-between">
              <span className="text-[#7A6B5D]">Currency</span>
              <span className="font-semibold text-[#2A1F1A] dark:text-[#F7F1E5]">{client.commercials.currency}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#7A6B5D]">Payment Terms</span>
              <span className="font-semibold text-[#2A1F1A] dark:text-[#F7F1E5]">{client.commercials.paymentTerms.toUpperCase()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#7A6B5D]">Credit Limit</span>
              <span className="font-semibold text-[#2A1F1A] dark:text-[#F7F1E5]">
                {formatCurrency(client.commercials.creditLimit, client.commercials.currency)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#7A6B5D]">Account Manager</span>
              <span className="font-semibold text-[#2A1F1A] dark:text-[#F7F1E5]">{client.commercials.assignedManagerName}</span>
            </div>
            <div className="pt-2 border-t border-[#E4DAC6]/60 dark:border-[#382C23]/60 flex flex-wrap gap-1">
              {client.commercials.tags.map((t) => (
                <span key={t} className="px-2 py-0.5 rounded text-[10px] bg-[#E4DAC6]/40 text-[#7A6B5D]">
                  #{t}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
