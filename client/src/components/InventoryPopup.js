import React, { useState } from 'react'
import "./ActivityPopup.css"
import "./InventoryPopup.css"
import axios from 'axios';

function InventoryPopup(props) {
    const [deviceData, setDeviceData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const toggleModal = () => {
        setIsLoading(false);
        setDeviceData(null);
        props.setTrigger(!props.trigger);
    };

    if (props.trigger && deviceData === null) {
        axios.get(`http://localhost:8080/device/${props.deviceID}`)
            .then(response => {
                setDeviceData(response.data);
                setIsLoading(true);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const changeDateFormat = (dateString) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const [year, month, day] = dateString.split('-');
        const monthIndex = parseInt(month, 10) - 1;
        const formattedDate = `${parseInt(day, 10)} ${months[monthIndex]} ${year}`;
        return formattedDate;
    };

    return (props.trigger && isLoading) ? (
        <div>
            {props.trigger && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <div style={{ display: 'flex', borderBottom: "solid 5px #D0D5DD" }}>
                            <div style={{ marginRight: "10px" }}>
                                <img src={1} alt="Image" style={{ width: '50px', height: '50px' }} />,
                            </div>

                            <div>
                                <h3 style={{ lineHeight: "0px" }}>{props.deviceID}</h3>
                                <h3 >{deviceData.name}</h3>
                            </div>
                        </div>

                        <div>
                            <table>
                                <tbody>
                                    <tr className='row-data' >
                                        <td><h3 className='header-text'>Purchase Date :</h3></td>
                                        <td><h3>{changeDateFormat(deviceData.purchaseDate)}</h3></td>
                                    </tr>
                                    <tr className='row-data'>
                                        <td style={{ paddingRight: "70px" }}><h3 className='header-text'>Warranty Expiry Date :</h3></td>
                                        <td><h3>{changeDateFormat(deviceData.warrantyExpirationDate)}</h3></td>
                                    </tr>
                                    <tr className='row-data'>
                                        <td><h3 className='header-text'>Device Status :</h3></td>
                                        <td><h3>{deviceData.status}</h3></td>
                                    </tr>
                                    <tr className='row-data'>
                                        <td><h3 className='header-text'>Device Location :</h3></td>
                                        <td><h3>{deviceData.location}</h3></td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>

                        <button className="close-modal" onClick={() => props.setTrigger(false)}>
                            CLOSE
                        </button>
                    </div>
                </div>
            )}
        </div>
    ) : "";
}

export default InventoryPopup
