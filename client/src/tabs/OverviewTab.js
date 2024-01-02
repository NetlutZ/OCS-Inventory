import React from 'react'
import "./OverviewTab.css"
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { IconContext } from "react-icons";
import { CiSearch } from "react-icons/ci";
import { IoIosAdd } from "react-icons/io";
import axios from "axios";
import DataTable from 'react-data-table-component';

import Select from "react-select"
import { useState, useEffect } from 'react';


import DateRangeComp from '../components/DateRangeComp';
import { is } from 'date-fns/locale';
import Swal from "sweetalert2";
import InventoryPopup from '../components/InventoryPopup';
import { useLocation, useNavigate } from 'react-router-dom';
import { set } from 'date-fns';



function OverviewTab({ formData, setFormData, setTab }) {
    const [value, setValue] = useState(null);
    const [inventoryData, setInventoryData] = useState([]);
    const [filterInventoryData, setFilterInventoryData] = useState([]);
    const [selectedStatusOptions, setSelectedStatusOptions] = useState([]);
    const [selectedNameOptions, setSelectedNameOptions] = useState([]);
    const [selectedLocationOptions, setSelectedLocationOptions] = useState([]);
    const [statusOptions, setStatusOptions] = useState([]);
    const [nameOptions, setNameOptions] = useState([]);
    const [locationOptions, setLocationOptions] = useState([]);
    const [purchaseStDate, setPurchaseStDate] = useState("");
    const [purchaseEndDate, setPurchaseEndDate] = useState("");
    const [warrantyExpStDate, setWarrantyExpStDate] = useState("");
    const [warrantyExpEndDate, setWarrantyExpEndDate] = useState("");
    const [isFilter, setIsFilter] = useState(false);
    const [modal, setModal] = useState(false);
    const [deviceIdSelected, setDeviceIdSelected] = useState(null);

    const defaultStatus = JSON.parse(localStorage.getItem('selectedStatus'));
    const defaultName = JSON.parse(localStorage.getItem('selectedName'));
    const navigate = useNavigate();


    useEffect(() => {
        fetchInventoryData();
    }, []);


    useEffect(() => {
        const storedStatusState = localStorage.getItem('selectedStatus');
        const storedNameState = localStorage.getItem('selectedName');

        if (storedStatusState && inventoryData.length > 0) {
            const parsedState = JSON.parse(storedStatusState);
            setSelectedStatusOptions(parsedState);
            localStorage.removeItem('selectedStatus');
        }
        else if (storedNameState && inventoryData.length > 0) {
            const parsedState = JSON.parse(storedNameState);
            setSelectedNameOptions(parsedState);
            localStorage.removeItem('selectedName');
        }
    }, [inventoryData]);

    useEffect(() => {
        filterInventory();
    }, [purchaseStDate, purchaseEndDate, warrantyExpStDate, warrantyExpEndDate, isFilter, selectedNameOptions, selectedStatusOptions, selectedLocationOptions]);

    const fetchInventoryData = () => {
        axios.get(`${process.env.REACT_APP_API}/device`)
            .then(response => {
                setInventoryData(response.data);
                setFilterInventoryData(response.data);

                // Extract unique status options from inventoryData
                const statusOptions = [...new Set(response.data.map(item => item.rfidStatus))];
                const nameOptions = [...new Set(response.data.map(item => item.name))];
                const locationOptions = [...new Set(response.data.map(item => item.location))];

                // Map statusOptions to the format required by Select component
                const formattedStatusOptions = statusOptions.map(option => ({
                    value: option,
                    label: option,
                }));
                const formattedNameOptions = nameOptions.map(option => ({
                    value: option,
                    label: option,
                }));
                const formattedLocationOptions = locationOptions.map(option => ({
                    value: option,
                    label: option,
                }));

                setStatusOptions(formattedStatusOptions);
                setNameOptions(formattedNameOptions)
                setLocationOptions(formattedLocationOptions);
            })
            .catch(error => {
                console.error('Error fetching inventory data:', error);
            });
    };

    const filterInventory = () => {
        // console.log(statusOptions)
        const params = {
            name: selectedNameOptions.map(item => item.value),
            rfidStatus: selectedStatusOptions.map(item => item.value),
            location: selectedLocationOptions.map(item => item.value),

        }
        if (purchaseStDate && purchaseEndDate) {
            params.purchaseDate = purchaseStDate + "to" + purchaseEndDate
        }
        if (warrantyExpStDate && warrantyExpEndDate) {
            params.warrantyExpirationDate = warrantyExpStDate + "to" + warrantyExpEndDate
        }
        // console.log(params)

        axios.get(`${process.env.REACT_APP_API}/device`, { params }).then(result => {
            setFilterInventoryData(result.data)
        }).catch(error => {
            console.error('Error fetching inventory data:', error);
        });
    }

    const setPurchaseFilter = (stDate, endDate, isFilter) => {
        setPurchaseStDate(stDate);
        setPurchaseEndDate(endDate);
        setIsFilter(isFilter);
        // console.log("start date: " + stDate + " end date: " + endDate + " isFilter: " + isFilter);
        // filterInventory();

    };
    const setWarrantyExpFilter = (stDate, endDate, isFilter) => {
        setWarrantyExpStDate(stDate);
        setWarrantyExpEndDate(endDate);
        setIsFilter(isFilter);
        console.log("start date: " + stDate + " end date: " + endDate + " isFilter: " + isFilter);
        // filterInventory();
    };

    const deleteDevice = (row) => {
        const id = row.id;
        Swal.fire({
            title: `Are you sure to delete ${row.name}?`,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            width: '50rem',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${process.env.REACT_APP_API}/device/${id}`)
                    .then(response => {
                        // Remove deleted device from state

                        const updatedInventoryData = inventoryData.filter(item => item.id !== id);
                        console.log(updatedInventoryData)
                        setInventoryData(updatedInventoryData);
                        setFilterInventoryData(updatedInventoryData);
                    })
                    .catch(error => {
                        // Handle error deleting device
                        console.error('Error deleting device:', error);
                    });

                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        })
    }

    const searchFilter = (e) => {
        const searchData = inventoryData.filter((row) =>
            row.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
            row.rfidStatus.toLowerCase().includes(e.target.value.toLowerCase()) ||
            row.rfid.toLowerCase().includes(e.target.value.toLowerCase()) ||
            row.purchaseDate.toLowerCase().includes(e.target.value.toLowerCase()) ||
            row.warrantyExpirationDate.toLowerCase().includes(e.target.value.toLowerCase()) ||
            row.location.toLowerCase().includes(e.target.value.toLowerCase()) ||
            row.serialNumber.toLowerCase().includes(e.target.value.toLowerCase())
        );

        setFilterInventoryData(searchData);
    };

    const handleRowClick = (row) => {
        console.log('Clicked row:', row);
        // setModal(true);
        // setDeviceIdSelected(row.id);

        //get device data from id and set to formData
        axios.get(`${process.env.REACT_APP_API}/device/${row.id}`)
            .then(response => {
                // replace null values with empty string
                const transformedData = transformData(response.data);
                console.log(transformedData);

                //for loop in transformedData and set "" to null
                // for (const key in transformedData) {
                //     if (transformedData[key] === "") {
                //         transformedData[key] = null;
                //     }
                // }

                // if (transformedData["lastScan"] === ""){
                //     transformedData["lastScan"] = null;
                // }
                // if(transformedData["purchaseDate"] === ""){
                //     transformedData["purchaseDate"] = null;
                // }
                // if(transformedData["warrantyExpirationDate"] === ""){
                //     transformedData["warrantyExpirationDate"] = null;
                // }
                // if(transformedData["activityId"] === ""){
                //     transformedData["activityId"] = null;
                // }
                // if(transformedData["lastMaintenanceDate"] === ""){
                //     transformedData["lastMaintenanceDate"] = null;
                // }
                // if(transformedData["nextMaintenanceDate"] === ""){
                //     transformedData["nextMaintenanceDate"] = null;
                // }
                // if(transformedData["policyExpirationDate"] === ""){
                //     transformedData["policyExpirationDate"] = null;
                // }
                // if(transformedData["lastCostUpdate"] === ""){
                //     transformedData["lastCostUpdate"] = null;
                // }
                // if(transformedData["insuranceDate1"] === ""){
                //     transformedData["insuranceDate1"] = null;
                // }
                // if(transformedData["insuranceDate2"] === ""){
                //     transformedData["insuranceDate2"] = null;
                // }
                // if(transformedData["physicalInventory"] === ""){
                //     transformedData["physicalInventory"] = null;
                // }
                // if(transformedData["quantity"] === ""){
                //     transformedData["quantity"] = 0;
                // }
                // if(transformedData["policyAmount"] === ""){
                //     transformedData["policyAmount"] = 0;
                // }
                // if(transformedData["insuranceValue"] === ""){
                //     transformedData["insuranceValue"] = 0;
                // }
                // if(transformedData["replacementCost"] === ""){
                //     transformedData["replacementCost"] = 0;
                // }
                

                setFormData(transformedData);

            })
            .catch(error => {
                console.error('Error fetching device data:', error);
            });
        setTab(1);


    };

    const transformData = (data) => {
        const transformed = {};
        for (const key in data) {
            if (data[key] === null) {
                transformed[key] = typeof data[key] === 'number' ? 0 : "";
            } else {
                transformed[key] = data[key]; // Keep the original value if not null
            }
        }
        return transformed;
    };

    const limitText = (text, limit) => {
        if(!text) return text;
        
        if (text.length > limit) {
            const chunks = [];
            while (text.length > 0) {
                chunks.push(text.slice(0, limit));
                text = text.slice(limit);
            }
            return chunks.join('\n'); // Force text onto a new line after each chunk
        }
        return text;
    };

    const changeDateFormat = (dateString) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        if(!dateString){
            return dateString;
        } 
        const [year, month, day] = dateString.split('-');
        const monthIndex = parseInt(month, 10) - 1;
        const formattedDate = `${parseInt(day, 10)} ${months[monthIndex]} ${year}`;
        return formattedDate;
    };

    const columns = [
        {
            name: 'Image',
            selector: (row) => <img src={`${process.env.REACT_APP_API}/device/image/${row.image}`} alt="Image" style={{ width: 'auto', height: '50px' }} />,
            sortable: true,
        },
        {
            name: 'Name',
            selector: (row) => limitText(row.name, 20),
            sortable: true,
        },
        {
            name: 'Status',
            selector: (row) => (
                <div style={{ width: '100%', height: '100%', display: 'flex' }}>
                    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                        <div className="status" id={'status' + row.rfidStatus}>{row.rfidStatus}</div>
                    </div>
                </div>
            ),
            sortable: true,
        },
        {
            name: 'RFID',
            selector: (row) => row.rfid,
            sortable: true,
        },
        {
            name: 'Purchase Date',
            selector: (row) => changeDateFormat(row.purchaseDate),
            sortable: true,
        },
        {
            name: 'Warranty Expire',
            selector: (row) => changeDateFormat(row.warrantyExpirationDate),
            sortable: true,
        },
        {
            name: 'Location',
            selector: (row) => row.location,
            sortable: true,

        },
        {
            name: 'Serial Number',
            selector: (row) => row.serialNumber,
            sortable: true,

        },
        {
            name: 'Action',
            selector: (row) => (
                <>
                    <FaRegEdit color="#667085" fontSize="1em" style={{ paddingRight: '5px', cursor: 'pointer' }} />
                    <RiDeleteBinLine color="#f97066" fontSize="1em" onClick={() => deleteDevice(row)} style={{ cursor: 'pointer' }} />
                </>
            ),
        },
    ];

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
                fontSize: '1rem'
            },
        },
        cells: {
            style: {
                fontSize: '18px',
            },
        },
    };

    const gotoAddDevice = () => {
        navigate("/AddDevice")
    }

    return (
        <div>
            {/* create search box */}
            <div className='option'>

                <div className='first-row'>
                    <div className="input-wrapper">
                        <CiSearch id="search-icon" />
                        <input type="text" placeholder="Search" onChange={searchFilter} />
                    </div>

                    {/* <div className='add-device-button' > */}
                    <button className="addDevice" onClick={gotoAddDevice}> <IoIosAdd id="add-icon" /> Add Device</button>
                    {/* </div> */}
                </div>

                <div className='second-row'>
                    <Select className='filter-select'
                        placeholder="Name"
                        options={nameOptions}
                        onChange={(optionSelected) => {
                            setSelectedNameOptions(optionSelected);
                        }}
                        isMulti
                        isSearchable
                        noOptionsMessage={() => "not found"}
                        defaultValue={defaultName}></Select>
                    <Select className='filter-select'
                        placeholder="Status"
                        options={statusOptions}
                        onChange={(optionSelected) => {
                            setSelectedStatusOptions(optionSelected);
                        }}
                        isMulti
                        isSearchable
                        noOptionsMessage={() => "not found"}
                        defaultValue={defaultStatus}></Select>
                    <Select className='filter-select'
                        placeholder="Location"
                        options={locationOptions}
                        defaultValue={value}
                        onChange={(optionSelected) => {
                            setSelectedLocationOptions(optionSelected);
                        }}
                        isMulti
                        isSearchable
                        noOptionsMessage={() => "not found"}></Select>

                    <div className='filter-select'> {/* Wrap DateRangeComp in a div */}
                        <DateRangeComp parentCallback={setPurchaseFilter} placeholder="Purchase Date" />
                    </div>
                    <div className='filter-select'> {/* Wrap DateRangeComp in a div */}
                        <DateRangeComp parentCallback={setWarrantyExpFilter} placeholder="Warranty Expiration Date" />
                    </div>
                </div>

            </div>

            <DataTable
                columns={columns}
                data={filterInventoryData}
                pagination
                highlightOnHover
                // responsive
                // striped
                customStyles={customStyles}
                onRowClicked={handleRowClick}
                paginationRowsPerPageOptions={[5, 10]}
                pointerOnHover
            />

            {/* <div>
                <InventoryPopup
                    trigger={modal}
                    setTrigger={(value) => setModal(value)}
                    deviceID={deviceIdSelected}
                >
                </InventoryPopup>
            </div> */}

        </div>
    )

}

export default OverviewTab
