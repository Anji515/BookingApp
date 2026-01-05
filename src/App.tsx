import { Routes, Route, useNavigate, useSearchParams } from "react-router-dom";
import Search from "./Search";
import ServiceList from "./ServiceList";
import { useEffect, useState } from "react";
import type { Service } from "./ServiceList";
import { HeroSection } from "./components/HeroSection";
import { NoResults } from "./components/NoResult";
import { searchServices } from "./api";
import SeatLayout from "./SeatLayout";

export default function AppRoutes() {
  const [services, setServices] = useState<Service[]>([]);
  const [params, setParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const date = params.get("date") || "";
  
  const hasSearched = Boolean(from && to && date);

  const handleClearSearch = () => {
    navigate("/");
    setServices([]);
  };

  useEffect(() => {
    if (!hasSearched) return;
    let cancelled = false;
    async function fetchServices() {
      setLoading(true);
      try {
        const data = await searchServices(from, to, date);
        if (!cancelled) {
          setServices(data);
        }
      } catch {
        if (!cancelled) {
          setServices([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }
    fetchServices();
    return () => {
      cancelled = true;
    };
  }, [from, to, date, hasSearched]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Search
                from={from}
                to={to}
                date={date}
                onSearch={(values) => setParams(values)}
                onResults={setServices}
                handleClearSearch={handleClearSearch}
                showNoResultClear={hasSearched && !services.length && !loading}
                showClearOnList={!!services.length && !loading}
              />
              {loading && (
                <div className="fixed inset-0 bg-white/60 flex justify-center items-center z-50">
                  <div className="h-10 w-10 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
                </div>
              )}
              {!hasSearched && !loading && !services.length && <HeroSection />}
              {hasSearched && !services.length && !loading && (
                <NoResults />
              )}
              {!!services.length && (
                <ServiceList
                  services={services}
                  onSelect={(service) =>
                    navigate(`/seats?serviceId=${service._id}`)
                  }
                />
              )}
            </>
          }
        />

        <Route path="/seats" element={<SeatLayout />} />
      </Routes>
    </>
  );
}
