"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

const DATA = [
  { month: "May", invoiced: 4500000, collected: 3800000 },
  { month: "Jun", invoiced: 6200000, collected: 5100000 },
  { month: "Jul", invoiced: 5800000, collected: 5400000 },
  { month: "Aug", invoiced: 7100000, collected: 6200000 },
  { month: "Sep", invoiced: 8400000, collected: 7800000 },
  { month: "Oct", invoiced: 9200000, collected: 8100000 },
];

export function RevenueChart() {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <div>
          <CardTitle>Revenue vs Collections</CardTitle>
          <p className="text-xs text-[#7A6B5D] dark:text-[#A89B8E] mt-0.5">
            Billed commitments against settled liquidity (Last 6 Months)
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1F3A2E]" />
            <span className="text-[#7A6B5D]">Invoiced</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B8975A]" />
            <span className="text-[#7A6B5D]">Collected</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorInvoiced" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1F3A2E" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#1F3A2E" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorCollected" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#B8975A" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#B8975A" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E4DAC6" opacity={0.5} />
              <XAxis dataKey="month" stroke="#7A6B5D" fontSize={11} tickLine={false} />
              <YAxis
                stroke="#7A6B5D"
                fontSize={11}
                tickLine={false}
                tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`}
              />
              <Tooltip
                formatter={(val: any) => [`₹${Number(val).toLocaleString()}`, ""]}
                contentStyle={{
                  backgroundColor: "#FFFDF8",
                  borderColor: "#E4DAC6",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="invoiced"
                stroke="#1F3A2E"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorInvoiced)"
              />
              <Area
                type="monotone"
                dataKey="collected"
                stroke="#B8975A"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorCollected)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
