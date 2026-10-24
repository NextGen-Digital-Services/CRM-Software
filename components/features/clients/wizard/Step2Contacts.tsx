"use client";

import React from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ContactPerson } from "@/types";
import { Plus, Trash2, UserCheck } from "lucide-react";

export function Step2Contacts({
  contacts,
  setContacts,
}: {
  contacts: ContactPerson[];
  setContacts: React.Dispatch<React.SetStateAction<ContactPerson[]>>;
}) {
  const addContact = () => {
    const newContact: ContactPerson = {
      id: `con_${Date.now()}`,
      name: "",
      role: "",
      email: "",
      phone: "",
      whatsapp: "",
      isPrimary: contacts.length === 0,
    };
    setContacts([...contacts, newContact]);
  };

  const updateContact = (id: string, field: keyof ContactPerson, val: any) => {
    setContacts(contacts.map((c) => (c.id === id ? { ...c, [field]: val } : c)));
  };

  const removeContact = (id: string) => {
    if (contacts.length <= 1) return;
    setContacts(contacts.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-[#7A6B5D] dark:text-[#A89B8E]">
          Designate primary patrons, procurement heads, and site superintendents.
        </p>
        <Button type="button" variant="secondary" size="sm" onClick={addContact}>
          <Plus className="w-3.5 h-3.5" />
          Add Another Contact
        </Button>
      </div>

      <div className="space-y-3">
        {contacts.map((contact, index) => (
          <div
            key={contact.id}
            className="p-4 border border-[#E4DAC6] dark:border-[#382C23] rounded-xl bg-[#FFFDF8] dark:bg-[#241D17] relative space-y-3"
          >
            <div className="flex items-center justify-between border-b border-[#E4DAC6]/60 dark:border-[#382C23]/60 pb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#B8975A]">
                Contact #{index + 1} {contact.isPrimary && "(Primary)"}
              </span>
              {contacts.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeContact(contact.id)}
                  className="text-[#B5532F] hover:text-[#9B4323] p-1 text-xs flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Remove
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                label="Full Name"
                value={contact.name}
                onChange={(e) => updateContact(contact.id, "name", e.target.value)}
                placeholder="e.g. Tariq Al-Mansoor"
                required
              />
              <Input
                label="Designation / Role"
                value={contact.role}
                onChange={(e) => updateContact(contact.id, "role", e.target.value)}
                placeholder="e.g. Chairman & Principal Patron"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Input
                label="Email Address"
                type="email"
                value={contact.email}
                onChange={(e) => updateContact(contact.id, "email", e.target.value)}
                placeholder="tariq@client.com"
                required
              />
              <Input
                label="Telephone"
                value={contact.phone}
                onChange={(e) => updateContact(contact.id, "phone", e.target.value)}
                placeholder="+971 4 398 1200"
                required
              />
              <Input
                label="Direct WhatsApp"
                value={contact.whatsapp || ""}
                onChange={(e) => updateContact(contact.id, "whatsapp", e.target.value)}
                placeholder="+971 50 112 3456"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
