import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getShippingAddress,
  createShippingAddress,
  updateShippingAddress,
  deleteShippingAddress,
  getBillingAddress, // import this to fetch billing address
} from "../../features/company/companyAPI";
import "./address.css";

import { toast } from "react-toastify";

const ShippingAddress = () => {
  const companyId = useSelector((state) => state.company.selectedCompanyId);
  const accessToken = useSelector((state) => state.auth.accessToken);

  const [formData, setFormData] = useState({
    name: "",
    address_line_1: "",
    address_line_2: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
  });

  const [billingAddress, setBillingAddress] = useState(null);
  const [sameAsBilling, setSameAsBilling] = useState(false);
  const [addressId, setAddressId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addressExists, setAddressExists] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (!companyId || !accessToken) return;

    setFormData({
      name: "",
      address_line_1: "",
      address_line_2: "",
      pincode: "",
      city: "",
      state: "",
      country: "",
    });
    setAddressId(null);
    setAddressExists(false);
    setSameAsBilling(false);
    setLoading(true);

    fetchAddresses();
  }, [companyId, accessToken]);

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

  const fetchAddresses = async () => {
    try {
      const [shipping, billing] = await Promise.all([
        getShippingAddress(companyId, accessToken),
        getBillingAddress(companyId, accessToken),
      ]);

      // shipping address
      if (Array.isArray(shipping) && shipping.length > 0) {
        setFormData(shipping[0]);
        setAddressId(shipping[0].id);
        setAddressExists(true);
      } else {
        setAddressExists(false);
      }

      // billing address
      if (Array.isArray(billing) && billing.length > 0) {
        setBillingAddress(billing[0]);
      } else {
        setBillingAddress(null);
      }
    } catch (err) {
      console.error("Error fetching addresses:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setSameAsBilling(checked);

    if (checked && billingAddress) {
      setFormData({ ...billingAddress });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (addressExists) {
        await updateShippingAddress(
          companyId,
          addressId,
          formData,
          accessToken
        );
        toast.success("Shipping address updated!");
      } else {
        const created = await createShippingAddress(
          companyId,
          formData,
          accessToken
        );
        setAddressId(created.id);
        setAddressExists(true);
        toast.success("Shipping address created!");
      }
      setDrawerOpen(false);
    } catch (err) {
      console.error("Error saving address:", err);
      toast.error("Something went wrong!");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteShippingAddress(companyId, addressId, accessToken);
      setFormData({
        name: "",
        address_line_1: "",
        address_line_2: "",
        pincode: "",
        city: "",
        state: "",
        country: "",
      });
      setAddressExists(false);
      setAddressId(null);
      toast.success("Billing address deleted.");
    } catch (err) {
      console.error("Error deleting shipping address:", err);
    }
  };

  if (loading) return <div>Loading Shipping Address...</div>;

  return (
    <div className="address-main">
      <div className="address-summary">
        <h3>Shipping Address</h3>
        {addressExists ? (
          <div className="company-address">
            <p>{formData.name}</p>
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
              Edit{" "}
            </button>
            <button className="address-delete-btn" onClick={handleDelete}>
              Delete
            </button>
          </div>
        ) : (
          // </>
          <>
            <p>No shipping address found.</p>
            <button onClick={() => setDrawerOpen(true)}>Create Address</button>
          </>
        )}
      </div>

      {drawerOpen && (
        <div className="drawer-overlay" onClick={() => setDrawerOpen(false)} />
      )}
      <div className={`drawer ${drawerOpen ? "open" : ""}`}>
        <div className="drawer-header">
          <h3>
            {addressExists
              ? "Edit Shipping Address"
              : "Create Shipping Address"}
          </h3>
          <button className="close-btn" onClick={() => setDrawerOpen(false)}>
            ✖
          </button>
        </div>

        <form className="address-form" onSubmit={handleSubmit}>
          
          <div className="check-box">

          {billingAddress && (
            <label>
              <input
                type="checkbox"
                checked={sameAsBilling}
                onChange={handleCheckboxChange}
                />
              Same as billing address
            </label>
          )}
          </div>

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
            <button type="submit">
              {addressExists ? "Save & Close " : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShippingAddress;
