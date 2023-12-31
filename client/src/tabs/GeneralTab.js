import { set } from 'date-fns'
import React from 'react'

function GeneralTab({ formData, setFormData, handleInputChange, handleSubmit }) {
    return (
        <div>
            <div className="form-container">
                <div className="column-left">
                    <h5>รหัสของระบบ</h5>
                    <div className='formfield'>
                        <label htmlFor="assetGroup">กลุ่มสินทรัพย์ถาวร:</label>
                        <input className='device-data-input'
                            type="text"
                            id="assetGroup"
                            name="assetGroup"
                            value={formData.assetGroup}
                            onChange={(e) => handleInputChange(e)}

                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="assetNumber">หมายเลขสินทรัพย์ถาวร:</label>
                        <input className='device-data-input'
                            type="text"
                            id="assetNumber"
                            name="assetNumber"
                            value={formData.assetNumber}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <h5>คำอธิบาย</h5>
                    <div className='formfield'>
                        <label htmlFor="name">ชื่อ:</label>
                        <input className='device-data-input'
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="searchName">ชื่อสำหรับค้นหา:</label>
                        <input className='device-data-input'
                            type="text"
                            id="searchName"
                            name="searchName"
                            value={formData.searchName}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <h5>คำอธิบาย</h5>
                    <div className='formfield'>
                        <label htmlFor="dataType">ชนิดข้อมูล:</label>
                        <input className='device-data-input'
                            type="text"
                            id="dataType"
                            name="dataType"
                            value={formData.dataType}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="mainType">ชนิดหลัก:</label>
                        <input className='device-data-input'
                            type="text"
                            id="mainType"
                            name="mainType"
                            value={formData.mainType}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="propertyType">ชนิดของคุณสมบัติ:</label>
                        <input className='device-data-input'
                            type="text"
                            id="propertyType"
                            name="propertyType"
                            value={formData.propertyType}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                </div>

                <div className="column-right">
                    <h5>เอกสาร</h5>
                    <div className='formfield'>
                        <label htmlFor="documentLocation">ที่ตั้งเอกสาร:</label>
                        <input className='device-data-input'
                            type="text"
                            id="documentLocation"
                            name="documentLocation"
                            value={formData.documentLocation}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>

                    <h5>ปริมาณ</h5>
                    <div className='formfield'>
                        <label htmlFor="quantity">ปริมาณ:</label>
                        <input className='device-data-input'
                            type="text"
                            id="quantity"
                            name="quantity"
                            value={formData.quantity}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="unit">หน่วยวัด:</label>
                        <input className='device-data-input'
                            type="text"
                            id="unit"
                            name="unit"
                            value={formData.unit}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>

                    <h5>Split reference</h5>
                    <div className='formfield'>
                        <label htmlFor="originalAsset">Original_asset:</label>
                        <input className='device-data-input'
                            type="text"
                            id="originalAsset"
                            name="originalAsset"
                            value={formData.originalAsset}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="status">สถานะ:</label>
                        <input className='device-data-input'
                            type="text"
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                </div>
            </div>
                <button className='apply-button' onClick={handleSubmit} >Submit</button>
        </div>
    )
}

export default GeneralTab
