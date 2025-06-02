import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export const StoryTimeline = () => {
  const timelineEvents = [
    {
      date: 'April 15, 1984',
      title: 'The Wedding Day',
      description: 'On this beautiful spring day, we exchanged vows and began our journey of love, trust, and companionship.',
      image: 'https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=800&auto=format&fit=crop'
    },
    {
      date: 'April 15, 1994',
      title: '10 Years of Joy',
      description: 'A decade of building our home, raising our family, and creating countless memories together.',
      image: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&auto=format&fit=crop'
    },
    {
      date: 'April 15, 2004',
      title: 'Silver Jubilee',
      description: 'Twenty years of marriage taught us that love grows stronger with each passing day.',
      image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&auto=format&fit=crop'
    },
    {
      date: 'April 15, 2014',
      title: '30 Years Together',
      description: 'Three decades of partnership, proving that true love stands the test of time.',
      image: 'https://images.unsplash.com/photo-1622495966027-e0432bbf5322?w=800&auto=format&fit=crop'
    },
    {
      date: 'April 15, 2024',
      title: 'Ruby Anniversary',
      description: 'Celebrating 40 magnificent years of marriage - a testament to enduring love, friendship, and devotion.',
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&auto=format&fit=crop'
    }
  ];

  return (
    <div className="py-24 bg-gradient-to-b from-black via-[#1a1a1a] to-black min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-center text-[#FFD700] mb-16"
        >
          Our Journey Through Time
        </motion.h2>
        
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-[#FFD700]/30" />
          
          {timelineEvents.map((event, index) => (
            <motion.div
              key={event.date}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`relative mb-16 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } flex flex-col md:flex items-center justify-center gap-8`}
            >
              {/* Date bubble */}
              <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#FFD700] rounded-full z-10">
                <div className="absolute w-8 h-8 bg-[#FFD700]/30 rounded-full -left-2 -top-2 animate-pulse" />
              </div>
              
              {/* Content */}
              <div className={`w-full md:w-5/12 ${
                index % 2 === 0 ? 'md:text-right' : 'md:text-left'
              }`}>
                <div className="bg-black/70 backdrop-blur-sm p-6 rounded-lg shadow-xl border border-[#FFD700]/10 hover:border-[#FFD700]/30 hover:shadow-[#FFD700]/20 transition-all duration-300">
                  <h3 className="text-[#FFD700] text-xl font-semibold mb-2">{event.date}</h3>
                  <h4 className="text-white text-2xl font-bold mb-3">{event.title}</h4>
                  <p className="text-gray-300">{event.description}</p>
                </div>
              </div>
              
              {/* Spacer for alignment */}
              <div className="hidden md:block w-2/12" />
              
              {/* Image */}
              <div className="w-full md:w-5/12">
                <div className="relative h-64 rounded-lg overflow-hidden transform transition-transform hover:scale-105 border-2 border-[#FFD700]/20">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}; 