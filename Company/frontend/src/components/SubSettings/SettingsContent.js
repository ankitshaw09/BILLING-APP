import "./SettingsContent.css";

import UserProfile from "./SettingsPages/UserProfile";
import CompanyDetails from "./SettingsPages/CompanyDetails";

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
          <CompanyDetails/>
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
