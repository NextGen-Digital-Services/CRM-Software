"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { useCrmStore } from "@/store/useCrmStore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { RuleBuilderModal } from "@/components/features/automation/RuleBuilderModal";
import { ArrowLeft, Plus, CheckCircle2, Clock, Zap } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function AutomationRulesPage() {
  const rules = useCrmStore((state) => state.automationRules);
  const toggleRule = useCrmStore((state) => state.toggleAutomationRule);
  const [modalOpen, setModalOpen] = useState(false);

  const handleToggle = (id: string, name: string) => {
    toggleRule(id);
    toast.success(`Rule "${name}" status toggled.`);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/automation" className="p-2 rounded-lg border border-[#E4DAC6] hover:bg-[#FFFDF8] dark:border-[#382C23] text-[#7A6B5D]">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#2A1F1A] dark:text-[#F7F1E5] gold-hairline">
                Automation Rule Protocols
              </h1>
              <p className="text-xs sm:text-sm text-[#7A6B5D] dark:text-[#A89B8E] mt-2">
                Pre-configured triggers for 3 days before due, due date, 7 days overdue, and stalled milestones.
              </p>
            </div>
          </div>
          <Button variant="primary" size="sm" onClick={() => setModalOpen(true)}>
            <Plus className="w-3.5 h-3.5" /> Create Rule
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rules.map((rule) => (
            <Card key={rule.id} hoverLift className="p-5 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Zap className={`w-4 h-4 ${rule.isActive ? "text-[#B8975A]" : "text-[#7A6B5D]"}`} />
                    <h3 className="font-semibold text-sm text-[#2A1F1A] dark:text-[#F7F1E5]">{rule.name}</h3>
                  </div>
                  <button
                    onClick={() => handleToggle(rule.id, rule.name)}
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                      rule.isActive
                        ? "bg-[#5E7A3A]/15 text-[#5E7A3A] border border-[#5E7A3A]/40"
                        : "bg-[#7A6B5D]/15 text-[#7A6B5D] border border-[#7A6B5D]/40"
                    }`}
                  >
                    {rule.isActive ? "Active" : "Disabled"}
                  </button>
                </div>

                <p className="text-xs text-[#7A6B5D] dark:text-[#A89B8E] leading-relaxed">
                  {rule.description}
                </p>

                <div className="pt-2 border-t border-[#E4DAC6]/60 dark:border-[#382C23]/60 flex items-center justify-between text-[11px] text-[#7A6B5D]">
                  <span>Trigger: {rule.trigger.replace(/_/g, " ")} ({rule.triggerDays}d)</span>
                  <span>Action: {rule.action.replace(/_/g, " ")}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <RuleBuilderModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </div>
    </AppShell>
  );
}
