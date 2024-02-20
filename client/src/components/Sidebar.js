import { React, useState, useEffect } from 'react';
import "./Sidebar.css";
import { SidebarData } from "./SidebarData"
import { BrowserRouter as Router, Route, Routes, Link, NavLink } from "react-router-dom"
import * as ConstanceStrings from '../ConstanceString';
import axios from 'axios';

function Sidebar() {
    const [userRole, setUserRole] = useState(ConstanceStrings.USER);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}`)
            .then((res) => {    
                setUserRole(res.data.role);
            })
            .catch((err) => {
                console.log(err);
            })

    }, []);
    return (
        <div className='sidenav'>
            <ul className='sidenav-list'>
                {SidebarData.map((val, key) => (
                    (userRole === ConstanceStrings.ADMIN || val.title !== 'AddDevice') && (
                        <nav key={key} id="sidebar">
                            <NavLink to={val.link} style={{ color: 'black', textDecoration: 'none' }} >
                                {({ isActive }) => (
                                    <li className={isActive ? 'sidenav-item-active' : 'sidenav-item'}>
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
                    )


                ))}

            </ul>

        </div>
    )
}

export default Sidebar
