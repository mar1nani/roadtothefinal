import { getCached, setCached } from "./store";
import { makeId } from "./id";
import defaultShopping from "../data/shopping.json";

const KEY = "shopping";

export async function loadShopping() {
  return getCached(KEY, defaultShopping);
}

async function saveShopping(data) {
  setCached(KEY, data);
  return data;
}

export async function addList(name) {
  const data = await loadShopping();
  return saveShopping({ lists: [...data.lists, { id: makeId("list"), name, items: [] }] });
}

export async function renameList(listId, name) {
  const data = await loadShopping();
  return saveShopping({ lists: data.lists.map((l) => (l.id === listId ? { ...l, name } : l)) });
}

export async function deleteList(listId) {
  const data = await loadShopping();
  return saveShopping({ lists: data.lists.filter((l) => l.id !== listId) });
}

export async function addItem(listId, name) {
  const data = await loadShopping();
  return saveShopping({
    lists: data.lists.map((l) => (l.id === listId ? { ...l, items: [...l.items, { id: makeId("item"), name, checked: false }] } : l)),
  });
}

export async function updateItem(listId, itemId, patch) {
  const data = await loadShopping();
  return saveShopping({
    lists: data.lists.map((l) =>
      l.id === listId ? { ...l, items: l.items.map((it) => (it.id === itemId ? { ...it, ...patch } : it)) } : l
    ),
  });
}

export async function deleteItem(listId, itemId) {
  const data = await loadShopping();
  return saveShopping({
    lists: data.lists.map((l) => (l.id === listId ? { ...l, items: l.items.filter((it) => it.id !== itemId) } : l)),
  });
}
