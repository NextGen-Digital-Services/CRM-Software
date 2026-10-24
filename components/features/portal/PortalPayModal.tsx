"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Invoice } from "@/types";
import { paymentService } from "@/services/paymentService";
import { formatCurrency } from "@/lib/utils";
import { ShieldCheck, CreditCard, Lock } from "lucide-react";
import { toast } from "sonner";

export function PortalPayModal({
  isOpen,
  onClose,
  invoice,
}: {
  isOpen: boolean;
  onClose: () => void;
  invoice: Invoice;
}) {
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState("4242 •••• •••• 4242");
  const [expiry, setExpiry] = useState("12/28");
  const [cvv, setCvv] = useState("888");

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await paymentService.recordPayment({
        invoiceId: invoice.id,
        invoiceNumber: invoice.invoiceNumber,
        clientId: invoice.clientId,
        clientName: invoice.clientName,
        amount: invoice.balanceDue,
        currency: invoice.currency,
        paymentDate: new Date().toISOString().split("T")[0],
        paymentMethod: "razorpay",
        referenceNumber: `GATEWAY-DEMO-${Date.now().toString().slice(-6)}`,
        notes: "Settled via Patron Online Portal (Demo Checkout)",
      });

      toast.success("Payment Authorized & Cleared!", {
        description: `Official receipt stamped for ${invoice.invoiceNumber}.`,
      });
      onClose();
    } catch {
      toast.error("Gateway communication failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Pay Now (Demo Simulated Checkout)" maxWidth="md">
      <form onSubmit={handlePay} className="space-y-4 text-xs">
        <div className="p-3.5 rounded-xl border border-[#B8975A]/60 bg-[#B8975A]/10 space-y-1">
          <div className="flex items-center justify-between text-[#1F3A2E] dark:text-[#FFFDF8]">
            <span className="font-semibold">Invoice: {invoice.invoiceNumber}</span>
            <span className="font-serif font-semibold text-sm">
              {formatCurrency(invoice.balanceDue, invoice.currency)}
            </span>
          </div>
          <span className="text-[10px] text-[#7A6B5D] block">
            Simulated payment gateway modal ready for Stripe / Razorpay plug-in.
          </span>
        </div>

        <Input label="Cardholder Name" defaultValue={invoice.clientName} required />
        <Input label="Encrypted Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required />

        <div className="grid grid-cols-2 gap-3">
          <Input label="Expiry (MM/YY)" value={expiry} onChange={(e) => setExpiry(e.target.value)} required />
          <Input label="Security CVV" value={cvv} onChange={(e) => setCvv(e.target.value)} required />
        </div>

        <div className="flex items-center gap-1.5 text-[10px] text-[#7A6B5D] justify-center pt-1">
          <Lock className="w-3.5 h-3.5 text-[#5E7A3A]" />
          <span>256-Bit Financial Encryption Sandbox · Simulated Remittance</span>
        </div>

        <Button type="submit" variant="primary" className="w-full py-2.5" disabled={loading}>
          {loading ? "Authorizing Transfer..." : `Authorize Payment (${formatCurrency(invoice.balanceDue, invoice.currency)})`}
        </Button>
      </form>
    </Modal>
  );
}
