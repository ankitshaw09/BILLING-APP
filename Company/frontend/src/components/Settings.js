import React, { useState } from 'react';
import { useUserProfile, useUpdateProfile } from '../features/auth/useUserProfile';

const Settings = () => {
  const { data, isLoading } = useUserProfile();
  const { mutate: updateProfile } = useUpdateProfile();
  const [form, setForm] = useState({ name: '', phone_number: '' });

  if (isLoading) return <p>Loading...</p>;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="New Name" onChange={handleChange} defaultValue={data.name} />
      <input name="phone_number" placeholder="New Phone" onChange={handleChange} defaultValue={data.phone_number} />
      <button type="submit">Update</button>
    </form>
  );
};

export default Settings;
