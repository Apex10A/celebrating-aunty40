import DeclineTable from "@/components/DeclineTable";
import { LogoutButton } from "@/components/LogoutButton";
import ReservationsTable from "@/components/ReservationsTable";
import SearchBar from "@/components/SearchBar";
import StatsCard from "@/components/StatsCard";
import { useProtected } from "@/hooks/useProtected";
import { getDeclines } from "@/services/declines";
import { getReservations } from "@/services/reservations";
import { RefreshCcw } from "lucide-react";
import Head from "next/head";
import { useEffect, useState } from "react";

type Status = "pending" | "accepted" | "declined" | "all-reservations";

export default function Index() {
  useProtected();
  const [search, setSearch] = useState("");
  const [reservations, setReservations] = useState<Record<string, any>[]>([]);
  const [declines, setDeclines] = useState<Record<string, any>[]>([]);
  const [filter, setFilter] = useState<Status>("all-reservations");
  const [isLoading, setIsLoading] = useState(false);

  const status: Status[] = [
    "all-reservations",
    "accepted",
    "pending",
    "declined",
  ];

  const accepted = reservations?.filter((item) => item.status === "accepted");
  const pending = reservations?.filter((item) => item.status === "pending");
  const data =
    filter === "all-reservations"
      ? reservations
      : filter === "accepted"
      ? accepted
      : pending;
  const filteredData = data?.filter((item) => {
    if (item?.invitationCode)
      return item.invitationCode.toLowerCase().includes(search.toLowerCase());
    else return item;
  });

  async function fetchReservations() {
    try {
      setIsLoading(true);
      const data = await getReservations();
      if (data) setReservations(data.data.reservations);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchDeclines() {
    try {
      const data = await getDeclines();
      if (data) setDeclines(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleRefresh() {
    fetchReservations();
    fetchDeclines();
  }

  useEffect(function () {
    fetchReservations();
    fetchDeclines();
  }, []);

  return (
    <>
      <Head>
        <title>Admin • Dashboard</title>
        <meta name="description" content="Admin dashboard for reservations and declines" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <header className="bg-black px-6 py-4 flex justify-between items-center">
        <h1 className="font-decorative text-2xl md:text-3xl text-[#FFD700]">Admin Panel</h1>
        <div className="flex items-center gap-3">
          <span className="text-[#FFD700]/80">Admin</span>
          <LogoutButton />
        </div>
      </header>

      <main className="min-h-screen bg-gradient-to-b from-black via-[#1a1a1a] to-black">
        <div className="max-w-7xl mx-auto p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              status="base"
              label="Total Reservations"
              value={reservations ? reservations?.length : 0}
            />
            <StatsCard
              status="accepted"
              label="Accepted Invitees"
              value={accepted ? accepted?.length : 0}
            />
            <StatsCard
              status="pending"
              label="Pending Reservations"
              value={pending ? pending?.length : 0}
            />
            <StatsCard
              status="declined"
              label="We won't be present"
              value={declines ? declines?.length : 0}
            />
          </div>

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
              <button
                onClick={handleRefresh}
                className="flex flex-row gap-2 items-center px-3 py-2 bg-[#FFD700] text-black rounded-md hover:bg-[#FFD700]/90 transition-colors"
              >
                <RefreshCcw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
            </div>
            {filter === "accepted" && (
              <SearchBar value={search} setValue={setSearch} />
            )}
          </div>

          {/* Reservations Table */}
          <div className="overflow-x-auto bg-black/50 backdrop-blur-sm border border-[#FFD700]/10 rounded-xl">
            {!isLoading ? (
              filter !== "declined" ? (
                <ReservationsTable
                  refresh={handleRefresh}
                  data={
                    filter === "accepted" || filter === "all-reservations"
                      ? filteredData
                      : data
                  }
                />
              ) : (
                <DeclineTable data={declines} />
              )
            ) : (
              <div className="p-6 text-center text-[#FFD700]">Loading...</div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
