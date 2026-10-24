import { useCrmStore } from "@/store/useCrmStore";
import { OutboxEmail, Task } from "@/types";

export const automationEngine = {
  // Evaluates rules against current state and simulated date
  evaluateRules(): number {
    const state = useCrmStore.getState();
    const { automationRules, invoices, emailTemplates, simulatedDate, outbox } = state;
    const simDate = new Date(simulatedDate);
    let triggeredCount = 0;

    automationRules.forEach((rule) => {
      if (!rule.isActive) return;

      if (rule.trigger === "invoice_due_soon") {
        invoices.forEach((inv) => {
          if (inv.status === "paid" || inv.status === "cancelled") return;
          const dueDate = new Date(inv.dueDate);
          const diffDays = Math.round((dueDate.getTime() - simDate.getTime()) / (1000 * 3600 * 24));

          if (diffDays === rule.triggerDays) {
            // Check if already dispatched recently for this invoice and rule
            const alreadySent = outbox.some(
              (o) => o.relatedInvoiceId === inv.id && o.ruleId === rule.id && o.sentAt === simulatedDate
            );
            if (!alreadySent) {
              const tmpl = emailTemplates.find((t) => t.id === rule.templateId);
              if (tmpl) {
                const body = tmpl.body
                  .replace(/{{client_name}}/g, inv.clientName)
                  .replace(/{{invoice_no}}/g, inv.invoiceNumber)
                  .replace(/{{amount_due}}/g, `${inv.currency} ${inv.balanceDue.toLocaleString()}`)
                  .replace(/{{due_date}}/g, inv.dueDate)
                  .replace(/{{pay_link}}/g, `https://bellezza.agency/portal/${inv.clientId}`);

                const newEmail: OutboxEmail = {
                  id: `out_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
                  clientId: inv.clientId,
                  clientName: inv.clientName,
                  recipientEmail: "patron@client-estate.com",
                  subject: tmpl.subject.replace(/{{invoice_no}}/g, inv.invoiceNumber),
                  body,
                  status: "sent",
                  sentAt: simulatedDate,
                  relatedInvoiceId: inv.id,
                  ruleId: rule.id,
                  isSimulated: true,
                };
                state.addOutboxEmail(newEmail);
                triggeredCount++;
              }
            }
          }
        });
      }

      if (rule.trigger === "invoice_overdue") {
        invoices.forEach((inv) => {
          if (inv.status !== "overdue" && inv.balanceDue <= 0) return;
          const dueDate = new Date(inv.dueDate);
          const overdueDays = Math.round((simDate.getTime() - dueDate.getTime()) / (1000 * 3600 * 24));

          if (overdueDays >= rule.triggerDays) {
            const alreadySent = outbox.some(
              (o) => o.relatedInvoiceId === inv.id && o.ruleId === rule.id && o.sentAt === simulatedDate
            );
            if (!alreadySent) {
              const tmpl = emailTemplates.find((t) => t.id === rule.templateId);
              if (tmpl) {
                const body = tmpl.body
                  .replace(/{{client_name}}/g, inv.clientName)
                  .replace(/{{invoice_no}}/g, inv.invoiceNumber)
                  .replace(/{{amount_due}}/g, `${inv.currency} ${inv.balanceDue.toLocaleString()}`)
                  .replace(/{{due_date}}/g, inv.dueDate)
                  .replace(/{{pay_link}}/g, `https://bellezza.agency/portal/${inv.clientId}`);

                const newEmail: OutboxEmail = {
                  id: `out_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
                  clientId: inv.clientId,
                  clientName: inv.clientName,
                  recipientEmail: "accounts@client-estate.com",
                  subject: tmpl.subject.replace(/{{invoice_no}}/g, inv.invoiceNumber),
                  body,
                  status: "sent",
                  sentAt: simulatedDate,
                  relatedInvoiceId: inv.id,
                  ruleId: rule.id,
                  isSimulated: true,
                };
                state.addOutboxEmail(newEmail);
                triggeredCount++;
              }
            }
          }
        });
      }
    });

    return triggeredCount;
  },
};
