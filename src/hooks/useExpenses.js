import { useEffect, useState } from "react";
import { getCached, setCached } from "../lib/store";
import { makeId } from "../lib/id";

const KEY = "expenses";

export function emptyExpense() {
  return {
    id: makeId("exp"),
    title: "",
    amount: "",
    date: new Date().toISOString().slice(0, 10),
    category: "misc",
    note: "",
  };
}

export function useExpenses() {
  const [expenses, setExpenses] = useState(() => getCached(KEY, []));

  function addExpense(expense) {
    setExpenses((prev) => {
      const next = [...prev, expense];
      setCached(KEY, next);
      return next;
    });
  }

  function deleteExpense(id) {
    setExpenses((prev) => {
      const next = prev.filter((e) => e.id !== id);
      setCached(KEY, next);
      return next;
    });
  }

  return { expenses, addExpense, deleteExpense };
}
