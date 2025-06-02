import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { GallerySection } from '../components/GallerySection';
import { RSVPSection } from '../components/RSVPSection';
import { Footer } from '../components/Footer';
import { Navigation } from '../components/Navigation';
import Head from 'next/head';

const CelebrationWebsite = () => {
  return (
    <>
      <Head>
        <title>40th Wedding Anniversary Celebration</title>
        <meta name="description" content="Join us in celebrating 40 beautiful years of marriage and love." />
      </Head>
      <div className="min-h-screen bg-[#0a0a0a]">
        <Navigation />
        <HeroSection />
        <GallerySection />
        <RSVPSection />
        <Footer />
      </div>
    </>
  );
};

export default CelebrationWebsite;