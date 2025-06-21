import React from 'react';
import { Phone, Mail, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <div className="relative bg-[#0a0a0a] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FFD700]/5 to-transparent"></div>
      
      <div className="relative z-10 py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#DC143C] mb-8 sm:mb-12 font-serif fade-in">
            Get In Touch
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
            <div className="group bg-black/30 backdrop-blur-lg p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl hover:shadow-[#FFD700]/10 transition-all duration-500 border border-[#FFD700]/10 hover:border-[#FFD700]/30 fade-in">
              <Phone className="mx-auto text-[#FFD700] mb-4 sm:mb-6 transform group-hover:scale-110 transition-transform duration-500" size={28} />
              <h3 className="text-xl sm:text-2xl font-bold text-[#FFD700] mb-2 sm:mb-4">Call Us</h3>
              <p className="text-[#FFD700]/70 font-light text-sm sm:text-base">+234 xxx xxx xxxx</p>
            </div>
            
            <div className="group bg-black/30 backdrop-blur-lg p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl hover:shadow-[#FFD700]/10 transition-all duration-500 border border-[#FFD700]/10 hover:border-[#FFD700]/30 fade-in">
              <Mail className="mx-auto text-[#FFD700] mb-4 sm:mb-6 transform group-hover:scale-110 transition-transform duration-500" size={28} />
              <h3 className="text-xl sm:text-2xl font-bold text-[#FFD700] mb-2 sm:mb-4">Email Us</h3>
              <p className="text-[#FFD700]/70 font-light text-sm sm:text-base">celebration@example.com</p>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="py-12 sm:py-20 px-4 sm:px-6 bg-[#0a0a0a] border-t border-[#FFD700]/10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4 sm:mb-6">
            <Heart className="text-[#FFD700] mr-2 sm:mr-3" size={20} />
            <span className="text-xl sm:text-2xl font-bold text-[#FFD700]">40 & 15 Years Celebration</span>
            <Heart className="text-[#FFD700] ml-2 sm:ml-3" size={20} />
          </div>
          <p className="text-[#FFD700]/60 mb-3 sm:mb-4 font-light text-sm sm:text-base">
            Join us in celebrating this beautiful milestone
          </p>
          <p className="text-[#FFD700]/40 text-xs sm:text-sm">
            © 2024 - Crafted with love for a golden celebration
          </p>
        </div>
      </footer>
    </div>
  );
}; 