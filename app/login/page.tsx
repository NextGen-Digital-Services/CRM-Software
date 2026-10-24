"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { useCrmStore } from "@/store/useCrmStore";
import { ShieldCheck, Sparkles, KeyRound } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("alessandro@bellezza.agency");
  const [password, setPassword] = useState("••••••••••••");
  const setCurrentRole = useCrmStore((state) => state.setCurrentRole);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentRole("admin");
    toast.success("Benvenuto a Bellezza CRM", {
      description: "Signed in as Alessandro Conti (Admin & Creative Director).",
    });
    router.push("/dashboard");
  };

  const handleQuickDemo = (role: "admin" | "account_manager" | "accountant") => {
    setCurrentRole(role);
    if (role === "admin") setEmail("alessandro@bellezza.agency");
    if (role === "account_manager") setEmail("elena.r@bellezza.agency");
    if (role === "accountant") setEmail("giulia.m@bellezza.agency");
    toast.success(`Demo Access Granted: ${role.toUpperCase()}`);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#F7F1E5] dark:bg-[#1B1511]">
      {/* Left Form */}
      <div className="w-full md:w-1/2 p-8 sm:p-14 lg:p-20 flex flex-col justify-between">
        <div>
          <div className="font-serif text-3xl font-semibold tracking-wider text-[#1F3A2E] dark:text-[#FFFDF8]">
            BELLEZZA
          </div>
          <div className="text-xs uppercase tracking-widest text-[#B8975A] font-medium mt-1">
            Private Client Guild & Financial Atelier
          </div>
        </div>

        <div className="max-w-md w-full my-10">
          <h1 className="font-serif text-3xl font-semibold text-[#2A1F1A] dark:text-[#F7F1E5] mb-2">
            Sign In to the Atelier
          </h1>
          <p className="text-sm text-[#7A6B5D] dark:text-[#A89B8E] mb-8">
            Access client commissions, architectural requirements, and financial vaults.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Patron / Partner Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Master Key / Passphrase"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" variant="primary" className="w-full py-2.5 mt-2">
              Enter Private Atelier
            </Button>
          </form>

          {/* Quick Demo Autofill */}
          <div className="mt-8 pt-6 border-t border-[#E4DAC6] dark:border-[#382C23]">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#7A6B5D] dark:text-[#A89B8E] mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#B8975A]" />
              Quick Demo Auto-Fill
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo("admin")}
                className="p-2 text-xs font-medium border border-[#E4DAC6] rounded-lg bg-[#FFFDF8] hover:border-[#B8975A] dark:bg-[#241D17] dark:border-[#382C23] text-[#2A1F1A] dark:text-[#F7F1E5] transition-colors"
              >
                Admin
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo("account_manager")}
                className="p-2 text-xs font-medium border border-[#E4DAC6] rounded-lg bg-[#FFFDF8] hover:border-[#B8975A] dark:bg-[#241D17] dark:border-[#382C23] text-[#2A1F1A] dark:text-[#F7F1E5] transition-colors"
              >
                Manager
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo("accountant")}
                className="p-2 text-xs font-medium border border-[#E4DAC6] rounded-lg bg-[#FFFDF8] hover:border-[#B8975A] dark:bg-[#241D17] dark:border-[#382C23] text-[#2A1F1A] dark:text-[#F7F1E5] transition-colors"
              >
                Finance
              </button>
            </div>
          </div>
        </div>

        <div className="text-xs text-[#7A6B5D] dark:text-[#A89B8E] flex items-center justify-between">
          <span>Est. MMXXVI · Milano</span>
          <span>Security Protocol TLS 1.3</span>
        </div>
      </div>

      {/* Right Architecture Imagery */}
      <div className="hidden md:block w-1/2 relative bg-[#1F3A2E] overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80"
          alt="Milan Classical Architecture"
          fill
          className="object-cover opacity-80 mix-blend-luminosity"
          priority
        />
        <div className="absolute inset-0 bg-[#1F3A2E]/60" />
        <div className="absolute inset-0 p-16 flex flex-col justify-end text-[#FFFDF8]">
          <div className="w-12 h-1 bg-[#B8975A] mb-6" />
          <blockquote className="font-serif text-2xl font-normal leading-relaxed max-w-lg mb-4">
            &ldquo;Perfection is not attained when there is nothing more to add, but when there is nothing left to take away.&rdquo;
          </blockquote>
          <div className="text-xs uppercase tracking-widest text-[#B8975A]">
            Bellezza Private Client Atelier · Via Montenapoleone 8
          </div>
        </div>
      </div>
    </div>
  );
}
