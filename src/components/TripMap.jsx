import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import { useEffect, useMemo } from "react";
import L from "leaflet";
import { C } from "../styles/theme";

const goldIcon = new L.DivIcon({
  className: "",
  html: `<div style="width:16px;height:16px;border-radius:50%;background:#d4af37;border:2.5px solid #0a1130;box-shadow:0 0 0 3px rgba(212,175,55,.35)"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

const currentIcon = new L.DivIcon({
  className: "",
  html: `<div style="width:20px;height:20px;border-radius:50%;background:#c8102e;border:3px solid #fff;box-shadow:0 0 0 5px rgba(200,16,46,.3)"></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

function FitBounds({ points }) {
  const map = useMap();
  useEffect(() => {
    if (!points.length) return;
    // Le conteneur peut avoir une largeur 0 au premier effect (layout flex pas
    // encore posé) : on attend une frame pour que fitBounds calcule le bon zoom.
    const raf = requestAnimationFrame(() => {
      map.invalidateSize();
      const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lon]));
      map.fitBounds(bounds, { padding: [30, 30] });
    });
    return () => cancelAnimationFrame(raf);
  }, [map, points]);
  return null;
}

export default function TripMap({ points, currentPoint, onPick }) {
  const line = useMemo(() => points.map((p) => [p.lat, p.lon]), [points]);

  return (
    <div
      style={{
        background: "linear-gradient(160deg,#0e1838,#0a1130)",
        border: `1px solid ${C.line}`,
        borderRadius: 14,
        padding: "12px 10px 10px",
        boxShadow: "0 8px 30px rgba(0,0,0,.35)",
      }}
    >
      <div
        style={{
          fontSize: 12,
          color: C.gold,
          textTransform: "uppercase",
          letterSpacing: 2,
          fontWeight: 700,
          padding: "2px 6px 8px",
        }}
      >
        ★ Mon itinéraire
      </div>
      <div style={{ borderRadius: 10, overflow: "hidden", height: 320 }}>
        <MapContainer center={[42.2, 3]} zoom={7} style={{ width: "100%", height: "100%" }} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; OpenStreetMap contributors, &copy; CARTO'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          <FitBounds points={points} />
          <Polyline positions={line} pathOptions={{ color: "#d4af37", weight: 3.5, opacity: 0.85, dashArray: "1,8", lineCap: "round" }} />
          {points.map((p, i) => (
            <Marker
              key={i}
              position={[p.lat, p.lon]}
              icon={goldIcon}
              eventHandlers={onPick ? { click: () => onPick(p) } : undefined}
            >
              <Popup>
                <strong>{p.label || p.city}</strong>
                {p.note && <div style={{ fontSize: 12, marginTop: 4 }}>{p.note}</div>}
              </Popup>
            </Marker>
          ))}
          {currentPoint && (
            <Marker position={[currentPoint.lat, currentPoint.lon]} icon={currentIcon}>
              <Popup>📍 Ma position actuelle</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
}
