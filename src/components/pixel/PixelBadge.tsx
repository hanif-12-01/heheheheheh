import React from "react";
import { cn } from "@/lib/utils";

export interface PixelBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "achievement" | "accent" | "blue" | "outline";
  size?: "sm" | "md";
}

export function PixelBadge({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: PixelBadgeProps) {
  const variants = {
    primary: "bg-[var(--color-primary)]/15 text-[var(--color-primary)] border border-[var(--color-primary)]",
    secondary: "bg-[var(--color-surface-secondary)] text-[var(--color-text)] border border-[var(--color-border)]",
    achievement: "bg-[var(--color-achievement)]/15 text-[var(--color-achievement)] border border-[var(--color-achievement)]",
    accent: "bg-[var(--color-purple)]/15 text-[var(--color-purple)] border border-[var(--color-purple)]",
    blue: "bg-[var(--color-blue)]/15 text-[var(--color-blue)] border border-[var(--color-blue)]",
    outline: "bg-transparent text-[var(--color-muted)] border border-[var(--color-border)]",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-[10px] tracking-wider",
    md: "px-2.5 py-1 text-xs tracking-wider",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-mono uppercase font-medium select-none shadow-[2px_2px_0px_0px_rgba(0,0,0,0.4)]",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
