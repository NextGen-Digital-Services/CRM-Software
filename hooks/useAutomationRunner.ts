"use client";

import { useEffect } from "react";
import { useCrmStore } from "@/store/useCrmStore";
import { automationEngine } from "@/services/automation";

export function useAutomationRunner() {
  const simulatedDate = useCrmStore((state) => state.simulatedDate);

  useEffect(() => {
    // Run on initial load and whenever simulated date changes
    automationEngine.evaluateRules();

    // Run every 30 seconds
    const interval = setInterval(() => {
      automationEngine.evaluateRules();
    }, 30000);

    return () => clearInterval(interval);
  }, [simulatedDate]);
}
