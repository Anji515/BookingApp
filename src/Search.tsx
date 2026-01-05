import { useEffect, useState } from "react";
import { searchServices } from "./api";
import type { Service } from "./ServiceList";

const LOCATIONS = ["BLR", "HYD"];

export default function Search({
  from,
  to,
  date,
  onSearch,
  onResults,
}: {
  from: string;
  to: string;
  date: string;
  onSearch: (v: { from: string; to: string; date: string }) => void;
  onResults: (data: Service[]) => void;
}) {
  const [locationFrom, setLocationFrom] = useState(from);
  const [locationTo, setLocationTo] = useState(to);
  const [localDate, setLocalDate] = useState(date);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLocationFrom(from);
    setLocationTo(to);
    setLocalDate(date);
  }, [from, to, date]);

  async function handleSearch() {
    if (!locationFrom || !locationTo || !localDate) {
      setError("Please select From, To and Date");
      return;
    }
    if (locationFrom === locationTo) {
      setError("From and To cannot be the same");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      onSearch({ from: locationFrom, to: locationTo, date: localDate });
      const res = await searchServices(locationFrom, locationTo, localDate);
      onResults(res);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Failed to fetch services");
      onResults([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white p-6 md:p-10">
      <h1 className="text-center text-blue-500 text-2xl pb-2 md:pb-4 font-semibold">
        Find Buses
      </h1>

      <div className="bg-white rounded-xl grid grid-cols-1 gap-5 md:grid-cols-4 my-6">
        <select
          className="border rounded-md h-10 px-2"
          value={locationFrom}
          onChange={(e) => setLocationFrom(e.target.value)}
        >
          <option value="">From</option>
          {LOCATIONS.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>

        <select
          className="border rounded-md h-10 px-2"
          value={locationTo}
          onChange={(e) => setLocationTo(e.target.value)}
        >
          <option value="">To</option>
          {LOCATIONS.map((l) => (
            <option key={l} value={l} disabled={l === locationFrom}>
              {l}
            </option>
          ))}
        </select>

        <input
          type="date"
          className="border rounded-md h-10 px-2"
          value={localDate}
          onChange={(e) => setLocalDate(e.target.value)}
        />

        <button
          onClick={handleSearch}
          disabled={loading}
          className={`rounded-full h-11 cursor-pointer text-white ${
            loading ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Searching..." : "Search Buses"}
        </button>

        {error && (
          <div className="md:col-span-4 text-red-600 text-sm">{error}</div>
        )}
      </div>
    </div>
  );
}
