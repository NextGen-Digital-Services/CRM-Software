"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Step1Business, Step1Data } from "./wizard/Step1Business";
import { Step2Contacts } from "./wizard/Step2Contacts";
import { Step3Commercials } from "./wizard/Step3Commercials";
import { Step4Review } from "./wizard/Step4Review";
import { WizardStepHeader } from "./wizard/WizardStepHeader";
import { Button } from "@/components/ui/Button";
import { clientService } from "@/services/clientService";
import { ContactPerson, Commercials } from "@/types";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function ClientWizard({ onComplete }: { onComplete?: () => void }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [business, setBusiness] = useState<Step1Data>({
    name: "",
    type: "Enterprise",
    industry: "",
    taxId: "",
    website: "",
    address: "",
    city: "Mumbai",
    country: "India",
  });

  const [contacts, setContacts] = useState<ContactPerson[]>([
    {
      id: "con_init",
      name: "",
      role: "Managing Director",
      email: "",
      phone: "",
      whatsapp: "",
      isPrimary: true,
    },
  ]);

  const [commercials, setCommercials] = useState<Commercials>({
    currency: "INR",
    paymentTerms: "net30",
    creditLimit: 1000000,
    assignedManagerId: "team_3",
    assignedManagerName: "Rohan Singhania",
    tags: ["New Patron", "Direct Atelier"],
  });

  const [notes, setNotes] = useState("");

  const handleNext = () => {
    if (step === 1 && !business.name) {
      toast.error("Please provide the legal enterprise name.");
      return;
    }
    if (step === 2 && (!contacts[0].name || !contacts[0].email)) {
      toast.error("Please provide at least one contact name and email.");
      return;
    }
    setStep(step + 1);
  };

  const handleCreate = async () => {
    setLoading(true);
    try {
      const created = await clientService.createClient({
        name: business.name,
        type: business.type as any,
        industry: business.industry,
        taxId: business.taxId,
        website: business.website,
        address: business.address,
        city: business.city,
        country: business.country as any,
        status: "lead",
        contacts,
        commercials,
        checklist: {
          kycDocsVerified: false,
          agreementSigned: false,
          advanceReceived: false,
          kickoffCallCompleted: false,
        },
        notes,
        healthScore: 85,
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      });
      toast.success(`Client ${created.name} onboarded successfully!`);
      if (onComplete) onComplete();
      else router.push(`/clients/${created.id}`);
    } catch {
      toast.error("Failed to create client.");
    } finally {
      setLoading(false);
    }
  };

  const STEPS = ["Business Details", "Key Contacts", "Commercial Terms", "Review & Dossier"];

  return (
    <div className="bg-[#FFFDF8] dark:bg-[#241D17] border border-[#E4DAC6] dark:border-[#382C23] rounded-2xl p-6 sm:p-8 shadow-sm">
      <WizardStepHeader currentStep={step} steps={STEPS} />

      {/* Step Content */}
      <div className="min-h-[320px]">
        {step === 1 && <Step1Business data={business} onChange={(k, v) => setBusiness({ ...business, [k]: v })} />}
        {step === 2 && <Step2Contacts contacts={contacts} setContacts={setContacts} />}
        {step === 3 && <Step3Commercials data={commercials} onChange={(k, v) => setCommercials({ ...commercials, [k]: v })} />}
        {step === 4 && (
          <Step4Review
            business={business}
            contacts={contacts}
            commercials={commercials}
            notes={notes}
            setNotes={setNotes}
          />
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-6 mt-6 border-t border-[#E4DAC6]/60 dark:border-[#382C23]/60">
        {step > 1 ? (
          <Button variant="secondary" onClick={() => setStep(step - 1)}>
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </Button>
        ) : <div />}

        {step < 4 ? (
          <Button variant="primary" onClick={handleNext}>
            Proceed to Step {step + 1} <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        ) : (
          <Button variant="gold" onClick={handleCreate} disabled={loading}>
            {loading ? "Sealing Dossier..." : "Create Client Dossier"}
          </Button>
        )}
      </div>
    </div>
  );
}
