import React from 'react';
import { Camera, Upload, Image as ImageIcon } from 'lucide-react';

const galleryImages = [
  'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500',
  'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500',
  'https://images.unsplash.com/photo-1546484396-fb3fc6f95077?w=500',
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=500',
  'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500',
  'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500'
];

export const GallerySection = () => {
  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 bg-[#0a0a0a] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FFD700]/5 to-transparent"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <Camera className="mx-auto text-[#FFD700] mb-6 transform hover:scale-110 transition-transform duration-500" size={36} />
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#DC143C] mb-6 sm:mb-8 font-serif">
          Memory Gallery
        </h2>
        
        <div className="h-px w-32 sm:w-40 mx-auto bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mb-6 sm:mb-8"></div>
        <p className="text-base sm:text-lg md:text-xl text-[#FFD700]/80 font-light tracking-wide px-4">
          Share your precious moments and memories from our celebration
        </p>
        
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Upload Card */}
          <div className="group bg-black/30 backdrop-blur-lg p-6 sm:p-8 rounded-2xl border border-[#FFD700]/10 hover:border-[#FFD700]/30 transition-all duration-500 cursor-pointer transform hover:scale-105">
            <Upload className="mx-auto text-[#FFD700] mb-4 sm:mb-6 transform group-hover:scale-110 transition-transform duration-500" size={32} />
            <h3 className="text-xl sm:text-2xl font-bold text-[#FFD700] mb-2 sm:mb-4">Upload Photos</h3>
            <p className="text-base sm:text-lg text-[#FFD700] font-medium tracking-wide">
              Share your memories
            </p>
            <p className="text-sm sm:text-base text-[#FFD700]/70 font-light mt-2">
              Upload photos from the celebration
            </p>
          </div>
          
          {/* View Gallery Card */}
          <div className="group bg-black/30 backdrop-blur-lg p-6 sm:p-8 rounded-2xl border border-[#FFD700]/10 hover:border-[#FFD700]/30 transition-all duration-500 cursor-pointer transform hover:scale-105">
            <ImageIcon className="mx-auto text-[#FFD700] mb-4 sm:mb-6 transform group-hover:scale-110 transition-transform duration-500" size={32} />
            <h3 className="text-xl sm:text-2xl font-bold text-[#FFD700] mb-2 sm:mb-4">View Gallery</h3>
            <p className="text-base sm:text-lg text-[#FFD700] font-medium tracking-wide">
              Browse memories
            </p>
            <p className="text-sm sm:text-base text-[#FFD700]/70 font-light mt-2">
              See all shared photos
            </p>
          </div>
          
          {/* Memories Card */}
          <div className="group bg-black/30 backdrop-blur-lg p-6 sm:p-8 rounded-2xl border border-[#FFD700]/10 hover:border-[#FFD700]/30 transition-all duration-500 cursor-pointer transform hover:scale-105">
            <Camera className="mx-auto text-[#FFD700] mb-4 sm:mb-6 transform group-hover:scale-110 transition-transform duration-500" size={32} />
            <h3 className="text-xl sm:text-2xl font-bold text-[#FFD700] mb-2 sm:mb-4">Our Memories</h3>
            <p className="text-base sm:text-lg text-[#FFD700] font-medium tracking-wide">
              Special moments
            </p>
            <p className="text-sm sm:text-base text-[#FFD700]/70 font-light mt-2">
              Curated celebration photos
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}; 