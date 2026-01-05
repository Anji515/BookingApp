export function NoResults() {
  return (
    <div className="flex flex-col items-center justify-center mt-10 md:mt-24 text-center">
      <div className="relative">
        <div className="absolute -inset-6 bg-linear-to-r from-orange-400 via-red-400 to-pink-400 blur-2xl opacity-40 rounded-full"></div>
        <div className="relative bg-white rounded-full p-3 px-4 md:p-10 shadow-xl">
          <span className="text-2xl md:text-5xl">🔍</span>
        </div>
      </div>

      <h2 className="mt-3 md:mt-6 text-2xl font-bold bg-linear-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
        No Buses Found
      </h2>

      <p className="mt-2 text-gray-500 max-w-4xl">
        We couldn’t find any buses for this route.
      </p>
      <p className="mt-2 text-gray-500 text-xs md:text-sm max-w-4xl">
        Try another date between <strong>10th to 12th Jan</strong> or{" "}
        <strong>destination</strong>.
      </p>
    </div>
  );
}
