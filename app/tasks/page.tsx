"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { useCrmStore } from "@/store/useCrmStore";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { TaskModal } from "@/components/features/tasks/TaskModal";
import { formatDate } from "@/lib/utils";
import { CheckSquare, Square, Plus, AlertCircle, Clock, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function TasksPage() {
  const tasks = useCrmStore((state) => state.tasks);
  const updateTask = useCrmStore((state) => state.updateTask);
  const deleteTask = useCrmStore((state) => state.deleteTask);
  const [modalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  const toggleTask = (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === "completed" ? "todo" : "completed";
    updateTask(id, { status: nextStatus });
    toast.success(nextStatus === "completed" ? "Task marked completed" : "Task reopened");
  };

  const filtered = tasks.filter((t) => {
    if (filter === "completed") return t.status === "completed";
    if (filter === "pending") return t.status !== "completed";
    return true;
  });

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#2A1F1A] dark:text-[#F7F1E5] gold-hairline">
              Atelier Tasks & Reminders
            </h1>
            <p className="text-xs sm:text-sm text-[#7A6B5D] dark:text-[#A89B8E] mt-2">
              Action items, municipal permits, quality verifications, and automated reminders.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="h-9 px-3 text-xs bg-[#FFFDF8] dark:bg-[#241D17] border border-[#E4DAC6] dark:border-[#382C23] rounded-lg text-[#2A1F1A] dark:text-[#F7F1E5]"
            >
              <option value="all">All Tasks ({tasks.length})</option>
              <option value="pending">Pending Items</option>
              <option value="completed">Completed Items</option>
            </select>
            <Button variant="primary" size="sm" onClick={() => setModalOpen(true)}>
              <Plus className="w-3.5 h-3.5" /> Add Task
            </Button>
          </div>
        </div>

        <div className="bg-[#FFFDF8] dark:bg-[#241D17] border border-[#E4DAC6] dark:border-[#382C23] rounded-xl overflow-hidden shadow-sm divide-y divide-[#E4DAC6]/60 dark:divide-[#382C23]/60">
          {filtered.map((t) => (
            <div
              key={t.id}
              className="p-4 flex items-center justify-between gap-3 hover:bg-[#F7F1E5]/30 transition-colors text-xs"
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => toggleTask(t.id, t.status)}
                  className="mt-0.5 text-[#B8975A] hover:text-[#1F3A2E] cursor-pointer"
                >
                  {t.status === "completed" ? (
                    <CheckSquare className="w-4 h-4 text-[#5E7A3A]" />
                  ) : (
                    <Square className="w-4 h-4" />
                  )}
                </button>
                <div className="space-y-0.5">
                  <div className={`font-semibold text-sm ${t.status === "completed" ? "line-through text-[#7A6B5D]" : "text-[#2A1F1A] dark:text-[#F7F1E5]"}`}>
                    {t.title}
                  </div>
                  {t.description && <p className="text-xs text-[#7A6B5D] dark:text-[#A89B8E]">{t.description}</p>}
                  <div className="flex items-center gap-3 text-[11px] text-[#7A6B5D] pt-1">
                    <span>Assignee: <strong>{t.assigneeName}</strong></span>
                    {t.clientName && <span>Patron: {t.clientName}</span>}
                    <span>Due: {formatDate(t.dueDate)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                  t.priority === "urgent" ? "bg-[#B5532F]/15 text-[#B5532F]" : t.priority === "high" ? "bg-[#C98A1B]/15 text-[#C98A1B]" : "bg-[#7A6B5D]/15 text-[#7A6B5D]"
                }`}>
                  {t.priority}
                </span>
                <button
                  onClick={() => { deleteTask(t.id); toast.success("Task removed"); }}
                  className="text-[#7A6B5D] hover:text-[#B5532F] p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <TaskModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </div>
    </AppShell>
  );
}
