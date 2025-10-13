import React, { useState } from "react";
import { Navigation } from "../components/Navigation";
import Head from "next/head";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Footer } from "../components/Footer";
import { makeReservation, Reservation } from "@/services/reservations";
import { Decline, sendDecline } from "@/services/declines";
import { StatusModal, StatusType } from "@/components/StatusModal";

const RSVPPage = () => {
  const [reservation, setReservation] = useState<Reservation>();
  const [decline, setDecline] = useState<Decline>();
  const [attending, setAttending] = useState<boolean>(true);
  const [comingSolo, setComingSolo] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState<StatusType>("success");
  const [modalTitle, setModalTitle] = useState("");
  const [modalDesc, setModalDesc] = useState("");

  function validateForm() {
    // function to validate goes here praise
    return true;
  }

  // Reset all form fields back to empty
  function resetForm() {
    setReservation(undefined);
    setDecline(undefined);
    setComingSolo(false);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      if (attending) {
        const res = await makeReservation(reservation as Reservation);
        if (res?.status === 201) {
          setModalStatus("success");
          setModalTitle("RSVP Submitted");
          setModalDesc(
            "We’ll review your RSVP. If accepted, you’ll receive an email with your invitation code and QR code."
          );
          resetForm();
          setModalOpen(true);
          return;
        } else {
          setModalStatus("error");
          setModalTitle("Something went wrong");
          setModalDesc("We couldn't submit your RSVP. Please try again.");
          setModalOpen(true);
          return;
        }
      } else {
        const res = await sendDecline(decline as Decline);
        if ((res as any)?.status === 201 || res) {
          setModalStatus("success");
          setModalTitle("Response Received");
          setModalDesc(
            "Thank you for letting us know. You'll be in our hearts."
          );
          resetForm();
          setModalOpen(true);
          return;
        } else {
          setModalStatus("error");
          setModalTitle("Unable to send response");
          setModalDesc("Please try again in a moment.");
          setModalOpen(true);
          return;
        }
      }
    } catch (error) {
      console.error("RSVP submission error:", error);
      setModalStatus("error");
      setModalTitle("Network or server error");
      setModalDesc(
        "There was an error submitting your RSVP. Please try again."
      );
      setModalOpen(true);
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    const normalizedValue: any = name === "numOfGuests" ? Number(value) : value;
    if (attending)
      setReservation(
        (prev) =>
          ({
            ...prev,
            [name]: normalizedValue,
          } as Reservation)
      );
    else
      setDecline(
        (prev) =>
          ({
            ...prev,
            [name]: normalizedValue,
          } as Decline)
      );
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
        <meta
          name="description"
          content="RSVP for Funmbi's 40th Birthday and 15th Wedding Anniversary Celebration"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      
      {showSuccess && <SuccessModal />}
      <div className="min-h-screen bg-gradient-to-b from-black via-[#1a1a1a] to-black">
        <Navigation />
        <div className="pt-44 md:pt-[250px] pb-16 md:pb-24 px-4">
          <div className="max-w-lg mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8 md:mb-12"
            >
              <h1 className="font-decorative text-3xl md:text-5xl text-[#FFD700] mb-4">
                Join Our Double Celebration
              </h1>
              <div className="h-px w-32 sm:w-40 mx-auto bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mb-6"></div>
              <p className="text-gray-300 text-sm md:text-lg max-w-[70%] md:max-w-full mx-auto">
                Please let us know if you'll be joining us for this special
                occasion
              </p>
            </motion.div>

            <div className="flex justify-center mb-8 sm:mb-12">
              <div className="flex bg-black/30 backdrop-blur-lg rounded-full p-1 border border-[#FFD700]/20">
                <button
                  onClick={() => setAttending(true)}
                  className={`px-6 py-2 rounded-full transition-all duration-300 font-medium text-sm md:text-md ${
                    attending
                      ? "bg-[#FFD700] text-black"
                      : "text-[#FFD700] hover:bg-[#FFD700]/10"
                  }`}
                >
                  I'll Be There!
                </button>
                <button
                  onClick={() => setAttending(false)}
                  className={`px-6 py-2 rounded-full transition-all duration-300 font-medium text-sm md:text-md ${
                    !attending
                      ? "bg-[#FFD700] text-black"
                      : "text-[#FFD700] hover:bg-[#FFD700]/10"
                  }`}
                >
                  Can't Make It
                </button>
              </div>
            </div>

            <div className="text-center mb-8 sm:mb-12">
              {attending ? (
                <h2 className="font-decorative text-2xl md:text-3xl text-[#FFD700] mb-2">
                  Yay, party time! 🎉
                </h2>
              ) : (
                <h2 className="font-decorative text-2xl md:text-3xl text-[#FFD700] mb-2">
                  We'll miss you! 💝
                </h2>
              )}
              <p className="text-[#FFD700]/70 text-sm md:text-md">
                {attending
                  ? "We're so excited to celebrate with you!"
                  : "We understand and appreciate you letting us know."}
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
                  <label
                    htmlFor="name"
                    className="block text-[#FFD700] mb-2 text-sm md:text-base"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={attending ? reservation?.name : decline?.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-black/50 border border-[#FFD700]/20 rounded-lg text-white focus:border-[#555454] focus:ring-1 focus:ring-[#000000] transition-all text-sm md:text-base outline-none"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-[#FFD700] mb-2 text-sm md:text-base"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={attending ? reservation?.email : decline?.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-black/50 border border-[#FFD700]/20 rounded-lg text-white focus:border-[#555454]focus:ring-1 focus:ring-[#FFD700] transition-all text-sm md:text-base"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                {attending && (
                  <>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-[#FFD700] mb-2 text-sm md:text-base"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phoneNumber"
                        value={reservation?.phoneNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-black/50 border border-[#FFD700]/20 rounded-lg text-white focus:border-[#555454]focus:ring-1 focus:ring-[#FFD700] transition-all text-sm md:text-base"
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="numOfGuests"
                          className="block text-[#FFD700] mb-2 text-sm md:text-base"
                        >
                          Number of Guests (put 0 if you're coming alone)
                        </label>
                        <div className="relative group">
                          <select
                            id="numOfGuests"
                            name="numOfGuests"
                            value={comingSolo ? 0 : reservation?.numOfGuests ?? ""}
                            onChange={handleInputChange}
                            className="appearance-none w-full px-4 py-2 pr-10 bg-black/50 border border-[#FFD700]/20 rounded-lg text-white focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700]/60 transition-all text-sm md:text-base hover:border-[#FFD700]/40 disabled:opacity-60 disabled:cursor-not-allowed"
                            disabled={comingSolo}
                          >
                            <option value="" disabled>
                              Select no of guests
                            </option>
                            <option value={0}>0</option>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                              <option key={num} value={num}>
                                {num}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#FFD700]/70 group-focus-within:text-[#FFD700]" />
                        </div>
                       
                      </div>

                      <div>
                        <label
                          htmlFor="dietaryRestrictions"
                          className="block text-[#FFD700] mb-2 text-sm md:text-base"
                        >
                          Dietary Restrictions 
                        </label>
                        <input
                          type="text"
                          id="dietaryRestrictions"
                          name="restrictions"
                          value={reservation?.restriction}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 bg-black/50 border border-[#FFD700]/20 rounded-lg text-white focus:border-[#555454]focus:ring-1 focus:ring-[#FFD700] transition-all text-sm md:text-base"
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
                  <label
                    htmlFor="message"
                    className="block text-[#FFD700] mb-2 text-sm md:text-base"
                  >
                    Message (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={attending ? reservation?.message : decline?.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 bg-black/50 border border-[#FFD700]/20 rounded-lg text-white focus:border-[#555454]focus:ring-1 focus:ring-[#FFD700] transition-all text-sm md:text-base"
                    placeholder="Any special message or requests?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#FFD700] text-black rounded-xl hover:bg-[#FFD700]/90 transition-all duration-300 mt-8  disabled:opacity-50 disabled:cursor-not-allowed font-bold tracking-widest uppercase text-sm md:text-base"
                >
                  {isSubmitting ? "Submitting..." : "Submit RSVP"}
                </button>
              </div>
            </motion.form>
          </div>
        </div>
      </div>
      <Footer />

      {/* Status Modal */}
      <StatusModal
        open={modalOpen}
        status={modalStatus}
        title={modalTitle}
        description={modalDesc}
        onClose={() => setModalOpen(false)}
       
      />
    </>
  );
};

export default RSVPPage;
