"use client";

import { useProtected } from "@/hooks/useProtected";
import { findInvite, checkin, Reservation } from "@/services/reservations";
import {
  CheckCircle,
  CheckSquare2,
  Hash,
  Mail,
  Phone,
  User2,
} from "lucide-react";
import { useRouter } from "next/router";
import Head from "next/head";
import React, { useEffect, useState } from "react";

export default function Code() {
  useProtected();

  const router = useRouter();
  const [invitationCode, setInvitationCode] = useState<string | null>(null);
  const [inviteData, setInviteData] = useState<Reservation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [marking, setMarking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log(inviteData);

  useEffect(() => {
    if (router.isReady && typeof router.query.code === "string") {
      setInvitationCode(router.query.code);
    }
  }, [router.isReady, router.query.code]);

  useEffect(() => {
    if (invitationCode) {
      fetchInvite(invitationCode);
    }
  }, [invitationCode]);

  const fetchInvite = async (code: string) => {
    try {
      setIsLoading(true);
      const data = await findInvite(code);
      setInviteData(data.data);
    } catch (error) {
      console.error(error);
      setError("Failed to load invitation.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsPresent = async () => {
    if (!invitationCode) return;
    try {
      setMarking(true);
      const updated = await checkin(invitationCode);
      if (updated.data) setInviteData(updated.data);
      else alert("Could not perform this task");
    } catch (error) {
      console.error(error);
      setError("Could not mark as present.");
    } finally {
      setMarking(false);
    }
  };

  return (
    <>
      <Head>
        <title>Admin • Invitation Details</title>
        <meta name="description" content="Admin invitation details and check-in" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-black via-[#1a1a1a] to-black flex items-center justify-center p-4">
        <div className="w-full max-w-lg bg-black/50 backdrop-blur-sm rounded-2xl border border-[#FFD700]/10 p-6 md:p-8">
          <h2 className="font-decorative text-3xl md:text-4xl text-[#FFD700] text-center mb-2">Invitation Details</h2>
          <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mb-6"></div>

          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#FFD700]/10 pb-3">
              <span className="font-semibold text-[#FFD700] text-sm md:text-base">Name</span>
              <span className="text-white">{inviteData?.name}</span>
            </div>

            <div className="flex items-center justify-between border-b border-[#FFD700]/10 pb-3">
              <span className="font-semibold text-[#FFD700] flex items-center gap-2 text-sm md:text-base">
                <Mail className="w-4 h-4 text-[#FFD700]" />
                Email
              </span>
              <span className="text-white break-all">{inviteData?.email}</span>
            </div>

            <div className="flex items-center justify-between border-b border-[#FFD700]/10 pb-3">
              <span className="font-semibold text-[#FFD700] flex items-center gap-2 text-sm md:text-base">
                <Hash className="w-4 h-4 text-[#FFD700]" />
                Invitation Code
              </span>
              <span className="text-white">{inviteData?.invitationCode}</span>
            </div>

            <div className="flex items-center justify-between border-b border-[#FFD700]/10 pb-3">
              <span className="font-semibold text-[#FFD700] flex items-center gap-2 text-sm md:text-base">
                <User2 className="w-4 h-4 text-[#FFD700]" />
                Guests
              </span>
              <span className="text-white">{inviteData?.numOfGuests}</span>
            </div>

            <div className="flex items-center justify-between border-b border-[#FFD700]/10 pb-3">
              <span className="font-semibold text-[#FFD700] flex items-center gap-2 text-sm md:text-base">
                <Phone className="w-4 h-4 text-[#FFD700]" />
                Phone
              </span>
              <span className="text-white">{inviteData?.phoneNumber}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#FFD700] flex items-center gap-2 text-sm md:text-base">
                <CheckCircle className="w-4 h-4 text-[#FFD700]" />
                Status
              </span>
              <span className="text-white">{inviteData?.status}</span>
            </div>
          </div>

          {inviteData?.isPresent ? (
            <div className="w-full py-4 text-center border-dashed border-[#FFD700] border block mt-6 rounded-md bg-[#ddc74c34] text-[#FFD700]">
              This guest was already checked in
            </div>
          ) : (
            <div className="flex justify-end mt-6">
              <button
                onClick={handleMarkAsPresent}
                disabled={marking}
                className="px-4 py-2 bg-[#FFD700] rounded text-black hover:bg-[#FFD700]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {!marking ? (
                  <span className="flex gap-2 items-center">
                    <CheckSquare2 width={18} height={18} /> Mark as present
                  </span>
                ) : (
                  "Loading..."
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
