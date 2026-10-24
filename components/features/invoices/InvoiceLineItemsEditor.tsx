"use client";

import React from "react";
import { InvoiceLineItem } from "@/types";
import { Button } from "@/components/ui/Button";
import { Plus, Trash2 } from "lucide-react";

export function InvoiceLineItemsEditor({
  items,
  addItem,
  updateItem,
  removeItem,
}: {
  items: InvoiceLineItem[];
  addItem: () => void;
  updateItem: (id: string, field: keyof InvoiceLineItem, val: any) => void;
  removeItem: (id: string) => void;
}) {
  return (
    <div className="space-y-2 pt-2 border-t border-[#E4DAC6]/60 dark:border-[#382C23]/60">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-[#B8975A] uppercase tracking-wider text-[10px]">
          Line Items ({items.length})
        </span>
        <Button type="button" variant="secondary" size="sm" onClick={addItem}>
          <Plus className="w-3.5 h-3.5" /> Add Item
        </Button>
      </div>

      <div className="space-y-2 max-h-56 overflow-y-auto">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-2.5 rounded-lg border border-[#E4DAC6] dark:border-[#382C23] space-y-1.5 bg-[#FFFDF8] dark:bg-[#1B1511]"
          >
            <div className="flex items-center justify-between">
              <input
                type="text"
                value={item.description}
                onChange={(e) => updateItem(item.id, "description", e.target.value)}
                className="w-full bg-transparent border-b border-[#E4DAC6] focus:outline-none focus:border-[#B8975A] text-xs font-medium"
              />
              {items.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="text-[#B5532F] p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div>
                Qty:{" "}
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => updateItem(item.id, "quantity", Number(e.target.value))}
                  className="w-16 border border-[#E4DAC6] rounded px-1.5 py-0.5 bg-transparent"
                />
              </div>
              <div>
                Rate:{" "}
                <input
                  type="number"
                  value={item.rate}
                  onChange={(e) => updateItem(item.id, "rate", Number(e.target.value))}
                  className="w-24 border border-[#E4DAC6] rounded px-1.5 py-0.5 bg-transparent"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
