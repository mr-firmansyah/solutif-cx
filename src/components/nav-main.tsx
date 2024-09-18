"use client";

import Link from "next/link";
import { ChevronRight, Search, type LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

export function NavMain({
  className,
  items,
  searchResults,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
  searchResults?: React.ComponentProps<typeof SidebarSearch>["results"];
} & React.ComponentProps<"ul">) {
  const route = usePathname();

  return (
    <ul className={cn("grid gap-0.5", className)}>
      {/* <li>
        <SidebarSearch results={searchResults} />
      </li> */}
      {items?.map((item) => {
        const isActive = route.includes(item.url);

        return (
          <Collapsible asChild defaultOpen={item.isActive} key={item.title}>
            <li>
              <div className="relative flex items-center">
                <Link
                  className={cn(
                    "min-w-8 flex h-8 flex-1 items-center gap-2 overflow-hidden rounded-md px-1.5 text-sm font-medium outline-none ring-ring transition-all focus-visible:ring-2",
                    isActive && "bg-gradient-to-r from-primary to-transparent to-20% text-primary transition-all hover:text-primary-foreground hover:duration-300 hover:to-90% hover:delay-150",
                    !isActive && "hover:bg-accent hover:text-accent-foreground"
                  )}
                  href={item.url}
                  // prevent default behavior for the active link
                  onClick={(e) => isActive && e.preventDefault()}
                >
                  <item.icon className={cn("h-4 w-4 shrink-0 text-muted-foreground", isActive && "text-primary-foreground")} />
                  <div className="flex flex-1 overflow-hidden text-xs">
                    <div className="line-clamp-1 pr-6">{item.title}</div>
                  </div>
                </Link>
                {item.items?.length && (
                  <CollapsibleTrigger asChild>
                    <Button
                      className="absolute right-1 h-6 w-6 rounded-md p-0 ring-ring transition-all focus-visible:ring-2 data-[state=open]:rotate-90"
                      variant="ghost"
                    >
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      <span className="sr-only">Toggle</span>
                    </Button>
                  </CollapsibleTrigger>
                )}
              </div>
              <CollapsibleContent className="px-4 py-0.5">
                <ul className="grid border-l px-2">
                  {item.items?.map((subItem) => (
                    <li key={subItem.title}>
                      <Link
                        className="min-w-8 flex h-8 items-center gap-2 overflow-hidden rounded-md px-2 text-xs font-medium text-muted-foreground ring-ring transition-all hover:bg-accent hover:text-accent-foreground focus-visible:ring-2"
                        href={subItem.url}
                      >
                        <div className="line-clamp-1">{subItem.title}</div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </CollapsibleContent>
            </li>
          </Collapsible>
        );
      })}
    </ul>
  );
}

function SidebarSearch({
  results,
}: {
  results: {
    title: string;
    teaser: string;
    url: string;
  }[];
}) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger className="min-w-8 flex h-8 w-full flex-1 items-center gap-2 overflow-hidden rounded-md px-1.5 text-sm font-medium outline-none ring-ring transition-all hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground">
          <Search className="h-4 w-4 shrink-0" />
          <div className="flex flex-1 overflow-hidden">
            <div className="line-clamp-1 pr-6">Search</div>
          </div>
        </DrawerTrigger>
        <DrawerContent>
          <form>
            <div className="border-b p-2.5">
              <Input
                className="h-8 rounded-sm shadow-none focus-visible:ring-0"
                placeholder="Search..."
                type="search"
              />
            </div>
          </form>
          <div className="grid gap-1 p-1.5 text-sm">
            {results.map((result) => (
              <Link
                className="rounded-md p-2.5 outline-none ring-ring hover:bg-accent hover:text-accent-foreground focus-visible:ring-2"
                href={result.url}
                key={result.title}
              >
                <div className="font-medium">{result.title}</div>
                <div className="line-clamp-2 text-muted-foreground">
                  {result.teaser}
                </div>
              </Link>
            ))}
            <Separator className="my-1.5" />
            <Link
              className="rounded-md px-2.5 py-1 text-muted-foreground outline-none ring-ring hover:text-foreground focus-visible:ring-2"
              href="#"
            >
              See all results
            </Link>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Popover>
      <PopoverTrigger className="min-w-8 flex h-8 w-full flex-1 items-center gap-2 overflow-hidden rounded-md px-1.5 text-sm font-medium outline-none ring-ring transition-all hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground">
        <Search className="h-4 w-4 shrink-0" />
        <div className="flex flex-1 overflow-hidden">
          <div className="line-clamp-1 pr-6">Search</div>
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-96 p-0"
        side="right"
        sideOffset={4}
      >
        <form>
          <div className="border-b p-2.5">
            <Input
              className="h-8 rounded-sm shadow-none focus-visible:ring-0"
              placeholder="Search..."
              type="search"
            />
          </div>
        </form>
        <div className="grid gap-1 p-1.5 text-sm">
          {results.map((result) => (
            <Link
              className="rounded-md p-2.5 outline-none ring-ring hover:bg-accent hover:text-accent-foreground focus-visible:ring-2"
              href={result.url}
              key={result.title}
            >
              <div className="font-medium">{result.title}</div>
              <div className="line-clamp-2 text-muted-foreground">
                {result.teaser}
              </div>
            </Link>
          ))}
          <Separator className="my-1.5" />
          <Link
            className="rounded-md px-2.5 py-1 text-muted-foreground outline-none ring-ring hover:text-foreground focus-visible:ring-2"
            href="#"
          >
            See all results
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}
