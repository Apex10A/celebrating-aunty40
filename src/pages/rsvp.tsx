import React, { useState } from "react";
import { Navigation } from "../components/Navigation";
import Head from "next/head";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Footer } from "../components/Footer";
import { makeReservation, Reservation } from "@/services/reservations";
import { Decline, sendDecline } from "@/services/declines";
import { StatusModal, StatusType } from "@/components/StatusModal";

type ReservationFormState = Omit<Reservation, "numOfGuests"> & {
  numOfGuests: number | "";
};

const createReservationState = (): ReservationFormState => ({
  name: "",
  email: "",
  phoneNumber: "",
  message: "",
  restriction: "",
  numOfGuests: "",
});

const createDeclineState = (): Decline => ({
  name: "",
  email: "",
  message: "",
});

const RSVPPage = () => {
  const [reservation, setReservation] = useState<ReservationFormState>(() => createReservationState());
  const [decline, setDecline] = useState<Decline>(() => createDeclineState());
  const [attending, setAttending] = useState<boolean>(true);
  const [comingSolo, setComingSolo] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState<StatusType>("success");
  const [modalTitle, setModalTitle] = useState("");
  const [modalDesc, setModalDesc] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const getFieldClasses = (hasError: boolean) =>
    `w-full px-4 py-2 bg-black/50 rounded-lg text-white transition-all text-sm md:text-base outline-none border ${
      hasError
        ? "border-red-500/70 focus:border-red-400 focus:ring-1 focus:ring-red-500/40"
        : "border-[#FFD700]/20 focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700]/60 hover:border-[#FFD700]/40"
    }`;

  const getSelectClasses = (hasError: boolean) =>
    `appearance-none w-full px-4 py-2 pr-10 bg-black/50 rounded-lg text-white transition-all text-sm md:text-base outline-none border ${
      hasError
        ? "border-red-500/70 focus:border-red-400 focus:ring-1 focus:ring-red-500/40"
        : "border-[#FFD700]/20 focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700]/60 hover:border-[#FFD700]/40"
    } disabled:opacity-60 disabled:cursor-not-allowed`;

  const clearFieldError = (field: string) =>
    setFormErrors((prev) => {
      if (!prev[field]) return prev;
      const updated = { ...prev };
      delete updated[field];
      return updated;
    });

  const handleAttendingChange = (value: boolean) => {
    setAttending(value);
    setFormErrors({});
  };

  const handleSoloToggle = (checked: boolean) => {
    setComingSolo(checked);
    setReservation((prev) => ({
      ...prev,
      numOfGuests: checked ? 0 : "",
    }));
    setFormErrors((prev) => {
      if (!prev.numOfGuests) return prev;
      const updated = { ...prev };
      delete updated.numOfGuests;
      return updated;
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (attending) {
      if (name === "numOfGuests") {
        setReservation((prev) => ({
          ...prev,
          numOfGuests: value === "" ? "" : Number(value),
        }));
      } else {
        const fieldName = name as Exclude<keyof ReservationFormState, "numOfGuests">;
        setReservation((prev) => ({
          ...prev,
          [fieldName]: value,
        }));
      }
    } else {
      const fieldName = name as keyof Decline;
      setDecline((prev) => ({
        ...prev,
        [fieldName]: value,
      }));
    }
    clearFieldError(name);
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (attending) {
      const nameValue = reservation.name.trim();
      const emailValue = reservation.email.trim();
      if (!nameValue) errors.name = "Name is required.";
      if (!emailValue) errors.email = "Email is required.";
      else if (!emailPattern.test(emailValue)) errors.email = "Enter a valid email.";
      if (!comingSolo) {
        if (
          reservation.numOfGuests === "" ||
          (typeof reservation.numOfGuests === "number" && reservation.numOfGuests <= 0)
        ) {
          errors.numOfGuests = "Please select the number of guests.";
        }
      }
      if (reservation.phoneNumber && reservation.phoneNumber.trim() && reservation.phoneNumber.trim().length < 7) {
        errors.phoneNumber = "Enter a valid phone number.";
      }
    } else {
      const nameValue = decline.name.trim();
      const emailValue = decline.email.trim();
      if (!nameValue) errors.name = "Name is required.";
      if (!emailValue) errors.email = "Email is required.";
      else if (!emailPattern.test(emailValue)) errors.email = "Enter a valid email.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const resetForm = () => {
    setReservation(createReservationState());
    setDecline(createDeclineState());
    setComingSolo(false);
    setFormErrors({});
  };

  const openStatusModal = (status: StatusType, title: string, description: string) => {
    setModalStatus(status);
    setModalTitle(title);
    setModalDesc(description);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      if (attending) {
        const sanitizedReservation: Reservation = {
          name: reservation.name.trim(),
          email: reservation.email.trim(),
          phoneNumber: reservation.phoneNumber.trim(),
          numOfGuests: comingSolo ? 0 : (reservation.numOfGuests as number),
          restriction: reservation.restriction?.trim()
            ? reservation.restriction.trim()
            : undefined,
          message: reservation.message?.trim() ? reservation.message.trim() : undefined,
        };
        const res = await makeReservation(sanitizedReservation);
        if (res?.status === 201) {
          openStatusModal(
            "success",
            "You're on the list!",
            "Thanks for confirming. We'll send your invitation details to your inbox soon."
          );
          resetForm();
          return;
        }
        openStatusModal(
          "error",
          "Submission failed",
          "We couldn't submit your RSVP. Please try again."
        );
        return;
      }
      const sanitizedDecline: Decline = {
        name: decline.name.trim(),
        email: decline.email.trim(),
        message: decline.message?.trim() ? decline.message.trim() : undefined,
      };
      const res = await sendDecline(sanitizedDecline);
      if ((res as any)?.status === 201 || res) {
        openStatusModal(
          "success",
          "Response saved",
          "Thanks for letting us know. We'll be celebrating with you in spirit."
        );
        resetForm();
        return;
      }
      openStatusModal(
        "error",
        "Unable to send response",
        "Please try again in a moment."
      );
    } catch (error) {
      console.error("RSVP submission error:", error);
      openStatusModal(
        "error",
        "Network issue",
        "We couldn't reach the server. Please try again shortly."
      );
    } finally {
      setIsSubmitting(false);
    }
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
                  type="button"
                  onClick={() => handleAttendingChange(true)}
                  aria-pressed={attending}
                  className={`px-6 py-2 rounded-full transition-all duration-300 font-medium text-sm md:text-md ${
                    attending
                      ? "bg-[#FFD700] text-black"
                      : "text-[#FFD700] hover:bg-[#FFD700]/10"
                  }`}
                >
                  I'll Be There!
                </button>
                <button
                  type="button"
                  onClick={() => handleAttendingChange(false)}
                  aria-pressed={!attending}
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
              noValidate
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
                    value={attending ? reservation.name : decline.name}
                    onChange={handleInputChange}
                    className={getFieldClasses(Boolean(formErrors.name))}
                    placeholder="Enter your full name"
                    aria-invalid={Boolean(formErrors.name)}
                    aria-describedby={formErrors.name ? "name-error" : undefined}
                    required
                  />
                  {formErrors.name && (
                    <p id="name-error" className="mt-1 text-xs text-red-400" role="alert">
                      {formErrors.name}
                    </p>
                  )}
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
                    value={attending ? reservation.email : decline.email}
                    onChange={handleInputChange}
                    className={getFieldClasses(Boolean(formErrors.email))}
                    placeholder="Enter your email"
                    aria-invalid={Boolean(formErrors.email)}
                    aria-describedby={formErrors.email ? "email-error" : undefined}
                    required
                  />
                  {formErrors.email && (
                    <p id="email-error" className="mt-1 text-xs text-red-400" role="alert">
                      {formErrors.email}
                    </p>
                  )}
                </div>

                {attending && (
                  <>
                    <div>
                      <label
                        htmlFor="phoneNumber"
                        className="block text-[#FFD700] mb-2 text-sm md:text-base"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={reservation.phoneNumber}
                        onChange={handleInputChange}
                        className={getFieldClasses(Boolean(formErrors.phoneNumber))}
                        placeholder="Enter your phone number"
                        aria-invalid={Boolean(formErrors.phoneNumber)}
                        aria-describedby={formErrors.phoneNumber ? "phoneNumber-error" : undefined}
                      />
                      {formErrors.phoneNumber && (
                        <p id="phoneNumber-error" className="mt-1 text-xs text-red-400" role="alert">
                          {formErrors.phoneNumber}
                        </p>
                      )}
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
                            value={
                              comingSolo
                                ? "0"
                                : reservation.numOfGuests === ""
                                ? ""
                                : String(reservation.numOfGuests)
                            }
                            onChange={handleInputChange}
                            className={getSelectClasses(Boolean(formErrors.numOfGuests))}
                            disabled={comingSolo}
                            aria-invalid={Boolean(formErrors.numOfGuests)}
                            aria-describedby={formErrors.numOfGuests ? "numOfGuests-error" : undefined}
                          >
                            <option value="" disabled>
                              Select no of guests
                            </option>
                            <option value="0">0</option>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                              <option key={num} value={num}>
                                {num}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#FFD700]/70 group-focus-within:text-[#FFD700]" />
                        </div>
                        {formErrors.numOfGuests && (
                          <p id="numOfGuests-error" className="mt-1 text-xs text-red-400" role="alert">
                            {formErrors.numOfGuests}
                          </p>
                        )}
                        <div className="flex items-center gap-2 mt-2">
                          <input
                            id="comingSolo"
                            name="comingSolo"
                            type="checkbox"
                            checked={comingSolo}
                            onChange={(event) => handleSoloToggle(event.target.checked)}
                            className="h-4 w-4 rounded border-[#FFD700]/40 bg-black/40 text-[#FFD700] focus:ring-[#FFD700]"
                          />
                          <label htmlFor="comingSolo" className="text-xs text-[#FFD700]/80">
                            I'm coming alone
                          </label>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="restriction"
                          className="block text-[#FFD700] mb-2 text-sm md:text-base"
                        >
                          Dietary Restrictions
                        </label>
                        <input
                          type="text"
                          id="restriction"
                          name="restriction"
                          value={reservation.restriction}
                          onChange={handleInputChange}
                          className={getFieldClasses(false)}
                          placeholder="Any dietary restrictions or allergies?"
                        />
                      </div>
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
                    value={attending ? reservation.message : decline.message ?? ""}
                    onChange={handleInputChange}
                    rows={4}
                    className={getFieldClasses(false)}
                    placeholder="Any special message or requests?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#FFD700] text-black rounded-xl hover:bg-[#FFD700]/90 transition-all duration-300 mt-8 disabled:opacity-50 disabled:cursor-not-allowed font-bold tracking-widest uppercase text-sm md:text-base"
                >
                  {isSubmitting ? "Submitting..." : "Submit RSVP"}
                </button>
              </div>
            </motion.form>
          </div>
        </div>
      </div>
      <Footer />

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
