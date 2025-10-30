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
  const IconComponent = isSuccess ? CheckCircle2 : XCircle;

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

          {/* Panel with animated gold border */}
          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative z-10 w-full max-w-md rounded-2xl p-[2px] overflow-hidden"
            initial={{ y: 20, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 10, scale: 0.98, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          >

            {/* Panel content */}
            <div className="relative rounded-[14px] border border-[#FFD700]/20 bg-[#0b0b0b]/95 shadow-[0_0_60px_-15px_rgba(255,215,0,0.25)]">
              {/* Close button */}
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute top-3 right-3 text-[#FFD700]/80 hover:text-[#FFD700] transition-colors"
              >
                <X size={22} />
              </button>

              <div className="px-6 pt-8 pb-6 text-center" aria-live="polite">
                <div className="flex items-center justify-center mb-5">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 250, damping: 18 }}
                    className={`relative h-24 w-24 rounded-full flex items-center justify-center ${
                      isSuccess
                        ? 'bg-gradient-to-br from-[#FFD700] via-[#f1d16d] to-[#b8860b]'
                        : 'bg-gradient-to-br from-[#f87171] via-[#ef4444] to-[#7f1d1d]'
                    }`}
                  >
                    <div
                      className={`absolute inset-0 rounded-full blur-xl ${
                        isSuccess ? 'bg-[#FFD700]/40' : 'bg-[#ef4444]/40'
                      }`}
                    />
                    <IconComponent
                      className={`relative z-10 h-12 w-12 ${
                        isSuccess ? 'text-[#111111]' : 'text-white'
                      }`}
                    />
                  </motion.div>
                </div>

                <p className="text-2xl font-bold text-[#FFD700] font-Montserrat pb-2">
                  {title}
                </p>

                {description && (
                  <p className="text-sm text-[#FFD700]/80 leading-relaxed">
                    {description}
                  </p>
                )}

                <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
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
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};