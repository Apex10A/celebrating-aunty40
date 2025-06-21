import React, { useState, useEffect } from 'react';

export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setShowContent(true), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  if (showContent) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-[#0a0a0a] flex items-center justify-center z-50">
      <div className="text-center">
        {/* Main Title */}
        <div className="mb-8">
          <span className="font-decorative text-6xl md:text-7xl text-[#FFD700]">40</span>
          <span className="font-decorative text-4xl md:text-5xl text-[#DC143C] ml-4">&</span>
          <span className="font-decorative text-4xl md:text-5xl text-[#FFD700] ml-4">15</span>
        </div>

        {/* Progress Bar */}
        <div className="w-64 md:w-80 mx-auto mb-8">
          <div className="h-0.5 bg-[#FFD700]/50 mt-4">
            <div
              className="h-full bg-gradient-to-r from-[#FFD700] to-[#DC143C] transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Loading Animation */}
        <div className="relative">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-4 border-[#FFD700]/30 rounded-full">
            <div className="absolute inset-0 border-4 border-transparent border-t-[#FFD700] rounded-full animate-spin" />
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-4 border-[#FFD700]/20 rounded-full">
            <div className="absolute inset-0 border-4 border-transparent border-t-[#DC143C] rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '2s' }} />
          </div>
        </div>

        {/* Loading Text */}
        <div className="mt-8 space-y-2">
          <p className="text-[#FFD700]/80 text-lg font-light">Loading Celebration...</p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-[#FFD700] text-2xl">✨</span>
            <span className="text-[#FFD700]/60 text-sm">Preparing something special</span>
            <span className="text-[#FFD700] text-2xl">✨</span>
          </div>
        </div>

        {/* Progress Percentage */}
        <div className="mt-6">
          <span className="text-[#FFD700]/80 mt-8 font-medium">
            {progress}%
          </span>
        </div>
      </div>
    </div>
  );
}; 