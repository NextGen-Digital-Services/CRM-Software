"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Deal } from "./DealsKanban";
import { toast } from "sonner";

export function NewDealModal({
  isOpen,
  onClose,
  onAdd,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (deal: Deal) => void;
}) {
  const [title, setTitle] = useState("");
  const [clientName, setClientName] = useState("");
  const [value, setValue] = useState(5000000);
  const [probability, setProbability] = useState(60);
  const [stage, setStage] = useState<Deal["stage"]>("discovery");
  const [source, setSource] = useState("Milan Design Week");
  const [expectedClose, setExpectedClose] = useState("2026-12-15");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !clientName) return;
    onAdd({
      id: `deal_${Date.now()}`,
      title,
      clientName,
      value: Number(value),
      probability: Number(probability),
      stage,
      expectedClose,
      source,
      currency: "INR",
    });
    toast.success("New deal registered to pipeline!");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Log New Pipeline Deal" maxWidth="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Deal Commission Title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Penthouse Bespoke Interior Curation" required />
        <Input label="Prospective Client / Patron" value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="e.g. Al-Mansoor Living" required />

        <div className="grid grid-cols-2 gap-3">
          <Input label="Contract Value (INR ₹)" type="number" value={value} onChange={(e) => setValue(Number(e.target.value))} required />
          <Input label="Win Probability (%)" type="number" min={0} max={100} value={probability} onChange={(e) => setProbability(Number(e.target.value))} required />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Select
            label="Initial Stage"
            value={stage}
            onChange={(e) => setStage(e.target.value as Deal["stage"])}
            options={[
              { value: "discovery", label: "Discovery & Brief" },
              { value: "proposal", label: "Design Proposal" },
              { value: "negotiation", label: "Commercial Terms" },
              { value: "closing", label: "Closing Escrow" },
            ]}
          />
          <Input label="Target Close Date" type="date" value={expectedClose} onChange={(e) => setExpectedClose(e.target.value)} required />
        </div>

        <Input label="Lead Source" value={source} onChange={(e) => setSource(e.target.value)} placeholder="e.g. Referral, Art Basel, DIFC Event" />
        <Button type="submit" variant="primary" className="w-full">Create Pipeline Deal</Button>
      </form>
    </Modal>
  );
}
