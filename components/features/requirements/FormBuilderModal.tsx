"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { useCrmStore } from "@/store/useCrmStore";
import { QuestionnaireField, QuestionnaireTemplate } from "@/types";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

export function FormBuilderModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const addTemplate = useCrmStore((state) => state.addQuestionnaireTemplate);
  const simulatedDate = useCrmStore((state) => state.simulatedDate);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Architecture & Interior");
  const [fields, setFields] = useState<QuestionnaireField[]>([
    { id: "f1", label: "Carpet Area & Site Dimensions (Sq. Ft.)", type: "text", required: true },
    { id: "f2", label: "Desired Architectural Style", type: "dropdown", required: true, options: ["Milanese Modern", "Tuscan Rustic", "Venetian Classical"] },
  ]);

  const addField = () => {
    setFields([
      ...fields,
      {
        id: `f_${Date.now()}`,
        label: "New Specification Field",
        type: "text",
        required: false,
      },
    ]);
  };

  const removeField = (id: string) => {
    setFields(fields.filter((f) => f.id !== id));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    const newTmpl: QuestionnaireTemplate = {
      id: `tmpl_${Date.now()}`,
      title,
      description,
      category,
      fields,
      createdAt: simulatedDate,
    };
    addTemplate(newTmpl);
    toast.success(`Questionnaire template "${title}" saved to library.`);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Questionnaire Template" maxWidth="lg">
      <form onSubmit={handleSave} className="space-y-4">
        <Input label="Template Name" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Subterranean Wine Vault Brief" required />
        <Input label="Scope Description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Intended for private estate commissions..." required />

        <div className="space-y-2 pt-2 border-t border-[#E4DAC6]/60 dark:border-[#382C23]/60">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#B8975A]">
              Questionnaire Fields ({fields.length})
            </span>
            <Button type="button" variant="secondary" size="sm" onClick={addField}>
              <Plus className="w-3.5 h-3.5" /> Add Field
            </Button>
          </div>

          <div className="space-y-2 max-h-56 overflow-y-auto">
            {fields.map((f, i) => (
              <div key={f.id} className="p-2.5 rounded-lg border border-[#E4DAC6] dark:border-[#382C23] flex items-center gap-2 text-xs">
                <span className="text-[#7A6B5D] w-5 font-mono">#{i + 1}</span>
                <input
                  type="text"
                  value={f.label}
                  onChange={(e) =>
                    setFields(fields.map((item) => (item.id === f.id ? { ...item, label: e.target.value } : item)))
                  }
                  className="flex-1 bg-transparent border-b border-[#E4DAC6] focus:outline-none focus:border-[#B8975A] text-xs"
                />
                <select
                  value={f.type}
                  onChange={(e) =>
                    setFields(fields.map((item) => (item.id === f.id ? { ...item, type: e.target.value as any } : item)))
                  }
                  className="bg-transparent border border-[#E4DAC6] rounded px-1.5 py-0.5 text-xs"
                >
                  <option value="text">Text</option>
                  <option value="textarea">Paragraph</option>
                  <option value="dropdown">Dropdown</option>
                  <option value="date">Date</option>
                  <option value="file">File Upload</option>
                </select>
                <button type="button" onClick={() => removeField(f.id)} className="text-[#B5532F] p-1">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <Button type="submit" variant="primary" className="w-full">Save Template to Library</Button>
      </form>
    </Modal>
  );
}
