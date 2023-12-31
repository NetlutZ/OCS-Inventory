import React from 'react'

function InsuranceTab({ formData, setFormData, handleInputChange, handleSubmit }) {
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
                        <input className='device-data-input'
                            type="text"
                            id="policyExpirationDate"
                            name="policyExpirationDate"
                            value={formData.policyExpirationDate}
                            onChange={(e) => handleInputChange(e)}
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
                    </div>
                    <div className='formfield'>
                        <label htmlFor="lastCostUpdate">การอัพเดตข้อมูลค่า_ต้นทุนเป็นครั้งคราวครั้งล่าสุด:</label>
                        <input className='device-data-input'
                            type="text"
                            id="lastCostUpdate"
                            name="lastCostUpdate"
                            value={formData.lastCostUpdate}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="insuranceDate1">วันที่ประกัน1:</label>
                        <input className='device-data-input'
                            type="text"
                            id="insuranceDate1"
                            name="insuranceDate1"
                            value={formData.insuranceDate1}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="insuranceDate2">วันที่ประกัน2:</label>
                        <input className='device-data-input'
                            type="text"
                            id="insuranceDate2"
                            name="insuranceDate2"
                            value={formData.insuranceDate2}
                            onChange={(e) => handleInputChange(e)}
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
            <button className='apply-button' onClick={handleSubmit} >Submit</button>
    </div>
  )
}

export default InsuranceTab
