import type { Seat } from "../ServiceList";
import RenderSeat from "./RenderSeat";

interface BoxProps {
  start: number;
  seatMap: Map<number, Seat>;
  selected?: Seat | null;
  onSelect: (seat: Seat) => void;
}

export default function RenderBox({
  start,
  seatMap,
  selected,
  onSelect,
}: BoxProps) {
  const rows = Array.from({ length: 6 }, (_, i) => [
    start + i * 3,
    start + i * 3 + 1,
    start + i * 3 + 2,
  ]);

  return (
    <div className="bg-emerald-50 p-4 md:p-7 rounded-3xl shadow border flex flex-col gap-4">
      {rows.map(([a, b, c], idx) => (
        <div
          key={idx}
          className="grid grid-cols-[25px_14px_25px_25px] md:grid-cols-[40px_24px_40px_40px] gap-3 items-center"
        >
          <RenderSeat
            seat={seatMap.get(a)}
            isSelected={selected?._id === seatMap.get(a)?._id}
            onSelect={onSelect}
          />
          <div />
          <RenderSeat
            seat={seatMap.get(b)}
            isSelected={selected?._id === seatMap.get(b)?._id}
            onSelect={onSelect}
          />
          <RenderSeat
            seat={seatMap.get(c)}
            isSelected={selected?._id === seatMap.get(c)?._id}
            onSelect={onSelect}
          />
        </div>
      ))}
    </div>
  );
}
