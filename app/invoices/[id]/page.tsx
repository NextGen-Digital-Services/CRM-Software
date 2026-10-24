"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { useCrmStore } from "@/store/useCrmStore";
import { InvoicePaperPreview } from "@/components/features/invoices/InvoicePaperPreview";
import { RecordPaymentModal } from "@/components/features/invoices/RecordPaymentModal";
import { generateInvoicePdf } from "@/components/features/invoices/PdfGenerator";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Download, Printer, CreditCard, Send, Copy } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function InvoiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const invoice = useCrmStore((state) => state.invoices).find((i) => i.id === id);
  const addInvoice = useCrmStore((state) => state.addInvoice);
  const companySettings = useCrmStore((state) => state.companySettings);
  const simulatedDate = useCrmStore((state) => state.simulatedDate);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  if (!invoice) {
    return (
      <AppShell>
        <div className="py-20 text-center space-y-4">
          <h2 className="font-serif text-2xl font-semibold">Fattura non trovata</h2>
          <p className="text-xs text-[#7A6B5D]">The requested invoice could not be located in the registry.</p>
          <Link href="/invoices"><Button variant="primary">Return to Invoices</Button></Link>
        </div>
      </AppShell>
    );
  }

  const handleDownloadPdf = () => {
    generateInvoicePdf(invoice);
    toast.success(`Generated official PDF for ${invoice.invoiceNumber}`);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSendSimulatedEmail = () => {
    toast.success(`Simulated invoice dispatch to ${invoice.clientName}`, {
      description: "Email queued with PDF attachment and portal link.",
    });
  };

  const handleDuplicate = () => {
    const newNumber = `${companySettings.invoicePrefix}${companySettings.nextInvoiceNumber}`;
    const duplicated = {
      ...invoice,
      id: `inv_${Date.now()}`,
      invoiceNumber: newNumber,
      issueDate: simulatedDate,
      status: "draft" as const,
      amountPaid: 0,
      balanceDue: invoice.totalAmount,
    };
    addInvoice(duplicated);
    toast.success(`Duplicated as new invoice: ${newNumber}`);
    router.push(`/invoices/${duplicated.id}`);
  };

  return (
    <AppShell>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E4DAC6] dark:border-[#382C23]">
          <div className="flex items-center gap-3">
            <Link href="/invoices" className="p-2 rounded-lg border border-[#E4DAC6] hover:bg-[#FFFDF8] dark:border-[#382C23] text-[#7A6B5D]">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="font-serif text-2xl font-semibold text-[#2A1F1A] dark:text-[#F7F1E5]">
                {invoice.invoiceNumber}
              </div>
              <div className="text-xs text-[#7A6B5D]">Patron: {invoice.clientName}</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button variant="secondary" size="sm" onClick={handleDownloadPdf}>
              <Download className="w-3.5 h-3.5" /> PDF
            </Button>
            <Button variant="secondary" size="sm" onClick={handlePrint}>
              <Printer className="w-3.5 h-3.5" /> Print
            </Button>
            <Button variant="secondary" size="sm" onClick={handleSendSimulatedEmail}>
              <Send className="w-3.5 h-3.5" /> Send
            </Button>
            <Button variant="secondary" size="sm" onClick={handleDuplicate}>
              <Copy className="w-3.5 h-3.5" /> Duplicate
            </Button>
            {invoice.balanceDue > 0 && (
              <Button variant="gold" size="sm" onClick={() => setPaymentModalOpen(true)}>
                <CreditCard className="w-3.5 h-3.5" /> Record Payment
              </Button>
            )}
          </div>
        </div>

        {/* Paper Typeset Invoice */}
        <InvoicePaperPreview invoice={invoice} />

        <RecordPaymentModal
          isOpen={paymentModalOpen}
          onClose={() => setPaymentModalOpen(false)}
          invoice={invoice}
        />
      </div>
    </AppShell>
  );
}
