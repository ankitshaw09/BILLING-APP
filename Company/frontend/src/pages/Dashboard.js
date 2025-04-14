import { useSelector, useDispatch } from "react-redux";
// import axios from "../api/axios";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Dispatch logout action to clear Redux state and localStorage
    dispatch(logout());
    
    // Navigate to the login page (or root if you want)
    navigate("/login");
  };

  

  return (
    <div>
      <h2>Welcome, {user?.name}</h2>
      <p>Email: {user?.email}</p>
      <p>phone no : {user?.phone_number}</p>
      <button onClick={handleLogout}>Logout</button>
      <h2>Welcome, {user?.name}</h2>
      <p>Email: {user?.email}</p>
      <p>phone no : {user?.phone_number}</p>
      <button onClick={handleLogout}>Logout</button>
      <h2>Welcome, {user?.name}</h2>
      <p>Email: {user?.email}</p>
      <p>phone no : {user?.phone_number}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
