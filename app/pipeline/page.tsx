"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PipelineHeader } from "@/components/features/pipeline/PipelineHeader";
import { DealsKanban, Deal } from "@/components/features/pipeline/DealsKanban";
import { NewDealModal } from "@/components/features/pipeline/NewDealModal";

const INITIAL_DEALS: Deal[] = [
  { id: "d1", title: "Burj Crown Sky Villa Interior Masterplan", clientName: "Elysian Private Estates", value: 12500000, probability: 85, stage: "negotiation", expectedClose: "2026-11-20", source: "DIFC Private Dinner", currency: "INR" },
  { id: "d2", title: "Lake Como Villa Balbianello Restoration", clientName: "Palladio Stone Works", value: 8200000, probability: 70, stage: "proposal", expectedClose: "2026-12-05", source: "Tuscan Guild Referral", currency: "INR" },
  { id: "d3", title: "Emirates Hills Mediterranean Palace", clientName: "Al-Mansoor Luxury Living", value: 18000000, probability: 90, stage: "closing", expectedClose: "2026-11-10", source: "Direct Patron", currency: "INR" },
  { id: "d4", title: "Bespoke Horology Boutique UB City", clientName: "D'Souza Fine Gemology", value: 4500000, probability: 100, stage: "won", expectedClose: "2026-10-15", source: "Bangalore Exhibition", currency: "INR" },
  { id: "d5", title: "Kashmir Saffron Flagship Flacon Launch", clientName: "Saffron Valley Botanicals", value: 3800000, probability: 50, stage: "discovery", expectedClose: "2027-01-15", source: "Direct Inbound", currency: "INR" },
  { id: "d6", title: "Venetian Chandelier Pavilion Expo", clientName: "Astraea Lighting Design", value: 6500000, probability: 60, stage: "proposal", expectedClose: "2026-12-18", source: "Milan Triennale", currency: "INR" },
];

export default function PipelinePage() {
  const [deals, setDeals] = useState<Deal[]>(INITIAL_DEALS);
  const [modalOpen, setModalOpen] = useState(false);

  const totalValue = deals.reduce((sum, d) => sum + d.value, 0);
  const weightedValue = deals.reduce((sum, d) => sum + Math.round(d.value * (d.probability / 100)), 0);

  return (
    <AppShell>
      <div className="space-y-6">
        <PipelineHeader
          totalValue={totalValue}
          weightedValue={weightedValue}
          dealsCount={deals.length}
          onNewDeal={() => setModalOpen(true)}
        />
        <DealsKanban deals={deals} setDeals={setDeals} />
        <NewDealModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onAdd={(deal) => setDeals([deal, ...deals])}
        />
      </div>
    </AppShell>
  );
}
