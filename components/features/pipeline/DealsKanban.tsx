"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { formatCurrency, formatDate } from "@/lib/utils";
import { toast } from "sonner";

export interface Deal {
  id: string;
  title: string;
  clientName: string;
  value: number;
  probability: number; // 0 - 100
  stage: "discovery" | "proposal" | "negotiation" | "closing" | "won" | "lost";
  expectedClose: string;
  source: string;
  currency: string;
}

const STAGES: { key: Deal["stage"]; label: string }[] = [
  { key: "discovery", label: "Discovery & Brief" },
  { key: "proposal", label: "Design Proposal" },
  { key: "negotiation", label: "Commercial Terms" },
  { key: "closing", label: "Closing Escrow" },
  { key: "won", label: "Commission Won" },
  { key: "lost", label: "Discontinued" },
];

export function DealsKanban({
  deals,
  setDeals,
}: {
  deals: Deal[];
  setDeals: React.Dispatch<React.SetStateAction<Deal[]>>;
}) {
  const moveDeal = (dealId: string, newStage: Deal["stage"]) => {
    setDeals((prev) =>
      prev.map((d) => (d.id === dealId ? { ...d, stage: newStage } : d))
    );
    toast.success(`Deal moved to ${newStage.toUpperCase()}`);
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x">
      {STAGES.map((stg) => {
        const stageDeals = deals.filter((d) => d.stage === stg.key);
        const stageValue = stageDeals.reduce((sum, d) => sum + d.value, 0);

        return (
          <div
            key={stg.key}
            className="w-80 shrink-0 bg-[#FFFDF8]/70 dark:bg-[#241D17]/70 border border-[#E4DAC6] dark:border-[#382C23] rounded-xl flex flex-col max-h-[75vh]"
          >
            {/* Header */}
            <div className="p-3 border-b border-[#E4DAC6]/60 dark:border-[#382C23]/60 bg-[#F7F1E5]/40 dark:bg-[#1B1511]/40 rounded-t-xl flex items-center justify-between">
              <div>
                <span className="font-serif font-semibold text-xs text-[#2A1F1A] dark:text-[#F7F1E5]">
                  {stg.label}
                </span>
                <div className="text-[10px] text-[#7A6B5D] font-mono">
                  {formatCurrency(stageValue, "INR")}
                </div>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#E4DAC6]/50 dark:bg-[#382C23] text-[#7A6B5D]">
                {stageDeals.length}
              </span>
            </div>

            {/* Lane Cards */}
            <div className="p-2.5 overflow-y-auto space-y-2.5 flex-1">
              {stageDeals.map((deal) => {
                const weighted = Math.round(deal.value * (deal.probability / 100));
                return (
                  <Card
                    key={deal.id}
                    hoverLift
                    className="p-3 bg-[#FFFDF8] dark:bg-[#1B1511] border-[#E4DAC6] dark:border-[#382C23] text-xs space-y-2"
                  >
                    <div className="font-semibold text-sm text-[#2A1F1A] dark:text-[#F7F1E5] line-clamp-1">
                      {deal.title}
                    </div>
                    <div className="text-[11px] text-[#7A6B5D] dark:text-[#A89B8E]">
                      {deal.clientName} · Source: {deal.source}
                    </div>

                    <div className="flex items-center justify-between py-1 border-t border-b border-[#E4DAC6]/50 dark:border-[#382C23]/50">
                      <div>
                        <span className="text-[#7A6B5D] text-[10px] block">Deal Value</span>
                        <span className="font-serif font-semibold text-xs text-[#2A1F1A] dark:text-[#F7F1E5]">
                          {formatCurrency(deal.value, deal.currency)}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[#7A6B5D] text-[10px] block">Weighted ({deal.probability}%)</span>
                        <span className="font-serif font-semibold text-xs text-[#5E7A3A]">
                          {formatCurrency(weighted, deal.currency)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-[#7A6B5D] pt-0.5">
                      <span>Close: {formatDate(deal.expectedClose)}</span>
                      <select
                        value={deal.stage}
                        onChange={(e) => moveDeal(deal.id, e.target.value as Deal["stage"])}
                        className="bg-[#F7F1E5] dark:bg-[#241D17] border border-[#E4DAC6] rounded px-1.5 py-0.5 text-[10px] text-[#2A1F1A] dark:text-[#F7F1E5] cursor-pointer"
                      >
                        {STAGES.map((s) => (
                          <option key={s.key} value={s.key}>
                            Move to {s.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </Card>
                );
              })}

              {stageDeals.length === 0 && (
                <div className="py-8 text-center text-[11px] text-[#7A6B5D]/60 italic">
                  No deals in this stage
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
