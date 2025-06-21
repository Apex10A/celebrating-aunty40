import React from 'react';
import { Gift, Heart, Star } from 'lucide-react';

export const GiftSection = () => {
  const gifts = [
    {
      id: 1,
      title: "Cash Gifts",
      description: "Your presence is our present, but if you'd like to give, cash gifts are appreciated.",
      icon: Gift,
      gradient: "from-[#FFD700] to-[#DC143C]"
    },
    {
      id: 2,
      title: "Prayers & Wishes",
      description: "Your prayers and well wishes mean the world to us.",
      icon: Heart,
      gradient: "from-[#DC143C] to-[#FFD700]"
    },
    {
      id: 3,
      title: "Memories",
      description: "Share your favorite memories and moments with us.",
      icon: Star,
      gradient: "from-[#FFD700] to-[#DC143C]"
    }
  ];

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FFD700]/5 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-[#FFD700]"></div>
            <Gift className="text-[#FFD700] w-5 h-5 sm:w-6 sm:h-6" />
            <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-[#FFD700]"></div>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#DC143C] mb-4 sm:mb-6 font-serif">
            Gift Registry
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-[#FFD700]/80 max-w-2xl mx-auto font-light tracking-wide">
            Your presence at our celebration is the greatest gift. However, if you'd like to give something special, here are some ideas.
          </p>
        </div>

        {/* Gifts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {gifts.map((gift, index) => {
            const IconComponent = gift.icon;
            return (
              <div
                key={gift.id}
                className="group relative p-6 sm:p-8 lg:p-10 rounded-2xl border border-[#FFD700]/20 bg-black/30 backdrop-blur-sm hover:border-[#FFD700]/40 transition-all duration-500 transform hover:scale-105"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Background Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gift.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}></div>
                
                {/* Icon */}
                <div className="relative mb-6 sm:mb-8">
                  <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-r ${gift.gradient} p-3 sm:p-4`}>
                    <IconComponent className="text-black w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative space-y-3 sm:space-y-4">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#FFD700] font-serif">
                    {gift.title}
                  </h3>
                  <p className="text-sm sm:text-base lg:text-lg text-[#FFD700]/70 font-light leading-relaxed">
                    {gift.description}
                  </p>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#FFD700]/30 transition-all duration-500"></div>
              </div>
            );
          })}
        </div>

        {/* Additional Note */}
        <div className="mt-12 sm:mt-16 lg:mt-20 text-center">
          <div className="inline-block p-6 sm:p-8 rounded-2xl border border-[#FFD700]/20 bg-black/20 backdrop-blur-sm">
            <p className="text-sm sm:text-base lg:text-lg text-[#FFD700]/80 font-light italic">
              "The greatest gift is not found in a store or under a tree, but in the hearts of true friends."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}; 