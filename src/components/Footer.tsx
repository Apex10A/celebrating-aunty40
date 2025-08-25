import React from 'react';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="relative bg-[#0a0a0a] border-t border-[#FFD700]/20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FFD700]/5 to-transparent"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 lg:gap-16">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#DC143C] font-serif">
                40 & 15
              </h3>
              <div className="h-px w-16 sm:w-20 bg-gradient-to-r from-[#FFD700] to-transparent"></div>
              <p className="text-base sm:text-lg text-[#FFD700]/80 font-light leading-relaxed max-w-md">
                Celebrating Funmbi's 40th Birthday and our 15 years of marriage. 
                A journey of love, growth, and beautiful memories.
              </p>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3">
              <Heart className="text-[#DC143C] w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
              <span className="text-sm sm:text-base text-[#FFD700]/70 font-light">
                Made with love for our special celebration
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6 sm:space-y-8">
            <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#FFD700] font-serif">
              Quick Links
            </h4>
            <div className="space-y-3 sm:space-y-4">
              <a 
                href="/" 
                className="block text-[#FFD700]/70 hover:text-[#FFD700] transition-colors duration-300 font-light"
              >
                Home
              </a>
              <a 
                href="/our-story" 
                className="block text-[#FFD700]/70 hover:text-[#FFD700] transition-colors duration-300 font-light"
              >
                Our Story
              </a>
              <a 
                href="/gallery" 
                className="block text-[#FFD700]/70 hover:text-[#FFD700] transition-colors duration-300 font-light"
              >
                Gallery
              </a>
              <a 
                href="/rsvp" 
                className="block text-[#FFD700]/70 hover:text-[#FFD700] transition-colors duration-300 font-light"
              >
                RSVP
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6 sm:space-y-8">
            <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#FFD700] font-serif">
              Contact
            </h4>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <Mail className="text-[#FFD700] w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base text-[#FFD700]/70 font-light">
                  bandelechristiana@gmail.com
                </span>
              </div>
              <div className="flex items-center gap-3 sm:gap-4">
                <Phone className="text-[#FFD700] w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base text-[#FFD700]/70 font-light">
                  +234 705 566 1758
                </span>
              </div>
              <div className="flex items-center gap-3 sm:gap-4">
                <MapPin className="text-[#FFD700] w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base text-[#FFD700]/70 font-light">
                  Mayfair hall: Otunba jobi-fele way, Alausa, Ikeja.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 sm:mt-16 lg:mt-20 pt-8 sm:pt-12 border-t border-[#FFD700]/20">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
            <p className="text-sm sm:text-base text-[#FFD700]/60 font-light text-center sm:text-left">
              © 2025 Funmbi & Tope. All rights reserved.
            </p>
            <div className="flex items-center gap-4 sm:gap-6">
              <span className="text-sm sm:text-base text-[#FFD700]/60 font-light">
                December 27, 2025
              </span>
              <div className="w-1 h-1 bg-[#FFD700]/40 rounded-full"></div>
              <span className="text-sm sm:text-base text-[#FFD700]/60 font-light">
                Ikeja, Lagos. Nigeria
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}; 