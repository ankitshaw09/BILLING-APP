// src/components/SwitchCompanyModal.js
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCompanyId } from "../features/company/companySlice";
import "./SwitchCompanyModal.css"; // Optional styling

const SwitchCompanyModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.company.companies);
  const selectedCompanyId = useSelector((state) => state.company.selectedCompanyId);

  const handleSelect = (companyId) => {
    dispatch(setSelectedCompanyId(companyId));
    onClose(); // close modal after selection
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Select a Company</h2>
        <ul>
          {companies.map((company) => (
            <li
              key={company.id}
              onClick={() => handleSelect(company.id)}
              className={company.id === selectedCompanyId ? "selected" : ""}
            >
              <strong>{company.trade_name}</strong> – {company.proprietor_name}
            </li>
          ))}
        </ul>
        <button onClick={onClose} className="close-btn">Close</button>
      </div>
    </div>
  );
};

export default SwitchCompanyModal;
