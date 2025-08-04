import React, { useState, useEffect } from 'react';

export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => setShowContent(true), 800);
          }, 300);
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
    <div className={`fixed inset-0 bg-black flex items-center justify-center z-50 transition-opacity duration-800 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className="text-center space-y-8">
        <div className="space-y-2">
          <h1 className="text-6xl md:text-7xl font-bold text-[#FFD700] tracking-tight">
            TopFun@40
          </h1>
          <p className="text-gray-400 text-lg font-light">
            40th Anniversary Celebration
          </p>
        </div>

        <div className="w-64 mx-auto">
          <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#FFD700] rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-3 text-center">
            <span className="text-gray-500 text-sm">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-[#FFD700] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-[#FFD700] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-[#FFD700] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}; 