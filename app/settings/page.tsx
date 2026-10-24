"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { useCrmStore } from "@/store/useCrmStore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Settings, RotateCcw, Download, Upload, Moon, Sun, Save, ShieldAlert } from "lucide-react";
import { toast } from "sonner";

export default function SettingsPage() {
  const settings = useCrmStore((state) => state.companySettings);
  const updateSettings = useCrmStore((state) => state.updateCompanySettings);
  const resetDemoData = useCrmStore((state) => state.resetDemoData);
  const isDarkMode = useCrmStore((state) => state.isDarkMode);
  const toggleDarkMode = useCrmStore((state) => state.toggleDarkMode);

  const [form, setForm] = useState(settings);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(form);
    toast.success("Atelier company settings updated successfully!");
  };

  const handleResetData = () => {
    if (confirm("Reset all CRM data back to pristine Italian luxury demo state?")) {
      resetDemoData();
      toast.success("Demo data reset to factory initial state.");
    }
  };

  const handleExportJson = () => {
    const state = useCrmStore.getState();
    const jsonStr = JSON.stringify(state, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `bellezza_crm_backup_${new Date().toISOString().split("T")[0]}.json`);
    link.click();
    toast.success("Encrypted JSON database snapshot exported.");
  };

  return (
    <AppShell>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#2A1F1A] dark:text-[#F7F1E5] gold-hairline">
              Atelier Configuration & Settings
            </h1>
            <p className="text-xs sm:text-sm text-[#7A6B5D] dark:text-[#A89B8E] mt-2">
              Legal entity details, wire settlement coordinates, dark theme, and demo reset.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={handleExportJson}>
              <Download className="w-3.5 h-3.5" /> Export JSON
            </Button>
            <Button variant="danger" size="sm" onClick={handleResetData}>
              <RotateCcw className="w-3.5 h-3.5" /> Reset Demo Data
            </Button>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Atelier Corporate Identity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Company / Guild Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                <Input label="Tagline / Motto" value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input label="Tax Registration ID" value={form.taxId} onChange={(e) => setForm({ ...form, taxId: e.target.value })} required />
                <Input label="Concierge Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                <Input label="Direct Line" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
              </div>

              <Input label="Physical Atelier Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} required />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Wire Settlement Repository (Bank Details)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Settlement Bank Name" value={form.bankName} onChange={(e) => setForm({ ...form, bankName: e.target.value })} required />
                <Input label="Account Number" value={form.bankAccount} onChange={(e) => setForm({ ...form, bankAccount: e.target.value })} required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="IBAN Number" value={form.bankIban} onChange={(e) => setForm({ ...form, bankIban: e.target.value })} required />
                <Input label="SWIFT / BIC Code" value={form.bankSwift} onChange={(e) => setForm({ ...form, bankSwift: e.target.value })} required />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" variant="primary">
              <Save className="w-3.5 h-3.5" /> Save Configuration
            </Button>
          </div>
        </form>
      </div>
    </AppShell>
  );
}
