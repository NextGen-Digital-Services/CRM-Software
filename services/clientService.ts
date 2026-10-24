import { Client, OnboardingStatus } from "@/types";
import { useCrmStore } from "@/store/useCrmStore";

export const clientService = {
  async getClients(): Promise<Client[]> {
    return useCrmStore.getState().clients;
  },

  async getClientById(id: string): Promise<Client | undefined> {
    return useCrmStore.getState().clients.find((c) => c.id === id);
  },

  async createClient(clientData: Omit<Client, "id" | "createdAt" | "updatedAt">): Promise<Client> {
    const newClient: Client = {
      ...clientData,
      id: `cli_${Date.now()}`,
      createdAt: useCrmStore.getState().simulatedDate,
      updatedAt: useCrmStore.getState().simulatedDate,
    };
    useCrmStore.getState().addClient(newClient);
    return newClient;
  },

  async updateClient(id: string, updates: Partial<Client>): Promise<void> {
    useCrmStore.getState().updateClient(id, updates);
  },

  async updateClientStatus(id: string, status: OnboardingStatus): Promise<void> {
    useCrmStore.getState().updateClient(id, { status });
  },

  async deleteClient(id: string): Promise<void> {
    useCrmStore.getState().deleteClient(id);
  },
};
