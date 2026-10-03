"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface PixelButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

export const PixelButton = React.forwardRef<HTMLButtonElement, PixelButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const variants = {
      primary:
        "bg-[var(--color-primary)] text-[#0B1020] hover:brightness-110 border-2 border-[var(--color-primary)] shadow-[3px_3px_0px_0px_#0B1020]",
      secondary:
        "bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-surface-secondary)] border-2 border-[var(--color-border)] shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)]",
      accent:
        "bg-[var(--color-achievement)] text-[#0B1020] hover:brightness-110 border-2 border-[var(--color-achievement)] shadow-[3px_3px_0px_0px_#0B1020]",
      ghost:
        "bg-transparent text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] border-2 border-transparent hover:border-[var(--color-border)]",
      danger:
        "bg-[#EF4444] text-white hover:brightness-110 border-2 border-[#B91C1C] shadow-[3px_3px_0px_0px_#0B1020]",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs font-mono tracking-wider",
      md: "px-4 py-2 text-sm font-mono tracking-wider",
      lg: "px-6 py-3 text-base font-mono tracking-wider",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-semibold uppercase transition-all duration-75 select-none",
          "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]",
          "disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

PixelButton.displayName = "PixelButton";
