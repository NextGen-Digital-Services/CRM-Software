"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "gold";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", disabled, children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-colors duration-150 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8975A] disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] select-none text-sm cursor-pointer";

    const variantStyles = {
      primary:
        "bg-[#1F3A2E] text-[#FFFDF8] hover:bg-[#2C5242] border border-[#1F3A2E] shadow-sm",
      secondary:
        "bg-[#FFFDF8] text-[#2A1F1A] border border-[#E4DAC6] hover:bg-[#F7F1E5] dark:bg-[#241D17] dark:text-[#F7F1E5] dark:border-[#382C23] dark:hover:bg-[#2F251E]",
      outline:
        "bg-transparent text-[#2A1F1A] border border-[#E4DAC6] hover:bg-[#FFFDF8] dark:text-[#F7F1E5] dark:border-[#382C23]",
      ghost:
        "bg-transparent text-[#7A6B5D] hover:text-[#2A1F1A] hover:bg-[#E4DAC6]/30 dark:text-[#A89B8E] dark:hover:text-[#F7F1E5]",
      danger:
        "bg-[#B5532F] text-[#FFFDF8] hover:bg-[#9B4323] border border-[#B5532F]",
      gold:
        "bg-[#B8975A] text-[#1F3A2E] font-semibold hover:bg-[#A68549] border border-[#B8975A]",
    };

    const sizeStyles = {
      sm: "h-8 px-3 text-xs gap-1.5",
      md: "h-9 px-4 text-sm gap-2",
      lg: "h-11 px-6 text-base gap-2.5",
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
