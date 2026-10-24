"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { useCrmStore } from "@/store/useCrmStore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, Send, Eye, Variable } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function EmailTemplatesPage() {
  const emailTemplates = useCrmStore((state) => state.emailTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState(emailTemplates[0]);

  const handleTestSend = (templateName: string) => {
    toast.success(`Simulated test email sent for "${templateName}"`, {
      description: "Rendered variables dispatched to concierge testing terminal.",
    });
  };

  const previewBody = selectedTemplate.body
    .replace(/{{client_name}}/g, "Al-Mansoor Luxury Living LLC")
    .replace(/{{invoice_no}}/g, "BEL-2026-1011")
    .replace(/{{amount_due}}/g, "AED 314,000")
    .replace(/{{due_date}}/g, "2026-11-20")
    .replace(/{{pay_link}}/g, "https://bellezza.agency/portal/cli_1")
    .replace(/{{requirement_list}}/g, "• Calacatta Borghini Master Bath Slabs (Due in 3 days)");

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center gap-3 pb-2 border-b border-[#E4DAC6] dark:border-[#382C23]">
          <Link href="/automation" className="p-2 rounded-lg border border-[#E4DAC6] hover:bg-[#FFFDF8] dark:border-[#382C23] text-[#7A6B5D]">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#2A1F1A] dark:text-[#F7F1E5] gold-hairline">
              Email Template Manager & Tone Curators
            </h1>
            <p className="text-xs sm:text-sm text-[#7A6B5D] dark:text-[#A89B8E] mt-2">
              Diplomatic phrasing across friendly reminders, firm statements, and formal arrears demand letters.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Template List */}
          <div className="space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7A6B5D]">
              Select Template ({emailTemplates.length})
            </span>
            {emailTemplates.map((t) => (
              <div
                key={t.id}
                onClick={() => setSelectedTemplate(t)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer text-xs ${
                  selectedTemplate.id === t.id
                    ? "bg-[#FFFDF8] dark:bg-[#241D17] border-[#B8975A] shadow-md ring-1 ring-[#B8975A]"
                    : "bg-[#FFFDF8]/70 dark:bg-[#241D17]/70 border-[#E4DAC6] dark:border-[#382C23] hover:border-[#B8975A]/60"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm text-[#2A1F1A] dark:text-[#F7F1E5]">{t.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold uppercase ${
                    t.tone === "Final Notice" ? "bg-[#B5532F]/15 text-[#B5532F]" : t.tone === "Firm" ? "bg-[#C98A1B]/15 text-[#C98A1B]" : "bg-[#5E7A3A]/15 text-[#5E7A3A]"
                  }`}>
                    {t.tone}
                  </span>
                </div>
                <p className="text-[#7A6B5D] dark:text-[#A89B8E] line-clamp-1">{t.subject}</p>
              </div>
            ))}
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E4DAC6]">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#B8975A] font-semibold">Live Variable Preview</span>
                  <div className="font-serif text-lg font-semibold text-[#2A1F1A] dark:text-[#F7F1E5] mt-0.5">
                    Subject: {selectedTemplate.subject.replace(/{{invoice_no}}/g, "BEL-2026-1011")}
                  </div>
                </div>
                <Button variant="gold" size="sm" onClick={() => handleTestSend(selectedTemplate.name)}>
                  <Send className="w-3.5 h-3.5" /> Test Dispatch
                </Button>
              </div>

              <div className="p-4 rounded-xl bg-[#F7F1E5]/50 dark:bg-[#1B1511]/50 border border-[#E4DAC6] text-xs font-mono whitespace-pre-wrap leading-relaxed text-[#2A1F1A] dark:text-[#F7F1E5]">
                {previewBody}
              </div>

              <div className="pt-2 text-[11px] text-[#7A6B5D] flex flex-wrap gap-2 items-center">
                <span className="font-semibold text-[#B8975A] flex items-center gap-1">
                  <Variable className="w-3.5 h-3.5" /> Supported Tags:
                </span>
                {selectedTemplate.variables.map((v) => (
                  <code key={v} className="px-1.5 py-0.5 rounded bg-[#E4DAC6]/40 text-[#2A1F1A] dark:text-[#F7F1E5]">
                    {"{{"}{v}{"}}"}
                  </code>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
