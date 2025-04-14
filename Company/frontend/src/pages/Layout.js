import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const { theme } = useSelector((state) => state.ui);

  return (
    <>
      <Navbar />
      <div
        className={`main-content ${theme === "dark" ? "dark-mode" : "light-mode"}`}
      >
        {/* <div className="routes-container">{children}</div> */}
        <div style={{
          marginTop:"60px",
          color: "red",
        }}>{children}</div>
      </div>
    </>
  );
};

export default Layout;
