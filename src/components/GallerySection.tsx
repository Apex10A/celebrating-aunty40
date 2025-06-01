import React from 'react';
import { Camera } from 'lucide-react';

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
    <section id="gallery" className="py-32 px-6 bg-[#0a0a0a] relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FFD700]/5 to-transparent"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20 fade-in">
          <Camera className="mx-auto text-[#FFD700] mb-6 transform hover:scale-110 transition-transform duration-500" size={48} />
          <h2 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FFA500] mb-8 font-serif">
            Cherished Moments
          </h2>
          <div className="h-px w-40 mx-auto bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mb-8"></div>
          <p className="text-xl text-[#FFD700]/80 font-light tracking-wide">
            A glimpse into our journey of love and celebration
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative aspect-square overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-700 cursor-pointer fade-in"
            >
              <img
                src={image}
                alt={`Celebration Moment ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-[#FFD700] text-lg font-medium tracking-wide">
                    Precious Memory #{index + 1}
                  </p>
                  <p className="text-[#FFD700]/70 font-light mt-2">
                    A moment frozen in time, forever cherished
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}; 