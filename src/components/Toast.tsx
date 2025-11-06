import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, X } from 'lucide-react';

export type ToastType = 'success' | 'error';

type ToastProps = {
  show: boolean;
  type: ToastType;
  message: string;
  onClose: () => void;
};

export const Toast: React.FC<ToastProps> = ({ show, type, message, onClose }) => {
  const isSuccess = type === 'success';
  const IconComponent = isSuccess ? CheckCircle2 : XCircle;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[100] w-full max-w-md px-4"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <div className="relative rounded-xl border border-[#FFD700]/20 bg-[#0b0b0b]/95 shadow-[0_0_60px_-15px_rgba(255,215,0,0.25)] p-4">
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close toast"
              className="absolute top-3 right-3 text-[#FFD700]/80 hover:text-[#FFD700] transition-colors"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3" aria-live="polite">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 250, damping: 18 }}
                className={`relative h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isSuccess
                    ? 'bg-gradient-to-br from-[#FFD700] via-[#f1d16d] to-[#b8860b]'
                    : 'bg-gradient-to-br from-[#f87171] via-[#ef4444] to-[#7f1d1d]'
                }`}
              >
                <div
                  className={`absolute inset-0 rounded-full blur-lg ${
                    isSuccess ? 'bg-[#FFD700]/40' : 'bg-[#ef4444]/40'
                  }`}
                />
                <IconComponent
                  className={`relative z-10 h-4 w-4 ${
                    isSuccess ? 'text-[#111111]' : 'text-white'
                  }`}
                />
              </motion.div>

              <p className="text-sm text-[#FFD700]/90 leading-relaxed pr-6">
                {message}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};