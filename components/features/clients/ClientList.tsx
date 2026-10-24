"use client";

import React from "react";
import Link from "next/link";
import { Client } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { HealthScoreRing } from "@/components/ui/HealthScoreRing";
import { ClientChecklistRing } from "./ClientChecklistRing";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { ChevronRight, Phone, Mail, Building2 } from "lucide-react";

export function ClientList({ clients }: { clients: Client[] }) {
  return (
    <div className="bg-[#FFFDF8] dark:bg-[#241D17] border border-[#E4DAC6] dark:border-[#382C23] rounded-xl overflow-hidden shadow-sm">
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#F7F1E5]/60 dark:bg-[#1B1511]/60 border-b border-[#E4DAC6] dark:border-[#382C23] text-[#7A6B5D] dark:text-[#A89B8E] uppercase tracking-wider text-[10px]">
            <tr>
              <th className="py-3 px-4">Patron & Industry</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4">Primary Contact</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Checklist</th>
              <th className="py-3 px-4">Health</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E4DAC6]/60 dark:divide-[#382C23]/60 text-[#2A1F1A] dark:text-[#F7F1E5]">
            {clients.map((client) => {
              const primary = client.contacts[0];
              return (
                <tr key={client.id} className="hover:bg-[#F7F1E5]/30 dark:hover:bg-[#1B1511]/30 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#E4DAC6] shrink-0">
                        <ImageWithFallback
                          src={client.avatarUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"}
                          alt={client.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <Link href={`/clients/${client.id}`} className="font-semibold text-sm hover:text-[#B8975A] transition-colors">
                          {client.name}
                        </Link>
                        <div className="text-[11px] text-[#7A6B5D] dark:text-[#A89B8E]">{client.industry}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-medium">{client.city}</span>, <span className="text-[#7A6B5D]">{client.country}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium">{primary?.name || "—"}</div>
                    <div className="text-[10px] text-[#7A6B5D]">{primary?.email || "—"}</div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge status={client.status} />
                  </td>
                  <td className="py-3 px-4">
                    <ClientChecklistRing checklist={client.checklist} />
                  </td>
                  <td className="py-3 px-4">
                    <HealthScoreRing score={client.healthScore} size={36} showLabel={false} />
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      href={`/clients/${client.id}`}
                      className="p-1.5 inline-flex rounded-lg text-[#7A6B5D] hover:text-[#2A1F1A] hover:bg-[#E4DAC6]/40"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Card View */}
      <div className="md:hidden divide-y divide-[#E4DAC6]/60 dark:divide-[#382C23]/60">
        {clients.map((client) => (
          <Link
            key={client.id}
            href={`/clients/${client.id}`}
            className="p-4 flex items-center justify-between hover:bg-[#F7F1E5]/40 transition-colors block"
          >
            <div className="space-y-1.5 flex-1 pr-3">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-[#2A1F1A] dark:text-[#F7F1E5]">
                  {client.name}
                </span>
                <Badge status={client.status} />
              </div>
              <div className="text-xs text-[#7A6B5D] dark:text-[#A89B8E]">
                {client.city}, {client.country} · {client.industry}
              </div>
              <div className="flex items-center gap-4 pt-1">
                <ClientChecklistRing checklist={client.checklist} />
                <HealthScoreRing score={client.healthScore} size={30} showLabel={false} />
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#7A6B5D] shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}
