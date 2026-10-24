"use client";

import React, { useState } from "react";
import { useCrmStore } from "@/store/useCrmStore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { toast } from "sonner";
import { Send, CheckCircle2 } from "lucide-react";

export function PortalQuestionnaireSection({ clientId, clientName }: { clientId: string; clientName: string }) {
  const templates = useCrmStore((state) => state.questionnaireTemplates);
  const addResponse = useCrmStore((state) => state.addQuestionnaireResponse);
  const template = templates[0];

  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!template) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addResponse({
      id: `resp_${Date.now()}`,
      templateId: template.id,
      clientId,
      clientName,
      answers,
      submittedAt: new Date().toISOString(),
    });
    setSubmitted(true);
    toast.success("Questionnaire submitted to the Atelier!");
  };

  if (submitted) {
    return (
      <Card className="p-6 text-center space-y-2 border-[#5E7A3A]/40 bg-[#5E7A3A]/5">
        <CheckCircle2 className="w-8 h-8 text-[#5E7A3A] mx-auto" />
        <h4 className="font-serif text-lg font-semibold text-[#1F3A2E] dark:text-[#FFFDF8]">
          Brief Received with Gratitude
        </h4>
        <p className="text-xs text-[#7A6B5D]">
          Your responses have been synced to the private client dossier. Our creative directors will review your specifications.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6 space-y-4">
      <div>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#B8975A]">
          {template.category}
        </span>
        <h3 className="font-serif text-lg font-semibold text-[#2A1F1A] dark:text-[#F7F1E5] mt-0.5">
          {template.title}
        </h3>
        <p className="text-xs text-[#7A6B5D] dark:text-[#A89B8E] mt-1">{template.description}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-xs pt-3 border-t border-[#E4DAC6]/60">
        {template.fields.map((f) => (
          <div key={f.id} className="space-y-1">
            <label className="block font-medium text-[#2A1F1A] dark:text-[#F7F1E5]">
              {f.label} {f.required && <span className="text-[#B5532F]">*</span>}
            </label>
            {f.type === "dropdown" ? (
              <Select
                value={answers[f.id] || ""}
                onChange={(e) => setAnswers({ ...answers, [f.id]: e.target.value })}
                options={(f.options || []).map((o) => ({ value: o, label: o }))}
              />
            ) : f.type === "textarea" ? (
              <textarea
                rows={3}
                value={answers[f.id] || ""}
                onChange={(e) => setAnswers({ ...answers, [f.id]: e.target.value })}
                placeholder={f.placeholder}
                className="w-full p-2.5 rounded-lg border border-[#E4DAC6] dark:border-[#382C23] bg-[#FFFDF8] dark:bg-[#1B1511] text-xs"
              />
            ) : (
              <Input
                type={f.type === "date" ? "date" : "text"}
                value={answers[f.id] || ""}
                onChange={(e) => setAnswers({ ...answers, [f.id]: e.target.value })}
                placeholder={f.placeholder}
                required={f.required}
              />
            )}
          </div>
        ))}

        <Button type="submit" variant="primary" className="w-full">
          <Send className="w-3.5 h-3.5" /> Submit Brief to Atelier
        </Button>
      </form>
    </Card>
  );
}
