import React from 'react';
import { motion } from 'framer-motion';

export const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.8,
            ease: "easeOut"
          }}
          className="mb-8"
        >
          <span className="font-decorative text-6xl md:text-7xl text-[#FFD700]">40</span>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-0.5 bg-[#FFD700]/50 mt-4"
          />
        </motion.div>

        <div className="relative">
          {/* Ring animation */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 360],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-4 border-[#FFD700]/30 rounded-full"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [180, -180],
              opacity: [1, 0.5, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-4 border-[#FFD700]/20 rounded-full"
          />

          {/* Sparkles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -10, 0],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `rotate(${i * 60}deg) translateY(-30px)`
              }}
            >
              <span className="text-[#FFD700] text-2xl">✨</span>
            </motion.div>
          ))}

          {/* Loading text */}
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-[#FFD700]/80 mt-8 font-medium"
          >
            Creating memories...
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}; 