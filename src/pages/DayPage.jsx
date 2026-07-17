import { useNavigate, useParams } from "react-router-dom";
import { DAYS } from "../data/trip";
import { C } from "../styles/theme";
import WeatherPill from "../components/WeatherPill";
import PrayerTimesCard from "../components/PrayerTimesCard";
import BudgetEstimateCard from "../components/BudgetEstimateCard";
import AttractionsList from "../components/AttractionsList";
import DaySchedule from "../components/DaySchedule";
import { useDayProgress, getDayEntry } from "../hooks/useDayProgress";

export default function DayPage() {
  const { dayNumber } = useParams();
  const navigate = useNavigate();
  const idx = DAYS.findIndex((d) => d.n === Number(dayNumber));
  const day = DAYS[idx];
  const { progress, patchDay } = useDayProgress();

  if (!day) {
    return (
      <div style={{ padding: 20, color: C.cream }}>
        Jour introuvable. <button onClick={() => navigate("/")}>Retour à l'accueil</button>
      </div>
    );
  }

  const entry = getDayEntry(progress, day.n);
  const checks = entry.checks || {};
  const doneCount = Object.values(checks).filter(Boolean).length;

  function toggleCheck(i) {
    patchDay(day.n, { checks: { ...checks, [i]: !checks[i] } });
  }

  return (
    <div className="fadein" style={{ minHeight: "100vh", maxWidth: 760, margin: "0 auto", paddingBottom: 60 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", borderBottom: `1px solid ${C.line}` }}>
        <button
          onClick={() => navigate("/")}
          style={{ background: C.accent, border: `1px solid ${C.line}`, color: C.cream, borderRadius: 8, padding: "7px 12px", cursor: "pointer", fontSize: 13 }}
        >
          ← Accueil
        </button>
        <div style={{ fontSize: 13, color: C.gold, fontWeight: 700 }}>Jour {day.n} / 3</div>
        <div style={{ display: "flex", gap: 6 }}>
          <button
            disabled={idx === 0}
            onClick={() => navigate(`/days/${DAYS[idx - 1].n}`)}
            style={{ background: idx === 0 ? "#0d1636" : C.accent, border: `1px solid ${C.line}`, color: idx === 0 ? "#444" : C.cream, borderRadius: 8, padding: "7px 12px", cursor: idx === 0 ? "default" : "pointer" }}
          >
            ◀
          </button>
          <button
            disabled={idx === DAYS.length - 1}
            onClick={() => navigate(`/days/${DAYS[idx + 1].n}`)}
            style={{ background: idx === DAYS.length - 1 ? "#0d1636" : C.accent, border: `1px solid ${C.line}`, color: idx === DAYS.length - 1 ? "#4a5578" : C.cream, borderRadius: 8, padding: "7px 12px", cursor: idx === DAYS.length - 1 ? "default" : "pointer" }}
          >
            ▶
          </button>
        </div>
      </div>

      <div style={{ padding: "22px 14px 10px", textAlign: "center", background: "linear-gradient(180deg,#0e1a44,#0a1130)" }}>
        <div style={{ fontSize: 46 }}>{day.emoji}</div>
        <div style={{ fontSize: 12, color: C.gold, fontWeight: 700, marginTop: 6 }}>
          {day.date} · {day.km} km · {day.drive}
        </div>
        <div style={{ fontSize: 20, color: "#fff", fontWeight: 800, marginTop: 4 }}>
          {day.from} → {day.to}
        </div>
        {day.tag && <div style={{ fontSize: 13, color: "#e8d8b0", fontStyle: "italic", marginTop: 4 }}>{day.tag}</div>}
      </div>

      <div style={{ padding: "16px 14px" }}>
        {day.warn && (
          <div style={{ background: "#1e0e00", border: "1px solid #a05000", borderRadius: 8, padding: "9px 12px", marginBottom: 14, fontSize: 12, color: "#e0954a" }}>
            {day.warn}
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: C.card, border: `1px solid ${C.line}`, borderRadius: 10, padding: "11px 14px", marginBottom: 14 }}>
          <span style={{ fontSize: 12, color: C.dim }}>🌤️ Météo actuelle à {day.to.split(" (")[0]}</span>
          <WeatherPill lat={day.lat} lon={day.lon} />
        </div>

        <div style={{ marginBottom: 14 }}>
          <PrayerTimesCard lat={day.lat} lon={day.lon} isoDate={day.isoDate} />
        </div>

        <div style={{ marginBottom: 14 }}>
          <BudgetEstimateCard day={day} />
        </div>

        {day.schedule ? (
          <DaySchedule schedule={day.schedule} />
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div style={{ fontSize: 12, color: C.gold, textTransform: "uppercase", letterSpacing: 1, fontWeight: 700 }}>Programme</div>
              <div style={{ fontSize: 12, color: C.dim }}>{doneCount}/{day.stops.length} coché{doneCount > 1 ? "s" : ""}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              {day.stops.map((st, i) => {
                const on = !!checks[i];
                return (
                  <div
                    key={i}
                    onClick={() => toggleCheck(i)}
                    style={{
                      display: "flex",
                      gap: 11,
                      alignItems: "flex-start",
                      background: on ? "#16264f" : C.card,
                      border: `1px solid ${on ? "#d4af37" : C.line}`,
                      borderRadius: 9,
                      padding: "11px 12px",
                      cursor: "pointer",
                      marginBottom: 7,
                    }}
                  >
                    <div
                      style={{
                        flexShrink: 0,
                        width: 22,
                        height: 22,
                        borderRadius: 6,
                        border: `2px solid ${on ? "#d4af37" : "#556088"}`,
                        background: on ? "#d4af37" : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 1,
                      }}
                    >
                      {on && <span style={{ color: "#0a1130", fontSize: 14, fontWeight: 900 }}>✓</span>}
                    </div>
                    <div style={{ fontSize: 13.5, color: on ? "#f0e2b8" : C.cream, lineHeight: 1.5 }}>{st}</div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        <AttractionsList attractions={day.attractions} />

        <div style={{ display: "grid", gap: 8 }}>
          <div style={{ background: "linear-gradient(135deg,#122150,#0e1838)", border: "1px solid #2a3c6e", borderRadius: 9, padding: "11px 13px" }}>
            <div style={{ fontSize: 11, color: "#d4af37", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 4 }}>🛏️ Où dormir</div>
            <div style={{ fontSize: 13, color: "#f4efe0", fontWeight: 600 }}>{day.sleep.spot}</div>
            <div style={{ fontSize: 11, color: "#c9a94a" }}>{day.sleep.type}</div>
            <div style={{ fontSize: 11, color: "#93a0c8", marginTop: 3 }}>{day.sleep.notes}</div>
          </div>
          {day.waypoint && (
            <div style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 9, padding: "11px 13px" }}>
              <div style={{ fontSize: 11, color: C.gold, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>🛑 Pause en route</div>
              <div style={{ fontSize: 13, color: C.cream, fontWeight: 600 }}>{day.waypoint.label}</div>
              <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{day.waypoint.note}</div>
            </div>
          )}
          <div style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 9, padding: "10px 12px" }}>
            <div style={{ fontSize: 11, color: C.gold, textTransform: "uppercase", letterSpacing: 1, marginBottom: 3 }}>🛒 Courses</div>
            <div style={{ fontSize: 12, color: C.cream }}>{day.groceries}</div>
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          <div style={{ fontSize: 12, color: C.gold, textTransform: "uppercase", letterSpacing: 1, fontWeight: 700, marginBottom: 8 }}>
            ✍️ Notes du jour
          </div>
          <textarea
            value={entry.notes || ""}
            onChange={(e) => patchDay(day.n, { notes: e.target.value })}
            placeholder="Écris ici ce que tu vis, manges, ressens..."
            style={{ width: "100%", minHeight: 90, background: C.card, border: `1px solid ${C.line}`, borderRadius: 10, padding: 12, color: C.cream, fontSize: 14, lineHeight: 1.6, resize: "vertical" }}
          />
        </div>
      </div>
    </div>
  );
}
