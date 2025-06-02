import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';

export const Navigation = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const isActive = (path: string) => router.pathname === path;
  
  const menuItems = [
    { path: '/', label: 'Home' },
    { path: '/our-story', label: 'Our Story' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/rsvp', label: 'RSVP' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-[#FFD700]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo/Title - visible on all screens */}
          <Link 
            href="/"
            className="font-decorative text-[#FFD700] text-2xl md:text-3xl hover:opacity-80 transition-opacity"
          >
            40 Years
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`${
                  isActive(item.path)
                    ? 'text-[#FFD700] border-b-2 border-[#FFD700]'
                    : 'text-gray-300 hover:text-[#FFD700] hover:border-b-2 hover:border-[#FFD700]/50'
                } px-3 py-2 text-sm font-medium tracking-wider uppercase transition-all duration-300 ease-in-out`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-300 hover:text-[#FFD700] focus:outline-none"
          >
            <span className="sr-only">Open menu</span>
            {!isMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-[#FFD700]/10"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`${
                    isActive(item.path)
                      ? 'text-[#FFD700] bg-[#FFD700]/10'
                      : 'text-gray-300 hover:text-[#FFD700] hover:bg-[#FFD700]/5'
                  } block px-3 py-4 rounded-md text-base font-medium tracking-wider uppercase transition-all duration-300 ease-in-out text-center`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}; 