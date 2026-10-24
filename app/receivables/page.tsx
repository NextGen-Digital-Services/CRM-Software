"use client";

import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { useCrmStore } from "@/store/useCrmStore";
import { ReceivablesAgingWidget } from "@/components/features/dashboard/ReceivablesAgingWidget";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import Link from "next/link";
import { AlertCircle, Clock, ShieldAlert } from "lucide-react";

export default function ReceivablesPage() {
  const invoices = useCrmStore((state) => state.invoices);
  const simulatedDate = useCrmStore((state) => state.simulatedDate);
  const sim = new Date(simulatedDate);

  const outstandingInvoices = invoices.filter(
    (inv) => inv.balanceDue > 0 && inv.status !== "paid" && inv.status !== "cancelled"
  );

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#2A1F1A] dark:text-[#F7F1E5] gold-hairline">
            Accounts Receivable Aging Analysis
          </h1>
          <p className="text-xs sm:text-sm text-[#7A6B5D] dark:text-[#A89B8E] mt-2">
            Maturity schedule and arrears exposure categorized by delinquency aging buckets.
          </p>
        </div>

        <ReceivablesAgingWidget />

        <Card>
          <CardHeader>
            <CardTitle>Overdue & In-Flight Receivables Registry ({outstandingInvoices.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F7F1E5]/60 dark:bg-[#1B1511]/60 border-b border-[#E4DAC6] text-[#7A6B5D] uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Invoice #</th>
                    <th className="py-3 px-4">Patron Account</th>
                    <th className="py-3 px-4">Maturity Date</th>
                    <th className="py-3 px-4">Aging Bracket</th>
                    <th className="py-3 px-4 text-right">Balance Due</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E4DAC6]/60 dark:divide-[#382C23]/60 text-[#2A1F1A] dark:text-[#F7F1E5]">
                  {outstandingInvoices.map((inv) => {
                    const due = new Date(inv.dueDate);
                    const diffDays = Math.round((sim.getTime() - due.getTime()) / (1000 * 3600 * 24));
                    const isOverdue = diffDays > 0;
                    const bracket =
                      diffDays <= 0
                        ? "Current"
                        : diffDays <= 30
                        ? "1–30 Days"
                        : diffDays <= 60
                        ? "31–60 Days"
                        : diffDays <= 90
                        ? "61–90 Days"
                        : "90+ Days";

                    return (
                      <tr key={inv.id} className="hover:bg-[#F7F1E5]/30 transition-colors">
                        <td className="py-3 px-4 font-mono font-medium text-[#B8975A]">
                          <Link href={`/invoices/${inv.id}`}>{inv.invoiceNumber}</Link>
                        </td>
                        <td className="py-3 px-4 font-medium">{inv.clientName}</td>
                        <td className="py-3 px-4 text-[#7A6B5D]">{formatDate(inv.dueDate)}</td>
                        <td className="py-3 px-4 font-medium">
                          <span className={isOverdue ? "text-[#B5532F] font-semibold" : "text-[#5E7A3A]"}>
                            {bracket} {isOverdue && `(${diffDays}d overdue)`}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right font-serif font-semibold text-[#B5532F] tabular-nums">
                          {formatCurrency(inv.balanceDue, inv.currency)}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Badge status={inv.status} />
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Link
                            href={`/invoices/${inv.id}`}
                            className="text-xs font-semibold text-[#B8975A] hover:underline"
                          >
                            Manage Arrears
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
