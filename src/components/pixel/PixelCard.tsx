import React from "react";
import { cn } from "@/lib/utils";

export interface PixelCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "primary" | "achievement" | "accent";
  hoverable?: boolean;
}

export function PixelCard({
  variant = "default",
  hoverable = true,
  className,
  children,
  ...props
}: PixelCardProps) {
  const borderVariants = {
    default:
      "border-2 border-[var(--color-border)] bg-[var(--color-surface)] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]",
    primary:
      "border-2 border-[var(--color-primary)] bg-[var(--color-surface)] shadow-[4px_4px_0px_0px_rgba(93,228,199,0.2)]",
    achievement:
      "border-2 border-[var(--color-achievement)] bg-[var(--color-surface)] shadow-[4px_4px_0px_0px_rgba(255,209,102,0.25)]",
    accent:
      "border-2 border-[var(--color-purple)] bg-[var(--color-surface)] shadow-[4px_4px_0px_0px_rgba(167,139,250,0.2)]",
  };

  return (
    <div
      className={cn(
        "relative p-5 transition-transform duration-100",
        borderVariants[variant],
        hoverable &&
          "hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.7)]",
        className
      )}
      {...props}
    >
      {/* Subtle pixel corner notch accents */}
      <div className="absolute -top-[2px] -left-[2px] w-1.5 h-1.5 bg-[var(--color-background)]" />
      <div className="absolute -top-[2px] -right-[2px] w-1.5 h-1.5 bg-[var(--color-background)]" />
      <div className="absolute -bottom-[2px] -left-[2px] w-1.5 h-1.5 bg-[var(--color-background)]" />
      <div className="absolute -bottom-[2px] -right-[2px] w-1.5 h-1.5 bg-[var(--color-background)]" />
      {children}
    </div>
  );
}
