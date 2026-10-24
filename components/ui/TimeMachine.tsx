"use client";

import React, { useState } from "react";
import { Clock, FastForward, RotateCcw, ChevronUp, ChevronDown } from "lucide-react";
import { useCrmStore } from "@/store/useCrmStore";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";

export function TimeMachine() {
  const [collapsed, setCollapsed] = useState(false);
  const simulatedDate = useCrmStore((state) => state.simulatedDate);
  const fastForwardDays = useCrmStore((state) => state.fastForwardDays);
  const resetSimulatedDate = useCrmStore((state) => state.resetSimulatedDate);

  const handleAdvance = (days: number) => {
    fastForwardDays(days);
    const future = new Date(new Date(simulatedDate).getTime() + days * 86400000);
    toast.success(`Time advanced +${days} days to ${formatDate(future)}`, {
      description: "Invoices overdue statuses re-evaluated.",
    });
  };

  const handleReset = () => {
    resetSimulatedDate();
    toast.info("Simulated date reset to Today.");
  };

  return (
    <aside
      aria-label="Demo Time Machine Controls"
      className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 bg-[#FFFDF8] border border-[#B8975A] rounded-xl shadow-lg dark:bg-[#241D17] transition-all"
    >
      <div className="flex items-center justify-between px-3.5 py-2 bg-[#1F3A2E] text-[#FFFDF8] rounded-t-xl text-xs font-medium">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-[#B8975A]" />
          <span>Time Machine</span>
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hover:text-[#B8975A] p-0.5 rounded cursor-pointer"
        >
          {collapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {!collapsed && (
        <div className="p-3 space-y-2.5 min-w-[220px]">
          <div className="text-center">
            <span className="text-[10px] uppercase tracking-wider text-[#7A6B5D] dark:text-[#A89B8E]">
              Current Simulated Date
            </span>
            <div className="font-serif text-base font-semibold text-[#2A1F1A] dark:text-[#F7F1E5]">
              {formatDate(simulatedDate)}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            <button
              onClick={() => handleAdvance(1)}
              className="py-1 px-1.5 text-xs font-medium bg-[#F7F1E5] hover:bg-[#E4DAC6] text-[#2A1F1A] rounded border border-[#E4DAC6] dark:bg-[#1B1511] dark:border-[#382C23] dark:text-[#F7F1E5] transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <FastForward className="w-3 h-3 text-[#B8975A]" />
              +1d
            </button>
            <button
              onClick={() => handleAdvance(7)}
              className="py-1 px-1.5 text-xs font-medium bg-[#F7F1E5] hover:bg-[#E4DAC6] text-[#2A1F1A] rounded border border-[#E4DAC6] dark:bg-[#1B1511] dark:border-[#382C23] dark:text-[#F7F1E5] transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <FastForward className="w-3 h-3 text-[#B8975A]" />
              +7d
            </button>
            <button
              onClick={() => handleAdvance(30)}
              className="py-1 px-1.5 text-xs font-medium bg-[#F7F1E5] hover:bg-[#E4DAC6] text-[#2A1F1A] rounded border border-[#E4DAC6] dark:bg-[#1B1511] dark:border-[#382C23] dark:text-[#F7F1E5] transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <FastForward className="w-3 h-3 text-[#B8975A]" />
              +30d
            </button>
          </div>

          <button
            onClick={handleReset}
            className="w-full py-1 text-xs text-[#7A6B5D] hover:text-[#2A1F1A] dark:text-[#A89B8E] dark:hover:text-[#F7F1E5] flex items-center justify-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            Reset to Today
          </button>
        </div>
      )}
    </aside>
  );
}
