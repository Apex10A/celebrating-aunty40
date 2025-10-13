import React from 'react';
import { motion } from 'framer-motion';

export const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
    >
      <div className="relative flex items-center justify-center">
        <motion.div
          className="absolute md:w-36 md:h-36 w-28 h-28 rounded-full border-2 border-[#FFD700]/40 border-t-[#FFD700]"
          animate={{ rotate: 360 }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
        />

        <motion.img
          src="/ft.png"
          alt="Logo"
          className="md:w-28 md:h-28 w-20 h-20 object-contain"
          initial={{ scale: 0.85, opacity: 0.7 }}
          animate={{
            scale: [0.9, 1, 0.9],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <motion.p
        className="mt-6 text-sm uppercase tracking-[0.35em] text-[#FFD700]/80"
        initial={{ opacity: 0.3 }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        Loading
      </motion.p>
    </motion.div>
  );
};