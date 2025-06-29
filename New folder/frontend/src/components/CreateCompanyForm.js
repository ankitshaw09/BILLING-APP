// import { useState } from "react";
// import { useSelector } from "react-redux";
// import { createCompany } from "../features/company/companyAPI";

// const CreateCompanyForm = ({ onSuccess }) => {
//   const accessToken = useSelector((state) => state.auth.accessToken);

//   const [formData, setFormData] = useState({
//     trade_name: "",
//     proprietor_name: "",
//     company_phone_no: "",
//     alternate_phone_no: "",
//     company_email: "",
//     alternate_email: "",
//     gst_number: "",
//     pan_number: "",
//     website: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       await createCompany(formData, accessToken);
//       onSuccess(); // Optional callback
//       setFormData({
//         trade_name: "",
//         proprietor_name: "",
//         company_phone_no: "",
//         alternate_phone_no: "",
//         company_email: "",
//         alternate_email: "",
//         gst_number: "",
//         pan_number: "",
//         website: "",
//       });
//     } catch (err) {
//       setError(err?.response?.data?.detail || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "20px auto" }}>
//       <h2>Create New Company</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {Object.entries(formData).map(([key, value]) => (
//         <div key={key} style={{ marginBottom: "10px" }}>
//           <label>{key.replace(/_/g, " ")}:</label>
//           <input
//             type="text"
//             name={key}
//             value={value}
//             onChange={handleChange}
//             required={key !== "alternate_email" && key !== "alternate_phone_no" && key !== "website"}
//             style={{ width: "100%", padding: "8px" }}
//           />
//         </div>
//       ))}

//       <button type="submit" disabled={loading}>
//         {loading ? "Creating..." : "Create Company"}
//       </button>
//     </form>
//   );
// };

// export default CreateCompanyForm;
