"use client";

import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { ClientWizard } from "@/components/features/clients/ClientWizard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewClientPage() {
  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Link
            href="/clients"
            className="p-2 rounded-lg border border-[#E4DAC6] hover:bg-[#FFFDF8] dark:border-[#382C23] dark:hover:bg-[#241D17] text-[#7A6B5D] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#2A1F1A] dark:text-[#F7F1E5]">
              Onboard New Patron
            </h1>
            <p className="text-xs text-[#7A6B5D] dark:text-[#A89B8E]">
              Initialize corporate dossier, key patrons, and commercial terms.
            </p>
          </div>
        </div>

        <ClientWizard />
      </div>
    </AppShell>
  );
}
