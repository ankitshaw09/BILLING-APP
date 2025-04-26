import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// 
import { FaPenFancy } from "react-icons/fa6";
import { BiPurchaseTag } from "react-icons/bi";
import { AiOutlineProduct } from "react-icons/ai";
import { SiPagespeedinsights } from "react-icons/si";
import { CiSettings, CiCircleMore } from "react-icons/ci";
import { IoIosPricetags ,IoMdPerson  } from "react-icons/io";
import { FaMoneyBillWaveAlt, FaChevronDown } from "react-icons/fa";
import { TbReportAnalytics ,TbBuildingWarehouse } from "react-icons/tb";
import { MdTrolley, MdCurrencyRupee, MdOutlinePeople } from "react-icons/md";



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
              <FaMoneyBillWaveAlt className="dropdown-icons" /> Sales
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
              <BiPurchaseTag className="dropdown-icons" /> Purchase
            </div>
            <FaChevronDown className="downIcons" />
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
        {/* customer */}
        <li className="list-items">
          <Link to="/sales/invoice" className="list-links">
            <IoMdPerson className="dropdown-icons" /> Customers
          </Link>
        </li>
        {/* vendors */}
        <li className="list-items">
          <Link to="/sales/invoice" className="list-links">
            <MdOutlinePeople className="dropdown-icons" /> Vendors
          </Link>
        </li>

        {/* products */}
        <li className="list-items">
          <Link to="/sales/invoice" className="list-links">
            <AiOutlineProduct className="dropdown-icons" /> Products & Services
          </Link>
        </li>

        {/* INVENTORY */}
        <li className="dropdown-item">
          <div
            className="dropdown-toggle"
            onClick={() => toggleDropdown("inventory", "/sales/invoice")}
          >
            <div className="list-name">
              <TbBuildingWarehouse className="dropdown-icons" /> Inventory
            </div>
            <FaChevronDown className="downIcons" />
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
              <MdCurrencyRupee className="dropdown-icons" /> Payment
            </div>
            <FaChevronDown className="downIcons" />
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

        {/* insites */}
        <li className="list-items">
          <Link to="/sales/invoice" className="list-links">
            <SiPagespeedinsights className="dropdown-icons" /> Insites
          </Link>
        </li>
        {/* reports */}
        <li className="list-items">
          <Link to="/sales/invoice" className="list-links">
            <TbReportAnalytics className="dropdown-icons" /> Reports
          </Link>
        </li>

        {/* QUOTATIONS */}
        <li className="dropdown-item">
          <div
            className="dropdown-toggle"
            onClick={() => toggleDropdown("quotations", "/sales/invoice")}
          >
            <div className="list-name">
              <FaPenFancy className="dropdown-icons" /> Quotations
            </div>
            <FaChevronDown className="downIcons" />
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
              <IoIosPricetags className="dropdown-icons" /> Expenses
            </div>
            <FaChevronDown className="downIcons" />
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
        {/* Online store */}

        <li className="list-items">
          <Link to="/sales/invoice" className="list-links">
            <MdTrolley className="dropdown-icons" /> Online Store
          </Link>
        </li>
        {/* store */}
        <li className="list-items">
          <Link to="/sales/invoice" className="list-links">
            <CiSettings className="dropdown-icons" /> Settings
          </Link>
        </li>

        {/* MORE */}
        <li className="dropdown-item">
          <div
            className="dropdown-toggle"
            onClick={() => toggleDropdown("more", "/sales/invoice")}
          >
            <div className="list-name">
              <CiCircleMore className="dropdown-icons" /> More
            </div>
            <FaChevronDown className="downIcons" />
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
      </ul>
    </aside>
  );
};

export default Sidebar;
