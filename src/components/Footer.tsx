import React from 'react';
import { Heart, Phone, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <>
      {/* Contact Section */}
      <section className="py-16 sm:py-32 px-4 sm:px-6 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FFA500] mb-8 sm:mb-12 font-serif fade-in">
            Get In Touch
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
            <a href="tel:+234xxxxxxxx" className="group bg-black/40 backdrop-blur-lg cursor-pointer p-6 sm:p-10 rounded-2xl sm:rounded-3xl shadow-2xl hover:shadow-[#FFD700]/10 transition-all duration-500 border border-[#FFD700]/10 hover:border-[#FFD700]/30 fade-in">
              <Phone className="mx-auto text-[#FFD700] mb-4 sm:mb-6 transform group-hover:scale-110 transition-transform duration-500" size={28} />
              <h3 className="text-xl sm:text-2xl font-bold text-[#FFD700] mb-2 sm:mb-4">Call Us</h3>
              <p className="text-[#FFD700]/70 font-light text-sm sm:text-base">+234 xxx xxx xxxx</p>
            </a>
            
            <a href="mailto:celebration@example.com" className="group bg-black/40 backdrop-blur-lg cursor-pointer p-6 sm:p-10 rounded-2xl sm:rounded-3xl shadow-2xl hover:shadow-[#FFD700]/10 transition-all duration-500 border border-[#FFD700]/10 hover:border-[#FFD700]/30 fade-in">
              <Mail className="mx-auto text-[#FFD700] mb-4 sm:mb-6 transform group-hover:scale-110 transition-transform duration-500" size={28} />
              <h3 className="text-xl sm:text-2xl font-bold text-[#FFD700] mb-2 sm:mb-4">Email Us</h3>
              <p className="text-[#FFD700]/70 font-light text-sm sm:text-base">celebration@example.com</p>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 sm:py-20 px-4 sm:px-6 bg-[#0a0a0a] border-t border-[#FFD700]/10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center items-center mb-6 sm:mb-8">
            <Heart className="text-[#FFD700] mr-2 sm:mr-3" size={20} />
            <span className="text-xl sm:text-2xl font-bold text-[#FFD700]">40 & 15 Years Celebration</span>
            <Heart className="text-[#FFD700] ml-2 sm:ml-3" size={20} />
          </div>
          <p className="text-[#FFD700]/60 mb-3 sm:mb-4 font-light text-sm sm:text-base">
            Creating timeless memories in Lagos, Nigeria
          </p>
          <p className="text-[#FFD700]/40 text-xs sm:text-sm">
            © 2024 - Crafted with love for a golden celebration
          </p>
        </div>
      </footer>
    </>
  );
}; 