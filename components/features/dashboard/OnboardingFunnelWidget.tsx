"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { useCrmStore } from "@/store/useCrmStore";
import { OnboardingStatus } from "@/types";

const STAGES: { key: OnboardingStatus; label: string; color: string }[] = [
  { key: "lead", label: "Lead", color: "#7A6B5D" },
  { key: "contacted", label: "Contacted", color: "#2F6F7A" },
  { key: "docs_pending", label: "Docs Pending", color: "#C98A1B" },
  { key: "under_review", label: "Under Review", color: "#B8975A" },
  { key: "onboarded", label: "Onboarded", color: "#5E7A3A" },
  { key: "active", label: "Active Patron", color: "#1F3A2E" },
];

export function OnboardingFunnelWidget() {
  const clients = useCrmStore((state) => state.clients);
  const total = clients.length || 1;

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Onboarding Pipeline Funnel</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {STAGES.map((stg) => {
          const count = clients.filter((c) => c.status === stg.key).length;
          const pct = Math.round((count / total) * 100);

          return (
            <div key={stg.key} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-[#2A1F1A] dark:text-[#F7F1E5]">
                  {stg.label}
                </span>
                <span className="text-[#7A6B5D] tabular-nums">
                  {count} ({pct}%)
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#E4DAC6]/40 dark:bg-[#382C23] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(pct, 4)}%`, backgroundColor: stg.color }}
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
