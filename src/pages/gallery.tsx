import React, { useState } from 'react';
import { Navigation } from '../components/Navigation';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Footer } from '../components/Footer';
import { Camera, Upload, X } from 'lucide-react';

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'wedding', label: 'Wedding' },
    { id: 'anniversary', label: 'Anniversary' },
    { id: 'family', label: 'Family' },
    { id: 'celebration', label: 'Celebration' }
  ];

  const sampleImages = [
    { id: 1, src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&auto=format&fit=crop', category: 'wedding' },
    { id: 2, src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop', category: 'anniversary' },
    { id: 3, src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop', category: 'family' },
    { id: 4, src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&auto=format&fit=crop', category: 'celebration' },
    { id: 5, src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop', category: 'wedding' },
    { id: 6, src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop', category: 'anniversary' },
  ];

  const filteredImages = selectedCategory === 'all' 
    ? sampleImages 
    : sampleImages.filter(img => img.category === selectedCategory);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImages(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files) {
      Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImages(prev => [...prev, reader.result as string]);
          };
          reader.readAsDataURL(file);
        }
      });
    }
  };

  return (
    <>
      <Head>
        <title>Gallery - 40 & 15 Years Celebration</title>
        <meta name="description" content="Memory gallery from Funmbi's 40th Birthday and 15th Wedding Anniversary Celebration" />
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-black via-[#1a1a1a] to-black">
        <Navigation />
        <div className="pt-32 pb-24 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h1 className="font-decorative text-5xl text-[#FFD700] mb-4">Memory Gallery</h1>
              <div className="h-px w-32 sm:w-40 mx-auto bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mb-6"></div>
              <p className="text-lg sm:text-xl text-[#FFD700]/80 font-light tracking-wide">
                Relive the beautiful moments from our celebration
              </p>
            </motion.div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12 sm:mb-16">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full transition-all duration-300 font-medium ${
                    selectedCategory === category.id
                      ? 'border-[#FFD700] bg-[#FFD700]/10'
                      : 'border-[#FFD700]/30 hover:border-[#FFD700]/50'
                  } border text-[#FFD700]`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Upload Section */}
            <div className="text-center mb-12 sm:mb-16">
              <div className="bg-black/30 backdrop-blur-lg p-8 sm:p-12 rounded-2xl border border-[#FFD700]/10">
                <span className="text-[#FFD700] text-4xl">📸</span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#FFD700] mt-4 mb-2">Share Your Memories</h3>
                <p className="text-[#FFD700]/70 mb-6">
                  Upload photos from the celebration to add to our gallery
                </p>
                <input
                  type="file"
                  id="image-upload"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label
                  htmlFor="image-upload"
                  className="inline-block px-6 py-3 bg-[#FFD700] text-black rounded-full hover:bg-[#FFD700]/90 transition-all duration-300 cursor-pointer"
                >
                  Upload Photos
                </label>
              </div>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer transform hover:scale-105 transition-all duration-500"
                  onClick={() => setSelectedImage(image.src)}
                >
                  <img
                    src={image.src}
                    alt={`Gallery Image ${image.id}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-[#FFD700] font-medium">
                        Memory #{image.id}
                      </p>
                      <p className="text-[#FFD700]/70 text-sm">
                        A precious moment captured forever
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredImages.length === 0 && (
              <div className="text-center py-12 sm:py-16">
                <h3 className="text-2xl text-[#FFD700] mb-2">The Gallery Awaits Your Memories</h3>
                <p className="text-[#FFD700]/70">
                  Be the first to share photos from the celebration!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
            <div className="relative max-w-4xl max-h-full">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white hover:text-[#FFD700] transition-colors"
              >
                <X size={32} />
              </button>
              <img
                src={selectedImage}
                alt="Full size"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default GalleryPage; 