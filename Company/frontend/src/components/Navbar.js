// src/components/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/ui/uiSlice";
import { logout } from "../features/auth/authSlice";
import { CgProfile } from "react-icons/cg";
import { CiDark } from "react-icons/ci";
import { WiDaySunny } from "react-icons/wi";
import { IoIosNotificationsOutline } from "react-icons/io";
import "./Navbar.css";
// import ProfilePopup from "../Popup/ProfilePopup"; 
import ProfilePopup from "./Popup/ProfilePopup"; 

// import it
const Navbar = () => {
  const theme = useSelector((state) => state.ui.theme);
  const profile = useSelector((state) => state.profile.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        {profile?.company_logo && (
          <Link to="/dashboard">
            <img
              src={profile.company_logo}
              alt="Company Logo"
              className="company-logo"
            />
          </Link>
        )}
        <span className="company-name">{profile?.trade_name || "Company"}</span>
      </div>

      {/* right */}
      <div className="navbar-right">
        {/* <div className="icons">
          <CgProfile className="icons" />
        </div> */}
        <ProfilePopup />

        <div className="icons">
          <IoIosNotificationsOutline />
        </div>
        <div className="icons">
          <button
            onClick={() => dispatch(toggleTheme())}
            className="theme-toggle"
          >
            {theme === "light" ? <CiDark /> : <WiDaySunny />}
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
