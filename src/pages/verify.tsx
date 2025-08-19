import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Search, Users, Car } from 'lucide-react';

interface Guest {
  id: string;
  name: string;
  email: string;
  numberOfGuests: number;
  hasDriver: boolean;
  dietaryRestrictions?: string;
  guestCode: string;
}

const VerifyPage = () => {
  const [guestCode, setGuestCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    status: 'success' | 'error' | null;
    message: string;
    guest?: Guest;
  }>({ status: null, message: '' });

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestCode.trim()) return;

    setIsVerifying(true);
    setVerificationResult({ status: null, message: '' });

    try {
      const response = await fetch('/api/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ guestCode: guestCode.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setVerificationResult({
          status: 'success',
          message: data.message,
          guest: data.guest
        });
      } else {
        setVerificationResult({
          status: 'error',
          message: data.message
        });
      }
    } catch (error) {
      setVerificationResult({
        status: 'error',
        message: 'Network error. Please try again.'
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const resetForm = () => {
    setGuestCode('');
    setVerificationResult({ status: null, message: '' });
  };

  return (
    <>
      <Head>
        <title>Guest Verification - 40 & 15 Years Celebration</title>
        <meta name="description" content="Verify guest codes for event entry" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-black via-[#1a1a1a] to-black flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h1 className="font-decorative text-3xl md:text-4xl text-[#FFD700] mb-4">
              Guest Verification
            </h1>
            <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mb-4"></div>
            <p className="text-gray-300">Enter your guest code to verify entry</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-black/50 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-[#FFD700]/10"
          >
            <form onSubmit={handleVerify} className="space-y-6">
              <div>
                <label htmlFor="guestCode" className="block text-[#FFD700] mb-2 text-sm md:text-base">
                  Guest Code
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#FFD700]/50 w-5 h-5" />
                  <input
                    type="text"
                    id="guestCode"
                    value={guestCode}
                    onChange={(e) => setGuestCode(e.target.value.toUpperCase())}
                    className="w-full pl-10 pr-4 py-3 bg-black/50 border border-[#FFD700]/20 rounded-lg text-white focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-all text-center font-mono text-lg tracking-wider"
                    placeholder="EVT-12345"
                    required
                    disabled={isVerifying}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isVerifying || !guestCode.trim()}
                className="w-full py-3 bg-[#FFD700] text-black rounded-full hover:bg-[#FFD700]/90 transition-all duration-300 font-medium text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isVerifying ? 'Verifying...' : 'Verify Code'}
              </button>
            </form>

            {/* Verification Result */}
            {verificationResult.status && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`mt-6 p-4 rounded-lg border ${
                  verificationResult.status === 'success'
                    ? 'bg-green-500/10 border-green-500/30'
                    : 'bg-red-500/10 border-red-500/30'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  {verificationResult.status === 'success' ? (
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-400" />
                  )}
                  <span className={`font-medium ${
                    verificationResult.status === 'success' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {verificationResult.status === 'success' ? 'Valid Code!' : 'Invalid Code'}
                  </span>
                </div>

                {verificationResult.guest && (
                  <div className="space-y-3 text-sm">
                    <div className="bg-black/30 p-3 rounded">
                      <p className="text-[#FFD700] font-medium mb-2">Guest Details:</p>
                      <div className="space-y-1 text-gray-300">
                        <p><strong>Name:</strong> {verificationResult.guest.name}</p>
                        <p><strong>Email:</strong> {verificationResult.guest.email}</p>
                        
                        <div className="flex items-center gap-2 mt-2">
                          <Users className="w-4 h-4 text-[#FFD700]" />
                          <span>{verificationResult.guest.numberOfGuests} {verificationResult.guest.numberOfGuests === 1 ? 'Guest' : 'Guests'}</span>
                        </div>

                        {verificationResult.guest.hasDriver && (
                          <div className="flex items-center gap-2">
                            <Car className="w-4 h-4 text-[#FFD700]" />
                            <span>Has Driver</span>
                          </div>
                        )}

                        {verificationResult.guest.dietaryRestrictions && (
                          <p className="mt-2">
                            <strong>Dietary:</strong> {verificationResult.guest.dietaryRestrictions}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <p className={`text-sm mt-3 ${
                  verificationResult.status === 'success' ? 'text-green-300' : 'text-red-300'
                }`}>
                  {verificationResult.message}
                </p>

                <button
                  onClick={resetForm}
                  className="mt-4 w-full py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-all"
                >
                  Verify Another Code
                </button>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-6"
          >
            <p className="text-gray-400 text-sm">
              For event staff use only
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default VerifyPage;