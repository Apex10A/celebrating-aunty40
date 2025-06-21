import React from 'react';
import { Phone, Mail, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <div className="relative bg-gradient-to-br from-[#FFF8E1] via-[#FFF3E0] to-[#FFECB3] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FFD700]/10 to-transparent"></div>
      
      <div className="relative z-10 py-8 sm:py-12 lg:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#DC143C] mb-6 sm:mb-8 lg:mb-12 font-serif fade-in">
            Get In Touch
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16">
            <div className="group bg-white/80 backdrop-blur-lg p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-2xl hover:shadow-[#DC143C]/10 transition-all duration-500 border border-[#DC143C]/10 hover:border-[#DC143C]/30 fade-in">
              <Phone className="mx-auto text-[#DC143C] mb-3 sm:mb-4 lg:mb-6 transform group-hover:scale-110 transition-transform duration-500" size={24} />
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#DC143C] mb-2 sm:mb-4">Call Us</h3>
              <p className="text-[#DC143C]/70 font-light text-sm sm:text-base">+234 xxx xxx xxxx</p>
            </div>
            
            <div className="group bg-white/80 backdrop-blur-lg p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-2xl hover:shadow-[#DC143C]/10 transition-all duration-500 border border-[#DC143C]/10 hover:border-[#DC143C]/30 fade-in">
              <Mail className="mx-auto text-[#DC143C] mb-3 sm:mb-4 lg:mb-6 transform group-hover:scale-110 transition-transform duration-500" size={24} />
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#DC143C] mb-2 sm:mb-4">Email Us</h3>
              <p className="text-[#DC143C]/70 font-light text-sm sm:text-base">celebration@example.com</p>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="py-8 sm:py-12 lg:py-20 px-4 sm:px-6 bg-white/90 backdrop-blur-lg border-t border-[#DC143C]/10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center mb-3 sm:mb-4 lg:mb-6">
            <Heart className="text-[#DC143C] mr-2 sm:mr-3" size={18} />
            <span className="text-lg sm:text-xl lg:text-2xl font-bold text-[#DC143C]">40 & 15 Years Celebration</span>
            <Heart className="text-[#DC143C] ml-2 sm:ml-3" size={18} />
          </div>
          <p className="text-[#DC143C]/60 mb-2 sm:mb-3 lg:mb-4 font-light text-sm sm:text-base">
            Join us in celebrating this beautiful milestone
          </p>
          <p className="text-[#DC143C]/40 text-xs sm:text-sm">
            © 2024 - Crafted with love for a golden celebration
          </p>
        </div>
      </footer>
    </div>
  );
}; 