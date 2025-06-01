import React from 'react';
import { Heart, Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { GoldParticles } from '../components/GoldParticles';

const Custom404 = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] relative flex items-center justify-center px-4 sm:px-6">
      <GoldParticles />
      
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <div className="mb-8 sm:mb-12 space-y-4">
          <div className="relative inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#FFD700] to-[#FFA500] opacity-30 blur-xl"></div>
            <h1 className="relative text-8xl sm:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FFA500] font-serif">
              404
            </h1>
          </div>
          
          <div className="flex justify-center items-center gap-2">
            <Heart className="text-[#FFD700] animate-pulse" size={20} />
            <h2 className="text-xl sm:text-2xl text-[#FFD700]/90 font-light tracking-wider">
              Page Not Found
            </h2>
            <Heart className="text-[#FFD700] animate-pulse" size={20} />
          </div>
        </div>
        
        <p className="text-base sm:text-lg text-[#FFD700]/70 mb-12 font-light">
          Oops! It seems you've wandered into the wrong celebration. Let's get you back to the party!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="group flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black transform hover:scale-105 transition-all duration-500"
          >
            <Home className="transition-transform group-hover:scale-110 duration-300" size={20} />
            <span className="font-medium">Back to Celebration</span>
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="group flex items-center justify-center gap-2 px-8 py-4 rounded-full text-[#FFD700] border border-[#FFD700]/30 hover:border-[#FFD700] transition-colors duration-500 transform hover:scale-105"
          >
            <ArrowLeft className="transition-transform group-hover:scale-110 duration-300" size={20} />
            <span className="font-medium">Go Back</span>
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-8 inset-x-0 text-center">
        <p className="text-[#FFD700]/40 text-sm">
          © 2024 - 40 & 15 Years Celebration
        </p>
      </div>
    </div>
  );
};

export default Custom404; 