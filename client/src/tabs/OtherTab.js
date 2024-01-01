import React from 'react'

function OtherTab({ formData, setFormData, handleInputChange, handleButton, functionOptions }) {
    let buttonText = 'Apply'

    if (functionOptions === 0) {
        buttonText = 'Next'
    }
    return (
        <div>
            <div className="form-container">
                <div className="column-left">
                    <h5>ข้อมูลอ้างอิง</h5>
                    <div className='formfield'>
                        <label htmlFor="referenceData">ข้อมูลอ้างอิง:</label>
                        <input className='device-data-input'
                            type="text"
                            id="referenceData"
                            name="referenceData"
                            value={formData.referenceData}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="comments">ข้อคิดเห็น:</label>
                        <input className='device-data-input'
                            type="text"
                            id="comments"
                            name="comments"
                            value={formData.comments}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <h5>การตัดจำหน่าย</h5>
                    <div className='formfield'>
                        <label htmlFor="disposalConstraints">ข้อจำกัดในการตัดจำหน่าย:</label>
                        <input className='device-data-input'
                            type="text"
                            id="disposalConstraints"
                            name="disposalConstraints"
                            value={formData.disposalConstraints}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                </div>

                <div className="column-right">
                    <h5>หมายเลขพัสดุตามระบบ</h5>
                    <div className='formfield'>
                        <label htmlFor="procurementUnit">หน่วยงานพัสดุ:</label>
                        <input className='device-data-input'
                            type="text"
                            id="procurementUnit"
                            name="procurementUnit"
                            value={formData.procurementUnit}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="procurementType">ประเภทพัสดุ:</label>
                        <input className='device-data-input'
                            type="text"
                            id="procurementType"
                            name="procurementType"
                            value={formData.procurementType}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="procurementCategory">ชนิดพัสดุ:</label>
                        <input className='device-data-input'
                            type="text"
                            id="procurementCategory"
                            name="procurementCategory"
                            value={formData.procurementCategory}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="procurementYearCode">รหัสปีพัสดุ:</label>
                        <input className='device-data-input'
                            type="text"
                            id="procurementYearCode"
                            name="procurementYearCode"
                            value={formData.procurementYearCode}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="IVZ_FsNum">IVZ_FSNum:</label>
                        <input className='device-data-input'
                            type="text"
                            id="IVZ_FsNum"
                            name="IVZ_FsNum"
                            value={formData.IVZ_FsNum}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="procurementSourceType">ประเภทแหล่งเงินพัสดุ:</label>
                        <input className='device-data-input'
                            type="text"
                            id="procurementSourceType"
                            name="procurementSourceType"
                            value={formData.procurementSourceType}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="procurementDetails">รายละเอียดพัสดุ:</label>
                        <input className='device-data-input'
                            type="text"
                            id="procurementDetails"
                            name="procurementDetails"
                            value={formData.procurementDetails}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>

                </div>

            </div>
            <button className='apply-button' onClick={handleButton} >{buttonText}</button>
        </div>
    )
}

export default OtherTab
