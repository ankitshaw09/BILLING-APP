import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../features/auth/authAPI";

import "./Dashboard.css"; // Custom CSS for Dashboard

import { getCompanyList } from "../features/company/companyAPI";
import { setCompanies} from "../features/company/companySlice";


const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { refreshToken } = useSelector((state) => state.auth);

const handleLogout = async () => {
    try {
      if (refreshToken) {
        await logoutUser(refreshToken);
      } else {
        console.warn("No refresh token available for logout.");
      }
    } catch (err) {
      console.error("Logout API error:", err?.response?.data || err.message);
    }

    dispatch(logout());
    navigate("/login");
  };



  const accessToken = useSelector((state) => state.auth.accessToken);
  // const companies = useSelector((state) => state.company.companies);
  // const currentCompany = useSelector((state) => state.company.currentCompany);

  // Fetch all companies on page load
  useEffect(() => {
    const fetchCompanies = async () => {
      const response = await getCompanyList(accessToken);
      dispatch(setCompanies(response));
    };

    fetchCompanies();
  }, [dispatch, accessToken]);

  // Handle company selection



  const { companies, selectedCompanyId } = useSelector((state) => state.company);
  const selectedCompany = companies.find((company) => company.id === selectedCompanyId);

  return (
    <div>
      <h2>Welcome, {user?.name}</h2>
      <p>Email: {user?.email}</p>
      <p>Phone no: {user?.phone_number}</p>
      <button onClick={handleLogout}>Logout</button>



    <div style={{ padding: "2rem" }}>
      <h1>Dashboard</h1>

      {selectedCompany ? (
        <div className="selected-company-card" style={{
          border: "1px solid #ddd",
          padding: "1rem",
          borderRadius: "8px",
          marginTop: "1rem",
          background: "#f9f9f9"
        }}>
          <h2>Selected Company:</h2>
          <p><strong>Trade Name:</strong> {selectedCompany.trade_name}</p>
          <p><strong>Proprietor Name:</strong> {selectedCompany.proprietor_name}</p>
        </div>
      ) : (
        <p>No company selected.</p>
      )}
    </div>
    <div style={{ padding: "2rem" }}>
      <h1>Dashboard</h1>

      {selectedCompany ? (
        <div className="selected-company-card" style={{
          border: "1px solid #ddd",
          padding: "1rem",
          borderRadius: "8px",
          marginTop: "1rem",
          background: "#f9f9f9"  
        }}>
          <h2>Selected Company:</h2>
          <p><strong>Trade Name:</strong> {selectedCompany.trade_name}</p>
          <p><strong>Proprietor Name:</strong> {selectedCompany.proprietor_name}</p>
        </div>
      ) : (
        <p>No company selected.</p>
      )}
    </div>
    <div style={{ padding: "2rem" }}>
      <h1>Dashboard</h1>

      {selectedCompany ? (
        <div className="selected-company-card" style={{
          border: "1px solid #ddd",
          padding: "1rem",
          borderRadius: "8px",
          marginTop: "1rem",
          background: "#f9f9f9"
        }}>
          <h2>Selected Company:</h2>
          <p><strong>Trade Name:</strong> {selectedCompany.trade_name}</p>
          <p><strong>Proprietor Name:</strong> {selectedCompany.proprietor_name}</p>
        </div>
      ) : (
        <p>No company selected.</p>
      )}
    </div>

    </div>
  );
};

export default Dashboard;
