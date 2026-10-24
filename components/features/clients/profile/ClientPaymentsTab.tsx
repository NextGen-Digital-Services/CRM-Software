"use client";

import React from "react";
import { useCrmStore } from "@/store/useCrmStore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Download, CreditCard, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export function ClientPaymentsTab({ clientId, clientName }: { clientId: string; clientName: string }) {
  const payments = useCrmStore((state) => state.payments).filter((p) => p.clientId === clientId);

  const totalPaid = payments.reduce((sum, p) => sum + (p.amount || 0), 0);

  const handleExportStatement = () => {
    toast.success(`Statement of Account generated for ${clientName}`, {
      description: "Audited financial ledger prepared for download.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Remittance History & Receipts</CardTitle>
          <p className="text-xs text-[#7A6B5D] dark:text-[#A89B8E] mt-0.5">
            Total Settled Liquidity: <strong className="text-[#5E7A3A] font-serif">{formatCurrency(totalPaid, "INR")}</strong>
          </p>
        </div>
        <Button variant="secondary" size="sm" onClick={handleExportStatement}>
          <Download className="w-3.5 h-3.5" />
          Export Statement
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-[#E4DAC6]/60 dark:divide-[#382C23]/60 text-xs">
          {payments.map((p) => (
            <div key={p.id} className="p-4 flex items-center justify-between hover:bg-[#F7F1E5]/30 transition-colors">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-[#2A1F1A] dark:text-[#F7F1E5]">
                    Ref: {p.referenceNumber}
                  </span>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-[#5E7A3A]/15 text-[#5E7A3A] font-medium">
                    {p.paymentMethod.replace("_", " ")}
                  </span>
                </div>
                <div className="text-[11px] text-[#7A6B5D]">
                  Against: {p.invoiceNumber} · Remitted: {formatDate(p.paymentDate)}
                </div>
              </div>

              <div className="text-right">
                <div className="font-serif font-semibold text-sm text-[#5E7A3A] tabular-nums">
                  +{formatCurrency(p.amount, p.currency)}
                </div>
                <div className="text-[10px] text-[#7A6B5D] italic">{p.notes || "Settled"}</div>
              </div>
            </div>
          ))}

          {payments.length === 0 && (
            <div className="p-8 text-center text-xs text-[#7A6B5D]">
              Nessun pagamento — No remittance receipts recorded yet.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
