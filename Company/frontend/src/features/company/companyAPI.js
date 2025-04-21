import api from '../../api/axios';

// ✅ Create a new company
export const createCompany = async (payload, accessToken) => {
  const response = await api.post('/company/create-company/', payload, {
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
  const response = await api.get('/company/companies-list/', {
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
