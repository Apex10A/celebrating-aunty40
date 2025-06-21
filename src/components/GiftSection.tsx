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
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 bg-[#0a0a0a] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FFD700]/5 to-transparent"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="mb-12 sm:mb-16">
          <Gift className="mx-auto text-[#FFD700] mb-6 transform hover:scale-110 transition-transform duration-500" size={48} />
          <h2 className="font-decorative text-4xl md:text-5xl text-[#FFD700] mb-4">
            Gift Registry
          </h2>
          <div className="h-px w-32 sm:w-40 mx-auto bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mb-6"></div>
          <p className="text-lg sm:text-xl text-[#FFD700]/80 font-light tracking-wide max-w-2xl mx-auto">
            Your presence is our greatest gift, but if you'd like to give something special, 
            we'd be honored by your generosity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {/* Cash Gift */}
          <div className="group bg-black/30 backdrop-blur-lg p-6 sm:p-8 rounded-2xl border border-[#FFD700]/10 hover:border-[#FFD700]/30 transition-all duration-500">
            <CreditCard className="mx-auto text-[#FFD700] mb-4 sm:mb-6 transform group-hover:scale-110 transition-transform duration-500" size={32} />
            <h3 className="text-xl sm:text-2xl font-bold text-[#FFD700] mb-2 sm:mb-4">Cash Gift</h3>
            <p className="text-[#FFD700]/70 font-light text-sm sm:text-base">
              Help us create more beautiful memories together
            </p>
          </div>

          {/* Gift Items */}
          <div className="group bg-black/30 backdrop-blur-lg p-6 sm:p-8 rounded-2xl border border-[#FFD700]/10 hover:border-[#FFD700]/30 transition-all duration-500">
            <Gift className="mx-auto text-[#FFD700] mb-4 sm:mb-6 transform group-hover:scale-110 transition-transform duration-500" size={32} />
            <h3 className="text-xl sm:text-2xl font-bold text-[#FFD700] mb-2 sm:mb-4">Gift Items</h3>
            <p className="text-[#FFD700]/70 font-light text-sm sm:text-base">
              Choose from our curated gift registry
            </p>
          </div>

          {/* Well Wishes */}
          <div className="group bg-black/30 backdrop-blur-lg p-6 sm:p-8 rounded-2xl border border-[#FFD700]/10 hover:border-[#FFD700]/30 transition-all duration-500">
            <Heart className="mx-auto text-[#FFD700] mb-4 sm:mb-6 transform group-hover:scale-110 transition-transform duration-500" size={32} />
            <h3 className="text-xl sm:text-2xl font-bold text-[#FFD700] mb-2 sm:mb-4">Well Wishes</h3>
            <p className="text-[#FFD700]/70 font-light text-sm sm:text-base">
              Your love and blessings mean the world to us
            </p>
          </div>
        </div>

        {/* Gift Form */}
        <div className="bg-gradient-to-r from-[#1a1a1a] to-black p-8 rounded-2xl border border-[#FFD700]/20 shadow-xl backdrop-blur-sm">
          <h3 className="text-2xl sm:text-3xl font-bold text-[#FFD700] mb-6 sm:mb-8">Send a Gift</h3>
          
          <form onSubmit={handleGiftSubmit} className="space-y-6 sm:space-y-8">
            <div>
              <label className="block text-[#FFD700] mb-2 text-lg">Enter Gift Amount (₦)</label>
              <input
                type="number"
                value={giftAmount}
                onChange={(e) => setGiftAmount(e.target.value)}
                className="w-full px-4 py-3 bg-black/50 border border-[#FFD700]/20 rounded-xl text-white focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-all text-lg"
                placeholder="Enter amount"
                min="100"
                step="100"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="relative w-full py-4 bg-[#FFD700] text-black rounded-xl font-semibold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700] via-white to-[#FFD700] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              <span className="relative z-10">
                {isProcessing ? 'Processing...' : 'Send Gift'}
              </span>
            </button>
          </form>

          <p className="text-[#FFD700]/60 text-sm mt-6">
            Secure payment powered by Flutterwave
          </p>
        </div>
      </div>
    </section>
  );
}; 