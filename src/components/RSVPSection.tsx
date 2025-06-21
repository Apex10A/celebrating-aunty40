import React, { useState } from 'react';
import { Calendar, MapPin, Users, Heart } from 'lucide-react';

export const RSVPSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    numberOfGuests: 1,
    dietaryRestrictions: '',
    message: '',
    attending: true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  const inputClasses = "w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl border border-[#FFD700]/20 bg-black/50 text-[#FFD700] placeholder-[#FFD700]/30 focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-all duration-300 text-base sm:text-lg";
  const labelClasses = "block text-[#FFD700] font-medium mb-2 sm:mb-3 text-sm sm:text-base";

  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 bg-[#0a0a0a] overflow-hidden">
      <div className="absolute inset-0 bg-[url('/gold-pattern.png')] opacity-5"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#DC143C] mb-6 sm:mb-8 font-serif text-center">
          RSVP
        </h2>
        
        <div className="h-px w-32 sm:w-40 mx-auto bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mb-8 sm:mb-12"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Event Details */}
          <div className="space-y-6 sm:space-y-8">
            <div className="bg-black/30 backdrop-blur-lg p-6 sm:p-8 rounded-2xl border border-[#FFD700]/10">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#FFD700] mb-6 sm:mb-8">Event Details</h3>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-4">
                  <Calendar className="text-[#FFD700] min-w-[24px]" size={24} />
                  <div>
                    <p className="text-[#FFD700] font-medium">Date & Time</p>
                    <p className="text-[#FFD700]/70">December 2025</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <MapPin className="text-[#FFD700] min-w-[24px]" size={24} />
                  <div>
                    <p className="text-[#FFD700] font-medium">Location</p>
                    <p className="text-[#FFD700]/70">Surulere, Lagos, Nigeria</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <Users className="text-[#FFD700] min-w-[24px]" size={24} />
                  <div>
                    <p className="text-[#FFD700] font-medium">Guest Limit</p>
                    <p className="text-[#FFD700]/70">Unlimited</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-black/30 backdrop-blur-lg p-6 sm:p-8 rounded-2xl border border-[#FFD700]/10">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="text-[#FFD700]" size={24} />
                <h3 className="text-xl sm:text-2xl font-bold text-[#FFD700]">Why RSVP?</h3>
              </div>
              <ul className="space-y-2 text-[#FFD700]/70">
                <li>• Help us plan the perfect celebration</li>
                <li>• Ensure we have enough food and drinks</li>
                <li>• Get updates and reminders</li>
                <li>• Join our special guest list</li>
              </ul>
            </div>
          </div>
          
          {/* RSVP Form */}
          <div className="bg-black/30 backdrop-blur-lg p-6 sm:p-8 rounded-2xl border border-[#FFD700]/10">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#FFD700] mb-6 sm:mb-8">RSVP Form</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label htmlFor="name" className={labelClasses}>Full Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className={inputClasses}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className={labelClasses}>Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className={inputClasses}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="phone" className={labelClasses}>Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className={inputClasses}
                  placeholder="Enter your phone number"
                />
              </div>
              
              <div>
                <label htmlFor="numberOfGuests" className={labelClasses}>Number of Guests</label>
                <select
                  id="numberOfGuests"
                  value={formData.numberOfGuests}
                  onChange={(e) => setFormData({...formData, numberOfGuests: parseInt(e.target.value)})}
                  className={inputClasses}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="dietaryRestrictions" className={labelClasses}>Dietary Restrictions</label>
                <input
                  type="text"
                  id="dietaryRestrictions"
                  value={formData.dietaryRestrictions}
                  onChange={(e) => setFormData({...formData, dietaryRestrictions: e.target.value})}
                  className={inputClasses}
                  placeholder="Any dietary restrictions or allergies?"
                />
              </div>
              
              <div>
                <label htmlFor="message" className={labelClasses}>Message (Optional)</label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className={`${inputClasses} resize-none`}
                  rows={3}
                  placeholder="Any special message or requests?"
                />
              </div>
              
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-[#FFD700] to-[#DC143C] text-black rounded-xl font-semibold text-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105"
              >
                Submit RSVP
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}; 