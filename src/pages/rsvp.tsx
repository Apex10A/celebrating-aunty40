import React, { useState } from 'react';
import { Navigation } from '../components/Navigation';
import Head from 'next/head';
import { motion } from 'framer-motion';

const RSVPPage = () => {
  const [attending, setAttending] = useState<boolean | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    numberOfGuests: 1,
    dietaryRestrictions: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <Head>
        <title>RSVP - 40th Anniversary Celebration</title>
        <meta name="description" content="RSVP to our 40th wedding anniversary celebration" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-black via-[#1a1a1a] to-black">
        <Navigation />
        <div className="pt-24 md:pt-32 pb-16 md:pb-24 px-4">
          <div className="max-w-lg mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8 md:mb-12"
            >
              <h1 className="font-decorative text-4xl md:text-5xl text-[#FFD700] mb-4">Join Our Celebration</h1>
              <p className="text-gray-300 text-base md:text-lg">We would be honored to have you join us on this special day</p>
            </motion.div>

            {attending === null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center px-4"
              >
                <h2 className="text-xl md:text-2xl text-white mb-8">Will you be attending our anniversary celebration?</h2>
                <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
                  <button
                    onClick={() => setAttending(true)}
                    className="w-full sm:w-auto px-8 py-3 bg-[#FFD700] text-black rounded-full hover:bg-[#FFD700]/90 transition-all duration-300 font-medium"
                  >
                    Yes, I'll be there!
                  </button>
                  <button
                    onClick={() => setAttending(false)}
                    className="w-full sm:w-auto px-8 py-3 border-2 border-[#FFD700] text-[#FFD700] rounded-full hover:bg-[#FFD700]/10 transition-all duration-300"
                  >
                    Sorry, I can't make it
                  </button>
                </div>
              </motion.div>
            )}

            {attending !== null && (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                onSubmit={handleSubmit}
                className="bg-black/50 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-[#FFD700]/10 mx-4 sm:mx-0"
              >
                {attending ? (
                  <div className="text-center mb-8">
                    <h2 className="font-decorative text-2xl md:text-3xl text-[#FFD700] mb-2">Yay, party time! 🎉</h2>
                    <p className="text-gray-300">Please fill in your details below</p>
                  </div>
                ) : (
                  <div className="text-center mb-8">
                    <h2 className="font-decorative text-2xl md:text-3xl text-[#FFD700] mb-2">We'll miss you! 💝</h2>
                    <p className="text-gray-300">Leave a message for the anniversary couple</p>
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-[#FFD700] mb-2 text-sm md:text-base">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-black/50 border border-[#FFD700]/20 rounded-lg text-white focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-all text-base"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-[#FFD700] mb-2 text-sm md:text-base">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-black/50 border border-[#FFD700]/20 rounded-lg text-white focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-all text-base"
                      required
                    />
                  </div>

                  {attending && (
                    <>
                      <div>
                        <label htmlFor="phone" className="block text-[#FFD700] mb-2 text-sm md:text-base">Phone Number</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 bg-black/50 border border-[#FFD700]/20 rounded-lg text-white focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-all text-base"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="numberOfGuests" className="block text-[#FFD700] mb-2 text-sm md:text-base">Number of Guests</label>
                          <select
                            id="numberOfGuests"
                            name="numberOfGuests"
                            value={formData.numberOfGuests}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 bg-black/50 border border-[#FFD700]/20 rounded-lg text-white focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-all text-base"
                          >
                            {[1, 2, 3, 4].map(num => (
                              <option key={num} value={num}>{num}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label htmlFor="dietaryRestrictions" className="block text-[#FFD700] mb-2 text-sm md:text-base">Dietary Restrictions</label>
                          <input
                            type="text"
                            id="dietaryRestrictions"
                            name="dietaryRestrictions"
                            value={formData.dietaryRestrictions}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 bg-black/50 border border-[#FFD700]/20 rounded-lg text-white focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-all text-base"
                            placeholder="Optional"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div>
                    <label htmlFor="message" className="block text-[#FFD700] mb-2 text-sm md:text-base">
                      {attending ? 'Any message for the couple?' : 'Your message'}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-2 bg-black/50 border border-[#FFD700]/20 rounded-lg text-white focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-all resize-none text-base"
                      required={!attending}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#FFD700] text-black rounded-full hover:bg-[#FFD700]/90 transition-all duration-300 font-medium mt-8 text-base"
                  >
                    {attending ? 'Confirm Attendance' : 'Send Message'}
                  </button>
                </div>
              </motion.form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RSVPPage; 