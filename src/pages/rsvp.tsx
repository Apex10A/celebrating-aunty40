import React, { useState } from 'react';
import { Navigation } from '../components/Navigation';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Footer } from '../components/Footer';

const RSVPPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    numberOfGuests: 1,
    dietaryRestrictions: '',
    message: '',
    attending: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/submit-rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Thank you for your RSVP! We look forward to celebrating with you.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          numberOfGuests: 1,
          dietaryRestrictions: '',
          message: '',
          attending: true
        });
      } else {
        alert('There was an error submitting your RSVP. Please try again.');
      }
    } catch (error) {
      console.error('RSVP submission error:', error);
      alert('There was an error submitting your RSVP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
        <title>RSVP - 40 & 15 Years Celebration</title>
        <meta name="description" content="RSVP for Funmbi's 40th Birthday and 15th Wedding Anniversary Celebration" />
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
              <h1 className="font-decorative text-4xl md:text-5xl text-[#FFD700] mb-4">Join Our Double Celebration</h1>
              <div className="h-px w-32 sm:w-40 mx-auto bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mb-6"></div>
              <p className="text-gray-300 text-base md:text-lg">Please let us know if you'll be joining us for this special occasion</p>
            </motion.div>

            <div className="flex justify-center mb-8 sm:mb-12">
              <div className="flex bg-black/30 backdrop-blur-lg rounded-full p-1 border border-[#FFD700]/20">
                <button
                  onClick={() => setFormData({...formData, attending: true})}
                  className={`px-6 py-2 rounded-full transition-all duration-300 font-medium ${
                    formData.attending
                      ? 'bg-[#FFD700] text-black'
                      : 'text-[#FFD700] hover:bg-[#FFD700]/10'
                  }`}
                >
                  I'll Be There!
                </button>
                <button
                  onClick={() => setFormData({...formData, attending: false})}
                  className={`px-6 py-2 rounded-full transition-all duration-300 font-medium ${
                    !formData.attending
                      ? 'bg-[#FFD700] text-black'
                      : 'text-[#FFD700] hover:bg-[#FFD700]/10'
                  }`}
                >
                  Can't Make It
                </button>
              </div>
            </div>

            <div className="text-center mb-8 sm:mb-12">
              {formData.attending ? (
                <h2 className="font-decorative text-2xl md:text-3xl text-[#FFD700] mb-2">Yay, party time! 🎉</h2>
              ) : (
                <h2 className="font-decorative text-2xl md:text-3xl text-[#FFD700] mb-2">We'll miss you! 💝</h2>
              )}
              <p className="text-[#FFD700]/70">
                {formData.attending 
                  ? "We're so excited to celebrate with you!" 
                  : "We understand and appreciate you letting us know."
                }
              </p>
            </div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              onSubmit={handleSubmit}
              className="bg-black/50 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-[#FFD700]/10 mx-4 sm:mx-0"
            >
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
                    placeholder="Enter your full name"
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
                    placeholder="Enter your email"
                    required
                  />
                </div>

                {formData.attending && (
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
                        placeholder="Enter your phone number"
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
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                            <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
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
                          placeholder="Any dietary restrictions or allergies?"
                        />
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label htmlFor="message" className="block text-[#FFD700] mb-2 text-sm md:text-base">
                    Message (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 bg-black/50 border border-[#FFD700]/20 rounded-lg text-white focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-all resize-none text-base"
                    placeholder="Any special message or requests?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#FFD700] text-black rounded-full hover:bg-[#FFD700]/90 transition-all duration-300 font-medium mt-8 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
                </button>
              </div>
            </motion.form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RSVPPage; 