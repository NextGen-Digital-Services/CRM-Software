import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { Invoice } from "@/types";
import { formatDate } from "@/lib/utils";

export function generateInvoicePdf(invoice: Invoice) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // Background tint
  doc.setFillColor(247, 241, 229); // Ivory #F7F1E5
  doc.rect(0, 0, 210, 297, "F");

  // Top Verde Banner
  doc.setFillColor(31, 58, 46); // Verde Profondo #1F3A2E
  doc.rect(0, 0, 210, 36, "F");

  // Header Title
  doc.setTextColor(255, 253, 248);
  doc.setFont("times", "bold");
  doc.setFontSize(22);
  doc.text("BELLEZZA ATELIER", 15, 18);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(184, 151, 90); // Oro Antico #B8975A
  doc.text("PRIVATE CLIENT GUILD · EST. MMXXVI", 15, 25);

  doc.setFont("times", "bold");
  doc.setFontSize(16);
  doc.setTextColor(255, 253, 248);
  doc.text(`INVOICE: ${invoice.invoiceNumber}`, 195, 20, { align: "right" });

  // Bill To & Dates Block
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(184, 151, 90);
  doc.text("PATRON / CLIENT DOSSIER:", 15, 48);
  doc.text("STATEMENT COVENANTS:", 130, 48);

  doc.setTextColor(42, 31, 26); // Espresso #2A1F1A
  doc.setFont("times", "bold");
  doc.setFontSize(12);
  doc.text(invoice.clientName, 15, 55);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(invoice.clientAddress || "Via Client Atelier", 15, 61);
  doc.text(`Tax ID / TRN: ${invoice.clientTaxId || "N/A"}`, 15, 67);

  doc.text(`Issue Date: ${formatDate(invoice.issueDate)}`, 130, 55);
  doc.text(`Due Date: ${formatDate(invoice.dueDate)}`, 130, 61);
  doc.text(`Tax Schedule: ${invoice.taxMode}`, 130, 67);

  // Table items
  const tableRows = invoice.items.map((item, idx) => [
    idx + 1,
    item.description,
    item.quantity,
    `${invoice.currency} ${item.rate.toLocaleString()}`,
    `${invoice.currency} ${item.amount.toLocaleString()}`,
  ]);

  autoTable(doc, {
    startY: 75,
    head: [["#", "Specification & Commission Item", "Qty", "Rate", "Amount"]],
    body: tableRows,
    theme: "plain",
    headStyles: {
      fillColor: [31, 58, 46],
      textColor: [255, 253, 248],
      fontStyle: "bold",
      fontSize: 9,
    },
    bodyStyles: {
      textColor: [42, 31, 26],
      fontSize: 8.5,
    },
    alternateRowStyles: {
      fillColor: [255, 253, 248],
    },
    margin: { left: 15, right: 15 },
  });

  const finalY = (doc as any).lastAutoTable.finalY + 10;

  // Subtotals & Balance
  const rightX = 195;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(`Subtotal: ${invoice.currency} ${invoice.subtotal.toLocaleString()}`, rightX, finalY, { align: "right" });
  doc.text(`Tax Amount: ${invoice.currency} ${invoice.taxAmount.toLocaleString()}`, rightX, finalY + 6, { align: "right" });

  doc.setFont("times", "bold");
  doc.setFontSize(12);
  doc.setTextColor(31, 58, 46);
  doc.text(`Total Amount: ${invoice.currency} ${invoice.totalAmount.toLocaleString()}`, rightX, finalY + 14, { align: "right" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(181, 83, 47); // Terracotta
  doc.text(`Balance Due: ${invoice.currency} ${invoice.balanceDue.toLocaleString()}`, rightX, finalY + 20, { align: "right" });

  // Bank Wire Details
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(184, 151, 90);
  doc.text("SETTLEMENT REPOSITORY (WIRE DETAILS):", 15, finalY);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(42, 31, 26);
  doc.text(`Bank: ${invoice.bankName}`, 15, finalY + 5);
  doc.text(`Account No: ${invoice.bankAccount}`, 15, finalY + 10);
  doc.text(`IBAN: ${invoice.bankIban}`, 15, finalY + 15);
  doc.text(`SWIFT / BIC: ${invoice.bankSwift}`, 15, finalY + 20);

  // Footer Seal
  doc.setFont("times", "italic");
  doc.setFontSize(8);
  doc.setTextColor(122, 107, 93);
  doc.text("Bellezza Atelier Guild · Encrypted Commercial Covenants · Milan · DIFC · Nariman Point", 105, 285, { align: "center" });

  doc.save(`${invoice.invoiceNumber}.pdf`);
}
