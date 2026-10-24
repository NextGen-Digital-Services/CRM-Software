import React from "react";
import { cn } from "@/lib/utils";

export interface HealthScoreRingProps {
  score: number; // 0 - 100
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
}

export function HealthScoreRing({
  score,
  size = 44,
  strokeWidth = 4,
  showLabel = true,
}: HealthScoreRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const color =
    score >= 85
      ? "#5E7A3A" // olive
      : score >= 70
      ? "#C98A1B" // amber
      : "#B5532F"; // terracotta

  return (
    <div className="flex items-center gap-2">
      <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E4DAC6"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="opacity-40 dark:stroke-[#382C23]"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
          />
        </svg>
        <span className="absolute font-serif text-xs font-semibold tabular-nums text-[#2A1F1A] dark:text-[#F7F1E5]">
          {score}
        </span>
      </div>
      {showLabel && (
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-wider text-[#7A6B5D] dark:text-[#A89B8E] leading-none">
            Health
          </span>
          <span className="text-xs font-medium" style={{ color }}>
            {score >= 85 ? "Excellent" : score >= 70 ? "Good" : "At Risk"}
          </span>
        </div>
      )}
    </div>
  );
}
