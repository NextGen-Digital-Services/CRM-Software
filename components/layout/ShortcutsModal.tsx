"use client";

import React, { useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { useCrmStore } from "@/store/useCrmStore";
import { Keyboard } from "lucide-react";

export function ShortcutsModal() {
  const isOpen = useCrmStore((state) => state.shortcutsModalOpen);
  const setIsOpen = useCrmStore((state) => state.setShortcutsModalOpen);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "?" && !["input", "textarea"].includes((e.target as HTMLElement)?.tagName?.toLowerCase())) {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, setIsOpen]);

  const SHORTCUTS = [
    { key: "⌘K / Ctrl+K", label: "Open Global Command Palette" },
    { key: "?", label: "Show Keyboard Shortcuts Help" },
    { key: "Esc", label: "Close Active Modal / Sheet" },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Keyboard Shortcuts"
      subtitle="Atelier efficiency navigation"
      maxWidth="md"
    >
      <div className="py-2 space-y-3">
        {SHORTCUTS.map((s) => (
          <div
            key={s.key}
            className="flex items-center justify-between p-3 rounded-lg border border-[#E4DAC6] dark:border-[#382C23] bg-[#F7F1E5]/40 dark:bg-[#1B1511]/40"
          >
            <span className="text-sm text-[#2A1F1A] dark:text-[#F7F1E5] font-medium">{s.label}</span>
            <kbd className="px-2 py-1 text-xs font-mono font-semibold bg-[#FFFDF8] dark:bg-[#241D17] border border-[#E4DAC6] dark:border-[#382C23] rounded text-[#B8975A]">
              {s.key}
            </kbd>
          </div>
        ))}
      </div>
    </Modal>
  );
}
