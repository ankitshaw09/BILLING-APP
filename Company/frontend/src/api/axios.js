// src/api/axios.js
import axios from "axios";
import { store } from "../app/store"; // <-- adjust path if needed

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

// Attach token from Redux store
api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
