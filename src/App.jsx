import { Route, Routes } from "react-router-dom";
import TopNav from "./components/TopNav";
import HomePage from "./pages/HomePage";
import DayPage from "./pages/DayPage";
import BudgetPage from "./pages/BudgetPage";
import ShoppingPage from "./pages/ShoppingPage";

export default function App() {
  return (
    <>
      <TopNav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/days/:dayNumber" element={<DayPage />} />
        <Route path="/budget" element={<BudgetPage />} />
        <Route path="/shopping" element={<ShoppingPage />} />
      </Routes>
    </>
  );
}
