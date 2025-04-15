import Sidebar from "../Sidebar/Sidebar.jsx";
import Header from '../GlobalComponents/Header/Header.jsx';
import { Outlet } from "react-router-dom";
import "./mainlayout.css";

const MainLayout = () => {
  return (
    <div className="main-layout">
      <div className="sidebar">
        <Sidebar />
      </div>

      <div className="content" >
        <Header />
        <div className="outlet-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
