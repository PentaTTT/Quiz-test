import SideBar from "./SideBar";
import { FaBars } from 'react-icons/fa';
import { useState } from "react";
import { Outlet } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import { NavDropdown } from 'react-bootstrap';

import "./Admin.scss";

const Admin = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className="admin-container">
            <div className="admin-sidebar"><SideBar collapsed={collapsed} /></div>
            <div className="admin-content">
                <div className="admin-header-content">
                    <span className="button" onClick={() => setCollapsed(!collapsed)} >
                        <FaBars />
                    </span>

                    <div className="dropdown">
                        <NavDropdown title={'username'} id="basic-nav-dropdown">
                            <NavDropdown.Item href="/login">Profile</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item>
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </div>

                </div>

                <div className="admin-main-content">
                    <PerfectScrollbar>
                        <Outlet />
                    </PerfectScrollbar>
                </div>

            </div>

        </div>
    );
}

export default Admin;