// import { useSelector } from "react-redux";
import React, { useState } from "react";
import "./CSS/Settings.css";
import { Link } from "react-router-dom";
import { MdOutlineSettings } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { FaFileInvoice } from "react-icons/fa"; // invoice icon
import InvoiceTemplates from "../Popup/InvoiceTemplates"; // adjust path if needed
import SettingsContent from "../components/SubSettings/SettingsContent";

import DocumentSettingsPopup from "../Popup/DocumentSettingsPopup"; // adjust the path
import SettingsSidebar from "../components/SubSettings/SettingsSidebar"; // <-- import sidebar
const Settings = () => {
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showDocSettings, setShowDocSettings] = useState(false);
  const [selectedSection, setSelectedSection] = useState("profile");
  // const [activeTab, setActiveTab] = useState("profile"); // <-- track tab




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
        <SettingsSidebar selected={selectedSection} setSelected={setSelectedSection} />
        <SettingsContent selectedSection={selectedSection} />
      </div>


    </div>
  );
};

export default Settings;
