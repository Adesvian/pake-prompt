"use client";

import { cn } from "@/lib/utils";
import { LabelInputContainerProps } from "@/types/register";

export function LabelInputContainer({
  children,
  className,
}: LabelInputContainerProps) {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
}
