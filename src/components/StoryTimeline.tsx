import React from 'react';
import { Heart, Calendar, MapPin, Users, Star, Sparkles } from 'lucide-react';

const timelineEvents = [
  {
    date: '2010',
    title: 'The Beginning',
    subtitle: 'Where It All Started',
    description: 'Our love story began with a chance meeting that would change our lives forever. A simple hello led to endless conversations, shared dreams, and a connection that felt like destiny.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop&crop=face',
    icon: Heart,
    gradient: 'from-[#FFD700] to-[#DC143C]'
  },
  {
    date: '2015',
    title: 'The Wedding',
    subtitle: 'Our Special Day',
    description: 'We said "I do" in a beautiful ceremony surrounded by family and friends. The day was filled with love, laughter, and promises for a lifetime together.',
    image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&auto=format&fit=crop',
    icon: Calendar,
    gradient: 'from-[#DC143C] to-[#FFD700]'
  },
  {
    date: '2020',
    title: 'Building Together',
    subtitle: 'Five Years of Growth',
    description: 'Five years of marriage, filled with love, growth, and beautiful memories. We learned to navigate life\'s challenges together and celebrated every small victory.',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&auto=format&fit=crop',
    icon: Heart,
    gradient: 'from-[#FFD700] to-[#DC143C]'
  },
  {
    date: '2025',
    title: 'Double Celebration',
    subtitle: '40 & 15 Years',
    description: 'Funmbi\'s 40th birthday and our 15th wedding anniversary - a milestone worth celebrating! Fifteen years of love, fifteen years of growth, and countless memories to cherish.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop&crop=face',
    icon: Users,
    gradient: 'from-[#DC143C] to-[#FFD700]'
  }
];

export const StoryTimeline = () => {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FFD700]/5 to-transparent"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#FFD700]/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20 lg:mb-24">
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-[#FFD700]"></div>
            <Heart className="text-[#FFD700] w-5 h-5 sm:w-6 sm:h-6" />
            <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-[#FFD700]"></div>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#DC143C] mb-4 sm:mb-6 font-serif">
            Our Journey Together
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-[#FFD700]/80 max-w-3xl mx-auto font-light tracking-wide">
            Fifteen years of love, laughter, and beautiful memories. Every moment has been a blessing.
          </p>
        </div>
        
        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-[#FFD700]/20 via-[#FFD700]/50 to-[#FFD700]/20"></div>
          
          {/* Timeline Events */}
          <div className="space-y-16 sm:space-y-20 lg:space-y-24">
            {timelineEvents.map((event, index) => {
              const IconComponent = event.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    isEven ? 'flex-row' : 'flex-row-reverse'
                  } gap-8 sm:gap-12 lg:gap-16`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                    <div className={`w-6 h-6 bg-gradient-to-r ${event.gradient} rounded-full flex items-center justify-center shadow-lg`}>
                      <IconComponent className="text-black w-3 h-3" />
                    </div>
                    <div className={`absolute w-12 h-12 bg-gradient-to-r ${event.gradient} rounded-full -left-3 -top-3 opacity-20 animate-ping`}></div>
                  </div>
                  
                  {/* Content Card */}
                  <div className={`w-5/12 ${isEven ? 'pr-8 sm:pr-12' : 'pl-8 sm:pl-12'}`}>
                    <div className="group relative bg-black/40 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all duration-500 transform hover:scale-105">
                      {/* Background Glow */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${event.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}></div>
                      
                      <div className="relative space-y-4 sm:space-y-6">
                        {/* Date */}
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 bg-gradient-to-r ${event.gradient} rounded-full flex items-center justify-center`}>
                            <IconComponent className="text-black w-4 h-4" />
                          </div>
                          <span className="text-[#FFD700] text-lg sm:text-xl font-bold font-serif">
                            {event.date}
                          </span>
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-2xl sm:text-3xl font-bold text-[#FFD700] font-serif">
                          {event.title}
                        </h3>
                        
                        {/* Subtitle */}
                        <h4 className="text-lg sm:text-xl text-[#FFD700]/80 font-medium">
                          {event.subtitle}
                        </h4>
                        
                        {/* Description */}
                        <p className="text-[#FFD700]/70 text-sm sm:text-base leading-relaxed">
                          {event.description}
                        </p>
                        
                        {/* Decorative Elements */}
                        <div className="flex items-center gap-2 pt-2">
                          <Star className="text-[#FFD700] w-4 h-4" />
                          <Sparkles className="text-[#DC143C] w-4 h-4" />
                          <Heart className="text-[#FFD700] w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Image */}
                  <div className={`w-5/12 ${isEven ? 'pl-8 sm:pl-12' : 'pr-8 sm:pr-12'}`}>
                    <div className="group relative overflow-hidden rounded-2xl border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all duration-500 transform hover:scale-105">
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                      
                      {/* Image Decoration */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className={`w-8 h-8 bg-gradient-to-r ${event.gradient} rounded-full flex items-center justify-center`}>
                          <IconComponent className="text-black w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 sm:mt-20 lg:mt-24">
          <div className="inline-block p-8 sm:p-10 rounded-2xl border border-[#FFD700]/20 bg-black/30 backdrop-blur-sm">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#FFD700] mb-4 font-serif">
              Join Our Celebration
            </h3>
            <p className="text-[#FFD700]/80 text-base sm:text-lg mb-6 font-light">
              Be part of this special milestone in our journey
            </p>
            <a
              href="/rsvp"
              className="inline-flex items-center gap-2 sm:gap-3 group px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-full text-sm sm:text-base lg:text-lg font-medium tracking-wider bg-gradient-to-r from-[#FFD700] to-[#DC143C] text-black transform hover:scale-105 transition-all duration-500"
            >
              <span>RSVP Now</span>
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}; 