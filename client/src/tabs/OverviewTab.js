import React from 'react'
import "./OverviewTab.css"
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { IconContext } from "react-icons";
import { CiSearch } from "react-icons/ci";
import { IoIosAdd, IoMdClose  } from "react-icons/io";
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

import * as ConstanceStrings from '../ConstanceString';

function OverviewTab({ formData, setFormData, setTab, setOpenTab }) {
    axios.defaults.withCredentials = true
    const [value, setValue] = useState(null);
    const [inventoryData, setInventoryData] = useState([]);
    const [filterInventoryData, setFilterInventoryData] = useState([]);
    const [selectedStatusOptions, setSelectedStatusOptions] = useState([]);
    const [selectedNameOptions, setSelectedNameOptions] = useState([]);
    const [selectedLocationOptions, setSelectedLocationOptions] = useState([]);
    const [selectedAssetGroupOptions, setSelectedAssetGroupOptions] = useState([]);
    const [statusOptions, setStatusOptions] = useState([]);
    const [nameOptions, setNameOptions] = useState([]);
    const [locationOptions, setLocationOptions] = useState([]);
    const [purchaseStDate, setPurchaseStDate] = useState("");
    const [purchaseEndDate, setPurchaseEndDate] = useState("");
    const [assetGroupOptions, setAssetGroupOptions] = useState([]);
    const [isFilter, setIsFilter] = useState(false);
    const [userRole, setUserRole] = useState(null);

    const defaultStatus = JSON.parse(localStorage.getItem('selectedStatus'));
    const defaultName = JSON.parse(localStorage.getItem('selectedName'));
    const navigate = useNavigate();

    const [searchText, setSearchText] = useState('');


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}`)
            .then((res) => {
                setUserRole(res.data.role);
            })
            .catch((err) => {
                console.log(err)
            });
    }, []);

    // Fetch Data for Set Select Option
    useEffect(() => {
        fetchInventoryData();
    }, [userRole]);

    // Set Select Option when Click from Dashboard
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

    const fetchInventoryData = () => {
        const params = {}
        if (userRole === ConstanceStrings.USER) {
            params.rfidStatus = "InStorage"
        }
        if (userRole !== null) {
            axios.get(`${process.env.REACT_APP_API}/device`, { params })
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
        }
    };

    useEffect(() => {
        filterInventory();
    }, [purchaseStDate, purchaseEndDate, isFilter, selectedNameOptions, selectedStatusOptions, selectedLocationOptions, selectedAssetGroupOptions, searchText]);

    const filterInventory = () => {
        const params = {
            name: selectedNameOptions.map(item => item.value),
            rfidStatus: selectedStatusOptions.map(item => item.value),
            location: selectedLocationOptions.map(item => item.value),
            assetGroup: selectedAssetGroupOptions.map(item => item.value),

        }
        if (purchaseStDate && purchaseEndDate) {
            params.purchaseDate = purchaseStDate + "to" + purchaseEndDate
        }

        if (userRole === ConstanceStrings.USER) {
            params.rfidStatus = "InStorage"
        }
        if (userRole !== null) {
            axios.get(`${process.env.REACT_APP_API}/device`, { params }).then(result => {

                const filterData = result.data.filter((row) => {
                    const lowerCaseName = row.name ? row.name.toLowerCase() : '';
                    const lowerCaseRfidStatus = row.rfidStatus ? row.rfidStatus.toLowerCase() : '';
                    const lowerCaseRfid = row.rfid ? row.rfid.toLowerCase() : '';
                    const lowerCasePurchaseDate = row.purchaseDate ? row.purchaseDate.toLowerCase() : '';
                    const lowerCaseLocation = row.location ? row.location.toLowerCase() : '';
                    const lowerCaseSerialNumber = row.serialNumber ? row.serialNumber.toLowerCase() : '';
                    const lowerCaseAssetNumber = row.assetNumber ? row.assetNumber.toLowerCase() : '';
                    const lowerCaseResponsiblePerson = row.responsiblePerson ? row.responsiblePerson.toLowerCase() : '';
                    const lowerCaseAssetGroup = row.assetGroup ? row.assetGroup.toLowerCase() : '';

                    return (
                        lowerCaseName.includes(searchText) ||
                        lowerCaseRfidStatus.includes(searchText) ||
                        lowerCaseRfid.includes(searchText) ||
                        lowerCasePurchaseDate.includes(searchText) ||
                        lowerCaseLocation.includes(searchText) ||
                        lowerCaseSerialNumber.includes(searchText) ||
                        lowerCaseAssetNumber.includes(searchText) ||
                        lowerCaseResponsiblePerson.includes(searchText) ||
                        lowerCaseAssetGroup.includes(searchText)
                    );
                });

                setFilterInventoryData(filterData)
            }).catch(error => {
                console.error('Error fetching inventory data:', error);
            });
        }
    }

    const setPurchaseFilter = (stDate, endDate, isFilter) => {
        setPurchaseStDate(stDate);
        setPurchaseEndDate(endDate);
        setIsFilter(isFilter);
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
        const searchTerm = e.target.value.toLowerCase();
        setSearchText(searchTerm);


        // const searchData = inventoryData.filter((row) => {
        //     const lowerCaseName = row.name ? row.name.toLowerCase() : '';
        //     const lowerCaseRfidStatus = row.rfidStatus ? row.rfidStatus.toLowerCase() : '';
        //     const lowerCaseRfid = row.rfid ? row.rfid.toLowerCase() : '';
        //     const lowerCasePurchaseDate = row.purchaseDate ? row.purchaseDate.toLowerCase() : '';
        //     const lowerCaseLocation = row.location ? row.location.toLowerCase() : '';
        //     const lowerCaseSerialNumber = row.serialNumber ? row.serialNumber.toLowerCase() : '';
        //     const lowerCaseAssetNumber = row.assetNumber ? row.assetNumber.toLowerCase() : '';
        //     const lowerCaseResponsiblePerson = row.responsiblePerson ? row.responsiblePerson.toLowerCase() : '';
        //     const lowerCaseAssetGroup = row.assetGroup ? row.assetGroup.toLowerCase() : '';

        //     return (
        //         lowerCaseName.includes(searchTerm) ||
        //         lowerCaseRfidStatus.includes(searchTerm) ||
        //         lowerCaseRfid.includes(searchTerm) ||
        //         lowerCasePurchaseDate.includes(searchTerm) ||
        //         lowerCaseLocation.includes(searchTerm) ||
        //         lowerCaseSerialNumber.includes(searchTerm) ||
        //         lowerCaseAssetNumber.includes(searchTerm) ||
        //         lowerCaseResponsiblePerson.includes(searchTerm) ||
        //         lowerCaseAssetGroup.includes(searchTerm)
        //     );
        // });

        // setFilterInventoryData(searchData);
    };

    const clearSearch = () => {
        setSearchText('');
    };

    const handleRowClick = (row) => {
        setOpenTab(true);
        console.log('Clicked row:', row);

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

                // Fix show date when click device
                if (transformedData["lastScan"] === "") {
                    transformedData["lastScan"] = null;
                }
                if (transformedData["purchaseDate"] === "") {
                    transformedData["purchaseDate"] = null;
                }
                if (transformedData["warrantyExpirationDate"] === "") {
                    transformedData["warrantyExpirationDate"] = null;
                }
                if (transformedData["activityId"] === "") {
                    transformedData["activityId"] = null;
                }
                if (transformedData["userId"] === "") {
                    transformedData["userId"] = null;
                }
                if (transformedData["returnDate"] === "") {
                    transformedData["returnDate"] = null;
                }
                if (transformedData["lastMaintenanceDate"] === "") {
                    transformedData["lastMaintenanceDate"] = null;
                }
                if (transformedData["nextMaintenanceDate"] === "") {
                    transformedData["nextMaintenanceDate"] = null;
                }
                if (transformedData["policyExpirationDate"] === "") {
                    transformedData["policyExpirationDate"] = null;
                }
                if (transformedData["lastCostUpdate"] === "") {
                    transformedData["lastCostUpdate"] = null;
                }
                if (transformedData["insuranceDate1"] === "") {
                    transformedData["insuranceDate1"] = null;
                }
                if (transformedData["insuranceDate2"] === "") {
                    transformedData["insuranceDate2"] = null;
                }
                if (transformedData["physicalInventory"] === "") {
                    transformedData["physicalInventory"] = null;
                }

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
        if (!text) return text;

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
        if (!dateString) {
            return dateString;
        }
        const [year, month, day] = dateString.split('-');
        const monthIndex = parseInt(month, 10) - 1;
        const formattedDate = `${parseInt(day, 10)} ${months[monthIndex]} ${year}`;
        return formattedDate;
    };

    let columns = [
        {
            name: 'รูปภาพ',
            selector: (row) => <img src={`${process.env.REACT_APP_API}/device/image/${row.image}`} alt="Image" style={{ width: 'auto', height: '30px' }} />,
            width: '7%',
        },
        {
            name: 'กลุ่มสินทรัพย์ถาวร',
            selector: (row) => row.assetGroup,
            sortable: true,
            width: '10%',
        },
        {
            name: 'หมายเลขสินทรัพย์ถาวร',
            selector: (row) => row.assetNumber,
            sortable: true,
            width: '15%',

        },
        {
            name: 'ชื่อ',
            selector: (row) => row.name,
            sortable: true,
            width: '15%',
        },
        {
            name: 'สถานะ',
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
            name: 'ยืมโดย',
            selector: (row) => row.userId ? row.User.username : "-",
            sortable: true,
        },
        {
            name: 'วันที่ซื้อ',
            selector: (row) => changeDateFormat(row.purchaseDate),
            sortable: true,
        },
        {
            name: 'ตำแหน่งที่เก็บ',
            selector: (row) => row.location,
            sortable: true,
            width: '13%',
        },
        {
            name: 'RFID',
            selector: (row) => row.rfid,
            sortable: true,
        },
        {
            name: 'ผู้รับผิดชอบ',
            selector: (row) => row.responsiblePerson,
            sortable: true,
            width: '8%',

        },
        {
            name: 'Action',
            selector: (row) => (
                <>
                    {/* <FaRegEdit color="#667085" fontSize="1em" style={{ paddingRight: '5px', cursor: 'pointer' }} /> */}
                    <RiDeleteBinLine color="#f97066" fontSize="1em" onClick={() => deleteDevice(row)} style={{ cursor: 'pointer' }} />
                </>
            ),
            width: '5%',
            center: true,
        },
    ];

    if (userRole === ConstanceStrings.USER) {
        columns = [
            {
                name: 'รูปภาพ',
                selector: (row) => <img src={`${process.env.REACT_APP_API}/device/image/${row.image}`} alt="Image" style={{ width: 'auto', height: '30px' }} />,
            },
            {
                name: 'ชื่อ',
                selector: (row) => row.name,
                sortable: true,
            },
            {
                name: 'สถานะ',
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
                name: 'ตำแหน่งที่เก็บ',
                selector: (row) => row.location,
                sortable: true,

            },
        ];

    }

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

    const gotoAddDevice = () => {
        navigate("/AddDevice")
    }

    const nothing = () => {
    }

    const ExpandedComponent = ({ data }) => {
        return data ? (
            <>
                {/* table have 2 column label and value */}
                <table className="expanded-table">
                    <tbody>
                        <tr>
                            <td className="label">กลุ่มสินทรัพย์ถาวร</td>
                            <td className="value">{data.assetGroup}</td>
                        </tr>
                        <tr>
                            <td className="label">หมายเลขสินทรัพย์ถาวร</td>
                            <td className="value">{data.assetNumber}</td>
                        </tr>
                        <tr>
                            <td className="label">ชื่อ</td>
                            <td className="value">{data.name}</td>
                        </tr>
                        <tr>
                            <td className="label">สถานที่เก็บ</td>
                            <td className="value">{data.location}</td>
                        </tr>
                        <tr>
                            <td className="label">RFID</td>
                            <td className="value">{data.rfid}</td>
                        </tr>
                        <tr>
                            <td className="label">ผู้รับผิดชอบ</td>
                            <td className="value">{data.responsiblePerson}</td>
                        </tr>
                    </tbody>
                </table>
            </>
        ) : (
            <>

            </>
        );

    };

    return (
        <div>
            {/* create search box */}
            <div className='option'>

                <div className='first-row'>
                    <div className="input-wrapper">
                        <CiSearch id="search-icon" />
                        <input type="text" placeholder="Search" onChange={searchFilter}  value={searchText}/>
                        {searchText && (
                            <div className="clear-icon" onClick={clearSearch}>
                                <IoMdClose color='gray'/>
                            </div>
                        )}
                    </div>

                    {userRole === ConstanceStrings.ADMIN ?
                        <>
                            <button className="addDevice" onClick={gotoAddDevice}> <IoIosAdd id="add-icon" /> Add Device</button>
                        </> : <></>}
                </div>

                <div className='second-row'>
                    {userRole === ConstanceStrings.ADMIN ?
                        <>
                            <Select className='filter-select'
                                placeholder="กลุ่มสินทรัพย์ถาวร"
                                options={assetGroupOptions}
                                onChange={(optionSelected) => {
                                    setSelectedAssetGroupOptions(optionSelected);
                                }}
                                isMulti
                                isSearchable
                                noOptionsMessage={() => "not found"}
                                defaultValue={value}
                            ></Select>
                        </>
                        : <></>}
                    <Select className='filter-select'
                        placeholder="ชื่อ"
                        options={nameOptions}
                        onChange={(optionSelected) => {
                            setSelectedNameOptions(optionSelected);
                        }}
                        isMulti
                        isSearchable
                        noOptionsMessage={() => "not found"}
                        defaultValue={defaultName}

                    ></Select>
                    <Select className='filter-select'
                        placeholder="สถานะ"
                        options={statusOptions}
                        onChange={(optionSelected) => {
                            setSelectedStatusOptions(optionSelected);
                        }}
                        isMulti
                        isSearchable
                        noOptionsMessage={() => "not found"}
                        defaultValue={defaultStatus}></Select>
                    <Select className='filter-select'
                        placeholder="ตำแหน่งที่เก็บ"
                        options={locationOptions}
                        defaultValue={value}
                        onChange={(optionSelected) => {
                            setSelectedLocationOptions(optionSelected);
                        }}
                        isMulti
                        isSearchable
                        noOptionsMessage={() => "not found"}></Select>

                    {userRole === ConstanceStrings.ADMIN ?
                        <>
                            <div className='filter-select'> {/* Wrap DateRangeComp in a div */}
                                <DateRangeComp parentCallback={setPurchaseFilter} placeholder="วันที่ซื้อ" />
                            </div>
                        </>
                        : <></>}

                </div>

            </div>

            <DataTable
                columns={columns}
                data={filterInventoryData}
                pagination
                highlightOnHover
                // responsive
                striped
                customStyles={customStyles}
                onRowClicked={userRole === ConstanceStrings.ADMIN ? handleRowClick : nothing}
                paginationRowsPerPageOptions={[5, 10]}
                pointerOnHover
            // expandableRows
            // expandableRowsComponent={ExpandedComponent}
            // dense
            />

        </div>
    )

}

export default OverviewTab
