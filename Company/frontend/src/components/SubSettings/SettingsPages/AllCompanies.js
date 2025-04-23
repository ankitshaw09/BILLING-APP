import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getCompanyList, deleteCompany } from "../../../features/company/companyAPI";
import {
  setCompanies,
  setSelectedCompanyId,
  clearCompanyState,
} from "../../../features/company/companySlice";

const AllCompanies = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const { companies, selectedCompanyId } = useSelector((state) => state.company);

  // Load all companies on mount
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getCompanyList(accessToken);
        dispatch(setCompanies(data));
      } catch (error) {
        console.error("Error fetching companies:", error);
        toast.error("Failed to load companies");
      }
    };

    fetchCompanies();
  }, [accessToken, dispatch]);

  const handleDelete = async (companyId) => {
    const confirm = window.confirm("Are you sure you want to delete this company?");
    if (!confirm) return;

    try {
      await deleteCompany(companyId, accessToken);
      toast.success("Company deleted successfully!");

      const updatedCompanies = companies.filter((c) => c.id !== companyId);
      dispatch(setCompanies(updatedCompanies));

      // If deleted company was selected, update selected company
      if (companyId === selectedCompanyId) {
        if (updatedCompanies.length > 0) {
          dispatch(setSelectedCompanyId(updatedCompanies[0].id));
        } else {
          dispatch(clearCompanyState());
        }
      }
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete company");
    }
  };

  return (
    <div>
      <h2>All Companies</h2>
      {companies.length === 0 ? (
        <p>No companies found.</p>
      ) : (
        <ul>
          {companies.map((company) => (
            <li key={company.id} style={{ marginBottom: "1rem" }}>
              <strong>{company.trade_name}</strong> – {company.proprietor_name}
              <button
                style={{
                  marginLeft: "1rem",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  cursor: "pointer",
                }}
                onClick={() => handleDelete(company.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllCompanies;
