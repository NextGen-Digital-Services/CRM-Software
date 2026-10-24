import React from "react";
import { Check } from "lucide-react";

interface WizardStepHeaderProps {
  currentStep: number;
  steps: string[];
}

export function WizardStepHeader({ currentStep, steps }: WizardStepHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E4DAC6]/60 dark:border-[#382C23]/60">
      {steps.map((s, idx) => {
        const stepNum = idx + 1;
        const isDone = currentStep > stepNum;
        const isCurrent = currentStep === stepNum;
        return (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${
                isDone
                  ? "bg-[#5E7A3A] text-white"
                  : isCurrent
                  ? "bg-[#1F3A2E] text-[#B8975A] border border-[#B8975A]"
                  : "bg-[#E4DAC6]/50 text-[#7A6B5D]"
              }`}
            >
              {isDone ? <Check className="w-3.5 h-3.5" /> : stepNum}
            </div>
            <span
              className={`text-xs hidden sm:inline ${
                isCurrent ? "font-semibold text-[#2A1F1A] dark:text-[#F7F1E5]" : "text-[#7A6B5D]"
              }`}
            >
              {s}
            </span>
          </div>
        );
      })}
    </div>
  );
}
