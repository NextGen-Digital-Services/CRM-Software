"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { useCrmStore } from "@/store/useCrmStore";
import { Badge } from "@/components/ui/Badge";
import { CalendarClock } from "lucide-react";
import { formatDate, formatCurrency } from "@/lib/utils";
import Link from "next/link";

export function UpcomingDueWidget() {
  const invoices = useCrmStore((state) => state.invoices);
  const tasks = useCrmStore((state) => state.tasks);

  const pendingInvoices = invoices
    .filter((i) => i.balanceDue > 0 && i.status !== "paid" && i.status !== "cancelled")
    .slice(0, 4);

  return (
    <Card className="col-span-1">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CalendarClock className="w-4 h-4 text-[#B8975A]" />
          <CardTitle>Upcoming & Overdue Maturities</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-[#E4DAC6]/60 dark:divide-[#382C23]/60">
          {pendingInvoices.map((inv) => (
            <div
              key={inv.id}
              className="p-3.5 flex items-center justify-between hover:bg-[#F7F1E5]/40 dark:hover:bg-[#1B1511]/40 transition-colors"
            >
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-semibold text-xs text-[#2A1F1A] dark:text-[#F7F1E5]">
                    {inv.invoiceNumber}
                  </span>
                  <Badge status={inv.status} />
                </div>
                <div className="text-xs text-[#7A6B5D] dark:text-[#A89B8E] truncate max-w-[180px]">
                  {inv.clientName}
                </div>
              </div>
              <div className="text-right">
                <div className="font-serif font-semibold text-xs text-[#2A1F1A] dark:text-[#F7F1E5]">
                  {formatCurrency(inv.balanceDue, inv.currency)}
                </div>
                <div className="text-[10px] text-[#7A6B5D] dark:text-[#A89B8E]">
                  Due: {formatDate(inv.dueDate)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
