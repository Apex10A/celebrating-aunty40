import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, X } from 'lucide-react';

export type StatusType = 'success' | 'error';

type StatusModalProps = {
  open: boolean;
  status: StatusType;
  title: string;
  description?: string;
  onClose: () => void;
  primaryAction?: { label: string; onClick: () => void } | null;
};

export const StatusModal: React.FC<StatusModalProps> = ({
  open,
  status,
  title,
  description,
  onClose,
  primaryAction = null,
}) => {
  // Close on ESC
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const isSuccess = status === 'success';

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative z-10 w-full max-w-md rounded-2xl border border-[#FFD700]/20 bg-[#0b0b0b]/95 shadow-[0_0_60px_-15px_rgba(255,215,0,0.25)]"
            initial={{ y: 20, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 10, scale: 0.98, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          >
            {/* Gold accent top border */}
            <div className="absolute -top-[1px] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent" />

            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-3 right-3 text-[#FFD700]/80 hover:text-[#FFD700] transition-colors"
            >
              <X size={22} />
            </button>

            <div className="px-6 pt-8 pb-6 text-center">
              {/* Icon */}
              <div className="mx-auto mb-4 h-14 w-14 rounded-full flex items-center justify-center border border-[#FFD700]/30 bg-black/40">
                {isSuccess ? (
                  <CheckCircle2 className="text-[#FFD700]" size={28} />
                ) : (
                  <XCircle className="text-[#DC143C]" size={28} />
                )}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold font-serif bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] to-[#DC143C]">
                {title}
              </h3>

              {/* Divider */}
              <div className="h-px w-28 mx-auto my-4 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent" />

              {/* Description */}
              {description && (
                <p className="text-sm text-[#FFD700]/80 leading-relaxed">
                  {description}
                </p>
              )}

              {/* Actions */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full text-sm font-medium text-[#FFD700] border border-[#FFD700]/40 hover:border-[#FFD700] hover:bg-[#FFD700]/10 transition-colors"
                >
                  Close
                </button>
                {primaryAction && (
                  <button
                    onClick={primaryAction.onClick}
                    className="px-5 py-2.5 rounded-full text-sm font-semibold text-black bg-[#FFD700] hover:bg-[#E6C200] transition-colors"
                  >
                    {primaryAction.label}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};