import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Bellezza CRM — Italian Luxury Client Relationship & Financial Atelier",
  description:
    "Private client relationship management, bespoke architectural requirements, multi-currency VAT/GST invoicing, and automated follow-ups for luxury agencies.",
  keywords: ["CRM", "Luxury Agency", "Italian Design", "Invoicing", "Private Clients"],
  authors: [{ name: "Bellezza Atelier Guild" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-[#F7F1E5] dark:bg-[#1B1511] font-sans antialiased text-[#2A1F1A] dark:text-[#F7F1E5]">
        {children}
      </body>
    </html>
  );
}
