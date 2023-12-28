import React, { useState, useEffect } from 'react'
import "./AddDevice.css"
import CreatableSelect from 'react-select/creatable';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

function AddDevice() {
  let navigate = useNavigate();
  const initialFormData = {
    name: '',
    purchaseDate: '',
    warrantyExpirationDate: '',
    serialNumber: '',
    rfid: '',
    location: '',
    status: ''
  };

  const [formData, setFormData] = useState({ ...initialFormData });

  const [selectedOption, setSelectedOption] = useState(null);
  const formatCreateLabel = (inputValue) => `Create "${inputValue}"`

  const handleChange = (newValue, actionMeta) => {
    if (actionMeta.name === 'name' || actionMeta.name === 'location' || actionMeta.name === 'status') {
      setFormData({
        ...formData,
        [actionMeta.name]: newValue ? (newValue.value || '') : '' // Assuming 'name', 'location', 'status' are the field names
      });
    } else {
      const { name, value } = actionMeta;
      setFormData({
        ...formData,
        [actionMeta.name]: newValue ? newValue.target.value : ''
      });
    }
  };

  const [statusOptions, setStatusOptions] = useState([]);
  const [nameOptions, setNameOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/device`, formData);

      setFormData({ ...initialFormData });
      Swal.fire({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success"
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload(true); // Reload the page after user acknowledges the success message
        }
      });

    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle errors if the submission fails
    }
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/device`)
      .then(response => {
        const data = response.data;
        // Extract unique options for status, name, and location
        const uniqueStatusOptions = [...new Set(data.map(item => item.status))];
        const uniqueNameOptions = [...new Set(data.map(item => item.name))];
        const uniqueLocationOptions = [...new Set(data.map(item => item.location))];
        setStatusOptions(uniqueStatusOptions);
        setNameOptions(uniqueNameOptions);
        setLocationOptions(uniqueLocationOptions);
      })
      .catch(error => {
        console.error('Error fetching device data:', error);
      });
  }, []);

  const ExcelDateToJSDate = (date) => {
    let converted_date = new Date(Math.round((date - 25569) * 864e5));
    converted_date = String(converted_date).slice(4, 15)
    date = converted_date.split(" ")
    let day = date[1];
    let month = date[0];
    month = "JanFebMarAprMayJunJulAugSepOctNovDec".indexOf(month) / 3 + 1
    if (month.toString().length <= 1)
      month = '0' + month
    let year = date[2];
    return String(year + '-' + month + '-' + day)
  }

  const handleFileUpload = (e) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet, { defval: null });

      parsedData.forEach((row) => {
        for (const key in row) {
          if (Object.prototype.hasOwnProperty.call(row, key)) {
            const value = row[key];
            // Check if the column is 'purchaseDate' or 'warrantyExpirationDate' and the value is a valid Excel date serial number
            if ((key === 'purchaseDate' || key === 'warrantyExpirationDate') && typeof value === 'number' && value > 0 && Math.floor(value) === value) {
              row[key] = ExcelDateToJSDate(value); // Convert the Excel date serial number to the desired format
            }
          }
        }
      });


      parsedData.forEach((item) => {
        console.log(item);
      });

      parsedData.forEach((item) => {
        axios.post(`${process.env.REACT_APP_API}/device/`, item)
          .then((response) => {
            console.log('Data posted successfully:', response.data);
            // Perform any additional actions after successful posting
          })
          .catch((error) => {
            console.error('Error posting data:', error);
            // Handle errors if the post request fails
          });
      });

    };
    reader.readAsBinaryString(e.target.files[0]);
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  }

  const handleSubmitImage = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', selectedFile);
    axios.post(`${process.env.REACT_APP_API}/image`, formData)
      .then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="two-column-form">
        <div className="column">
          {/* Purchase Date */}
          <div className="input-container">
            <label>Purchase Date:</label>
            <input className='device-data-input'
              type="date"
              name="purchaseDate"
              onChange={(newValue, actionMeta) => handleChange(newValue, { ...actionMeta, name: 'purchaseDate' })}
            />
          </div>
          {/* Warranty Expiration Date */}
          <div className="input-container">
            <label>Warranty Expiration Date:</label>
            <input className='device-data-input'
              type="date"
              name="warrantyExpirationDate"
              onChange={(newValue, actionMeta) => handleChange(newValue, { ...actionMeta, name: 'warrantyExpirationDate' })}
            />
          </div>
        </div>
        <div className="column">
          {/* Serial Number */}
          <div className="input-container">
            <label>Serial Number:</label>
            <input className='device-data-input'
              type="text"
              name="serialNumber"
              onChange={(newValue, actionMeta) => handleChange(newValue, { ...actionMeta, name: 'serialNumber' })}
            />
          </div>
          {/* RFID */}
          <div className="input-container">
            <label>RFID:</label>
            <input className='device-data-input'
              type="text"
              name="rfid"
              onChange={(newValue, actionMeta) => handleChange(newValue, { ...actionMeta, name: 'rfid' })}
            />
          </div>
          {/* Device Name CreatableSelect */}
          <div className="input-container">
            <label>Device Name:</label>
            <CreatableSelect
              isClearable
              onChange={(newValue, actionMeta) => handleChange(newValue, { ...actionMeta, name: 'name' })}
              options={nameOptions.map(option => ({ value: option, label: option }))}
              value={formData.name ? { label: formData.name, value: formData.name } : null}
            />
          </div>
          {/* Location CreatableSelect */}
          <div className="input-container">
            <label>Location:</label>
            <CreatableSelect
              isClearable
              onChange={(newValue, actionMeta) => handleChange(newValue, { ...actionMeta, name: 'location' })}
              options={locationOptions.map(option => ({ value: option, label: option }))}
              value={formData.location ? { label: formData.location, value: formData.location } : null}
            />
          </div>
          {/* Status CreatableSelect */}
          <div className="input-container">
            <label>Status:</label>
            <CreatableSelect
              isClearable
              onChange={(newValue, actionMeta) => handleChange(newValue, { ...actionMeta, name: 'status' })}
              options={statusOptions.map(option => ({ value: option, label: option }))}
              value={formData.status ? { label: formData.status, value: formData.status } : null}
            />
          </div>
        </div>
        <button className='submit-add-device' type="submit" >Submit</button>
      </form>

      <div>
        <label htmlFor="files" className="btn">Select Excel</label>
        <input
          id="files"
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          style={{ display: "none" }}
        />
      </div>

      <div>
      <div>
        <form onSubmit={handleSubmitImage}>
          <input type="file" name="image" onChange={handleFileChange} />
          <button type="submit">Submit</button>
        </form>
      </div>
      </div>
    </div>

  );
}

export default AddDevice