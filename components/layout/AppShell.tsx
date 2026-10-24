"use client";

import React, { useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { BottomNav } from "./BottomNav";
import { TimeMachine } from "@/components/ui/TimeMachine";
import { CommandPalette } from "./CommandPalette";
import { TourModal } from "./TourModal";
import { ShortcutsModal } from "./ShortcutsModal";
import { Toaster } from "sonner";
import { useHydrated } from "@/hooks/useHydrated";
import { useAutomationRunner } from "@/hooks/useAutomationRunner";
import { useCrmStore } from "@/store/useCrmStore";

export function AppShell({ children }: { children: React.ReactNode }) {
  const hydrated = useHydrated();
  const isDarkMode = useCrmStore((state) => state.isDarkMode);
  useAutomationRunner();

  useEffect(() => {
    if (hydrated && isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [hydrated, isDarkMode]);

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-[#F7F1E5] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-2 border-[#B8975A] border-t-transparent rounded-full animate-spin mx-auto" />
          <div className="font-serif text-lg tracking-wider text-[#1F3A2E] font-semibold">
            BELLEZZA
          </div>
          <div className="text-xs uppercase tracking-widest text-[#7A6B5D]">
            Loading Atelier Workspace...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#F7F1E5] dark:bg-[#1B1511] text-[#2A1F1A] dark:text-[#F7F1E5]">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
        <Header />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Floating Time Machine Demo Control */}
      <TimeMachine />

      {/* Mobile Bottom Navigation */}
      <BottomNav />

      {/* Modals & Command Palette */}
      <CommandPalette />
      <TourModal />
      <ShortcutsModal />

      {/* Notification Toasts */}
      <Toaster
        position="top-right"
        richColors
        toastOptions={{
          className: "border border-[#E4DAC6] dark:border-[#382C23] shadow-lg rounded-xl",
        }}
      />
    </div>
  );
}
