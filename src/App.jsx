import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import SearchHistoryPage from "./pages/SearchHistoryPage";
import MyAccountPage from "./pages/MyAccountPage";
import AboutHelpPage from "./pages/AboutHelpPage";
import AuthService from "./services/authService";

const ProtectedRoute = () => {
  if (!AuthService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/search-history" element={<SearchHistoryPage />} />
            <Route path="/account" element={<MyAccountPage />} />
            <Route path="/about-help" element={<AboutHelpPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
