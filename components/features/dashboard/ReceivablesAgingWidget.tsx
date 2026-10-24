"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { useCrmStore } from "@/store/useCrmStore";
import { formatCurrency } from "@/lib/utils";

export function ReceivablesAgingWidget() {
  const invoices = useCrmStore((state) => state.invoices);
  const simulatedDate = useCrmStore((state) => state.simulatedDate);
  const sim = new Date(simulatedDate);

  let current = 0;
  let d1_30 = 0;
  let d31_60 = 0;
  let d61_90 = 0;
  let d90plus = 0;

  invoices.forEach((inv) => {
    if (inv.balanceDue <= 0 || inv.status === "paid" || inv.status === "cancelled") return;
    const due = new Date(inv.dueDate);
    const diffDays = Math.round((sim.getTime() - due.getTime()) / (1000 * 3600 * 24));

    if (diffDays <= 0) current += inv.balanceDue;
    else if (diffDays <= 30) d1_30 += inv.balanceDue;
    else if (diffDays <= 60) d31_60 += inv.balanceDue;
    else if (diffDays <= 90) d61_90 += inv.balanceDue;
    else d90plus += inv.balanceDue;
  });

  const DATA = [
    { bucket: "Current", amount: current, fill: "#5E7A3A" },
    { bucket: "1–30 Days", amount: d1_30, fill: "#C98A1B" },
    { bucket: "31–60 Days", amount: d31_60, fill: "#B5532F" },
    { bucket: "61–90 Days", amount: d61_90, fill: "#9B4323" },
    { bucket: "90+ Days", amount: d90plus, fill: "#73240D" },
  ];

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Accounts Receivable Aging</CardTitle>
        <span className="text-xs text-[#7A6B5D] dark:text-[#A89B8E]">
          Total Outstanding: {formatCurrency(current + d1_30 + d31_60 + d61_90 + d90plus, "INR")}
        </span>
      </CardHeader>
      <CardContent>
        <div className="h-52 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <XAxis dataKey="bucket" stroke="#7A6B5D" fontSize={11} tickLine={false} />
              <YAxis
                stroke="#7A6B5D"
                fontSize={11}
                tickLine={false}
                tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`}
              />
              <Tooltip
                formatter={(val: any) => [formatCurrency(Number(val), "INR"), "Amount"]}
                contentStyle={{
                  backgroundColor: "#FFFDF8",
                  borderColor: "#E4DAC6",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="amount" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
