import React from "react";
import { cn } from "@/lib/utils";

export interface PixelDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  dashed?: boolean;
}

export function PixelDivider({ dashed = false, className, ...props }: PixelDividerProps) {
  return (
    <div
      role="separator"
      className={cn(
        "w-full h-[2px] my-6",
        dashed
          ? "bg-[radial-gradient(ellipse_at_center,_var(--color-border)_50%,_transparent_50%)] bg-[length:8px_2px]"
          : "bg-[var(--color-border)] shadow-[0_1px_0_0_rgba(255,255,255,0.05)]",
        className
      )}
      {...props}
    />
  );
}
