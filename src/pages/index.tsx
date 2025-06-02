import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { GallerySection } from '../components/GallerySection';
import { Footer } from '../components/Footer';
import { Navigation } from '../components/Navigation';
import Head from 'next/head';

const CelebrationWebsite = () => {
  return (
    <>
      <Head>
        <title>40th Wedding Anniversary Celebration</title>
        <meta name="description" content="Join us in celebrating 40 beautiful years of marriage and love." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-black via-[#1a1a1a] to-black">
        <Navigation />
        <main className="relative">
          <HeroSection />
          <GallerySection />
          <Footer />
        </main>
      </div>
    </>
  );
};

export default CelebrationWebsite;