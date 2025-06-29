import React, { useEffect, useState } from "react";
import {
  getStamps,
  createStamp,
  deleteStamp,
  getSignatures,
  createSignature,
  deleteSignature,
} from "../../../features/company/companyAPI";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Signatures = () => {
  const { selectedCompanyId } = useSelector((state) => state.company);
  const accessToken = useSelector((state) => state.auth.accessToken);

  const [stamps, setStamps] = useState([]);
  const [signatures, setSignatures] = useState([]);

  const [stampName, setStampName] = useState("");
  const [stampFile, setStampFile] = useState(null);
  const [signatureName, setSignatureName] = useState("");
  const [signatureFile, setSignatureFile] = useState(null);

  useEffect(() => {
    if (selectedCompanyId && accessToken) {
      fetchStamps();
      fetchSignatures();
    }
  }, [selectedCompanyId, accessToken]);

  const fetchStamps = async () => {
    try {
      const data = await getStamps(selectedCompanyId, accessToken);
      setStamps(data);
    } catch {
      toast.error("Failed to fetch stamps.");
    }
  };

  const fetchSignatures = async () => {
    try {
      const data = await getSignatures(selectedCompanyId, accessToken);
      setSignatures(data);
    } catch {
      toast.error("Failed to fetch signatures.");
    }
  };

  const handleStampUpload = async (e) => {
    e.preventDefault();
    if (!stampName || !stampFile) {
      return toast.error("Please provide stamp name and image.");
    }
    const formData = new FormData();
    formData.append("company",selectedCompanyId)
    formData.append("name", stampName);
    formData.append("stamp_image", stampFile);
    try {
      await createStamp(selectedCompanyId, formData, accessToken);
      toast.success("Stamp uploaded.");
      setStampName("");
      setStampFile(null);
      fetchStamps();
    } catch {
      toast.error("Upload failed.");
    }
  };

  const handleSignatureUpload = async (e) => {
    e.preventDefault();
    if (!signatureName || !signatureFile) {
      return toast.error("Please provide signature name and image.");
    }
    const formData = new FormData();
    formData.append("company",selectedCompanyId)
    formData.append("name", signatureName);
    formData.append("signature_image", signatureFile); // Assuming same field used
    try {
      await createSignature(selectedCompanyId, formData, accessToken);
      toast.success("Signature uploaded.");
      setSignatureName("");
      setSignatureFile(null);
      fetchSignatures();
    } catch {
      toast.error("Upload failed.");
    }
  };

  const handleStampDelete = async (id) => {
    try {
      await deleteStamp(selectedCompanyId, id, accessToken);
      toast.success("Deleted.");
      fetchStamps();
    } catch {
      toast.error("Delete failed.");
    }
  };

  const handleSignatureDelete = async (id) => {
    try {
      await deleteSignature(selectedCompanyId, id, accessToken);
      toast.success("Deleted.");
      fetchSignatures();
    } catch {
      toast.error("Delete failed.");
    }
  };

  return (
    <div style={{ padding: "50px" }}>
      <h2>Stamps</h2>
      <form onSubmit={handleStampUpload}>
        <input
          type="text"
          placeholder="Stamp Name"
          value={stampName}
          onChange={(e) => setStampName(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => setStampFile(e.target.files[0])}
        />
        <button type="submit">Upload Stamp</button>
      </form>

      <div style={{ display: "flex", gap: "20px", marginTop: "10px", flexWrap: "wrap" }}>
        {stamps.map((stamp) => (
          <div key={stamp.id} style={{ border: "1px solid #ccc", padding: 10 }}>
            <p>{stamp.name}</p>
            <img
              src={stamp.stamp_image}
              alt={stamp.name}
              style={{ height: "80px", objectFit: "contain" }}
            />
            <button onClick={() => handleStampDelete(stamp.id)}>Delete</button>
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: "60px" }}>Signatures</h2>
      <form onSubmit={handleSignatureUpload}>
        <input
          type="text"
          placeholder="Signature Name"
          value={signatureName}
          onChange={(e) => setSignatureName(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => setSignatureFile(e.target.files[0])}
        />
        <button type="submit">Upload Signature</button>
      </form>

      <div style={{ display: "flex", gap: "20px", marginTop: "10px", flexWrap: "wrap" }}>
        {signatures.map((sig) => (
          <div key={sig.id} style={{ border: "1px solid #ccc", padding: 10 }}>
            <p>{sig.name}</p>
            <img
              src={sig.signature_image}
              alt={sig.name}
              style={{ height: "80px", objectFit: "contain" }}
            />
            <button onClick={() => handleSignatureDelete(sig.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Signatures;
