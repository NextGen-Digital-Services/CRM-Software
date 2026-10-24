"use client";

import React from "react";
import { Step1Data } from "./Step1Business";
import { ContactPerson, Commercials } from "@/types";
import { formatCurrency } from "@/lib/utils";

export function Step4Review({
  business,
  contacts,
  commercials,
  notes,
  setNotes,
}: {
  business: Step1Data;
  contacts: ContactPerson[];
  commercials: Commercials;
  notes: string;
  setNotes: (val: string) => void;
}) {
  return (
    <div className="space-y-4 text-xs">
      <div className="p-4 rounded-xl border border-[#E4DAC6] dark:border-[#382C23] bg-[#F7F1E5]/40 dark:bg-[#1B1511]/40 space-y-3">
        <h4 className="font-serif text-sm font-semibold text-[#1F3A2E] dark:text-[#FFFDF8]">
          Review Patron Dossier
        </h4>

        <div className="grid grid-cols-2 gap-2 border-b border-[#E4DAC6]/60 dark:border-[#382C23]/60 pb-2">
          <div><span className="text-[#7A6B5D]">Legal Name:</span> <strong className="text-[#2A1F1A] dark:text-[#F7F1E5]">{business.name || "—"}</strong></div>
          <div><span className="text-[#7A6B5D]">Classification:</span> <strong className="text-[#2A1F1A] dark:text-[#F7F1E5]">{business.type}</strong></div>
          <div><span className="text-[#7A6B5D]">Industry:</span> {business.industry || "—"}</div>
          <div><span className="text-[#7A6B5D]">Tax ID:</span> <code className="font-mono text-[#B8975A]">{business.taxId || "—"}</code></div>
          <div><span className="text-[#7A6B5D]">Territory:</span> {business.city}, {business.country}</div>
          <div><span className="text-[#7A6B5D]">Website:</span> {business.website || "—"}</div>
        </div>

        <div className="border-b border-[#E4DAC6]/60 dark:border-[#382C23]/60 pb-2">
          <div className="font-semibold text-[#7A6B5D] mb-1">Contacts ({contacts.length}):</div>
          {contacts.map((c, i) => (
            <div key={i} className="text-[11px] text-[#2A1F1A] dark:text-[#F7F1E5]">
              • {c.name} ({c.role}) — {c.email} | {c.phone} {c.isPrimary && "★ Primary"}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div><span className="text-[#7A6B5D]">Currency:</span> {commercials.currency}</div>
          <div><span className="text-[#7A6B5D]">Terms:</span> {commercials.paymentTerms.toUpperCase()}</div>
          <div><span className="text-[#7A6B5D]">Credit Limit:</span> {formatCurrency(commercials.creditLimit, commercials.currency)}</div>
          <div><span className="text-[#7A6B5D]">Manager:</span> {commercials.assignedManagerName || "Unassigned"}</div>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs font-medium text-[#7A6B5D] dark:text-[#A89B8E] tracking-wide uppercase">
          Patron Notes & Architectural Curation Brief
        </label>
        <textarea
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Special requirements, stone preferences, privacy guidelines..."
          className="w-full p-3 bg-[#FFFDF8] border border-[#E4DAC6] rounded-lg text-sm text-[#2A1F1A] dark:bg-[#1B1511] dark:border-[#382C23] dark:text-[#F7F1E5] focus:outline-none focus:border-[#B8975A]"
        />
      </div>
    </div>
  );
}
