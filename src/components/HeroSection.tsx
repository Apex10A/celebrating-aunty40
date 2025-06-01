import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { GoldParticles } from './GoldParticles';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFD700]/10 via-transparent to-transparent opacity-30"></div>
      </div>
      
      <GoldParticles />
      
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className="mb-16 space-y-12">
          {/* Main Title */}
          <div className="relative inline-block animate-fade-in">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#FFD700] to-[#FFA500] opacity-30 blur-xl"></div>
            <h1 className="relative">
              <span className="block text-[120px] md:text-[180px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FFA500] leading-none font-serif">
                40
              </span>
              <span className="block text-6xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700]/90 to-[#FFA500]/90 mt-4 font-serif">
                Years
              </span>
            </h1>
          </div>
          
          {/* Subtitle */}
          <div className="space-y-6 animate-fade-in-delayed">
            <div className="h-px w-40 mx-auto bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></div>
            <h2 className="text-3xl md:text-4xl font-light tracking-[0.2em] text-[#FFD700]/90 uppercase">
              Of Excellence
            </h2>
            <div className="h-px w-40 mx-auto bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></div>
          </div>

          {/* Content */}
          <div className="space-y-12 animate-fade-in-delayed">
            <p className="text-xl md:text-2xl text-[#FFD700]/80 font-light tracking-wide max-w-3xl mx-auto">
              Join us in celebrating a remarkable journey of love, wisdom, and cherished moments
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="group flex items-center gap-3 bg-black/50 backdrop-blur-lg px-8 py-4 rounded-full border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all duration-500">
                <Calendar className="text-[#FFD700] transition-transform group-hover:scale-110 duration-300" size={24} />
                <span className="text-lg font-light text-[#FFD700]/90 tracking-wider">December 2024</span>
              </div>
              <div className="group flex items-center gap-3 bg-black/50 backdrop-blur-lg px-8 py-4 rounded-full border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all duration-500">
                <MapPin className="text-[#FFD700] transition-transform group-hover:scale-110 duration-300" size={24} />
                <span className="text-lg font-light text-[#FFD700]/90 tracking-wider">Lagos, Nigeria</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="#rsvp"
                className="group relative px-10 py-5 overflow-hidden rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black transform hover:scale-105 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                <span className="relative z-10 text-lg font-medium tracking-wider">RSVP Now</span>
              </a>
              <a
                href="#gallery"
                className="group px-10 py-5 rounded-full text-lg font-medium tracking-wider text-[#FFD700] border border-[#FFD700]/30 hover:border-[#FFD700] transition-colors duration-500 transform hover:scale-105"
              >
                View Gallery
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-[#FFD700]/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-[#FFD700] rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}; 