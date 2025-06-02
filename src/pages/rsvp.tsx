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
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-black via-[#1a1a1a] to-black">
        <Navigation />
        <div className="pt-32 pb-24 px-4">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h1 className="font-decorative text-5xl text-[#FFD700] mb-4">Join Our Celebration</h1>
              <p className="text-gray-300 text-lg">We would be honored to have you join us on this special day</p>
            </motion.div>

            {attending === null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                <h2 className="text-2xl text-white mb-8">Will you be attending our anniversary celebration?</h2>
                <div className="flex justify-center gap-6">
                  <button
                    onClick={() => setAttending(true)}
                    className="px-8 py-3 bg-[#FFD700] text-black rounded-full hover:bg-[#FFD700]/90 transition-all duration-300 font-medium"
                  >
                    Yes, I'll be there!
                  </button>
                  <button
                    onClick={() => setAttending(false)}
                    className="px-8 py-3 border-2 border-[#FFD700] text-[#FFD700] rounded-full hover:bg-[#FFD700]/10 transition-all duration-300"
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
                className="bg-black/50 backdrop-blur-sm p-8 rounded-xl border border-[#FFD700]/10"
              >
                {attending ? (
                  <div className="text-center mb-8">
                    <h2 className="font-decorative text-3xl text-[#FFD700] mb-2">Yay, party time! 🎉</h2>
                    <p className="text-gray-300">Please fill in your details below</p>
                  </div>
                ) : (
                  <div className="text-center mb-8">
                    <h2 className="font-decorative text-3xl text-[#FFD700] mb-2">We'll miss you! 💝</h2>
                    <p className="text-gray-300">Leave a message for the anniversary couple</p>
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-[#FFD700] mb-2">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-black/50 border border-[#FFD700]/20 rounded-lg text-white focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-[#FFD700] mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-black/50 border border-[#FFD700]/20 rounded-lg text-white focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-all"
                      required
                    />
                  </div>

                  {attending && (
                    <>
                      <div>
                        <label htmlFor="phone" className="block text-[#FFD700] mb-2">Phone Number</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 bg-black/50 border border-[#FFD700]/20 rounded-lg text-white focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-all"
                        />
                      </div>

                      <div>
                        <label htmlFor="numberOfGuests" className="block text-[#FFD700] mb-2">Number of Guests</label>
                        <select
                          id="numberOfGuests"
                          name="numberOfGuests"
                          value={formData.numberOfGuests}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 bg-black/50 border border-[#FFD700]/20 rounded-lg text-white focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-all"
                        >
                          {[1, 2, 3, 4].map(num => (
                            <option key={num} value={num}>{num}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="dietaryRestrictions" className="block text-[#FFD700] mb-2">Dietary Restrictions</label>
                        <input
                          type="text"
                          id="dietaryRestrictions"
                          name="dietaryRestrictions"
                          value={formData.dietaryRestrictions}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 bg-black/50 border border-[#FFD700]/20 rounded-lg text-white focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-all"
                          placeholder="Optional"
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <label htmlFor="message" className="block text-[#FFD700] mb-2">
                      {attending ? 'Any message for the couple?' : 'Your message'}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-2 bg-black/50 border border-[#FFD700]/20 rounded-lg text-white focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-all resize-none"
                      required={!attending}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#FFD700] text-black rounded-full hover:bg-[#FFD700]/90 transition-all duration-300 font-medium mt-8"
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