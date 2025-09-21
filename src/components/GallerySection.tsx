import React, { useState, useEffect } from 'react';
import { Camera, Heart, Star, ChevronLeft, ChevronRight, X } from 'lucide-react';

export const GallerySection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likedImages, setLikedImages] = useState<Set<number>>(new Set());
  const [imageRatings, setImageRatings] = useState<Record<number, number>>({});
  const imagesPerPage = 8;
  const galleryImages = [
    {
      id: 1,
      src: '/one.jpg',
      alt: 'Wedding Day',
      category: 'Wedding',
    },
    // {
    //   id: 2,
    //   src: '/two.jpg',
    //   alt: 'Anniversary Celebration',
    //   category: 'Anniversary',
    // },
    {
      id: 3,
      src: '/three.jpg',
      alt: 'Family Moments',
      category: 'Family',
    },
    // {
    //   id: 4,
    //   src: '/four.jpg',
    //   alt: 'Travel Adventures',
    //   category: 'Travel',
    // },
    // {
    //   id: 5,
    //   src: '/five.jpg',
    //   alt: 'Special Occasions',
    //   category: 'Special',
    // },
    // {
    //   id: 6,
    //   src: '/six.jpg',
    //   alt: 'Daily Life',
    //   category: 'Daily',
    // },
    {
      id: 7,
      src: '/seven.jpg',
      alt: 'New Beginnings',
      category: 'New',
    },
    // {
    //   id: 8,
    //   src: '/eight.jpg',
    //   alt: 'Cherished Memories',
    //   category: 'Memories',
    // },
    // {
    //   id: 9,
    //   src: '/nine.jpg',
    //   alt: 'Joyful Celebrations',
    //   category: 'Celebrations',
    // },
    {
      id: 10,
      src: '/ten.jpg',
      alt: 'Timeless Moments',
      category: 'Timeless',
    },
    // {
    //   id: 11,
    //   src: '/eleven.jpg',
    //   alt: 'Eternal Love',
    //   category: 'Love',
    // },
    {
      id: 12,
      src: '/twelve.jpg',
      alt: 'Unconditional Support',
      category: 'Support',
    },
    {
      id: 13,
      src: '/thirteen.jpg',
      alt: 'Cherished Moments',
      category: 'Memories',
    },
    // {
    //   id: 14,
    //   src: '/fouteen.jpg',
    //   alt: 'Enduring Bonds',
    //   category: 'Love',
    // },
    // {
    //   id: 15,
    //   src: '/fifteen.jpg',
    //   alt: 'Timeless Love',
    //   category: 'Love',
    // },
    {
      id: 16,
      src: '/sixteen.jpg',
      alt: 'Cherished Moments',
      category: 'Memories',
    },
    // {
    //   id: 17,
    //   src: '/seventeen.jpg',
    //   alt: 'Unforgettable Moments',
    //   category: 'Memories',
    // },
    // {
    //   id: 18,
    //   src: '/eighteen.jpg',
    //   alt: 'Lasting Impressions',
    //   category: 'Memories',
    // },
    // {
    //   id: 19,
    //   src: '/nineteen.jpg',
    //   alt: 'Timeless Memories',
    //   category: 'Memories',
    // },
    {
      id: 20,
      src: '/twenty.jpg',
      alt: 'Everlasting Love',
      category: 'Love',
    }
  ];

  // Calculate pagination
  const totalPages = Math.ceil(galleryImages.length / imagesPerPage);
  const startIndex = (currentPage - 1) * imagesPerPage;
  const endIndex = startIndex + imagesPerPage;
  const currentImages = galleryImages.slice(startIndex, endIndex);

  // Handle image click
  const handleImageClick = (image: any) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  // Handle modal close
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isModalOpen) {
        if (e.key === 'Escape') {
          closeModal();
        } else if (e.key === 'ArrowLeft') {
          navigateImage(-1);
        } else if (e.key === 'ArrowRight') {
          navigateImage(1);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, selectedImage]);

  // Navigate between images in modal
  const navigateImage = (direction: number) => {
    if (!selectedImage) return;
    
    const currentIndex = galleryImages.findIndex(img => img.id === selectedImage.id);
    const newIndex = currentIndex + direction;
    
    if (newIndex >= 0 && newIndex < galleryImages.length) {
      setSelectedImage(galleryImages[newIndex]);
    }
  };

  // Handle like/unlike functionality
  const toggleLike = (imageId: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening modal when clicking heart
    setLikedImages(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(imageId)) {
        newLiked.delete(imageId);
      } else {
        newLiked.add(imageId);
      }
      return newLiked;
    });
  };

  // Handle star rating functionality
  const toggleRating = (imageId: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening modal when clicking star
    setImageRatings(prev => ({
      ...prev,
      [imageId]: prev[imageId] ? 0 : 5 // Toggle between 0 and 5 stars
    }));
  };

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
          {currentImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl border border-[#FFD700]/20 bg-black/20 backdrop-blur-sm hover:border-[#FFD700]/40 transition-all duration-300 will-change-transform hover:scale-[1.02]"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              {/* Image */}
              <div 
                className="aspect-square overflow-hidden relative cursor-pointer"
                onClick={() => handleImageClick(image)}
              >
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
                {/* <span className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-full text-[10px] sm:text-xs tracking-wide bg-black/50 border border-[#FFD700]/30 text-[#FFD700]">
                  {image?.category}
                </span> */}
              </div>

              {/* Content Overlay */}
              {/* <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 translate-y-0 sm:translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <div className="space-y-1 sm:space-y-2">
                  <h3 className="text-sm sm:text-lg font-semibold sm:font-bold text-[#FFD700] font-serif">
                    {image.alt}
                  </h3>
                  <p className="hidden sm:block text-sm text-[#FFD700]/70 font-light">
                    {image.category}
                  </p>
                </div>
              </div> */}

              {/* Interactive Elements - show on larger screens */}
              <button
                onClick={(e) => toggleLike(image.id, e)}
                className={`hidden sm:block absolute top-3 right-3 p-1 rounded-full transition-all duration-300 hover:scale-110 ${
                  likedImages.has(image.id) 
                    ? 'opacity-100 bg-[#DC143C]/20' 
                    : 'opacity-0 group-hover:opacity-100 hover:bg-[#DC143C]/10'
                }`}
                title={likedImages.has(image.id) ? 'Unlike' : 'Like'}
              >
                <Heart 
                  className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${
                    likedImages.has(image.id) ? 'text-[#DC143C] fill-[#DC143C]' : 'text-[#DC143C]'
                  }`} 
                />
              </button>
              <button
                onClick={(e) => toggleRating(image.id, e)}
                className={`hidden sm:block absolute top-3 left-3 p-1 rounded-full transition-all duration-300 hover:scale-110 ${
                  imageRatings[image.id] 
                    ? 'opacity-100 bg-[#FFD700]/20' 
                    : 'opacity-0 group-hover:opacity-100 hover:bg-[#FFD700]/10'
                }`}
                style={{ transitionDelay: '0.1s' }}
                title={imageRatings[image.id] ? 'Remove rating' : 'Rate 5 stars'}
              >
                <Star 
                  className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${
                    imageRatings[image.id] ? 'text-[#FFD700] fill-[#FFD700]' : 'text-[#FFD700]'
                  }`} 
                />
              </button>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 sm:gap-4 mt-8 sm:mt-12">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base font-medium text-[#FFD700] border border-[#FFD700]/30 hover:border-[#FFD700] bg-black/30 backdrop-blur-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02]"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>
            
            <div className="flex items-center gap-1 sm:gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${
                    currentPage === page
                      ? 'bg-[#FFD700] text-black'
                      : 'text-[#FFD700] border border-[#FFD700]/30 hover:border-[#FFD700] bg-black/30 backdrop-blur-sm hover:scale-[1.02]'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base font-medium text-[#FFD700] border border-[#FFD700]/30 hover:border-[#FFD700] bg-black/30 backdrop-blur-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02]"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* View More Button */}
        {/* <div className="text-center mt-10 sm:mt-14 lg:mt-18">
          <a
            href="/gallery"
            aria-label="View full gallery"
            className="inline-flex items-center gap-2 sm:gap-3 group px-5 sm:px-8 lg:px-10 py-2.5 sm:py-4 lg:py-5 rounded-full text-xs sm:text-base lg:text-base font-medium tracking-wider text-[#FFD700] border border-[#FFD700]/30 hover:border-[#FFD700] bg-black/30 backdrop-blur-sm transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700]/50"
          >
            <span>View Full Gallery</span>
            <Camera className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />
          </a>
        </div> */}
      </div>

      {/* Image Modal */}
      {isModalOpen && selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-60 p-2 rounded-full bg-black/50 text-[#FFD700] hover:bg-black/70 transition-all duration-300"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation buttons */}
          <button
            onClick={() => navigateImage(-1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-60 p-2 rounded-full bg-black/50 text-[#FFD700] hover:bg-black/70 transition-all duration-300 disabled:opacity-50"
            disabled={galleryImages.findIndex(img => img.id === selectedImage.id) === 0}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => navigateImage(1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-60 p-2 rounded-full bg-black/50 text-[#FFD700] hover:bg-black/70 transition-all duration-300 disabled:opacity-50"
            disabled={galleryImages.findIndex(img => img.id === selectedImage.id) === galleryImages.length - 1}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal content */}
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <div className="relative bg-black/20 backdrop-blur-sm rounded-2xl border border-[#FFD700]/20 overflow-hidden">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              
              {/* Image info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                {/* <h3 className="text-xl sm:text-2xl font-bold text-[#FFD700] font-serif mb-2">
                  {selectedImage.alt}
                </h3>
                <p className="text-sm sm:text-base text-[#FFD700]/70 font-light">
                  {selectedImage.category}
                </p> */}
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => toggleLike(selectedImage.id, e)}
                      className="p-1 rounded-full hover:bg-[#DC143C]/20 transition-all duration-300 hover:scale-110"
                      title={likedImages.has(selectedImage.id) ? 'Unlike' : 'Like'}
                    >
                      <Heart 
                        className={`w-5 h-5 transition-colors ${
                          likedImages.has(selectedImage.id) ? 'text-[#DC143C] fill-[#DC143C]' : 'text-[#DC143C]'
                        }`} 
                      />
                    </button>
                    <button
                      onClick={(e) => toggleRating(selectedImage.id, e)}
                      className="p-1 rounded-full hover:bg-[#FFD700]/20 transition-all duration-300 hover:scale-110"
                      title={imageRatings[selectedImage.id] ? 'Remove rating' : 'Rate 5 stars'}
                    >
                      <Star 
                        className={`w-5 h-5 transition-colors ${
                          imageRatings[selectedImage.id] ? 'text-[#FFD700] fill-[#FFD700]' : 'text-[#FFD700]'
                        }`} 
                      />
                    </button>
                    {likedImages.has(selectedImage.id) && (
                      <span className="text-xs text-[#DC143C]/80 font-medium">Liked</span>
                    )}
                    {imageRatings[selectedImage.id] && (
                      <span className="text-xs text-[#FFD700]/80 font-medium">★ Rated</span>
                    )}
                  </div>
                  <span className="text-xs text-[#FFD700]/60">
                    {galleryImages.findIndex(img => img.id === selectedImage.id) + 1} of {galleryImages.length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Click outside to close */}
          <div 
            className="absolute inset-0 -z-10" 
            onClick={closeModal}
          />
        </div>
      )}
    </section>
  );
};