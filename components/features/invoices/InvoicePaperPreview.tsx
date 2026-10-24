"use client";

import React from "react";
import { Invoice } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { ShieldCheck } from "lucide-react";

export function InvoicePaperPreview({ invoice }: { invoice: Partial<Invoice> }) {
  const currency = invoice.currency || "INR";
  const items = invoice.items || [];

  return (
    <div className="bg-[#FFFDF8] dark:bg-[#201914] border border-[#E4DAC6] dark:border-[#382C23] rounded-2xl shadow-xl p-6 sm:p-8 relative overflow-hidden font-sans text-xs">
      {/* Top Gold Hairline & Header */}
      <div className="w-16 h-1 bg-[#B8975A] mb-4" />
      <div className="flex items-start justify-between border-b border-[#E4DAC6]/70 pb-5">
        <div>
          <div className="font-serif text-2xl font-semibold tracking-wider text-[#1F3A2E] dark:text-[#FFFDF8]">
            BELLEZZA
          </div>
          <div className="text-[10px] uppercase tracking-widest text-[#B8975A] font-medium">
            Atelier & Private Client Guild
          </div>
          <div className="text-[11px] text-[#7A6B5D] mt-1">
            Via Montenapoleone 8, Milano · Nariman Point, Mumbai
          </div>
        </div>

        <div className="text-right">
          <div className="font-serif text-xl font-semibold text-[#1F3A2E] dark:text-[#FFFDF8]">
            {invoice.invoiceNumber || "INV-DRAFT"}
          </div>
          {invoice.status && <Badge status={invoice.status} className="mt-1" />}
        </div>
      </div>

      {/* Bill To & Dates */}
      <div className="grid grid-cols-2 gap-4 py-5 border-b border-[#E4DAC6]/70">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-[#7A6B5D] font-medium block">
            Patron / Recipient
          </span>
          <div className="font-serif text-base font-semibold text-[#2A1F1A] dark:text-[#F7F1E5] mt-0.5">
            {invoice.clientName || "Select Patron"}
          </div>
          <div className="text-[#7A6B5D] text-[11px]">{invoice.clientAddress || "—"}</div>
          <div className="text-[#7A6B5D] text-[11px] font-mono mt-0.5">Tax ID: {invoice.clientTaxId || "—"}</div>
        </div>

        <div className="text-right space-y-1">
          <div><span className="text-[#7A6B5D]">Issue Date:</span> <strong className="text-[#2A1F1A] dark:text-[#F7F1E5]">{formatDate(invoice.issueDate)}</strong></div>
          <div><span className="text-[#7A6B5D]">Maturity (Due):</span> <strong className="text-[#2A1F1A] dark:text-[#F7F1E5]">{formatDate(invoice.dueDate)}</strong></div>
          <div><span className="text-[#7A6B5D]">Tax Mode:</span> {invoice.taxMode || "GST"}</div>
        </div>
      </div>

      {/* Line Items Table */}
      <div className="py-4">
        <table className="w-full text-left">
          <thead className="border-b border-[#E4DAC6] text-[10px] uppercase tracking-wider text-[#7A6B5D]">
            <tr>
              <th className="py-2">Item Specification</th>
              <th className="py-2 text-center">Qty</th>
              <th className="py-2 text-right">Rate</th>
              <th className="py-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E4DAC6]/50">
            {items.map((item, i) => (
              <tr key={i} className="text-[#2A1F1A] dark:text-[#F7F1E5]">
                <td className="py-2.5 font-medium">{item.description || "Unspecified Item"}</td>
                <td className="py-2.5 text-center">{item.quantity}</td>
                <td className="py-2.5 text-right font-serif tabular-nums">{formatCurrency(item.rate, currency)}</td>
                <td className="py-2.5 text-right font-serif tabular-nums font-semibold">{formatCurrency(item.amount, currency)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals & Bank Details */}
      <div className="pt-4 border-t border-[#E4DAC6]/70 flex flex-col sm:flex-row justify-between gap-6">
        <div className="space-y-1 text-[11px] text-[#7A6B5D]">
          <span className="text-[10px] uppercase tracking-wider text-[#B8975A] font-semibold block">
            Wire Remittance Coordinates
          </span>
          <div>Bank: {invoice.bankName || "Banca Intesa Sanpaolo"}</div>
          <div>IBAN: <code className="font-mono text-[#2A1F1A] dark:text-[#F7F1E5]">{invoice.bankIban || "IT60X0542811101..."}</code></div>
          <div>SWIFT: <code className="font-mono text-[#2A1F1A] dark:text-[#F7F1E5]">{invoice.bankSwift || "BCITITMM"}</code></div>
        </div>

        <div className="w-60 space-y-1.5 text-right">
          <div className="flex justify-between text-[#7A6B5D]">
            <span>Subtotal:</span>
            <span className="font-serif tabular-nums">{formatCurrency(invoice.subtotal || 0, currency)}</span>
          </div>
          <div className="flex justify-between text-[#7A6B5D]">
            <span>Tax ({invoice.taxMode === "VAT_5" ? "5% VAT" : "18% GST"}):</span>
            <span className="font-serif tabular-nums">{formatCurrency(invoice.taxAmount || 0, currency)}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-[#E4DAC6] text-sm font-semibold text-[#1F3A2E] dark:text-[#FFFDF8]">
            <span>Total Amount:</span>
            <span className="font-serif tabular-nums text-base">{formatCurrency(invoice.totalAmount || 0, currency)}</span>
          </div>
          <div className="flex justify-between text-xs font-semibold text-[#B5532F]">
            <span>Balance Due:</span>
            <span className="font-serif tabular-nums">{formatCurrency(invoice.balanceDue || invoice.totalAmount || 0, currency)}</span>
          </div>
        </div>
      </div>

      {/* Signature & Wax Seal Monogram */}
      <div className="pt-6 mt-6 border-t border-[#E4DAC6]/60 flex items-center justify-between text-[#7A6B5D] text-[10px]">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#B8975A]" />
          <span>Atelier Authorized Signature Block · Encrypted Ledger</span>
        </div>
        <div className="font-serif italic text-xs text-[#B8975A]">
          Bellezza MMXXVI
        </div>
      </div>
    </div>
  );
}
