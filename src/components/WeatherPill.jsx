import { useWeather } from "../hooks/useWeather";
import { C } from "../styles/theme";

export default function WeatherPill({ lat, lon }) {
  const { weather, status } = useWeather(lat, lon);

  if (status === "loading") {
    return <span style={{ fontSize: 12, color: C.dim }}>...</span>;
  }
  if (status === "error" || !weather) {
    return <span style={{ fontSize: 12, color: C.dim }}>—</span>;
  }
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        background: "rgba(212,175,55,.12)",
        border: `1px solid ${C.gold}`,
        borderRadius: 20,
        padding: "2px 9px",
        fontSize: 12.5,
        fontWeight: 700,
        color: C.gold,
        whiteSpace: "nowrap",
      }}
    >
      {weather.icon} {weather.tempC}°C
    </span>
  );
}
