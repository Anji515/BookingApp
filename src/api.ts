// const API = "http://localhost:4000/api"; // kept for ref
const BASE_URL = import.meta.env.VITE_BASE_BOOKING_API;

// Search Service
export async function searchServices(from: string, to: string, date: string) {
  const res = await fetch(
    `${BASE_URL}/services?from=${from}&to=${to}&date=${date}`
  );
  return res.json();
}

// Get Service
export async function getService(id: string) {
  const res = await fetch(`${BASE_URL}/services/${id}`);
  return res.json();
}

// Lock Seat
export async function lockSeat(serviceId: string, seatId: string) {
  return fetch(`${BASE_URL}/services/${serviceId}/seats/${seatId}/lock`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
}

// Book Seat
export async function bookSeat(serviceId: string, seatId: string) {
  return fetch(`${BASE_URL}/services/${serviceId}/seats/${seatId}/book`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
}
