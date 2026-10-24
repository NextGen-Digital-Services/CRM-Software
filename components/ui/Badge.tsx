import React from "react";
import { cn } from "@/lib/utils";
import { OnboardingStatus, InvoiceStatus, RequirementStatus } from "@/types";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "gold" | "olive" | "amber" | "terracotta" | "lagoon" | "stone";
  status?: OnboardingStatus | InvoiceStatus | RequirementStatus | string;
}

export function Badge({ className, variant = "default", status, children, ...props }: BadgeProps) {
  let computedVariant = variant;
  let label = children;

  if (status) {
    switch (status) {
      case "active":
      case "paid":
      case "approved":
      case "completed":
        computedVariant = "olive";
        label = label || (status === "active" ? "Active" : status === "paid" ? "Paid" : "Completed");
        break;
      case "lead":
      case "draft":
        computedVariant = "stone";
        label = label || (status === "lead" ? "Lead" : "Draft");
        break;
      case "contacted":
      case "sent":
      case "in_review":
        computedVariant = "lagoon";
        label = label || (status === "contacted" ? "Contacted" : status === "sent" ? "Sent" : "In Review");
        break;
      case "docs_pending":
      case "under_review":
      case "viewed":
      case "pending_client":
        computedVariant = "amber";
        label = label || (status === "docs_pending" ? "Docs Pending" : status === "viewed" ? "Viewed" : "Pending");
        break;
      case "onboarded":
      case "partially_paid":
      case "received":
        computedVariant = "gold";
        label = label || (status === "onboarded" ? "Onboarded" : status === "partially_paid" ? "Partially Paid" : "Received");
        break;
      case "on_hold":
      case "churned":
      case "overdue":
      case "cancelled":
        computedVariant = "terracotta";
        label = label || (status === "overdue" ? "Overdue" : status === "on_hold" ? "On Hold" : "Cancelled");
        break;
      default:
        break;
    }
  }

  const styles = {
    default: "bg-[#FFFDF8] text-[#2A1F1A] border-[#E4DAC6] dark:bg-[#241D17] dark:text-[#F7F1E5] dark:border-[#382C23]",
    stone: "bg-[#E4DAC6]/40 text-[#7A6B5D] border-[#E4DAC6] dark:bg-[#382C23]/60 dark:text-[#A89B8E] dark:border-[#382C23]",
    gold: "bg-[#B8975A]/15 text-[#8F7034] border-[#B8975A]/40 dark:bg-[#D4B06F]/20 dark:text-[#D4B06F] dark:border-[#D4B06F]/30",
    olive: "bg-[#5E7A3A]/15 text-[#476029] border-[#5E7A3A]/30 dark:bg-[#76994B]/20 dark:text-[#8BB358] dark:border-[#76994B]/30",
    amber: "bg-[#C98A1B]/15 text-[#9A660B] border-[#C98A1B]/30 dark:bg-[#E09F2B]/20 dark:text-[#E09F2B] dark:border-[#E09F2B]/30",
    terracotta: "bg-[#B5532F]/15 text-[#B5532F] border-[#B5532F]/30 dark:bg-[#C96642]/20 dark:text-[#E27E58] dark:border-[#C96642]/30",
    lagoon: "bg-[#2F6F7A]/15 text-[#1F545D] border-[#2F6F7A]/30 dark:bg-[#3D8996]/20 dark:text-[#5EB5C4] dark:border-[#3D8996]/30",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border tracking-wide",
        styles[computedVariant],
        className
      )}
      {...props}
    >
      {label}
    </span>
  );
}
