import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const GiftSection = () => {
  const [amount, setAmount] = useState<string>('');
  const [isHovered, setIsHovered] = useState(false);
  const [decorations, setDecorations] = useState<Array<{ left: number; top: number; rotate: number; emoji: string }>>([]);

  useEffect(() => {
    const emojis = ['🎉', '🎈', '🎊', '✨'];
    const newDecorations = Array.from({ length: 20 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      rotate: Math.random() * 360,
      emoji: emojis[Math.floor(Math.random() * emojis.length)]
    }));
    setDecorations(newDecorations);
  }, []);

  const handlePayment = () => {
    if (typeof window !== 'undefined' && (window as any).FlutterwaveCheckout) {
      const tx_ref = `gift_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      (window as any).FlutterwaveCheckout({
        public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY,
        tx_ref: tx_ref,
        amount: Number(amount),
        currency: 'NGN',
        payment_options: 'card,ussd,banktransfer',
        customer: {
          email: '', 
          phone_number: '',
          name: '',
        },
        customizations: {
          title: 'Gift for Funmbi & Tope',
          description: 'Gift for the 40th Birthday & 15th Anniversary Celebration',
          logo: '/logo.png', 
        },
        callback: async function(response: any) {
          try {
            const verifyResponse = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                transaction_id: response.transaction_id,
                tx_ref: tx_ref
              }),
            });
            
            const data = await verifyResponse.json();
            
            if (data.status === 'success') {
              alert('Thank you for your gift! 🎁');
            } else {
              alert('There was an issue verifying your payment. Please contact support.');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            alert('There was an error processing your payment. Please try again.');
          }
        },
        onclose: function() {

        }
      });
    }
  };

  return (
    <section
      id="gift"
      className="py-16 md:py-24 relative inset-0 bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/cele.jpg')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/80" />
      {/* <div className="absolute inset-0 overflow-hidden">
        {decorations.map((decoration, i) => (
          <motion.div
            key={i}
            className="absolute"
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
            style={{
              left: `${decoration.left}%`,
              top: `${decoration.top}%`,
              transform: `rotate(${decoration.rotate}deg)`,
            }}
          >
            {decoration.emoji}
          </motion.div>
        ))}
      </div> */}

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-decorative text-3xl md:text-4xl text-[#FFD700] mb-4">
            Celebrate With Us! 🎉
          </h2>
          <p className="text-gray-300 text-md md:text-lg max-w-2xl mx-auto">
            Your presence is our greatest gift, but if you'd like to contribute to our celebration,
            we've made it easy and fun!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-[#1a1a1a] to-black p-8 rounded-2xl border border-[#FFD700]/20 shadow-xl backdrop-blur-sm"
        >
          {/* <div className="mb-8">
            <label className="block text-[#FFD700] mb-2 text-lg">Enter Gift Amount (₦)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 bg-black/50 border border-[#FFD700]/20 rounded-xl text-white focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-all text-lg"
              placeholder="Enter your gift amount"
              min="1"
            />
          </div> */}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={() => window.open('https://flutterwave.com/pay/geqbpo145yyd', '_blank')}
            className="relative w-full py-4 bg-[#FFD700] text-black rounded-xl font-semibold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden"
          >
            <span className="relative z-10 text-md">Send Anniversary & Birthday Gift 🎁</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#FFD700] via-white to-[#FFD700]"
              initial={{ x: '-100%' }}
              animate={{ x: isHovered ? '100%' : '-100%' }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </motion.button>

          <div className="mt-4 text-center">
            <p className="text-gray-400 text-sm">Secured by Flutterwave 🔒</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}; 