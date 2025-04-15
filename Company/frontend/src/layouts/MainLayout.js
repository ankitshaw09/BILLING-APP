import React from 'react';
// import Navbar from '../../../../frontend/src/components/Navbar';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
import "./MainLayout.css";

const MainLayout = ({ children }) => {
  return (
    <div className='mainLayout'  >
      {/* <Navbar /> */}
      {/* {children} */}
      <div className="main-container">{children}</div>
      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout;
 