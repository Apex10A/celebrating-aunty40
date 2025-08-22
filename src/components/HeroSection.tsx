import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { GoldParticles } from './GoldParticles';

export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] sm:min-h-screen flex items-center overflow-hidden px-4 sm:px-6 md:px-8 pt-28 sm:pt-36 md:pt-40 pb-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a] to-black">
        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(70% 50% at 50% 30%, rgba(255,215,0,0.07) 0%, rgba(255,215,0,0.03) 35%, rgba(0,0,0,0.65) 100%)'
        }} />
      </div>

      <GoldParticles />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 gap-x-8 lg:gap-x-12 items-center">
          {/* Left: Text */}
          <div className="text-center lg:text-left space-y-6 sm:space-y-8">
            {/* Big Title */}
            <div className="relative inline-block animate-fade-in">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#FFD700] to-[#DC143C] opacity-25 blur-xl" />
              <h1 className="relative leading-tight">
                <span className="block text-[66px] sm:text-[80px] lg:text-[120px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#DC143C] leading-none font-serif">
                  40
                </span>
                <span className="block text-4xl sm:text-4xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700]/90 to-[#DC143C]/90 mt-1 lg:mt-2 font-serif">
                  & 15
                </span>
              </h1>
            </div>

            {/* Couple Names */}
            <div className="animate-fade-in-delayed">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-light font-serif flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-1.5 sm:gap-3 lg:gap-6">
                <span className="relative">
                  <span className="absolute -inset-1 bg-gradient-to-r from-[#DC143C]/20 to-[#FFD700]/20 blur-md rounded-lg" />
                  <span className="relative bg-gradient-to-r font-decorative from-[#DC143C] to-[#FFD700] bg-clip-text text-transparent px-2.5 py-1 lg:px-4 lg:py-2 text-5xl">
                    Funmbi
                  </span>
                </span>
                <span className="text-base sm:text-xl lg:text-2xl text-[#FFD700]/70">&</span>
                <span className="relative">
                  <span className="absolute -inset-1 bg-gradient-to-r from-[#FFD700]/20 to-[#DC143C]/20 blur-md rounded-lg" />
                  <span className="relative bg-gradient-to-r font-decorative from-[#FFD700] to-[#DC143C] bg-clip-text text-transparent px-2.5 py-1 lg:px-4 lg:py-2 text-5xl">
                    Tope
                  </span>
                </span>
              </h2>
            </div>

            {/* Subtitle */}
            <div className="space-y-3 sm:space-y-4 animate-fade-in-delayed">
              <div className="h-px w-24 sm:w-32 lg:w-40 mx-auto lg:mx-0 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent" />
              <h3 className="text-lg sm:text-2xl lg:text-3xl font-light tracking-[0.18em] sm:tracking-[0.2em] text-[#FFD700]/90 uppercase">
                A Double Celebration
              </h3>
              <div className="h-px w-24 sm:w-32 lg:w-40 mx-auto lg:mx-0 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent" />
            </div>

            {/* Supporting text */}
            <div className="space-y-5 sm:space-y-6 animate-fade-in-delayed">
              <div className="space-y-2 sm:space-y-3">
                <p className="text-base sm:text-lg lg:text-xl text-[#FFD700]/85 font-light tracking-wide max-w-md sm:max-w-lg mx-auto lg:mx-0">
                  Celebrating Funmbi's 40th Birthday
                </p>
                <p className="text-base sm:text-lg lg:text-xl text-[#FFD700]/80 font-light tracking-wide max-w-md sm:max-w-lg mx-auto lg:mx-0">
                  & Our 15 Years of Marriage
                </p>
              </div>

              {/* Info Pills */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 lg:gap-6">
                <div className="group w-full mx-auto sm:mx-0 sm:w-auto max-w-xs sm:max-w-none flex items-center justify-center sm:justify-start gap-2 sm:gap-3 bg-black/50 backdrop-blur-lg px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-lg border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all duration-500">
                  <Calendar className="text-[#FFD700] transition-transform group-hover:scale-110 duration-300 min-w-[20px] sm:min-w-[24px]" size={20} />
                  <span className="text-sm sm:text-base lg:text-lg font-light text-[#FFD700]/90 tracking-wider whitespace-nowrap">
                    This December
                  </span>
                </div>
                <div className="group w-full mx-auto sm:mx-0 sm:w-auto max-w-xs sm:max-w-none flex items-center justify-center sm:justify-start gap-2 sm:gap-3 bg-black/50 backdrop-blur-lg px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-lg border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all duration-500">
                  <MapPin className="text-[#FFD700] transition-transform group-hover:scale-110 duration-300 min-w-[20px] sm:min-w-[24px]" size={20} />
                  <span className="text-sm sm:text-base lg:text-lg font-light text-[#FFD700]/90 tracking-wider">
                    Surulere, Lagos
                  </span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center lg:justify-start">
                <a
                  href="/rsvp"
                  aria-label="Go to RSVP page"
                  className="w-[85%] mx-auto sm:mx-0 sm:w-auto group relative px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 overflow-hidden rounded-xl transform hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 bg-gradient-to-r from-[#FFD700] to-[#E6C200] text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700]/70"
                >
                  <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  <span className="relative z-10 text-sm sm:text-base lg:text-lg font-semibold tracking-wider">
                    RSVP Now
                  </span>
                </a>
                <a
                  href="/gallery"
                  aria-label="View gallery"
                  className="w-[85%] mx-auto sm:mx-0 sm:w-auto group px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-xl text-sm sm:text-base lg:text-lg font-medium tracking-wider text-[#FFD700] border border-[#FFD700]/40 hover:border-[#FFD700] hover:bg-[#FFD700]/10 transition-colors duration-300 transform hover:scale-[1.02] active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700]/50"
                >
                  View Gallery
                </a>
              </div>
            </div>
          </div>

          {/* Right: Image */}
          <div className="flex justify-center lg:justify-end animate-fade-in-delayed">
            <div className="relative group">
              {/* Image Container */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[520px] lg:h-[520px] rounded-full overflow-hidden shadow-[0_0_60px_-15px_rgba(255,215,0,0.25)] border-4 border-[#FFD700]/20 cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&auto=format&fit=crop&crop=face"
                  alt="Celebration portrait of Funmbi & Tope"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#FFD700]/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#FFD700] rounded-full animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-[#DC143C] rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
              <div className="absolute top-1/2 -right-8 w-4 h-4 bg-[#FFD700] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute top-1/2 -left-8 w-3 h-3 bg-[#DC143C] rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-5 sm:bottom-8 lg:bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-[#FFD700]/30 rounded-full flex justify-center">
          <div className="w-1 h-2 sm:h-3 bg-[#FFD700] rounded-full mt-1 sm:mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};