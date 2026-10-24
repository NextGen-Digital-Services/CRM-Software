"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { useCrmStore } from "@/store/useCrmStore";
import { AutomationRule } from "@/types";
import { toast } from "sonner";

export function RuleBuilderModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const emailTemplates = useCrmStore((state) => state.emailTemplates);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [trigger, setTrigger] = useState<any>("invoice_due_soon");
  const [triggerDays, setTriggerDays] = useState(3);
  const [templateId, setTemplateId] = useState(emailTemplates[0]?.id || "");
  const [action, setAction] = useState<any>("send_email");
  const [quietHours, setQuietHours] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    toast.success(`Automation Rule "${name}" activated!`, {
      description: "Scheduler will evaluate this rule against simulated time.",
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Configure Automation Protocol" maxWidth="md">
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <Input label="Protocol / Rule Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. 5-Day Arrears Statement Dispatch" required />
        <Input label="Description & Logic" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Dispatches firm letter of demand..." required />

        <div className="grid grid-cols-2 gap-3">
          <Select
            label="Event Trigger"
            value={trigger}
            onChange={(e) => setTrigger(e.target.value)}
            options={[
              { value: "invoice_due_soon", label: "Invoice due in X days" },
              { value: "invoice_overdue", label: "Invoice overdue by X days" },
              { value: "requirement_pending", label: "Requirement pending for X days" },
              { value: "onboarding_stalled", label: "Onboarding stalled for X days" },
              { value: "payment_received", label: "Payment received (Gratitude)" },
            ]}
          />
          <Input label="Trigger Threshold (Days)" type="number" value={triggerDays} onChange={(e) => setTriggerDays(Number(e.target.value))} required />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Select
            label="Automated Action"
            value={action}
            onChange={(e) => setAction(e.target.value)}
            options={[
              { value: "send_email", label: "Send Automated Email (Outbox)" },
              { value: "create_task", label: "Generate Architect Task" },
              { value: "notify_team", label: "Notify Managing Partners" },
            ]}
          />
          <Select
            label="Email Template"
            value={templateId}
            onChange={(e) => setTemplateId(e.target.value)}
            options={emailTemplates.map((t) => ({ value: t.id, label: `${t.name} (${t.tone})` }))}
          />
        </div>

        <div className="p-3 rounded-lg border border-[#E4DAC6] dark:border-[#382C23] flex items-center justify-between">
          <div>
            <span className="font-semibold text-[#2A1F1A] dark:text-[#F7F1E5] block">Enable Quiet Hours Protocol</span>
            <span className="text-[10px] text-[#7A6B5D]">Supress dispatch between 20:00 - 08:30 CE/IST</span>
          </div>
          <input type="checkbox" checked={quietHours} onChange={(e) => setQuietHours(e.target.checked)} className="w-4 h-4 accent-[#1F3A2E]" />
        </div>

        <Button type="submit" variant="primary" className="w-full">Activate Automation Protocol</Button>
      </form>
    </Modal>
  );
}
