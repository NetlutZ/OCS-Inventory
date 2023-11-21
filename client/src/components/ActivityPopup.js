import React, { useState } from "react";

import "./ActivityPopup.css"

function ActivityPopup(props) {
    const toggleModal = () => {
        props.setTrigger(!props.trigger);
    };

    const tableData = [
        { image: 'image1.jpg', name: 'John Doe', id: '123' },
        { image: 'image2.jpg', name: 'Jane Smith', id: '456' }
    ];

    return (props.trigger) ? (
        <div>

            {props.trigger && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <div>

                            <h3>Activity ID : {props.activityID}</h3>
                            <h3>Date : {props.date}</h3>
                            <h3>Time : {props.time}</h3>
                            <h3>Activity ID : {props.userAction}</h3>
                        </div>
                        
                        <table >
                            <thead className='dashboard-table-header'>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>ID</th>
                                </tr>
                            </thead>
                            {tableData.map((row, index) => (
                                <tr className='dashboard-row' key={index}>
                                    <td style={{ width: '10%' }}>{row.image}</td>
                                    <td style={{ width: '10%' }}>{row.name}</td>
                                    <td style={{ width: '10%' }}>{row.id}</td>
                                </tr>
                            ))}
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
