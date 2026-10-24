import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  Client,
  Project,
  Requirement,
  Invoice,
  Payment,
  Quotation,
  Task,
  CommunicationLog,
  AutomationRule,
  EmailTemplate,
  OutboxEmail,
  TeamMember,
  CatalogItem,
  Expense,
  AuditLogEntry,
  CompanySettings,
  QuestionnaireTemplate,
  QuestionnaireResponse,
  UserRole,
} from "@/types";
import {
  INITIAL_COMPANY_SETTINGS,
  INITIAL_TEAM_MEMBERS,
  INITIAL_CLIENTS,
} from "@/data/seedData";
import {
  INITIAL_QUESTIONNAIRE_TEMPLATES,
  INITIAL_PROJECTS,
  INITIAL_CATALOG_ITEMS,
  INITIAL_EXPENSES,
} from "@/data/seedProjectsAndInvoices";
import {
  INITIAL_INVOICES,
  INITIAL_PAYMENTS,
  INITIAL_TASKS,
  INITIAL_COMMUNICATIONS,
  INITIAL_AUTOMATION_RULES,
  INITIAL_EMAIL_TEMPLATES,
  INITIAL_OUTBOX,
  INITIAL_AUDIT_LOGS,
} from "@/data/seedInvoicesAndPayments";

interface CrmState {
  // Demo Time Machine
  simulatedDate: string;
  fastForwardDays: (days: number) => void;
  resetSimulatedDate: () => void;

  // RBAC Role
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;

  // Dark Mode
  isDarkMode: boolean;
  toggleDarkMode: () => void;

  // UI States
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  shortcutsModalOpen: boolean;
  setShortcutsModalOpen: (open: boolean) => void;
  tourOpen: boolean;
  setTourOpen: (open: boolean) => void;

  // Data Collections
  companySettings: CompanySettings;
  updateCompanySettings: (settings: Partial<CompanySettings>) => void;

  clients: Client[];
  setClients: (clients: Client[]) => void;
  addClient: (client: Client) => void;
  updateClient: (id: string, updates: Partial<Client>) => void;
  deleteClient: (id: string) => void;

  projects: Project[];
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  addRequirement: (projectId: string, requirement: Requirement) => void;
  updateRequirement: (requirementId: string, updates: Partial<Requirement>) => void;

  invoices: Invoice[];
  addInvoice: (invoice: Invoice) => void;
  updateInvoice: (id: string, updates: Partial<Invoice>) => void;
  deleteInvoice: (id: string) => void;

  payments: Payment[];
  recordPayment: (payment: Payment) => void;

  quotations: Quotation[];
  addQuotation: (quotation: Quotation) => void;
  updateQuotation: (id: string, updates: Partial<Quotation>) => void;

  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;

  communications: CommunicationLog[];
  addCommunication: (comm: CommunicationLog) => void;

  automationRules: AutomationRule[];
  toggleAutomationRule: (id: string) => void;
  updateAutomationRule: (id: string, updates: Partial<AutomationRule>) => void;

  emailTemplates: EmailTemplate[];
  updateEmailTemplate: (id: string, updates: Partial<EmailTemplate>) => void;

  outbox: OutboxEmail[];
  addOutboxEmail: (email: OutboxEmail) => void;
  resendOutboxEmail: (id: string) => void;

  teamMembers: TeamMember[];
  catalogItems: CatalogItem[];
  addCatalogItem: (item: CatalogItem) => void;

  expenses: Expense[];
  addExpense: (expense: Expense) => void;

  auditLogs: AuditLogEntry[];
  addAuditLog: (entry: Omit<AuditLogEntry, "id" | "timestamp">) => void;

  questionnaireTemplates: QuestionnaireTemplate[];
  addQuestionnaireTemplate: (template: QuestionnaireTemplate) => void;
  questionnaireResponses: QuestionnaireResponse[];
  addQuestionnaireResponse: (response: QuestionnaireResponse) => void;

  resetDemoData: () => void;
}

export const useCrmStore = create<CrmState>()(
  persist(
    (set, get) => ({
      simulatedDate: new Date().toISOString().split("T")[0],

      fastForwardDays: (days: number) => {
        const current = new Date(get().simulatedDate);
        current.setDate(current.getDate() + days);
        const newDateStr = current.toISOString().split("T")[0];

        // Evaluate invoices overdue status against new date
        const updatedInvoices = get().invoices.map((inv) => {
          if (inv.status !== "paid" && inv.status !== "cancelled") {
            if (new Date(inv.dueDate) < current && inv.balanceDue > 0) {
              return { ...inv, status: "overdue" as const };
            }
          }
          return inv;
        });

        set({ simulatedDate: newDateStr, invoices: updatedInvoices });
        get().addAuditLog({
          action: "Time Machine Fast-Forward",
          entityType: "automation",
          entityId: "time_machine",
          entityName: `+${days} Days`,
          performedBy: "Demo Operator",
          details: `Simulated date advanced to ${newDateStr}`,
        });
      },

      resetSimulatedDate: () => {
        const today = new Date().toISOString().split("T")[0];
        set({ simulatedDate: today });
      },

      currentRole: "admin",
      setCurrentRole: (role: UserRole) => set({ currentRole: role }),

      isDarkMode: false,
      toggleDarkMode: () => {
        const next = !get().isDarkMode;
        set({ isDarkMode: next });
        if (typeof document !== "undefined") {
          if (next) {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
        }
      },

      commandPaletteOpen: false,
      setCommandPaletteOpen: (open: boolean) => set({ commandPaletteOpen: open }),
      shortcutsModalOpen: false,
      setShortcutsModalOpen: (open: boolean) => set({ shortcutsModalOpen: open }),
      tourOpen: false,
      setTourOpen: (open: boolean) => set({ tourOpen: open }),

      companySettings: INITIAL_COMPANY_SETTINGS,
      updateCompanySettings: (settings) =>
        set((state) => ({
          companySettings: { ...state.companySettings, ...settings },
        })),

      clients: INITIAL_CLIENTS,
      setClients: (clients) => set({ clients }),
      addClient: (client) => {
        set((state) => ({ clients: [client, ...state.clients] }));
        get().addAuditLog({
          action: "Client Created",
          entityType: "client",
          entityId: client.id,
          entityName: client.name,
          performedBy: get().currentRole,
          details: `Added new client: ${client.name}`,
        });
      },
      updateClient: (id, updates) => {
        set((state) => ({
          clients: state.clients.map((c) => (c.id === id ? { ...c, ...updates, updatedAt: get().simulatedDate } : c)),
        }));
      },
      deleteClient: (id) => {
        const target = get().clients.find((c) => c.id === id);
        set((state) => ({ clients: state.clients.filter((c) => c.id !== id) }));
        if (target) {
          get().addAuditLog({
            action: "Client Deleted",
            entityType: "client",
            entityId: id,
            entityName: target.name,
            performedBy: get().currentRole,
            details: `Removed client: ${target.name}`,
          });
        }
      },

      projects: INITIAL_PROJECTS,
      addProject: (project) => set((state) => ({ projects: [project, ...state.projects] })),
      updateProject: (id, updates) =>
        set((state) => ({
          projects: state.projects.map((p) => (p.id === id ? { ...p, ...updates } : p)),
        })),
      addRequirement: (projectId, req) =>
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === projectId ? { ...p, requirements: [req, ...p.requirements] } : p
          ),
        })),
      updateRequirement: (reqId, updates) =>
        set((state) => ({
          projects: state.projects.map((p) => ({
            ...p,
            requirements: p.requirements.map((r) => (r.id === reqId ? { ...r, ...updates, updatedAt: get().simulatedDate } : r)),
          })),
        })),

      invoices: INITIAL_INVOICES,
      addInvoice: (invoice) => {
        set((state) => ({
          invoices: [invoice, ...state.invoices],
          companySettings: {
            ...state.companySettings,
            nextInvoiceNumber: state.companySettings.nextInvoiceNumber + 1,
          },
        }));
        get().addAuditLog({
          action: "Invoice Created",
          entityType: "invoice",
          entityId: invoice.id,
          entityName: invoice.invoiceNumber,
          performedBy: get().currentRole,
          details: `Invoice for ${invoice.clientName} of ${invoice.currency} ${invoice.totalAmount}`,
        });
      },
      updateInvoice: (id, updates) =>
        set((state) => ({
          invoices: state.invoices.map((inv) => (inv.id === id ? { ...inv, ...updates } : inv)),
        })),
      deleteInvoice: (id) => set((state) => ({ invoices: state.invoices.filter((inv) => inv.id !== id) })),

      payments: INITIAL_PAYMENTS,
      recordPayment: (payment) => {
        set((state) => {
          const targetInv = state.invoices.find((i) => i.id === payment.invoiceId);
          let updatedInvoices = state.invoices;
          if (targetInv) {
            const newAmountPaid = (targetInv.amountPaid || 0) + payment.amount;
            const newBalance = Math.max(0, targetInv.totalAmount - newAmountPaid);
            const newStatus = newBalance <= 0 ? "paid" : "partially_paid";
            updatedInvoices = state.invoices.map((i) =>
              i.id === payment.invoiceId ? { ...i, amountPaid: newAmountPaid, balanceDue: newBalance, status: newStatus } : i
            );
          }
          return {
            payments: [payment, ...state.payments],
            invoices: updatedInvoices,
          };
        });
        get().addAuditLog({
          action: "Payment Recorded",
          entityType: "payment",
          entityId: payment.id,
          entityName: payment.referenceNumber,
          performedBy: get().currentRole,
          details: `Recorded payment of ${payment.currency} ${payment.amount} for ${payment.clientName}`,
        });
      },

      quotations: [],
      addQuotation: (q) => set((state) => ({ quotations: [q, ...state.quotations] })),
      updateQuotation: (id, updates) =>
        set((state) => ({
          quotations: state.quotations.map((q) => (q.id === id ? { ...q, ...updates } : q)),
        })),

      tasks: INITIAL_TASKS,
      addTask: (task) => set((state) => ({ tasks: [task, ...state.tasks] })),
      updateTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
        })),
      deleteTask: (id) => set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) })),

      communications: INITIAL_COMMUNICATIONS,
      addCommunication: (comm) => set((state) => ({ communications: [comm, ...state.communications] })),

      automationRules: INITIAL_AUTOMATION_RULES,
      toggleAutomationRule: (id) =>
        set((state) => ({
          automationRules: state.automationRules.map((r) => (r.id === id ? { ...r, isActive: !r.isActive } : r)),
        })),
      updateAutomationRule: (id, updates) =>
        set((state) => ({
          automationRules: state.automationRules.map((r) => (r.id === id ? { ...r, ...updates } : r)),
        })),

      emailTemplates: INITIAL_EMAIL_TEMPLATES,
      updateEmailTemplate: (id, updates) =>
        set((state) => ({
          emailTemplates: state.emailTemplates.map((t) => (t.id === id ? { ...t, ...updates } : t)),
        })),

      outbox: INITIAL_OUTBOX,
      addOutboxEmail: (email) => set((state) => ({ outbox: [email, ...state.outbox] })),
      resendOutboxEmail: (id) =>
        set((state) => ({
          outbox: state.outbox.map((e) =>
            e.id === id ? { ...e, status: "sent", sentAt: get().simulatedDate } : e
          ),
        })),

      teamMembers: INITIAL_TEAM_MEMBERS,
      catalogItems: INITIAL_CATALOG_ITEMS,
      addCatalogItem: (item) => set((state) => ({ catalogItems: [item, ...state.catalogItems] })),

      expenses: INITIAL_EXPENSES,
      addExpense: (expense) => set((state) => ({ expenses: [expense, ...state.expenses] })),

      auditLogs: INITIAL_AUDIT_LOGS,
      addAuditLog: (entry) => {
        const newLog: AuditLogEntry = {
          ...entry,
          id: `audit_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          timestamp: new Date().toISOString(),
        };
        set((state) => ({ auditLogs: [newLog, ...state.auditLogs.slice(0, 99)] }));
      },

      questionnaireTemplates: INITIAL_QUESTIONNAIRE_TEMPLATES,
      addQuestionnaireTemplate: (tmpl) =>
        set((state) => ({
          questionnaireTemplates: [tmpl, ...state.questionnaireTemplates],
        })),
      questionnaireResponses: [],
      addQuestionnaireResponse: (resp) =>
        set((state) => ({
          questionnaireResponses: [resp, ...state.questionnaireResponses],
        })),

      resetDemoData: () => {
        set({
          simulatedDate: new Date().toISOString().split("T")[0],
          companySettings: INITIAL_COMPANY_SETTINGS,
          clients: INITIAL_CLIENTS,
          projects: INITIAL_PROJECTS,
          invoices: INITIAL_INVOICES,
          payments: INITIAL_PAYMENTS,
          tasks: INITIAL_TASKS,
          communications: INITIAL_COMMUNICATIONS,
          automationRules: INITIAL_AUTOMATION_RULES,
          emailTemplates: INITIAL_EMAIL_TEMPLATES,
          outbox: INITIAL_OUTBOX,
          auditLogs: INITIAL_AUDIT_LOGS,
          teamMembers: INITIAL_TEAM_MEMBERS,
          catalogItems: INITIAL_CATALOG_ITEMS,
          expenses: INITIAL_EXPENSES,
          questionnaireTemplates: INITIAL_QUESTIONNAIRE_TEMPLATES,
          questionnaireResponses: [],
        });
      },
    }),
    {
      name: "bellezza_crm_store_v1",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        simulatedDate: state.simulatedDate,
        currentRole: state.currentRole,
        isDarkMode: state.isDarkMode,
        companySettings: state.companySettings,
        clients: state.clients,
        projects: state.projects,
        invoices: state.invoices,
        payments: state.payments,
        quotations: state.quotations,
        tasks: state.tasks,
        communications: state.communications,
        automationRules: state.automationRules,
        emailTemplates: state.emailTemplates,
        outbox: state.outbox,
        catalogItems: state.catalogItems,
        expenses: state.expenses,
        auditLogs: state.auditLogs,
        questionnaireTemplates: state.questionnaireTemplates,
        questionnaireResponses: state.questionnaireResponses,
      }),
    }
  )
);
