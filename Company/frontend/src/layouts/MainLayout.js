import React from 'react';

import "./MainLayout.css";
import Sidebar from "../components/Sidebar";

const MainLayout = ({ children }) => {
  return (
    <div className='mainLayout'  >

      <Sidebar />
      <div className="main-container">{children}</div>

    </div>
  );
};

export default MainLayout;
 