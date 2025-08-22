import React, { useState } from "react";
import { Navigation } from "../components/Navigation";
import Head from "next/head";
import { motion } from "framer-motion";
import { Footer } from "../components/Footer";
import { makeReservation, Reservation } from "@/services/reservations";
import { Decline, sendDecline } from "@/services/declines";

const RSVPPage = () => {
  const [reservation, setReservation] = useState<Reservation>();
  const [decline, setDecline] = useState<Decline>();
  const [attending, setAttending] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validateForm() {
    // function to validate goes here praise
    return true;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      console.log(reservation, "reservation");
      console.log(decline, "decline");
      if (attending) {
        const res = await makeReservation(reservation as Reservation);
        if (res?.status === 201) return; // do something on success
        else return; // do something else, display an error message or something
      } else {
        const res = await sendDecline(decline as Decline);
        // if (res?.status === 201) return; // do something on success
        // else return; // do something else, display an error message or something
      }
    } catch (error) {
      console.error("RSVP submission error:", error);
      alert("There was an error submitting your RSVP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (attending)
      setReservation(
        (prev) =>
          ({
            ...prev,
            [name]: value,
          } as Reservation)
      );
    else
      setDecline(
        (prev) =>
          ({
            ...prev,
            [name]: value,
          } as Decline)
      );
  };

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
      <div className="min-h-screen bg-gradient-to-b from-black via-[#1a1a1a] to-black">
        <Navigation />
        <div className="pt-24 md:pt-32 pb-16 md:pb-24 px-4">
          <div className="max-w-lg mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8 md:mb-12">
              <h1 className="font-decorative text-4xl md:text-5xl text-[#FFD700] mb-4">
                Join Our Double Celebration
              </h1>
              <div className="h-px w-32 sm:w-40 mx-auto bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mb-6"></div>
              <p className="text-gray-300 text-base md:text-lg">
                Please let us know if you'll be joining us for this special
                occasion
              </p>
            </motion.div>

            <div className="flex justify-center mb-8 sm:mb-12">
              <div className="flex bg-black/30 backdrop-blur-lg rounded-full p-1 border border-[#FFD700]/20">
                <button
                  onClick={() => setAttending(true)}
                  className={`px-6 py-2 rounded-full transition-all duration-300 font-medium ${
                    attending
                      ? "bg-[#FFD700] text-black"
                      : "text-[#FFD700] hover:bg-[#FFD700]/10"
                  }`}>
                  I'll Be There!
                </button>
                <button
                  onClick={() => setAttending(false)}
                  className={`px-6 py-2 rounded-full transition-all duration-300 font-medium ${
                    !attending
                      ? "bg-[#FFD700] text-black"
                      : "text-[#FFD700] hover:bg-[#FFD700]/10"
                  }`}>
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
              <p className="text-[#FFD700]/70">
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
              className="bg-black/50 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-[#FFD700]/10 mx-4 sm:mx-0">
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-[#FFD700] mb-2 text-sm md:text-base">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={attending ? reservation?.name : decline?.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-black/50 border border-[#FFD700]/20 rounded-lg text-white focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-all text-base"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-[#FFD700] mb-2 text-sm md:text-base">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={attending ? reservation?.email : decline?.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-black/50 border border-[#FFD700]/20 rounded-lg text-white focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-all text-base"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                {attending && (
                  <>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-[#FFD700] mb-2 text-sm md:text-base">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phoneNumber"
                        value={reservation?.phoneNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-black/50 border border-[#FFD700]/20 rounded-lg text-white focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-all text-base"
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="numOfGuests"
                          className="block text-[#FFD700] mb-2 text-sm md:text-base">
                          Number of Guests
                        </label>
                        <select
                          id="numOfGuests"
                          name="numOfGuests"
                          value={reservation?.numOfGuests}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 bg-black/50 border border-[#FFD700]/20 rounded-lg text-white focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-all text-base">
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <option key={num} value={num}>
                              {num} {num === 1 ? "Guest" : "Guests"}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="dietaryRestrictions"
                          className="block text-[#FFD700] mb-2 text-sm md:text-base">
                          Dietary Restrictions
                        </label>
                        <input
                          type="text"
                          id="dietaryRestrictions"
                          name="restrictions"
                          value={reservation?.restriction}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 bg-black/50 border border-[#FFD700]/20 rounded-lg text-white focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-all text-base"
                          placeholder="Any dietary restrictions or allergies?"
                        />
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label
                    htmlFor="message"
                    className="block text-[#FFD700] mb-2 text-sm md:text-base">
                    Message (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={attending ? reservation?.message : decline?.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 bg-black/50 border border-[#FFD700]/20 rounded-lg text-white focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-all resize-none text-base"
                    placeholder="Any special message or requests?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#FFD700] text-black rounded-full hover:bg-[#FFD700]/90 transition-all duration-300 font-medium mt-8 text-base disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSubmitting ? "Submitting..." : "Submit RSVP"}
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
