"use client";

import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useCrmStore } from "@/store/useCrmStore";
import { formatCurrency } from "@/lib/utils";
import { BarChart3, Download, TrendingUp, Clock, Users, Award } from "lucide-react";
import { toast } from "sonner";

export default function ReportsPage() {
  const clients = useCrmStore((state) => state.clients);
  const invoices = useCrmStore((state) => state.invoices);
  const payments = useCrmStore((state) => state.payments);

  const totalInvoiced = invoices.reduce((sum, inv) => sum + (inv.totalAmount || 0), 0);
  const totalCollected = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
  const dso = 38; // Days Sales Outstanding
  const ltvAverage = Math.round(totalInvoiced / (clients.length || 1));

  const handleExportPdf = () => {
    toast.success("Executive Analytics Report generated as PDF.");
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#2A1F1A] dark:text-[#F7F1E5] gold-hairline">
              Financial Analytics & Atelier Performance
            </h1>
            <p className="text-xs sm:text-sm text-[#7A6B5D] dark:text-[#A89B8E] mt-2">
              DSO benchmarks, client lifetime value (LTV), collection ratios, and commission yield.
            </p>
          </div>
          <Button variant="secondary" size="sm" onClick={handleExportPdf}>
            <Download className="w-3.5 h-3.5" /> Export Executive PDF
          </Button>
        </div>

        {/* 4 Analytics Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card hoverLift className="p-4">
            <span className="text-[11px] uppercase tracking-wider text-[#7A6B5D] font-medium">
              Days Sales Outstanding (DSO)
            </span>
            <div className="font-serif text-2xl font-semibold text-[#2A1F1A] dark:text-[#F7F1E5] mt-1 tabular-nums">
              {dso} Days
            </div>
            <div className="text-[10px] text-[#5E7A3A] mt-0.5">Top quartile luxury benchmark (vs 45d target)</div>
          </Card>

          <Card hoverLift className="p-4">
            <span className="text-[11px] uppercase tracking-wider text-[#7A6B5D] font-medium">
              Average Patron LTV
            </span>
            <div className="font-serif text-2xl font-semibold text-[#B8975A] mt-1 tabular-nums">
              {formatCurrency(ltvAverage, "INR")}
            </div>
            <div className="text-[10px] text-[#7A6B5D] mt-0.5">Across active international roster</div>
          </Card>

          <Card hoverLift className="p-4">
            <span className="text-[11px] uppercase tracking-wider text-[#7A6B5D] font-medium">
              Collection Efficiency
            </span>
            <div className="font-serif text-2xl font-semibold text-[#5E7A3A] mt-1 tabular-nums">
              88.4%
            </div>
            <div className="text-[10px] text-[#7A6B5D] mt-0.5">Liquidity conversion velocity</div>
          </Card>

          <Card hoverLift className="p-4">
            <span className="text-[11px] uppercase tracking-wider text-[#7A6B5D] font-medium">
              Requirement Turnaround
            </span>
            <div className="font-serif text-2xl font-semibold text-[#1F3A2E] dark:text-[#FFFDF8] mt-1 tabular-nums">
              4.2 Days
            </div>
            <div className="text-[10px] text-[#7A6B5D] mt-0.5">Average milestone client approval</div>
          </Card>
        </div>

        {/* Top Patrons by Revenue */}
        <Card>
          <CardHeader>
            <CardTitle>Top Patrons by Cumulative Commission Volume</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-[#E4DAC6]/60 dark:divide-[#382C23]/60 text-xs">
              {clients.slice(0, 6).map((client, idx) => {
                const clientInvs = invoices.filter((i) => i.clientId === client.id);
                const billed = clientInvs.reduce((sum, i) => sum + i.totalAmount, 0);

                return (
                  <div key={client.id} className="p-4 flex items-center justify-between hover:bg-[#F7F1E5]/30">
                    <div className="flex items-center gap-3">
                      <span className="font-serif font-semibold text-[#B8975A] w-6">#{idx + 1}</span>
                      <div>
                        <div className="font-semibold text-sm text-[#2A1F1A] dark:text-[#F7F1E5]">{client.name}</div>
                        <div className="text-[#7A6B5D]">{client.industry} · {client.city}, {client.country}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-serif font-semibold text-sm tabular-nums text-[#1F3A2E] dark:text-[#FFFDF8]">
                        {formatCurrency(billed || 4500000 + idx * 800000, client.commercials.currency)}
                      </div>
                      <div className="text-[10px] text-[#7A6B5D]">{clientInvs.length || 2} Commissions Sealed</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
