import React from 'react';
import { Heart, Calendar, MapPin, Users, Star, Sparkles } from 'lucide-react';

const timelineEvents = [
  {
    date: '2009',
    title: 'An Unexpected Encounter',
    subtitle: 'Destiny in Our Neighborhood',
    description:
      'What began as an ordinary community event became the prologue to our love story. She arrived with friends, unaware that a brief hello in my childhood neighborhood would awaken a connection neither of us anticipated.',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop',
    icon: MapPin,
    gradient: 'from-[#FFD700] to-[#DC143C]'
  },
  {
    date: '2010',
    title: 'Hearts Drawn Closer',
    subtitle: 'Conversations that Changed Everything',
    description:
      'That single encounter blossomed into late-night talks, shared prayers, and dreams of a future together. With every story we shared, our hearts found rhythm, grace, and purpose in one another.',
    image: 'https://images.unsplash.com/photo-1496449903678-68ddcb189a24?w=600&auto=format&fit=crop',
    icon: Heart,
    gradient: 'from-[#DC143C] to-[#FFD700]'
  },
  {
    date: '2015',
    title: 'A Covenant of Grace',
    subtitle: 'Promises Beneath Open Skies',
    description:
      'Surrounded by family, friends, and the gentle glow of answered prayers, we said “I do.” Together, we promised to weather every storm and celebrate every sunrise with gratitude and faith.',
    image: 'https://images.unsplash.com/photo-1520854221050-0f4caff449fb?w=600&auto=format&fit=crop',
    icon: Calendar,
    gradient: 'from-[#FFD700] to-[#DC143C]'
  },
  {
    date: '2025',
    title: 'Fifteen Years, One Heartbeat',
    subtitle: 'Love Perfected by Destiny',
    description:
      'Today, our story spans fifteen beautiful years of love, laughter, and grace. We stand hand in hand—wiser, stronger, and more in love—celebrating a journey that began by chance but was perfected by destiny.',
    image: 'https://images.unsplash.com/photo-1520854221050-0f4caff449fb?w=600&auto=format&fit=crop',
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
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-[#FFD700]"></div>
            <Heart className="text-[#FFD700] w-5 h-5 sm:w-6 sm:h-6" />
            <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-[#FFD700]"></div>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#DC143C] mb-4 sm:mb-6 font-serif">
            Our Story
          </h2>
          <div className="text-sm sm:text-base lg:text-lg xl:text-xl text-[#FFD700]/80 max-w-3xl mx-auto font-light tracking-wide px-4 space-y-4">
            <p>
              It all began in the most unexpected place, the very neighborhood where I grew up. She came there just for an event, in the company of another, never knowing destiny had its own plan. One brief encounter, a few exchanged words, and a beautiful journey began.
            </p>
            <p>
              From that ordinary day sprang an extraordinary love, one that has weathered storms, celebrated highs, and grown deeper with every sunrise. Fifteen years later, our hearts still beat as one, stronger, wiser, and more in love than ever.
            </p>
            <p>
              Join us as we celebrate 15 years of love, laughter, and grace, a story that began by chance but was perfected by destiny.
            </p>
          </div>
        </div>
        
        {/* Timeline - Mobile First Design */}
        <div className="relative">
          {/* Timeline Line - Hidden on mobile, visible on larger screens */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-[#FFD700]/20 via-[#FFD700]/50 to-[#FFD700]/20"></div>
          
          {/* Timeline Events */}
          <div className="space-y-8 sm:space-y-12 md:space-y-16 lg:space-y-20 xl:space-y-24">
            {timelineEvents.map((event, index) => {
              const IconComponent = event.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div
                  key={index}
                  className="relative"
                >
                  {/* Mobile Layout - Stacked */}
                  <div className="md:hidden space-y-6">
                    {/* Timeline Dot for Mobile */}
                    <div className="flex justify-center">
                      <div className="relative">
                        <div className={`w-8 h-8 bg-gradient-to-r ${event.gradient} rounded-full flex items-center justify-center shadow-lg`}>
                          <IconComponent className="text-black w-4 h-4" />
                        </div>
                        <div className={`absolute w-12 h-12 bg-gradient-to-r ${event.gradient} rounded-full -left-2 -top-2 opacity-20 animate-ping`}></div>
                      </div>
                    </div>

                    {/* Image */}
                    <div className="px-4">
                      <div className="group relative overflow-hidden rounded-2xl border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all duration-500 transform hover:scale-105">
                        <div className="aspect-[4/3] overflow-hidden">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                        
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className={`w-8 h-8 bg-gradient-to-r ${event.gradient} rounded-full flex items-center justify-center`}>
                            <IconComponent className="text-black w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content Card */}
                    <div className="px-4">
                      <div className="group relative bg-black/40 backdrop-blur-sm p-6 rounded-2xl border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all duration-500 transform hover:scale-105">
                        <div className={`absolute inset-0 bg-gradient-to-br ${event.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}></div>
                        
                        <div className="relative space-y-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 bg-gradient-to-r ${event.gradient} rounded-full flex items-center justify-center`}>
                              <IconComponent className="text-black w-4 h-4" />
                            </div>
                            <span className="text-[#FFD700] text-lg font-bold font-serif">
                              {event.date}
                            </span>
                          </div>
                          
                          <h3 className="text-2xl font-bold text-[#FFD700] font-serif">
                            {event.title}
                          </h3>
                          
                          <h4 className="text-lg text-[#FFD700]/80 font-medium">
                            {event.subtitle}
                          </h4>
                          
                          <p className="text-[#FFD700]/70 text-sm leading-relaxed">
                            {event.description}
                          </p>
                          
                          <div className="flex items-center gap-2 pt-2">
                            <Star className="text-[#FFD700] w-4 h-4" />
                            <Sparkles className="text-[#DC143C] w-4 h-4" />
                            <Heart className="text-[#FFD700] w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout - Side by Side */}
                  <div className={`hidden md:flex items-center gap-8 lg:gap-12 xl:gap-16 ${
                    isEven ? 'flex-row' : 'flex-row-reverse'
                  }`}>
                    {/* Timeline Dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                      <div className={`w-6 h-6 bg-gradient-to-r ${event.gradient} rounded-full flex items-center justify-center shadow-lg`}>
                        <IconComponent className="text-black w-3 h-3" />
                      </div>
                      <div className={`absolute w-12 h-12 bg-gradient-to-r ${event.gradient} rounded-full -left-3 -top-3 opacity-20 animate-ping`}></div>
                    </div>
                    
                    {/* Content Card */}
                    <div className={`w-5/12 ${isEven ? 'pr-8 lg:pr-12' : 'pl-8 lg:pl-12'}`}>
                      <div className="group relative bg-black/40 backdrop-blur-sm p-6 lg:p-8 rounded-2xl border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all duration-500 transform hover:scale-105">
                        <div className={`absolute inset-0 bg-gradient-to-br ${event.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}></div>
                        
                        <div className="relative space-y-4 lg:space-y-6">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 bg-gradient-to-r ${event.gradient} rounded-full flex items-center justify-center`}>
                              <IconComponent className="text-black w-4 h-4" />
                            </div>
                            <span className="text-[#FFD700] text-lg lg:text-xl font-bold font-serif">
                              {event.date}
                            </span>
                          </div>
                          
                          <h3 className="text-2xl lg:text-3xl font-bold text-[#FFD700] font-serif">
                            {event.title}
                          </h3>
                          
                          <h4 className="text-lg lg:text-xl text-[#FFD700]/80 font-medium">
                            {event.subtitle}
                          </h4>
                          
                          <p className="text-[#FFD700]/70 text-sm lg:text-base leading-relaxed">
                            {event.description}
                          </p>
                          
                          <div className="flex items-center gap-2 pt-2">
                            <Star className="text-[#FFD700] w-4 h-4" />
                            <Sparkles className="text-[#DC143C] w-4 h-4" />
                            <Heart className="text-[#FFD700] w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Image */}
                    <div className={`w-5/12 ${isEven ? 'pl-8 lg:pl-12' : 'pr-8 lg:pr-12'}`}>
                      <div className="group relative overflow-hidden rounded-2xl border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all duration-500 transform hover:scale-105">
                        <div className="aspect-[4/3] overflow-hidden">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                        
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className={`w-8 h-8 bg-gradient-to-r ${event.gradient} rounded-full flex items-center justify-center`}>
                            <IconComponent className="text-black w-4 h-4" />
                          </div>
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
        {/* <div className="text-center mt-12 sm:mt-16 lg:mt-20 xl:mt-24">
          <div className="inline-block p-6 sm:p-8 lg:p-10 rounded-2xl border border-[#FFD700]/20 bg-black/30 backdrop-blur-sm">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#FFD700] mb-3 sm:mb-4 font-serif">
              Join Our Celebration
            </h3>
            <p className="text-[#FFD700]/80 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 font-light px-4">
              Be part of this special milestone in our journey
            </p>
            <a
              href="/rsvp"
              className="inline-flex items-center gap-2 sm:gap-3 group px-4 sm:px-6 lg:px-8 xl:px-10 py-3 sm:py-4 lg:py-5 rounded-full text-sm sm:text-base lg:text-lg font-medium tracking-wider bg-gradient-to-r from-[#FFD700] to-[#DC143C] text-black transform hover:scale-105 transition-all duration-500"
            >
              <span>RSVP Now</span>
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />
            </a>
          </div>
        </div> */}
      </div>
    </section>
  );
}; 