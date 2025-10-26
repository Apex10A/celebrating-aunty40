import React from 'react';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';

const GOOGLE_MAPS_URL =
  'https://maps.app.goo.gl/2ifFeCkTfX9ssapd7';
  

const Location = () => {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-black to-[#140404]" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(60% 60% at 50% 40%, rgba(220,20,60,0.25) 0%, rgba(10,10,10,0.85) 70%, rgba(0,0,0,0.95) 100%)'
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
          {/* Text Column */}
          <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start">
              <div className="flex items-center gap-3 rounded-full border border-[#FFD700]/40 bg-black/40 px-4 py-2">
                <MapPin className="h-5 w-5 text-[#FFD700]" />
                <span className="text-sm font-medium uppercase tracking-[0.25em] text-[#FFD700]/80">
                  Location
                </span>
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-[#FFD700] w-full">
              Be our guest at FT4015 where we celebrate two milestones in one.
            </h2>

            <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
              Venue: Mayfair hall: Otunba jobi-fele way, Alausa, Ikeja
              <br />
              <span className='text-[#FFD700]'>Time:</span> 12:00 noon
              <br />
              Colour of the day: Black & Gold.
            </p>
          

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-xl border border-[#FFD700]/40 bg-black/60 px-5 py-3 text-sm sm:text-base font-medium tracking-wider text-[#FFD700] transition-all duration-300 hover:border-[#FFD700] hover:bg-[#FFD700]/20"
                aria-label="Open MayFair Hall on Google Maps in a new tab"
              >
                <MapPin className="h-5 w-5 transition-transform group-hover:scale-110" />
                <span>Open in Google Maps</span>
                <ExternalLink className="h-4 w-4 opacity-70" />
              </a>
              {/* <a
                href="/rsvp"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#E6C200] px-5 py-3 text-sm sm:text-base font-semibold tracking-wider text-black transition-all duration-300 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700]/50"
                aria-label="Confirm your attendance"
              >
                <Navigation className="h-5 w-5" />
                <span>Plan Your Visit</span>
              </a> */}
            </div>
          </div>

          {/* Image Column */}
       
        </div>
           <div className="w-full mt-4">
            <div className="relative overflow-hidden rounded-3xl border border-[#FFD700]/20 shadow-[0_0_70px_-20px_rgba(255,215,0,0.45)]">
              <img
                src="/mayfair.png"
                alt="Evening view of MayFair Hall in Ikeja, Lagos"
                className="h-[280px] w-full object-cover sm:h-[360px] lg:h-[420px]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </div>
          </div>
      </div>
    </section>
  );
};

export default Location;