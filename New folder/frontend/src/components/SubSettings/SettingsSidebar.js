import React from "react";
import "./SettingsSidebar.css";

import { useLocation, useNavigate } from "react-router-dom";
import { CiUser, CiSettings, CiBank } from "react-icons/ci";
import { LuBuilding } from "react-icons/lu";
import { FaUsers, FaBarcode } from "react-icons/fa";
import { TiPrinter } from "react-icons/ti";
import { IoIosNotificationsOutline } from "react-icons/io";
import { LiaStickyNoteSolid } from "react-icons/lia";
import { PiSignature, PiContactlessPaymentLight } from "react-icons/pi";
import {
  IoShareSocialOutline,
  IoNewspaperOutline,
  IoRocketOutline,
} from "react-icons/io5";
import { MdOutlineSupportAgent } from "react-icons/md";
import { FaRegBuilding } from "react-icons/fa6";

const SettingsSidebar = ({}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const selected = location.pathname;
  return (
    <div className="settings-sidebar">

      {/* Profile settings  */}
      <p className="sidebar-title">Profile</p>
      <div
        className={`sidebar-link ${
          selected.includes("user-profile") ? "active" : ""
        }`}
        onClick={() => navigate("user-profile")}
      >
        <CiUser className="sidebar-icon" />
        User Profile
      </div>

      <div
        className={`sidebar-link ${
          selected.includes("company-details") ? "active" : ""
        }`}
        onClick={() => navigate("company-details")}
      >
        <FaRegBuilding className="sidebar-icon" />
        Company Details
      </div>

      <div
        className={`sidebar-link ${
          selected.includes("all-companies") ? "active" : ""
        }`}
        onClick={() => navigate("all-companies")}
      >
        <FaUsers className="sidebar-icon" /> Companies
      </div>

      {/* General Settings  */}

      <p className="sidebar-title">General Settings</p>
      <div
        className={`sidebar-link ${
          selected.includes("preferences") ? "active" : ""
        }`}
        onClick={() => navigate("preferences")}
      >
        <CiSettings className="sidebar-icon" /> Preferences
      </div>

      <div
        className={`sidebar-link ${
          selected.includes("thermal-print") ? "active" : ""
        }`}
        onClick={() => navigate("thermal-print")}
      >
        <TiPrinter className="sidebar-icon" /> Thermal Print Setting
      </div>

      <div
        className={`sidebar-link ${
          selected.includes("barcode") ? "active" : ""
        }`}
        onClick={() => navigate("barcode")}
      >
        <FaBarcode className="sidebar-icon" /> Barcode Settings
      </div>

      <div
        className={`sidebar-link ${
          selected.includes("signature") ? "active" : ""
        }`}
        onClick={() => navigate("signature")}
      >
        <PiSignature className="sidebar-icon" /> Signatures
      </div>

      <div
        className={`sidebar-link ${
          selected.includes("notes_terms") ? "active" : ""
        }`}
        onClick={() => navigate("notes_terms")}
      >
        <LiaStickyNoteSolid className="sidebar-icon" /> Notes & Terms
      </div>

      <div
        className={`sidebar-link ${
          selected.includes("auto-reminder") ? "active" : ""
        }`}
        onClick={() => navigate("auto-reminder")}
      >
        <IoIosNotificationsOutline className="sidebar-icon" /> Auto Reminders
      </div>

      {/* Banks and Payments  */}
      <p className="sidebar-title">Banks and Payments </p>

      <div
        className={`sidebar-link ${selected.includes("bank") ? "active" : ""}`}
        onClick={() => navigate("bank")}
      >
        <CiBank className="sidebar-icon" /> Banks
      </div>

      <div
        className={`sidebar-link ${
          selected.includes("payment-geteway") ? "active" : ""
        }`}
        onClick={() => navigate("payment-geteway")}
      >
        <PiContactlessPaymentLight className="sidebar-icon" /> Payment Gateway
      </div>

      {/* Integrations */}
      <p className="sidebar-title"> Integrations</p>

      <div
        className={`sidebar-link ${
          selected.includes("tally-integration") ? "active" : ""
        }`}
        onClick={() => navigate("tally-integration")}
      >
        <IoNewspaperOutline className="sidebar-icon" /> Tally Integration
      </div>
      <div
        className={`sidebar-link ${
          selected.includes("api-integration") ? "active" : ""
        }`}
        onClick={() => navigate("api-integration")}
      >
        <IoRocketOutline className="sidebar-icon" /> API Integration
      </div>

      {/* Others */}
      <p className="sidebar-title">Others</p>
      <div
        className={`sidebar-link ${
          selected.includes("social-links") ? "active" : ""
        }`}
        onClick={() => navigate("social-links")}
      >
        <IoShareSocialOutline className="sidebar-icon" /> Social Links
      </div>
      <div
        className={`sidebar-link ${
          selected.includes("support") ? "active" : ""
        }`}
        onClick={() => navigate("support")}
      >
        <MdOutlineSupportAgent className="sidebar-icon" /> Support
      </div>
    </div>
  );
};

export default SettingsSidebar;
