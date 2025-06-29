import { createSlice } from "@reduxjs/toolkit";

const savedCompanies = localStorage.getItem("companies");
const savedCompanyId = localStorage.getItem("selectedCompanyId");

const parsedCompanies = savedCompanies ? JSON.parse(savedCompanies) : [];
const parsedCompanyId = savedCompanyId ? parseInt(savedCompanyId) : null;

const initialState = {
  companies: parsedCompanies,
  selectedCompanyId: parsedCompanyId,
  currentCompany: parsedCompanies.find((c) => c.id === parsedCompanyId) || null,
  companyProfile: null,
  companyLoaded: true, // ✅ true since we're hydrating from localStorage
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompanies: (state, action) => {
      state.companies = action.payload;
      localStorage.setItem("companies", JSON.stringify(action.payload));

      const selected = action.payload.find((c) => c.id === state.selectedCompanyId);
      if (selected) {
        state.currentCompany = selected;
      }
    },

    setSelectedCompanyId: (state, action) => {
      state.selectedCompanyId = action.payload;
      localStorage.setItem("selectedCompanyId", action.payload);

      const selected = state.companies.find((c) => c.id === action.payload);
      if (selected) {
        state.currentCompany = selected;
      }
    },

    setCompanyProfile: (state, action) => {
      state.companyProfile = action.payload;
    },

    updateCurrentCompanyProfile: (state, action) => {
      const updated = action.payload;
      const index = state.companies.findIndex((c) => c.id === updated.id);

      if (index !== -1) {
        state.companies[index] = updated;
        localStorage.setItem("companies", JSON.stringify(state.companies));
      }

      state.currentCompany = updated;
      state.companyProfile = updated;
      state.selectedCompanyId = updated.id;

      localStorage.setItem("selectedCompanyId", updated.id);
    },

    clearCompanyState: (state) => {
      state.companies = [];
      state.selectedCompanyId = null;
      state.currentCompany = null;
      state.companyProfile = null;
      state.companyLoaded = false;

      localStorage.removeItem("companies");
      localStorage.removeItem("selectedCompanyId");
    },
  },
});

export const {
  setCompanies,
  setSelectedCompanyId,
  setCompanyProfile,
  updateCurrentCompanyProfile,
  clearCompanyState,
} = companySlice.actions;

export default companySlice.reducer;
