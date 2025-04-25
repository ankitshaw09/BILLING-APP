import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaBuilding, FaChevronDown } from "react-icons/fa";
import { FaFileInvoice, FaReceipt } from "react-icons/fa6";
import { GrCurrency } from "react-icons/gr";
import "./Sidebar.css";

const Sidebar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();

  const toggleDropdown = (dropdownName, navigateTo) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
    navigate(navigateTo);
  };

  return (
    <aside className="sidebar">
      <ul className="sidebar-list">
        {/* SALES */}
        <li className="dropdown-item">
          <div
            className="dropdown-toggle"
            onClick={() => toggleDropdown("sales", "/sales/invoice")}
          >
            <div className="list-name">
              <GrCurrency className="dropdown-icons" /> Sales
            </div>
            <FaChevronDown className="downIcons" />
          </div>
          {openDropdown === "sales" && (
            <ul className="dropdown-menu">
              <li className="menuList">
                <Link to="/sales/invoice" className="menu-items">
                  Invoices
                </Link>
              </li>
              <li className="menuList">
                <Link to="/sales/credit-note" className="menu-items">
                  Credit Note
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* PURCHASE */}
        <li className="dropdown-item">
          <div
            className="dropdown-toggle"
            onClick={() => toggleDropdown("purchase", "/sales/invoice")}
          >
            <div className="list-name">
              <GrCurrency className="dropdown-icons" /> Purchase
            </div>
            <FaChevronDown />
          </div>
          {openDropdown === "purchase" && (
            <ul className="dropdown-menu">
              <li className="menuList">
                <Link to="/sales/invoice" className="menu-items">
                  Purchase
                </Link>
              </li>
              <li className="menuList">
                <Link to="/sales/invoice" className="menu-items">
                  Purchase Order
                </Link>
              </li>
              <li className="menuList">
                <Link to="/sales/credit-note" className="menu-items">
                  Debit Note
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* INVENTORY */}
        <li className="dropdown-item">
          <div
            className="dropdown-toggle"
            onClick={() => toggleDropdown("inventory", "/sales/invoice")}
          >
            <div className="list-name">
              <GrCurrency className="dropdown-icons" /> Inventory
            </div>
            <FaChevronDown />
          </div>
          {openDropdown === "inventory" && (
            <ul className="dropdown-menu">
              <li className="menuList">
                <Link to="/sales/invoice" className="menu-items">
                  Warehouse
                </Link>
              </li>
              <li className="menuList">
                <Link to="/sales/invoice" className="menu-items">
                  Timeline
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* PAYMENTS */}
        <li className="dropdown-item">
          <div
            className="dropdown-toggle"
            onClick={() => toggleDropdown("payment", "/sales/invoice")}
          >
            <div className="list-name">
              <GrCurrency className="dropdown-icons" /> Payment
            </div>
            <FaChevronDown />
          </div>
          {openDropdown === "payment" && (
            <ul className="dropdown-menu">
              <li className="menuList">
                <Link to="/sales/invoice" className="menu-items">
                  Settlements
                </Link>
              </li>
              <li className="menuList">
                <Link to="/sales/invoice" className="menu-items">
                  Timeline
                </Link>
              </li>
              <li className="menuList">
                <Link to="/sales/credit-note" className="menu-items">
                  Journals
                </Link>
              </li>
              <li className="menuList">
                <Link to="/sales/credit-note" className="menu-items">
                  Payment Links
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* QUOTATIONS */}
        <li className="dropdown-item">
          <div
            className="dropdown-toggle"
            onClick={() => toggleDropdown("quotations", "/sales/invoice")}
          >
            <div className="list-name">
              <GrCurrency className="dropdown-icons" /> Quotations
            </div>
            <FaChevronDown />
          </div>
          {openDropdown === "quotations" && (
            <ul className="dropdown-menu">
              <li className="menuList">
                <Link to="/sales/invoice" className="menu-items">
                  Quotations
                </Link>
              </li>
              <li className="menuList">
                <Link to="/sales/invoice" className="menu-items">
                  Delivery Challan
                </Link>
              </li>
              <li className="menuList">
                <Link to="/sales/credit-note" className="menu-items">
                  Sales Order
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* EXPENSES */}
        <li className="dropdown-item">
          <div
            className="dropdown-toggle"
            onClick={() => toggleDropdown("expenses", "/sales/invoice")}
          >
            <div className="list-name">
              <GrCurrency className="dropdown-icons" /> Expenses
            </div>
            <FaChevronDown />
          </div>
          {openDropdown === "expenses" && (
            <ul className="dropdown-menu">
              <li className="menuList">
                <Link to="/sales/invoice" className="menu-items">
                  Expenses
                </Link>
              </li>
              <li className="menuList">
                <Link to="/sales/invoice" className="menu-items">
                  Indirect Income
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* MORE */}
        <li className="dropdown-item">
          <div
            className="dropdown-toggle"
            onClick={() => toggleDropdown("more", "/sales/invoice")}
          >
            <div className="list-name">
              <GrCurrency className="dropdown-icons" /> More
            </div>
            <FaChevronDown />
          </div>
          {openDropdown === "more" && (
            <ul className="dropdown-menu">
              <li className="menuList">
                <Link to="/sales/credit-note" className="menu-items">
                  My Drive
                </Link>
              </li>
              <li className="menuList">
                <Link to="/sales/credit-note" className="menu-items">
                  Tally
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Other Static Links */}
        <li>
          <Link to="/sales/invoice">
            <FaFileInvoice /> Customers
          </Link>
        </li>
        <li>
          <Link to="/sales/invoice">
            <FaFileInvoice /> Vendors
          </Link>
        </li>
        <li>
          <Link to="/sales/invoice">
            <FaFileInvoice /> Products & Services
          </Link>
        </li>
        <li>
          <Link to="/sales/credit-note">
            <FaReceipt /> Insites
          </Link>
        </li>
        <li>
          <Link to="/sales/credit-note">
            <FaReceipt /> Reports
          </Link>
        </li>
        <li>
          <Link to="/sales/credit-note">
            <FaReceipt /> Online Store
          </Link>
        </li>
        <li>
          <Link to="/sales/credit-note">
            <FaReceipt /> Settings
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
