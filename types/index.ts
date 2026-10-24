export type OnboardingStatus =
  | "lead"
  | "contacted"
  | "docs_pending"
  | "under_review"
  | "onboarded"
  | "active"
  | "on_hold"
  | "churned";

export interface ContactPerson {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  whatsapp?: string;
  isPrimary?: boolean;
}

export interface Commercials {
  currency: "INR" | "AED" | "USD" | "EUR";
  paymentTerms: "immediate" | "net15" | "net30" | "net60";
  creditLimit: number;
  assignedManagerId: string;
  assignedManagerName: string;
  tags: string[];
}

export interface OnboardingChecklist {
  kycDocsVerified: boolean;
  agreementSigned: boolean;
  advanceReceived: boolean;
  kickoffCallCompleted: boolean;
}

export interface Client {
  id: string;
  name: string;
  type: "Enterprise" | "Boutique Atelier" | "Design Agency" | "Hospitality" | "Real Estate" | "Retail Luxury";
  industry: string;
  taxId: string; // GSTIN or TRN
  website: string;
  address: string;
  country: "India" | "UAE" | "Italy" | "USA" | "UK";
  city: string;
  status: OnboardingStatus;
  contacts: ContactPerson[];
  commercials: Commercials;
  checklist: OnboardingChecklist;
  notes: string;
  healthScore: number; // 0-100
  createdAt: string;
  updatedAt: string;
  avatarUrl?: string;
}

export type RequirementStatus =
  | "draft"
  | "pending_client"
  | "received"
  | "in_review"
  | "approved"
  | "changed"
  | "completed";

export type RequirementPriority = "low" | "medium" | "high" | "urgent";

export interface RequirementChangeLog {
  id: string;
  requirementId: string;
  changedBy: string;
  timestamp: string;
  field: string;
  oldValue: string;
  newValue: string;
}

export interface Requirement {
  id: string;
  projectId: string;
  clientId: string;
  title: string;
  description: string;
  category: "Brand Identity" | "Interior Architectural Plan" | "Custom Fabrication" | "Digital E-Commerce" | "Bespoke Packaging";
  priority: RequirementPriority;
  status: RequirementStatus;
  dueDate: string;
  ownerId: string;
  ownerName: string;
  attachmentsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  clientId: string;
  name: string;
  code: string;
  budget: number;
  currency: string;
  startDate: string;
  targetDate: string;
  status: "planning" | "in_progress" | "review" | "completed" | "on_hold";
  requirements: Requirement[];
  createdAt: string;
}

export interface QuestionnaireField {
  id: string;
  label: string;
  type: "text" | "textarea" | "dropdown" | "checkbox" | "file" | "date";
  required: boolean;
  options?: string[]; // for dropdown
  placeholder?: string;
}

export interface QuestionnaireTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  fields: QuestionnaireField[];
  createdAt: string;
}

export interface QuestionnaireResponse {
  id: string;
  templateId: string;
  clientId: string;
  clientName: string;
  answers: Record<string, any>;
  submittedAt: string;
}

export interface VaultDocument {
  id: string;
  clientId: string;
  projectId?: string;
  name: string;
  category: "KYC & Registration" | "Contract / NDA" | "Architectural Blueprint" | "Brand Specs" | "Payment Receipt" | "Tax Document";
  fileSize: number;
  fileType: string;
  version: number;
  uploadedAt: string;
  uploadedBy: string;
  idbKey?: string; // IndexedDB reference key
  downloadUrl?: string;
}

export type InvoiceStatus =
  | "draft"
  | "sent"
  | "viewed"
  | "partially_paid"
  | "paid"
  | "overdue"
  | "cancelled";

export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  discountPercent: number;
  taxPercent: number;
  amount: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  clientName: string;
  clientAddress: string;
  clientTaxId: string;
  issueDate: string;
  dueDate: string;
  currency: "INR" | "AED" | "USD" | "EUR";
  taxMode: "GST" | "VAT_5" | "NONE";
  gstType?: "IGST" | "CGST_SGST";
  items: InvoiceLineItem[];
  subtotal: number;
  totalDiscount: number;
  taxAmount: number;
  totalAmount: number;
  amountPaid: number;
  balanceDue: number;
  status: InvoiceStatus;
  notes?: string;
  terms?: string;
  bankName: string;
  bankAccount: string;
  bankIban: string;
  bankSwift: string;
  isRecurring?: boolean;
  recurringFrequency?: "monthly" | "quarterly" | "yearly";
  createdAt: string;
}

export interface Quotation {
  id: string;
  quotationNumber: string;
  clientId: string;
  clientName: string;
  date: string;
  validUntil: string;
  currency: "INR" | "AED" | "USD" | "EUR";
  items: InvoiceLineItem[];
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  status: "draft" | "sent" | "accepted" | "rejected" | "converted";
  convertedInvoiceId?: string;
  notes: string;
}

export interface Payment {
  id: string;
  invoiceId: string;
  invoiceNumber: string;
  clientId: string;
  clientName: string;
  amount: number;
  currency: string;
  paymentDate: string;
  paymentMethod: "upi" | "bank_transfer" | "cash" | "cheque" | "card" | "razorpay";
  referenceNumber: string;
  receiptUrl?: string;
  notes?: string;
  createdAt: string;
}

export interface AutomationRule {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  trigger:
    | "invoice_due_soon"
    | "invoice_overdue"
    | "requirement_pending"
    | "onboarding_stalled"
    | "payment_received"
    | "invoice_created";
  triggerDays: number;
  conditionTag?: string;
  minAmount?: number;
  action: "send_email" | "create_task" | "notify_team";
  templateId: string;
  repeatDays?: number;
  maxRepeats?: number;
  quietHoursEnabled: boolean;
  quietHoursStart?: string; // e.g. "21:00"
  quietHoursEnd?: string; // e.g. "08:00"
  lastTriggeredAt?: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  tone: "Friendly" | "Firm" | "Final Notice" | "Warm Welcome";
  body: string;
  variables: string[];
}

export interface OutboxEmail {
  id: string;
  clientId: string;
  clientName: string;
  recipientEmail: string;
  subject: string;
  body: string;
  status: "queued" | "sent" | "opened" | "replied" | "failed";
  sentAt: string;
  relatedInvoiceId?: string;
  ruleId?: string;
  isSimulated: boolean;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "todo" | "in_progress" | "completed";
  dueDate: string;
  assigneeId: string;
  assigneeName: string;
  clientId?: string;
  clientName?: string;
  invoiceId?: string;
  requirementId?: string;
  createdAt: string;
}

export interface CommunicationLog {
  id: string;
  clientId: string;
  clientName: string;
  type: "call" | "email" | "whatsapp" | "meeting";
  date: string;
  summary: string;
  details: string;
  outcome: string;
  nextFollowUpDate?: string;
  loggedByName: string;
}

export type UserRole = "admin" | "account_manager" | "accountant" | "viewer";

export interface TeamMember {
  id: string;
  name: string;
  role: UserRole;
  title: string;
  email: string;
  phone: string;
  avatarUrl: string;
  activeClientsCount: number;
  activeProjectsCount: number;
}

export interface CatalogItem {
  id: string;
  name: string;
  description: string;
  rate: number;
  unit: "hour" | "project" | "unit" | "day" | "sqft";
  defaultTaxPercent: number;
  category: "Architectural Design" | "Bespoke Production" | "Brand Strategy" | "Project Management";
}

export interface Expense {
  id: string;
  projectId: string;
  projectName: string;
  clientId: string;
  clientName: string;
  title: string;
  amount: number;
  currency: string;
  category: "Materials" | "Subcontractor" | "Travel & Site Visit" | "Licensing" | "Sample Prototyping";
  date: string;
  receiptNote?: string;
}

export interface AuditLogEntry {
  id: string;
  action: string;
  entityType: "client" | "invoice" | "payment" | "requirement" | "automation" | "task";
  entityId: string;
  entityName: string;
  performedBy: string;
  timestamp: string;
  details: string;
}

export interface CompanySettings {
  name: string;
  tagline: string;
  taxId: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  website: string;
  currency: "INR" | "AED" | "USD" | "EUR";
  invoicePrefix: string;
  nextInvoiceNumber: number;
  bankName: string;
  bankAccount: string;
  bankIban: string;
  bankSwift: string;
  emailSignature: string;
}
