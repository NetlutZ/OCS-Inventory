import React, { useState, useEffect } from "react";

import "./ActivityPopup.css"
import axios from 'axios';
import { set } from "date-fns";
import { FcCancel } from "react-icons/fc";
import { FcApproval } from "react-icons/fc";
import DataTable from 'react-data-table-component';
import * as ConstanceStrings from '../ConstanceString';

function ActivityPopup(props) {
    const toggleModal = () => {
        props.setTrigger(!props.trigger);
        setLoadData(false);
        // props.setItemOffset(props.itemOffset); 
    };

    // const tableData = [
    //     { image: 'image1.jpg', name: 'John Doe', id: '123' },
    //     { image: 'image2.jpg', name: 'Jane Smith', id: '456' }
    // ];

    // get device data from database from '/activity/:id'
    const [tableData, setTableData] = useState([]);
    const [loadData, setLoadData] = useState(false);
    // create array for keep response data from /device/:id 
    const [deviceData, setDeviceData] = useState([]);
    const listDeviceData = [];

    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/activity/${props.activityID}`);
            const deviceID = response.data.device;
            const listDeviceID = deviceID.split(',').map(id => parseInt(id.trim(), 10));

            const promises = listDeviceID.map(id =>
                axios.get(`${process.env.REACT_APP_API}/device/${id}`)
                    .then(response => response.data)
                    .catch(error => {
                        console.error('There was an error!', error);
                        return null;
                    })
            );

            const listDeviceData = await Promise.all(promises);
            setTableData(listDeviceData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    if (props.trigger && !loadData) {
        setLoadData(true);
        fetchData();
    }

    const changeDateFormat = (dateString) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const [year, month, day] = dateString.split('-');
        const monthIndex = parseInt(month, 10) - 1;
        const formattedDate = `${parseInt(day, 10)} ${months[monthIndex]} ${year}`;
        return formattedDate;
    };

    const customStyles = {
        headRow: {
            style: {
                backgroundColor: '#F9FAFB',
                color: 'black',
            },
        },
        headCells: {
            style: {
                fontWeight: '600',
                fontSize: '0.8rem',
                paddingLeft: '8px',
            },
        },
        cells: {
            style: {
                fontSize: '0.8rem',
                paddingLeft: '8px',
            },
        },
        rows: {
            style: {
                minHeight: '35px', // override the row height
            },
        },
    };

    const adminColumns = [
        {
            name: 'รูปภาพ',
            selector: (row) => (
                <img
                    src={`${process.env.REACT_APP_API}/device/image/${row.image}`}
                    alt="Image"
                    style={{ width: 'auto', height: '50px' }}
                />
            ),
            
        },
        { name: 'ชื่อ', selector: (row) => row.name },
        { name: 'หมายเลขสินทรัพย์ถาวร', selector: (row)=>row.assetNumber },
        {
            name: 'สถานะ',
            selector: (row) => row.rfidStatus === 'InStorage' ? <FcApproval /> : <FcCancel />,
        },
    ]

    const userColumns = [
        {
            name: 'รูปภาพ',
            selector: (row) => (
                <img
                    src={`${process.env.REACT_APP_API}/device/image/${row.image}`}
                    alt="Image"
                    style={{ width: 'auto', height: '50px' }}
                />),
        },
        { name: 'ชื่อ', selector: (row)=>row.name },
        {
            name: 'สถานะ',
            selector: (row) => row.rfidStatus === 'InStorage' ? <FcApproval /> : <FcCancel />,
        },
    ]
    
    const columns = props.userRole === ConstanceStrings.ADMIN ? adminColumns : userColumns;

    return props.trigger ? (
        <div className="modal-container">
            {props.trigger && (
                <div className="modal2" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <div>
                            <h3>Activity ID : {props.activityCode}</h3>
                            <h3>Date : {changeDateFormat(props.date)}</h3>
                            <h3>Time : {props.time}</h3>
                            <h3>{props.activityText}</h3>
                        </div>

                        <DataTable
                            columns={columns}
                            data={tableData}
                            pagination
                            customStyles={customStyles}
                            striped

                        />

                        <button className="close-modal" onClick={() => props.setTrigger(false)}>
                            CLOSE
                        </button>
                    </div>
                </div>
            )}
        </div>
    ) : '';

}

export default ActivityPopup
