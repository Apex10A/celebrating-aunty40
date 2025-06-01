import React from 'react';
import { Heart, Phone, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <>
      {/* Contact Section */}
      <section className="py-32 px-6 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FFA500] mb-12 font-serif fade-in">
            Get In Touch
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="group bg-black/40 backdrop-blur-lg p-10 rounded-3xl shadow-2xl hover:shadow-[#FFD700]/10 transition-all duration-500 border border-[#FFD700]/10 hover:border-[#FFD700]/30 fade-in">
              <Phone className="mx-auto text-[#FFD700] mb-6 transform group-hover:scale-110 transition-transform duration-500" size={32} />
              <h3 className="text-2xl font-bold text-[#FFD700] mb-4">Call Us</h3>
              <p className="text-[#FFD700]/70 font-light">+234 xxx xxx xxxx</p>
            </div>
            
            <div className="group bg-black/40 backdrop-blur-lg p-10 rounded-3xl shadow-2xl hover:shadow-[#FFD700]/10 transition-all duration-500 border border-[#FFD700]/10 hover:border-[#FFD700]/30 fade-in">
              <Mail className="mx-auto text-[#FFD700] mb-6 transform group-hover:scale-110 transition-transform duration-500" size={32} />
              <h3 className="text-2xl font-bold text-[#FFD700] mb-4">Email Us</h3>
              <p className="text-[#FFD700]/70 font-light">celebration@example.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 bg-[#0a0a0a] border-t border-[#FFD700]/10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center items-center mb-8">
            <Heart className="text-[#FFD700] mr-3" size={24} />
            <span className="text-2xl font-bold text-[#FFD700]">40 & 15 Years Celebration</span>
            <Heart className="text-[#FFD700] ml-3" size={24} />
          </div>
          <p className="text-[#FFD700]/60 mb-4 font-light">
            Creating timeless memories in Lagos, Nigeria
          </p>
          <p className="text-[#FFD700]/40 text-sm">
            © 2024 - Crafted with love for a golden celebration
          </p>
        </div>
      </footer>
    </>
  );
}; 