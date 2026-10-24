"use client";

import React, { useState } from "react";
import { useCrmStore } from "@/store/useCrmStore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Phone, Mail, MessageSquare, Users, Plus } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";

export function ClientCommunicationTab({ clientId, clientName }: { clientId: string; clientName: string }) {
  const communications = useCrmStore((state) => state.communications).filter((c) => c.clientId === clientId);
  const addCommunication = useCrmStore((state) => state.addCommunication);
  const simulatedDate = useCrmStore((state) => state.simulatedDate);

  const [modalOpen, setModalOpen] = useState(false);
  const [type, setType] = useState<"call" | "email" | "whatsapp" | "meeting">("call");
  const [summary, setSummary] = useState("");
  const [details, setDetails] = useState("");
  const [outcome, setOutcome] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addCommunication({
      id: `comm_${Date.now()}`,
      clientId,
      clientName,
      type,
      date: simulatedDate,
      summary,
      details,
      outcome,
      loggedByName: "Elena Rostova",
    });
    toast.success("Interaction logged to client timeline");
    setModalOpen(false);
    setSummary("");
    setDetails("");
    setOutcome("");
  };

  const ICONS = { call: Phone, email: Mail, whatsapp: MessageSquare, meeting: Users };

  return (
    <>
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Communication Chronology</CardTitle>
            <p className="text-xs text-[#7A6B5D] dark:text-[#A89B8E] mt-0.5">
              Patron discussions, design reviews, WhatsApp memos, and site meetings.
            </p>
          </div>
          <Button variant="primary" size="sm" onClick={() => setModalOpen(true)}>
            <Plus className="w-3.5 h-3.5" /> Log Interaction
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-[#E4DAC6]/60 dark:divide-[#382C23]/60 text-xs">
            {communications.map((comm) => {
              const Icon = ICONS[comm.type] || MessageSquare;
              return (
                <div key={comm.id} className="p-4 space-y-2 hover:bg-[#F7F1E5]/30 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded bg-[#1F3A2E]/10 dark:bg-[#FFFDF8]/10 text-[#1F3A2E] dark:text-[#FFFDF8]">
                        <Icon className="w-3.5 h-3.5 text-[#B8975A]" />
                      </div>
                      <span className="font-semibold text-sm text-[#2A1F1A] dark:text-[#F7F1E5]">
                        {comm.summary}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#7A6B5D]">
                      {formatDate(comm.date)} by {comm.loggedByName}
                    </span>
                  </div>
                  <p className="text-[#7A6B5D] dark:text-[#A89B8E] leading-relaxed">{comm.details}</p>
                  {comm.outcome && (
                    <div className="p-2 rounded bg-[#F7F1E5]/70 dark:bg-[#1B1511]/70 border border-[#E4DAC6]/50 text-[11px] text-[#2A1F1A] dark:text-[#F7F1E5]">
                      <strong className="text-[#B8975A]">Outcome:</strong> {comm.outcome}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Log Patron Interaction" maxWidth="md">
        <form onSubmit={handleSave} className="space-y-4">
          <Select
            label="Interaction Medium"
            value={type}
            onChange={(e) => setType(e.target.value as any)}
            options={[
              { value: "call", label: "Telephone Discussion" },
              { value: "email", label: "Formal Email" },
              { value: "whatsapp", label: "WhatsApp Memo" },
              { value: "meeting", label: "Atelier / Site Review Meeting" },
            ]}
          />
          <Input label="Summary Topic" value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="e.g. Foyer Marble Selection Review" required />
          <Input label="Detailed Notes" value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Key discussion points, specifications..." required />
          <Input label="Agreed Action / Next Step" value={outcome} onChange={(e) => setOutcome(e.target.value)} placeholder="e.g. Dispatch dry-lay photo approval" />
          <Button type="submit" variant="primary" className="w-full">Save Interaction</Button>
        </form>
      </Modal>
    </>
  );
}
