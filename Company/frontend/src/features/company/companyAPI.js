import api from "../../api/axios";

// ✅ Create a new company
export const createCompany = async (payload, accessToken) => {
  const response = await api.post("/company/create-company/", payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

// ✅ Get details of a single company
export const getCompanyDetails = async (companyId, accessToken) => {
  const response = await api.get(`/company/${companyId}/profile/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const updateCompany = async (companyId, payload, accessToken) => {
  let dataToSend = payload;
  let headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  // Check if payload contains a File (e.g., company_logo)
  const hasFile = payload.company_logo instanceof File;

  if (hasFile) {
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });
    dataToSend = formData;
    headers["Content-Type"] = "multipart/form-data";
  }

  const response = await api.patch(
    `/company/${companyId}/profile/`,
    dataToSend,
    { headers }
  );
  return response.data;
};

// ✅ Get all companies
export const getCompanyList = async (accessToken) => {
  const response = await api.get("/company/companies-list/", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

// ✅ Delete company
export const deleteCompany = async (companyId, accessToken) => {
  const response = await api.delete(`/company/${companyId}/delete/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

// ------------------ Company Address ------------------

export const getCompanyAddress = async (companyId, accessToken) => {
  const response = await api.get(`/company/${companyId}/addresses/company/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const createCompanyAddress = async (companyId, payload, accessToken) => {
  const response = await api.post(
    `/company/${companyId}/addresses/company/`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
};

export const updateCompanyAddress = async (
  companyId,
  addressId,
  payload,
  accessToken
) => {
  const response = await api.patch(
    `/company/${companyId}/addresses/company/${addressId}/`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
};

// ------------------ Billing Address ------------------

export const getBillingAddress = async (companyId, accessToken) => {
  const response = await api.get(`/company/${companyId}/addresses/billing/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const createBillingAddress = async (companyId, payload, accessToken) => {
  const response = await api.post(
    `/company/${companyId}/addresses/billing/`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
};

export const updateBillingAddress = async (
  companyId,
  addressId,
  payload,
  accessToken
) => {
  const response = await api.patch(
    `/company/${companyId}/addresses/billing/${addressId}/`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
};

export const deleteBillingAddress = async (
  companyId,
  addressId,
  accessToken
) => {
  const response = await api.delete(
    `/company/${companyId}/addresses/billing/${addressId}/`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
};

// ------------------ Shipping Address ------------------

export const getShippingAddress = async (companyId, accessToken) => {
  try {
    const response = await api.get(
      `/company/${companyId}/addresses/shipping/`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Error fetching shipping address:", err);
    throw err;
  }
};

export const createShippingAddress = async (
  companyId,
  payload,
  accessToken
) => {
  const response = await api.post(
    `/company/${companyId}/addresses/shipping/`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
};

export const updateShippingAddress = async (
  companyId,
  addressId,
  payload,
  accessToken
) => {
  const response = await api.patch(
    `/company/${companyId}/addresses/shipping/${addressId}/`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
};

export const deleteShippingAddress = async (
  companyId,
  addressId,
  accessToken
) => {
  const response = await api.delete(
    `/company/${companyId}/addresses/shipping/${addressId}/`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
};



// api/companyAPI.js

// import api from "../../api/axios";

// Fetch stamps
export const getStamps = async (companyId, accessToken) => {
  const response = await api.get(`/company/${companyId}/stamp/`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};

// Create stamp
export const createStamp = async (companyId, payload, accessToken) => {
  const response = await api.post(`/company/${companyId}/stamp/`, payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Update stamp
export const updateStamp = async (companyId, stampId, payload, accessToken) => {
  const response = await api.patch(
    `/company/${companyId}/stamp/${stampId}/`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

// Delete stamp
export const deleteStamp = async (companyId, stampId, accessToken) => {
  const response = await api.delete(
    `/company/${companyId}/stamp/${stampId}/`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  return response.data;
};

// Fetch signatures
export const getSignatures = async (companyId, accessToken) => {
  const response = await api.get(`/company/${companyId}/signature/`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};

// Create signature
export const createSignature = async (companyId, payload, accessToken) => {
  const response = await api.post(
    `/company/${companyId}/signature/`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

// Update signature
export const updateSignature = async (
  companyId,
  signatureId,
  payload,
  accessToken
) => {
  const response = await api.patch(
    `/company/${companyId}/signature/${signatureId}/`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

// Delete signature
export const deleteSignature = async (companyId, signatureId, accessToken) => {
  const response = await api.delete(
    `/company/${companyId}/signature/${signatureId}/`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  return response.data;
};
