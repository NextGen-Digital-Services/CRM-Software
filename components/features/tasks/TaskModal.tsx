"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { useCrmStore } from "@/store/useCrmStore";
import { Task } from "@/types";
import { toast } from "sonner";

export function TaskModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const teamMembers = useCrmStore((state) => state.teamMembers);
  const clients = useCrmStore((state) => state.clients);
  const addTask = useCrmStore((state) => state.addTask);
  const simulatedDate = useCrmStore((state) => state.simulatedDate);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<any>("high");
  const [dueDate, setDueDate] = useState("2026-11-15");
  const [assigneeId, setAssigneeId] = useState(teamMembers[0]?.id || "");
  const [clientId, setClientId] = useState(clients[0]?.id || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const assignee = teamMembers.find((m) => m.id === assigneeId);
    const client = clients.find((c) => c.id === clientId);

    const newTask: Task = {
      id: `task_${Date.now()}`,
      title,
      description,
      priority,
      status: "todo",
      dueDate,
      assigneeId,
      assigneeName: assignee?.name || "Alessandro Conti",
      clientId,
      clientName: client?.name,
      createdAt: simulatedDate,
    };

    addTask(newTask);
    toast.success("Architectural task added to roster.");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Atelier Task" maxWidth="md">
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <Input label="Task Title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Carrara Slab Quality Verification" required />
        <Input label="Task Description & Guidelines" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Tolerances, inspection guidelines..." />

        <div className="grid grid-cols-2 gap-3">
          <Select
            label="Priority Level"
            value={priority}
            onChange={(e) => setPriority(e.target.value as any)}
            options={[
              { value: "low", label: "Low Priority" },
              { value: "medium", label: "Medium Priority" },
              { value: "high", label: "High Priority" },
              { value: "urgent", label: "Urgent Priority" },
            ]}
          />
          <Input label="Maturity / Due Date" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Select
            label="Assignee Architect"
            value={assigneeId}
            onChange={(e) => setAssigneeId(e.target.value)}
            options={teamMembers.map((m) => ({ value: m.id, label: m.name }))}
          />
          <Select
            label="Linked Patron Account"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            options={clients.map((c) => ({ value: c.id, label: c.name }))}
          />
        </div>

        <Button type="submit" variant="primary" className="w-full">Save Task</Button>
      </form>
    </Modal>
  );
}
