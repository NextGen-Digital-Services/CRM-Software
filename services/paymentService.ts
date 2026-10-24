import { Payment } from "@/types";
import { useCrmStore } from "@/store/useCrmStore";

export const paymentService = {
  async getPayments(): Promise<Payment[]> {
    return useCrmStore.getState().payments;
  },

  async recordPayment(paymentData: Omit<Payment, "id" | "createdAt">): Promise<Payment> {
    const state = useCrmStore.getState();
    const newPayment: Payment = {
      ...paymentData,
      id: `pay_${Date.now()}`,
      createdAt: state.simulatedDate,
    };
    state.recordPayment(newPayment);
    return newPayment;
  },

  async getPaymentsForInvoice(invoiceId: string): Promise<Payment[]> {
    return useCrmStore.getState().payments.filter((p) => p.invoiceId === invoiceId);
  },

  async getPaymentsForClient(clientId: string): Promise<Payment[]> {
    return useCrmStore.getState().payments.filter((p) => p.clientId === clientId);
  },
};
