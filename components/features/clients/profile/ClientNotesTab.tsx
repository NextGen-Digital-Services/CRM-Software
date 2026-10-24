"use client";

import React, { useState } from "react";
import { useCrmStore } from "@/store/useCrmStore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Pin, Save } from "lucide-react";
import { toast } from "sonner";

export function ClientNotesTab({ clientId, initialNotes }: { clientId: string; initialNotes: string }) {
  const updateClient = useCrmStore((state) => state.updateClient);
  const [notes, setNotes] = useState(initialNotes);
  const [pinned, setPinned] = useState(true);

  const handleSave = () => {
    updateClient(clientId, { notes });
    toast.success("Patron confidential notes updated.");
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Pin className={`w-4 h-4 ${pinned ? "text-[#B8975A] fill-[#B8975A]" : "text-[#7A6B5D]"}`} />
          <CardTitle>Confidential Atelier Memoranda</CardTitle>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPinned(!pinned)}
            className="text-xs px-2.5 py-1 rounded border border-[#E4DAC6] text-[#7A6B5D] hover:text-[#2A1F1A]"
          >
            {pinned ? "Pinned to Overview" : "Pin Note"}
          </button>
          <Button variant="primary" size="sm" onClick={handleSave}>
            <Save className="w-3.5 h-3.5" /> Save Note
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-xs text-[#7A6B5D] dark:text-[#A89B8E]">
          Maintain private records of patron aesthetics, dietary protocol for atelier tastings, security clearances, and material preferences.
        </p>
        <textarea
          rows={8}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Record notes with @mentions (e.g. @Alessandro, @Elena) or stone specifications..."
          className="w-full p-4 bg-[#F7F1E5]/40 dark:bg-[#1B1511]/40 border border-[#E4DAC6] dark:border-[#382C23] rounded-xl text-sm text-[#2A1F1A] dark:text-[#F7F1E5] focus:outline-none focus:border-[#B8975A] leading-relaxed font-mono"
        />
      </CardContent>
    </Card>
  );
}
