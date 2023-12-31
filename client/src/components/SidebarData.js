import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import { LuBox } from "react-icons/lu";
import { LuHome } from "react-icons/lu";
import { MdOutlineAccessTime } from "react-icons/md";
import { MdOutlineAddBox } from "react-icons/md";
import { CiSettings } from "react-icons/ci";


export const SidebarData = [
    {
        title:"Dashboard",
        icon:<LuHome/>,
        link:"/Dashboard"
    },
    {
        title:"Inventory",
        icon:<LuBox />,
        link:"/Inventory"
    },
    {
        title:"Activity",
        icon:<MdOutlineAccessTime/>,
        link:"/Activity"
    },
    {
        title:"AddDevice",
        icon:<MdOutlineAddBox/>,
        link:"/AddDevice"
    },
    {
        title:"Settings",
        icon:<CiSettings/>,
        link:"/Settings"
    },
    {
        title:"Test",
        link:"/Test"
    },
]
