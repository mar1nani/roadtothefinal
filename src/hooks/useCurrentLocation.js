import { useEffect, useState } from "react";
import { MAP_PTS } from "../data/trip";

const REFRESH_MS = 5 * 60 * 1000;
const NOMINATIM_URL = "https://nominatim.openstreetmap.org/reverse";

function nearestPoint(lat, lon) {
  let best = null;
  let bestDist = Infinity;
  for (const p of MAP_PTS) {
    const d = (p.lat - lat) ** 2 + (p.lon - lon) ** 2;
    if (d < bestDist) {
      bestDist = d;
      best = p;
    }
  }
  return best;
}

// Position réelle de l'appareil, reverse-géocodée via Nominatim (OSM).
// Dégrade proprement si pas de GPS / autorisation / réseau.
export function useCurrentLocation() {
  const [location, setLocation] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setStatus("unavailable");
      return;
    }

    let cancelled = false;

    function fetchLocation() {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          try {
            const res = await fetch(`${NOMINATIM_URL}?format=json&addressdetails=1&lat=${latitude}&lon=${longitude}`);
            const data = await res.json();
            if (cancelled) return;
            const address = data.address || {};
            setLocation({
              city: address.city || address.town || address.village || address.county || "",
              region: address.state || "",
              country: address.country || "",
              lat: latitude,
              lon: longitude,
            });
            setStatus("ok");
          } catch (e) {
            console.warn("Nominatim indisponible, repli sur le point le plus proche :", e);
            if (cancelled) return;
            const nearest = nearestPoint(latitude, longitude);
            setLocation(nearest ? { city: nearest.city, region: "", country: "", lat: nearest.lat, lon: nearest.lon } : null);
            setStatus("fallback");
          }
        },
        (err) => {
          console.warn("Géolocalisation refusée :", err.message);
          if (!cancelled) setStatus("denied");
        },
        { enableHighAccuracy: false, maximumAge: REFRESH_MS, timeout: 15000 }
      );
    }

    fetchLocation();
    const interval = setInterval(fetchLocation, REFRESH_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return { location, status };
}
