"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { useCrmStore } from "@/store/useCrmStore";

export function InvoiceDonutChart() {
  const invoices = useCrmStore((state) => state.invoices);

  const counts = {
    paid: invoices.filter((i) => i.status === "paid").length,
    partially_paid: invoices.filter((i) => i.status === "partially_paid").length,
    overdue: invoices.filter((i) => i.status === "overdue").length,
    sent: invoices.filter((i) => i.status === "sent" || i.status === "viewed").length,
    draft: invoices.filter((i) => i.status === "draft").length,
  };

  const DATA = [
    { name: "Paid", value: counts.paid, color: "#5E7A3A" },
    { name: "Partially Paid", value: counts.partially_paid, color: "#B8975A" },
    { name: "Overdue", value: counts.overdue, color: "#B5532F" },
    { name: "Sent / Viewed", value: counts.sent, color: "#2F6F7A" },
    { name: "Draft", value: counts.draft, color: "#7A6B5D" },
  ];

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Invoice Status Distribution</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="h-44 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={DATA}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={3}
                dataKey="value"
              >
                {DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FFFDF8",
                  borderColor: "#E4DAC6",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-2 text-xs w-full">
          {DATA.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-[#7A6B5D] dark:text-[#A89B8E]">{item.name}</span>
              </div>
              <span className="font-semibold tabular-nums text-[#2A1F1A] dark:text-[#F7F1E5]">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
