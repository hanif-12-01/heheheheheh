import React from "react";
import { cn } from "@/lib/utils";

export interface PixelPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  inset?: boolean;
}

export function PixelPanel({ inset = true, className, children, ...props }: PixelPanelProps) {
  return (
    <div
      className={cn(
        "p-4 border",
        inset
          ? "bg-[var(--color-background)] border-[var(--color-border)] shadow-[inset_2px_2px_4px_rgba(0,0,0,0.5)]"
          : "bg-[var(--color-surface)] border-[var(--color-border)] shadow-[3px_3px_0px_0px_rgba(0,0,0,0.4)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
