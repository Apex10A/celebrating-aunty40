import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [currentText, setCurrentText] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  const loadingTexts = [
    "Preparing our celebration...",
    "Gathering memories of love...",
    "Setting up something magical...",
    "Almost ready for you...",
    "Welcome to our special day!"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => setShowContent(true), 1000);
          }, 500);
          return 100;
        }
        return prev + 1.5;
      });
    }, 30);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const textTimer = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % loadingTexts.length);
    }, 2000);

    return () => clearInterval(textTimer);
  }, []);

  if (showContent) {
    return null;
  }

  return (
    <div className={`fixed inset-0 bg-[#0a0a0a] flex items-center justify-center z-50 transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      {/* Subtle Background Hearts */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-[#FFD700]/10 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${20 + Math.random() * 30}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      <div className="relative z-10 text-center">
        {/* Main Title with Elegant Glow */}
        <div className="mb-12 relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-[#FFD700]/10 to-[#DC143C]/10 blur-2xl rounded-full"></div>
          <div className="relative">
            <h1 className="font-decorative text-7xl md:text-8xl lg:text-9xl font-bold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FFD700] to-[#DC143C] animate-pulse">
                40
              </span>
              <span className="text-[#FFD700] mx-4 md:mx-6 lg:mx-8 animate-bounce" style={{ animationDelay: '0.5s' }}>
                &
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DC143C] via-[#FFD700] to-[#DC143C] animate-pulse" style={{ animationDelay: '1s' }}>
                15
              </span>
            </h1>
          </div>
        </div>

        {/* Elegant Progress Bar */}
        <div className="w-80 md:w-96 mx-auto mb-12 relative">
          <div className="h-1 bg-[#FFD700]/20 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className="h-full bg-gradient-to-r from-[#FFD700] via-[#DC143C] to-[#FFD700] rounded-full transition-all duration-300 ease-out relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
            </div>
          </div>
          <div className="absolute -top-8 left-0 right-0 text-center">
            <span className="text-[#FFD700]/80 text-sm font-light tracking-wider">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Heart Loading Animation */}
        <div className="relative mb-12">
          <div className="relative w-24 h-24 mx-auto">
            {/* Pulsing Heart Background */}
            <div className="absolute inset-0 text-[#FFD700]/20 text-6xl animate-ping">
              ❤️
            </div>
            
            {/* Main Heart */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Heart className="text-[#DC143C] w-12 h-12 animate-pulse" fill="currentColor" />
            </div>
            
            {/* Small Hearts Around */}
            <div className="absolute -top-2 -right-2 text-[#FFD700] text-lg animate-bounce" style={{ animationDelay: '0.2s' }}>
              ❤️
            </div>
            <div className="absolute -bottom-2 -left-2 text-[#DC143C] text-lg animate-bounce" style={{ animationDelay: '0.4s' }}>
              ❤️
            </div>
            <div className="absolute top-1/2 -right-6 text-[#FFD700] text-sm animate-bounce" style={{ animationDelay: '0.6s' }}>
              ❤️
            </div>
            <div className="absolute top-1/2 -left-6 text-[#DC143C] text-sm animate-bounce" style={{ animationDelay: '0.8s' }}>
              ❤️
            </div>
          </div>
        </div>

        {/* Elegant Loading Text */}
        <div className="mb-8 h-16 flex items-center justify-center">
          <div className="relative">
            <p className="text-[#FFD700]/90 text-lg md:text-xl font-light tracking-wide transition-all duration-500">
              {loadingTexts[currentText]}
            </p>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent animate-pulse"></div>
          </div>
        </div>

        {/* Love-themed Decorative Elements */}
        <div className="flex items-center justify-center gap-6 md:gap-8">
          <div className="flex items-center gap-2 animate-bounce" style={{ animationDelay: '0.2s' }}>
            <span className="text-[#FFD700] text-xl">❤️</span>
            <span className="text-[#FFD700]/60 text-sm font-light">Love</span>
          </div>
          <div className="flex items-center gap-2 animate-bounce" style={{ animationDelay: '0.4s' }}>
            <span className="text-[#DC143C] text-xl">💕</span>
            <span className="text-[#DC143C]/60 text-sm font-light">Joy</span>
          </div>
          <div className="flex items-center gap-2 animate-bounce" style={{ animationDelay: '0.6s' }}>
            <span className="text-[#FFD700] text-xl">💖</span>
            <span className="text-[#FFD700]/60 text-sm font-light">Life</span>
          </div>
        </div>

        {/* Bottom Decorative Line */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}; 