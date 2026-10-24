import { get, set, del, entries } from "idb-keyval";
import { VaultDocument } from "@/types";

export interface StoredFile {
  id: string;
  name: string;
  type: string;
  size: number;
  base64: string;
  uploadedAt: string;
}

export const documentService = {
  async saveDocumentFile(docId: string, fileData: StoredFile): Promise<void> {
    if (typeof window === "undefined") return;
    await set(`doc_${docId}`, fileData);
  },

  async getDocumentFile(docId: string): Promise<StoredFile | undefined> {
    if (typeof window === "undefined") return undefined;
    return await get(`doc_${docId}`);
  },

  async deleteDocumentFile(docId: string): Promise<void> {
    if (typeof window === "undefined") return;
    await del(`doc_${docId}`);
  },

  async convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  },
};
