import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthChecked: false, // NEW
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, access, refresh } = action.payload;
      state.user = user;
      state.accessToken = access;
      state.refreshToken = refresh;
      state.isAuthChecked = true;


      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      localStorage.setItem("user", JSON.stringify(user));
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthChecked = true;
      localStorage.clear();

    },
    loadUserFromStorage: (state) => {
      const user = localStorage.getItem("user");
      const access = localStorage.getItem("accessToken");
      const refresh = localStorage.getItem("refreshToken");

      if (user && access && refresh) {
        state.user = JSON.parse(user);
        state.accessToken = access;
        state.refreshToken = refresh;
      }
      state.isAuthChecked = true; // ✅ flag done
    },
  },
});

export const { setCredentials, logout, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
