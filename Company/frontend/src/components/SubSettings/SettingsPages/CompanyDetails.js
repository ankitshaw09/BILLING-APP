import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCompanyDetails,
  updateCompany,
  deleteCompany,
} from "../../../features/company/companyAPI";
import {
  setCompanyProfile,
  updateCurrentCompanyProfile,
} from "../../../features/company/companySlice";
import "./CompanyDetails.css";
import { GiSevenPointedStar } from "react-icons/gi";


import CompanyAddress from '../../Address/companyaddress';
import BillingAddress from '../../Address/billingaddress';
import ShippingAddress from '../../Address/shippingaddress';


const CompanyDetails = () => {
  const dispatch = useDispatch();
  const { currentCompany } = useSelector((state) => state.company);

  const [companyData, setCompanyData] = useState({
    logo: "",
    country: "",
    tradeName: "",
    proprietorName: "",
    phoneNumber: "",
    email: "",
    gstNumber: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showLogoModal, setShowLogoModal] = useState(false);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      if (currentCompany?.id) {
        setLoading(true);
        setError("");
        try {
          const accessToken = localStorage.getItem("accessToken");
          const data = await getCompanyDetails(currentCompany.id, accessToken);
          setCompanyData({
            logo: data.company_logo || "",
            country: data.country || "",
            tradeName: data.trade_name || "",
            proprietorName: data.proprietor_name || "",
            phoneNumber: data.company_phone_no || "",
            AltphoneNumber: data.alternate_phone_no || "",
            email: data.company_email || "",
            Altemail: data.alternate_email || "",

            gstNumber: data.gst_number || "",
            panNumber: data.pan_number || "",
            website: data.website || "",
            address: data.address_line1 || "",
          });
          dispatch(setCompanyProfile(data));
        } catch (err) {
          setError("Failed to fetch company details.");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchCompanyDetails();
  }, [currentCompany?.id, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];

    // Check if the user didn't select any file (i.e., "remove logo" action)
    if (!file) {
      setCompanyData((prev) => ({ ...prev, logo: "" })); // Reset logo to empty
      setShowLogoModal(false); // Close the modal
      return;
    }

    // If the user selected a file, update the logo
    setCompanyData((prev) => ({ ...prev, logo: file }));
    setShowLogoModal(false); // Close the modal
  };

  const handleLogoDelete = () => {
    setCompanyData((prev) => ({ ...prev, logo: null }));
    setShowLogoModal(false);

    // Clear file input manually
    const input = document.getElementById("logo");
    if (input) {
      input.value = "";
    }
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const accessToken = localStorage.getItem("accessToken");

      const formData = new FormData();
      if (companyData.logo instanceof File) {
        formData.append("company_logo", companyData.logo); // backend field name
      } else if (companyData.logo === null) {
        // signal deletion to backend — you can also use a custom field if needed
        formData.append("company_logo", ""); // backend should interpret this as remove
      }

      formData.append("country", companyData.country);
      formData.append("trade_name", companyData.tradeName);
      formData.append("proprietor_name", companyData.proprietorName);
      formData.append("company_phone_no", companyData.phoneNumber);
      formData.append("alternate_phone_no", companyData.AltphoneNumber);
      formData.append("company_email", companyData.email);
      formData.append("alternate_email", companyData.Altemail);
      formData.append("gst_number", companyData.gstNumber);
      formData.append("pan_number", companyData.panNumber);
      formData.append("address_line1", companyData.address);
      formData.append("website", companyData.website);

      const updatedData = await updateCompany(
        currentCompany.id,
        formData,
        accessToken
      );
      dispatch(updateCurrentCompanyProfile(updatedData));
      alert("Company details updated successfully!");
    } catch (err) {
      console.error("Update error:", err.response?.data || err.message);
      setError("Failed to update company details.");
    } finally {
      setLoading(false);
    }
  };

  // Delete company handler
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      try {
        const accessToken = localStorage.getItem("accessToken");
        await deleteCompany(currentCompany.id, accessToken);
        alert("Company deleted successfully.");
      } catch {
        setError("Failed to delete company.");
      }
    }
  };

  // Logo preview URL (for modal)
  const logoPreview =
    typeof companyData.logo === "string"
      ? companyData.logo
      : companyData.logo instanceof File
      ? URL.createObjectURL(companyData.logo)
      : "";

  // Cleanup object URL if logo is a File or when the component unmounts
  useEffect(() => {
    return () => {
      if (
        typeof companyData.logo === "object" &&
        companyData.logo instanceof File
      ) {
        URL.revokeObjectURL(logoPreview);
      }
    };
  }, [companyData.logo]);

  return (
    <div className="company-details">
      <h2>Company Profile</h2>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit} className="company-form">
        {/* logo */}
        <div className="form-row ">
          <label htmlFor="logo">Company Logo : </label>
          <div className="form-logo">
            <div
              className="logo-preview-box"
              onClick={() => companyData.logo && setShowLogoModal(true)}
            >
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Logo"
                  className="logo-preview-img"
                />
              ) : (
                <span className="logo-placeholder">logo</span>
              )}
            </div>
            <input
              type="file"
              id="logo"
              name="logo"
              accept="image/*"
              onChange={handleLogoChange}
            />
          </div>
        </div>
        {/* country  */}
        <div className="form-row">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            value={companyData.country}
            onChange={handleChange}
          />
        </div>
        {/* trade name  */}
        <div className="form-row">
          <label htmlFor="tradeName">
            <p>*</p>Trade Name:
          </label>
          <input
            type="text"
            id="tradeName"
            name="tradeName"
            value={companyData.tradeName}
            onChange={handleChange}
          />
        </div>
        {/*  propriter name */}
        <div className="form-row">
          <label htmlFor="proprietorName">
            <p>*</p>Proprietor Name :{" "}
          </label>
          <input
            type="text"
            id="proprietorName"
            name="proprietorName"
            value={companyData.proprietorName}
            onChange={handleChange}
          />
        </div>
        {/* company phone number */}
        <div className="form-row">
          <label htmlFor="phoneNumber">
            <p>*</p>Phone Number :{" "}
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={companyData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        {/* Alternative Phone Number */}
        <div className="form-row">
          <label htmlFor="AltphoneNumber">Alternative Phone Number : </label>
          <input
            type="text"
            id="AltphoneNumber"
            name="AltphoneNumber"
            value={companyData.AltphoneNumber}
            onChange={handleChange}
          />
        </div>
        {/*  Email  */}
        <div className="form-row">
          <label htmlFor="email">
            <p>*</p> Email :{" "}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={companyData.email}
            onChange={handleChange}
          />
        </div>
        {/* Alternative Email */}
        <div className="form-row">
          <label htmlFor="email">Alternative Email : </label>
          <input
            type="email"
            id="email"
            name="email"
            value={companyData.Altemail}
            onChange={handleChange}
          />
        </div>
        {/* GST Number */}
        <div className="form-row">
          <label htmlFor="gstNumber">GST Number : </label>
          <input
            type="text"
            id="gstNumber"
            name="gstNumber"
            value={companyData.gstNumber}
            onChange={handleChange}
          />
        </div>
        {/* PAN Number */}
        <div className="form-row">
          <label htmlFor="panNumber">PAN Number : </label>
          <input
            type="text"
            id="panNumber"
            name="panNumber"
            value={companyData.panNumber}
            onChange={handleChange}
          />
        </div>
        {/* Website  */}
        <div className="form-row">
          <label htmlFor="website">Website : </label>
          <input
            type="text"
            id="website"
            name="website"
            value={companyData.website}
            onChange={handleChange}
          />
        </div>



        <div className="form-row">
          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Updating..." : "Save & Update"}
          </button>
        </div>
      </form>




      {/* Modal for full-size logo */}
      {showLogoModal && (
        <div className="logo-modal-overlay">
          <div className="logo-modal-content">
            <img src={logoPreview} alt="Full Logo" className="full-logo" />
            <div className="modal-actions">
              <button onClick={handleLogoDelete}>🗑️</button>
              <label>
                📤
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  style={{ display: "none" }}
                />
              </label>
              <button onClick={() => setShowLogoModal(false)}>❌</button>
            </div>
          </div>
        </div>
      )}


{/* address */}


<div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      <div style={{ flex: '1 1 30%' }}>
        <CompanyAddress />
      </div>
      <div style={{ flex: '1 1 30%' }}>
        <BillingAddress />
      </div>
      <div style={{ flex: '1 1 30%' }}>
        <ShippingAddress />
      </div>
    </div>



    </div>
  );
};

export default CompanyDetails;
