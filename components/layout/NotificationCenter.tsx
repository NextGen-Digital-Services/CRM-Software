"use client";

import React, { useState } from "react";
import { Bell, AlertCircle, Clock, CheckCircle2, X } from "lucide-react";
import { useCrmStore } from "@/store/useCrmStore";
import Link from "next/link";

export function NotificationCenter() {
  const [open, setOpen] = useState(false);
  const invoices = useCrmStore((state) => state.invoices);
  const tasks = useCrmStore((state) => state.tasks);

  const overdueInvoices = invoices.filter((i) => i.status === "overdue");
  const urgentTasks = tasks.filter((t) => t.priority === "urgent" && t.status !== "completed");
  const totalAlerts = overdueInvoices.length + urgentTasks.length;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-lg border border-[#E4DAC6] text-[#7A6B5D] hover:text-[#2A1F1A] hover:bg-[#F7F1E5] dark:border-[#382C23] dark:text-[#A89B8E] dark:hover:text-[#F7F1E5] transition-colors cursor-pointer"
        title="Notifications"
      >
        <Bell className="w-4 h-4" />
        {totalAlerts > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#B5532F] text-[10px] font-bold text-white flex items-center justify-center">
            {totalAlerts}
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#FFFDF8] border border-[#E4DAC6] rounded-xl shadow-xl z-50 p-4 dark:bg-[#241D17] dark:border-[#382C23]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E4DAC6]/60 dark:border-[#382C23]/60">
              <span className="font-serif font-semibold text-[#2A1F1A] dark:text-[#F7F1E5] text-sm">
                Notifications ({totalAlerts})
              </span>
              <button onClick={() => setOpen(false)} className="text-[#7A6B5D] hover:text-[#2A1F1A]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-3 space-y-2.5 max-h-72 overflow-y-auto">
              {overdueInvoices.slice(0, 3).map((inv) => (
                <Link
                  key={inv.id}
                  href={`/invoices`}
                  onClick={() => setOpen(false)}
                  className="flex items-start gap-2.5 p-2.5 rounded-lg bg-[#B5532F]/10 border border-[#B5532F]/20 text-xs hover:bg-[#B5532F]/15 transition-colors"
                >
                  <AlertCircle className="w-4 h-4 text-[#B5532F] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-[#B5532F]">
                      Overdue Invoice: {inv.invoiceNumber}
                    </div>
                    <div className="text-[#2A1F1A] dark:text-[#F7F1E5] line-clamp-1">
                      {inv.clientName} — {inv.currency} {inv.balanceDue.toLocaleString()}
                    </div>
                  </div>
                </Link>
              ))}

              {urgentTasks.slice(0, 3).map((t) => (
                <Link
                  key={t.id}
                  href={`/tasks`}
                  onClick={() => setOpen(false)}
                  className="flex items-start gap-2.5 p-2.5 rounded-lg bg-[#C98A1B]/10 border border-[#C98A1B]/20 text-xs hover:bg-[#C98A1B]/15 transition-colors"
                >
                  <Clock className="w-4 h-4 text-[#C98A1B] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-[#C98A1B]">Urgent Task: {t.title}</div>
                    <div className="text-[#7A6B5D] dark:text-[#A89B8E]">
                      Assigned to {t.assigneeName} · Due {t.dueDate}
                    </div>
                  </div>
                </Link>
              ))}

              {totalAlerts === 0 && (
                <div className="py-6 text-center text-xs text-[#7A6B5D] dark:text-[#A89B8E]">
                  All clear! No pending alerts or overdue statements.
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
