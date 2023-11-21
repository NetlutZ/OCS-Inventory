import React from 'react';
import "./Sidebar.css";
import { SidebarData } from "./SidebarData"
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom"
function Sidebar() {
    return (
        <div className='sidenav'>
            <ul className='sidenav-list'>
                {SidebarData.map((val, key) => {
                    return (
                        <li key={key} className='sidenav-item' id={window.location.pathname == val.link ? "active":""} onClick={() => { window.location.pathname = val.link }}>
                            <div id="icon">{val.icon}</div>
                            <div id="title">{val.title}</div>
                        </li>
                    );
                })}

            </ul>
        </div>
    )
}

export default Sidebar
