import Sidebar from "../Sidebar/Sidebarcomponent.jsx";
import Headder from '../GlobalComponents/Headder/Headder/Headder.jsx';
import { Outlet } from "react-router-dom";
import "./mainlayout.css"; 

const MainLayout = () => {
    return (
        <div className="main-layout">
            <div className="sidebar">
                <Sidebar />
            </div>

            <div className="content">
                <Headder />
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;
