import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/SettingsPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUserFromStorage } from "./features/auth/authSlice";
import MainLayout from "./layouts/MainLayout";

function App() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.ui.theme); // Get theme from Redux
  const { user, accessToken, refreshToken, isAuthChecked } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    document.body.className = theme; // Apply light or dark theme to body
  }, [theme]);

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  const isLoggedIn = user && accessToken && refreshToken;

  if (!isAuthChecked) {
    return <div>Loading...</div>; // or a spinner if you want
  }

  return (
    <BrowserRouter>
      <div className={theme}>
        {isLoggedIn && <Navbar />}

        <Routes>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Settings />
                </MainLayout>
              </ProtectedRoute>
            }
          />

           {/* ✅ Auth Pages */}
          <Route
            path="/"
            element={
              !isLoggedIn ? <Login /> : <Navigate to="/dashboard" replace />
            }
          />
          <Route
            path="/register"
            element={!isLoggedIn ? <Register /> : <Navigate to="/" replace />}
          />
          {/* Handle unknown routes */}
          <Route
            path="*"
            element={
              isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/" />
            }
          />
        </Routes>

        {isLoggedIn && <Footer />}
      </div>
    </BrowserRouter>
  );
}

export default App;
