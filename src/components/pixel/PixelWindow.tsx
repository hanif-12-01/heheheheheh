import React from "react";
import { cn } from "@/lib/utils";

export interface PixelWindowProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  icon?: React.ReactNode;
  statusBadge?: string;
}

export function PixelWindow({
  title = "TERMINAL.EXE",
  icon,
  statusBadge,
  children,
  className,
  ...props
}: PixelWindowProps) {
  return (
    <div
      className={cn(
        "border-2 border-[var(--color-border)] bg-[var(--color-surface)] shadow-[6px_6px_0px_0px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Title Bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-[var(--color-surface-secondary)] border-b-2 border-[var(--color-border)] select-none">
        <div className="flex items-center gap-2">
          {icon && <span className="text-[var(--color-primary)]">{icon}</span>}
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--color-text)]">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {statusBadge && (
            <span className="text-[10px] font-mono px-1.5 py-0.5 bg-[var(--color-border)] text-[var(--color-primary)]">
              {statusBadge}
            </span>
          )}
          <div className="flex items-center gap-1.5 ml-2">
            <span className="inline-block w-2.5 h-2.5 bg-[var(--color-border)] border border-[var(--color-surface)]" />
            <span className="inline-block w-2.5 h-2.5 bg-[var(--color-achievement)] border border-[var(--color-surface)]" />
            <span className="inline-block w-2.5 h-2.5 bg-[#EF4444] border border-[var(--color-surface)]" />
          </div>
        </div>
      </div>

      {/* Window Body */}
      <div className="p-4 sm:p-6">{children}</div>
    </div>
  );
}
