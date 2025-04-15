import "./SettingsContent.css";

import UserProfile from "./SettingsPages/UserProfile";

const SettingsContent = ({ selectedSection }) => {
  switch (selectedSection) {
    case "user profile":
      return (
        <div className="settings-content">
          <UserProfile />
        </div>
      );

    case "company":
      return (
        <div className="settings-content">
          <h2>Company Details Coming Soon</h2>
        </div>
      );
    case "invoices":
      return (
        <div className="settings-content">
          <h2>Invoice Settings</h2>
          <p>This is where invoice settings will go.</p>
        </div>
      );
    default:
      return (
        <div className="settings-content">
          <UserProfile />
        </div>
      );
  }
};

export default SettingsContent;
