import React from 'react'
import "./Inventory.css"
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

class Inventory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null,
      inventoryData: [],
      filterInventoryData: [],
      count: 0,
      selectedStatusOptions: [],
      selectedNameOptions: [],
      selectedLocationOptions: [],

      statusOptions: [],
      nameOptions: [],
      locationOptions: [],

      purchaseStDate: "",
      purchaseEndDate: "",

      warrantyExpStDate: "",
      warrantyExpEndDate: "",

      isFilter: false,
      modal: false,

      deviceIdSelected: null,
    };
  }

  componentDidMount() {
    this.fetchInventoryData();
  }

  fetchInventoryData = () => {
    // Fetch inventory data from API and set in state
    axios.get('http://localhost:8080/device')
      .then(response => {
        // Assuming response.data contains inventory items
        this.setState({ inventoryData: response.data });
        this.setState({ filterInventoryData: response.data });

        // Extract unique status options from inventoryData
        const statusOptions = [...new Set(response.data.map(item => item.status))];
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

        // Set formatted status options in state
        this.setState({
          statusOptions: formattedStatusOptions,
          nameOptions: formattedNameOptions,
          locationOptions: formattedLocationOptions,
        });
      })
      .catch(error => {
        // Handle error fetching inventory data
        console.error('Error fetching inventory data:', error);
      });
  };

  filterInventory = () => {
    if (this.state.selectedStatusOptions.length === 0 && this.state.selectedNameOptions.length === 0 && this.state.selectedLocationOptions.length === 0 && !this.state.purchaseStDate && !this.state.warrantyExpStDate) {
      this.setState({ filterInventoryData: this.state.inventoryData });
    }
    else {
      const statusSelected = this.state.selectedStatusOptions.map(option => option.value);
      const nameSelected = this.state.selectedNameOptions.map(option => option.value);
      const locationSelected = this.state.selectedLocationOptions.map(option => option.value);

      console.log("statusSelected:" + statusSelected)
      const filteredData = this.state.inventoryData.filter(item => {
        const statusMatch =
          statusSelected.length === 0 ||
          statusSelected.some(status => item.status.includes(status));

        const nameMatch =
          nameSelected.length === 0 ||
          nameSelected.some(name => item.name.includes(name));

        const locationMatch =
          locationSelected.length === 0 ||
          locationSelected.some(location => item.location.includes(location));

        const purchasedateMatch =
          (!this.state.purchaseStDate || item.purchaseDate >= this.state.purchaseStDate) &&
          (!this.state.purchaseEndDate || item.purchaseDate <= this.state.purchaseEndDate);

        const warrantyExpMatch =
          (!this.state.warrantyExpStDate || item.warrantyExpirationDate >= this.state.warrantyExpStDate) &&
          (!this.state.warrantyExpEndDate || item.warrantyExpirationDate <= this.state.warrantyExpEndDate);

        return statusMatch && nameMatch && locationMatch && purchasedateMatch && warrantyExpMatch;
      });

      // Update state with filtered data
      this.setState({ filterInventoryData: filteredData });
    }
  }

  setPurchaseFilter = (startDate, purchaseEndDate, isFilter) => {
    this.setState({ purchaseStDate: startDate, purchaseEndDate: purchaseEndDate, isFilter: isFilter }, () => {
      this.filterInventory()
    });
  };
  setWarrantyExpFilter = (startDate, purchaseEndDate, isFilter) => {
    console.log("setWarrantyExpFilter")
    this.setState({ warrantyExpStDate: startDate, warrantyExpEndDate: purchaseEndDate, isFilter: isFilter }, () => {
      this.filterInventory()
    });
  };

  deleteDevice = (row) => {
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
        axios.delete(`http://localhost:8080/device/${id}`)
          .then(response => {
            // Remove deleted device from state

            const updatedInventoryData = this.state.inventoryData.filter(item => item.id !== id);
            console.log(updatedInventoryData)
            this.setState({ inventoryData: updatedInventoryData });
            this.setState({ filterInventoryData: updatedInventoryData });
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

  searchFilter = (e) => {
    const searchData = this.state.inventoryData.filter((row) =>
      row.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
      row.status.toLowerCase().includes(e.target.value.toLowerCase()) ||
      row.rfid.toLowerCase().includes(e.target.value.toLowerCase()) ||
      row.purchaseDate.toLowerCase().includes(e.target.value.toLowerCase()) ||
      row.warrantyExpirationDate.toLowerCase().includes(e.target.value.toLowerCase()) ||
      row.location.toLowerCase().includes(e.target.value.toLowerCase()) ||
      row.serialNumber.toLowerCase().includes(e.target.value.toLowerCase())
    );
    this.setState({
      filterInventoryData: searchData,
    });
  };

  handleRowClick = (row) => {
    // Handle row click here, you can access the clicked row data using the 'row' parameter
    console.log('Clicked row:', row);
    this.setState({ modal: true, deviceIdSelected: row.id });
    // Perform any other actions you want when a row is clicked
  };

  limitText = (text, limit) => {
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

  changeDateFormat = (dateString) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const [year, month, day] = dateString.split('-');
    const monthIndex = parseInt(month, 10) - 1;
    const formattedDate = `${parseInt(day, 10)} ${months[monthIndex]} ${year}`;
    return formattedDate;
  };

  date = '2023-01-06'; // Sample date in YYYY-MM-DD format
  click = () => {
    console.log(this.state.count);
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    const columns = [
      {
        name: 'Image',
        selector: (row) => <img src={row.id} alt="Image" style={{ width: '50px', height: '50px' }} />,
        sortable: true,
      },
      {
        name: 'Name',
        selector: (row) => this.limitText(row.name, 20),
        sortable: true,
      },
      {
        name: 'Status',
        selector: (row) => (
          <div style={{ width: '100%', height: '100%', display: 'flex' }}>
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <div className="status" id={'status' + row.status}>{row.status}</div>
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
        selector: (row) => this.changeDateFormat(row.purchaseDate),
        sortable: true,
      },
      {
        name: 'Warranty Expire',
        selector: (row) => this.changeDateFormat(row.warrantyExpirationDate),
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
            <RiDeleteBinLine color="#f97066" fontSize="1em" onClick={() => this.deleteDevice(row)} style={{ cursor: 'pointer' }} />
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

    return (
      <div>
        {/* create search box */}
        <div className='option'>

          <div className='first-row'>
            <div className="input-wrapper">
              <CiSearch id="search-icon" />
              <input type="text" placeholder="Search" onChange={this.searchFilter} />
            </div>
            <div className="filter-button">
              <button className="filter" onClick={this.click}>Filter</button>
            </div>
            <div className='add-device-button' >
              <button className="addDevice" onClick={this.click}> <IoIosAdd id="add-icon" /> Add Device</button>
            </div>
          </div>

          <div className='second-row'>
            <Select className='filter-select'
              placeholder="Name"
              options={this.state.nameOptions}
              defaultValue={this.value}
              onChange={(optionSelected) => {
                // use await to wait for state to be updated
                this.setState({ selectedNameOptions: optionSelected }, () => {
                  this.filterInventory()
                });
              }}
              isMulti
              isSearchable
              noOptionsMessage={() => "not found"}></Select>
            <Select className='filter-select'
              placeholder="Status"
              options={this.state.statusOptions}
              // defaultValue={selectedStatusOptions}
              onChange={(optionSelected) => {
                // use await to wait for state to be updated
                this.setState({ selectedStatusOptions: optionSelected }, () => {
                  this.filterInventory()
                });
              }}
              isMulti
              isSearchable
              noOptionsMessage={() => "not found"}></Select>
            <Select className='filter-select'
              placeholder="Location"
              options={this.state.locationOptions}
              defaultValue={this.value}
              onChange={(optionSelected) => {
                // use await to wait for state to be updated
                this.setState({ selectedLocationOptions: optionSelected }, () => {
                  this.filterInventory()
                });
              }}
              isMulti
              isSearchable
              noOptionsMessage={() => "not found"}></Select>

            <div className='filter-select'> {/* Wrap DateRangeComp in a div */}
              <DateRangeComp parentCallback={this.setPurchaseFilter} placeholder="Purchase Date" />
            </div>
            <div className='filter-select'> {/* Wrap DateRangeComp in a div */}
              <DateRangeComp parentCallback={this.setWarrantyExpFilter} placeholder="Warranty Expiration Date" />
            </div>
          </div>

        </div>

        <DataTable
          columns={columns}
          data={this.state.filterInventoryData}
          pagination
          highlightOnHover
          // responsive
          // striped
          customStyles={customStyles}
          onRowClicked={this.handleRowClick}
        />

        <div>
          <InventoryPopup
            trigger={this.state.modal}
            setTrigger={(value) => this.setState({ modal: value })}
            deviceID={this.state.deviceIdSelected}
          >
          </InventoryPopup>
        </div>

      </div>
    )
  }
}

export default Inventory