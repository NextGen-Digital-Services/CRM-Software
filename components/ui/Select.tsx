import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options?: SelectOption[];
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, options = [], error, id, children, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-xs font-medium text-[#7A6B5D] dark:text-[#A89B8E] tracking-wide uppercase"
          >
            {label}
          </label>
        )}
        <select
          id={selectId}
          ref={ref}
          className={cn(
            "w-full h-10 px-3.5 bg-[#FFFDF8] border border-[#E4DAC6] rounded-lg text-sm text-[#2A1F1A] dark:bg-[#1B1511] dark:border-[#382C23] dark:text-[#F7F1E5] transition-colors focus:outline-none focus:border-[#B8975A] focus:ring-1 focus:ring-[#B8975A] disabled:opacity-50 cursor-pointer",
            error && "border-[#B5532F]",
            className
          )}
          {...props}
        >
          {children
            ? children
            : options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
        </select>
        {error && <p className="text-xs text-[#B5532F] mt-1">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";
