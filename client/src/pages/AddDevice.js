import React, { useState, useEffect } from 'react'
import "./AddDevice.css"
import CreatableSelect from 'react-select/creatable';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { da } from 'date-fns/locale';

function AddDevice() {

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
            if ((key === 'purchaseDate' || key === 'warrantyExpirationDate') && typeof value === 'number' && value > 0) {
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

  const [startDate, setStartDate] = useState(null);
  const cccc = (date) => {
    setStartDate(date);
    console.log(date);
  }


  return (
    <div>
      

      <div>
        <label htmlFor="files" className="btn">Select Excel</label>
        <input
          id="files"
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          // style={{ display: "none" }}
        />
      </div>

      <DatePicker selected={startDate} onChange={cccc} dateFormat="dd-MM-yyyy" />
  

      
    </div>

  );
}

export default AddDevice