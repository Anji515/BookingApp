import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import type { Seat, Service } from "./ServiceList";
import { bookSeat, getService, lockSeat } from "./api";
import RenderBox from "./components/RenderBox";

export default function SeatLayout() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const serviceId = params.get("serviceId");
  const [data, setData] = useState<Service | null>(null);
  const [selected, setSelected] = useState<Seat | null>(null);
  const [locked, setLocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingLock, setLoadingLock] = useState(false);

  const seatMap = useMemo(() => {
    return new Map(data?.seats.map((seat) => [seat.number, seat]) || []);
  }, [data]);
  
  function handleSelect(seat: Seat) {
    if (seat.status !== "FREE") return;
    setSelected(seat);
    setLocked(false);
  }

  async function handleProceed() {
    if (!selected || !serviceId) return;
    setLoadingLock(true);
    try {
      const res = await lockSeat(serviceId, selected._id);

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.message || "Unable to lock seat");
      }
      const updated = await getService(serviceId);
      setLocked(true);
      setData(updated);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Lock seat failed:", err);
      alert(err.message || "Something went wrong while locking the seat.");
    } finally {
      const updated = await getService(serviceId);
      setLocked(true);
      setData(updated);
      setLoadingLock(false);
    }
  }

  async function handleConfirm() {
    if (!selected || !serviceId || loading) return;

    setLoading(true);

    try {
      const res = await bookSeat(serviceId, selected._id);

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.message || "Unable to book seat");
      }

      const updated = await getService(serviceId);
      setData(updated);
      setSelected(null);
      setLocked(false);
      alert("Seat booked successfully!");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Booking failed:", err);
      alert(err.message || "Something went wrong while booking the seat.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!serviceId) {
      return;
    }
    getService(serviceId).then(setData);
  }, [serviceId]);

  if (!data) return null;

  return (
    <div className="flex justify-center p-6">
      <div>
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 mb-2 hover:underline"
        >
          ← Back
        </button>

        <div className="text-center mb-4 space-y-1">
          <h2 className="text-xl font-semibold">{data.name}</h2>

          {data.departureTime && (
            <div className="text-sm text-gray-600">
              <strong>Start at :</strong> {data.departureTime} hrs
            </div>
          )}

          <div className="flex justify-center gap-4 text-xs mt-2">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-white border" />
              Free
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              Locked
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-gray-400" />
              Booked
            </span>
          </div>
        </div>

        {data?.seats?.length ? (
          <div className="flex gap-6 md:gap-12">
            <RenderBox
              start={1}
              seatMap={seatMap}
              selected={selected}
              onSelect={handleSelect}
              headingText="Lower Deck"
              iconReq
            />
            <RenderBox
              start={19}
              seatMap={seatMap}
              selected={selected}
              onSelect={handleSelect}
              headingText="Upper Deck"
            />
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg border p-10 text-center max-w-xl w-full mt-16">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              No seat information available
            </h2>
            <p className="text-gray-400 mb-6">
              Please go back and choose another bus.
            </p>

            <button
              onClick={() => navigate("/")}
              className="rounded-full items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 h-11 cursor-pointer shadow"
            >
              ← Back to search
            </button>
          </div>
        )}

        {selected && (
          <div className="bg-white p-3 rounded-xl shadow mt-6 text-center">
            <div className="mb-2 font-medium">
              Selected Seat: {selected.number}
            </div>

            {!locked && (
              <button
                onClick={handleProceed}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-1 rounded-lg"
              >
                {loadingLock ? "Processing..." : "Proceed"}
              </button>
            )}

            {locked && (
              <button
                onClick={handleConfirm}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-1 rounded-lg"
              >
                {loading ? "Confirming" : "Confirm Booking"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
