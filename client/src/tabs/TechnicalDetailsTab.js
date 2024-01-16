import React from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import moment from 'moment';

function TechnicalDetailsTab({ formData, setFormData, handleInputChange, handleButton, functionOptions, handleDateChange }) {
    let buttonText = 'Apply'

    if (functionOptions === 0) {
        buttonText = 'Next'
    }
    const DateInput = ({ name, selected, handleInputChange }) => {
        const handleChange = (date) => {
            const formattedDate = date ? format(date, "yyyy-MM-dd") : null;
            // Create a synthetic event object to maintain consistency with other inputs
            const syntheticEvent = {
                target: {
                    name: name,
                    value: formattedDate,
                },
            };
            handleInputChange(syntheticEvent);
        };

        return (
            <DatePicker
                selected={selected}
                onChange={handleChange}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select a date"
            />
        );
    };

    return (
        <div>
            <div className="form-container">
                <div className="column-left">
                    <h5>โมเดล</h5>
                    <div className='formfield'>
                        <label htmlFor="createdBy">จัดทำ:</label>
                        <input className='device-data-input'
                            type="text"
                            id="createdBy"
                            name="createdBy"
                            value={formData.createdBy}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="model">โมเดล:</label>
                        <input className='device-data-input'
                            type="text"
                            id="model"
                            name="model"
                            value={formData.model}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="modelYear">ปีของรุ่น:</label>
                        <input className='device-data-input'
                            type="text"
                            id="modelYear"
                            name="modelYear"
                            value={formData.modelYear}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="serialNumber">หมายเลขลำดับประจำสินค้า:</label>
                        <input className='device-data-input'
                            type="text"
                            id="serialNumber"
                            name="serialNumber"
                            value={formData.serialNumber}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="technicalDetails">รายละเอียดทางเทคนิค:</label>
                        <textarea className='device-data-input'
                            type="text"
                            id="technicalDetails"
                            name="technicalDetails"
                            value={formData.technicalDetails}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                </div>

                <div className="column-right">
                    <h5>อัพเดต</h5>
                    <div className='formfield'>
                        <label htmlFor="lastMaintenanceDate">การบำรุงรักษาครั้งล่าสุด:</label>
                        <DatePicker
                            className='device-data-input'
                            id="lastMaintenanceDate"
                            selected={formData.lastMaintenanceDate === null ? '' :new Date(formData.lastMaintenanceDate) }
                            onChange={(date) => handleDateChange(date, 'lastMaintenanceDate')}
                            dateFormat="dd-MM-yyyy"
                            placeholderText="Select a date"
                            showIcon
                            toggleCalendarOnIconClick
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="nextMaintenanceDate">การบำรุงรักษาครั้งถัดไป:</label>
                        <DatePicker
                            className='device-data-input'
                            id="nextMaintenanceDate"
                            selected={formData.nextMaintenanceDate === null ? '' :new Date(formData.nextMaintenanceDate) }
                            onChange={(date) => handleDateChange(date, 'nextMaintenanceDate')}
                            dateFormat="dd-MM-yyyy"
                            placeholderText="Select a date"
                            showIcon
                            toggleCalendarOnIconClick
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="brand">ยี่ห้อ:</label>
                        <input className='device-data-input'
                            type="text"
                            id="brand"
                            name="brand"
                            value={formData.brand}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="distributorAccount">บัญชีผู้จัดจำหน่าย:</label>
                        <input className='device-data-input'
                            type="text"
                            id="distributorAccount"
                            name="distributorAccount"
                            value={formData.distributorAccount}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="sellerName">ชื่อผู้ขาย:</label>
                        <input className='device-data-input'
                            type="text"
                            id="sellerName"
                            name="sellerName"
                            value={formData.sellerName}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="sellerAddress">ที่อยู่ผู้ขาย:</label>
                        <input className='device-data-input'
                            type="text"
                            id="sellerAddress"
                            name="sellerAddress"
                            value={formData.sellerAddress}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="phone">โทรศัพท์:</label>
                        <input className='device-data-input'
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="fax">โทรสาร:</label>
                        <input className='device-data-input'
                            type="text"
                            id="fax"
                            name="fax"
                            value={formData.fax}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                </div>
            </div>
            <button className='apply-button' onClick={handleButton} >{buttonText}</button>
        </div>
    )
}

export default TechnicalDetailsTab
