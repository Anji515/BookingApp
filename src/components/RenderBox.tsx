import type { Seat } from "../ServiceList";
import RenderSeat from "./RenderSeat";

interface BoxProps {
  start: number;
  seatMap: Map<number, Seat>;
  selected?: Seat | null;
  onSelect: (seat: Seat) => void;
  headingText: string;
  iconReq?: boolean;
}

export default function RenderBox({
  start,
  seatMap,
  selected,
  onSelect,
  headingText,
  iconReq
}: BoxProps) {
  const rows = Array.from({ length: 6 }, (_, i) => [
    start + i * 3,
    start + i * 3 + 1,
    start + i * 3 + 2,
  ]);

  return (
    <div className="bg-emerald-50 pl-3 pr-5 py-4 md:p-6 rounded-2xl shadow border flex flex-col gap-4">
      <h1 className="flex justify-between items-center -mt-3 text-black text-sm py-0">{headingText} <span className={`text-3xl ${iconReq ? 'text-gray-400' : 'text-transparent'}`}>✇</span></h1>
      {rows.map(([a, b, c], idx) => (
        <div
          key={idx}
          className="grid grid-cols-[24px_14px_24px_24px] md:grid-cols-[40px_24px_40px_40px] gap-3 items-center"
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
