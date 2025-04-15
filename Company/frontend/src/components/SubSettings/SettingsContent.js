import "./SettingsContent.css";

import UserProfile from "./SettingsPages/UserProfile";
import ConpanyDetails from "./SettingsPages/ConpanyDetails";

const SettingsContent = ({ selectedSection }) => {
  switch (selectedSection) {
    case "user profile":
      return (
        <div className="settings-content">
          <UserProfile />
        </div>
      );

    case "company details":
      return (
        <div className="settings-content">
          <ConpanyDetails/>
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
