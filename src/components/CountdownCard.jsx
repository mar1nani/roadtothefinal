import { useEffect, useState } from "react";
import { C } from "../styles/theme";
import { TRIP_META } from "../data/trip";
import { countdownParts } from "../lib/dateUtils";

export default function CountdownCard() {
  const [, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 60 * 1000);
    return () => clearInterval(id);
  }, []);

  const parts = countdownParts(TRIP_META.finalKickoffIso);

  return (
    <div style={{ background: C.card, border: `1px solid ${C.gold}`, borderRadius: 12, padding: "14px 16px" }}>
      <div style={{ fontSize: 11, color: C.dim, textTransform: "uppercase", letterSpacing: 1.5, fontWeight: 700, marginBottom: 6 }}>
        🏆 Avant la finale
      </div>
      {parts ? (
        <div style={{ display: "flex", gap: 14, fontSize: 20, color: C.gold, fontWeight: 800 }}>
          <span>{parts.days}j</span>
          <span>{parts.hours}h</span>
          <span>{parts.minutes}m</span>
        </div>
      ) : (
        <div style={{ fontSize: 18, color: C.gold, fontWeight: 800 }}>⚽ C'est l'heure !</div>
      )}
    </div>
  );
}
