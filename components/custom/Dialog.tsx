"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";

type DialogProps = {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
};

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev || "";
      };
    }
    return;
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => onOpenChange?.(false)}
      />
      <div className="relative z-10 w-full px-4">
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return child;
          return React.cloneElement(child as React.ReactElement<any>, {
            onClose: () => onOpenChange?.(false),
          });
        })}
      </div>
    </div>,
    document.body
  );
}

export function DialogContent({
  children,
  className = "",
  onClose,
}: {
  children?: React.ReactNode;
  className?: string;
  onClose?: () => void;
}) {
  return (
    <div className={`mx-auto bg-panel rounded-lg shadow-soft ${className}`}>
      <div className="relative p-2 sm:p-4">
        <div className="pt-2">
            <button
                aria-label="Close dialog"
                onClick={() => onClose?.()}
                className="absolute right-4 top-4 rounded-md p-2 text-secondary cursor-pointer hover:text-primary"
            >
                ✕
            </button>
            {children}
        </div>
      </div>
    </div>
  );
}

export function DialogHeader({ children }: { children?: React.ReactNode }) {
  return <div className="p-6 border-b border-divider">{children}</div>;
}

export function DialogTitle({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>;
}

export default Dialog;
