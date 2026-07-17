import { C } from "../styles/theme";
import { SPEND_CATS } from "../data/trip";

export default function ExpenseSummary({ expenses }) {
  const total = expenses.reduce((s, e) => s + (parseFloat(e.amount) || 0), 0);
  const byCat = SPEND_CATS.map(([k, emo, lbl]) => ({
    k,
    emo,
    lbl,
    total: expenses.filter((e) => e.category === k).reduce((s, e) => s + (parseFloat(e.amount) || 0), 0),
  })).filter((c) => c.total > 0);

  return (
    <div style={{ background: C.card, border: `1px solid ${C.gold}`, borderRadius: 12, padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
        <div style={{ fontSize: 13, color: C.cream, fontWeight: 700 }}>Total dépensé</div>
        <div style={{ fontSize: 22, color: C.gold, fontWeight: 800 }}>{Math.round(total)}€</div>
      </div>
      {byCat.length > 0 && (
        <div style={{ display: "grid", gap: 6 }}>
          {byCat.map((c) => (
            <div key={c.k} style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, color: C.cream }}>
              <span>{c.emo} {c.lbl}</span>
              <span style={{ fontWeight: 700, color: C.gold }}>{Math.round(c.total)}€</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
