import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverLift?: boolean;
}

export function Card({ className, hoverLift = false, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-[#FFFDF8] border border-[#E4DAC6] rounded-xl shadow-[0_2px_4px_rgba(42,31,26,0.03)] dark:bg-[#241D17] dark:border-[#382C23] dark:shadow-[0_2px_4px_rgba(0,0,0,0.2)] transition-all duration-200",
        hoverLift && "hover:-translate-y-0.5 hover:shadow-[0_6px_12px_rgba(42,31,26,0.06)] hover:border-[#B8975A]/60 dark:hover:shadow-[0_6px_12px_rgba(0,0,0,0.3)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-5 border-b border-[#E4DAC6]/60 dark:border-[#382C23]/60 flex items-center justify-between", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("font-serif text-lg font-semibold text-[#2A1F1A] dark:text-[#F7F1E5] tracking-tight", className)} {...props}>
      {children}
    </h3>
  );
}

export function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-5", className)} {...props}>
      {children}
    </div>
  );
}
