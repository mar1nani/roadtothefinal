const PREFIX = "roadtrip_mrs_bcn:";

export function getCached(key, fallback) {
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function setCached(key, value) {
  window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
  return value;
}

export function clearAll() {
  Object.keys(window.localStorage)
    .filter((k) => k.startsWith(PREFIX))
    .forEach((k) => window.localStorage.removeItem(k));
}
