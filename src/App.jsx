import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import SearchHistoryPage from "./pages/SearchHistoryPage";
import MyAccountPage from "./pages/MyAccountPage";
import AboutHelpPage from "./pages/AboutHelpPage";
import AuthService from "./services/authService";

const ProtectedRoute = ({ isAuthChecked, isAuthenticated }) => {
  // Don't render anything until auth check is complete
  if (!isAuthChecked) {
    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

function App() {
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on app load
  useEffect(() => {
    const syncAuthState = () => {
      // Check if token exists in localStorage
      const token = AuthService.getToken();
      setIsAuthenticated(Boolean(token));
      setIsAuthChecked(true);
    };

    syncAuthState();
    window.addEventListener(AuthService.AUTH_CHANGE_EVENT, syncAuthState);
    window.addEventListener('storage', syncAuthState);

    return () => {
      window.removeEventListener(AuthService.AUTH_CHANGE_EVENT, syncAuthState);
      window.removeEventListener('storage', syncAuthState);
    };
  }, []);

  // Don't render routes until auth check is complete
  if (!isAuthChecked) {
    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>Loading...</div>;
  }

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<ProtectedRoute isAuthChecked={isAuthChecked} isAuthenticated={isAuthenticated} />}>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/search-history" element={<SearchHistoryPage />} />
            <Route path="/account" element={<MyAccountPage />} />
            <Route path="/about-help" element={<AboutHelpPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
