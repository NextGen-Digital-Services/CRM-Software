"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { useCrmStore } from "@/store/useCrmStore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { RuleBuilderModal } from "@/components/features/automation/RuleBuilderModal";
import { Workflow, Mail, ShieldAlert, Clock, ArrowRight, Play, CheckCircle } from "lucide-react";
import Link from "next/link";
import { automationEngine } from "@/services/automation";
import { toast } from "sonner";

export default function AutomationOverviewPage() {
  const rules = useCrmStore((state) => state.automationRules);
  const outbox = useCrmStore((state) => state.outbox);
  const toggleRule = useCrmStore((state) => state.toggleAutomationRule);
  const [modalOpen, setModalOpen] = useState(false);

  const activeRulesCount = rules.filter((r) => r.isActive).length;

  const handleManualTrigger = () => {
    const count = automationEngine.evaluateRules();
    toast.success(`Automation Engine Ran: ${count} email(s) dispatched to Outbox.`);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#2A1F1A] dark:text-[#F7F1E5] gold-hairline">
              Automated Follow-Up & Dispatch Engine
            </h1>
            <p className="text-xs sm:text-sm text-[#7A6B5D] dark:text-[#A89B8E] mt-2">
              Background scheduler evaluating maturities, arrears notices, and requirement approvals every 30s.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <Button variant="secondary" size="sm" onClick={handleManualTrigger}>
              <Play className="w-3.5 h-3.5 text-[#5E7A3A]" /> Run Rules Now
            </Button>
            <Button variant="primary" size="sm" onClick={() => setModalOpen(true)}>
              <Workflow className="w-3.5 h-3.5" /> New Rule
            </Button>
          </div>
        </div>

        {/* Engine Status Banner */}
        <div className="p-4 rounded-xl border border-[#B8975A]/60 bg-[#B8975A]/10 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#5E7A3A] animate-pulse" />
            <div>
              <span className="font-semibold text-[#1F3A2E] dark:text-[#FFFDF8]">
                Frontend Simulated Automation Engine Active
              </span>
              <span className="text-[#7A6B5D] dark:text-[#A89B8E] block text-[11px]">
                Connect SMTP / Resend in backend phase · All {activeRulesCount} active rules evaluating in real-time.
              </span>
            </div>
          </div>
          <Link href="/outbox">
            <Button variant="gold" size="sm">
              <Mail className="w-3.5 h-3.5" /> View Outbox ({outbox.length})
            </Button>
          </Link>
        </div>

        {/* Quick Nav Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/automation/rules">
            <Card hoverLift className="p-5 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-semibold text-[#2A1F1A] dark:text-[#F7F1E5]">
                  Active Automation Rules ({rules.length})
                </h3>
                <p className="text-xs text-[#7A6B5D] mt-1">
                  Manage triggers, delay thresholds, and conditions.
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-[#B8975A]" />
            </Card>
          </Link>

          <Link href="/automation/templates">
            <Card hoverLift className="p-5 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-semibold text-[#2A1F1A] dark:text-[#F7F1E5]">
                  Email Template Manager (6)
                </h3>
                <p className="text-xs text-[#7A6B5D] mt-1">
                  Curate variable tags, tone of voice, and test previews.
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-[#B8975A]" />
            </Card>
          </Link>
        </div>

        <RuleBuilderModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </div>
    </AppShell>
  );
}
