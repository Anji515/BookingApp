import { useState } from "react";
import { searchServices } from "./api";
import type { Service } from "./ServiceList";

const LOCATIONS = ["BLR", "HYD"];

export default function Search({
  onResults,
}: {
  onResults: (data: Service[]) => void;
}) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    if (!from || !to || !date) {
      setError("Please select From, To and Date");
      return;
    }
    if (from === to) {
      setError("From and To cannot be the same");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const res = await searchServices(from, to, date);
      onResults(res);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to fetch services. Please try again.");
      onResults([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white p-6 md:p-10">
      <h1 className="text-center text-red-500 text-xl font-semibold">Choose Service</h1>
    <div className="bg-white rounded-xl mb-4 grid grid-cols-1 gap-5 md:grid-cols-4 justify-center items-center my-6 md:m-6">
      <select
        className="border border-gray-300 rounded-md px-1 h-10 text-sm"
        value={from}
        onChange={(e) => {
          setFrom(e.target.value);
          setError(null);
        }}
      >
        <option value="">From</option>
        {LOCATIONS.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>

      <select
        className="border border-gray-300 rounded-md px-1 h-10 text-sm"
        value={to}
        onChange={(e) => {
          setTo(e.target.value);
          setError(null);
        }}
      >
        <option value="">To</option>
        {LOCATIONS.map((loc) => (
          <option key={loc} value={loc} disabled={loc === from}>
            {loc}
          </option>
        ))}
      </select>

      <input
        type="date"
        className="border border-gray-300 rounded-md px-1 h-10 text-sm"
        value={date}
        onChange={(e) => {
          setDate(e.target.value);
          setError(null);
        }}
      />

      <button
        onClick={handleSearch}
        disabled={loading}
        className={`rounded-full h-11 mt-2 md:mt-0 cursor-pointer text-white ${
          loading
            ? "bg-blue-300 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Searching..." : "Search"}
      </button>

      {error && (
        <div className="md:col-span-4 text-red-600 text-sm mt-2">{error}</div>
      )}
    </div>
    </div>
  );
}
