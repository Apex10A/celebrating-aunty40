import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { GallerySection } from '../components/GallerySection';
import { RSVPSection } from '../components/RSVPSection';
import { Footer } from '../components/Footer';

const CelebrationWebsite = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <HeroSection />
      <GallerySection />
      <RSVPSection />
      <Footer />
    </div>
  );
};

export default CelebrationWebsite;