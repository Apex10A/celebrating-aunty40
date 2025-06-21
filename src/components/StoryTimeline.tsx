import React from 'react';
import { Heart, Calendar, MapPin, Users } from 'lucide-react';

const timelineEvents = [
  {
    date: '2010',
    title: 'The Beginning',
    description: 'Our love story began with a chance meeting that would change our lives forever.',
    icon: Heart
  },
  {
    date: '2015',
    title: 'The Wedding',
    description: 'We said "I do" in a beautiful ceremony surrounded by family and friends.',
    icon: Calendar
  },
  {
    date: '2020',
    title: 'Building Together',
    description: 'Five years of marriage, filled with love, growth, and beautiful memories.',
    icon: Heart
  },
  {
    date: '2025',
    title: 'Double Celebration',
    description: 'Funmbi\'s 40th birthday and our 15th wedding anniversary - a milestone worth celebrating!',
    icon: Users
  }
];

export const StoryTimeline = () => {
  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 bg-[#0a0a0a] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FFD700]/5 to-transparent"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 
          className="text-4xl md:text-5xl font-bold text-center text-[#FFD700] mb-16"
        >
          Our Journey Together
        </h2>
        
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-[#FFD700]/30" />
          
          {/* Timeline Events */}
          <div className="space-y-12 sm:space-y-16">
            {timelineEvents.map((event, index) => {
              const IconComponent = event.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    isEven ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#FFD700] rounded-full z-10">
                    <div className="absolute w-8 h-8 bg-[#FFD700]/30 rounded-full -left-2 -top-2 animate-pulse" />
                  </div>
                  
                  {/* Content */}
                  <div className={`w-5/12 ${isEven ? 'pr-8' : 'pl-8'}`}>
                    <div className="bg-black/70 backdrop-blur-sm p-6 rounded-lg shadow-xl border border-[#FFD700]/10 hover:border-[#FFD700]/30 hover:shadow-[#FFD700]/20 transition-all duration-300">
                      <h3 className="text-[#FFD700] text-xl font-semibold mb-2">{event.date}</h3>
                      <h4 className="text-white text-lg font-medium mb-3">{event.title}</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Icon */}
                  <div className={`absolute ${isEven ? 'right-1/4' : 'left-1/4'} transform -translate-y-1/2 transform hover:scale-105 border-2 border-[#FFD700]/20`}>
                    <IconComponent className="text-[#FFD700] p-2" size={32} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}; 