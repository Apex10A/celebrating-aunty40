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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Invitation Details
        </h2>
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b pb-3">
            <span className="font-semibold text-gray-600">Name</span>
            <span className="text-gray-800">{inviteData?.name}</span>
          </div>

          <div className="flex items-center justify-between border-b pb-3">
            <span className="font-semibold text-gray-600 flex items-center gap-2">
              <Mail className="w-4 h-4 text-indigo-500" />
              Email
            </span>
            <span className="text-gray-800 break-all">{inviteData?.email}</span>
          </div>

          <div className="flex items-center justify-between border-b pb-3">
            <span className="font-semibold text-gray-600 flex items-center gap-2">
              <Hash className="w-4 h-4 text-yellow-500" />
              Invitation Code
            </span>
            <span className="text-gray-800">{inviteData?.invitationCode}</span>
          </div>

          <div className="flex items-center justify-between border-b pb-3">
            <span className="font-semibold text-gray-600 flex items-center gap-2">
              <User2 className="w-4 h-4 text-pink-500" />
              Guests
            </span>
            <span className="text-gray-800">{inviteData?.numOfGuests}</span>
          </div>

          <div className="flex items-center justify-between border-b pb-3">
            <span className="font-semibold text-gray-600 flex items-center gap-2">
              <Phone className="w-4 h-4 text-green-500" />
              Phone
            </span>
            <span className="text-gray-800">{inviteData?.phoneNumber}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-600 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              Status
            </span>
            <span className="text-gray-800">{inviteData?.status}</span>
          </div>
        </div>

        {inviteData?.isPresent ? (
          <div className="w-full py-4 text-center border-dashed border-[#FFD700] border block mt-6 rounded-md bg-[#ddc74c34]">
            This guest was already checked in
          </div>
        ) : (
          <div className="flex justify-end mt-6">
            <button
              onClick={handleMarkAsPresent}
              className="px-4 py-2 bg-yellow-200 rounded text-yellow-800 hover:bg-yellow-800 hover:text-yellow-100 transition-all">
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
  );
}
