"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { useCrmStore } from "@/store/useCrmStore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, Plus, Users, FileText } from "lucide-react";
import { toast } from "sonner";

export default function CalendarPage() {
  const simulatedDate = useCrmStore((state) => state.simulatedDate);
  const invoices = useCrmStore((state) => state.invoices);
  const tasks = useCrmStore((state) => state.tasks);
  const communications = useCrmStore((state) => state.communications);

  const [view, setView] = useState<"agenda" | "month">("agenda");

  // Aggregate calendar events from Invoices (due dates), Tasks (due dates), and Communications
  const events = [
    ...invoices.map((inv) => ({
      id: `ev_inv_${inv.id}`,
      title: `Invoice Due: ${inv.invoiceNumber} (${inv.clientName})`,
      date: inv.dueDate,
      type: "invoice",
      color: "#B5532F",
    })),
    ...tasks.map((t) => ({
      id: `ev_task_${t.id}`,
      title: `Task: ${t.title} (${t.assigneeName})`,
      date: t.dueDate,
      type: "task",
      color: "#C98A1B",
    })),
    ...communications.map((c) => ({
      id: `ev_comm_${c.id}`,
      title: `${c.type.toUpperCase()}: ${c.summary} (${c.clientName})`,
      date: c.date,
      type: "meeting",
      color: "#1F3A2E",
    })),
  ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#2A1F1A] dark:text-[#F7F1E5] gold-hairline">
              Atelier Calendar & Engagements
            </h1>
            <p className="text-xs sm:text-sm text-[#7A6B5D] dark:text-[#A89B8E] mt-2">
              Coordinated timeline of invoice maturities, site tastings, patron meetings, and task deadlines.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex border border-[#E4DAC6] dark:border-[#382C23] rounded-lg p-0.5 bg-[#FFFDF8] dark:bg-[#241D17] text-xs">
              <button
                onClick={() => setView("agenda")}
                className={`px-3 py-1 rounded transition-colors ${view === "agenda" ? "bg-[#1F3A2E] text-white" : "text-[#7A6B5D]"}`}
              >
                Agenda View
              </button>
              <button
                onClick={() => setView("month")}
                className={`px-3 py-1 rounded transition-colors ${view === "month" ? "bg-[#1F3A2E] text-white" : "text-[#7A6B5D]"}`}
              >
                Month View
              </button>
            </div>
            <Button variant="primary" size="sm" onClick={() => toast.info("Event added to calendar.")}>
              <Plus className="w-3.5 h-3.5" /> New Event
            </Button>
          </div>
        </div>

        {/* Events Container */}
        <div className="bg-[#FFFDF8] dark:bg-[#241D17] border border-[#E4DAC6] dark:border-[#382C23] rounded-xl overflow-hidden shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E4DAC6]/60 text-xs">
            <span className="font-semibold text-sm text-[#2A1F1A] dark:text-[#F7F1E5]">
              Upcoming Scheduled Milestones ({events.length})
            </span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-[11px] text-[#7A6B5D]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B5532F]" /> Invoice Due
              </span>
              <span className="flex items-center gap-1.5 text-[11px] text-[#7A6B5D]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C98A1B]" /> Task
              </span>
              <span className="flex items-center gap-1.5 text-[11px] text-[#7A6B5D]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1F3A2E]" /> Meeting
              </span>
            </div>
          </div>

          <div className="divide-y divide-[#E4DAC6]/60 dark:divide-[#382C23]/60">
            {events.slice(0, 15).map((ev) => (
              <div key={ev.id} className="py-3 flex items-center justify-between text-xs hover:bg-[#F7F1E5]/30 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: ev.color }} />
                  <div>
                    <div className="font-semibold text-sm text-[#2A1F1A] dark:text-[#F7F1E5]">{ev.title}</div>
                    <div className="text-[11px] text-[#7A6B5D] uppercase tracking-wider font-mono">
                      Category: {ev.type}
                    </div>
                  </div>
                </div>
                <div className="font-serif font-semibold text-xs text-[#2A1F1A] dark:text-[#F7F1E5]">
                  {formatDate(ev.date)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
