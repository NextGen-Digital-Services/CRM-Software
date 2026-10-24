"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl";
}

export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  className,
  maxWidth = "lg",
}: ModalProps) {
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

  const maxWMap = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "4xl": "max-w-4xl",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-[#2A1F1A]/50 backdrop-blur-[2px]"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className={cn(
              "relative z-10 w-full bg-[#FFFDF8] border border-[#E4DAC6] rounded-t-2xl sm:rounded-2xl shadow-xl max-h-[90vh] flex flex-col dark:bg-[#241D17] dark:border-[#382C23]",
              maxWMap[maxWidth],
              className
            )}
          >
            {(title || subtitle) && (
              <div className="flex items-center justify-between p-5 border-b border-[#E4DAC6]/70 dark:border-[#382C23]/70">
                <div>
                  {title && (
                    <h2 className="font-serif text-xl font-semibold text-[#2A1F1A] dark:text-[#F7F1E5]">
                      {title}
                    </h2>
                  )}
                  {subtitle && (
                    <p className="text-xs text-[#7A6B5D] dark:text-[#A89B8E] mt-0.5">
                      {subtitle}
                    </p>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-[#7A6B5D] hover:text-[#2A1F1A] hover:bg-[#E4DAC6]/40 dark:text-[#A89B8E] dark:hover:text-[#F7F1E5] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
            <div className="p-5 overflow-y-auto max-h-[calc(90vh-80px)]">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
