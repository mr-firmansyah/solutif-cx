"use client";

import { PlusIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function TicketsTableToolbarActions() {
  return (
    <div className="flex items-center gap-2">
      <Button asChild size="sm">
        <Link href="/service-request/create">
          <PlusIcon aria-hidden="true" className="mr-2 size-4" />
          Create Ticket
        </Link>
      </Button>
    </div>
  );
}
