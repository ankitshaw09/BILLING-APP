// src/components/DocumentSettingsPopup.js
import React from "react";
import "./DocumentSettingsPopup.css";

const DocumentSettingsPopup = ({ onClose }) => {
  return (
    <div className="doc-settings-popup show">
      <div className="popup-header">
        <h3>Document Settings</h3>
        <button onClick={onClose} className="close-btn">×</button>
      </div>
      <div className="popup-body">
        <p>Add your settings here...</p>
        {/* Form or other content */}
      </div>
    </div>
  );
};

export default DocumentSettingsPopup;
