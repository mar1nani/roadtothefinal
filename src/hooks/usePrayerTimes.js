import { useEffect, useState } from "react";

const CACHE = new Map();
const ALADHAN_URL = "https://api.aladhan.com/v1/timings";
const KEYS = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

function toDDMMYYYY(isoDate) {
  const [y, m, d] = isoDate.split("-");
  return `${d}-${m}-${y}`;
}

// Horaires de prière via Aladhan (API publique gratuite, sans clé), méthode
// Muslim World League (method=3) — repère neutre pour un trajet France/Espagne.
export function usePrayerTimes(lat, lon, isoDate) {
  const [timings, setTimings] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (lat == null || lon == null || !isoDate) {
      setStatus("error");
      return;
    }
    const key = `${lat.toFixed(2)},${lon.toFixed(2)},${isoDate}`;
    const cached = CACHE.get(key);
    if (cached) {
      setTimings(cached);
      setStatus("ok");
      return;
    }

    let cancelled = false;
    const url = `${ALADHAN_URL}/${toDDMMYYYY(isoDate)}?latitude=${lat}&longitude=${lon}&method=3`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        const t = data?.data?.timings;
        if (!t) throw new Error("no timings");
        const result = Object.fromEntries(KEYS.map((k) => [k, t[k]]));
        CACHE.set(key, result);
        setTimings(result);
        setStatus("ok");
      })
      .catch((e) => {
        console.warn("Aladhan indisponible :", e);
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [lat, lon, isoDate]);

  return { timings, status };
}
