"use client";

import React from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

export interface Step1Data {
  name: string;
  type: string;
  industry: string;
  taxId: string;
  website: string;
  address: string;
  city: string;
  country: string;
}

export function Step1Business({
  data,
  onChange,
}: {
  data: Step1Data;
  onChange: (field: keyof Step1Data, val: string) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Enterprise / Atelier Legal Name"
          value={data.name}
          onChange={(e) => onChange("name", e.target.value)}
          placeholder="e.g. Al-Mansoor Luxury Living LLC"
          required
        />
        <Select
          label="Patron Classification"
          value={data.type}
          onChange={(e) => onChange("type", e.target.value)}
          options={[
            { value: "Enterprise", label: "Enterprise Conglomerate" },
            { value: "Boutique Atelier", label: "Boutique Atelier" },
            { value: "Design Agency", label: "Design Agency" },
            { value: "Hospitality", label: "Luxury Hospitality & Resort" },
            { value: "Real Estate", label: "Ultra-Prime Real Estate" },
            { value: "Retail Luxury", label: "High Luxury Retail" },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Industry / Domain"
          value={data.industry}
          onChange={(e) => onChange("industry", e.target.value)}
          placeholder="e.g. High Jewellery & Vault Design"
          required
        />
        <Input
          label="Tax Registration ID (GSTIN / UAE TRN / P.IVA)"
          value={data.taxId}
          onChange={(e) => onChange("taxId", e.target.value)}
          placeholder="e.g. 27AABCK4829F1ZS or 100234567800003"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          label="Official Website"
          value={data.website}
          onChange={(e) => onChange("website", e.target.value)}
          placeholder="https://..."
        />
        <Input
          label="City / Municipality"
          value={data.city}
          onChange={(e) => onChange("city", e.target.value)}
          placeholder="e.g. Dubai, Mumbai, Milan"
          required
        />
        <Select
          label="Jurisdiction / Country"
          value={data.country}
          onChange={(e) => onChange("country", e.target.value)}
          options={[
            { value: "India", label: "India" },
            { value: "UAE", label: "United Arab Emirates" },
            { value: "Italy", label: "Italy" },
            { value: "USA", label: "United States" },
            { value: "UK", label: "United Kingdom" },
          ]}
        />
      </div>

      <Input
        label="Registered Street Address"
        value={data.address}
        onChange={(e) => onChange("address", e.target.value)}
        placeholder="e.g. Level 48, Al Sa'ada Tower, DIFC"
      />
    </div>
  );
}
