import React, { useState, useEffect } from "react";

import "./ActivityPopup.css"
import axios from 'axios';
import { set } from "date-fns";
import { FcCancel } from "react-icons/fc";
import { FcApproval } from "react-icons/fc";

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
            const response = await axios.get(`http://localhost:8080/activity/${props.activityID}`);
            const deviceID = response.data.device;
            const listDeviceID = deviceID.split(',').map(id => parseInt(id.trim(), 10));

            const promises = listDeviceID.map(id =>
                axios.get(`http://localhost:8080/device/${id}`)
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

    return (props.trigger) ? (
        <div>

            {props.trigger && (
                <div className="modal2">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <div>
                            <h3>Activity ID : {props.activityCode}</h3>
                            <h3>Date : {changeDateFormat(props.date)}</h3>
                            <h3>Time : {props.time}</h3>
                            <h3>{props.activityText}</h3>
                        </div>

                        <table >
                            <thead className='dashboard-table-header'>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>ID</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((row, index) => (
                                    <tr className='dashboard-row' key={index}>
                                        <td style={{ width: '10%' }}>{<img src={`http://localhost:8080/device/image/${row.image}`} alt="Image" style={{ width: 'auto', height: '50px' }} />}</td>
                                        <td style={{ width: '10%' }}>{row.name}</td>
                                        <td style={{ width: '10%' }}>{row.id}</td>
                                        <td style={{ width: '10%' }}>{row.rfidStatus === 'InStorage' ? <FcApproval /> : <FcCancel />}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button className="close-modal" onClick={() => props.setTrigger(false)}>
                            CLOSE
                        </button>
                    </div>
                </div>
            )}



        </div>
    ) : "";
}

export default ActivityPopup
