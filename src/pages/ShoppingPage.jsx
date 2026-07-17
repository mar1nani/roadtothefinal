import { useEffect, useState } from "react";
import { C } from "../styles/theme";
import ShoppingList from "../components/ShoppingList";
import { loadShopping, addList, deleteList, addItem, updateItem, deleteItem } from "../lib/listService";

export default function ShoppingPage() {
  const [data, setData] = useState(null);
  const [newListName, setNewListName] = useState("");

  useEffect(() => {
    loadShopping().then(setData);
  }, []);

  if (!data) return null;

  const totalRemaining = data.lists.reduce((s, l) => s + l.items.filter((it) => !it.checked).length, 0);

  function handleAddList(e) {
    e.preventDefault();
    if (!newListName.trim()) return;
    addList(newListName.trim()).then(setData);
    setNewListName("");
  }

  return (
    <div className="fadein" style={{ maxWidth: 1000, margin: "0 auto", padding: "20px 16px 60px" }}>
      <h1 className="serif" style={{ fontSize: 24, color: C.cream, marginBottom: 4 }}>🛒 Liste de courses</h1>
      <div style={{ fontSize: 12, color: C.dim, marginBottom: 16 }}>{totalRemaining} articles restants au total</div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 14, marginBottom: 18 }}>
        {data.lists.map((list) => (
          <ShoppingList
            key={list.id}
            list={list}
            onAddItem={(name) => addItem(list.id, name).then(setData)}
            onToggleItem={(itemId, checked) => updateItem(list.id, itemId, { checked }).then(setData)}
            onDeleteItem={(itemId) => deleteItem(list.id, itemId).then(setData)}
            onDeleteList={() => {
              if (confirm(`Supprimer la liste "${list.name}" ?`)) deleteList(list.id).then(setData);
            }}
          />
        ))}
      </div>

      <form onSubmit={handleAddList} style={{ display: "flex", gap: 8, maxWidth: 340 }}>
        <input
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          placeholder="Nouvelle catégorie..."
          style={{ flex: 1, background: C.card, border: `1px solid ${C.line}`, borderRadius: 8, padding: "10px 12px", color: C.cream, fontSize: 13 }}
        />
        <button type="submit" style={{ background: `linear-gradient(135deg,${C.gold},#9a7420)`, border: "none", borderRadius: 8, padding: "10px 16px", color: "#1a1200", fontWeight: 700, cursor: "pointer" }}>
          + Liste
        </button>
      </form>
    </div>
  );
}
