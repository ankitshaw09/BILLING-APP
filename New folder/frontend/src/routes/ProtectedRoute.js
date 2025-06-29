// src/routes/ProtectedRoute.js
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
// import jwt_decode from "jwt-decode";
import { jwtDecode } from "jwt-decode";


const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    // const decoded = jwt_decode(token);
    const decoded = jwtDecode(token);

    const now = Date.now() / 1000;
    return decoded.exp < now;
  } catch (error) {
    return true;
  }
};

const ProtectedRoute = ({ children }) => {
  const { accessToken, refreshToken, user } = useSelector((state) => state.auth);

  const accessExpired = isTokenExpired(accessToken);
  const refreshExpired = isTokenExpired(refreshToken);

  if (!user || accessExpired || refreshExpired) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
