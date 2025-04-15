import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/icons/QuickAsystWideIcon.png";
import Dashboard_icon from './../../assets/images/Sidebar/Vector.png';
import Ticket_icon from './../../assets/images/Sidebar/Ticket.png';
import user_icon from './../../assets/images/Sidebar/Users.png';
import collapse_icon from '../../assets/icons/QuickAsystLogosidebar.svg';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import "./sidebar.css";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`custom-sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="custom-sidebar-content">
        <div className="sidebar-logo">
          <img src={isCollapsed ? collapse_icon : logo} alt="logo" />
        </div>

        <Link
          to="/dashboard"
          className={`Sidebar-item ${location.pathname === "/dashboard" ? "active" : ""}`}
        >
          <img src={Dashboard_icon} alt="Dashboard" className="menu-icon" />
          {!isCollapsed && <span className="menu-text">Dashboard</span>}
        </Link>

        <Link
          to="/tickets"
          className={`Sidebar-item ${location.pathname === "/tickets" ? "active" : ""}`}
        >
          <img src={Ticket_icon} alt="Tickets" className="menu-icon" />
          {!isCollapsed && <span className="menu-text">Tickets</span>}
        </Link>

        <Link
          to="/users"
          className={`Sidebar-item ${location.pathname === "/users" ? "active" : ""}`}
        >
          <img src={user_icon} alt="Users" className="menu-icon" />
          {!isCollapsed && <span className="menu-text">Users</span>}
        </Link>
      </div>

      <button className="collapse-btn" onClick={toggleSidebar}>
        {isCollapsed ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />}
      </button>
    </div>
  );
};

export default Sidebar;
