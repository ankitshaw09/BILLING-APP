import { useSelector, useDispatch } from "react-redux";
// import axios from "../api/axios";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../features/auth/authAPI";
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

  return (
    <div>
      <h2>Welcome, {user?.name}</h2>
      <p>Email: {user?.email}</p>
      <p>phone no : {user?.phone_number}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
