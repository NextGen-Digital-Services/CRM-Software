"use client";

import React from "react";
import Link from "next/link";
import { useCrmStore } from "@/store/useCrmStore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Plus, Eye, ChevronRight } from "lucide-react";

export function ClientInvoicesTab({ clientId }: { clientId: string }) {
  const invoices = useCrmStore((state) => state.invoices).filter((i) => i.clientId === clientId);

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Invoices & Commercial Statements</CardTitle>
          <p className="text-xs text-[#7A6B5D] dark:text-[#A89B8E] mt-0.5">
            Billed statements, tax schedules, and collection status.
          </p>
        </div>
        <Link href="/invoices/new">
          <Button variant="primary" size="sm">
            <Plus className="w-3.5 h-3.5" /> New Invoice
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-[#E4DAC6]/60 dark:divide-[#382C23]/60 text-xs">
          {invoices.map((inv) => (
            <div key={inv.id} className="p-4 flex items-center justify-between hover:bg-[#F7F1E5]/30 transition-colors">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-[#2A1F1A] dark:text-[#F7F1E5] font-serif">
                    {inv.invoiceNumber}
                  </span>
                  <Badge status={inv.status} />
                </div>
                <div className="text-[11px] text-[#7A6B5D]">
                  Issued: {formatDate(inv.issueDate)} · Due: {formatDate(inv.dueDate)}
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="font-serif font-semibold text-sm tabular-nums text-[#2A1F1A] dark:text-[#F7F1E5]">
                    {formatCurrency(inv.totalAmount, inv.currency)}
                  </div>
                  <div className="text-[10px] text-[#7A6B5D]">
                    Balance Due: {formatCurrency(inv.balanceDue, inv.currency)}
                  </div>
                </div>
                <Link
                  href={`/invoices/${inv.id}`}
                  className="p-1.5 rounded-lg border border-[#E4DAC6] text-[#7A6B5D] hover:text-[#2A1F1A] hover:bg-[#E4DAC6]/40"
                  title="View Invoice"
                >
                  <Eye className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}

          {invoices.length === 0 && (
            <div className="p-8 text-center text-xs text-[#7A6B5D]">
              Nessuna fattura — No invoices generated for this client yet.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
