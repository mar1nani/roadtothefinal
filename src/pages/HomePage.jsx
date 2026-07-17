import { useNavigate } from "react-router-dom";
import { DAYS, MAP_PTS, TRIP_META, tripBudgetEstimateTotal } from "../data/trip";
import { C } from "../styles/theme";
import { tripStatus } from "../lib/dateUtils";
import { useCurrentLocation } from "../hooks/useCurrentLocation";
import { useDayProgress, getDayEntry } from "../hooks/useDayProgress";
import TripMap from "../components/TripMap";
import DayCard from "../components/DayCard";
import NextStopCard from "../components/NextStopCard";
import CountdownCard from "../components/CountdownCard";
import CurrentLocationCard from "../components/CurrentLocationCard";

export default function HomePage() {
  const navigate = useNavigate();
  const { location, status: locationStatus } = useCurrentLocation();
  const { progress } = useDayProgress();
  const { status, idx } = tripStatus(DAYS);
  const currentDay = status === "after" ? null : DAYS[idx];

  const currentPoint =
    location && (locationStatus === "ok" || locationStatus === "fallback") ? { lat: location.lat, lon: location.lon } : null;

  return (
    <div className="fadein" style={{ minHeight: "100vh" }}>
      <div
        style={{
          position: "relative",
          background: "linear-gradient(180deg,#0e1a44 0%,#0a1130 60%,#080d20 100%)",
          borderBottom: `1px solid ${C.gold}`,
          padding: "30px 18px 22px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 11, letterSpacing: 6, color: C.gold, textTransform: "uppercase", fontWeight: 600 }}>
          {TRIP_META.subtitle}
        </div>
        <h1 className="serif" style={{ fontSize: "clamp(22px,5.5vw,34px)", color: "#faf4e2", margin: "8px 0 6px", fontWeight: 700 }}>
          {TRIP_META.title}
        </h1>
        <div style={{ fontSize: 13, color: C.gold, fontWeight: 600 }}>{TRIP_META.finalMatch}</div>
        <div style={{ fontSize: 12.5, color: C.dim, marginTop: 6 }}>17 → 19 juillet 2026 · Leucate · Girona · Barcelone</div>
        <div style={{ fontSize: 11, color: C.dim, marginTop: 4, maxWidth: 420, marginLeft: "auto", marginRight: "auto" }}>{TRIP_META.finalNote}</div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "18px 16px 0" }}>
        <TripMap points={MAP_PTS} currentPoint={currentPoint} onPick={(p) => p.dayN && navigate(`/days/${p.dayN}`)} />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12, margin: "16px 0" }}>
          <NextStopCard day={currentDay} />
          <CountdownCard />
          <CurrentLocationCard location={location} status={locationStatus} />
          <div style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 12, padding: "14px 16px" }}>
            <div style={{ fontSize: 11, color: C.dim, textTransform: "uppercase", letterSpacing: 1.5, fontWeight: 700, marginBottom: 6 }}>
              💸 Budget prévisionnel
            </div>
            <div style={{ fontSize: 18, color: C.gold, fontWeight: 800 }}>~{tripBudgetEstimateTotal()}€</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>Estimation pour les 3 jours (voir détail par jour + Budget réel)</div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <span style={{ height: 1, flex: 1, background: `linear-gradient(90deg,transparent,${C.line})` }} />
          <span style={{ fontSize: 12, color: C.gold, textTransform: "uppercase", letterSpacing: 3, fontWeight: 600 }}>★ Les 3 étapes ★</span>
          <span style={{ height: 1, flex: 1, background: `linear-gradient(90deg,${C.line},transparent)` }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 14, paddingBottom: 40 }}>
          {DAYS.map((d) => {
            const entry = getDayEntry(progress, d.n);
            const doneCount = Object.values(entry.checks || {}).filter(Boolean).length;
            return (
              <DayCard
                key={d.n}
                day={d}
                doneCount={doneCount}
                isToday={status === "during" && d.n === DAYS[idx].n}
                onClick={() => navigate(`/days/${d.n}`)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
