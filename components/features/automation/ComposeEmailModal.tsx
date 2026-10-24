"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { useCrmStore } from "@/store/useCrmStore";
import { OutboxEmail } from "@/types";
import { toast } from "sonner";

export function ComposeEmailModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const clients = useCrmStore((state) => state.clients);
  const addOutboxEmail = useCrmStore((state) => state.addOutboxEmail);
  const simulatedDate = useCrmStore((state) => state.simulatedDate);

  const [clientId, setClientId] = useState(clients[0]?.id || "");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const selectedClient = clients.find((c) => c.id === clientId);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !body) return;

    const newEmail: OutboxEmail = {
      id: `out_${Date.now()}`,
      clientId,
      clientName: selectedClient?.name || "Patron",
      recipientEmail: selectedClient?.contacts[0]?.email || "patron@client.com",
      subject,
      body,
      status: "sent",
      sentAt: simulatedDate,
      isSimulated: true,
    };

    addOutboxEmail(newEmail);
    toast.success(`Dispatched email to ${newEmail.recipientEmail}`, {
      description: "Recorded in simulated Outbox ledger.",
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Compose Bespoke Patron Dispatch" maxWidth="md">
      <form onSubmit={handleSend} className="space-y-4 text-xs">
        <Select
          label="Select Patron Account"
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          options={clients.map((c) => ({ value: c.id, label: `${c.name} (${c.contacts[0]?.email || "No email"})` }))}
        />
        <Input label="Subject Line" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. Architectural Curation Update: Foyer Balustrade" required />

        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-[#7A6B5D] uppercase tracking-wide">
            Dispatch Body
          </label>
          <textarea
            rows={6}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Gentile Patron, ..."
            className="w-full p-3 bg-[#FFFDF8] dark:bg-[#1B1511] border border-[#E4DAC6] dark:border-[#382C23] rounded-lg text-xs text-[#2A1F1A] dark:text-[#F7F1E5] focus:outline-none focus:border-[#B8975A]"
            required
          />
        </div>

        <Button type="submit" variant="primary" className="w-full">
          Dispatch via Atelier Outbox
        </Button>
      </form>
    </Modal>
  );
}
