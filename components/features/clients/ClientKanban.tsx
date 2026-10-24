"use client";

import React from "react";
import Link from "next/link";
import { Client, OnboardingStatus } from "@/types";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useCrmStore } from "@/store/useCrmStore";
import { toast } from "sonner";
import { ArrowRight, MoreVertical } from "lucide-react";

const LANES: { key: OnboardingStatus; label: string }[] = [
  { key: "lead", label: "Lead" },
  { key: "contacted", label: "Contacted" },
  { key: "docs_pending", label: "Docs Pending" },
  { key: "under_review", label: "Under Review" },
  { key: "onboarded", label: "Onboarded" },
  { key: "active", label: "Active Patron" },
  { key: "on_hold", label: "On Hold" },
  { key: "churned", label: "Churned" },
];

export function ClientKanban({ clients }: { clients: Client[] }) {
  const updateClient = useCrmStore((state) => state.updateClient);

  const handleMove = (clientId: string, newStatus: OnboardingStatus) => {
    updateClient(clientId, { status: newStatus });
    toast.success(`Client moved to ${newStatus.replace("_", " ").toUpperCase()}`);
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x">
      {LANES.map((lane) => {
        const laneClients = clients.filter((c) => c.status === lane.key);
        return (
          <div
            key={lane.key}
            className="w-72 shrink-0 bg-[#FFFDF8]/70 dark:bg-[#241D17]/70 border border-[#E4DAC6] dark:border-[#382C23] rounded-xl flex flex-col max-h-[75vh]"
          >
            {/* Lane Header */}
            <div className="p-3 border-b border-[#E4DAC6]/60 dark:border-[#382C23]/60 flex items-center justify-between bg-[#F7F1E5]/40 dark:bg-[#1B1511]/40 rounded-t-xl">
              <span className="font-serif font-semibold text-xs text-[#2A1F1A] dark:text-[#F7F1E5]">
                {lane.label}
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#E4DAC6]/50 dark:bg-[#382C23] text-[#7A6B5D] font-medium">
                {laneClients.length}
              </span>
            </div>

            {/* Lane Cards */}
            <div className="p-2.5 overflow-y-auto space-y-2.5 flex-1">
              {laneClients.map((client) => (
                <Card
                  key={client.id}
                  hoverLift
                  className="p-3 bg-[#FFFDF8] dark:bg-[#1B1511] border-[#E4DAC6] dark:border-[#382C23] text-xs space-y-2"
                >
                  <div className="flex items-start justify-between gap-1">
                    <Link
                      href={`/clients/${client.id}`}
                      className="font-medium text-[#2A1F1A] dark:text-[#F7F1E5] hover:text-[#B8975A] transition-colors line-clamp-1"
                    >
                      {client.name}
                    </Link>
                  </div>
                  <div className="text-[11px] text-[#7A6B5D] dark:text-[#A89B8E]">
                    {client.city}, {client.country}
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-[#E4DAC6]/50 text-[10px]">
                    <span className="text-[#B8975A] font-medium">{client.commercials.currency} {client.commercials.creditLimit.toLocaleString()}</span>
                    <select
                      value={client.status}
                      onChange={(e) => handleMove(client.id, e.target.value as OnboardingStatus)}
                      className="bg-[#F7F1E5] dark:bg-[#241D17] border border-[#E4DAC6] rounded px-1.5 py-0.5 text-[10px] text-[#2A1F1A] dark:text-[#F7F1E5] cursor-pointer"
                    >
                      {LANES.map((l) => (
                        <option key={l.key} value={l.key}>
                          Move to {l.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </Card>
              ))}

              {laneClients.length === 0 && (
                <div className="py-8 text-center text-[11px] text-[#7A6B5D]/60 italic">
                  No patrons in {lane.label}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
