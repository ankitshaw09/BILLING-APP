import React, { useState } from "react";
import { useSelector } from "react-redux";
import { createCompany } from "../features/company/companyAPI";
import { useNavigate } from "react-router-dom";

import "./CSS/CreateCompany.css";



const CreateCompany = () => {
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.auth.accessToken);

  const [formData, setFormData] = useState({
    trade_name: "",
    proprietor_name: "",
    company_phone_no: "",
    alternate_phone_no: "",
    company_email: "",
    alternate_email: "",
    gst_number: "",
    pan_number: "",
    website: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await createCompany(formData, accessToken);
      navigate("/dashboard"); // Redirect to dashboard after success
    } catch (err) {
      setError("User only create/add  3 companies.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-company-container">
      <h2>Create New Company</h2>
      <form onSubmit={handleSubmit} className="create-company-form">
        {Object.keys(formData).map((field) => (
          <div key={field} className="form-group">
            <label>{field.replace(/_/g, " ").toUpperCase()}</label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required={["trade_name", "proprietor_name", "company_phone_no", "company_email"].includes(field)}
            />
          </div>
        ))}

        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Company"}
        </button>
      </form>
    </div>
  );
};

export default CreateCompany;
