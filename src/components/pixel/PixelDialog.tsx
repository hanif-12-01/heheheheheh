"use client";

import React from "react";
import { PixelModal } from "./PixelModal";
import { PixelButton } from "./PixelButton";

export interface PixelDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

export function PixelDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
}: PixelDialogProps) {
  return (
    <PixelModal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-4">
        <p className="text-sm text-[var(--color-text)] font-sans">{message}</p>
        <div className="flex justify-end gap-3 pt-2">
          <PixelButton variant="secondary" size="sm" onClick={onClose}>
            {cancelLabel}
          </PixelButton>
          {onConfirm && (
            <PixelButton
              variant="primary"
              size="sm"
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              {confirmLabel}
            </PixelButton>
          )}
        </div>
      </div>
    </PixelModal>
  );
}
