import React from "react";
import { motion } from "framer-motion";

const OurStory = () => {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-black to-[#140404]" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 40%, rgba(255,215,0,0.2) 0%, rgba(10,10,10,0.85) 70%, rgba(0,0,0,0.95) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 text-center text-gray-300">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-serif font-semibold text-[#FFD700]"
        >
          Our Story — 15 Years of Love & Grace
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-gray-400"
        >
          A lifetime journey that began with a chance meeting has blossomed into a lifetime
          of laughter, faith, and togetherness.
        </motion.p>
      </div>

      {/* Timeline Sections */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 space-y-24">
        {/* Section 1 */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-center gap-10"
        >
          <img
            src="/thirty.jpg"
            alt="How it all began"
            className="w-full md:w-1/2 rounded-3xl border border-[#FFD700]/20 shadow-[0_0_60px_-10px_rgba(255,215,0,0.3)] object-cover"
          />
          <div className="md:w-1/2 space-y-4 text-gray-300">
            <h2 className="text-2xl font-semibold text-[#FFD700]">
              How It All Began
            </h2>
            <p className="text-gray-400 leading-relaxed">
              It all started in the most unexpected place, the neighborhood
              where I grew up. She came just for an event, never knowing destiny
              had a plan. One brief encounter, a few exchanged words, and a
              beautiful journey began. <span className="text-[#FFD700] italic">——Temitope</span>
            </p>
            <p className="text-gray-400 leading-relaxed">
              Love found me when I wasn’t even searching. The greatest gift and happiest moment was when I set my eyes on Temitope. Right there, I knew this is the man I would spend my whole life with.
              <span className="text-[#FFD700] italic">——Oluwafunmbi</span>
            </p>
          </div>
        </motion.div>

        {/* Section 2 */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col-reverse md:flex-row items-center gap-10"
        >
          <div className="md:w-1/2 space-y-4 text-gray-300">
            <h2 className="text-2xl font-semibold text-[#FFD700]">
              A Spark That Lasted
            </h2>
            <p className="text-gray-400 leading-relaxed">
              From that ordinary day sprang an extraordinary love, one that has weathered storms, celebrated highs, and grown deeper with every sunrise. Together, we have built a bond anchored in faith and joy.
              <span className="text-[#FFD700] italic">——FunmbiTope (FT)</span>
            </p>
          </div>
          <img
            src="/thirtyfive.jpg"
            alt="A spark that lasted"
            className="w-full md:w-1/2 rounded-3xl border border-[#FFD700]/20 shadow-[0_0_60px_-10px_rgba(255,215,0,0.3)] object-cover"
          />
        </motion.div>

        {/* Section 3 */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-center gap-10"
        >
          <img
            src="/celer.jpg"
            alt="Through the years"
            className="w-full md:w-1/2 rounded-3xl border border-[#FFD700]/20 shadow-[0_0_60px_-10px_rgba(255,215,0,0.3)] object-cover"
          />
          <div className="md:w-1/2 space-y-4 text-gray-300">
            <h2 className="text-2xl font-semibold text-[#FFD700]">
              Through the Years
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Our love has stood the test of time, a testament to patience, laughter, and grace. From quiet moments to great adventures, each chapter has deepened our connection.
            </p>
          </div>
        </motion.div>

        {/* Section 4 */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col-reverse md:flex-row items-center gap-10"
        >
          <div className="md:w-1/2 space-y-4 text-gray-300">
            <h2 className="text-2xl font-semibold text-[#FFD700]">
              Today & Always
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Fifteen years later, our hearts still beat as one, stronger, wiser, and more in love than ever. What began by chance was perfected by destiny.
            </p>
          </div>
          <img
            src="/fam2.jpg"
            alt="Today and always"
            className="w-full md:w-1/2 rounded-3xl border border-[#FFD700]/20 shadow-[0_0_60px_-10px_rgba(255,215,0,0.3)] object-cover"
          />
        </motion.div>
      </div>

  
    </section>
  );
};

export default OurStory;
