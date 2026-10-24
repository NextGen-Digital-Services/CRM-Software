"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { useCrmStore } from "@/store/useCrmStore";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Download, Search, CheckCircle2, Receipt } from "lucide-react";
import { toast } from "sonner";

export default function PaymentsPage() {
  const payments = useCrmStore((state) => state.payments);
  const [search, setSearch] = useState("");
  const [methodFilter, setMethodFilter] = useState("all");

  const filtered = payments.filter((p) => {
    const matchSearch =
      p.clientName.toLowerCase().includes(search.toLowerCase()) ||
      p.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
      p.referenceNumber.toLowerCase().includes(search.toLowerCase());
    const matchMethod = methodFilter === "all" || p.paymentMethod === methodFilter;
    return matchSearch && matchMethod;
  });

  const totalCollected = payments.reduce((sum, p) => sum + (p.amount || 0), 0);

  const handleExportCsv = () => {
    const headers = "ID,InvoiceNumber,ClientName,Amount,Currency,PaymentDate,Method,Reference\n";
    const rows = filtered
      .map(
        (p) =>
          `"${p.id}","${p.invoiceNumber}","${p.clientName}","${p.amount}","${p.currency}","${p.paymentDate}","${p.paymentMethod}","${p.referenceNumber}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `bellezza_payments_ledger_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Payments ledger exported as CSV.");
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#2A1F1A] dark:text-[#F7F1E5] gold-hairline">
              Remittance Ledger & Receipts
            </h1>
            <p className="text-xs sm:text-sm text-[#7A6B5D] dark:text-[#A89B8E] mt-2">
              Audited settlement transactions across international banking corridors and gateways.
            </p>
          </div>
          <Button variant="secondary" size="sm" onClick={handleExportCsv}>
            <Download className="w-3.5 h-3.5" /> Export Ledger CSV
          </Button>
        </div>

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#FFFDF8] dark:bg-[#241D17] border border-[#E4DAC6] dark:border-[#382C23] p-3 rounded-xl shadow-sm">
          <div className="relative min-w-[200px] flex-1 max-w-sm">
            <Search className="w-4 h-4 text-[#7A6B5D] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search reference, client, invoice..."
              className="w-full h-9 pl-9 pr-3 text-xs bg-[#F7F1E5]/50 dark:bg-[#1B1511] border border-[#E4DAC6] dark:border-[#382C23] rounded-lg text-[#2A1F1A] dark:text-[#F7F1E5] focus:outline-none focus:border-[#B8975A]"
            />
          </div>

          <select
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
            className="h-9 px-3 text-xs bg-[#F7F1E5]/50 dark:bg-[#1B1511] border border-[#E4DAC6] dark:border-[#382C23] rounded-lg text-[#2A1F1A] dark:text-[#F7F1E5] cursor-pointer"
          >
            <option value="all">All Remittance Methods ({payments.length})</option>
            <option value="bank_transfer">Bank Transfer / SWIFT</option>
            <option value="upi">UPI Corporate</option>
            <option value="card">Card / Merchant Gateway</option>
            <option value="cheque">Cheque</option>
            <option value="razorpay">Razorpay / Stripe Demo</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-[#FFFDF8] dark:bg-[#241D17] border border-[#E4DAC6] dark:border-[#382C23] rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F7F1E5]/60 dark:bg-[#1B1511]/60 border-b border-[#E4DAC6] text-[#7A6B5D] uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Transaction Ref</th>
                  <th className="py-3 px-4">Patron Name</th>
                  <th className="py-3 px-4">Invoice #</th>
                  <th className="py-3 px-4">Method</th>
                  <th className="py-3 px-4">Value Date</th>
                  <th className="py-3 px-4 text-right">Settled Amount</th>
                  <th className="py-3 px-4 text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4DAC6]/60 dark:divide-[#382C23]/60 text-[#2A1F1A] dark:text-[#F7F1E5]">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-[#F7F1E5]/30 transition-colors">
                    <td className="py-3 px-4 font-mono font-medium text-[#B8975A]">{p.referenceNumber}</td>
                    <td className="py-3 px-4 font-medium">{p.clientName}</td>
                    <td className="py-3 px-4 font-mono text-[11px] text-[#7A6B5D]">{p.invoiceNumber}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#5E7A3A]/10 text-[#5E7A3A] font-medium border border-[#5E7A3A]/20">
                        {p.paymentMethod.replace("_", " ")}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#7A6B5D]">{formatDate(p.paymentDate)}</td>
                    <td className="py-3 px-4 text-right font-serif font-semibold text-[#5E7A3A] tabular-nums">
                      +{formatCurrency(p.amount, p.currency)}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => toast.success(`Receipt ${p.referenceNumber} stamped and verified.`)}
                        className="p-1 rounded text-[#7A6B5D] hover:text-[#B8975A]"
                        title="View Official Stamped Receipt"
                      >
                        <Receipt className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
