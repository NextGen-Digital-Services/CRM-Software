"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { useCrmStore } from "@/store/useCrmStore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { invoiceService } from "@/services/invoiceService";
import { Quotation } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { ArrowLeft, Check, FileCheck, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SAMPLE_QUOTATIONS: Quotation[] = [
  {
    id: "quot_1",
    quotationNumber: "QUO-2026-0041",
    clientId: "cli_1",
    clientName: "Al-Mansoor Luxury Living LLC",
    date: "2026-10-18",
    validUntil: "2026-11-18",
    currency: "AED",
    items: [
      { id: "1", description: "Bespoke Venetian Bar Stools & Bar Top Millwork", quantity: 1, rate: 380000, discountPercent: 0, taxPercent: 5, amount: 380000 },
    ],
    subtotal: 380000,
    taxAmount: 19000,
    totalAmount: 399000,
    status: "sent",
    notes: "Quotation for Bluewaters Island rooftop cigar terrace.",
  },
  {
    id: "quot_2",
    quotationNumber: "QUO-2026-0042",
    clientId: "cli_2",
    clientName: "Kalyan Heritage Jewellers & Interiors",
    date: "2026-10-20",
    validUntil: "2026-11-20",
    currency: "INR",
    items: [
      { id: "1", description: "High-CRI Optical Fiber Spotlights Shipment Phase 2", quantity: 1, rate: 1800000, discountPercent: 0, taxPercent: 18, amount: 1800000 },
    ],
    subtotal: 1800000,
    taxAmount: 324000,
    totalAmount: 2124000,
    status: "accepted",
    notes: "Approved by Vikramaditya Kalyan for VIP Salon.",
  },
];

export default function QuotationsPage() {
  const router = useRouter();
  const [quotations, setQuotations] = useState<Quotation[]>(SAMPLE_QUOTATIONS);

  const handleConvert = async (quot: Quotation) => {
    const inv = await invoiceService.convertQuotationToInvoice(quot);
    setQuotations(
      quotations.map((q) =>
        q.id === quot.id ? { ...q, status: "converted", convertedInvoiceId: inv.id } : q
      )
    );
    toast.success(`Quotation ${quot.quotationNumber} converted to Invoice ${inv.invoiceNumber}!`);
    router.push(`/invoices/${inv.id}`);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/invoices" className="p-2 rounded-lg border border-[#E4DAC6] hover:bg-[#FFFDF8] dark:border-[#382C23] text-[#7A6B5D]">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#2A1F1A] dark:text-[#F7F1E5] gold-hairline">
                Quotation Proposals & Estimates
              </h1>
              <p className="text-xs sm:text-sm text-[#7A6B5D] dark:text-[#A89B8E] mt-2">
                Convert accepted atelier estimates directly into certified commercial invoices.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#FFFDF8] dark:bg-[#241D17] border border-[#E4DAC6] dark:border-[#382C23] rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F7F1E5]/60 dark:bg-[#1B1511]/60 border-b border-[#E4DAC6] text-[#7A6B5D] uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Quotation #</th>
                  <th className="py-3 px-4">Patron Account</th>
                  <th className="py-3 px-4">Date / Valid Until</th>
                  <th className="py-3 px-4 text-right">Estimate Total</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4DAC6]/60 dark:divide-[#382C23]/60 text-[#2A1F1A] dark:text-[#F7F1E5]">
                {quotations.map((q) => (
                  <tr key={q.id} className="hover:bg-[#F7F1E5]/30 transition-colors">
                    <td className="py-3 px-4 font-mono font-semibold text-[#1F3A2E] dark:text-[#B8975A]">
                      {q.quotationNumber}
                    </td>
                    <td className="py-3 px-4 font-medium">{q.clientName}</td>
                    <td className="py-3 px-4 text-[11px] text-[#7A6B5D]">
                      {formatDate(q.date)} · Valid: {formatDate(q.validUntil)}
                    </td>
                    <td className="py-3 px-4 text-right font-serif font-semibold tabular-nums">
                      {formatCurrency(q.totalAmount, q.currency)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase font-semibold border bg-[#B8975A]/15 text-[#8F7034] border-[#B8975A]/40">
                        {q.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {q.status === "converted" ? (
                        <Link href={`/invoices/${q.convertedInvoiceId}`} className="text-xs text-[#5E7A3A] font-semibold hover:underline">
                          View Invoice
                        </Link>
                      ) : (
                        <Button variant="gold" size="sm" onClick={() => handleConvert(q)}>
                          <FileCheck className="w-3.5 h-3.5" /> Convert to Invoice
                        </Button>
                      )}
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
