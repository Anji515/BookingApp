import type { Seat } from "../ServiceList";

interface SeatProps {
  seat?: Seat;
  isSelected: boolean;
  onSelect: (seat: Seat) => void;
}

export default function RenderSeat({ seat, isSelected, onSelect }: SeatProps) {
  if (!seat) return <div />;

  return (
    <div
      onClick={() => onSelect(seat)}
      className={`
        h-12 w-7 md:h-16 md:w-10 rounded-xl border-2 flex items-center justify-center text-xs md:text-sm font-semibold transition-all duration-200 relative
        ${
          seat.status === "FREE"
            ? "border-green-500 bg-white cursor-pointer hover:scale-105 hover:shadow-md"
            : seat.status === "LOCKED"
            ? "border-yellow-400 bg-yellow-50 text-yellow-800 cursor-not-allowed"
            : "border-gray-300 bg-gray-200 text-red-500 cursor-not-allowed"
        }
        ${isSelected ? "bg-yellow-100 scale-105 shadow-lg" : ""}
      `}
    >
      {seat.number}
      {seat.status === "LOCKED" && (
        <div className="absolute top-0 right-0 w-0 h-0 border-t-14 border-t-yellow-300 border-l-14 border-l-transparent rounded-tr-[10px]" />
      )}
    </div>
  );
}
