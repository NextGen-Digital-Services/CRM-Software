"use client";

import React, { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useCrmStore } from "@/store/useCrmStore";
import { Search, UserPlus, FilePlus, Users, FileText, CheckSquare, Sparkles } from "lucide-react";

export function CommandPalette() {
  const router = useRouter();
  const open = useCrmStore((state) => state.commandPaletteOpen);
  const setOpen = useCrmStore((state) => state.setCommandPaletteOpen);
  const clients = useCrmStore((state) => state.clients);
  const invoices = useCrmStore((state) => state.invoices);
  const tasks = useCrmStore((state) => state.tasks);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, setOpen]);

  if (!open) return null;

  const navigateTo = (path: string) => {
    setOpen(false);
    router.push(path);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2A1F1A]/60 backdrop-blur-sm">
      <div className="fixed inset-0" onClick={() => setOpen(false)} />
      <div className="relative z-10 w-full max-w-xl bg-[#FFFDF8] border border-[#E4DAC6] rounded-xl shadow-2xl overflow-hidden dark:bg-[#241D17] dark:border-[#382C23]">
        <Command className="w-full">
          <div className="flex items-center px-4 border-b border-[#E4DAC6]/60 dark:border-[#382C23]/60">
            <Search className="w-4 h-4 text-[#B8975A] shrink-0 mr-2.5" />
            <Command.Input
              placeholder="Search clients, invoices, tasks, or actions..."
              className="w-full py-3.5 bg-transparent text-sm text-[#2A1F1A] dark:text-[#F7F1E5] placeholder-[#7A6B5D]/60 focus:outline-none"
            />
          </div>

          <Command.List className="max-h-80 overflow-y-auto p-2 text-xs">
            <Command.Empty className="py-6 text-center text-[#7A6B5D]">
              Nessun risultato — No results found.
            </Command.Empty>

            <Command.Group heading="Quick Actions" className="px-2 py-1.5 font-semibold text-[#B8975A] uppercase tracking-wider text-[10px]">
              <Command.Item
                onSelect={() => navigateTo("/clients/new")}
                className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-[#2A1F1A] dark:text-[#F7F1E5] hover:bg-[#F7F1E5] dark:hover:bg-[#1B1511]"
              >
                <UserPlus className="w-3.5 h-3.5 text-[#5E7A3A]" />
                <span>Onboard New Client</span>
              </Command.Item>
              <Command.Item
                onSelect={() => navigateTo("/invoices/new")}
                className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-[#2A1F1A] dark:text-[#F7F1E5] hover:bg-[#F7F1E5] dark:hover:bg-[#1B1511]"
              >
                <FilePlus className="w-3.5 h-3.5 text-[#B8975A]" />
                <span>Generate New Invoice</span>
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Clients" className="px-2 py-1.5 font-semibold text-[#B8975A] uppercase tracking-wider text-[10px]">
              {clients.slice(0, 5).map((cli) => (
                <Command.Item
                  key={cli.id}
                  onSelect={() => navigateTo(`/clients/${cli.id}`)}
                  className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer text-[#2A1F1A] dark:text-[#F7F1E5] hover:bg-[#F7F1E5] dark:hover:bg-[#1B1511]"
                >
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-[#7A6B5D]" />
                    <span className="font-medium">{cli.name}</span>
                  </div>
                  <span className="text-[10px] text-[#7A6B5D]">{cli.city}, {cli.country}</span>
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group heading="Invoices" className="px-2 py-1.5 font-semibold text-[#B8975A] uppercase tracking-wider text-[10px]">
              {invoices.slice(0, 5).map((inv) => (
                <Command.Item
                  key={inv.id}
                  onSelect={() => navigateTo(`/invoices`)}
                  className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer text-[#2A1F1A] dark:text-[#F7F1E5] hover:bg-[#F7F1E5] dark:hover:bg-[#1B1511]"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-[#7A6B5D]" />
                    <span>{inv.invoiceNumber} — {inv.clientName}</span>
                  </div>
                  <span className="font-medium font-serif">{inv.currency} {inv.totalAmount.toLocaleString()}</span>
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
