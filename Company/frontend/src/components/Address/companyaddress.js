import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getCompanyAddress,
  createCompanyAddress,
  updateCompanyAddress,
} from "../../features/company/companyAPI";
import "./address.css";

import { toast } from "react-toastify";

const CompanyAddress = () => {
  const companyId = useSelector((state) => state.company.selectedCompanyId);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const companyName = useSelector((state) => state.company.selectedCompanyName);

  const [formData, setFormData] = useState({
    name: "",
    address_line_1: "",
    address_line_2: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
  });
  const [addressId, setAddressId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addressExists, setAddressExists] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const fetchLocationFromPincode = async (pincode) => {
    const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
    const data = await res.json();
    if (data[0].Status === "Success") {
      const { District, State, Country } = data[0].PostOffice[0];
      return {
        city: District,
        state: State,
        country: Country,
      };
    } else {
      throw new Error("Invalid pincode");
    }
  };

  useEffect(() => {
    const fetchAddress = async () => {
      if (!companyId || !accessToken) return;

      setLoading(true);
      try {
        const res = await getCompanyAddress(companyId, accessToken);
        if (Array.isArray(res) && res.length > 0) {
          setFormData(res[0]);
          setAddressId(res[0].id);
          setAddressExists(true);
        } else {
          setAddressExists(false);
        }
      } catch (err) {
        console.error("Error fetching company address:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAddress();
  }, [companyId, accessToken]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (addressId) {
        await updateCompanyAddress(companyId, addressId, formData, accessToken);
        toast.success("Company address updated!");
      } else {
        const created = await createCompanyAddress(
          companyId,
          formData,
          accessToken
        );
        setAddressId(created.id);
        setAddressExists(true);
        toast.success("Company address created!");
      }
      setDrawerOpen(false);
    } catch (err) {
      console.error("Error saving address:", err);
      toast.error("Something went wrong!");
    }
  };

  if (loading) return <div>Loading Company Address...</div>;

  return (
    <div className="address-main">
      <div className="address-summary">
        <h3>Company Address</h3>
        {addressExists ? (
          <div className="company-address">
            <p> {formData.name}</p>
            <p>
              {formData.address_line_1}, {formData.address_line_2}
            </p>
            <p>
              {formData.city}, {formData.state}, {formData.country}
            </p>
            <p>Pincode: {formData.pincode}</p>

            <button
              className="address-edit-btn"
              onClick={() => setDrawerOpen(true)}
            >
              Edit
            </button>
          </div>
        ) : (
          <>
            <p>No company address found.</p>
            <button onClick={() => setDrawerOpen(true)}>Create Address</button>
          </>
        )}
      </div>

      {/* Blur background and block interaction */}
      {drawerOpen && (
        <div className="drawer-overlay" onClick={() => setDrawerOpen(false)} />
      )}
      {/* Popup Drawer */}
      <div className={`drawer ${drawerOpen ? "open" : ""}`}>
        <div className="drawer-header">
          <h3>
            {addressExists ? "Edit Company Address" : "Create Company Address"}
          </h3>

          <button className="close-btn" onClick={() => setDrawerOpen(false)}>
            ✖
          </button>
        </div>
        <form className="address-form" onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Location Name"
              onChange={handleChange}
            />
          </label>

          <label>
            Address Line 1:
            <input
              type="text"
              name="address_line_1"
              value={formData.address_line_1}
              placeholder="Address Line 1"
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Address Line 2:
            <input
              type="text"
              name="address_line_2"
              value={formData.address_line_2}
              placeholder="Address Line 2"
              onChange={handleChange}
            />
          </label>

          <div className="pincode-row">
            <label>
              Pincode:
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                placeholder="Pincode"
                onChange={handleChange}
                required
              />
            </label>
            <button
              type="button"
              className="fetch-btn"
              onClick={async () => {
                try {
                  const { city, state, country } =
                    await fetchLocationFromPincode(formData.pincode);
                  setFormData((prev) => ({
                    ...prev,
                    city,
                    state,
                    country,
                  }));
                  toast.success("Location details fetched!");
                } catch (err) {
                  console.error(err);
                  toast.error("Failed to fetch location. Check pincode.");
                }
              }}
            >
              Fetch
            </button>
          </div>

          <label>
            City:
            <input
              type="text"
              name="city"
              value={formData.city}
              placeholder="City"
              onChange={handleChange}
            />
          </label>

          <label>
            State:
            <input
              type="text"
              name="state"
              value={formData.state}
              placeholder="State"
              onChange={handleChange}
            />
          </label>

          <label>
            Country:
            <input
              type="text"
              name="country"
              value={formData.country}
              placeholder="Country"
              onChange={handleChange}
            />
          </label>

          <div className="submit-button-container">
  <button type="submit">{addressExists ? "Save & Close " : "Create"}</button>
</div>

        </form>
      </div>
    </div>
  );
};

export default CompanyAddress;
