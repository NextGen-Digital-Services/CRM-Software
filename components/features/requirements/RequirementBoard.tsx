"use client";

import React, { useState } from "react";
import { useCrmStore } from "@/store/useCrmStore";
import { Requirement, RequirementStatus } from "@/types";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";
import { CheckCircle2, Clock, Paperclip, Plus } from "lucide-react";
import { toast } from "sonner";

export function RequirementBoard({ onAddRequirement }: { onAddRequirement: () => void }) {
  const projects = useCrmStore((state) => state.projects);
  const updateRequirement = useCrmStore((state) => state.updateRequirement);
  const [filterStatus, setFilterStatus] = useState("all");

  const allReqs = projects.flatMap((p) =>
    p.requirements.map((r) => ({ ...r, projectName: p.name, projectCode: p.code }))
  );

  const filtered = allReqs.filter((r) => filterStatus === "all" || r.status === filterStatus);

  const handleStatusChange = (id: string, newStatus: RequirementStatus) => {
    updateRequirement(id, { status: newStatus });
    toast.success(`Requirement updated to ${newStatus.replace("_", " ").toUpperCase()}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="h-9 px-3 text-xs bg-[#FFFDF8] dark:bg-[#241D17] border border-[#E4DAC6] dark:border-[#382C23] rounded-lg text-[#2A1F1A] dark:text-[#F7F1E5] cursor-pointer"
          >
            <option value="all">All Requirements ({allReqs.length})</option>
            <option value="draft">Draft</option>
            <option value="pending_client">Pending Client</option>
            <option value="received">Received</option>
            <option value="in_review">In Review</option>
            <option value="approved">Approved</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <Button variant="primary" size="sm" onClick={onAddRequirement}>
          <Plus className="w-3.5 h-3.5" /> Add Requirement
        </Button>
      </div>

      <div className="bg-[#FFFDF8] dark:bg-[#241D17] border border-[#E4DAC6] dark:border-[#382C23] rounded-xl overflow-hidden shadow-sm divide-y divide-[#E4DAC6]/60 dark:divide-[#382C23]/60">
        {filtered.map((req) => (
          <div key={req.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#F7F1E5]/30 transition-colors text-xs">
            <div className="space-y-1 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-[#B8975A] font-semibold">{req.projectCode}</span>
                <span className="font-semibold text-sm text-[#2A1F1A] dark:text-[#F7F1E5]">{req.title}</span>
                <Badge status={req.status} />
              </div>
              <p className="text-xs text-[#7A6B5D] dark:text-[#A89B8E] leading-relaxed">{req.description}</p>
              <div className="flex items-center gap-3 text-[11px] text-[#7A6B5D] pt-0.5">
                <span>Category: {req.category}</span>
                <span>Owner: {req.ownerName}</span>
                <span>Due: {formatDate(req.dueDate)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={req.status}
                onChange={(e) => handleStatusChange(req.id, e.target.value as RequirementStatus)}
                className="h-8 px-2.5 text-xs bg-[#F7F1E5] dark:bg-[#1B1511] border border-[#E4DAC6] dark:border-[#382C23] rounded-lg text-[#2A1F1A] dark:text-[#F7F1E5] cursor-pointer"
              >
                <option value="draft">Draft</option>
                <option value="pending_client">Pending from Client</option>
                <option value="received">Received</option>
                <option value="in_review">In Review</option>
                <option value="approved">Approved</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
