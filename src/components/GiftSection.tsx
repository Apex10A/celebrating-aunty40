import React, { useState } from 'react';
import { Gift, CreditCard, Heart } from 'lucide-react';

export const GiftSection = () => {
  const [giftAmount, setGiftAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleGiftSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!giftAmount || parseFloat(giftAmount) <= 0) {
      alert('Please enter a valid gift amount.');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Initialize Flutterwave payment
      const response = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseFloat(giftAmount),
          currency: 'NGN',
          tx_ref: `gift_${Date.now()}`,
          customer: {
            email: 'guest@example.com',
            name: 'Guest'
          }
        })
      });
      
      if (response.ok) {
        alert('Thank you for your gift! Payment processed successfully.');
        setGiftAmount('');
      } else {
        alert('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section className="relative py-12 sm:py-16 lg:py-24 px-4 sm:px-6 bg-gradient-to-br from-[#FFF8E1] via-[#FFF3E0] to-[#FFECB3] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FFD700]/10 to-transparent"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <Gift className="mx-auto text-[#DC143C] mb-4 sm:mb-6 transform hover:scale-110 transition-transform duration-500" size={40} />
          <h2 className="font-decorative text-3xl sm:text-4xl lg:text-5xl text-[#DC143C] mb-3 sm:mb-4">
            Gift Registry
          </h2>
          <div className="h-px w-24 sm:w-32 lg:w-40 mx-auto bg-gradient-to-r from-transparent via-[#DC143C] to-transparent mb-4 sm:mb-6"></div>
          <p className="text-base sm:text-lg lg:text-xl text-[#DC143C]/80 font-light tracking-wide max-w-2xl mx-auto px-4">
            Your presence is our greatest gift, but if you'd like to give something special, 
            we'd be honored by your generosity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16">
          {/* Cash Gift */}
          <div className="group bg-white/80 backdrop-blur-lg p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border border-[#DC143C]/10 hover:border-[#DC143C]/30 transition-all duration-500 shadow-lg">
            <CreditCard className="mx-auto text-[#DC143C] mb-3 sm:mb-4 lg:mb-6 transform group-hover:scale-110 transition-transform duration-500" size={28} />
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#DC143C] mb-2 sm:mb-4">Cash Gift</h3>
            <p className="text-[#DC143C]/70 font-light text-sm sm:text-base">
              Help us create more beautiful memories together
            </p>
          </div>

          {/* Gift Items */}
          <div className="group bg-white/80 backdrop-blur-lg p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border border-[#DC143C]/10 hover:border-[#DC143C]/30 transition-all duration-500 shadow-lg">
            <Gift className="mx-auto text-[#DC143C] mb-3 sm:mb-4 lg:mb-6 transform group-hover:scale-110 transition-transform duration-500" size={28} />
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#DC143C] mb-2 sm:mb-4">Gift Items</h3>
            <p className="text-[#DC143C]/70 font-light text-sm sm:text-base">
              Choose from our curated gift registry
            </p>
          </div>

          {/* Well Wishes */}
          <div className="group bg-white/80 backdrop-blur-lg p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border border-[#DC143C]/10 hover:border-[#DC143C]/30 transition-all duration-500 shadow-lg sm:col-span-2 lg:col-span-1">
            <Heart className="mx-auto text-[#DC143C] mb-3 sm:mb-4 lg:mb-6 transform group-hover:scale-110 transition-transform duration-500" size={28} />
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#DC143C] mb-2 sm:mb-4">Well Wishes</h3>
            <p className="text-[#DC143C]/70 font-light text-sm sm:text-base">
              Your love and blessings mean the world to us
            </p>
          </div>
        </div>

        {/* Gift Form */}
        <div className="bg-white/90 backdrop-blur-lg p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-[#DC143C]/20 shadow-xl">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#DC143C] mb-4 sm:mb-6 lg:mb-8">Send a Gift</h3>
          
          <form onSubmit={handleGiftSubmit} className="space-y-4 sm:space-y-6 lg:space-y-8">
            <div>
              <label className="block text-[#DC143C] mb-2 text-base sm:text-lg">Enter Gift Amount (₦)</label>
              <input
                type="number"
                value={giftAmount}
                onChange={(e) => setGiftAmount(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/80 border border-[#DC143C]/20 rounded-lg sm:rounded-xl text-gray-800 focus:border-[#DC143C] focus:ring-1 focus:ring-[#DC143C] transition-all text-base sm:text-lg"
                placeholder="Enter amount"
                min="100"
                step="100"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="relative w-full py-3 sm:py-4 bg-gradient-to-r from-[#FFD700] to-[#DC143C] text-white rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden shadow-lg"
            >
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              <span className="relative z-10">
                {isProcessing ? 'Processing...' : 'Send Gift'}
              </span>
            </button>
          </form>

          <p className="text-[#DC143C]/60 text-xs sm:text-sm mt-4 sm:mt-6">
            Secure payment powered by Flutterwave
          </p>
        </div>
      </div>
    </section>
  );
}; 