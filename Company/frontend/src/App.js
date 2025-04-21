import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUserFromStorage } from "./features/auth/authSlice";
import MainLayout from "./layouts/MainLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  loadCompanyFromStorage,
  setSelectedCompanyId,
  setCompanies,
} from "./features/company/companySlice";

import CreateCompany from "./pages/CreateCompany";
import UserProfile from "./components/SubSettings/SettingsPages/UserProfile";
import CompanyDetails from "./components/SubSettings/SettingsPages/CompanyDetails";
import axios from "axios";

function App() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.ui.theme);
  const { user, accessToken, refreshToken, isAuthChecked } = useSelector(
    (state) => state.auth
  );
  const { companies, selectedCompanyId, companyLoaded } = useSelector(
    (state) => state.company
  );

  const isLoggedIn = user && accessToken && refreshToken;

  // Apply theme to body
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  // Load user from localStorage
  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);



  // Fetch companies from API if accessToken exists
  useEffect(() => {
    const fetchCompanies = async () => {
      if (accessToken) {
        try {
          const res = await axios.get("/api/accounts/profile/companies", {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          dispatch(setCompanies(res.data));
        } catch (err) {
          console.error("Error fetching companies:", err);
        }
      }
    };

    fetchCompanies();
  }, [accessToken, dispatch]);

  // After companies are loaded, auto-select saved company if any
  useEffect(() => {
    const storedCompanyId = localStorage.getItem("selectedCompanyId");
    if (companies.length > 0 && storedCompanyId) {
      const exists = companies.find((c) => c.id === parseInt(storedCompanyId));
      if (exists) {
        dispatch(setSelectedCompanyId(parseInt(storedCompanyId)));
      } else {
        dispatch(setSelectedCompanyId(companies[0].id)); // fallback to first company
      }
    } else if (companies.length > 0 && !selectedCompanyId) {
      dispatch(setSelectedCompanyId(companies[0].id)); // fallback if nothing is selected
    }
  }, [companies, dispatch]);

  if (!isAuthChecked || !companyLoaded) {
    return <div>Loading...</div>;
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
            path="/create-company"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <CreateCompany />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          >
            <Route path="user-profile" element={<UserProfile />} />
            <Route path="company-details" element={<CompanyDetails />} />
            <Route index element={<Navigate to="user-profile" replace />} />
          </Route>

          {/* Auth Routes */}
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
          <Route
            path="*"
            element={
              isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/" />
            }
          />
        </Routes>

        {isLoggedIn && <Footer />}
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </BrowserRouter>
  );
}

export default App;




// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Dashboard from "./pages/Dashboard";
// import Settings from "./pages/Settings";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import ProtectedRoute from "./routes/ProtectedRoute";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { loadUserFromStorage } from "./features/auth/authSlice";
// import MainLayout from "./layouts/MainLayout";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { loadCompanyFromStorage } from "./features/company/companySlice";

// import CreateCompany from "./pages/CreateCompany";

// import UserProfile from "./components/SubSettings/SettingsPages/UserProfile";

// import CompanyDetails from "./components/SubSettings/SettingsPages/CompanyDetails";

// function App() {
//   const dispatch = useDispatch();
//   const theme = useSelector((state) => state.ui.theme); // Get theme from Redux
//   const { user, accessToken, refreshToken, isAuthChecked } = useSelector(
//     (state) => state.auth
//   );

//   useEffect(() => {
//     document.body.className = theme; // Apply light or dark theme to body
//   }, [theme]);

//   useEffect(() => {
//     dispatch(loadUserFromStorage());
//   }, [dispatch]);

//   useEffect(() => {
//     dispatch(loadCompanyFromStorage());
//   }, [dispatch]);

//   const isLoggedIn = user && accessToken && refreshToken;

//   if (!isAuthChecked) {
//     return <div>Loading...</div>; // or a spinner if you want
//   }

//   return (
//     <BrowserRouter>
//       <div className={theme}>
//         {isLoggedIn && <Navbar />}

//         <Routes>
//           <Route
//             path="/dashboard"
//             element={
//               <ProtectedRoute>
//                 <MainLayout>
//                   <Dashboard />
//                 </MainLayout>
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/create-company"
//             element={
//               <ProtectedRoute>
//                 <MainLayout>
//                   <CreateCompany />
//                 </MainLayout>
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/settings"
//             element={
//               <ProtectedRoute>
//                 <Settings />
//               </ProtectedRoute>
//             }
//           >
//             <Route path="user-profile" element={<UserProfile />} />
//             <Route path="company-details" element={<CompanyDetails />} />
//             <Route index element={<Navigate to="user-profile" replace />} />
//           </Route>

//           {/* ✅ Auth Pages */}
//           <Route
//             path="/"
//             element={
//               !isLoggedIn ? <Login /> : <Navigate to="/dashboard" replace />
//             }
//           />
//           <Route
//             path="/register"
//             element={!isLoggedIn ? <Register /> : <Navigate to="/" replace />}
//           />
//           {/* Handle unknown routes */}
//           <Route
//             path="*"
//             element={
//               isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/" />
//             }
//           />
//         </Routes>
//         <ToastContainer position="top-right" autoClose={3000} />
//         {isLoggedIn && <Footer />}
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;

// import UsersRoles from "./components/SubSettings/pages/UsersRoles";
// import Preferences from "./components/SubSettings/pages/Preferences";
// import ThermalPrintSettings from "./components/SubSettings/pages/ThermalPrintSettings";
// import BarcodeSettings from "./components/SubSettings/pages/BarcodeSettings";
// import Signatures from "./components/SubSettings/pages/Signatures";
// import NotesTerms from "./components/SubSettings/pages/NotesTerms";
// import AutoReminders from "./components/SubSettings/pages/AutoReminders";
// import Banks from "./components/SubSettings/pages/Banks";
// import PaymentGateway from "./components/SubSettings/pages/PaymentGateway";
// import TallyIntegration from "./components/SubSettings/pages/TallyIntegration";
// import APIIntegration from "./components/SubSettings/pages/APIIntegration";
// import SocialLinks from "./components/SubSettings/pages/SocialLinks";
// import Support from "./components/SubSettings/pages/Support";

{
  /* <Route path="users-roles" element={<UsersRoles />} />
  <Route path="preferences" element={<Preferences />} />
  <Route path="thermal-print" element={<ThermalPrintSettings />} />
  <Route path="barcode-settings" element={<BarcodeSettings />} />
  <Route path="signatures" element={<Signatures />} />
  <Route path="notes-terms" element={<NotesTerms />} />
  <Route path="auto-reminders" element={<AutoReminders />} />
  <Route path="banks" element={<Banks />} />
  <Route path="payment-gateway" element={<PaymentGateway />} />
  <Route path="tally-integration" element={<TallyIntegration />} />
  <Route path="api-integration" element={<APIIntegration />} />
  <Route path="social-links" element={<SocialLinks />} />
  <Route path="support" element={<Support />} /> */
}
