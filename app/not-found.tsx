import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F7F1E5] dark:bg-[#1B1511] flex items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-4">
        <div className="font-serif text-6xl font-semibold text-[#B8975A]">404</div>
        <div className="text-xs uppercase tracking-widest text-[#7A6B5D] font-medium">
          Pagina non trovata — Lost in the Atelier
        </div>
        <h1 className="font-serif text-2xl font-semibold text-[#2A1F1A] dark:text-[#F7F1E5]">
          Architectural Blueprint Not Found
        </h1>
        <p className="text-xs text-[#7A6B5D] dark:text-[#A89B8E] leading-relaxed">
          The requested dossier, private client token, or vault partition does not exist or has been archived.
        </p>
        <div className="pt-4">
          <Link href="/dashboard">
            <Button variant="primary">Return to Executive Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
