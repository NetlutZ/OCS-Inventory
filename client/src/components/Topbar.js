import { React, useState, useEffect, useRef } from 'react';
import './Topbar.css';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { FaRegUser } from 'react-icons/fa';
import ocs from '../image/ocs kasetsart.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Badge from '@mui/material/Badge';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

function Topbar() {
  const Menus = ["Profile", "Logout"]
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef();
  useEffect(() => {
    const handler = (event) => {
      if (!menuRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);


    return () => {
      document.removeEventListener("mousedown", handler);
    };
  },);

  const navigate = useNavigate()
  const removeSession = () => {
    // console.log("logout")
    axios.get(`${process.env.REACT_APP_API}/logout`)
      .then((res) => {
        console.log(res)
        if (res.data.Logout) {
          navigate('/')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }


  return (
    <div className="TopbarContainer">
      <div className="Topbar">
        <div className="topbarContent">
          <div className="imageContainer">
            <img src={ocs} alt="OCS Kasetsart" className="imageStyle" />
            <span className="brandName">OCS INVENTORY</span>
          </div>
          <div className="rightIcons">
            {/* <IoIosNotificationsOutline className="notificationIcon" /> */}
            <Badge badgeContent={100} max={99} color="error" sx={{marginRight:"1rem"}}>
              <NotificationsNoneIcon  />
            </Badge>

            <div ref={menuRef}>
              <FaRegUser
                className="userIcon"
                onClick={() => setOpenMenu(!openMenu)}
              />
              <div className={`dropdown-user ${openMenu ? 'active' : 'inactive'}`}>
                <ul>
                  <Dropdown img="https://www.w3schools.com/howto/img_avatar.png" text="Profile" />
                  <Dropdown img="https://www.w3schools.com/howto/img_avatar.png" text="Logout" onClick={() => removeSession()} />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Dropdown(props) {
  return (
    <li className="dropdown-user-item" onClick={props.onClick}>
      <img src={props.img}></img>
      <a>{props.text}</a>

    </li>
  )
}

export default Topbar;
