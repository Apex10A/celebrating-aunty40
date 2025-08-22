import React from 'react';
import { Camera, Heart, Star } from 'lucide-react';

export const GallerySection = () => {
  const galleryImages = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop&crop=face',
      alt: 'Wedding Day',
      category: 'Wedding',
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&auto=format&fit=crop',
      alt: 'Anniversary Celebration',
      category: 'Anniversary',
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&auto=format&fit=crop',
      alt: 'Family Moments',
      category: 'Family',
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&auto=format&fit=crop',
      alt: 'Travel Adventures',
      category: 'Travel',
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop&crop=face',
      alt: 'Special Occasions',
      category: 'Special',
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&auto=format&fit=crop',
      alt: 'Daily Life',
      category: 'Daily',
    },
  ];

  return (
    <section className="relative py-14 sm:py-18 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FFD700]/5 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14 lg:mb-18">
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-[#FFD700]" />
            <Camera className="text-[#FFD700] w-5 h-5 sm:w-6 sm:h-6" />
            <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-[#FFD700]" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#DC143C] mb-3 sm:mb-5 font-serif">
            Our Journey
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-[#FFD700]/80 max-w-2xl mx-auto font-light tracking-wide">
            A collection of precious moments from our 15 years of marriage and life together.
          </p>
        </div>

        {/* Gallery Grid - smaller items on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl border border-[#FFD700]/20 bg-black/20 backdrop-blur-sm hover:border-[#FFD700]/40 transition-all duration-300 will-change-transform hover:scale-[1.02]"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              {/* Image */}
              <div className="aspect-square overflow-hidden relative cursor-pointer">
                <img
                  src={image?.src}
                  alt={image?.alt}
                  loading="lazy"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Gradient overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Category badge */}
                <span className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-full text-[10px] sm:text-xs tracking-wide bg-black/50 border border-[#FFD700]/30 text-[#FFD700]">
                  {image?.category}
                </span>
              </div>

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 translate-y-0 sm:translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <div className="space-y-1 sm:space-y-2">
                  <h3 className="text-sm sm:text-lg font-semibold sm:font-bold text-[#FFD700] font-serif">
                    {image.alt}
                  </h3>
                  <p className="hidden sm:block text-sm text-[#FFD700]/70 font-light">
                    {image.category}
                  </p>
                </div>
              </div>

              {/* Decorative Elements - show on larger screens */}
              <div className="hidden sm:block absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Heart aria-hidden className="text-[#DC143C] w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div
                className="hidden sm:block absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ transitionDelay: '0.1s' }}
              >
                <Star aria-hidden className="text-[#FFD700] w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-10 sm:mt-14 lg:mt-18">
          <a
            href="/gallery"
            aria-label="View full gallery"
            className="inline-flex items-center gap-2 sm:gap-3 group px-5 sm:px-8 lg:px-10 py-2.5 sm:py-4 lg:py-5 rounded-full text-xs sm:text-base lg:text-base font-medium tracking-wider text-[#FFD700] border border-[#FFD700]/30 hover:border-[#FFD700] bg-black/30 backdrop-blur-sm transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700]/50"
          >
            <span>View Full Gallery</span>
            <Camera className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />
          </a>
        </div>
      </div>
    </section>
  );
};