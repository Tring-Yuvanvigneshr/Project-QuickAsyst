import Sidebar from "../Sidebar/Sidebarcomponent.jsx";
import Header from '../GlobalComponents/Headder/Headder.jsx';
import { Outlet } from "react-router-dom";
import "./mainlayout.css";

const MainLayout = () => {
  return (
    <div className="main-layout">
      <div className="sidebar">
        <Sidebar />
      </div>

      <div className="content">
        <Header />
        <div className="outlet-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
