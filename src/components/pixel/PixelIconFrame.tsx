import React from "react";
import { cn } from "@/lib/utils";

export interface PixelIconFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "primary" | "secondary" | "achievement" | "accent";
  size?: "sm" | "md" | "lg";
}

export function PixelIconFrame({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: PixelIconFrameProps) {
  const variants = {
    primary: "border-[var(--color-primary)] text-[var(--color-primary)] bg-[var(--color-primary)]/10",
    secondary: "border-[var(--color-border)] text-[var(--color-text)] bg-[var(--color-surface-secondary)]",
    achievement: "border-[var(--color-achievement)] text-[var(--color-achievement)] bg-[var(--color-achievement)]/10",
    accent: "border-[var(--color-purple)] text-[var(--color-purple)] bg-[var(--color-purple)]/10",
  };

  const sizes = {
    sm: "w-8 h-8 p-1.5",
    md: "w-10 h-10 p-2",
    lg: "w-12 h-12 p-2.5",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center border-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] select-none shrink-0",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
