import React, { useState } from 'react';
import { Gift } from 'lucide-react';

export const RSVPSection = () => {
  const [rsvpForm, setRsvpForm] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '1',
    message: '',
    giftOption: 'none', // 'none', 'cash', 'item'
    giftAmount: '',
    giftDescription: ''
  });

  const handleRsvpSubmit = () => {
    if (!rsvpForm.name || !rsvpForm.email) {
      alert('Please fill in your name and email address.');
      return;
    }
    // Here you would typically send this data to your backend
    alert('Thank you for your RSVP! We\'ll be in touch soon.');
    setRsvpForm({
      name: '',
      email: '',
      phone: '',
      guests: '1',
      message: '',
      giftOption: 'none',
      giftAmount: '',
      giftDescription: ''
    });
  };

  const inputClasses = "w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl border border-[#FFD700]/20 bg-black/50 text-[#FFD700] placeholder-[#FFD700]/30 focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-all duration-300 text-base sm:text-lg";
  const labelClasses = "block text-[#FFD700] font-medium mb-2 sm:mb-3 text-sm sm:text-base";

  return (
    <section id="rsvp" className="py-16 sm:py-32 px-4 sm:px-6 bg-[#0a0a0a] relative">
      <div className="absolute inset-0 bg-[url('/gold-pattern.png')] opacity-5"></div>
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16 fade-in">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FFA500] mb-6 sm:mb-8 font-serif">
            Join Our Celebration
          </h2>
          <div className="h-px w-32 sm:w-40 mx-auto bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mb-6 sm:mb-8"></div>
          <p className="text-base sm:text-lg md:text-xl text-[#FFD700]/80 font-light tracking-wide px-4">
            Be part of this momentous occasion
          </p>
        </div>
        
        <div className="rsvp-form bg-black/40 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-10 md:p-16 border border-[#FFD700]/10 fade-in">
          <div className="space-y-6 sm:space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <label className={labelClasses}>Full Name *</label>
                <input
                  type="text"
                  value={rsvpForm.name}
                  onChange={(e) => setRsvpForm({...rsvpForm, name: e.target.value})}
                  className={inputClasses}
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className={labelClasses}>Email *</label>
                <input
                  type="email"
                  value={rsvpForm.email}
                  onChange={(e) => setRsvpForm({...rsvpForm, email: e.target.value})}
                  className={inputClasses}
                  placeholder="Enter your email"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <label className={labelClasses}>Phone Number</label>
                <input
                  type="tel"
                  value={rsvpForm.phone}
                  onChange={(e) => setRsvpForm({...rsvpForm, phone: e.target.value})}
                  className={inputClasses}
                  placeholder="Your phone number"
                />
              </div>
              <div>
                <label className={labelClasses}>Number of Guests</label>
                <select
                  value={rsvpForm.guests}
                  onChange={(e) => setRsvpForm({...rsvpForm, guests: e.target.value})}
                  className={inputClasses}
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5+">5+ Guests</option>
                </select>
              </div>
            </div>

            {/* Gift Section */}
            <div className="border-t border-[#FFD700]/10 pt-6 sm:pt-8">
              <div className="flex items-center gap-3 sm:gap-4 mb-6">
                <Gift className="text-[#FFD700]" size={24} />
                <h3 className="text-xl sm:text-2xl font-bold text-[#FFD700]">Gift Options</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className={labelClasses}>Gift Preference</label>
                  <select
                    value={rsvpForm.giftOption}
                    onChange={(e) => setRsvpForm({...rsvpForm, giftOption: e.target.value})}
                    className={inputClasses}
                  >
                    <option value="none">Select a gift option</option>
                    <option value="cash">Cash Gift</option>
                    <option value="item">Gift Item</option>
                  </select>
                </div>

                {rsvpForm.giftOption === 'cash' && (
                  <div>
                    <label className={labelClasses}>Gift Amount</label>
                    <input
                      type="number"
                      value={rsvpForm.giftAmount}
                      onChange={(e) => setRsvpForm({...rsvpForm, giftAmount: e.target.value})}
                      className={inputClasses}
                      placeholder="Enter amount"
                    />
                  </div>
                )}

                {rsvpForm.giftOption === 'item' && (
                  <div>
                    <label className={labelClasses}>Gift Description</label>
                    <textarea
                      value={rsvpForm.giftDescription}
                      onChange={(e) => setRsvpForm({...rsvpForm, giftDescription: e.target.value})}
                      className={inputClasses}
                      placeholder="Describe your gift..."
                      rows={3}
                    />
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <label className={labelClasses}>Special Message</label>
              <textarea
                value={rsvpForm.message}
                onChange={(e) => setRsvpForm({...rsvpForm, message: e.target.value})}
                rows={4}
                className={inputClasses}
                placeholder="Share your wishes or any special requests..."
              />
            </div>
            
            <button
              onClick={handleRsvpSubmit}
              className="w-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black py-4 sm:py-5 px-8 rounded-xl text-base sm:text-lg font-bold hover:from-[#FFA500] hover:to-[#FFD700] transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-[#FFD700]/25"
            >
              Send RSVP
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}; 