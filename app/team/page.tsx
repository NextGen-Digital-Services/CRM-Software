"use client";

import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { useCrmStore } from "@/store/useCrmStore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { RoleSwitcher } from "@/components/ui/RoleSwitcher";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Shield, Briefcase, Mail, Phone, Users } from "lucide-react";

export default function TeamPage() {
  const teamMembers = useCrmStore((state) => state.teamMembers);
  const currentRole = useCrmStore((state) => state.currentRole);

  const ROLE_DESCRIPTIONS = {
    admin: "Unrestricted access across financial vaults, dossier deletion, pricing overrides, and system settings.",
    account_manager: "Client relationship management, requirements curation, communication logging, and quotation drafting.",
    accountant: "Invoicing generation, payment reconciliation, VAT/GST filing, receivables aging, and financial ledger audit.",
    viewer: "Read-only access to client roster, project milestones, and public metrics without edit privileges.",
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#2A1F1A] dark:text-[#F7F1E5] gold-hairline">
              Atelier Partners & RBAC Roles
            </h1>
            <p className="text-xs sm:text-sm text-[#7A6B5D] dark:text-[#A89B8E] mt-2">
              Managing partners, client fellows, and financial controllers with enforced role permissions.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <RoleSwitcher />
          </div>
        </div>

        {/* Current Active Role Privileges */}
        <div className="p-4 rounded-xl border border-[#B8975A] bg-[#B8975A]/10 text-xs flex items-start gap-3">
          <Shield className="w-5 h-5 text-[#B8975A] shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-sm text-[#1F3A2E] dark:text-[#FFFDF8] block">
              Active Simulation Role: {currentRole.replace("_", " ").toUpperCase()}
            </span>
            <span className="text-[#7A6B5D] dark:text-[#A89B8E] mt-0.5 block leading-relaxed">
              {ROLE_DESCRIPTIONS[currentRole]}
            </span>
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <Card key={member.id} hoverLift className="p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border border-[#E4DAC6] shrink-0">
                    <ImageWithFallback src={member.avatarUrl} alt={member.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-[#2A1F1A] dark:text-[#F7F1E5]">
                      {member.name}
                    </h3>
                    <div className="text-xs text-[#B8975A] font-medium">{member.title}</div>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#1F3A2E]/10 dark:bg-[#FFFDF8]/10 text-[#1F3A2E] dark:text-[#FFFDF8] font-semibold">
                      {member.role.replace("_", " ")}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 py-3 border-t border-b border-[#E4DAC6]/60 dark:border-[#382C23]/60 text-xs">
                  <div className="flex items-center gap-2 text-[#7A6B5D] dark:text-[#A89B8E]">
                    <Mail className="w-3.5 h-3.5 text-[#B8975A]" /> {member.email}
                  </div>
                  <div className="flex items-center gap-2 text-[#7A6B5D] dark:text-[#A89B8E]">
                    <Phone className="w-3.5 h-3.5 text-[#B8975A]" /> {member.phone}
                  </div>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-between text-xs">
                <span className="text-[#7A6B5D]">Active Workload:</span>
                <span className="font-semibold text-[#2A1F1A] dark:text-[#F7F1E5]">
                  {member.activeClientsCount} Clients · {member.activeProjectsCount} Commissions
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
