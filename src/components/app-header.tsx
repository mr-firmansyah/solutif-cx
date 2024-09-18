import React from "react";
import { getServerSession } from "next-auth";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authOptions } from "@/auth";

import { SidebarTrigger } from "./ui/sidebar";
import SignOutButton from "./auth/sign-out-button";

export default async function AppHeader() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <header className="sticky top-0 z-10 flex justify-between py-2 items-center gap-4 border-b bg-white px-4 lg:px-6">
      <SidebarTrigger />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-3 cursor-pointer">
            <Button className="rounded-full" size="icon">
              {/* <CircleUser className="w-5 h-5" /> */}
              <Avatar>
                <AvatarImage
                  alt="avatar"
                  src="https://docs.material-tailwind.com/img/face-2.jpg"
                />
                <AvatarFallback>CX</AvatarFallback>
              </Avatar>
              <span className="sr-only">Toggle user menu</span>
            </Button>
            <div className="flex flex-col">
              <span className="font-medium capitalize">{user?.name}</span>
              <span className="text-muted-foreground text-xs">
                {user?.roles?.join(", ") || "Guest"}
              </span>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <SignOutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
