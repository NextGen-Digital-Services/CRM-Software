"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Kanban,
  FileCheck2,
  FileText,
  CreditCard,
  TrendingUp,
  Workflow,
  CheckSquare,
  Calendar,
  MessageSquare,
  BarChart3,
  BookOpen,
  Receipt,
  ShieldCheck,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Clients", href: "/clients", icon: Users },
  { label: "Sales Pipeline", href: "/pipeline", icon: Kanban },
  { label: "Requirements", href: "/requirements", icon: FileCheck2 },
  { label: "Invoices", href: "/invoices", icon: FileText },
  { label: "Payments", href: "/payments", icon: CreditCard },
  { label: "Receivables", href: "/receivables", icon: TrendingUp },
  { label: "Automation", href: "/automation", icon: Workflow },
  { label: "Tasks", href: "/tasks", icon: CheckSquare },
  { label: "Calendar", href: "/calendar", icon: Calendar },
  { label: "Communications", href: "/communications", icon: MessageSquare },
  { label: "Reports", href: "/reports", icon: BarChart3 },
  { label: "Catalog", href: "/catalog", icon: BookOpen },
  { label: "Expenses", href: "/expenses", icon: Receipt },
  { label: "Team & Roles", href: "/team", icon: ShieldCheck },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 bg-[#1F3A2E] text-[#FFFDF8] border-r border-[#2C5242] shrink-0 h-screen sticky top-0 overflow-y-auto">
      {/* Monogram / Header */}
      <div className="p-5 border-b border-[#2C5242] flex items-center justify-between">
        <div>
          <div className="font-serif text-2xl tracking-wider font-semibold text-[#FFFDF8]">
            BELLEZZA
          </div>
          <div className="text-[10px] uppercase tracking-widest text-[#B8975A] font-medium">
            Private Client Guild
          </div>
        </div>
        <span className="text-xs px-2 py-0.5 rounded border border-[#B8975A]/50 text-[#B8975A] font-serif">
          CRM
        </span>
      </div>

      {/* Nav list */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150 group relative",
                isActive
                  ? "bg-[#2C5242] text-[#FFFDF8] font-medium"
                  : "text-[#FFFDF8]/75 hover:bg-[#2C5242]/50 hover:text-[#FFFDF8]"
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4 shrink-0 transition-colors",
                  isActive ? "text-[#B8975A]" : "text-[#FFFDF8]/60 group-hover:text-[#B8975A]"
                )}
              />
              <span className="truncate">{item.label}</span>
              {isActive && (
                <span className="absolute right-2 w-1.5 h-1.5 rounded-full bg-[#B8975A]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer with Latin Monogram */}
      <div className="p-4 border-t border-[#2C5242] text-center">
        <div className="text-[11px] font-serif tracking-widest text-[#B8975A]">
          EST. MMXXVI
        </div>
        <div className="text-[9px] uppercase tracking-wider text-[#FFFDF8]/50 mt-0.5">
          Milano · Nariman Point · DIFC
        </div>
      </div>
    </aside>
  );
}
