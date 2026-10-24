"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCrmStore } from "@/store/useCrmStore";
import { invoiceService } from "@/services/invoiceService";
import { InvoiceLineItem, Invoice } from "@/types";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { InvoicePaperPreview } from "./InvoicePaperPreview";
import { InvoiceLineItemsEditor } from "./InvoiceLineItemsEditor";
import { Save } from "lucide-react";
import { toast } from "sonner";

export function InvoiceBuilderForm() {
  const router = useRouter();
  const clients = useCrmStore((state) => state.clients);
  const companySettings = useCrmStore((state) => state.companySettings);
  const simulatedDate = useCrmStore((state) => state.simulatedDate);

  const [clientId, setClientId] = useState(clients[0]?.id || "");
  const [currency, setCurrency] = useState<any>("INR");
  const [taxMode, setTaxMode] = useState<any>("GST");
  const [issueDate, setIssueDate] = useState(simulatedDate);
  const [dueDate, setDueDate] = useState("2026-11-25");
  const [items, setItems] = useState<InvoiceLineItem[]>([
    { id: "1", description: "Atelier Architectural Layout & Materiality Curation", quantity: 1, rate: 2500000, discountPercent: 0, taxPercent: 18, amount: 2500000 },
  ]);

  const selectedClient = clients.find((c) => c.id === clientId);
  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
  const taxRate = taxMode === "VAT_5" ? 0.05 : 0.18;
  const taxAmount = Math.round(subtotal * taxRate);
  const totalAmount = subtotal + taxAmount;
  const invoiceNumber = `${companySettings.invoicePrefix}${companySettings.nextInvoiceNumber}`;

  const currentInvoiceDraft: Partial<Invoice> = {
    invoiceNumber, clientId, issueDate, dueDate, currency, taxMode,
    clientName: selectedClient?.name || "Patron",
    clientAddress: selectedClient?.address || "Address",
    clientTaxId: selectedClient?.taxId || "TAX-ID",
    items, subtotal, taxAmount, totalAmount, balanceDue: totalAmount, status: "draft",
    bankName: companySettings.bankName, bankIban: companySettings.bankIban, bankSwift: companySettings.bankSwift,
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        id: String(Date.now()),
        description: "Bespoke Millwork / Production Item",
        quantity: 1,
        rate: 500000,
        discountPercent: 0,
        taxPercent: taxMode === "VAT_5" ? 5 : 18,
        amount: 500000,
      },
    ]);
  };

  const updateItem = (id: string, field: keyof InvoiceLineItem, val: any) => {
    setItems(
      items.map((item) => {
        if (item.id !== id) return item;
        const updated = { ...item, [field]: val };
        updated.amount = updated.quantity * updated.rate;
        return updated;
      })
    );
  };

  const removeItem = (id: string) => {
    if (items.length <= 1) return;
    setItems(items.filter((i) => i.id !== id));
  };

  const handleCreate = async () => {
    const created = await invoiceService.createInvoice({
      ...currentInvoiceDraft as any,
      amountPaid: 0,
      totalDiscount: 0,
      bankAccount: companySettings.bankAccount,
    });
    toast.success(`Invoice ${created.invoiceNumber} sealed and saved!`);
    router.push(`/invoices/${created.id}`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-4 bg-[#FFFDF8] dark:bg-[#241D17] border border-[#E4DAC6] dark:border-[#382C23] p-6 rounded-2xl shadow-sm text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#E4DAC6]/60">
          <span className="font-serif text-lg font-semibold text-[#1F3A2E] dark:text-[#FFFDF8]">Invoice Specifications</span>
          <span className="font-mono text-xs text-[#B8975A] font-semibold">{invoiceNumber}</span>
        </div>

        <Select
          label="Select Patron Account"
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          options={clients.map((c) => ({ value: c.id, label: `${c.name} (${c.city}, ${c.country})` }))}
        />

        <div className="grid grid-cols-2 gap-3">
          <Select
            label="Currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value as any)}
            options={[{ value: "INR", label: "INR (₹)" }, { value: "AED", label: "AED" }, { value: "EUR", label: "EUR (€)" }, { value: "USD", label: "USD ($)" }]}
          />
          <Select
            label="Tax Schedule"
            value={taxMode}
            onChange={(e) => setTaxMode(e.target.value as any)}
            options={[{ value: "GST", label: "Indian GST (18%)" }, { value: "VAT_5", label: "UAE VAT (5%)" }]}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input label="Issue Date" type="date" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} />
          <Input label="Maturity Date" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </div>

        <InvoiceLineItemsEditor
          items={items}
          addItem={addItem}
          updateItem={updateItem}
          removeItem={removeItem}
        />

        <Button variant="gold" className="w-full py-2.5 mt-4" onClick={handleCreate}>
          <Save className="w-4 h-4" /> Seal & Generate Invoice
        </Button>
      </div>

      <div>
        <div className="text-[11px] font-semibold uppercase tracking-wider text-[#7A6B5D] mb-2">Live Paper Typeset Preview</div>
        <InvoicePaperPreview invoice={currentInvoiceDraft} />
      </div>
    </div>
  );
}
