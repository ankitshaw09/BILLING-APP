import api from "../../api/axios";

// ✅ Register User
export const registerUser = async (payload) => {
  const response = await api.post("/accounts/register/", payload);
  return response.data;
};

// ✅ Login User
export const loginUser = async (payload) => {
  const response = await api.post("/accounts/login/", payload);
  return response.data;
};

// ✅ Logout User
export const logoutUser = async (refreshToken) => {
  const response = await api.post("/accounts/logout/", {
    refresh_token: refreshToken,
  });
  return response.data;
};

// ✅ Get Profile
export const fetchUserProfile = async () => {
  const response = await api.get("/accounts/profile/");
  return response.data;
};

// ✅ Update Profile (PATCH)
export const updateUserProfile = async (payload, accessToken) => {
  const response = await api.patch("/accounts/profile/", payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};
