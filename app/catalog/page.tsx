"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { useCrmStore } from "@/store/useCrmStore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";
import { Plus, BookOpen, Layers, Check } from "lucide-react";
import { toast } from "sonner";

export default function CatalogPage() {
  const catalogItems = useCrmStore((state) => state.catalogItems);
  const addCatalogItem = useCrmStore((state) => state.addCatalogItem);

  const handleAddNew = () => {
    addCatalogItem({
      id: `cat_${Date.now()}`,
      name: "Venetian Stucco Wall Finishing (Per Sq. Ft.)",
      description: "Artisanal hand-troweled Italian marmorino with natural beeswax seal.",
      rate: 850,
      unit: "sqft",
      defaultTaxPercent: 18,
      category: "Bespoke Production",
    });
    toast.success("New catalogue item added.");
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#2A1F1A] dark:text-[#F7F1E5] gold-hairline">
              Services & Atelier Materiality Catalog
            </h1>
            <p className="text-xs sm:text-sm text-[#7A6B5D] dark:text-[#A89B8E] mt-2">
              Standardized architectural line items, Carrara marble rates, and consultation fees for rapid quoting.
            </p>
          </div>
          <Button variant="primary" size="sm" onClick={handleAddNew}>
            <Plus className="w-3.5 h-3.5" /> Add Catalog Item
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {catalogItems.map((item) => (
            <Card key={item.id} hoverLift className="p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#B8975A]">
                    {item.category}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#E4DAC6]/40 text-[#7A6B5D]">
                    {item.defaultTaxPercent}% GST/VAT
                  </span>
                </div>
                <h3 className="font-serif text-base font-semibold text-[#2A1F1A] dark:text-[#F7F1E5] mb-1">
                  {item.name}
                </h3>
                <p className="text-xs text-[#7A6B5D] dark:text-[#A89B8E] leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E4DAC6]/60 dark:border-[#382C23]/60 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#7A6B5D] uppercase block">Benchmark Rate</span>
                  <div className="font-serif text-base font-semibold text-[#1F3A2E] dark:text-[#FFFDF8]">
                    {formatCurrency(item.rate, "INR")} <span className="text-xs font-normal text-[#7A6B5D]">/ {item.unit}</span>
                  </div>
                </div>
                <Button variant="secondary" size="sm" onClick={() => toast.success("Added item to active clipboard.")}>
                  Use in Invoice
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
