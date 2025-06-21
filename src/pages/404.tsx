import React from 'react';
import Link from 'next/link';
import { Heart, Home, ArrowLeft } from 'lucide-react';
import { GoldParticles } from '../components/GoldParticles';

export default function Custom404() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center relative overflow-hidden px-4 sm:px-6">
      <GoldParticles />
      
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <div className="relative inline-block animate-fade-in">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#FFD700] to-[#DC143C] opacity-30 blur-xl"></div>
          <h1 className="relative text-8xl sm:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#DC143C] font-serif">
            404
          </h1>
        </div>
        
        <div className="mt-8 sm:mt-12 space-y-4 sm:space-y-6">
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            <Heart className="text-[#FFD700] animate-pulse" size={20} />
            <h2 className="text-xl sm:text-2xl text-[#FFD700]/90 font-light tracking-wider">
              Oops! Page not found
            </h2>
            <Heart className="text-[#FFD700] animate-pulse" size={20} />
          </div>
          
          <p className="text-base sm:text-lg text-[#FFD700]/70 mb-12 font-light">
            The page you're looking for seems to have wandered off to celebrate elsewhere.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <Link
              href="/"
              className="group flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#FFD700] to-[#DC143C] text-black transform hover:scale-105 transition-all duration-500"
            >
              <Home className="transition-transform group-hover:scale-110" size={20} />
              <span className="font-medium">Go Home</span>
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="group flex items-center justify-center gap-2 px-8 py-4 rounded-full text-[#FFD700] border border-[#FFD700]/30 hover:border-[#FFD700] transition-colors duration-500 transform hover:scale-105"
            >
              <ArrowLeft className="transition-transform group-hover:scale-110" size={20} />
              <span className="font-medium">Go Back</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <p className="text-[#FFD700]/40 text-sm">
          Don't worry, the celebration is still on! 🎉
        </p>
      </div>
    </div>
  );
} 