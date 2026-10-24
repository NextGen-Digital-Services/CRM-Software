"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  CreditCard,
  MoreHorizontal,
  Kanban,
  FileCheck2,
  TrendingUp,
  Workflow,
  CheckSquare,
  Calendar,
  BarChart3,
  Settings,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const PRIMARY_NAV = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Clients", href: "/clients", icon: Users },
  { label: "Invoices", href: "/invoices", icon: FileText },
  { label: "Payments", href: "/payments", icon: CreditCard },
];

const MORE_NAV = [
  { label: "Sales Pipeline", href: "/pipeline", icon: Kanban },
  { label: "Requirements", href: "/requirements", icon: FileCheck2 },
  { label: "Receivables Aging", href: "/receivables", icon: TrendingUp },
  { label: "Automations", href: "/automation", icon: Workflow },
  { label: "Tasks", href: "/tasks", icon: CheckSquare },
  { label: "Calendar", href: "/calendar", icon: Calendar },
  { label: "Reports & Analytics", href: "/reports", icon: BarChart3 },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function BottomNav() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#1F3A2E] border-t border-[#2C5242] text-[#FFFDF8] px-2 py-1 flex items-center justify-around safe-bottom shadow-lg">
        {PRIMARY_NAV.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 text-[10px] transition-colors",
                isActive ? "text-[#B8975A] font-semibold" : "text-[#FFFDF8]/70 hover:text-[#FFFDF8]"
              )}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
        <button
          onClick={() => setMoreOpen(true)}
          className="flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 text-[10px] text-[#FFFDF8]/70 hover:text-[#B8975A]"
        >
          <MoreHorizontal className="w-5 h-5 mb-0.5" />
          <span>More</span>
        </button>
      </div>

      {/* More Sheet */}
      {moreOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col justify-end">
          <div
            className="fixed inset-0 bg-[#2A1F1A]/60 backdrop-blur-sm"
            onClick={() => setMoreOpen(false)}
          />
          <div className="relative z-10 bg-[#FFFDF8] border-t border-[#E4DAC6] rounded-t-2xl p-5 max-h-[80vh] overflow-y-auto dark:bg-[#241D17] dark:border-[#382C23]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E4DAC6]/60 dark:border-[#382C23]/60 mb-4">
              <span className="font-serif text-lg font-semibold text-[#2A1F1A] dark:text-[#F7F1E5]">
                Guild Navigation
              </span>
              <button onClick={() => setMoreOpen(false)} className="p-1 rounded-lg text-[#7A6B5D]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {MORE_NAV.map((m) => {
                const Icon = m.icon;
                return (
                  <Link
                    key={m.href}
                    href={m.href}
                    onClick={() => setMoreOpen(false)}
                    className="flex items-center gap-2.5 p-3 rounded-lg border border-[#E4DAC6] dark:border-[#382C23] text-sm text-[#2A1F1A] dark:text-[#F7F1E5] hover:border-[#B8975A] active:bg-[#F7F1E5]"
                  >
                    <Icon className="w-4 h-4 text-[#B8975A]" />
                    <span className="text-xs font-medium">{m.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
