// // src/pages/Profile.js
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getProfile, patchProfile } from "../features/profile/profileSlice";
// import { setCompanyId } from "../features/auth/authSlice";

// const Profile = () => {
//   const dispatch = useDispatch();
//   const { profile, status } = useSelector((state) => state.profile);
//   const accessToken = useSelector((state) => state.auth.accessToken);
//   const companyId = useSelector((state) => state.auth.companyId || 1);

//   const [formData, setFormData] = useState({
//     trade_name: "",
//     proprietor_name: "",
//     company_phone: "",
//     alternate_phone: "",
//     gst_no: "",
//   });

//   const companies = [
//     { id: 1, name: "Company A" },
//     { id: 2, name: "Company B" },
//     { id: 3, name: "Company C" },
//     { id: 4, name: "Company D" },
//     { id: 5, name: "Company E" },
//   ];

//   // Fetch profile on load or company change
//   useEffect(() => {
//     if (accessToken) {
//       dispatch(getProfile({ accessToken, companyId }));
//     }
//   }, [dispatch, accessToken, companyId]);

//   // Update form state when profile is fetched
//   useEffect(() => {
//     if (profile) {
//       setFormData({
//         trade_name: profile.trade_name || "",
//         proprietor_name: profile.proprietor_name || "",
//         company_phone: profile.company_phone || "",
//         alternate_phone: profile.alternate_phone || "",
//         gst_no: profile.gst_no || "",
//       });
//     }
//   }, [profile]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(patchProfile({ accessToken, companyId, profileData: formData }));
//   };

//   const handleCompanySwitch = (e) => {
//     const newCompanyId = parseInt(e.target.value);
//     dispatch(setCompanyId(newCompanyId)); // 🔁 updates Redux
//   };

//   if (status === "loading") return <p>Loading profile...</p>;
//   if (!profile) return <p>Profile data not available.</p>;

//   return (
//     <div>
//       <h2>Company Profile</h2>

//       {/* 🔁 Company Switcher Dropdown */}
//       <label>
//         Switch Company:
//         <select value={companyId} onChange={handleCompanySwitch}>
//           {companies.map((c) => (
//             <option key={c.id} value={c.id}>
//               {c.name}
//             </option>
//           ))}
//         </select>
//       </label>

//       <form onSubmit={handleSubmit}>
//         <label>
//           Trade Name:
//           <input
//             type="text"
//             name="trade_name"
//             value={formData.trade_name}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           Proprietor Name:
//           <input
//             type="text"
//             name="proprietor_name"
//             value={formData.proprietor_name}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           Company Phone:
//           <input
//             type="text"
//             name="company_phone"
//             value={formData.company_phone}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           Alternate Phone:
//           <input
//             type="text"
//             name="alternate_phone"
//             value={formData.alternate_phone}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           GST No:
//           <input
//             type="text"
//             name="gst_no"
//             value={formData.gst_no}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <button type="submit">Update Profile</button>
//       </form>

//       {/* Profile Preview */}
//       <div>
//         <h3>Live Preview:</h3>
//         <p><strong>Trade Name:</strong> {profile.trade_name}</p>
//         <p><strong>Proprietor Name:</strong> {profile.proprietor_name}</p>
//         <p><strong>Phone:</strong> {profile.company_phone}</p>
//         <p><strong>Alternate:</strong> {profile.alternate_phone}</p>
//         <p><strong>GST No:</strong> {profile.gst_no}</p>
//       </div>
//     </div>
//   );
// };

// export default Profile;
