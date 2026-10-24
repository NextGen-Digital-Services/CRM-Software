"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { useCrmStore } from "@/store/useCrmStore";
import { Requirement } from "@/types";
import { toast } from "sonner";

export function NewRequirementModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const projects = useCrmStore((state) => state.projects);
  const addRequirement = useCrmStore((state) => state.addRequirement);
  const teamMembers = useCrmStore((state) => state.teamMembers);
  const simulatedDate = useCrmStore((state) => state.simulatedDate);

  const [projectId, setProjectId] = useState(projects[0]?.id || "");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<any>("Interior Architectural Plan");
  const [priority, setPriority] = useState<any>("high");
  const [dueDate, setDueDate] = useState("2026-11-30");
  const [ownerId, setOwnerId] = useState(teamMembers[0]?.id || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !projectId) return;

    const owner = teamMembers.find((m) => m.id === ownerId);
    const selectedProj = projects.find((p) => p.id === projectId);

    const newReq: Requirement = {
      id: `req_${Date.now()}`,
      projectId,
      clientId: selectedProj?.clientId || "",
      title,
      description,
      category,
      priority,
      status: "pending_client",
      dueDate,
      ownerId,
      ownerName: owner?.name || "Alessandro Conti",
      attachmentsCount: 0,
      createdAt: simulatedDate,
      updatedAt: simulatedDate,
    };

    addRequirement(projectId, newReq);
    toast.success(`Requirement added to ${selectedProj?.name}!`);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Project Requirement" maxWidth="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Select
          label="Project Assignment"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          options={projects.map((p) => ({ value: p.id, label: `${p.code} — ${p.name}` }))}
        />
        <Input label="Requirement Title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Master Bath Calacatta Slab Inspection" required />
        <Input label="Technical Specification / Brief" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Detailed architectural tolerances..." required />

        <div className="grid grid-cols-2 gap-3">
          <Select
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            options={[
              { value: "Interior Architectural Plan", label: "Interior Architectural Plan" },
              { value: "Custom Fabrication", label: "Custom Fabrication" },
              { value: "Brand Identity", label: "Brand Identity" },
              { value: "Digital E-Commerce", label: "Digital E-Commerce" },
              { value: "Bespoke Packaging", label: "Bespoke Packaging" },
            ]}
          />
          <Select
            label="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            options={[
              { value: "low", label: "Low Priority" },
              { value: "medium", label: "Medium Priority" },
              { value: "high", label: "High Priority" },
              { value: "urgent", label: "Urgent Priority" },
            ]}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input label="Target Approval Date" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
          <Select
            label="Owner Architect"
            value={ownerId}
            onChange={(e) => setOwnerId(e.target.value)}
            options={teamMembers.map((m) => ({ value: m.id, label: m.name }))}
          />
        </div>

        <Button type="submit" variant="primary" className="w-full">Register Requirement</Button>
      </form>
    </Modal>
  );
}
