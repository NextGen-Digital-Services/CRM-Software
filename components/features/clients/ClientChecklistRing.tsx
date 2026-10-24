import React from "react";
import { OnboardingChecklist } from "@/types";

export function ClientChecklistRing({ checklist }: { checklist?: OnboardingChecklist }) {
  if (!checklist) return null;

  const items = [
    checklist.kycDocsVerified,
    checklist.agreementSigned,
    checklist.advanceReceived,
    checklist.kickoffCallCompleted,
  ];

  const completed = items.filter(Boolean).length;
  const total = items.length;
  const pct = Math.round((completed / total) * 100);

  const radius = 14;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="flex items-center gap-2" title={`Onboarding: ${completed}/${total} steps completed`}>
      <div className="relative w-8 h-8 flex items-center justify-center">
        <svg width={32} height={32} className="transform -rotate-90">
          <circle
            cx={16}
            cy={16}
            r={radius}
            stroke="#E4DAC6"
            strokeWidth={3}
            fill="transparent"
            className="opacity-40 dark:stroke-[#382C23]"
          />
          <circle
            cx={16}
            cy={16}
            r={radius}
            stroke={pct === 100 ? "#5E7A3A" : "#B8975A"}
            strokeWidth={3}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute text-[10px] font-semibold tabular-nums text-[#2A1F1A] dark:text-[#F7F1E5]">
          {completed}/{total}
        </span>
      </div>
      <span className="text-xs text-[#7A6B5D] dark:text-[#A89B8E] hidden sm:inline">
        {pct === 100 ? "Ready" : "Onboarding"}
      </span>
    </div>
  );
}
