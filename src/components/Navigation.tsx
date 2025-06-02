import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const Navigation = () => {
  const router = useRouter();
  
  const isActive = (path: string) => router.pathname === path;
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16">
          <div className="flex space-x-8">
            <Link 
              href="/"
              className={`${
                isActive('/') 
                  ? 'text-gold-400 border-b-2 border-gold-400' 
                  : 'text-gray-300 hover:text-gold-400 hover:border-b-2 hover:border-gold-400'
              } px-3 py-2 text-sm font-medium transition-all duration-300 ease-in-out`}
            >
              Home
            </Link>
            <Link 
              href="/our-story"
              className={`${
                isActive('/our-story') 
                  ? 'text-gold-400 border-b-2 border-gold-400' 
                  : 'text-gray-300 hover:text-gold-400 hover:border-b-2 hover:border-gold-400'
              } px-3 py-2 text-sm font-medium transition-all duration-300 ease-in-out`}
            >
              Our Story
            </Link>
            <Link 
              href="/gallery"
              className={`${
                isActive('/gallery') 
                  ? 'text-gold-400 border-b-2 border-gold-400' 
                  : 'text-gray-300 hover:text-gold-400 hover:border-b-2 hover:border-gold-400'
              } px-3 py-2 text-sm font-medium transition-all duration-300 ease-in-out`}
            >
              Gallery
            </Link>
            <Link 
              href="/rsvp"
              className={`${
                isActive('/rsvp') 
                  ? 'text-gold-400 border-b-2 border-gold-400' 
                  : 'text-gray-300 hover:text-gold-400 hover:border-b-2 hover:border-gold-400'
              } px-3 py-2 text-sm font-medium transition-all duration-300 ease-in-out`}
            >
              RSVP
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}; 