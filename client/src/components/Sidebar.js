import React from 'react';
import "./Sidebar.css";
import { SidebarData } from "./SidebarData"
import {BrowserRouter as Router, Route, Routes, Link, NavLink} from "react-router-dom"
function Sidebar() {
    return (
        <div className='sidenav'>
            <ul className='sidenav-list'>
                {SidebarData.map((val, key) => (
                    <nav id="sidebar">
                        <NavLink to={val.link} activeClassName='active-link' >
                        {({ isActive }) => (
                            <li key={key} className={isActive ? 'sidenav-item-active' : 'sidenav-item'}>
                                <div id='icon'>{val.icon}</div>
                                <div id='title'>{val.title}</div>
                            </li>
                        )}
                            {/* <li key={key} className='sidenav-item'>
                                <div id='icon'>{val.icon}</div>
                                <div id='title'>{val.title}</div>
                            </li> */}
                        </NavLink>
                    </nav>


                ))}

            </ul>

        </div>
    )
}

export default Sidebar
