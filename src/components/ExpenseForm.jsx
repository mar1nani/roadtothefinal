import { useState } from "react";
import { C } from "../styles/theme";
import { SPEND_CATS } from "../data/trip";
import { emptyExpense } from "../hooks/useExpenses";

export default function ExpenseForm({ onAdd }) {
  const [form, setForm] = useState(emptyExpense());

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim() || !form.amount) return;
    onAdd({ ...form, amount: parseFloat(form.amount) || 0 });
    setForm(emptyExpense());
  }

  const inputStyle = {
    width: "100%",
    background: "#0a1130",
    border: `1px solid ${C.line}`,
    borderRadius: 8,
    padding: "9px 11px",
    color: C.cream,
    fontSize: 14,
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 8 }}>
        <input style={inputStyle} placeholder="Ex: Essence, plage..." value={form.title} onChange={(e) => set("title", e.target.value)} />
        <input style={inputStyle} type="number" inputMode="decimal" placeholder="0 €" value={form.amount} onChange={(e) => set("amount", e.target.value)} />
      </div>
      <select style={inputStyle} value={form.category} onChange={(e) => set("category", e.target.value)}>
        {SPEND_CATS.map(([k, emo, lbl]) => (
          <option key={k} value={k}>
            {emo} {lbl}
          </option>
        ))}
      </select>
      <input style={inputStyle} placeholder="Note (optionnel)" value={form.note} onChange={(e) => set("note", e.target.value)} />
      <button
        type="submit"
        style={{ background: `linear-gradient(135deg,${C.gold},#9a7420)`, border: "none", borderRadius: 9, padding: "11px 16px", color: "#1a1200", fontWeight: 700, cursor: "pointer" }}
      >
        + Ajouter la dépense
      </button>
    </form>
  );
}
