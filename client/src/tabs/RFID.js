import React from 'react'
import DatePicker from "react-datepicker";

function RFID({ formData, setFormData, handleInputChange, handleButton, functionOptions, handleDateChange }) {
    let buttonText = 'Apply'
    if (functionOptions === 0) {
        buttonText = 'Submit'
    }
    return (
        
        <div>
            <div className="form-container">
                <div className="column-left">
                    <h5>Coding</h5>
                    <div className='formfield'>
                        <label htmlFor="rfid">RFID:</label>
                        <input className='device-data-input'
                            type="text"
                            id="rfid"
                            name="rfid"
                            value={formData.rfid}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="rfidStatus">RFID Status:</label>
                        <input className='device-data-input'
                            type="text"
                            id="rfidStatus"
                            name="rfidStatus"
                            value={formData.rfidStatus === '' ? 'InStorage' : formData.rfidStatus}
                            onChange={(e) => handleInputChange(e)}
                            disabled
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="lastScan">อ่านครั้งล่าสุด:</label>
                            <DatePicker
                                className='device-data-input'
                                id="lastScan"
                                selected={formData.lastScan === null ? '' :new Date(formData.lastScan) }
                                onChange={(date) => handleDateChange(date, 'lastScan')}
                                dateFormat="dd-MM-yyyy"
                                placeholderText="Select a date"
                                showIcon
                                toggleCalendarOnIconClick
                            />
                    </div>
                    <div className='formfield'>
                        {console.log(formData.returnDate)}
                        <label htmlFor="returnDate">กำหนดวันที่คืน:</label>
                        <DatePicker
                            className='device-data-input'
                            id="returnDate"
                            selected={formData.returnDate === null ? '' :new Date(formData.returnDate) }
                            onChange={(date) => handleDateChange(date, 'returnDate')}
                            dateFormat="dd-MM-yyyy"
                            placeholderText="Select a date"
                            showIcon
                            toggleCalendarOnIconClick
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="maxBorrowDays">วันที่ยืมได้มากสุด:</label>
                        <input className='device-data-input'
                            type="text"
                            id="maxBorrowDays"
                            name="maxBorrowDays"
                            value={formData.maxBorrowDays}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                </div>

            </div>
            <button className='apply-button' onClick={handleButton} >{buttonText}</button>
        </div>
    
    )
}

export default RFID
