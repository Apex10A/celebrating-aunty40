import React, { useState, useEffect } from 'react';
import { Heart, Star, Sparkles } from 'lucide-react';

export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [currentText, setCurrentText] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  const loadingTexts = [
    "Preparing the celebration...",
    "Gathering memories...",
    "Setting up the magic...",
    "Almost ready...",
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
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#FFD700] rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
        {[...Array(10)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute w-0.5 h-0.5 bg-[#DC143C] rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center">
        {/* Main Title with Glow Effect */}
        <div className="mb-12 relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-[#FFD700]/20 to-[#DC143C]/20 blur-2xl rounded-full"></div>
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
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
          </div>
          <div className="absolute -top-8 left-0 right-0 text-center">
            <span className="text-[#FFD700]/80 text-sm font-light tracking-wider">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Animated Loading Spinner */}
        <div className="relative mb-12">
          <div className="relative w-24 h-24 mx-auto">
            {/* Outer Ring */}
            <div className="absolute inset-0 border-4 border-[#FFD700]/30 rounded-full">
              <div className="absolute inset-0 border-4 border-transparent border-t-[#FFD700] rounded-full animate-spin" style={{ animationDuration: '2s' }} />
            </div>
            
            {/* Middle Ring */}
            <div className="absolute inset-2 border-4 border-[#DC143C]/20 rounded-full">
              <div className="absolute inset-0 border-4 border-transparent border-t-[#DC143C] rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
            </div>
            
            {/* Inner Ring */}
            <div className="absolute inset-4 border-4 border-[#FFD700]/10 rounded-full">
              <div className="absolute inset-0 border-4 border-transparent border-t-[#FFD700] rounded-full animate-spin" style={{ animationDuration: '1s' }} />
            </div>
            
            {/* Center Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Heart className="text-[#DC143C] w-8 h-8 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Animated Loading Text */}
        <div className="mb-8 h-16 flex items-center justify-center">
          <div className="relative">
            <p className="text-[#FFD700]/90 text-lg md:text-xl font-light tracking-wide transition-all duration-500">
              {loadingTexts[currentText]}
            </p>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent animate-pulse"></div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="flex items-center justify-center gap-4 md:gap-6">
          <div className="flex items-center gap-2 animate-bounce" style={{ animationDelay: '0.2s' }}>
            <Star className="text-[#FFD700] w-5 h-5" />
            <span className="text-[#FFD700]/60 text-sm font-light">Love</span>
          </div>
          <div className="flex items-center gap-2 animate-bounce" style={{ animationDelay: '0.4s' }}>
            <Sparkles className="text-[#DC143C] w-5 h-5" />
            <span className="text-[#DC143C]/60 text-sm font-light">Joy</span>
          </div>
          <div className="flex items-center gap-2 animate-bounce" style={{ animationDelay: '0.6s' }}>
            <Heart className="text-[#FFD700] w-5 h-5" />
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