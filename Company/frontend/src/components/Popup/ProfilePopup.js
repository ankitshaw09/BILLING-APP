import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import "./profilepop.css";
// import { getInitials } from "../pages/utils/getInitials";
import { getInitials } from "../../pages/utils/getInitials";
// import { useSelector } from "react-redux";
import { IoMdSwitch } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { BiSupport } from "react-icons/bi";
// import { logout } from "../features/auth/authSlice";
import { logout } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
const ProfilePopup = () => {
  const [open, setOpen] = useState(false);
  // const theme = useSelector((state) => state.ui.theme);
  const wrapperRef = useRef();
  const profile = useSelector((state) => state.profile.profile);
  const initials = getInitials(profile?.proprietor_name);
  // const profile = useSelector((state) => state.profile.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="profile-wrapper" ref={wrapperRef}>
      <div className="icons" onClick={() => setOpen(!open)}>
        <CgProfile size={24} style={{ cursor: "pointer" }} />
      </div>

      {open && (
        <div className="profile-popup">
          <div className="popup-header">
            <div className="avatar">{initials}</div>

            {/* <span className="ptrade-name">
                {profile?.trade_name || "Company"}
              </span> */}
            <span className="proprietor-name">
              Hello {profile?.proprietor_name || "Owner"}
            </span>
          </div>
          <div className="user-summary">
            <div className="user-row">
              <span className="label">Phone:</span>
              <span className="value">
                {profile?.company_phone || "phone No."}{" "}
              </span>
            </div>
            <div className="user-row">
              <span className="label">Email:</span>
              <span className="value">{profile?.email || "email"}</span>
            </div>
            {/* <div className="user-row">
              <span className="label">Plan Validity:</span>
              <span className="value">19 Mar 2026</span>
            </div> */}
            <div className="user-row">
              <span className="label">Role:</span>
              <span className="value">admin</span>
            </div>
            <div className="user-row">
              <span className="label">State:</span>
              <span className="value">
                {profile?.billing_address?.state || "state"}
              </span>
            </div>
          </div>

          <div className="popup-lists">
            {/* <div className="list"> */}
            <Link to="/profile" className="list">
              <IoMdSwitch className="icons-list" /> Switch Company
            </Link>

            <Link to="/profile" className="list">
              <CgProfile className="icons-list" /> View Profile
            </Link>

            <Link to="/settings" className="list">
              <CiSettings className="icons-list" /> Settings
            </Link>

            <Link to="/settings" className="list">
              <BiSupport className="icons-list" /> Help & Supports
            </Link>

            <button onClick={handleLogout} 
            className="logout-btn-p"
            // className="list"
            >
              <IoIosLogOut className="icons-list" /> Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePopup;
