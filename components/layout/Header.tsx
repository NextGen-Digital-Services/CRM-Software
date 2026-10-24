"use client";

import React from "react";
import { Search, Moon, Sun, HelpCircle, Bell } from "lucide-react";
import { useCrmStore } from "@/store/useCrmStore";
import { RoleSwitcher } from "@/components/ui/RoleSwitcher";
import { NotificationCenter } from "./NotificationCenter";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

export function Header() {
  const isDarkMode = useCrmStore((state) => state.isDarkMode);
  const toggleDarkMode = useCrmStore((state) => state.toggleDarkMode);
  const setCommandPaletteOpen = useCrmStore((state) => state.setCommandPaletteOpen);
  const setTourOpen = useCrmStore((state) => state.setTourOpen);
  const currentRole = useCrmStore((state) => state.currentRole);

  const roleNameMap = {
    admin: "Alessandro Conti",
    account_manager: "Elena Rostova",
    accountant: "Giulia Marchetti",
    viewer: "Marcus Vance",
  };

  return (
    <header className="sticky top-0 z-30 bg-[#FFFDF8]/90 backdrop-blur-md border-b border-[#E4DAC6] px-4 sm:px-6 py-2.5 flex items-center justify-between dark:bg-[#241D17]/90 dark:border-[#382C23]">
      {/* Left: Greeting */}
      <div className="flex items-center gap-3">
        <div>
          <div className="font-serif text-base sm:text-lg font-semibold text-[#2A1F1A] dark:text-[#F7F1E5]">
            Buongiorno, {roleNameMap[currentRole]}
          </div>
          <div className="text-[11px] text-[#7A6B5D] dark:text-[#A89B8E]">
            Bellezza Private Client Atelier
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Global Search Button */}
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#E4DAC6] bg-[#F7F1E5]/60 hover:bg-[#F7F1E5] text-xs text-[#7A6B5D] dark:border-[#382C23] dark:bg-[#1B1511]/60 dark:text-[#A89B8E] transition-colors cursor-pointer"
        >
          <Search className="w-3.5 h-3.5 text-[#B8975A]" />
          <span className="hidden sm:inline">Search clients, invoices...</span>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-[#FFFDF8] dark:bg-[#241D17] border border-[#E4DAC6] dark:border-[#382C23] rounded text-[#7A6B5D]">
            ⌘K
          </kbd>
        </button>

        {/* Role Switcher */}
        <RoleSwitcher />

        {/* Notifications */}
        <NotificationCenter />

        {/* Dark Mode */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg border border-[#E4DAC6] text-[#7A6B5D] hover:text-[#2A1F1A] hover:bg-[#F7F1E5] dark:border-[#382C23] dark:text-[#A89B8E] dark:hover:text-[#F7F1E5] transition-colors cursor-pointer"
          title="Toggle Dark Mode"
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-[#B8975A]" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Tour / Help */}
        <button
          onClick={() => setTourOpen(true)}
          className="p-2 rounded-lg border border-[#E4DAC6] text-[#7A6B5D] hover:text-[#2A1F1A] hover:bg-[#F7F1E5] dark:border-[#382C23] dark:text-[#A89B8E] dark:hover:text-[#F7F1E5] transition-colors cursor-pointer"
          title="Start Product Tour"
        >
          <HelpCircle className="w-4 h-4 text-[#B8975A]" />
        </button>
      </div>
    </header>
  );
}
