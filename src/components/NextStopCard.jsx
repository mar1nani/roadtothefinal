import { C } from "../styles/theme";
import WeatherPill from "./WeatherPill";

export default function NextStopCard({ day }) {
  if (!day) {
    return (
      <div style={{ background: C.card, border: `1px solid ${C.gold}`, borderRadius: 12, padding: "14px 16px" }}>
        <div style={{ fontSize: 13, color: C.gold, fontWeight: 700 }}>🏆 Trip terminé, bon retour !</div>
      </div>
    );
  }

  return (
    <div style={{ background: C.card, border: `1px solid ${C.gold}`, borderRadius: 12, padding: "14px 16px" }}>
      <div style={{ fontSize: 11, color: C.dim, textTransform: "uppercase", letterSpacing: 1.5, fontWeight: 700, marginBottom: 6 }}>
        Prochaine étape
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
        <div style={{ fontSize: 16, color: C.cream, fontWeight: 700 }}>
          {day.emoji} {day.to}
        </div>
        <WeatherPill lat={day.lat} lon={day.lon} />
      </div>
      <div style={{ display: "flex", gap: 14, marginTop: 6, fontSize: 13, color: C.gold, fontWeight: 600 }}>
        <span>📍 {day.km} km</span>
        <span>⏱ {day.drive}</span>
      </div>
    </div>
  );
}
