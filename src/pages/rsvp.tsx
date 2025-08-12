import React, { useState } from 'react';
import { Navigation } from '../components/Navigation';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Footer } from '../components/Footer';
import { Upload, X, Camera } from 'lucide-react';

const RSVPPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    numberOfGuests: 1,
    dietaryRestrictions: '',
    message: '',
    attending: true,
    hasDriver: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [guestCode, setGuestCode] = useState<string>('');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      const isValidType = file.type.startsWith('image/');
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit
      return isValidType && isValidSize;
    });
    
    setSelectedFiles(prev => [...prev, ...validFiles].slice(0, 5)); // Max 5 photos
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const uploadPhotos = async (): Promise<string[]> => {
    if (selectedFiles.length === 0) return [];

    const uploadedUrls: string[] = [];
    
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const formData = new FormData();
      formData.append('file', file);
      
      try {
        const response = await fetch('/api/upload-photo', {
          method: 'POST',
          body: formData,
        });
        
        if (response.ok) {
          const data = await response.json();
          uploadedUrls.push(data.url);
        }
        
        setUploadProgress(((i + 1) / selectedFiles.length) * 100);
      } catch (error) {
        console.error('Photo upload error:', error);
      }
    }
    
    return uploadedUrls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setUploadProgress(0);

    try {
      // Upload photos first if any
      const photoUrls = await uploadPhotos();
      
      // Submit RSVP with photo URLs
      const response = await fetch('/api/submit-rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          photoUrls
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setGuestCode(data.guestCode);
        setShowSuccess(true);
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          numberOfGuests: 1,
          dietaryRestrictions: '',
          message: '',
          attending: true,
          hasDriver: false
        });
        setSelectedFiles([]);
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'There was an error submitting your RSVP. Please try again.');
      }
    } catch (error) {
      console.error('RSVP submission error:', error);
      alert('There was an error submitting your RSVP. Please try again.');
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Success Modal Component
  const SuccessModal = () => (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-black via-[#1a1a1a] to-black p-8 rounded-xl border border-[#FFD700]/20 max-w-md w-full text-center"
      >
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="font-decorative text-2xl text-[#FFD700] mb-4">
          {formData.attending ? "You're All Set!" : "Thank You!"}
        </h2>
        
        {formData.attending && guestCode && (
          <div className="bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-lg p-4 mb-6">
            <p className="text-[#FFD700] text-sm mb-2">Your Guest Code:</p>
            <div className="bg-[#FFD700] text-black px-4 py-2 rounded font-bold text-lg tracking-wider">
              {guestCode}
            </div>
            <p className="text-[#FFD700]/70 text-xs mt-2">
              Save this code - you'll need it to enter the event!
            </p>
          </div>
        )}
        
        <p className="text-gray-300 mb-6">
          {formData.attending 
            ? "A confirmation email with your guest code has been sent to you. We can't wait to celebrate with you!"
            : "We understand and appreciate you letting us know. We'll miss you!"
          }
        </p>
        
        <button
          onClick={() => setShowSuccess(false)}
          className="bg-[#FFD700] text-black px-6 py-2 rounded-full hover:bg-[#FFD700]/90 transition-all"
        >
          Close
        </button>
      </motion.div>
    </div>
  );

  return (
    <>
      <Head>
        <title>RSVP - 40 & 15 Years Celebration</title>
        <meta name="description" content="RSVP for Funmbi's 40th Birthday and 15th Wedding Anniversary Celebration" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      
      {showSuccess && <SuccessModal />}
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

                    <div>
                      <label className="block text-[#FFD700] mb-3 text-sm md:text-base">Transportation</label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id="hasDriver"
                          name="hasDriver"
                          checked={formData.hasDriver}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-[#FFD700] bg-black/50 border-[#FFD700]/20 rounded focus:ring-[#FFD700] focus:ring-2"
                        />
                        <label htmlFor="hasDriver" className="text-white text-sm md:text-base">
                          I'm coming with a driver
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[#FFD700] mb-3 text-sm md:text-base">
                        Share Photos (Optional)
                      </label>
                      <p className="text-[#FFD700]/70 text-sm mb-4">
                        Upload photos that might be used in the event gallery or slideshow
                      </p>
                      
                      <div className="border-2 border-dashed border-[#FFD700]/30 rounded-lg p-6 text-center hover:border-[#FFD700]/50 transition-all">
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleFileSelect}
                          className="hidden"
                          id="photo-upload"
                        />
                        <label htmlFor="photo-upload" className="cursor-pointer">
                          <Camera className="w-8 h-8 text-[#FFD700] mx-auto mb-2" />
                          <p className="text-[#FFD700] mb-1">Click to upload photos</p>
                          <p className="text-[#FFD700]/70 text-sm">Max 5 photos, 5MB each</p>
                        </label>
                      </div>

                      {selectedFiles.length > 0 && (
                        <div className="mt-4 space-y-2">
                          <p className="text-[#FFD700] text-sm">Selected Photos:</p>
                          {selectedFiles.map((file, index) => (
                            <div key={index} className="flex items-center justify-between bg-black/30 p-2 rounded">
                              <span className="text-white text-sm truncate">{file.name}</span>
                              <button
                                type="button"
                                onClick={() => removeFile(index)}
                                className="text-red-400 hover:text-red-300 ml-2"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      {uploadProgress > 0 && uploadProgress < 100 && (
                        <div className="mt-4">
                          <div className="bg-black/30 rounded-full h-2">
                            <div 
                              className="bg-[#FFD700] h-2 rounded-full transition-all duration-300"
                              style={{ width: `${uploadProgress}%` }}
                            />
                          </div>
                          <p className="text-[#FFD700] text-sm mt-1">Uploading photos... {Math.round(uploadProgress)}%</p>
                        </div>
                      )}
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