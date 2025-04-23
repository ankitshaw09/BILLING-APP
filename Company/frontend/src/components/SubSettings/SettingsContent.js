
// src/components/SubSettings/SettingsContent.js
import React from "react";
import UserProfile from "./SettingsPages/UserProfile";
import CompanyDetails from "./SettingsPages/CompanyDetails";
import AllCompanies from "./SettingsPages/AllCompanies"
import Preferences from "./SettingsPages/Preferences";
import Thermal from "./SettingsPages/Thermal";
import BarcodeSettings from "./SettingsPages/BarcodeSettings";
import Signatures from "./SettingsPages/Signatures";
import NotesAndTerms from "./SettingsPages/NotesAndTerms";
import AutoReminders from "./SettingsPages/AutoReminders";
import Banks from "./SettingsPages/Banks";
import PaymentGateway from "./SettingsPages/PaymentGateway";
import TallyIntegration from "./SettingsPages/TallyIntegration";
import APIIntegration from "./SettingsPages/APIIntegration";
import SocialLinks from "./SettingsPages/SocialLinks";
import Support from "./SettingsPages/Support";

const SettingsContent = ({ selectedSection }) => {
  switch (selectedSection) {
    case "user-profile":
      return (
        <div className="settings-content">
          <UserProfile />
        </div>
      );
    case "company-details":
      return (
        <div className="settings-content">
          <CompanyDetails />
        </div>
      );
    case "all-companies":
      return (
        <div className="settings-content">
          <AllCompanies />
        </div>
      );
// 
    case "preferences":
      return (
        <div className="settings-content">
          <Preferences />
        </div>
      );
    case "thermal-print":
      return (
        <div className="settings-content">
          <Thermal />
        </div>
      );
    case "barcode":
      return (
        <div className="settings-content">
          <BarcodeSettings />
        </div>
      );
    case "signature":
      return (
        <div className="settings-content">
          <Signatures />
        </div>
      );
    case "notes_terms":
      return (
        <div className="settings-content">
          <NotesAndTerms />
        </div>
      );
    case "auto-reminder":
      return (
        <div className="settings-content">
          <AutoReminders />
        </div>
      );
  //  
      case "bank":
      return (
        <div className="settings-content">
          <Banks />
        </div>
      );
    case "payment-geteway":
      return (
        <div className="settings-content">
          <PaymentGateway />
        </div>
      );
    // 
      case "tally-integration":
      return (
        <div className="settings-content">
          <TallyIntegration />
        </div>
      );
    case "api-integration":
      return (
        <div className="settings-content">
          <APIIntegration />
        </div>
      );
    case "social-links":
      return (
        <div className="settings-content">
          <SocialLinks />
        </div>
      );
    case "support":
      return (
        <div className="settings-content">
          <Support />
        </div>
      );

    // add more sections as needed
    default:
      return <div className="settings-content">  <UserProfile /></div>;
  }
};

export default SettingsContent;
