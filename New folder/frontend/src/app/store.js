import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import companyReducer from "../features/company/companySlice"; // ✅ Make sure this is imported

import uiReducer from "../features/ui/uiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    company: companyReducer, // ✅ Add this line
    ui: uiReducer,
  },
});
