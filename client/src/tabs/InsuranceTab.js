import React from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

function InsuranceTab({ formData, setFormData, handleInputChange, handleButton, functionOptions, error, handleDateChange  }) {
    let buttonText = 'Apply'

    if(functionOptions===0){
        buttonText = 'Next'
    }
  return (
    <div>
      <div className="form-container">
                <div className="column-left">
                    <h5>การประกัน</h5>
                    <div className='formfield'>
                        <label htmlFor="insuranceCompany">บริษัทประกันภัย:</label>
                        <input className='device-data-input'
                            type="text"
                            id="insuranceCompany"
                            name="insuranceCompany"
                            value={formData.insuranceCompany}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="agent">ตัวแทน:</label>
                        <input className='device-data-input'
                            type="text"
                            id="agent"
                            name="agent"
                            value={formData.agent}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <h5>กรรมธรรม์</h5>
                    <div className='formfield'>
                        <label htmlFor="policyNumber">หมายเลขกรรมธรรม์:</label>
                        <input className='device-data-input'
                            type="text"
                            id="policyNumber"
                            name="policyNumber"
                            value={formData.policyNumber}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="policyExpirationDate">วันหมดอายุของกรรมธรรม์:</label>
                        <DatePicker
                            className='device-data-input'
                            id="policyExpirationDate"
                            selected={formData.policyExpirationDate === null ? '' :new Date(formData.policyExpirationDate) }
                            onChange={(date) => handleDateChange(date, 'policyExpirationDate')}
                            dateFormat="dd-MM-yyyy"
                            placeholderText="Select a date"
                            showIcon
                            toggleCalendarOnIconClick
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="policyAmount">ยอดเงินกรรมธรรม์:</label>
                        <input className='device-data-input'
                            type="text"
                            id="policyAmount"
                            name="policyAmount"
                            value={formData.policyAmount}
                            onChange={(e) => handleInputChange(e)}
                        />
                        {error.policyAmount && <p style={{ color: 'red', fontSize:'0.8rem' }}>{error.policyAmount}</p>}
                    </div>
                    <div className='formfield'>
                        <label htmlFor="insuranceValue">มูลค่าการประกัน:</label>
                        <input className='device-data-input'
                            type="text"
                            id="insuranceValue"
                            name="insuranceValue"
                            value={formData.insuranceValue}
                            onChange={(e) => handleInputChange(e)}
                        />
                        {error.insuranceValue && <p style={{ color: 'red', fontSize:'0.8rem' }}>{error.insuranceValue}</p>}
                    </div>
                    <div className='formfield'>
                        <label htmlFor="replacementCost">ต้นทุนในการเปลี่ยน:</label>
                        <input className='device-data-input'
                            type="text"
                            id="replacementCost"
                            name="replacementCost"
                            value={formData.replacementCost}
                            onChange={(e) => handleInputChange(e)}
                        />
                        {error.replacementCost && <p style={{ color: 'red', fontSize:'0.8rem' }}>{error.replacementCost}</p>}
                    </div>
                    <div className='formfield'>
                        <label htmlFor="lastCostUpdate">การอัพเดตข้อมูลค่า_ต้นทุนเป็นครั้งคราวครั้งล่าสุด:</label>
                        <DatePicker
                            className='device-data-input'
                            id="lastCostUpdate"
                            selected={formData.lastCostUpdate === null ? '' :new Date(formData.lastCostUpdate) }
                            onChange={(date) => handleDateChange(date, 'lastCostUpdate')}
                            dateFormat="dd-MM-yyyy"
                            placeholderText="Select a date"
                            showIcon
                            toggleCalendarOnIconClick
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="insuranceDate1">วันที่ประกัน1:</label>
                        <DatePicker
                            className='device-data-input'
                            id="insuranceDate1"
                            selected={formData.insuranceDate1 === null ? '' :new Date(formData.insuranceDate1) }
                            onChange={(date) => handleDateChange(date, 'insuranceDate1')}
                            dateFormat="dd-MM-yyyy"
                            placeholderText="Select a date"
                            showIcon
                            toggleCalendarOnIconClick
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="insuranceDate2">วันที่ประกัน2:</label>
                        <DatePicker
                            className='device-data-input'
                            id="insuranceDate2"
                            selected={formData.insuranceDate2 === null ? '' :new Date(formData.insuranceDate2) }
                            onChange={(date) => handleDateChange(date, 'insuranceDate2')}
                            dateFormat="dd-MM-yyyy"
                            placeholderText="Select a date"
                            showIcon
                            toggleCalendarOnIconClick
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="marketPriceInsurance">ประกันภัยที่ราคาตลาดที่เป็นธรรม:</label>
                        <input className='device-data-input'
                            type="text"
                            id="marketPriceInsurance"
                            name="marketPriceInsurance"
                            value={formData.marketPriceInsurance}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                </div>

                
            </div>
            <button className='apply-button' onClick={handleButton} >{buttonText}</button>
    </div>
  )
}

export default InsuranceTab
