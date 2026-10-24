import { Invoice, InvoiceStatus, Quotation } from "@/types";
import { useCrmStore } from "@/store/useCrmStore";

export const invoiceService = {
  async getInvoices(): Promise<Invoice[]> {
    return useCrmStore.getState().invoices;
  },

  async getInvoiceById(id: string): Promise<Invoice | undefined> {
    return useCrmStore.getState().invoices.find((inv) => inv.id === id);
  },

  async createInvoice(invoiceData: Omit<Invoice, "id" | "createdAt">): Promise<Invoice> {
    const state = useCrmStore.getState();
    const newInvoice: Invoice = {
      ...invoiceData,
      id: `inv_${Date.now()}`,
      createdAt: state.simulatedDate,
    };
    state.addInvoice(newInvoice);
    return newInvoice;
  },

  async updateInvoiceStatus(id: string, status: InvoiceStatus): Promise<void> {
    useCrmStore.getState().updateInvoice(id, { status });
  },

  async deleteInvoice(id: string): Promise<void> {
    useCrmStore.getState().deleteInvoice(id);
  },

  async convertQuotationToInvoice(quotation: Quotation): Promise<Invoice> {
    const state = useCrmStore.getState();
    const invNumber = `${state.companySettings.invoicePrefix}${state.companySettings.nextInvoiceNumber}`;
    const newInv: Invoice = {
      id: `inv_${Date.now()}`,
      invoiceNumber: invNumber,
      clientId: quotation.clientId,
      clientName: quotation.clientName,
      clientAddress: "Via Atelier Quoted",
      clientTaxId: "PENDING",
      issueDate: state.simulatedDate,
      dueDate: state.simulatedDate,
      currency: quotation.currency,
      taxMode: "GST",
      items: quotation.items,
      subtotal: quotation.subtotal,
      totalDiscount: 0,
      taxAmount: quotation.taxAmount,
      totalAmount: quotation.totalAmount,
      amountPaid: 0,
      balanceDue: quotation.totalAmount,
      status: "draft",
      bankName: state.companySettings.bankName,
      bankAccount: state.companySettings.bankAccount,
      bankIban: state.companySettings.bankIban,
      bankSwift: state.companySettings.bankSwift,
      createdAt: state.simulatedDate,
    };
    state.addInvoice(newInv);
    state.updateQuotation(quotation.id, { status: "converted", convertedInvoiceId: newInv.id });
    return newInv;
  },
};
