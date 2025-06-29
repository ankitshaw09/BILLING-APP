// src/components/Navbar.js
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/ui/uiSlice";

import { CiDark } from "react-icons/ci";
import { WiDaySunny } from "react-icons/wi";
import { IoIosNotificationsOutline } from "react-icons/io";
import "./Navbar.css";
import { IoIosAddCircleOutline } from "react-icons/io";
import ProfilePopup from "./NavbarPopup/ProfilePopup";
import { FaEdit } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";
// import it
import { FaArrowRightLong } from "react-icons/fa6";
const Navbar = () => {
  const theme = useSelector((state) => state.ui.theme);

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  const togglePopup = () => setShowPopup((prev) => !prev);

  // Close popup if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { companies, selectedCompanyId } = useSelector(
    (state) => state.company
  );
  const selectedCompany = companies.find(
    (company) => company.id === selectedCompanyId
  );

  return (
    <nav className="navbar">
      {/* {selectedCompany ? ( */}
        <div className="navbar-left">
          <Link to="/dashboard">
            {selectedCompany?.company_logo ? (
              <img
                src={selectedCompany.company_logo}
                alt="Company Logo"
                className="company-logo"
              />
            ) : (
              <div className="company-logo-fallback">Logo</div>
            )}
          </Link>
          {/* Trade name + popup trigger */}
          <span className="company-name" onClick={togglePopup}>
            {selectedCompany?.trade_name || "Company"}
          </span>

          {/* Popup just below */}
          {showPopup && (
            <div className="company-popup" ref={popupRef}>
              <div className="names">
                <span className="popup-trade-name" onClick={togglePopup}>
                  {selectedCompany?.trade_name || "Company"}
                </span>
                <span className="owner-name" onClick={togglePopup}>
                  {selectedCompany?.proprietor_name || "Company"}
                </span>
              </div>

              {/* <div> */}
              <div className="popup-icons">
                <Link to="/settings/company-details" className="popup-edit">
                  <FaEdit /> Edit
                </Link>
                <Link to="/dashboard" className="popup-share">
                  <CiShare2 /> Share
                </Link>
              </div>
              <hr />
              <Link to="/create-company" className="popup-add-co">
                <IoIosAddCircleOutline className="add" tyle={{ marginRight: "8px" }} />
                Add New Company
                <FaArrowRightLong className = "right-arrow"  />
              </Link>
            </div>
          )}
        </div>
      {/* ) : (
        <p>No company selected.</p>
      )} */}

      {/* right */}
      <div className="navbar-right">
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
