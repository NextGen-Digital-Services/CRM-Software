"use client";

import React from "react";
import { Shield, ChevronDown } from "lucide-react";
import { useCrmStore } from "@/store/useCrmStore";
import { UserRole } from "@/types";
import { toast } from "sonner";

export function RoleSwitcher() {
  const currentRole = useCrmStore((state) => state.currentRole);
  const setCurrentRole = useCrmStore((state) => state.setCurrentRole);

  const roleLabels: Record<UserRole, string> = {
    admin: "Admin (Full Access)",
    account_manager: "Account Manager",
    accountant: "Accountant (Finance)",
    viewer: "Viewer (Read Only)",
  };

  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    toast.info(`Switched role to: ${roleLabels[role]}`, {
      description: "Permissions and available actions updated dynamically.",
    });
  };

  return (
    <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#E4DAC6]/30 dark:bg-[#382C23]/40 border border-[#E4DAC6] dark:border-[#382C23]">
      <Shield className="w-4 h-4 text-[#B8975A]" />
      <div className="flex flex-col">
        <span className="text-[9px] uppercase tracking-wider text-[#7A6B5D] dark:text-[#A89B8E] leading-none">
          Demo Role
        </span>
        <select
          value={currentRole}
          onChange={(e) => handleRoleChange(e.target.value as UserRole)}
          className="text-xs font-semibold bg-transparent text-[#2A1F1A] dark:text-[#F7F1E5] focus:outline-none cursor-pointer pr-1"
        >
          <option value="admin" className="dark:bg-[#241D17]">Admin</option>
          <option value="account_manager" className="dark:bg-[#241D17]">Account Manager</option>
          <option value="accountant" className="dark:bg-[#241D17]">Accountant</option>
          <option value="viewer" className="dark:bg-[#241D17]">Viewer</option>
        </select>
      </div>
    </div>
  );
}
