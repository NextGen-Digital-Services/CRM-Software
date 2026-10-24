"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { RequirementBoard } from "@/components/features/requirements/RequirementBoard";
import { NewRequirementModal } from "@/components/features/requirements/NewRequirementModal";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FileQuestion } from "lucide-react";

export default function RequirementsPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#2A1F1A] dark:text-[#F7F1E5] gold-hairline">
              Bespoke Requirements & Specifications
            </h1>
            <p className="text-xs sm:text-sm text-[#7A6B5D] dark:text-[#A89B8E] mt-2">
              Cross-project architectural milestones, sample approvals, and fabrication sign-offs.
            </p>
          </div>
          <Link href="/templates/questionnaires">
            <Button variant="secondary" size="sm">
              <FileQuestion className="w-3.5 h-3.5" /> Questionnaire Builder
            </Button>
          </Link>
        </div>

        <RequirementBoard onAddRequirement={() => setModalOpen(true)} />
        <NewRequirementModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </div>
    </AppShell>
  );
}
