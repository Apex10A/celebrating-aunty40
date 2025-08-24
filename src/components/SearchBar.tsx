import { Search } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export default function SearchBar({
  value,
  setValue,
}: {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="px-4 py-2 bg-black/50 border border-[#FFD700]/20 rounded-full text-sm flex flex-row gap-2 min-w-72 md:min-w-96 text-white focus-within:border-[#FFD700] focus-within:ring-1 focus-within:ring-[#FFD700]">
      <Search className="text-[#FFD700]" />
      <input
        type="text"
        placeholder="Search by Invitation code"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="focus:outline-none w-full bg-transparent placeholder:text-[#FFD700]/40"
      />
    </div>
  );
}
