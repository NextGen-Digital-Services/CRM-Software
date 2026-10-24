"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { useCrmStore } from "@/store/useCrmStore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FormBuilderModal } from "@/components/features/requirements/FormBuilderModal";
import { Plus, ArrowLeft, Send, CheckSquare, Eye } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function QuestionnaireTemplatesPage() {
  const templates = useCrmStore((state) => state.questionnaireTemplates);
  const clients = useCrmStore((state) => state.clients);
  const [modalOpen, setModalOpen] = useState(false);

  const handleAssignToClient = (tmplTitle: string) => {
    toast.success(`Questionnaire "${tmplTitle}" assigned!`, {
      description: "Encrypted portal questionnaire link dispatched to patron.",
    });
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/requirements" className="p-2 rounded-lg border border-[#E4DAC6] hover:bg-[#FFFDF8] dark:border-[#382C23] text-[#7A6B5D]">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#2A1F1A] dark:text-[#F7F1E5] gold-hairline">
                Client Questionnaire Form Builder
              </h1>
              <p className="text-xs sm:text-sm text-[#7A6B5D] dark:text-[#A89B8E] mt-2">
                Reusable discovery questionnaires for architecture, security vaults, and luxury brand briefs.
              </p>
            </div>
          </div>
          <Button variant="primary" size="sm" onClick={() => setModalOpen(true)}>
            <Plus className="w-3.5 h-3.5" /> Create Template
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {templates.map((tmpl) => (
            <Card key={tmpl.id} hoverLift className="p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#B8975A]">
                    {tmpl.category}
                  </span>
                  <span className="text-xs text-[#7A6B5D]">{tmpl.fields.length} Custom Fields</span>
                </div>
                <h3 className="font-serif text-lg font-semibold text-[#2A1F1A] dark:text-[#F7F1E5] mb-1">
                  {tmpl.title}
                </h3>
                <p className="text-xs text-[#7A6B5D] dark:text-[#A89B8E] leading-relaxed mb-4">
                  {tmpl.description}
                </p>

                <div className="p-3 rounded-lg bg-[#F7F1E5]/50 dark:bg-[#1B1511]/50 border border-[#E4DAC6]/60 dark:border-[#382C23]/60 space-y-1.5 text-xs">
                  <div className="font-medium text-[#7A6B5D] text-[11px]">Field Schema:</div>
                  {tmpl.fields.slice(0, 3).map((f) => (
                    <div key={f.id} className="flex items-center justify-between text-[#2A1F1A] dark:text-[#F7F1E5]">
                      <span>• {f.label}</span>
                      <span className="font-mono text-[10px] text-[#7A6B5D]">[{f.type}]</span>
                    </div>
                  ))}
                  {tmpl.fields.length > 3 && (
                    <div className="text-[10px] text-[#B8975A] italic">
                      + {tmpl.fields.length - 3} more questions
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#E4DAC6]/60 dark:border-[#382C23]/60">
                <Link href={`/portal/${clients[0]?.id || "cli_1"}`} target="_blank">
                  <Button variant="secondary" size="sm">
                    <Eye className="w-3.5 h-3.5" /> Portal Preview
                  </Button>
                </Link>
                <Button variant="gold" size="sm" onClick={() => handleAssignToClient(tmpl.title)}>
                  <Send className="w-3.5 h-3.5" /> Assign to Patron
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <FormBuilderModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </div>
    </AppShell>
  );
}
