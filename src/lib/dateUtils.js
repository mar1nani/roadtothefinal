export function todayStr(now = new Date()) {
  return now.toISOString().slice(0, 10);
}

// Index du jour "courant" du trip en comparant la date du jour à days[].isoDate.
// -1 = avant le départ, sinon index du dernier jour déjà commencé (peut être
// le dernier jour même après la fin du trip — voir tripStatus ci-dessous).
export function currentDayIndex(days, now = new Date()) {
  const t = todayStr(now);
  let idx = -1;
  for (let i = 0; i < days.length; i++) {
    if (days[i].isoDate <= t) idx = i;
  }
  return idx;
}

export function tripStatus(days, now = new Date()) {
  const t = todayStr(now);
  const idx = currentDayIndex(days, now);
  if (idx === -1) return { status: "before", idx: 0 };
  if (t > days[idx].isoDate && idx === days.length - 1) return { status: "after", idx };
  return { status: "during", idx };
}

export function daysUntil(isoDate, now = new Date()) {
  const target = new Date(isoDate + "T00:00:00");
  const from = new Date(todayStr(now) + "T00:00:00");
  return Math.round((target - from) / 86400000);
}

export function countdownParts(targetIso, now = new Date()) {
  const diff = new Date(targetIso) - now;
  if (diff <= 0) return null;
  const totalMin = Math.floor(diff / 60000);
  const days = Math.floor(totalMin / 1440);
  const hours = Math.floor((totalMin % 1440) / 60);
  const minutes = totalMin % 60;
  return { days, hours, minutes };
}
