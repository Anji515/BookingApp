export interface Seat {
  number: number;
  _id: string;
  status: "BOOKED" | "FREE" | "LOCKED";
}
export interface Service {
  _id: string;
  name: string;
  departureTime: string;
  price: number;
  seats: Seat[];
}
export default function ServiceList({
  services,
  onSelect,
  handleClear
}: {
  services: Service[];
  onSelect: (service: Service) => void;
  handleClear: () => void; 
}) {
  return (
    <div className="max-w-225 mx-auto p-6 md:px-0">
      {services?.map((service: Service) => (
        <div
          key={service._id}
          className="bg-emerald-50 p-4 rounded-xl shadow mb-3"
        >
          <div className="flex justify-between items-center">
            <div>
              <div className="font-semibold text-base">{service.name}</div>
              <div className="text-sm text-gray-500">
                {service.departureTime} • ₹{service.price}
              </div>
            </div>
            <button
              className="bg-emerald-700 cursor-pointer hover:bg-emerald-800 text-white px-3 py-2 rounded-md"
              onClick={() => onSelect(service)}
            >
              View Seats
            </button>
          </div>
        </div>
      ))}
      <button
          onClick={handleClear}
          className="bg-red-400 text-white rounded-full p-3 px-6 mt-5 cursor-pointer hover:bg-red-300"
        >
          Clear Search
        </button>
    </div>
  );
}
