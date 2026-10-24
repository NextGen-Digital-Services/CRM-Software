"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Atelier error caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#F7F1E5] dark:bg-[#1B1511] flex items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-4">
        <div className="font-serif text-5xl font-semibold text-[#B5532F]">Notice</div>
        <div className="text-xs uppercase tracking-widest text-[#7A6B5D] font-medium">
          Errore di Sistema — Temporary Interruption
        </div>
        <h1 className="font-serif text-2xl font-semibold text-[#2A1F1A] dark:text-[#F7F1E5]">
          A Temporary Exception Occurred
        </h1>
        <p className="text-xs text-[#7A6B5D] dark:text-[#A89B8E] leading-relaxed">
          The atelier workspace caught an unexpected runtime fault. Client data persisted safely in your browser storage.
        </p>
        <div className="pt-4 flex justify-center gap-3">
          <Button variant="primary" onClick={() => reset()}>
            Reload Workspace
          </Button>
        </div>
      </div>
    </div>
  );
}
