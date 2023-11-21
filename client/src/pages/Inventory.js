import React from 'react'
import "./Inventory.css"
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { IconContext } from "react-icons";
import { CiSearch } from "react-icons/ci";
import { IoIosAdd } from "react-icons/io";

import Select from "react-select"
import { useState } from 'react';


import DateRangeComp from '../components/DateRangeComp';
import { is } from 'date-fns/locale';


class Inventory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null,
      inventoryData: [
        { id: 1, name: 'Product A', status: "InStorage", purchaseDate: 20.99 },
        { id: 2, name: 'Product B', status: "Borrowed", purchaseDate: 15.49 },
        { id: 3, name: 'Product C', status: "Loss", purchaseDate: 25.99 },
        // Add more inventory items as needed
      ],
      count: 0,
      options: [
        // Your options array...
      ],
      stDate: "",
      endDate: "",
      isFilter: false,
    };
  }


  handleCallback = (startDate, endDate, isFilter) => {
    this.setState({ stDate: startDate, endDate: endDate, isFilter: isFilter });
    console.log("isFilter:" + isFilter)
  };

  // print every 1 second
  // componentDidMount() {
  //   this.interval = setInterval(() => {
  //     console.log("isFilter:" + this.state.isFilter)
  //   }, 1000);
  // }

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

  options = [
    { value: 'InStorage', label: 'InStorage' },
    { value: 'Borrowed', label: 'Borrowed' },
    { value: 'Loss', label: 'Loss' },
    { value: 'Loss', label: 'Loss' },
    { value: 'Lossss', label: 'Lossssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss' },
    { value: 'Lossssss', label: 'Lossssssssssssssssssssssssssssss' },
    { value: 'Lossssss', label: 'Lossssssssssssssssssssssssssssss' },
    { value: 'Lossssss', label: 'Lossssssssssssssssssssssssssssss' },
    { value: 'Lossssss', label: 'Lossssssssssssssssssssssssssssss' },
    { value: 'Lossssss', label: 'Lossssssssssssssssssssssssssssss' },
  ];

  render() {
    const isFilter = this.state.isFilter;
    return (
      <div>
        {/* create search box */}
        <div className='option'>
          <div className='first-row'>
            <div className="input-wrapper">
              <CiSearch id="search-icon" />
              <input type="text" placeholder="Search" />
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
              options={this.options}
              defaultValue={this.value}
              onChange={(optionSelected) => { console.log(optionSelected) }}
              isMulti
              isSearchable
              noOptionsMessage={() => "not found"}></Select>
            <Select className='filter-select'
              placeholder="Status"
              options={this.options}
              defaultValue={this.value}
              onChange={(optionSelected) => { console.log(optionSelected) }}
              isMulti
              isSearchable
              noOptionsMessage={() => "not found"}></Select>
            <Select className='filter-select'
              placeholder="Provider"
              options={this.options}
              defaultValue={this.value}
              onChange={(optionSelected) => { console.log(optionSelected) }}
              isMulti
              isSearchable
              noOptionsMessage={() => "not found"}></Select>

            <div className='filter-select'> {/* Wrap DateRangeComp in a div */}
              <DateRangeComp parentCallback={this.handleCallback} />
            </div>
            <div className='filter-select'> {/* Wrap DateRangeComp in a div */}
              <DateRangeComp />
            </div>
          </div>

        </div>

        <div className="table">
          <table style={{ width: '100%' }}>
            <thead className='dashboard-table-header'>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Status</th>
                <th>Provider</th>
                <th>Purchase Date</th>
                <th>Warranty Expire</th>
                <th>Location</th>
                <th>Serial Number</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.inventoryData.map((item) => (
                <tr key={item.id} className='dashboard-row'>
                  <td style={{ width: '10%' }}>{item.id}</td>
                  <td >{this.limitText(item.name, 20)}</td>
                  <td style={{ width: '10%' }}>
                    <div style={{ width: '100%', height: '100%', display: 'flex' }}>
                      <div >
                        <div className="status" id={'status' + item.status}>{item.status}</div>
                      </div>
                    </div>
                  </td>
                  <td>${item.purchaseDate}</td>
                  <td>${item.purchaseDate}</td>
                  <td>${item.purchaseDate}</td>
                  <td>${item.purchaseDate}</td>
                  <td>${item.purchaseDate}</td>
                  <td>{<FaRegEdit color="#667085" fontSize="1em" style={{ paddingRight: '5px' }} />}{<RiDeleteBinLine color="#f97066" fontSize="1em" />}</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>


      </div>
    )
  }
}

export default Inventory
