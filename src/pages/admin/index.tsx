import ReservationsTable from "@/components/ReservationsTable";
import SearchBar from "@/components/SearchBar";
import StatsCard from "@/components/StatsCard";
import { useState } from "react";

export default function Index() {
  const [search, setSearch] = useState("");
  return (
    <>
      <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Admin Panel</h1>
        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/40"
            className="w-10 h-10 rounded-full border"
            alt="Admin"
          />
          <span className="text-gray-700">Admin</span>
          <button className="ml-4 px-3 py-1 bg-red-500 text-white rounded-lg text-sm">
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard status="base" label="Total Reservations" value={120} />
          <StatsCard status="accepted" label="Accepted Invitees" value={120} />
          <StatsCard
            status="pending"
            label="Pending Reservations"
            value={120}
          />
          <StatsCard
            status="declined"
            label="We won't be present"
            value={120}
          />
        </div>

        {/* Filters + Search */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
          <div className="flex items-center gap-2">
            <label htmlFor="status" className="text-sm text-gray-600">
              Filter by Status:
            </label>
            <select id="status" className="border rounded-lg px-4 py-2 text-sm">
              <option>All</option>
              <option>Accepted</option>
              <option>Declined</option>
              <option>Pending</option>
            </select>
          </div>
          <SearchBar value={search} setValue={setSearch} />
        </div>

        {/* Reservations Table */}
        <div className="overflow-x-auto bg-white shadow rounded-xl">
          <ReservationsTable />
        </div>
      </main>
    </>
  );
}
