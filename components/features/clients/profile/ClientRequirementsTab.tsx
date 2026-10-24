"use client";

import React, { useState } from "react";
import { Project, Requirement, RequirementStatus } from "@/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useCrmStore } from "@/store/useCrmStore";
import { Plus, CheckCircle2, Paperclip, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";

export function ClientRequirementsTab({ clientId }: { clientId: string }) {
  const projects = useCrmStore((state) => state.projects).filter((p) => p.clientId === clientId);
  const updateRequirement = useCrmStore((state) => state.updateRequirement);

  const handleStatusChange = (reqId: string, newStatus: RequirementStatus) => {
    updateRequirement(reqId, { status: newStatus });
    toast.success(`Requirement marked as ${newStatus.replace("_", " ").toUpperCase()}`);
  };

  if (projects.length === 0) {
    return (
      <Card className="p-8 text-center text-xs text-[#7A6B5D] dark:text-[#A89B8E]">
        Nessun progetto ancora — No architectural commissions registered for this client yet.
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {projects.map((proj) => {
        const total = proj.requirements.length || 1;
        const completed = proj.requirements.filter((r) => r.status === "completed" || r.status === "approved").length;
        const progressPct = Math.round((completed / total) * 100);

        return (
          <Card key={proj.id}>
            <CardHeader>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs text-[#B8975A] font-semibold">{proj.code}</span>
                  <CardTitle>{proj.name}</CardTitle>
                </div>
                <div className="text-xs text-[#7A6B5D]">
                  Target Handover: {formatDate(proj.targetDate)} · Budget: {proj.currency} {proj.budget.toLocaleString()}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-xs font-semibold text-[#2A1F1A] dark:text-[#F7F1E5]">{progressPct}%</span>
                  <span className="text-[10px] text-[#7A6B5D] block">Milestone Progress</span>
                </div>
                <div className="w-20 h-2 rounded-full bg-[#E4DAC6]/50 dark:bg-[#382C23] overflow-hidden">
                  <div className="h-full bg-[#5E7A3A] rounded-full transition-all" style={{ width: `${progressPct}%` }} />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-[#E4DAC6]/60 dark:divide-[#382C23]/60 text-xs">
                {proj.requirements.map((req) => (
                  <div key={req.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#F7F1E5]/30 transition-colors">
                    <div className="space-y-1 max-w-xl">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-[#2A1F1A] dark:text-[#F7F1E5]">{req.title}</span>
                        <Badge status={req.status} />
                        <span className={`text-[10px] px-1.5 py-0.2 rounded font-medium ${req.priority === "urgent" ? "bg-[#B5532F]/15 text-[#B5532F]" : "bg-[#E4DAC6]/40 text-[#7A6B5D]"}`}>
                          {req.priority.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-xs text-[#7A6B5D] dark:text-[#A89B8E] leading-relaxed">{req.description}</p>
                      <div className="flex items-center gap-3 text-[11px] text-[#7A6B5D] pt-1">
                        <span>Lead: {req.ownerName}</span>
                        <span>Due: {formatDate(req.dueDate)}</span>
                        {req.attachmentsCount > 0 && (
                          <span className="flex items-center gap-1 text-[#B8975A]">
                            <Paperclip className="w-3 h-3" /> {req.attachmentsCount} specs
                          </span>
                        )}
                      </div>
                    </div>

                    <select
                      value={req.status}
                      onChange={(e) => handleStatusChange(req.id, e.target.value as RequirementStatus)}
                      className="h-8 px-2.5 text-xs bg-[#FFFDF8] dark:bg-[#1B1511] border border-[#E4DAC6] dark:border-[#382C23] rounded-lg text-[#2A1F1A] dark:text-[#F7F1E5] cursor-pointer shrink-0"
                    >
                      <option value="draft">Draft</option>
                      <option value="pending_client">Pending from Client</option>
                      <option value="received">Received</option>
                      <option value="in_review">In Review</option>
                      <option value="approved">Approved</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
