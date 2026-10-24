"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { useCrmStore } from "@/store/useCrmStore";
import { Sparkles, Shield, Clock, FileText, CheckCircle2 } from "lucide-react";

const TOUR_STEPS = [
  {
    icon: Sparkles,
    title: "Benvenuto a Bellezza CRM",
    desc: "A boutique client relationship and financial management atelier crafted with an Italian luxury aesthetic. Generous whitespace, refined stone borders, and solid flat tones.",
  },
  {
    icon: Shield,
    title: "Role-Based Access Control (RBAC)",
    desc: "Switch between Admin, Account Manager, Accountant, and Viewer from the top navigation to test real permissions and view restrictions live.",
  },
  {
    icon: Clock,
    title: "Interactive Time Machine",
    desc: "Use the floating widget in the lower right to fast-forward simulated time (+1d, +7d, +30d). Watch due dates mature, invoices turn overdue, and automated email reminders fire into the Outbox.",
  },
  {
    icon: FileText,
    title: "Bespoke Invoicing & PDFs",
    desc: "Generate multi-currency GST/VAT invoices with automatic line item math, live paper preview, and direct PDF generation using jsPDF autotables.",
  },
];

export function TourModal() {
  const isOpen = useCrmStore((state) => state.tourOpen);
  const setIsOpen = useCrmStore((state) => state.setTourOpen);
  const [currentStep, setCurrentStep] = useState(0);

  const step = TOUR_STEPS[currentStep];
  const Icon = step.icon;

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsOpen(false);
      setCurrentStep(0);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Product Tour"
      subtitle={`Step ${currentStep + 1} of ${TOUR_STEPS.length}`}
      maxWidth="md"
    >
      <div className="py-4 text-center space-y-4">
        <div className="w-14 h-14 mx-auto rounded-full bg-[#1F3A2E] text-[#B8975A] flex items-center justify-center">
          <Icon className="w-7 h-7" />
        </div>
        <h3 className="font-serif text-xl font-semibold text-[#2A1F1A] dark:text-[#F7F1E5]">
          {step.title}
        </h3>
        <p className="text-sm text-[#7A6B5D] dark:text-[#A89B8E] leading-relaxed">
          {step.desc}
        </p>

        <div className="flex items-center justify-between pt-6 border-t border-[#E4DAC6]/60 dark:border-[#382C23]/60">
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
            Skip Tour
          </Button>
          <div className="flex gap-1.5">
            {TOUR_STEPS.map((_, idx) => (
              <span
                key={idx}
                className={`w-2 h-2 rounded-full transition-colors ${
                  idx === currentStep ? "bg-[#B8975A]" : "bg-[#E4DAC6] dark:bg-[#382C23]"
                }`}
              />
            ))}
          </div>
          <Button variant="primary" size="sm" onClick={handleNext}>
            {currentStep === TOUR_STEPS.length - 1 ? "Start Exploring" : "Next"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
