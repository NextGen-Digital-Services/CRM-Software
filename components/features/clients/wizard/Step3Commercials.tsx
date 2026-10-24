"use client";

import React from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Commercials } from "@/types";
import { useCrmStore } from "@/store/useCrmStore";

export function Step3Commercials({
  data,
  onChange,
}: {
  data: Commercials;
  onChange: (field: keyof Commercials, val: any) => void;
}) {
  const teamMembers = useCrmStore((state) => state.teamMembers);
  const managers = teamMembers.filter((m) => m.role === "admin" || m.role === "account_manager");

  const handleManagerChange = (managerId: string) => {
    const selected = teamMembers.find((m) => m.id === managerId);
    onChange("assignedManagerId", managerId);
    onChange("assignedManagerName", selected?.name || "");
  };

  const handleTagsChange = (tagString: string) => {
    const tags = tagString.split(",").map((t) => t.trim()).filter(Boolean);
    onChange("tags", tags);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Billing Currency"
          value={data.currency}
          onChange={(e) => onChange("currency", e.target.value)}
          options={[
            { value: "INR", label: "INR (₹) - Indian Rupee" },
            { value: "AED", label: "AED - United Arab Emirates Dirham" },
            { value: "EUR", label: "EUR (€) - Euro" },
            { value: "USD", label: "USD ($) - US Dollar" },
          ]}
        />
        <Select
          label="Standard Payment Terms"
          value={data.paymentTerms}
          onChange={(e) => onChange("paymentTerms", e.target.value)}
          options={[
            { value: "immediate", label: "Due Upon Receipt (Immediate)" },
            { value: "net15", label: "Net 15 Days" },
            { value: "net30", label: "Net 30 Days" },
            { value: "net60", label: "Net 60 Days" },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Authorized Credit Limit"
          type="number"
          value={data.creditLimit}
          onChange={(e) => onChange("creditLimit", Number(e.target.value))}
          placeholder="e.g. 500000"
        />
        <Select
          label="Assigned Account Manager"
          value={data.assignedManagerId}
          onChange={(e) => handleManagerChange(e.target.value)}
          options={managers.map((m) => ({
            value: m.id,
            label: `${m.name} (${m.title})`,
          }))}
        />
      </div>

      <Input
        label="Tags & Classifications (Comma-separated)"
        value={data.tags.join(", ")}
        onChange={(e) => handleTagsChange(e.target.value)}
        placeholder="e.g. VIP Patron, Marble & Stone, Retainer, Carrara"
      />
    </div>
  );
}
