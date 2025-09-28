import { Routes, Route, Navigate } from "react-router-dom";
import LaunchesPage from "./pages/LaunchesPage.jsx";
import Header from "./components/Header.jsx";

export default function App() {
  return (
    <div>
      <div className="header">
        <div className="header-inner container">
          <Header />
        </div>
      </div>
      <div className="container">
        <Routes>
          <Route path="/" element={<LaunchesPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}
