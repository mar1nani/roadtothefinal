import { C } from "../styles/theme";
import { SPEND_CATS, dayBudgetTotal } from "../data/trip";

export default function BudgetEstimateCard({ day }) {
  const b = day.budgetEstimate || {};
  const total = dayBudgetTotal(day);

  return (
    <div style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 9, padding: "11px 13px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
        <div style={{ fontSize: 11, color: C.gold, textTransform: "uppercase", letterSpacing: 1, fontWeight: 700 }}>
          💸 Estimation dépenses du jour
        </div>
        <div style={{ fontSize: 15, color: C.gold, fontWeight: 800 }}>~{total}€</div>
      </div>
      <div style={{ display: "grid", gap: 5 }}>
        {SPEND_CATS.map(([k, emo, lbl]) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, color: C.cream }}>
            <span>{emo} {lbl}</span>
            <span style={{ fontWeight: 700, color: b[k] ? C.gold : C.dim }}>{b[k] || 0}€</span>
          </div>
        ))}
      </div>
    </div>
  );
}
