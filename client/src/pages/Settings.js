import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import './Settings.css'
import * as XLSX from 'xlsx';

function Settings() {
  const [data, setData] = useState([]);

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
      const parsedData = XLSX.utils.sheet_to_json(sheet, {defval: null});
      
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

      setData(parsedData);

      parsedData.forEach((item) => {
        console.log(item);
      });

      parsedData.forEach((item) => {
        axios.post('http://localhost:8080/device/', item)
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

  }

  return (
    <div>
      <input 
        type="file" 
        accept=".xlsx, .xls" 
        onChange={handleFileUpload} 
      />

      {data.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, index) => (
                  <td key={index}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Settings
