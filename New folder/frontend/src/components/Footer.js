// src/components/Footer.js
import React from "react";
import "./Footer.css"; // optional styling

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} My Company Billing App</p>
    </footer>
  );
};

export default Footer;
