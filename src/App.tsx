import { Routes, Route, useNavigate } from "react-router-dom";
import Search from "./Search";
import SeatLayout from "./SeatLayout";
import ServiceList from "./ServiceList";
import { useState } from "react";
import type { Service } from "./ServiceList";

export default function AppRoutes() {
  const [services, setServices] = useState<Service[]>([]);
  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Search onResults={setServices} />
            <ServiceList
              services={services}
              onSelect={(service) =>
                navigate(`/seats?serviceId=${service._id}`)
              }
            />
          </>
        }
      />
      <Route path="/seats" element={<SeatLayout />} />
    </Routes>
  );
}
