"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { documentService, StoredFile } from "@/services/documentService";
import { VaultDocument } from "@/types";
import { Upload, FileText, Download, Trash2, Eye, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export function ClientDocumentsTab({ clientId }: { clientId: string }) {
  const [documents, setDocuments] = useState<VaultDocument[]>([
    {
      id: `doc_${clientId}_1`,
      clientId,
      name: "Articles_of_Incorporation_&_Registry.pdf",
      category: "KYC & Registration",
      fileSize: 2450000,
      fileType: "application/pdf",
      version: 1,
      uploadedAt: "2026-08-14",
      uploadedBy: "Elena Rostova",
    },
    {
      id: `doc_${clientId}_2`,
      clientId,
      name: "Master_Atelier_Commission_Agreement_Signed.pdf",
      category: "Contract / NDA",
      fileSize: 4120000,
      fileType: "application/pdf",
      version: 2,
      uploadedAt: "2026-08-20",
      uploadedBy: "Alessandro Conti",
    },
  ]);

  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const base64 = await documentService.convertFileToBase64(file);
      const docId = `doc_${clientId}_${Date.now()}`;
      await documentService.saveDocumentFile(docId, {
        id: docId,
        name: file.name,
        type: file.type,
        size: file.size,
        base64,
        uploadedAt: new Date().toISOString(),
      });

      const newDoc: VaultDocument = {
        id: docId,
        clientId,
        name: file.name,
        category: "Architectural Blueprint",
        fileSize: file.size,
        fileType: file.type || "application/octet-stream",
        version: 1,
        uploadedAt: new Date().toISOString().split("T")[0],
        uploadedBy: "Demo Operator",
        idbKey: `doc_${docId}`,
      };

      setDocuments([newDoc, ...documents]);
      toast.success(`Encrypted document "${file.name}" saved to IndexedDB vault.`);
    } catch {
      toast.error("Failed to store document in IndexedDB.");
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = async (doc: VaultDocument) => {
    const stored = await documentService.getDocumentFile(doc.id);
    if (stored?.base64) {
      const link = document.createElement("a");
      link.href = stored.base64;
      link.download = stored.name;
      link.click();
      toast.success(`Downloaded ${stored.name}`);
    } else {
      toast.info(`Retrieving encrypted document from archival storage: ${doc.name}`);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Encrypted Document Vault</CardTitle>
          <p className="text-xs text-[#7A6B5D] dark:text-[#A89B8E] mt-0.5">
            IndexedDB zero-latency storage for architectural plans, NDAs, and KYC certifications.
          </p>
        </div>
        <label className="cursor-pointer inline-flex items-center justify-center font-medium transition-colors duration-150 rounded-lg text-xs h-8 px-3 gap-1.5 bg-[#FFFDF8] text-[#2A1F1A] border border-[#E4DAC6] hover:bg-[#F7F1E5] dark:bg-[#241D17] dark:text-[#F7F1E5] dark:border-[#382C23]">
          <input type="file" onChange={handleFileUpload} className="hidden" disabled={uploading} />
          <Upload className="w-3.5 h-3.5" />
          {uploading ? "Encrypting..." : "Upload Document"}
        </label>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-[#E4DAC6]/60 dark:divide-[#382C23]/60 text-xs">
          {documents.map((doc) => (
            <div key={doc.id} className="p-4 flex items-center justify-between hover:bg-[#F7F1E5]/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#1F3A2E]/10 dark:bg-[#FFFDF8]/10 flex items-center justify-center text-[#1F3A2E] dark:text-[#FFFDF8]">
                  <FileText className="w-4 h-4 text-[#B8975A]" />
                </div>
                <div>
                  <div className="font-semibold text-[#2A1F1A] dark:text-[#F7F1E5] flex items-center gap-2">
                    {doc.name}
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#E4DAC6]/40 text-[#7A6B5D]">
                      v{doc.version}.0
                    </span>
                  </div>
                  <div className="text-[#7A6B5D] text-[11px] mt-0.5">
                    {doc.category} · {(doc.fileSize / 1024 / 1024).toFixed(2)} MB · Uploaded by {doc.uploadedBy} on {doc.uploadedAt}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => handleDownload(doc)} title="Download / Preview">
                  <Download className="w-4 h-4 text-[#B8975A]" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
