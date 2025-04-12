import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/accounts";

export const fetchUserProfile = async (accessToken) => {
  const response = await axios.get(`${BASE_URL}/profile/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const updateUserProfile = async ({ accessToken, data }) => {
  const response = await axios.patch(`${BASE_URL}/profile/`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};
