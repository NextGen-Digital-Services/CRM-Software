"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { useCrmStore } from "@/store/useCrmStore";
import { Badge } from "@/components/ui/Badge";
import { FileCheck2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

export function PendingRequirementsWidget() {
  const projects = useCrmStore((state) => state.projects);

  const pendingReqs = projects
    .flatMap((p) => p.requirements)
    .filter((r) => r.status === "pending_client" || r.status === "in_review" || r.status === "received")
    .slice(0, 4);

  return (
    <Card className="col-span-1">
      <CardHeader>
        <div className="flex items-center gap-2">
          <FileCheck2 className="w-4 h-4 text-[#B8975A]" />
          <CardTitle>In-Flight Requirements</CardTitle>
        </div>
        <Link
          href="/requirements"
          className="text-xs text-[#B8975A] hover:underline flex items-center gap-1 font-medium"
        >
          View Board <ArrowRight className="w-3 h-3" />
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-[#E4DAC6]/60 dark:divide-[#382C23]/60">
          {pendingReqs.map((req) => (
            <div key={req.id} className="p-3.5 hover:bg-[#F7F1E5]/40 dark:hover:bg-[#1B1511]/40 transition-colors">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-[#2A1F1A] dark:text-[#F7F1E5] truncate max-w-[200px]">
                  {req.title}
                </span>
                <Badge status={req.status} />
              </div>
              <p className="text-xs text-[#7A6B5D] dark:text-[#A89B8E] line-clamp-1">
                {req.description}
              </p>
              <div className="flex items-center justify-between text-[10px] text-[#7A6B5D] dark:text-[#A89B8E] mt-1.5">
                <span>Owner: {req.ownerName}</span>
                <span>Due: {formatDate(req.dueDate)}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
