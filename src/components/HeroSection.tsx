export function HeroSection() {
  return (
    <div className="flex flex-col items-center justify-center mt-10 md:mt-24 text-center">
      <div className="relative">
        <div className="absolute -inset-6 bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 blur-2xl opacity-40 rounded-full"></div>
        <div className="relative bg-white rounded-full p-8 md:p-12 shadow-xl">
          <span className="text-5xl">🚌</span>
        </div>
      </div>

      <h2 className="mt-10 text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Find Your Perfect Bus
      </h2>

      <p className="mt-2 text-gray-500 max-w-md">
        Choose your route and travel date to explore available buses and pick your seat.
      </p>
    </div>
  );
}