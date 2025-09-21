import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { GallerySection } from '../components/GallerySection';
import { Footer } from '../components/Footer';
import { Navigation } from '../components/Navigation';
import { GiftSection } from '../components/GiftSection';
import Head from 'next/head';

const CelebrationWebsite = () => {
  return (
    <>
      <Head>
        <title>TopFun40 - 40th Anniversary Celebration</title>
        <meta name="description" content="Join us for a fun-filled celebration of 40 amazing years! Get ready for the party of a lifetime!" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-black via-[#1a1a1a] to-black">
        <Navigation />
        <main className="relative">
          <HeroSection />
           <GiftSection />
          <GallerySection />
         
          <Footer />
        </main>
      </div>
    </>
  );
};

export default CelebrationWebsite;