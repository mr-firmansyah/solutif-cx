"use client";

import { type Table } from "@tanstack/react-table";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

interface LeadsTableToolbarActionsProps {
  table?: Table<LeadsListResponse>;
}

export function LeadsTableToolbarActions({
  table,
}: LeadsTableToolbarActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <Button asChild size="sm">
        <Link href="/service-request/create">
          <PlusIcon aria-hidden="true" className="mr-2 size-4" />
          Create Leads
        </Link>
      </Button>
    </div>
  );
}
