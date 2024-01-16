import React from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

function LocationTab({ formData, setFormData, handleInputChange, handleButton, functionOptions, handleDateChange }) {
    let buttonText = 'Apply'

    if (functionOptions === 0) {
        buttonText = 'Next'
    }
    return (
        <div>
            <div className="form-container">
                <div className="column-left">
                    <h5>การแม็ป</h5>
                    <div className='formfield'>
                        <label htmlFor="GISReferenceNumber">หมายเลขอ้างอิงGIS:</label>
                        <input className='device-data-input'
                            type="text"
                            id="GISReferenceNumber"
                            name="GISReferenceNumber"
                            value={formData.GISReferenceNumber}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <h5>ทางกายภาพ</h5>
                    <div className='formfield'>
                        <label htmlFor="responsiblePerson">ผู้รับผิดชอบ:</label>
                        <input className='device-data-input'
                            type="text"
                            id="responsiblePerson"
                            name="responsiblePerson"
                            value={formData.responsiblePerson}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="locationDescription">บันทึกที่ตั้ง:</label>
                        <input className='device-data-input'
                            type="text"
                            id="locationDescription"
                            name="locationDescription"
                            value={formData.locationDescription}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="storageLocation">สถานที่เก็บ:</label>
                        <input className='device-data-input'
                            type="text"
                            id="storageLocation"
                            name="storageLocation"
                            value={formData.storageLocation}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="roomNumber">หมายเลขห้อง:</label>
                        <input className='device-data-input'
                            type="text"
                            id="roomNumber"
                            name="roomNumber"
                            value={formData.roomNumber}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="barcode">บาร์โค้ด:</label>
                        <input className='device-data-input'
                            type="text"
                            id="barcode"
                            name="barcode"
                            value={formData.barcode}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                </div>

                <div className="column-right">
                    <h5>สินค้าคงคลัง</h5>
                    <div className='formfield'>
                        <label htmlFor="physicalInventory">สินค้าคงคลังทางกายภาพ:</label>
                        <DatePicker
                            className='device-data-input'
                            id="physicalInventory"
                            selected={formData.physicalInventory === null ? '' :new Date(formData.physicalInventory) }
                            onChange={(date) => handleDateChange(date, 'physicalInventory')}
                            dateFormat="dd-MM-yyyy"
                            placeholderText="Select a date"
                            showIcon
                            toggleCalendarOnIconClick
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="contactPerson">ผู้ติดต่อ:</label>
                        <input className='device-data-input'
                            type="text"
                            id="contactPerson"
                            name="contactPerson"
                            value={formData.contactPerson}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <h5>เช่า</h5>
                    <div className='formfield'>
                        <label htmlFor="rentalNotes">หมายเหตุการเช่า:</label>
                        <input className='device-data-input'
                            type="text"
                            id="rentalNotes"
                            name="rentalNotes"
                            value={formData.rentalNotes}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="rightsHolder">ผู้ถือกรรมสิทธิ์:</label>
                        <input className='device-data-input'
                            type="text"
                            id="rightsHolder"
                            name="rightsHolder"
                            value={formData.rightsHolder}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <h5>โอน/รับโอน</h5>
                    <div className='formfield'>
                        <label htmlFor="transferredAssetNumber">หมายเลขสินทรัพย์ถาวรโอน_รับโอน:</label>
                        <input className='device-data-input'
                            type="text"
                            id="transferredAssetNumber"
                            name="transferredAssetNumber"
                            value={formData.transferredAssetNumber}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <h5>ที่ดิน</h5>

                </div>
            </div>
            <button className='apply-button' onClick={handleButton} >{buttonText}</button>
        </div>
    )
}

export default LocationTab
