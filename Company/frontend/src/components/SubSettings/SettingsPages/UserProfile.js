// components/UserProfile.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCredentials, logout } from "../../../features/auth/authSlice";

import {
  fetchUserProfile,
  updateUserProfile,
  logoutFromAllDevices,
  requestAccountDeletion,
} from "../../../features/auth/authAPI";

// import { requestAccountDeletion } from "../features/auth/authAPI";
import "./Userprofile.css";
const UserProfile = () => {
  const dispatch = useDispatch();
  const { accessToken, refreshToken } = useSelector((state) => state.auth);

  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    phone_number: "",
  });

  const [updatedData, setUpdatedData] = useState({
    name: "",
    email: "",
    phone_number: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch user profile on initial load
  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const data = await fetchUserProfile(); // Fetch the user profile
        setUserProfile(data); // Set the current profile to display
        setUpdatedData(data); // Initialize updatedData with user profile
      } catch (err) {
        setError("Failed to load user profile");
      }
    };
    getUserProfile();
  }, []);

  // Handle input changes for the profile fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoading(true);

    try {
      const updatedProfile = await updateUserProfile(updatedData, accessToken); // pass token
      dispatch(
        setCredentials({
          user: updatedProfile,
          access: accessToken,
          refresh: refreshToken,
        })
      );
      setUserProfile(updatedProfile);
      // Determine what changed and show message accordingly
      if (updatedProfile.name !== userProfile.name) {
        setSuccessMessage(
          `Name updated successfully: '${updatedProfile.name}'`
        );
        setShowPopup(true);
      } else if (updatedProfile.phone_number !== userProfile.phone_number) {
        setSuccessMessage(
          `Phone number updated successfully: '${updatedProfile.phone_number}'`
        );
        setShowPopup(true);
      }
      // Hide popup after 3 seconds
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);

      setLoading(false);
    } catch (err) {
      setError("Failed to update profile. Please try again.");
      setLoading(false);
    }
  };

  const handleLogoutAll = async () => {
    try {
      await logoutFromAllDevices(accessToken);
      dispatch(logout());
    } catch (error) {
      console.error("Logout all devices failed:", error);
    }
  };

  const handleAccountDeletion = async () => {
    try {
      setDeleteError("");
      const response = await requestAccountDeletion(
        accessToken,
        "Please delete my account. I no longer use the service."
      );
      setDeleteSuccess("✅ Account deletion request sent successfully!");
      setTimeout(() => setDeleteSuccess(""), 3000);
      setShowDeleteConfirm(false);
    } catch (err) {
      setDeleteError("❌ Failed to send deletion request. Please try again.");
      setTimeout(() => setDeleteError(""), 3000);
      console.error(err);
    }
  };

  return (
    <div className="User-Profile">
      <h2>User Profile Settings</h2>

      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="name">
            <label>Name :</label>
            <input
              type="text"
              className="form-input"
              name="name"
              value={updatedData.name}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <div className="phone">
            <label>Phone Number : </label>
            <input
              type="tel"
              className="form-input"
              id="phone_number"
              name="phone_number"
              value={updatedData.phone_number}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <div className="email">
            <label htmlFor="email">Email : </label>
            <input
              className="form-input-email"
              type="email"
              id="email"
              name="email"
              value={updatedData.email}
              onChange={handleInputChange}
              readOnly
            />
          </div>
        </div>

        {error && <p className="error-message">{error}</p>}
        {showPopup && <div className="popup-success">{successMessage}</div>}

        <button className="Profile-updates" type="submit" disabled={loading}>
          {loading ? "Updating..." : "Save & Updates"}
        </button>
      </form>

      <div className="profile-requests">
        <p>Request Something ? </p>
        {/* <br /> */}
        <span>
          Want to reset your account data?
          <a className="clickhere" href="#">
            Click here
          </a>
        </span>
        <br />

        <span>
          Logout from all devices?{" "}
          <a
            className="clickhere"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              const confirmed = window.confirm(
                "Are you sure you want to logout from all devices?"
              );
              if (confirmed) {
                handleLogoutAll();
              }
            }}
          >
            Click here
          </a>
        </span>

        <div className="danger-zone">
          <p className="danger">
            <strong>Danger Zone</strong>
          </p>
          <span>
            ❌ Want to delete your account permanently?{" "}
            <a
              href="#"
              className="clickhere"
              onClick={(e) => {
                e.preventDefault();
                setShowDeleteConfirm(true);
              }}
            >
              Click here
            </a>
          </span>

          {showDeleteConfirm && (
            <div className="popup-overlay">
              <div className="popup-box">
                <p>⚠️ Are you sure you want to request account deletion?</p>
                <div className="popup-actions">
                  <button onClick={handleAccountDeletion}>Yes, Delete</button>
                  <button onClick={() => setShowDeleteConfirm(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {deleteSuccess && <p className="success-message">{deleteSuccess}</p>}
          {deleteError && <p className="error-message">{deleteError}</p>}

          <p
            style={{
              padding: "0",
              margin: "2px",
              fontSize: "12px",
            }}
          >
            Your request will be processed within 5–7 business days.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
