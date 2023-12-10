import React, {useState, useEffect} from 'react'
import "./AddDevice.css"
import CreatableSelect from 'react-select/creatable';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

function AddDevice() {
  let navigate  = useNavigate();
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
      const response = await axios.post('http://localhost:8080/device', formData);

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
    axios.get('http://localhost:8080/device')
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

  return (
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
  );
}

export default AddDevice