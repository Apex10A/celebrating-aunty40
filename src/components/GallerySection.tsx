import React from 'react';
import { Camera, Heart, Star } from 'lucide-react';

export const GallerySection = () => {
  const galleryImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop&crop=face",
      alt: "Wedding Day",
      category: "Wedding"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&auto=format&fit=crop",
      alt: "Anniversary Celebration",
      category: "Anniversary"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&auto=format&fit=crop",
      alt: "Family Moments",
      category: "Family"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&auto=format&fit=crop",
      alt: "Travel Adventures",
      category: "Travel"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop&crop=face",
      alt: "Special Occasions",
      category: "Special"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&auto=format&fit=crop",
      alt: "Daily Life",
      category: "Daily"
    }
  ];

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FFD700]/5 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-[#FFD700]"></div>
            <Camera className="text-[#FFD700] w-5 h-5 sm:w-6 sm:h-6" />
            <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-[#FFD700]"></div>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#DC143C] mb-4 sm:mb-6 font-serif">
            Our Journey
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-[#FFD700]/80 max-w-2xl mx-auto font-light tracking-wide">
            A collection of precious moments from our 15 years of marriage and life together.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-2xl border border-[#FFD700]/20 bg-black/20 backdrop-blur-sm hover:border-[#FFD700]/40 transition-all duration-500 transform hover:scale-105"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <div className="space-y-2 sm:space-y-3">
                  <h3 className="text-lg sm:text-xl font-bold text-[#FFD700] font-serif">
                    {image.alt}
                  </h3>
                  <p className="text-sm sm:text-base text-[#FFD700]/70 font-light">
                    {image.category}
                  </p>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <Heart className="text-[#DC143C] w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ transitionDelay: '0.1s' }}>
                <Star className="text-[#FFD700] w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12 sm:mt-16 lg:mt-20">
          <a
            href="/gallery"
            className="inline-flex items-center gap-2 sm:gap-3 group px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-full text-sm sm:text-base lg:text-lg font-medium tracking-wider text-[#FFD700] border border-[#FFD700]/30 hover:border-[#FFD700] bg-black/30 backdrop-blur-sm transition-all duration-500 transform hover:scale-105"
          >
            <span>View Full Gallery</span>
            <Camera className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />
          </a>
        </div>
      </div>
    </section>
  );
}; 