// // src/components/SettingsSidebar.js
// import React from "react";
// import "./SettingsSidebar.css";
// import { Link } from "react-router-dom";

// // icons
// import { CiUser, CiSettings, CiBank } from "react-icons/ci";
// import { LuBuilding } from "react-icons/lu";
// import { FaUsers, FaBarcode } from "react-icons/fa";
// import { TiPrinter } from "react-icons/ti";
// import { IoIosNotificationsOutline } from "react-icons/io";
// import { LiaStickyNoteSolid } from "react-icons/lia";
// import { PiSignature, PiContactlessPaymentLight } from "react-icons/pi";
// import {
//   IoShareSocialOutline,
//   IoNewspaperOutline,
//   IoRocketOutline,
// } from "react-icons/io5";
// import { MdOutlineSupportAgent } from "react-icons/md";

// const SettingsSidebar = ({ selected, setSelected }) => {
//   return (
//     <div className="settings-sidebar">
//       <p className="sidebar-title">Profile</p>
//       <ul className="sidebar-list">
//         <li>
//           <Link
//             to="#"
//             onClick={() => setSelected("user profile")}
//             className={`sidebar-link ${
//               selected === "user profile" ? "active" : ""
//             }`}
//           >
//             <CiUser className="sidebar-icon" /> User Profile
//           </Link>
//         </li>
//         <li>
//           <Link
//             to="#"
//             onClick={() => setSelected("company details")}
//             className={`sidebar-link ${
//               selected === "company details" ? "active" : ""
//             }`}
//           >
//             <LuBuilding className="sidebar-icon" /> Company Details
//           </Link>
//         </li>
//         <li>
//           <Link
//             to="#"
//             onClick={() => setSelected("shipping")}
//             className={`sidebar-link ${
//               selected === "shipping" ? "active" : ""
//             }`}
//           >
//             <FaUsers className="sidebar-icon" /> All Users / Roles
//           </Link>
//         </li>
//       </ul>

//       {/* General Settings  */}
//       <p className="sidebar-title">General Settings</p>
//       <ul className="sidebar-list">
//         <li>
//           <Link
//             to="#"
//             onClick={() => setSelected("profile")}
//             className={`sidebar-link ${selected === "profile" ? "active" : ""}`}
//           >
//             <CiSettings className="sidebar-icon" /> Preferences
//           </Link>
//         </li>
//         <li>
//           <Link
//             to="#"
//             onClick={() => setSelected("billing")}
//             className={`sidebar-link ${selected === "billing" ? "active" : ""}`}
//           >
//             <TiPrinter className="sidebar-icon" /> Thermal Print Settings
//           </Link>
//         </li>
//         <li>
//           <Link
//             to="#"
//             onClick={() => setSelected("shipping")}
//             className={`sidebar-link ${
//               selected === "shipping" ? "active" : ""
//             }`}
//           >
//             <FaBarcode className="sidebar-icon" /> Barcode Settings
//           </Link>
//         </li>
//         <li>
//           <Link
//             to="#"
//             onClick={() => setSelected("shipping")}
//             className={`sidebar-link ${
//               selected === "shipping" ? "active" : ""
//             }`}
//           >
//             <PiSignature className="sidebar-icon" /> Signatures
//           </Link>
//         </li>
//         <li>
//           <Link
//             to="#"
//             onClick={() => setSelected("shipping")}
//             className={`sidebar-link ${
//               selected === "shipping" ? "active" : ""
//             }`}
//           >
//             <LiaStickyNoteSolid className="sidebar-icon" /> Notes & Terms
//           </Link>
//         </li>
//         <li>
//           <Link
//             to="#"
//             onClick={() => setSelected("shipping")}
//             className={`sidebar-link ${
//               selected === "shipping" ? "active" : ""
//             }`}
//           >
//             <IoIosNotificationsOutline className="sidebar-icon" /> Auto
//             Reminders
//           </Link>
//         </li>
//       </ul>

//       {/* Banks and Payments  */}
//       <p className="sidebar-title">Banks and Payments </p>

// src/components/SubSettings/SettingsSidebar.js
import React from "react";
import "./SettingsSidebar.css";
// import { CiUser } from "react-icons/ci";

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
      {/* <h3 className="sidebar-title">Settings</h3> */}
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
          selected.includes("all-user") ? "active" : ""
        }`}
        onClick={() => navigate("all-user")}
      >
        <FaUsers className="sidebar-icon" /> All Users / Roles
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
