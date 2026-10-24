"use client";

import React from "react";
import Link from "next/link";
import { Client } from "@/types";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { HealthScoreRing } from "@/components/ui/HealthScoreRing";
import { ClientChecklistRing } from "./ClientChecklistRing";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { MapPin, Mail, Phone, ChevronRight } from "lucide-react";

export function ClientGrid({ clients }: { clients: Client[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {clients.map((client) => {
        const primary = client.contacts[0];
        return (
          <Card key={client.id} hoverLift className="p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#E4DAC6] shrink-0">
                    <ImageWithFallback
                      src={client.avatarUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"}
                      alt={client.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <Link
                      href={`/clients/${client.id}`}
                      className="font-serif font-semibold text-base text-[#2A1F1A] dark:text-[#F7F1E5] hover:text-[#B8975A] transition-colors line-clamp-1"
                    >
                      {client.name}
                    </Link>
                    <div className="text-xs text-[#7A6B5D] dark:text-[#A89B8E]">
                      {client.type} · {client.city}
                    </div>
                  </div>
                </div>
                <Badge status={client.status} />
              </div>

              <p className="text-xs text-[#7A6B5D] dark:text-[#A89B8E] line-clamp-2 mb-4 leading-relaxed">
                {client.notes}
              </p>

              {/* Contacts */}
              <div className="space-y-1 py-2.5 border-t border-b border-[#E4DAC6]/60 dark:border-[#382C23]/60 text-xs">
                <div className="flex items-center gap-2 text-[#2A1F1A] dark:text-[#F7F1E5] font-medium">
                  <span>{primary?.name || "No primary contact"}</span>
                  <span className="text-[10px] text-[#7A6B5D]">({primary?.role})</span>
                </div>
                <div className="flex items-center justify-between text-[#7A6B5D] dark:text-[#A89B8E] text-[11px]">
                  <span>{primary?.email}</span>
                  <span>{primary?.phone}</span>
                </div>
              </div>
            </div>

            {/* Footer with checklist & health score */}
            <div className="flex items-center justify-between pt-3.5 mt-2">
              <ClientChecklistRing checklist={client.checklist} />
              <HealthScoreRing score={client.healthScore} size={34} showLabel={false} />
              <Link
                href={`/clients/${client.id}`}
                className="text-xs font-semibold text-[#B8975A] hover:underline flex items-center gap-1"
              >
                Profile <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
