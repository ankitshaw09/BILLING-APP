import React from "react";
import "./InvoiceTemplates.css"; // create this if you haven't already

const InvoiceTemplates = ({ onClose }) => {
  return (
    <div className="invoice-modal">
      <div className="invoice-content">
        <h2>Invoice Preview / Form</h2>
        <p>You can add form or preview here...</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default InvoiceTemplates;
