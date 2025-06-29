import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
//
import { FaPenFancy } from "react-icons/fa6";
import { BiPurchaseTag } from "react-icons/bi";
import { AiOutlineProduct } from "react-icons/ai";
import { SiPagespeedinsights } from "react-icons/si";
import { CiSettings, CiCircleMore } from "react-icons/ci";
import { IoIosPricetags, IoMdPerson } from "react-icons/io";
import { FaMoneyBillWaveAlt, FaChevronDown } from "react-icons/fa";
import { TbReportAnalytics, TbBuildingWarehouse } from "react-icons/tb";
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
                <NavLink
                  to="/sales/invoice"
                  className={({ isActive }) =>
                    isActive ? "menu-items active" : "menu-items"
                  }
                >
                  Invoices
                </NavLink>
              </li>

              <li className="menuList">
                <NavLink
                  to="/sales/credit-note"
                  className={({ isActive }) =>
                    isActive ? "menu-items active" : "menu-items"
                  }
                >
                  Credit Note
                </NavLink>
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
                <NavLink
                  to="/sales/purchase"
                  className={({ isActive }) =>
                    isActive ? "menu-items active" : "menu-items"
                  }
                >
                  Purchase
                </NavLink>
              </li>

              <li className="menuList">
                <NavLink
                  to="/sales/purchase"
                  className={({ isActive }) =>
                    isActive ? "menu-items active" : "menu-items"
                  }
                >
                  Purchase Order
                </NavLink>
              </li>
              <li className="menuList">
                <NavLink
                  to="/sales/purchase"
                  className={({ isActive }) =>
                    isActive ? "menu-items active" : "menu-items"
                  }
                >
                  Debit Note
                </NavLink>
              </li>
            </ul>
          )}
        </li>
        {/* customer */}
        <li className="list-items">
          <NavLink
            to="/sales/invoice"
            className={({ isActive }) =>
              isActive ? "list-links active" : "list-links"
            }
          >
            <IoMdPerson className="dropdown-icons" /> Customers
          </NavLink>
        </li>
        {/* vendors */}
        <li className="list-items">
          <NavLink
            to="/sales/invoice"
            className={({ isActive }) =>
              isActive ? "list-links active" : "list-links"
            }
          >
            <MdOutlinePeople className="dropdown-icons" /> Vendors
          </NavLink>
        </li>

        {/* products */}
        <li className="list-items">
          <NavLink
            to="/sales/invoice"
            className={({ isActive }) =>
              isActive ? "list-links active" : "list-links"
            }
          >
            <AiOutlineProduct className="dropdown-icons" /> Products & Services
          </NavLink>
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
                <NavLink
                  to="/sales/purchase"
                  className={({ isActive }) =>
                    isActive ? "menu-items active" : "menu-items"
                  }
                >
                  Warehouse
                </NavLink>
              </li>
              <li className="menuList">
                <NavLink
                  to="/sales/purchase"
                  className={({ isActive }) =>
                    isActive ? "menu-items active" : "menu-items"
                  }
                >
                  Timeline
                </NavLink>
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
                <NavLink
                  to="/sales/purchase"
                  className={({ isActive }) =>
                    isActive ? "menu-items active" : "menu-items"
                  }
                >
                  Settlements
                </NavLink>
              </li>
              <li className="menuList">
                <NavLink
                  to="/sales/purchase"
                  className={({ isActive }) =>
                    isActive ? "menu-items active" : "menu-items"
                  }
                >
                  Timeline
                </NavLink>
              </li>
              <li className="menuList">
                <NavLink
                  to="/sales/purchase"
                  className={({ isActive }) =>
                    isActive ? "menu-items active" : "menu-items"
                  }
                >
                  Journals
                </NavLink>
              </li>
              <li className="menuList">
                <NavLink
                  to="/sales/purchase"
                  className={({ isActive }) =>
                    isActive ? "menu-items active" : "menu-items"
                  }
                >
                  Payment Links
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* insites */}
        <li className="list-items">
          <NavLink
            to="/sales/invoice"
            className={({ isActive }) =>
              isActive ? "list-links active" : "list-links"
            }
          >
            <SiPagespeedinsights className="dropdown-icons" /> Insites
          </NavLink>
        </li>
        {/* reports */}
        <li className="list-items">
          <NavLink
            to="/sales/invoice"
            className={({ isActive }) =>
              isActive ? "list-links active" : "list-links"
            }
          >
            <TbReportAnalytics className="dropdown-icons" /> Reports
          </NavLink>
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
                <NavLink
                  to="/sales/purchase"
                  className={({ isActive }) =>
                    isActive ? "menu-items active" : "menu-items"
                  }
                >
                  Quotation
                </NavLink>
              </li>
              <li className="menuList">
                <NavLink
                  to="/sales/purchase"
                  className={({ isActive }) =>
                    isActive ? "menu-items active" : "menu-items"
                  }
                >
                  Delivery Challan
                </NavLink>
              </li>
              <li className="menuList">
                <NavLink
                  to="/sales/purchase"
                  className={({ isActive }) =>
                    isActive ? "menu-items active" : "menu-items"
                  }
                >
                  Sales Order
                </NavLink>
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
                <NavLink
                  to="/sales/purchase"
                  className={({ isActive }) =>
                    isActive ? "menu-items active" : "menu-items"
                  }
                >
                  Expenses
                </NavLink>
              </li>
              <li className="menuList">
                <NavLink
                  to="/sales/purchase"
                  className={({ isActive }) =>
                    isActive ? "menu-items active" : "menu-items"
                  }
                >
                  Indirect Incomes
                </NavLink>
              </li>
            </ul>
          )}
        </li>
        {/* Online store */}

        <li className="list-items">
          {/* <Link to="/sales/invoice" className="list-links"> */}
          <NavLink
            to="/sales/invoice"
            className={({ isActive }) =>
              isActive ? "list-links active" : "list-links"
            }
          >
            <MdTrolley className="dropdown-icons" /> Online Store
          </NavLink>
        </li>
        {/* Settings */}
        <li className="list-items">
          <NavLink
            to="/sales/invoice"
            className={({ isActive }) =>
              isActive ? "list-links active" : "list-links"
            }
          >
            <CiSettings className="dropdown-icons" /> Settings
          </NavLink>
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
                <NavLink
                  to="/sales/purchase"
                  className={({ isActive }) =>
                    isActive ? "menu-items active" : "menu-items"
                  }
                >
                  My Drive
                </NavLink>
              </li>
              <li className="menuList">
                <NavLink
                  to="/sales/invoice"
                  className={({ isActive }) =>
                    isActive ? "menu-items active" : "menu-items"
                  }
                >
                  Tally
                </NavLink>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
