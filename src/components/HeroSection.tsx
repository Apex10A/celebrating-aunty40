import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { GoldParticles } from './GoldParticles';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6">
      <div className="absolute inset-0 bg-[#0a0a0a]">
        <div className=""></div>
      </div>
      
      <GoldParticles />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-center lg:text-left space-y-6 sm:space-y-8">
            <div className="relative inline-block animate-fade-in">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#FFD700] to-[#DC143C] opacity-30 blur-xl"></div>
              <h1 className="relative">
                <span className="text-[60px] sm:text-[80px] lg:text-[120px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#DC143C] leading-none font-serif">
                  40
                </span>
                <span className=" text-2xl sm:text-4xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700]/90 to-[#DC143C]/90 mt-2 lg:mt-4 font-serif">
                  & 15
                </span>
              </h1>
            </div>
            
            {/* Couple Names */}
            <div className="animate-fade-in-delayed">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light font-serif flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 sm:gap-3 lg:gap-6">
                <span className="relative group">
                  <span className="absolute -inset-1 bg-gradient-to-r from-[#DC143C]/20 to-[#FFD700]/20 blur-md rounded-lg"></span>
                  <span className="relative bg-gradient-to-r font-decorative from-[#DC143C] to-[#FFD700] bg-clip-text text-transparent px-3 py-1 lg:px-4 lg:py-2">Funmbi</span>
                </span>
                <span className="text-lg sm:text-xl lg:text-2xl text-[#FFD700]/70">&</span>
                <span className="relative group">
                  <span className="absolute -inset-1 bg-gradient-to-r from-[#FFD700]/20 to-[#DC143C]/20 blur-md rounded-lg"></span>
                  <span className="relative bg-gradient-to-r font-decorative from-[#FFD700] to-[#DC143C] bg-clip-text text-transparent px-3 py-1 lg:px-4 lg:py-2">Tope</span>
                </span>
              </h2>
            </div>

            {/* Subtitle */}
            <div className="space-y-3 sm:space-y-4 animate-fade-in-delayed">
              <div className="h-px w-24 sm:w-32 lg:w-40 mx-auto lg:mx-0 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-light tracking-[0.2em] text-[#FFD700]/90 uppercase">
                A Double Celebration
              </h2>
              <div className="h-px w-24 sm:w-32 lg:w-40 mx-auto lg:mx-0 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></div>
            </div>

            {/* Content */}
            <div className="space-y-6 sm:space-y-8 animate-fade-in-delayed">
              <div className="space-y-2 sm:space-y-4">
                <p className="text-base sm:text-lg lg:text-xl text-[#FFD700]/80 font-light tracking-wide max-w-lg mx-auto lg:mx-0">
                  Celebrating Funmbi's 40th Birthday
                </p>
                <p className="text-base sm:text-lg lg:text-xl text-[#FFD700]/80 font-light tracking-wide max-w-lg mx-auto lg:mx-0">
                  & Our 15 Years of Marriage
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 lg:gap-6">
                <div className="group w-full sm:w-auto flex items-center gap-2 sm:gap-3 bg-black/50 backdrop-blur-lg px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-full border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all duration-500">
                  <Calendar className="text-[#FFD700] transition-transform group-hover:scale-110 duration-300 min-w-[20px] sm:min-w-[24px]" size={20} />
                  <span className="text-sm sm:text-base lg:text-lg font-light text-[#FFD700]/90 tracking-wider whitespace-nowrap">This December</span>
                </div>
                <div className="group w-full sm:w-auto flex items-center gap-2 sm:gap-3 bg-black/50 backdrop-blur-lg px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-full border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all duration-500">
                  <MapPin className="text-[#FFD700] transition-transform group-hover:scale-110 duration-300 min-w-[20px] sm:min-w-[24px]" size={20} />
                  <span className="text-sm sm:text-base lg:text-lg font-light text-[#FFD700]/90 tracking-wider">Surulere, Lagos</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center lg:justify-start">
                <a
                  href="/rsvp"
                  className="w-full sm:w-auto group relative px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 overflow-hidden rounded-full transform hover:scale-105 transition-all duration-500 bg-[#FFD700]"
                >
                  <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  <span className="relative z-10 text-sm sm:text-base lg:text-lg font-medium tracking-wider">RSVP Now</span>
                </a>
                <a
                  href="/gallery"
                  className="w-full sm:w-auto group px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-full text-sm sm:text-base lg:text-lg font-medium tracking-wider text-[#FFD700] border border-[#FFD700]/30 hover:border-[#FFD700] transition-colors duration-500 transform hover:scale-105"
                >
                  View Gallery
                </a>
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end animate-fade-in-delayed">
            <div className="relative group">
              {/* Image Container */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl border-4 border-[#FFD700]/20">
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&crop=face"
                  alt="Funmbi & Tope"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#FFD700]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#FFD700] rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-[#DC143C] rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute top-1/2 -right-8 w-4 h-4 bg-[#FFD700] rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/2 -left-8 w-3 h-3 bg-[#DC143C] rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-8 lg:bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-[#FFD700]/30 rounded-full flex justify-center">
          <div className="w-1 h-2 sm:h-3 bg-[#FFD700] rounded-full mt-1 sm:mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}; 