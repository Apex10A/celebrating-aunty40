import DeclineTable from "@/components/DeclineTable";
import { LogoutButton } from "@/components/LogoutButton";
import ReservationsTable from "@/components/ReservationsTable";
import SearchBar from "@/components/SearchBar";
import StatsCard from "@/components/StatsCard";
import { useProtected } from "@/hooks/useProtected";
import { getDeclines } from "@/services/declines";
import { getReservations, sendBulkReminders } from "@/services/reservations";
import { Home, RefreshCcw, Send } from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { StatusModal, type StatusType } from "@/components/StatusModal";

type Status = "pending" | "accepted" | "declined" | "all-reservations";

type ToastType = "success" | "error";

export default function Index() {
  useProtected();
  const [search, setSearch] = useState("");
  const [reservations, setReservations] = useState<Record<string, any>[]>([]);
  const [declines, setDeclines] = useState<Record<string, any>[]>([]);
  const [filter, setFilter] = useState<Status>("all-reservations");
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Toast state
  const [toast, setToast] = useState<{ show: boolean; message: string; type: ToastType }>({
    show: false,
    message: "",
    type: "success",
  });
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  function showToast(message: string, type: ToastType = "success") {
    setToast({ show: true, message, type });
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setToast((t) => ({ ...t, show: false }));
    }, 2500);
  }

  // Modal state (for important errors)
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState<StatusType>("error");
  const [modalTitle, setModalTitle] = useState("");
  const [modalDescription, setModalDescription] = useState<string | undefined>(undefined);

  const status: Status[] = ["all-reservations", "accepted", "pending", "declined"];

  const accepted = reservations?.filter((item) => item.status === "accepted");
  const pending = reservations?.filter((item) => item.status === "pending");
  const data =
    filter === "all-reservations" ? reservations : filter === "accepted" ? accepted : pending;
  const filteredData = data?.filter((item) => {
    if (!search) return true;
    const searchLower = search.toLowerCase();
    return (
      (item?.invitationCode && item.invitationCode.toLowerCase().includes(searchLower)) ||
      (item?.name && item.name.toLowerCase().includes(searchLower))
    );
  });

  async function fetchReservations(): Promise<boolean> {
    try {
      setIsLoading(true);
      const data = await getReservations();
      if (data) setReservations(data.data.reservations);
      setLastUpdated(new Date());
      return true;
    } catch (error: any) {
      console.log(error);
      setModalStatus("error");
      setModalTitle("Failed to fetch reservations");
      setModalDescription(error?.message || "An unexpected error occurred while loading reservations.");
      setModalOpen(true);
      return false;
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchDeclines(): Promise<boolean> {
    try {
      const data = await getDeclines();
      if (data) setDeclines(data.data);
      return true;
    } catch (error: any) {
      console.log(error);
      setModalStatus("error");
      setModalTitle("Failed to fetch declines");
      setModalDescription(error?.message || "An unexpected error occurred while loading declines.");
      setModalOpen(true);
      return false;
    }
  }

  async function handleRefresh() {
    const [ok1, ok2] = await Promise.all([fetchReservations(), fetchDeclines()]);
    if (ok1 && ok2) showToast("Data refreshed", "success");
    else showToast("Some data failed to refresh", "error");
  }

  async function handleSendBulkReminders() {
    if (!confirm("Are you sure you want to send reminders to ALL accepted guests?")) return;
    
    try {
      const res = await sendBulkReminders();
      if (res?.status === 200) {
        showToast(`Success! Sent ${res.data.sent} reminders.`, "success");
      } else {
        showToast("Failed to send reminders.", "error");
      }
    } catch (error: any) {
      console.error("Error sending reminders:", error);
      showToast(error.response?.data?.message || "Failed to send reminders.", "error");
    }
  }

  useEffect(function () {
    fetchReservations();
    fetchDeclines();
    // Cleanup toast timer on unmount
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Admin • Dashboard</title>
        <meta name="description" content="Admin dashboard for reservations and declines" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <header className="bg-black px-4 md:px-6 py-4 md:py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#FFD700]/10">
        <div className="flex flex-col gap-1">
          <h1 className="font-decorative text-xl md:text-2xl lg:text-3xl text-[#FFD700]">Admin Dashboard</h1>
          <p className="text-sm text-[#FFD700]/70">Manage reservations and guest responses</p>
          {lastUpdated && (
            <span className="text-xs text-[#FFD700]/60">Last updated: {lastUpdated.toLocaleTimeString()}</span>
          )}
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-[#FFD700]/80">Admin</span>
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 bg-[#FFD700]/10 hover:bg-[#FFD700]/20 border border-[#FFD700]/30 rounded-lg text-[#FFD700] transition-colors text-sm"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Website</span>
          </Link>
          <LogoutButton />
        </div>
      </header>

      <main className="min-h-screen bg-gradient-to-b from-black via-[#1a1a1a] to-black">
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          {/* Overview Section */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#FFD700] mb-6">Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard status="base" label="Total Reservations" value={reservations ? reservations?.length : 0} />
              <StatsCard status="accepted" label="Accepted Invitees" value={accepted ? accepted?.length : 0} />
              <StatsCard status="pending" label="Pending Reservations" value={pending ? pending?.length : 0} />
              <StatsCard status="declined" label="Declined" value={declines ? declines?.length : 0} />
            </div>
          </section>

          {/* Data Management Section */}
          <section>
            <h2 className="text-xl font-semibold text-[#FFD700] mb-6">Reservations & Responses</h2>

          {/* Filters + Search */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <label htmlFor="status" className="text-sm text-[#FFD700]/80">
                  Filter by Status:
                </label>
                <select
                  id="status"
                  className="px-3 md:px-4 py-2 bg-black/50 border border-[#FFD700]/20 rounded-lg text-white focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-all text-sm md:text-base"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as Status)}
                >
                  {status.map((status) => (
                    <option value={status} key={status} className="bg-black text-white">
                      {status}
                    </option>
                  ))}
                </select>
              </div>
              {/* <div className="flex items-center gap-3">
                <button
                  onClick={handleRefresh}
                  className="flex flex-row gap-2 items-center px-3 py-2 bg-[#FFD700] text-black rounded-md hover:bg-[#FFD700]/90 transition-colors"
                >
                  <RefreshCcw className="w-4 h-4" />
                  <span>Refresh</span>
                </button>
              </div> */}
              
            </div>
            <div className="flex items-center gap-3">
                <button
                  onClick={handleSendBulkReminders}
                  className="flex flex-row gap-2 items-center px-3 py-2 bg-[#FFD700] text-black rounded-md hover:bg-[#FFD700]/60 transition-colors text-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Reminders to All</span>
                </button>
              </div>
            <SearchBar value={search} setValue={setSearch} />
          </div>

          {/* Reservations Table */}
          <div className="overflow-x-auto bg-black/50 backdrop-blur-sm border border-[#FFD700]/10 rounded-xl">
            {!isLoading ? (
              filter !== "declined" ? (
                reservations && reservations.length > 0 ? (
                  <ReservationsTable
                    refresh={handleRefresh}
                    data={filteredData}
                    notify={showToast}
                  />
                ) : (
                  <div className="p-8 text-center text-[#FFD700]/80">
                    No reservations yet.
                  </div>
                )
              ) : declines && declines.length > 0 ? (
                <DeclineTable data={declines} />
              ) : (
                <div className="p-8 text-center text-[#FFD700]/80">No declines yet.</div>
              )
            ) : (
              <div className="p-6 text-center text-[#FFD700]">Loading...</div>
            )}
          </div>
          </section>
        </div>

        {/* Toast */}
        {toast.show && (
          <div className="fixed top-4 right-4 z-[200]">
            <div
              className={`px-4 py-3 rounded-md shadow-lg border ${
                toast.type === "success"
                  ? "bg-black/70 border-emerald-500/40 text-emerald-300"
                  : "bg-black/70 border-rose-500/40 text-rose-300"
              }`}
            >
              {toast.message}
            </div>
          </div>
        )}

        {/* Status Modal for errors */}
        <StatusModal
          open={modalOpen}
          status={modalStatus}
          title={modalTitle}
          description={modalDescription}
          onClose={() => setModalOpen(false)}
        />
      </main>
    </>
  );
}