"use client";

import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { InvoiceBuilderForm } from "@/components/features/invoices/InvoiceBuilderForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewInvoicePage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Link
            href="/invoices"
            className="p-2 rounded-lg border border-[#E4DAC6] hover:bg-[#FFFDF8] dark:border-[#382C23] text-[#7A6B5D]"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#2A1F1A] dark:text-[#F7F1E5]">
              Generate Commercial Statement
            </h1>
            <p className="text-xs text-[#7A6B5D] dark:text-[#A89B8E]">
              Assemble line item specifications, tax regimes, and remittance bank coordinates.
            </p>
          </div>
        </div>

        <InvoiceBuilderForm />
      </div>
    </AppShell>
  );
}
