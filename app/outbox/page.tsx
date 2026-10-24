"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { useCrmStore } from "@/store/useCrmStore";
import { ComposeEmailModal } from "@/components/features/automation/ComposeEmailModal";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";
import { Mail, RefreshCw, Send, MessageSquare, ExternalLink, Plus, Search } from "lucide-react";
import { toast } from "sonner";

export default function OutboxPage() {
  const outbox = useCrmStore((state) => state.outbox);
  const resendEmail = useCrmStore((state) => state.resendOutboxEmail);
  const [modalOpen, setModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = outbox.filter((e) => {
    const matchSearch = e.clientName.toLowerCase().includes(search.toLowerCase()) || e.subject.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || e.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleCopyWhatsapp = (email: any) => {
    const text = `Gentile ${email.clientName},\n\nRegarding: ${email.subject}\n\n${email.body.slice(0, 160)}...\n\nCordiali saluti, Bellezza CRM`;
    navigator.clipboard.writeText(text);
    toast.success("WhatsApp reminder text copied to clipboard!");
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#2A1F1A] dark:text-[#F7F1E5] gold-hairline">
              Dispatch Outbox & Communication Log
            </h1>
            <p className="text-xs sm:text-sm text-[#7A6B5D] dark:text-[#A89B8E] mt-2">
              <strong className="text-[#B8975A]">Simulated email dispatch</strong> — connect SMTP / Resend in backend phase.
            </p>
          </div>
          <Button variant="primary" size="sm" onClick={() => setModalOpen(true)}>
            <Plus className="w-3.5 h-3.5" /> Compose Email
          </Button>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#FFFDF8] dark:bg-[#241D17] border border-[#E4DAC6] dark:border-[#382C23] p-3 rounded-xl shadow-sm">
          <div className="relative min-w-[200px] flex-1 max-w-sm">
            <Search className="w-4 h-4 text-[#7A6B5D] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search recipient, subject, patron..."
              className="w-full h-9 pl-9 pr-3 text-xs bg-[#F7F1E5]/50 dark:bg-[#1B1511] border border-[#E4DAC6] rounded-lg text-[#2A1F1A] dark:text-[#F7F1E5] focus:outline-none"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 px-3 text-xs bg-[#F7F1E5]/50 dark:bg-[#1B1511] border border-[#E4DAC6] rounded-lg text-[#2A1F1A] dark:text-[#F7F1E5]"
          >
            <option value="all">All Dispatch Statuses ({outbox.length})</option>
            <option value="sent">Sent</option>
            <option value="opened">Opened</option>
            <option value="replied">Replied</option>
            <option value="queued">Queued</option>
          </select>
        </div>

        {/* Outbox Table */}
        <div className="bg-[#FFFDF8] dark:bg-[#241D17] border border-[#E4DAC6] dark:border-[#382C23] rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F7F1E5]/60 dark:bg-[#1B1511]/60 border-b border-[#E4DAC6] text-[#7A6B5D] uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Patron & Recipient</th>
                  <th className="py-3 px-4">Subject & Excerpt</th>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Quick Channels</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4DAC6]/60 dark:divide-[#382C23]/60 text-[#2A1F1A] dark:text-[#F7F1E5]">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-[#F7F1E5]/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-sm">{item.clientName}</div>
                      <div className="text-[11px] text-[#7A6B5D]">{item.recipientEmail}</div>
                    </td>
                    <td className="py-3 px-4 max-w-sm">
                      <div className="font-medium text-xs truncate">{item.subject}</div>
                      <div className="text-[11px] text-[#7A6B5D] truncate">{item.body}</div>
                    </td>
                    <td className="py-3 px-4 text-[#7A6B5D]">{formatDate(item.sentAt)}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                        item.status === "opened" ? "bg-[#5E7A3A]/15 text-[#5E7A3A]" : item.status === "replied" ? "bg-[#B8975A]/15 text-[#B8975A]" : "bg-[#2F6F7A]/15 text-[#2F6F7A]"
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleCopyWhatsapp(item)}
                          className="p-1.5 rounded border border-[#E4DAC6] hover:text-[#5E7A3A]"
                          title="Copy WhatsApp Format"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </button>
                        <a
                          href={`mailto:${item.recipientEmail}?subject=${encodeURIComponent(item.subject)}&body=${encodeURIComponent(item.body)}`}
                          className="p-1.5 rounded border border-[#E4DAC6] hover:text-[#1F3A2E]"
                          title="Open in System Mail Client"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => { resendEmail(item.id); toast.success("Simulated email re-dispatched."); }}
                          className="p-1.5 rounded border border-[#E4DAC6] hover:text-[#B8975A]"
                          title="Resend Dispatch"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <ComposeEmailModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </div>
    </AppShell>
  );
}
