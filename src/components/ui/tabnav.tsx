"use client";

import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";

import { cn } from "@/lib/utils";

const Tabs = React.forwardRef<
	React.ElementRef<typeof NavigationMenuPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
	<NavigationMenuPrimitive.Root asChild={false} ref={ref} {...props}>
		<NavigationMenuPrimitive.List
			className={cn("font-bold text-sm inline-flex")}
		>
			{children}
		</NavigationMenuPrimitive.List>
	</NavigationMenuPrimitive.Root>
));
Tabs.displayName = "Tabs";

const TabList = React.forwardRef<
	React.ElementRef<typeof NavigationMenuPrimitive.Link>,
	React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link> & {
		disabled?: boolean;
	}
>(({ className, children, disabled, ...props }, ref) => (
	<NavigationMenuPrimitive.Item
		className={cn("inline-flex h-max items-center justify-center", className)}
	>
		<NavigationMenuPrimitive.Link
			asChild={props.asChild}
			className={cn(
				"inline-flex justify-center whitespace-nowrap pt-5 pb-4 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 font-semibold text-muted-foreground shadow-none transition-none data-[active]:border-b-primary data-[active]:text-foreground data-[active]:shadow-none",
				disabled && "pointer-events-none opacity-50",
				className,
			)}
			onSelect={undefined}
			ref={ref}
			{...props}
		>
			{children}
		</NavigationMenuPrimitive.Link>
	</NavigationMenuPrimitive.Item>
));
TabList.displayName = "TabList";

export { Tabs, TabList };
