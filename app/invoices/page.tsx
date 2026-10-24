"use client";

import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { useCrmStore } from "@/store/useCrmStore";
import { InvoiceTable } from "@/components/features/invoices/InvoiceTable";
import { Button } from "@/components/ui/Button";
import { Plus, Download, FileSpreadsheet } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function InvoicesPage() {
  const invoices = useCrmStore((state) => state.invoices);

  const handleExportCsv = () => {
    const headers = "InvoiceNumber,Client,IssueDate,DueDate,Currency,TotalAmount,BalanceDue,Status\n";
    const rows = invoices
      .map(
        (inv) =>
          `"${inv.invoiceNumber}","${inv.clientName}","${inv.issueDate}","${inv.dueDate}","${inv.currency}","${inv.totalAmount}","${inv.balanceDue}","${inv.status}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `bellezza_invoices_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Invoices ledger exported as CSV.");
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#2A1F1A] dark:text-[#F7F1E5] gold-hairline">
              Commercial Invoices & Statements
            </h1>
            <p className="text-xs sm:text-sm text-[#7A6B5D] dark:text-[#A89B8E] mt-2">
              Multi-currency billing registry with automatic VAT/GST calculations and aging evaluation.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Button variant="secondary" size="sm" onClick={handleExportCsv}>
              <Download className="w-3.5 h-3.5" /> Export Ledger
            </Button>
            <Link href="/quotations">
              <Button variant="secondary" size="sm">
                Quotations
              </Button>
            </Link>
            <Link href="/invoices/new">
              <Button variant="primary" size="sm">
                <Plus className="w-3.5 h-3.5" /> Generate Invoice
              </Button>
            </Link>
          </div>
        </div>

        <InvoiceTable invoices={invoices} />
      </div>
    </AppShell>
  );
}
