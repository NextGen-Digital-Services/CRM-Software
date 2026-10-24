import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, type = "text", id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-medium text-[#7A6B5D] dark:text-[#A89B8E] tracking-wide uppercase"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          type={type}
          className={cn(
            "w-full h-10 px-3.5 bg-[#FFFDF8] border border-[#E4DAC6] rounded-lg text-sm text-[#2A1F1A] placeholder-[#7A6B5D]/60 dark:bg-[#1B1511] dark:border-[#382C23] dark:text-[#F7F1E5] dark:placeholder-[#A89B8E]/50 transition-colors focus:outline-none focus:border-[#B8975A] focus:ring-1 focus:ring-[#B8975A] disabled:opacity-50",
            error && "border-[#B5532F] focus:border-[#B5532F] focus:ring-[#B5532F]",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-[#B5532F] mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
