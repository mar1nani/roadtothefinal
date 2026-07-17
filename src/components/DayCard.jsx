import { C } from "../styles/theme";

export default function DayCard({ day, doneCount, isToday, onClick }) {
  const all = day.stops.length;
  const complete = doneCount >= all && all > 0;

  return (
    <button
      onClick={onClick}
      style={{
        position: "relative",
        background: `linear-gradient(160deg, ${C.card}, #0c1330)`,
        border: `1px solid ${isToday ? C.gold : complete ? "#b98f2e" : C.line}`,
        borderRadius: 14,
        overflow: "hidden",
        cursor: "pointer",
        padding: 0,
        textAlign: "left",
        boxShadow: isToday
          ? "0 0 0 1px rgba(212,175,55,.4), 0 10px 26px rgba(0,0,0,.45)"
          : "0 6px 18px rgba(0,0,0,.35)",
        transition: "transform .15s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
    >
      <div style={{ height: 100, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 42, position: "relative" }}>
        {day.emoji}
        <div
          style={{
            position: "absolute",
            top: 8,
            left: 8,
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: isToday ? "linear-gradient(135deg,#f0d066,#c8992e)" : "rgba(10,17,48,.82)",
            border: `1.5px solid ${C.gold}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: 12, fontWeight: 800, color: isToday ? "#0a1130" : C.gold }}>{day.n}</span>
        </div>
        {isToday && (
          <div
            style={{
              position: "absolute",
              top: 9,
              right: 9,
              background: C.red,
              color: "#fff",
              borderRadius: 6,
              padding: "2px 8px",
              fontSize: 9,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Aujourd'hui
          </div>
        )}
      </div>
      <div style={{ padding: "9px 11px 11px" }}>
        <div style={{ fontSize: 10, color: C.gold, fontWeight: 700 }}>{day.date.split(" ").slice(0, 2).join(" ")}</div>
        <div style={{ fontSize: 13.5, color: "#faf4e2", fontWeight: 700, marginTop: 2 }}>{day.to}</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
          <span style={{ fontSize: 10, color: C.dim }}>{day.km} km · {day.drive}</span>
          <span style={{ fontSize: 10, color: complete ? C.gold : C.dim, fontWeight: 700 }}>
            {doneCount}/{all} ✓
          </span>
        </div>
        <div style={{ background: "#0a1130", borderRadius: 10, height: 6, overflow: "hidden", border: "1px solid #1e2f5a", marginTop: 6 }}>
          <div
            style={{
              width: (all ? (doneCount / all) * 100 : 0) + "%",
              height: "100%",
              background: "linear-gradient(90deg,#a5812c,#d4af37)",
              transition: "width .4s",
            }}
          />
        </div>
      </div>
    </button>
  );
}
