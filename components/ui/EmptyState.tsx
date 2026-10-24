import React from "react";
import { ImageWithFallback } from "./ImageWithFallback";
import { Button } from "./Button";

export interface EmptyStateProps {
  title: string;
  italianSubtitle?: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  imageUrl?: string;
}

export function EmptyState({
  title,
  italianSubtitle = "Nessun dato ancora",
  description,
  actionLabel,
  onAction,
  imageUrl = "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center max-w-md mx-auto">
      <div className="relative w-28 h-28 mb-4 rounded-2xl overflow-hidden border border-[#E4DAC6] dark:border-[#382C23] shadow-inner">
        <ImageWithFallback
          src={imageUrl}
          alt={title}
          fill
          className="object-cover grayscale contrast-125 opacity-90"
        />
        <div className="absolute inset-0 bg-[#B8975A]/10 mix-blend-multiply" />
      </div>

      <div className="text-xs uppercase tracking-widest text-[#B8975A] font-medium mb-1">
        {italianSubtitle}
      </div>
      <h3 className="font-serif text-xl font-semibold text-[#2A1F1A] dark:text-[#F7F1E5] mb-2">
        {title}
      </h3>
      <p className="text-sm text-[#7A6B5D] dark:text-[#A89B8E] mb-6 leading-relaxed">
        {description}
      </p>

      {actionLabel && onAction && (
        <Button onClick={onAction} variant="primary">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
