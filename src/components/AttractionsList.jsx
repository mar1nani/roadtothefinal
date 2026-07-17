import { C } from "../styles/theme";

export default function AttractionsList({ attractions }) {
  if (!attractions || attractions.length === 0) return null;

  return (
    <div>
      <div style={{ fontSize: 12, color: C.gold, textTransform: "uppercase", letterSpacing: 1, fontWeight: 700, marginBottom: 8 }}>
        📍 À voir sur place
      </div>
      <div style={{ display: "grid", gap: 7, marginBottom: 16 }}>
        {attractions.map((a, i) => (
          <div key={i} style={{ display: "flex", gap: 8, alignItems: "stretch" }}>
            <div style={{ flex: 1, background: C.card, border: `1px solid ${C.line}`, borderRadius: 9, padding: "10px 12px" }}>
              <div style={{ fontSize: 13, color: C.cream, fontWeight: 700 }}>{a.name}</div>
              <div style={{ fontSize: 11.5, color: C.dim, marginTop: 2, lineHeight: 1.4 }}>{a.desc}</div>
            </div>
            <a
              href={"https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(a.mapQuery || a.name)}
              target="_blank"
              rel="noreferrer"
              title="Ouvrir dans Google Maps"
              style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", width: 44, background: C.card, border: `1px solid ${C.line}`, borderRadius: 9, textDecoration: "none", fontSize: 18 }}
            >
              📍
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
