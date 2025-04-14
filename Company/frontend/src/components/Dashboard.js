import React from 'react';
import { useUserProfile } from '../features/auth/useUserProfile';

const Dashboard = () => {
  const { data, isLoading } = useUserProfile();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Welcome, {data.name}</h2>
      <p>Email: {data.email}</p>
      <p>Phone: {data.phone_number}</p>
    </div>
  );
};

export default Dashboard;
