import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import "../NavbarPopup/profilepop.css";
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

import { logoutUser } from "../../features/auth/authAPI";

import SwitchCompanyModal from "../SwitchCompanyModal";
const ProfilePopup = () => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef();

  const companyProfile = useSelector((state) => state.company.companyProfile);

  const { companies, selectedCompanyId } = useSelector(
    (state) => state.company
  );
  const selectedCompany = companies.find(
    (company) => company.id === selectedCompanyId
  );
  const initials = getInitials(selectedCompany?.proprietor_name);

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



  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [showModal, setShowModal] = useState(false);
  return (
    <div className="profile-wrapper" ref={wrapperRef}>

          <div className="icons" onClick={() => setOpen(!open)}>
            <CgProfile size={24} style={{ cursor: "pointer" }} />
          </div>

          {open && (
            <div className="profile-popup">
              <div className="popup-header">
                <div className="avatar">{initials}</div>

                <span className="proprietor-name">
                  Hello {selectedCompany?.proprietor_name || "Owner"}
                </span>
              </div>
              <div className="user-summary">
                <div className="user-row">
                  <span className="label">Phone:</span>
                  <span className="value">
                    {selectedCompany?.company_phone_no || "phone No."}{" "}
                  </span>
                </div>
                <div className="user-row">
                  <span className="label">Email:</span>
                  <span className="value">
                    {selectedCompany?.company_email || "email"}
                  </span>
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
                    {selectedCompany?.billing_address?.state || "state"}
                  </span>
                </div>
              </div>

              <div className="popup-lists">
                {/* <div className="list"> */}

                <span className="list" onClick={() => setShowModal(true)}>
                  <IoMdSwitch className="icons-list" /> Switch Company
                </span>

                <Link to="/settings/company-details" className="list">
                  <CgProfile className="icons-list" /> View Profile
                </Link>

                <Link to="/settings" className="list">
                  <CiSettings className="icons-list" /> Settings
                </Link>

                <Link to="/settings" className="list">
                  <BiSupport className="icons-list" /> Help & Supports
                </Link>

                <button
                  onClick={handleLogout}
                  className="logout-btn-p"
                  // className="list"
                >
                  <IoIosLogOut className="icons-list" /> Logout
                </button>
              </div>

              {showModal && (
                <SwitchCompanyModal onClose={() => setShowModal(false)} />
              )}
            </div>
          )}

    </div>
  );
};

export default ProfilePopup;
