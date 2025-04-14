import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile, updateUserProfile } from "../features/auth/authAPI";
import { setCredentials } from "../features/auth/authSlice";

const Settings = () => {
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
      setLoading(false);
    } catch (err) {
      setError("Failed to update profile. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="settings-container">
      <h2>Account Settings</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={updatedData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={updatedData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone_number">Phone Number</label>
          <input
            type="tel"
            id="phone_number"
            name="phone_number"
            value={updatedData.phone_number}
            onChange={handleInputChange}
            required
          />
        </div>

        {error && <p className="error-message">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>

      <div className="profile-details">
        <h3>Your Profile</h3>
        <p>
          <strong>Name:</strong> {userProfile.name}
        </p>
        <p>
          <strong>Email:</strong> {userProfile.email}
        </p>
        <p>
          <strong>Phone Number:</strong> {userProfile.phone_number}
        </p>
      </div>
    </div>
  );
};

export default Settings;
