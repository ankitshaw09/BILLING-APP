import { useDispatch, useSelector } from "react-redux";
import { setSelectedCompanyId } from "../features/company/companySlice";

const CompanySelector = () => {
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.company.companies);
  const selectedCompanyId = useSelector((state) => state.company.selectedCompanyId);

  const handleChange = (e) => {
    dispatch(setSelectedCompanyId(Number(e.target.value)));
  };

  return (
    <select onChange={handleChange} value={selectedCompanyId || ""}>
      <option value="">Select Company</option>
      {companies.map((company) => (
        <option key={company.id} value={company.id}>
          {company.trade_name}
        </option>
      ))}
    </select>
  );
};

export default CompanySelector;
