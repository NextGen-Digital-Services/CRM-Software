"use client";

import React from "react";
import { Users, Briefcase, DollarSign, Clock, AlertTriangle, TrendingUp } from "lucide-react";
import { useCrmStore } from "@/store/useCrmStore";
import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/utils";

export function DashboardKpis() {
  const clients = useCrmStore((state) => state.clients);
  const projects = useCrmStore((state) => state.projects);
  const invoices = useCrmStore((state) => state.invoices);
  const payments = useCrmStore((state) => state.payments);

  const activeClients = clients.filter((c) => c.status === "active").length;
  const activeProjects = projects.filter((p) => p.status === "in_progress").length;

  const totalInvoiced = invoices.reduce((sum, inv) => sum + (inv.totalAmount || 0), 0);
  const totalCollected = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
  const totalOutstanding = invoices.reduce((sum, inv) => sum + (inv.balanceDue || 0), 0);
  const totalOverdue = invoices
    .filter((inv) => inv.status === "overdue")
    .reduce((sum, inv) => sum + (inv.balanceDue || 0), 0);

  const collectionRate = totalInvoiced > 0 ? Math.round((totalCollected / totalInvoiced) * 100) : 0;

  const KPIS = [
    { label: "Active Patrons", value: activeClients.toString(), sub: `${clients.length} total registered`, icon: Users, color: "#1F3A2E" },
    { label: "Active Commissions", value: activeProjects.toString(), sub: `${projects.length} across ateliers`, icon: Briefcase, color: "#2F6F7A" },
    { label: "Total Billed", value: formatCurrency(totalInvoiced, "INR"), sub: "Global commitments", icon: DollarSign, color: "#B8975A" },
    { label: "Outstanding Due", value: formatCurrency(totalOutstanding, "INR"), sub: "In-flight receivables", icon: Clock, color: "#C98A1B" },
    { label: "Overdue Balance", value: formatCurrency(totalOverdue, "INR"), sub: "Past scheduled maturity", icon: AlertTriangle, color: "#B5532F" },
    { label: "Collection Efficiency", value: `${collectionRate}%`, sub: "Liquidity clearance", icon: TrendingUp, color: "#5E7A3A" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
      {KPIS.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <Card key={kpi.label} hoverLift className="p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] uppercase tracking-wider text-[#7A6B5D] dark:text-[#A89B8E] font-medium truncate">
                {kpi.label}
              </span>
              <Icon className="w-4 h-4 shrink-0" style={{ color: kpi.color }} />
            </div>
            <div>
              <div className="font-serif text-xl sm:text-2xl font-semibold text-[#2A1F1A] dark:text-[#F7F1E5] tabular-nums tracking-tight">
                {kpi.value}
              </div>
              <div className="text-[10px] text-[#7A6B5D] dark:text-[#A89B8E] mt-0.5 truncate">
                {kpi.sub}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
