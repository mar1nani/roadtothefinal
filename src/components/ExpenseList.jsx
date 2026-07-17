import { C } from "../styles/theme";
import { SPEND_CATS } from "../data/trip";

function categoryEmoji(key) {
  return SPEND_CATS.find(([k]) => k === key)?.[1] || "🔧";
}

export default function ExpenseList({ expenses, onDelete }) {
  const sorted = [...expenses].sort((a, b) => (b.date || "").localeCompare(a.date || ""));

  if (sorted.length === 0) {
    return <div style={{ textAlign: "center", color: C.dim, fontSize: 13, padding: "20px 0" }}>💳 Aucune dépense pour l'instant.</div>;
  }

  return (
    <div style={{ display: "grid", gap: 8 }}>
      {sorted.map((e) => (
        <div key={e.id} style={{ display: "flex", alignItems: "center", gap: 10, background: C.card, border: `1px solid ${C.line}`, borderRadius: 10, padding: "10px 12px" }}>
          <div style={{ fontSize: 18 }}>{categoryEmoji(e.category)}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13.5, color: C.cream, fontWeight: 600 }}>{e.title || "(sans titre)"}</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>
              {e.date}
              {e.note ? ` · ${e.note}` : ""}
            </div>
          </div>
          <div style={{ fontSize: 15, color: C.gold, fontWeight: 700, flexShrink: 0 }}>{Math.round(e.amount)}€</div>
          <button onClick={() => onDelete(e.id)} style={{ background: "none", border: "none", color: C.dim, cursor: "pointer", fontSize: 14, flexShrink: 0 }}>
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
