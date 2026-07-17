import { C } from "../styles/theme";
import { useExpenses } from "../hooks/useExpenses";
import { tripBudgetEstimateTotal } from "../data/trip";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseSummary from "../components/ExpenseSummary";

export default function BudgetPage() {
  const { expenses, addExpense, deleteExpense } = useExpenses();
  const spent = expenses.reduce((s, e) => s + (parseFloat(e.amount) || 0), 0);
  const estimate = tripBudgetEstimateTotal();

  return (
    <div className="fadein" style={{ maxWidth: 640, margin: "0 auto", padding: "20px 16px 60px" }}>
      <h1 className="serif" style={{ fontSize: 24, color: C.cream, marginBottom: 16 }}>💰 Budget du trip</h1>
      <div style={{ display: "grid", gap: 16 }}>
        <div style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 12, padding: "12px 16px", display: "flex", justifyContent: "space-between", fontSize: 13 }}>
          <span style={{ color: C.dim }}>Estimation prévisionnelle (3 jours)</span>
          <span style={{ color: C.gold, fontWeight: 700 }}>~{estimate}€</span>
        </div>
        <ExpenseSummary expenses={expenses} />
        <div style={{ fontSize: 11.5, color: C.dim, textAlign: "center", marginTop: -8 }}>
          {spent > estimate ? `⚠️ ${Math.round(spent - estimate)}€ au-dessus de l'estimation` : `✓ ${Math.round(estimate - spent)}€ de marge par rapport à l'estimation`}
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 13, color: C.cream, fontWeight: 700, marginBottom: 10 }}>Ajouter une dépense</div>
          <ExpenseForm onAdd={addExpense} />
        </div>
        <div>
          <div style={{ fontSize: 13, color: C.cream, fontWeight: 700, marginBottom: 10 }}>Historique</div>
          <ExpenseList expenses={expenses} onDelete={deleteExpense} />
        </div>
      </div>
    </div>
  );
}
