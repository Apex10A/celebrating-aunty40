import DeclineTable from "@/components/DeclineTable";
import { LogoutButton } from "@/components/LogoutButton";
import ReservationsTable from "@/components/ReservationsTable";
import SearchBar from "@/components/SearchBar";
import StatsCard from "@/components/StatsCard";
import { useProtected } from "@/hooks/useProtected";
import { getDeclines } from "@/services/declines";
import { getReservations } from "@/services/reservations";
import { RefreshCcw } from "lucide-react";
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
      <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Admin Panel</h1>
        <div className="flex items-center gap-3">
          <span className="text-gray-700">Admin</span>
          <LogoutButton />
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
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
              <label htmlFor="status" className="text-sm text-gray-600">
                Filter by Status:
              </label>
              <select
                id="status"
                className="border rounded-lg px-4 py-2 text-sm sm:px-2 sm:py-1"
                value={filter}
                onChange={(e) => setFilter(e.target.value as Status)}>
                {status.map((status) => (
                  <option value={status} key={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <span
              onClick={handleRefresh}
              className="flex flex-row gap-2 hover:bg-slate-0 p-2">
              <RefreshCcw />
              <span>Refresh</span>
            </span>
          </div>
          {filter === "accepted" && (
            <SearchBar value={search} setValue={setSearch} />
          )}
        </div>

        {/* Reservations Table */}
        <div className="overflow-x-auto bg-white shadow rounded-xl">
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
            "Loading"
          )}
          {/* Replace the loading text with a proper spinner */}
        </div>
      </main>
    </>
  );
}
