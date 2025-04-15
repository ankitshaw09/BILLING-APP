// src/components/SettingsSidebar.js
import React from "react";
import "./SettingsSidebar.css";
import { Link } from "react-router-dom";

// icons 
import { CiUser, CiSettings,CiBank } from "react-icons/ci";
import { LuBuilding } from "react-icons/lu";
import { FaUsers , FaBarcode} from "react-icons/fa";
import { TiPrinter } from "react-icons/ti";
import { IoIosNotificationsOutline } from "react-icons/io";
import { LiaStickyNoteSolid } from "react-icons/lia";
import { PiSignature,PiContactlessPaymentLight } from "react-icons/pi";
import { IoShareSocialOutline,IoNewspaperOutline,IoRocketOutline } from "react-icons/io5";
import { MdOutlineSupportAgent } from "react-icons/md";
 
const SettingsSidebar = ({ selected, setSelected }) => {
  return (
    <div className="settings-sidebar">
      <p className="sidebar-title">Profile</p>
      <ul className="sidebar-list">
        <li>
          <Link
            to="#"
            onClick={() => setSelected("user profile")}
            className={`sidebar-link ${selected === "user profile" ? "active" : ""}`}
          >
            <CiUser className="sidebar-icon" /> User Profile
          </Link>
        </li>
        <li>
          <Link
            to="#"
            onClick={() => setSelected("billing")}
            className={`sidebar-link ${selected === "billing" ? "active" : ""}`}
          >
            <LuBuilding className="sidebar-icon" /> Company Details
          </Link>
        </li>
        <li>
          <Link
            to="#"
            onClick={() => setSelected("shipping")}
            className={`sidebar-link ${
              selected === "shipping" ? "active" : ""
            }`}
          >
            <FaUsers className="sidebar-icon" /> All Users / Roles
          </Link>
        </li>
      </ul>

      {/* General Settings  */}
      <p className="sidebar-title">General Settings</p>
      <ul className="sidebar-list">
        <li>
          <Link
            to="#"
            onClick={() => setSelected("profile")}
            className={`sidebar-link ${selected === "profile" ? "active" : ""}`}
          >
            <CiSettings className="sidebar-icon" /> Preferences
          </Link>
        </li>
        <li>
          <Link
            to="#"
            onClick={() => setSelected("billing")}
            className={`sidebar-link ${selected === "billing" ? "active" : ""}`}
          >
            <TiPrinter className="sidebar-icon" /> Thermal Print Settings
          </Link>
        </li>
        <li>
          <Link
            to="#"
            onClick={() => setSelected("shipping")}
            className={`sidebar-link ${
              selected === "shipping" ? "active" : ""
            }`}
          >
            <FaBarcode className="sidebar-icon" /> Barcode Settings
          </Link>
        </li>
        <li>
          <Link
            to="#"
            onClick={() => setSelected("shipping")}
            className={`sidebar-link ${
              selected === "shipping" ? "active" : ""
            }`}
          >
            <PiSignature className="sidebar-icon" /> Signatures
          </Link>
        </li>
        <li>
          <Link
            to="#"
            onClick={() => setSelected("shipping")}
            className={`sidebar-link ${
              selected === "shipping" ? "active" : ""
            }`}
          >
            <LiaStickyNoteSolid className="sidebar-icon" /> Notes & Terms
          </Link>
        </li>
        <li>
          <Link
            to="#"
            onClick={() => setSelected("shipping")}
            className={`sidebar-link ${
              selected === "shipping" ? "active" : ""
            }`}
          >
            <IoIosNotificationsOutline className="sidebar-icon" /> Auto
            Reminders
          </Link>
        </li>
      </ul>

      {/* Banks and Payments  */}
      <p className="sidebar-title">Banks and Payments </p>
      <ul className="sidebar-list">
        <li>
          <Link
            to="#"
            onClick={() => setSelected("profile")}
            className={`sidebar-link ${selected === "profile" ? "active" : ""}`}
          >
            <CiBank className="sidebar-icon" /> Banks
          </Link>
        </li>
        <li>
          <Link
            to="#"
            onClick={() => setSelected("billing")}
            className={`sidebar-link ${selected === "billing" ? "active" : ""}`}
          >
            <PiContactlessPaymentLight className="sidebar-icon" /> Payment
            Gateway
          </Link>
        </li>
      </ul>
      {/* Integrations */}
      <p className="sidebar-title"> Integrations</p>
      <ul className="sidebar-list">
        <li>
          <Link
            to="#"
            onClick={() => setSelected("profile")}
            className={`sidebar-link ${selected === "profile" ? "active" : ""}`}
          >
            <IoNewspaperOutline className="sidebar-icon" /> Tally Integration
          </Link>
        </li>
        <li>
          <Link
            to="#"
            onClick={() => setSelected("billing")}
            className={`sidebar-link ${selected === "billing" ? "active" : ""}`}
          >
            <IoRocketOutline className="sidebar-icon" /> API Integration
          </Link>
        </li>
      </ul>
      {/* Others */}
      <p className="sidebar-title">Others</p>
      <ul className="sidebar-list">
        <li>
          <Link
            to="#"
            onClick={() => setSelected("profile")}
            className={`sidebar-link ${selected === "profile" ? "active" : ""}`}
          >
            <IoShareSocialOutline className="sidebar-icon" /> Social Links
          </Link>
        </li>
        <li>
          <Link
            to="#"
            onClick={() => setSelected("billing")}
            className={`sidebar-link ${selected === "billing" ? "active" : ""}`}
          >
            <MdOutlineSupportAgent className="sidebar-icon" /> Support
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SettingsSidebar;
