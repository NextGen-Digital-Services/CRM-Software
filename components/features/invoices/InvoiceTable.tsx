"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Invoice } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatCurrency, formatDate } from "@/lib/utils";
import { generateInvoicePdf } from "./PdfGenerator";
import { Download, Eye, ChevronRight, Search } from "lucide-react";
import { toast } from "sonner";

export function InvoiceTable({ invoices }: { invoices: Invoice[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = invoices.filter((inv) => {
    const matchSearch =
      inv.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
      inv.clientName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || inv.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleDownload = (e: React.MouseEvent, inv: Invoice) => {
    e.stopPropagation();
    generateInvoicePdf(inv);
    toast.success(`Generated official PDF for ${inv.invoiceNumber}`);
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#FFFDF8] dark:bg-[#241D17] border border-[#E4DAC6] dark:border-[#382C23] p-3 rounded-xl">
        <div className="relative min-w-[200px] flex-1 max-w-sm">
          <Search className="w-4 h-4 text-[#7A6B5D] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search invoice number, client name..."
            className="w-full h-9 pl-9 pr-3 text-xs bg-[#F7F1E5]/50 dark:bg-[#1B1511] border border-[#E4DAC6] dark:border-[#382C23] rounded-lg text-[#2A1F1A] dark:text-[#F7F1E5] focus:outline-none focus:border-[#B8975A]"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-9 px-3 text-xs bg-[#F7F1E5]/50 dark:bg-[#1B1511] border border-[#E4DAC6] dark:border-[#382C23] rounded-lg text-[#2A1F1A] dark:text-[#F7F1E5] cursor-pointer"
        >
          <option value="all">All Statuses ({invoices.length})</option>
          <option value="paid">Paid</option>
          <option value="partially_paid">Partially Paid</option>
          <option value="overdue">Overdue</option>
          <option value="sent">Sent</option>
          <option value="viewed">Viewed</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-[#FFFDF8] dark:bg-[#241D17] border border-[#E4DAC6] dark:border-[#382C23] rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F1E5]/60 dark:bg-[#1B1511]/60 border-b border-[#E4DAC6] text-[#7A6B5D] uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Invoice #</th>
                <th className="py-3 px-4">Patron Account</th>
                <th className="py-3 px-4">Issue / Due Date</th>
                <th className="py-3 px-4 text-right">Total Amount</th>
                <th className="py-3 px-4 text-right">Balance Due</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4DAC6]/60 dark:divide-[#382C23]/60 text-[#2A1F1A] dark:text-[#F7F1E5]">
              {filtered.map((inv) => (
                <tr key={inv.id} className="hover:bg-[#F7F1E5]/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-semibold text-[#1F3A2E] dark:text-[#B8975A]">
                    <Link href={`/invoices/${inv.id}`} className="hover:underline">
                      {inv.invoiceNumber}
                    </Link>
                  </td>
                  <td className="py-3 px-4 font-medium">{inv.clientName}</td>
                  <td className="py-3 px-4 text-[11px] text-[#7A6B5D]">
                    {formatDate(inv.issueDate)} · Due {formatDate(inv.dueDate)}
                  </td>
                  <td className="py-3 px-4 text-right font-serif font-semibold tabular-nums">
                    {formatCurrency(inv.totalAmount, inv.currency)}
                  </td>
                  <td className="py-3 px-4 text-right font-serif tabular-nums font-semibold text-[#B5532F]">
                    {inv.balanceDue > 0 ? formatCurrency(inv.balanceDue, inv.currency) : "—"}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Badge status={inv.status} />
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={(e) => handleDownload(e, inv)}
                        className="p-1.5 rounded-lg border border-[#E4DAC6] text-[#7A6B5D] hover:text-[#B8975A] transition-colors"
                        title="Download PDF"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                      <Link
                        href={`/invoices/${inv.id}`}
                        className="p-1.5 rounded-lg border border-[#E4DAC6] text-[#7A6B5D] hover:text-[#2A1F1A] transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
