"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Invoice } from "@/types";
import { paymentService } from "@/services/paymentService";
import { useCrmStore } from "@/store/useCrmStore";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";

export function RecordPaymentModal({
  isOpen,
  onClose,
  invoice,
}: {
  isOpen: boolean;
  onClose: () => void;
  invoice: Invoice;
}) {
  const simulatedDate = useCrmStore((state) => state.simulatedDate);
  const [amount, setAmount] = useState(invoice.balanceDue);
  const [paymentDate, setPaymentDate] = useState(simulatedDate);
  const [paymentMethod, setPaymentMethod] = useState<any>("bank_transfer");
  const [referenceNumber, setReferenceNumber] = useState(() => `REF-${Date.now().toString().slice(-6)}`);
  const [notes, setNotes] = useState("Remittance clearance");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) {
      toast.error("Please enter a valid payment amount.");
      return;
    }

    setLoading(true);
    try {
      await paymentService.recordPayment({
        invoiceId: invoice.id,
        invoiceNumber: invoice.invoiceNumber,
        clientId: invoice.clientId,
        clientName: invoice.clientName,
        amount: Number(amount),
        currency: invoice.currency,
        paymentDate,
        paymentMethod,
        referenceNumber,
        notes,
      });
      toast.success(`Payment of ${invoice.currency} ${Number(amount).toLocaleString()} recorded!`, {
        description: `Balance updated for ${invoice.invoiceNumber}.`,
      });
      onClose();
    } catch {
      toast.error("Failed to record payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Record Patron Remittance" maxWidth="md">
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="p-3 rounded-lg bg-[#F7F1E5]/60 dark:bg-[#1B1511]/60 border border-[#E4DAC6] space-y-1">
          <div className="flex justify-between">
            <span className="text-[#7A6B5D]">Invoice Number:</span>
            <strong className="text-[#2A1F1A] dark:text-[#F7F1E5] font-mono">{invoice.invoiceNumber}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-[#7A6B5D]">Outstanding Balance:</span>
            <strong className="text-[#B5532F] font-serif text-sm">
              {formatCurrency(invoice.balanceDue, invoice.currency)}
            </strong>
          </div>
        </div>

        <Input
          label={`Remittance Amount (${invoice.currency})`}
          type="number"
          max={invoice.balanceDue}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          required
        />

        <div className="grid grid-cols-2 gap-3">
          <Select
            label="Payment Method"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value as any)}
            options={[
              { value: "bank_transfer", label: "Bank Transfer / SWIFT / RTGS" },
              { value: "upi", label: "Corporate UPI (India)" },
              { value: "card", label: "Credit Card (Amex / Centurion)" },
              { value: "cheque", label: "Bankers Cheque" },
              { value: "razorpay", label: "Razorpay / Stripe Demo" },
              { value: "cash", label: "Cash / Bullion Vault" },
            ]}
          />
          <Input label="Value Date" type="date" value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} required />
        </div>

        <Input label="Transaction Reference / UTR Number" value={referenceNumber} onChange={(e) => setReferenceNumber(e.target.value)} required />
        <Input label="Internal Ledger Memo" value={notes} onChange={(e) => setNotes(e.target.value)} />

        <Button type="submit" variant="primary" className="w-full" disabled={loading}>
          {loading ? "Recording..." : "Record Payment & Seal Receipt"}
        </Button>
      </form>
    </Modal>
  );
}
