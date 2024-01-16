import React from 'react'
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
const Layout = ({ children }) => {
    return (
        <div>
            <div>
                <Topbar />
            </div>
            <div className="layout">
                <div className="content">
                    {/* Content for the right div goes here */}
                    <div className="sidebar">
                        <Sidebar />
                    </div>
                    <div className="container-edit">
                        {children}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Layout
