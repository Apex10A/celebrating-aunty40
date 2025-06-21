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
    <section className="relative py-12 sm:py-16 lg:py-24 px-4 sm:px-6 bg-gradient-to-br from-[#FFF8E1] via-[#FFF3E0] to-[#FFECB3] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FFD700]/10 to-transparent"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <Camera className="mx-auto text-[#DC143C] mb-4 sm:mb-6 transform hover:scale-110 transition-transform duration-500" size={32} />
        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#DC143C] mb-4 sm:mb-6 lg:mb-8 font-serif">
          Memory Gallery
        </h2>
        
        <div className="h-px w-24 sm:w-32 lg:w-40 mx-auto bg-gradient-to-r from-transparent via-[#DC143C] to-transparent mb-4 sm:mb-6 lg:mb-8"></div>
        <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-[#DC143C]/80 font-light tracking-wide px-4 max-w-3xl mx-auto">
          Share your precious moments and memories from our celebration
        </p>
        
        <div className="mt-8 sm:mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Upload Card */}
          <div className="group bg-white/80 backdrop-blur-lg p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border border-[#DC143C]/10 hover:border-[#DC143C]/30 transition-all duration-500 cursor-pointer transform hover:scale-105 shadow-lg">
            <Upload className="mx-auto text-[#DC143C] mb-3 sm:mb-4 lg:mb-6 transform group-hover:scale-110 transition-transform duration-500" size={28} />
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#DC143C] mb-2 sm:mb-4">Upload Photos</h3>
            <p className="text-sm sm:text-base lg:text-lg text-[#DC143C] font-medium tracking-wide">
              Share your memories
            </p>
            <p className="text-xs sm:text-sm lg:text-base text-[#DC143C]/70 font-light mt-2">
              Upload photos from the celebration
            </p>
          </div>
          
          {/* View Gallery Card */}
          <div className="group bg-white/80 backdrop-blur-lg p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border border-[#DC143C]/10 hover:border-[#DC143C]/30 transition-all duration-500 cursor-pointer transform hover:scale-105 shadow-lg">
            <ImageIcon className="mx-auto text-[#DC143C] mb-3 sm:mb-4 lg:mb-6 transform group-hover:scale-110 transition-transform duration-500" size={28} />
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#DC143C] mb-2 sm:mb-4">View Gallery</h3>
            <p className="text-sm sm:text-base lg:text-lg text-[#DC143C] font-medium tracking-wide">
              Browse memories
            </p>
            <p className="text-xs sm:text-sm lg:text-base text-[#DC143C]/70 font-light mt-2">
              See all shared photos
            </p>
          </div>
          
          {/* Memories Card */}
          <div className="group bg-white/80 backdrop-blur-lg p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border border-[#DC143C]/10 hover:border-[#DC143C]/30 transition-all duration-500 cursor-pointer transform hover:scale-105 shadow-lg sm:col-span-2 lg:col-span-1">
            <Camera className="mx-auto text-[#DC143C] mb-3 sm:mb-4 lg:mb-6 transform group-hover:scale-110 transition-transform duration-500" size={28} />
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#DC143C] mb-2 sm:mb-4">Our Memories</h3>
            <p className="text-sm sm:text-base lg:text-lg text-[#DC143C] font-medium tracking-wide">
              Special moments
            </p>
            <p className="text-xs sm:text-sm lg:text-base text-[#DC143C]/70 font-light mt-2">
              Curated celebration photos
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}; 