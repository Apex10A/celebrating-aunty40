import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-5 ${
      isScrolled 
        ? 'bg-black/90 backdrop-blur-lg border-b border-[#FFD700]/20' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <img src="/ft.png" alt="Logo" className="md:w-28 md:h-28 w-20 h-20 object-contain"/>

              {/* <div className="absolute -inset-1 bg-gradient-to-r from-[#FFD700] to-[#DC143C] opacity-30 blur-sm rounded-lg"></div>
              <div className="relative bg-black/50 backdrop-blur-lg px-3 py-1 rounded-lg border border-[#FFD700]/20">
                <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-[#FFD700] to-[#DC143C] bg-clip-text text-transparent">
                  FT4015
                </span>
              </div> */}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-[#FFD700]/80 hover:text-[#FFD700] transition-colors duration-300 font-light tracking-wider text-sm lg:text-base"
            >
              Home
            </Link>
            <Link 
              href="/our-story" 
              className="text-[#FFD700]/80 hover:text-[#FFD700] transition-colors duration-300 font-light tracking-wider text-sm lg:text-base"
            >
              Our Story
            </Link>
            <Link 
              href="/gallery" 
              className="text-[#FFD700]/80 hover:text-[#FFD700] transition-colors duration-300 font-light tracking-wider text-sm lg:text-base"
            >
              Gallery
            </Link>
            <Link 
              href="/rsvp" 
              className="bg-[#FFD700] text px-5 py-3 rounded-lg text-sm lg:text-base font-medium tracking-wider hover:scale-105 transition-transform duration-300"
            >
              RSVP
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-[#FFD700] hover:bg-[#FFD700]/10 transition-colors duration-300"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/95 backdrop-blur-lg rounded-lg border border-[#FFD700]/20 mt-2">
              <Link 
                href="/" 
                className="block px-3 py-2 text-[#FFD700]/80 hover:text-[#FFD700] transition-colors duration-300 font-light tracking-wider"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/our-story" 
                className="block px-3 py-2 text-[#FFD700]/80 hover:text-[#FFD700] transition-colors duration-300 font-light tracking-wider"
                onClick={() => setIsOpen(false)}
              >
                Our Story
              </Link>
              <Link 
                href="/gallery" 
                className="block px-3 py-2 text-[#FFD700]/80 hover:text-[#FFD700] transition-colors duration-300 font-light tracking-wider"
                onClick={() => setIsOpen(false)}
              >
                Gallery
              </Link>
              <Link 
                href="/rsvp" 
                className="block px-3 py-2 bg-gradient-to-r from-[#FFD700] to-[#DC143C] text-black rounded-lg font-medium tracking-wider"
                onClick={() => setIsOpen(false)}
              >
                RSVP
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}; 