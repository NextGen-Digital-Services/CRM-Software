"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp, Target, Plus, Award } from "lucide-react";

export function PipelineHeader({
  totalValue,
  weightedValue,
  dealsCount,
  onNewDeal,
}: {
  totalValue: number;
  weightedValue: number;
  dealsCount: number;
  onNewDeal: () => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#2A1F1A] dark:text-[#F7F1E5] gold-hairline">
            Sales Pipeline & Deal Forecasting
          </h1>
          <p className="text-xs sm:text-sm text-[#7A6B5D] dark:text-[#A89B8E] mt-2">
            Track high-value commissions from initial discovery through contract execution.
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={onNewDeal}>
          <Plus className="w-3.5 h-3.5" /> Log New Deal
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card hoverLift className="p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#7A6B5D] font-medium">
              Gross Pipeline Value
            </span>
            <div className="font-serif text-xl sm:text-2xl font-semibold text-[#2A1F1A] dark:text-[#F7F1E5] mt-1 tabular-nums">
              {formatCurrency(totalValue, "INR")}
            </div>
            <div className="text-[10px] text-[#7A6B5D] mt-0.5">{dealsCount} active opportunities</div>
          </div>
          <TrendingUp className="w-6 h-6 text-[#B8975A]" />
        </Card>

        <Card hoverLift className="p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#7A6B5D] font-medium">
              Weighted Forecast
            </span>
            <div className="font-serif text-xl sm:text-2xl font-semibold text-[#5E7A3A] mt-1 tabular-nums">
              {formatCurrency(weightedValue, "INR")}
            </div>
            <div className="text-[10px] text-[#7A6B5D] mt-0.5">Probability-adjusted projection</div>
          </div>
          <Target className="w-6 h-6 text-[#5E7A3A]" />
        </Card>

        <Card hoverLift className="p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#7A6B5D] font-medium">
              Historical Win Rate
            </span>
            <div className="font-serif text-xl sm:text-2xl font-semibold text-[#1F3A2E] dark:text-[#FFFDF8] mt-1 tabular-nums">
              74.2%
            </div>
            <div className="text-[10px] text-[#7A6B5D] mt-0.5">Elite atelier conversion rate</div>
          </div>
          <Award className="w-6 h-6 text-[#1F3A2E] dark:text-[#FFFDF8]" />
        </Card>
      </div>
    </div>
  );
}
