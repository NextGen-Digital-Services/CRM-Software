"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { useCrmStore } from "@/store/useCrmStore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";
import { Phone, Mail, MessageSquare, Users, Search, Plus } from "lucide-react";
import { toast } from "sonner";

export default function CommunicationsPage() {
  const communications = useCrmStore((state) => state.communications);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filtered = communications.filter((c) => {
    const matchSearch = c.clientName.toLowerCase().includes(search.toLowerCase()) || c.summary.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "all" || c.type === typeFilter;
    return matchSearch && matchType;
  });

  const ICONS = { call: Phone, email: Mail, whatsapp: MessageSquare, meeting: Users };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#2A1F1A] dark:text-[#F7F1E5] gold-hairline">
              Patron Communication Ledger
            </h1>
            <p className="text-xs sm:text-sm text-[#7A6B5D] dark:text-[#A89B8E] mt-2">
              Diplomatic exchanges, private telephone briefings, executive presentations, and WhatsApp memos.
            </p>
          </div>
          <Button variant="primary" size="sm" onClick={() => toast.info("Use the Client Profile tab or Command Palette (⌘K) to log new interactions.")}>
            <Plus className="w-3.5 h-3.5" /> Log Interaction
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#FFFDF8] dark:bg-[#241D17] border border-[#E4DAC6] dark:border-[#382C23] p-3 rounded-xl shadow-sm">
          <div className="relative min-w-[200px] flex-1 max-w-sm">
            <Search className="w-4 h-4 text-[#7A6B5D] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search patron name, summary notes..."
              className="w-full h-9 pl-9 pr-3 text-xs bg-[#F7F1E5]/50 dark:bg-[#1B1511] border border-[#E4DAC6] rounded-lg text-[#2A1F1A] dark:text-[#F7F1E5] focus:outline-none"
            />
          </div>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="h-9 px-3 text-xs bg-[#F7F1E5]/50 dark:bg-[#1B1511] border border-[#E4DAC6] rounded-lg text-[#2A1F1A] dark:text-[#F7F1E5]"
          >
            <option value="all">All Channels ({communications.length})</option>
            <option value="call">Telephone Calls</option>
            <option value="meeting">Atelier Meetings</option>
            <option value="whatsapp">WhatsApp Memos</option>
            <option value="email">Formal Emails</option>
          </select>
        </div>

        {/* Ledger */}
        <div className="bg-[#FFFDF8] dark:bg-[#241D17] border border-[#E4DAC6] dark:border-[#382C23] rounded-xl overflow-hidden shadow-sm divide-y divide-[#E4DAC6]/60 dark:divide-[#382C23]/60">
          {filtered.map((comm) => {
            const Icon = ICONS[comm.type] || MessageSquare;
            return (
              <div key={comm.id} className="p-4 space-y-2 hover:bg-[#F7F1E5]/30 transition-colors text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded bg-[#1F3A2E]/10 dark:bg-[#FFFDF8]/10 text-[#1F3A2E] dark:text-[#FFFDF8]">
                      <Icon className="w-4 h-4 text-[#B8975A]" />
                    </div>
                    <div>
                      <span className="font-semibold text-sm text-[#2A1F1A] dark:text-[#F7F1E5]">
                        {comm.summary}
                      </span>
                      <span className="text-[11px] text-[#7A6B5D] ml-2">({comm.clientName})</span>
                    </div>
                  </div>
                  <span className="text-[11px] text-[#7A6B5D]">
                    {formatDate(comm.date)} by {comm.loggedByName}
                  </span>
                </div>

                <p className="text-[#7A6B5D] dark:text-[#A89B8E] leading-relaxed">{comm.details}</p>

                {comm.outcome && (
                  <div className="p-2.5 rounded-lg bg-[#F7F1E5]/70 dark:bg-[#1B1511]/70 border border-[#E4DAC6]/50 text-[11px]">
                    <strong className="text-[#B8975A]">Agreed Protocol:</strong> {comm.outcome}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
