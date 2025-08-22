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
    <div className="border rounded-full px-6 py-3 sm:w-64 text-sm flex flex-row gap-2 min-w-96">
      <Search />
      <input
        type="text"
        placeholder="Search by Invitation code"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="focus:outline-none w-full"
      />
    </div>
  );
}
