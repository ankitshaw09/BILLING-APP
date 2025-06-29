// components/RequireCompany.js
import React from "react";
import { useSelector } from "react-redux";

const RequireCompany = ({ children }) => {
  const { companies, selectedCompanyId } = useSelector((state) => state.company);

  if (companies.length === 0) {
    return <p>Loading company data...</p>;
  }

  const selectedCompany = companies.find(c => c.id === selectedCompanyId);

  if (!selectedCompanyId || !selectedCompany) {
    return <p>No company selected.</p>;
  }

  return children;
};

export default RequireCompany;
