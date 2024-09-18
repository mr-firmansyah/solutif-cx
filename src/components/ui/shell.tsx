import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const shellVariants = cva(
  "grid items-center gap-8 pb-8 pt-6 md:py-8 mx-auto px-4",
  {
    variants: {
      variant: {
        default: "container",
        sidebar: "",
        centered:
          "container flex h-dvh max-w-2xl flex-col justify-center py-16",
        markdown: "container max-w-3xl py-8 md:py-10 lg:py-10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface ShellProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof shellVariants> {
  as?: React.ElementType;
  label: React.ReactNode;
}

function Shell({
  className,
  as: Comp = "section",
  variant,
  label,
  ...props
}: ShellProps) {
  return (
    <>
      <h2 className="sticky top-0 z-10 scroll-m-20 border-b py-2 px-8 text-lg font-semibold tracking-tight first:mt-0 bg-white">
        <div className="h-8 flex items-center">{label}</div>
      </h2>
      <Comp className={cn(shellVariants({ variant }), className)} {...props} />
    </>
  );
}

export { Shell, shellVariants };
