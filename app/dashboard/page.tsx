"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { DashboardKpis } from "@/components/features/dashboard/DashboardKpis";
import { RevenueChart } from "@/components/features/dashboard/RevenueChart";
import { InvoiceDonutChart } from "@/components/features/dashboard/InvoiceDonutChart";
import { ReceivablesAgingWidget } from "@/components/features/dashboard/ReceivablesAgingWidget";
import { OnboardingFunnelWidget } from "@/components/features/dashboard/OnboardingFunnelWidget";
import { UpcomingDueWidget } from "@/components/features/dashboard/UpcomingDueWidget";
import { RecentActivityFeed } from "@/components/features/dashboard/RecentActivityFeed";
import { PendingRequirementsWidget } from "@/components/features/dashboard/PendingRequirementsWidget";
import { Button } from "@/components/ui/Button";
import { Plus, Download } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState("year_to_date");

  const handleExportSummary = () => {
    toast.success("Executive Financial Brief generated", {
      description: "Summary exported as CSV for audit fellows.",
    });
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#2A1F1A] dark:text-[#F7F1E5] gold-hairline">
              Atelier Executive Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-[#7A6B5D] dark:text-[#A89B8E] mt-2">
              Pan-European & Indian subcontinent commission metrics, receivables liquidity, and project cadence.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="h-9 px-3 text-xs bg-[#FFFDF8] border border-[#E4DAC6] rounded-lg text-[#2A1F1A] dark:bg-[#241D17] dark:border-[#382C23] dark:text-[#F7F1E5] cursor-pointer"
            >
              <option value="last_30">Last 30 Days</option>
              <option value="last_quarter">Last Quarter (Q2)</option>
              <option value="year_to_date">Fiscal Year 2026 (YTD)</option>
            </select>
            <Button variant="secondary" size="sm" onClick={handleExportSummary}>
              <Download className="w-3.5 h-3.5" />
              Export
            </Button>
            <Link href="/invoices/new">
              <Button variant="primary" size="sm">
                <Plus className="w-3.5 h-3.5" />
                New Invoice
              </Button>
            </Link>
          </div>
        </div>

        {/* Top 6 KPI Cards */}
        <DashboardKpis />

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <RevenueChart />
          <InvoiceDonutChart />
        </div>

        {/* Middle Section: Receivables Aging & Onboarding Funnel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ReceivablesAgingWidget />
          <OnboardingFunnelWidget />
        </div>

        {/* Bottom Section: In-Flight Requirements, Upcoming Dues, and Audit Feed */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PendingRequirementsWidget />
          <UpcomingDueWidget />
          <RecentActivityFeed />
        </div>
      </div>
    </AppShell>
  );
}
