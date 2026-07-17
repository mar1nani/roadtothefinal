import { NavLink } from "react-router-dom";
import { C } from "../styles/theme";

const ITEMS = [
  { to: "/", label: "Accueil", icon: "🏠", end: true },
  { to: "/budget", label: "Budget", icon: "💰" },
  { to: "/shopping", label: "Courses", icon: "🛒" },
];

export default function TopNav() {
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 30,
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "10px 16px",
        background: "rgba(10,17,48,.92)",
        backdropFilter: "blur(6px)",
        borderBottom: `1px solid ${C.line}`,
      }}
    >
      <span style={{ fontSize: 13, color: C.gold, fontWeight: 800, letterSpacing: 1, marginRight: "auto" }}>
        🇫🇷 → 🇪🇸
      </span>
      {ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          style={({ isActive }) => ({
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "7px 13px",
            borderRadius: 20,
            fontSize: 13,
            fontWeight: isActive ? 700 : 500,
            color: isActive ? "#1a1200" : C.cream,
            background: isActive ? `linear-gradient(135deg,${C.gold},#c8992e)` : "transparent",
            textDecoration: "none",
          })}
        >
          <span>{item.icon}</span>
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
