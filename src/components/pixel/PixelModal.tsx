"use client";

import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { PixelButton } from "./PixelButton";
import { X } from "lucide-react";

export interface PixelModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function PixelModal({
  isOpen,
  onClose,
  title,
  children,
  className,
}: PixelModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pixel-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className={cn(
          "w-full max-w-lg border-2 border-[var(--color-border)] bg-[var(--color-surface)] shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)]",
          "animate-in fade-in zoom-in-95 duration-100",
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[var(--color-surface-secondary)] border-b-2 border-[var(--color-border)]">
          <h2
            id="pixel-modal-title"
            className="font-mono text-sm font-bold uppercase tracking-wider text-[var(--color-primary)]"
          >
            {title}
          </h2>
          <PixelButton
            variant="ghost"
            size="sm"
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1 h-auto"
          >
            <X className="w-4 h-4" />
          </PixelButton>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
