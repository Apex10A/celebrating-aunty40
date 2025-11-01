import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { GallerySection } from '../components/GallerySection';
import { Footer } from '../components/Footer';
import { Navigation } from '../components/Navigation';
import  Location  from '@/components/Location';
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
          <section className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="absolute inset-0 bg-[#0a0a0a]">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FFD700]/5 to-transparent" />
            </div>
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(12)].map((_, index) => (
                <div
                  key={index}
                  className="absolute w-1 h-1 bg-[#FFD700]/20 rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${3 + Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
            <div className="relative z-10 max-w-7xl mx-auto grid gap-12 lg:gap-16 xl:gap-20 lg:grid-cols-[1.1fr_0.9fr] items-center">
              <div className="space-y-6 sm:space-y-8">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#FFD700]/30 bg-black/40 backdrop-blur-sm">
                  <div className="w-2 h-2 rounded-full bg-[#DC143C] animate-pulse" />
                  <span className="text-xs sm:text-sm tracking-[0.3em] text-[#FFD700]/80 uppercase">
                    Meet the Celebrant
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#FFD700] font-serif">
                  Christiana Oluwafunmbi Bandele
                </h2>
                <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-[#FFD700]/75 leading-relaxed max-w-2xl">
                  Radiant, kind, and full of joy, Funmbi has a way of brightening every room she walks into. As she turns 40 and celebrates 15 wonderful years of marriage, let’s join together to share our love, warm wishes, and cherished memories.
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
                  <div className="flex items-center gap-4 p-4 rounded-2xl border border-[#FFD700]/20 bg-black/40 backdrop-blur-sm">
                    <div className="w-12 h-12 rounded-full text-[#FFD700] flex items-center justify-center font-serif text-xl">
                      40
                    </div>
                    <div>
                      <p className="text-[#FFD700] text-sm sm:text-base font-semibold tracking-wide uppercase">
                        Milestone Birthday
                      </p>
                      <p className="text-[#FFD700]/70 text-xs sm:text-sm">
                        Celebrating four decades of grace, wisdom, and impact.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-2xl border border-[#FFD700]/20 bg-black/40 backdrop-blur-sm">
                    <div className="w-12 h-12 rounded-full  text-[#FFD700] flex items-center justify-center font-serif text-xl">
                      15
                    </div>
                    <div>
                      <p className="text-[#FFD700] text-sm sm:text-base font-semibold tracking-wide uppercase">
                        Love Story
                      </p>
                      <p className="text-[#FFD700]/70 text-xs sm:text-sm">
                        Honoring a marriage woven with faith, laughter, and devotion.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="#gift"
                    className="group inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-md bg-[#FFD700] text-sm sm:text-base font-semibold tracking-wider transform hover:scale-[1.03] transition-all duration-300"
                  >
                    <span>Send Wishes as Gift</span>
                    <span className="w-6 h-6 rounded-md bg-black/10 flex items-center justify-center group-hover:bg-black/20 transition-colors duration-300">
                      →
                    </span>
                  </a>
                  
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-1 rounded-[28px] bg-gradient-to-br from-[#FFD700]/30 to-[#DC143C]/30 blur-3xl" />
                <div className="relative rounded-[28px] overflow-hidden border border-[#FFD700]/30 bg-black/60 backdrop-blur-sm">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <img
                    src="/momjj.jpg"
                    alt="Portrait of Funmbi Bandele"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center justify-between text-[#FFD700] text-sm sm:text-base">
                      {/* <span className="font-semibold tracking-wide">Queen Funmbi</span> */}
                      <span className="text-[#FFD700]/70 uppercase tracking-[0.3em] text-xs">Celebrant</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <GiftSection />
          <Location />
          <GallerySection />
          <Footer />
        </main>
      </div>
    </>
  );
};

export default CelebrationWebsite;