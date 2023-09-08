import SideBar from "./SideBar";
import { FaBars } from 'react-icons/fa';
import { useState } from "react";
import { Outlet } from "react-router-dom";
import "./Admin.scss";

const Admin = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className="admin-container">
            <div className="admin-sidebar"><SideBar collapsed={collapsed} /></div>
            <div className="admin-content">
                <div className="admin-header-content mx-2">
                    <FaBars onClick={() => setCollapsed(!collapsed)} />
                </div>

                <div className="admin-main-content"> <Outlet /></div>

            </div>

        </div>
    );
}

export default Admin;