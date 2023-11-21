import React from 'react';
import './Topbar.css';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { FaRegUser } from 'react-icons/fa';
import ocs from '../image/ocs kasetsart.png';

function Topbar() {
  return (
    <div className="TopbarContainer">
      <div className="Topbar">
        <div className="topbarContent">
          <div className="imageContainer">
            <img src={ocs} alt="OCS Kasetsart" className="imageStyle" />
            <span className="brandName">OCS INVENTORY</span>
          </div>
          <div className="rightIcons">
            <IoIosNotificationsOutline className="notificationIcon" />
            <FaRegUser className="userIcon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
