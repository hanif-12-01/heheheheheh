"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface PixelTooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: "top" | "bottom";
  className?: string;
}

export function PixelTooltip({
  content,
  children,
  position = "top",
  className,
}: PixelTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
    >
      {children}
      {isOpen && (
        <div
          role="tooltip"
          className={cn(
            "absolute z-50 px-2.5 py-1.5 bg-[var(--color-surface-secondary)] text-[var(--color-text)] text-xs font-mono border-2 border-[var(--color-border)] shadow-[3px_3px_0px_0px_#000] whitespace-nowrap select-none pointer-events-none transition-opacity duration-100",
            position === "top" && "bottom-full left-1/2 -translate-x-1/2 mb-2",
            position === "bottom" && "top-full left-1/2 -translate-x-1/2 mt-2",
            className
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
}
