"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { useCrmStore } from "@/store/useCrmStore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Receipt, Plus, Download, TrendingDown } from "lucide-react";
import { toast } from "sonner";

export default function ExpensesPage() {
  const expenses = useCrmStore((state) => state.expenses);
  const addExpense = useCrmStore((state) => state.addExpense);
  const projects = useCrmStore((state) => state.projects);

  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);

  const handleAddExpense = () => {
    addExpense({
      id: `exp_${Date.now()}`,
      projectId: projects[0]?.id || "proj_1",
      projectName: projects[0]?.name || "Palm Jumeirah Villa",
      clientId: projects[0]?.clientId || "cli_1",
      clientName: "Al-Mansoor Luxury Living LLC",
      title: "Artisanal Brass Hardware Patina Samples",
      amount: 45000,
      currency: "INR",
      category: "Sample Prototyping",
      date: new Date().toISOString().split("T")[0],
      receiptNote: "Courier from Florence workshop",
    });
    toast.success("Project expense recorded.");
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#2A1F1A] dark:text-[#F7F1E5] gold-hairline">
              Commission Project Outlays & Expenses
            </h1>
            <p className="text-xs sm:text-sm text-[#7A6B5D] dark:text-[#A89B8E] mt-2">
              Track air freight, sample prototyping, subcontractor fees, and net project profitability.
            </p>
          </div>
          <Button variant="primary" size="sm" onClick={handleAddExpense}>
            <Plus className="w-3.5 h-3.5" /> Record Expense
          </Button>
        </div>

        {/* Expenses Table */}
        <div className="bg-[#FFFDF8] dark:bg-[#241D17] border border-[#E4DAC6] dark:border-[#382C23] rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F7F1E5]/60 dark:bg-[#1B1511]/60 border-b border-[#E4DAC6] text-[#7A6B5D] uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Expense Title</th>
                  <th className="py-3 px-4">Commission Project</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Value Date</th>
                  <th className="py-3 px-4 text-right">Outlay Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4DAC6]/60 dark:divide-[#382C23]/60 text-[#2A1F1A] dark:text-[#F7F1E5]">
                {expenses.map((exp) => (
                  <tr key={exp.id} className="hover:bg-[#F7F1E5]/30 transition-colors">
                    <td className="py-3 px-4 font-semibold text-sm">
                      {exp.title}
                      {exp.receiptNote && (
                        <span className="block text-[11px] text-[#7A6B5D] font-normal">{exp.receiptNote}</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium">{exp.projectName}</div>
                      <div className="text-[10px] text-[#7A6B5D]">{exp.clientName}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-[#E4DAC6]/40 text-[#7A6B5D] font-medium">
                        {exp.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#7A6B5D]">{formatDate(exp.date)}</td>
                    <td className="py-3 px-4 text-right font-serif font-semibold text-[#B5532F] tabular-nums">
                      -{formatCurrency(exp.amount, exp.currency)}
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
