import { C } from "../styles/theme";

export default function DaySchedule({ schedule }) {
  if (!schedule || schedule.length === 0) return null;

  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 12, color: C.gold, textTransform: "uppercase", letterSpacing: 1, fontWeight: 700, marginBottom: 8 }}>
        🗓️ Planning de la journée
      </div>
      <div style={{ display: "grid", gap: 8 }}>
        {schedule.map((s, i) => (
          <div key={i} style={{ display: "flex", gap: 10 }}>
            <div style={{ flexShrink: 0, width: 52, textAlign: "right", paddingTop: 11 }}>
              <span style={{ fontSize: 12.5, color: C.gold, fontWeight: 800 }}>{s.time}</span>
            </div>
            <div style={{ flex: 1, display: "flex", gap: 8, alignItems: "stretch" }}>
              <div style={{ flex: 1, background: C.card, border: `1px solid ${C.line}`, borderRadius: 9, padding: "9px 12px" }}>
                <div style={{ fontSize: 13, color: C.cream, fontWeight: 700 }}>{s.title}</div>
                {s.place && <div style={{ fontSize: 11.5, color: C.gold, marginTop: 1 }}>{s.place}</div>}
                {s.address && <div style={{ fontSize: 11, color: C.dim, marginTop: 1 }}>{s.address}</div>}
                {s.desc && <div style={{ fontSize: 11.5, color: C.dim, marginTop: 3, lineHeight: 1.4 }}>{s.desc}</div>}
              </div>
              {s.mapQuery && (
                <a
                  href={"https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(s.mapQuery)}
                  target="_blank"
                  rel="noreferrer"
                  title="Ouvrir dans Google Maps"
                  style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", width: 44, background: C.card, border: `1px solid ${C.line}`, borderRadius: 9, textDecoration: "none", fontSize: 18 }}
                >
                  📍
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
