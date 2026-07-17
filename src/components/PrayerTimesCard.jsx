import { C } from "../styles/theme";
import { usePrayerTimes } from "../hooks/usePrayerTimes";

const LABELS = { Fajr: "Fajr", Dhuhr: "Dhuhr", Asr: "Asr", Maghrib: "Maghrib", Isha: "Isha" };

export default function PrayerTimesCard({ lat, lon, isoDate }) {
  const { timings, status } = usePrayerTimes(lat, lon, isoDate);

  return (
    <div style={{ background: "linear-gradient(135deg,#122150,#0e1838)", border: `1px solid ${C.line}`, borderRadius: 9, padding: "11px 13px" }}>
      <div style={{ fontSize: 11, color: C.gold, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8 }}>
        🕌 Horaires de prière
      </div>
      {status === "loading" && <div style={{ fontSize: 12, color: C.dim }}>Chargement...</div>}
      {status === "error" && <div style={{ fontSize: 12, color: C.dim }}>Indisponible pour le moment.</div>}
      {status === "ok" && timings && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 4 }}>
          {Object.entries(LABELS).map(([k, lbl]) => (
            <div key={k} style={{ textAlign: "center", background: "#0a1130", borderRadius: 5, padding: "5px 2px", border: "1px solid #1e2f5a" }}>
              <div style={{ fontSize: 9, color: "#c9a94a" }}>{lbl}</div>
              <div style={{ fontSize: 11, color: "#f4efe0", fontWeight: 600 }}>{timings[k]}</div>
            </div>
          ))}
        </div>
      )}
      <div style={{ fontSize: 10, color: C.dim, marginTop: 6 }}>Estimation (méthode MWL) pour la position du jour.</div>
    </div>
  );
}
