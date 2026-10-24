"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useCrmStore } from "@/store/useCrmStore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PortalPayModal } from "@/components/features/portal/PortalPayModal";
import { PortalQuestionnaireSection } from "@/components/features/portal/PortalQuestionnaireSection";
import { formatCurrency, formatDate } from "@/lib/utils";
import { ShieldCheck, CreditCard, Check, Clock, FileCheck } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "sonner";

export default function ClientPortalPage() {
  const params = useParams();
  const token = params?.token as string;
  const clients = useCrmStore((state) => state.clients);
  const client = clients.find((c) => c.id === token) || clients[0];

  const invoices = useCrmStore((state) => state.invoices).filter((i) => i.clientId === client?.id);
  const projects = useCrmStore((state) => state.projects).filter((p) => p.clientId === client?.id);
  const updateRequirement = useCrmStore((state) => state.updateRequirement);

  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

  const handleApproveReq = (reqId: string, title: string) => {
    updateRequirement(reqId, { status: "approved" });
    toast.success(`Approved specification: "${title}"`, {
      description: "Atelier notified to commence procurement & fabrication.",
    });
  };

  if (!client) {
    return <div className="p-12 text-center text-xs">Invalid portal access token.</div>;
  }

  return (
    <div className="min-h-screen bg-[#F7F1E5] dark:bg-[#1B1511] text-[#2A1F1A] dark:text-[#F7F1E5] p-4 sm:p-8 max-w-5xl mx-auto space-y-8">
      <Toaster position="top-right" richColors />

      {/* Portal Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E4DAC6] dark:border-[#382C23]">
        <div>
          <div className="font-serif text-2xl font-semibold tracking-wider text-[#1F3A2E] dark:text-[#FFFDF8]">
            BELLEZZA
          </div>
          <div className="text-[10px] uppercase tracking-widest text-[#B8975A] font-semibold">
            Private Patron Portal
          </div>
          <h1 className="font-serif text-xl sm:text-2xl font-semibold mt-2">
            Benvenuto, {client.name}
          </h1>
        </div>

        <div className="flex items-center gap-2 p-2 rounded-lg bg-[#FFFDF8] dark:bg-[#241D17] border border-[#E4DAC6] text-xs">
          <ShieldCheck className="w-4 h-4 text-[#5E7A3A]" />
          <span>Encrypted Client Channel · TLS 1.3</span>
        </div>
      </div>

      {/* Invoices Section with Pay Now (Demo) */}
      <Card>
        <CardHeader>
          <CardTitle>Invoices & Commercial Statements</CardTitle>
          <span className="text-xs text-[#7A6B5D]">Direct Settlement Gateway</span>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-[#E4DAC6]/60 dark:divide-[#382C23]/60 text-xs">
            {invoices.map((inv) => (
              <div key={inv.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm font-serif">{inv.invoiceNumber}</span>
                    <Badge status={inv.status} />
                  </div>
                  <div className="text-[#7A6B5D] text-[11px] mt-0.5">
                    Due Date: {formatDate(inv.dueDate)} · Total: {formatCurrency(inv.totalAmount, inv.currency)}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-[#7A6B5D] text-[10px] block">Balance Outstanding</span>
                    <span className="font-serif font-semibold text-sm text-[#B5532F]">
                      {formatCurrency(inv.balanceDue, inv.currency)}
                    </span>
                  </div>
                  {inv.balanceDue > 0 && (
                    <Button variant="gold" size="sm" onClick={() => setSelectedInvoice(inv)}>
                      <CreditCard className="w-3.5 h-3.5" /> Pay Now (Demo)
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Commission & Requirement Sign-offs */}
      {projects.map((proj) => (
        <Card key={proj.id}>
          <CardHeader>
            <div>
              <CardTitle>Commission: {proj.name}</CardTitle>
              <span className="text-xs text-[#7A6B5D]">Review drawings & sign off milestones</span>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-[#E4DAC6]/60 dark:divide-[#382C23]/60 text-xs">
              {proj.requirements.map((req) => (
                <div key={req.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">{req.title}</span>
                      <Badge status={req.status} />
                    </div>
                    <p className="text-xs text-[#7A6B5D]">{req.description}</p>
                  </div>
                  {req.status !== "approved" && req.status !== "completed" && (
                    <Button variant="primary" size="sm" onClick={() => handleApproveReq(req.id, req.title)}>
                      <Check className="w-3.5 h-3.5" /> Approve Spec
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Form Questionnaire */}
      <PortalQuestionnaireSection clientId={client.id} clientName={client.name} />

      {selectedInvoice && (
        <PortalPayModal
          isOpen={!!selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
          invoice={selectedInvoice}
        />
      )}
    </div>
  );
}
