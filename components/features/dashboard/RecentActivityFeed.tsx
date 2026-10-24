"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { useCrmStore } from "@/store/useCrmStore";
import { History, ArrowRight } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

export function RecentActivityFeed() {
  const auditLogs = useCrmStore((state) => state.auditLogs);

  return (
    <Card className="col-span-1">
      <CardHeader>
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-[#B8975A]" />
          <CardTitle>Atelier Activity Log</CardTitle>
        </div>
        <Link
          href="/settings"
          className="text-xs text-[#B8975A] hover:underline flex items-center gap-1 font-medium"
        >
          Audit Vault <ArrowRight className="w-3 h-3" />
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-[#E4DAC6]/60 dark:divide-[#382C23]/60 max-h-72 overflow-y-auto">
          {auditLogs.slice(0, 6).map((log) => (
            <div key={log.id} className="p-3.5 hover:bg-[#F7F1E5]/40 dark:hover:bg-[#1B1511]/40 transition-colors">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-[#2A1F1A] dark:text-[#F7F1E5]">
                  {log.action}
                </span>
                <span className="text-[10px] text-[#7A6B5D] dark:text-[#A89B8E]">
                  {formatDate(log.timestamp)}
                </span>
              </div>
              <p className="text-xs text-[#7A6B5D] dark:text-[#A89B8E] line-clamp-1">
                {log.details}
              </p>
              <div className="text-[10px] text-[#B8975A] mt-1 font-medium">
                By {log.performedBy}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
