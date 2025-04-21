// import { useSelector } from "react-redux";
import React, { useState } from "react";
import "./CSS/Settings.css";
import { Link } from "react-router-dom";
import { MdOutlineSettings } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { FaFileInvoice } from "react-icons/fa"; // invoice icon

import InvoiceTemplates from "../components/Popup/InvoiceTemplates"; // adjust path if needed
import SettingsContent from "../components/SubSettings/SettingsContent";
import DocumentSettingsPopup from "../components/Popup/DocumentSettingsPopup";
import SettingsSidebar from "../components/SubSettings/SettingsSidebar"; // <-- import sidebar
import { Outlet } from "react-router-dom";
const Settings = () => {
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showDocSettings, setShowDocSettings] = useState(false);
  const [selectedSection, setSelectedSection] = useState("profile");

  return (
    <div className="settings-layout">
      <div className="settings-header">
        <div className="left">
          <Link to="/dashboard">
            <MdOutlineKeyboardArrowLeft className="licons" />
          </Link>
          <p>Settings</p>
        </div>

        <div className="right">
          <button
            className="Documents"
            onClick={() => setShowDocSettings(true)}
          >
            <MdOutlineSettings className="Sicons" />
            <p>Document Settings</p>
          </button>

          <button
            className="invoice-btn"
            onClick={() => setShowInvoiceModal(true)}
          >
            <FaFileInvoice />
            <span>Invoice Templates</span>
          </button>
        </div>

        {showInvoiceModal && (
          <InvoiceTemplates onClose={() => setShowInvoiceModal(false)} />
        )}
        {showDocSettings && (
          <DocumentSettingsPopup onClose={() => setShowDocSettings(false)} />
        )}
      </div>

      {/* SETTINGS BODY */}
      <div className="settings-body">
        {/* <SettingsSidebar
          selected={selectedSection}
          setSelected={setSelectedSection}
        />
        <SettingsContent selectedSection={selectedSection} /> */}

        <SettingsSidebar />
        <div className="settings-content">
          <Outlet /> {/* Renders nested route content */}
        </div>
      </div>
    </div>
  );
};

export default Settings;

// import React from "react";
// import "./CSS/Settings.css";
// import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
// import { MdOutlineSettings, MdOutlineKeyboardArrowLeft } from "react-icons/md";
// import { FaFileInvoice } from "react-icons/fa";
// import InvoiceTemplates from "../components/Popup/InvoiceTemplates";
// import DocumentSettingsPopup from "../components/Popup/DocumentSettingsPopup";
// import SettingsSidebar from "../components/SubSettings/SettingsSidebar";

// const Settings = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [showInvoiceModal, setShowInvoiceModal] = React.useState(false);
//   const [showDocSettings, setShowDocSettings] = React.useState(false);

//   // Optional: Redirect to /settings/user-profile on first load
//   React.useEffect(() => {
//     if (location.pathname === "/settings") {
//       navigate("user-profile", { replace: true });
//     }
//   }, [location.pathname, navigate]);

//   return (
//     <div className="settings-layout">
//       <div className="settings-header">
//         <div className="left">
//           <Link to="/dashboard">
//             <MdOutlineKeyboardArrowLeft className="licons" />
//           </Link>
//           <p>Settings</p>
//         </div>

//         <div className="right">
//           <button className="Documents" onClick={() => setShowDocSettings(true)}>
//             <MdOutlineSettings className="Sicons" />
//             <p>Document Settings</p>
//           </button>

//           <button className="invoice-btn" onClick={() => setShowInvoiceModal(true)}>
//             <FaFileInvoice />
//             <span>Invoice Templates</span>
//           </button>
//         </div>

//         {showInvoiceModal && <InvoiceTemplates onClose={() => setShowInvoiceModal(false)} />}
//         {showDocSettings && <DocumentSettingsPopup onClose={() => setShowDocSettings(false)} />}
//       </div>

//       <div className="settings-body">
//         <SettingsSidebar />
//         <div className="settings-content">
//           <Outlet /> {/* This renders user-profile, company-details etc. */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Settings;
