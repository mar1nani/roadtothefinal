import { useEffect, useState } from "react";
import { getCached, setCached } from "../lib/store";

const KEY = "day_progress";

export function useDayProgress() {
  const [progress, setProgress] = useState(() => getCached(KEY, {}));

  function patchDay(dayN, patch) {
    setProgress((prev) => {
      const key = "d" + dayN;
      const next = { ...prev, [key]: { ...prev[key], ...patch } };
      setCached(KEY, next);
      return next;
    });
  }

  return { progress, patchDay };
}

export function getDayEntry(progress, dayN) {
  return progress["d" + dayN] || { checks: {}, notes: "", weather: "", temp: "" };
}
