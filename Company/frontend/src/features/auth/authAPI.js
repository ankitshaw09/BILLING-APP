// src/api/authAPI.js
import api from './axios';

export const loginUser = async (credentials) => {
  const { data } = await api.post('/accounts/login/', credentials);
  return data;
};

export const registerUser = async (payload) => {
  const { data } = await api.post('/accounts/register/', payload);
  return data;
};

export const logoutUser = async (refreshToken) => {
  await api.post('/accounts/logout/', { refresh_token: refreshToken });
};

export const getProfile = async () => {
  const { data } = await api.get('/accounts/profile/');
  return data;
};

export const updateProfile = async (payload) => {
  const { data } = await api.patch('/accounts/profile/', payload);
  return data;
};
