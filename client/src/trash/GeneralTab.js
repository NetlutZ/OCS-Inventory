import { set } from 'date-fns'
import React from 'react'
import './Settings.css'

function GeneralTab({ formData, setFormData, handleInputChange, handleSubmit }) {
    return (
        <div>
            <div className="form-container">
                <div className="column-left">
                    <h5>รหัสของระบบ</h5>
                    <div className='formfield'>
                        <label htmlFor="กลุ่มสินทรัพย์ถาวร">กลุ่มสินทรัพย์ถาวร:</label>
                        <input className='device-data-input'
                            type="text"
                            id="กลุ่มสินทรัพย์ถาวร"
                            name="กลุ่มสินทรัพย์ถาวร"
                            value={formData.กลุ่มสินทรัพย์ถาวร}
                            onChange={(e) => handleInputChange(e)}

                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="หมายเลขสินทรัพย์ถาวร">หมายเลขสินทรัพย์ถาวร:</label>
                        <input className='device-data-input'
                            type="text"
                            id="หมายเลขสินทรัพย์ถาวร"
                            name="หมายเลขสินทรัพย์ถาวร"
                            value={formData.หมายเลขสินทรัพย์ถาวร}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <h5>คำอธิบาย</h5>
                    <div className='formfield'>
                        <label htmlFor="ชื่อ">ชื่อ:</label>
                        <input className='device-data-input'
                            type="text"
                            id="ชื่อ"
                            name="ชื่อ"
                            value={formData.ชื่อ}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="ชื่อสำหรับค้นหา">ชื่อสำหรับค้นหา:</label>
                        <input className='device-data-input'
                            type="text"
                            id="ชื่อสำหรับค้นหา"
                            name="ชื่อสำหรับค้นหา"
                            value={formData.ชื่อสำหรับค้นหา}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <h5>คำอธิบาย</h5>
                    <div className='formfield'>
                        <label htmlFor="ชนิดข้อมูล">ชนิดข้อมูล:</label>
                        <input className='device-data-input'
                            type="text"
                            id="ชนิดข้อมูล"
                            name="ชนิดข้อมูล"
                            value={formData.ชนิดข้อมูล}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="ชนิดหลัก">ชนิดหลัก:</label>
                        <input className='device-data-input'
                            type="text"
                            id="ชนิดหลัก"
                            name="ชนิดหลัก"
                            value={formData.ชนิดหลัก}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="ชนิดของคุณสมบัติ">ชนิดของคุณสมบัติ:</label>
                        <input className='device-data-input'
                            type="text"
                            id="ชนิดของคุณสมบัติ"
                            name="ชนิดของคุณสมบัติ"
                            value={formData.ชนิดของคุณสมบัติ}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                </div>

                <div className="column-right">
                    <h5>เอกสาร</h5>
                    <div className='formfield'>
                        <label htmlFor="ที่ตั้งเอกสาร">ที่ตั้งเอกสาร:</label>
                        <input className='device-data-input'
                            type="text"
                            id="ที่ตั้งเอกสาร"
                            name="ที่ตั้งเอกสาร"
                            value={formData.ที่ตั้งเอกสาร}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>

                    <h5>ปริมาณ</h5>
                    <div className='formfield'>
                        <label htmlFor="ปริมาณ">ปริมาณ:</label>
                        <input className='device-data-input'
                            type="text"
                            id="ปริมาณ"
                            name="ปริมาณ"
                            value={formData.ปริมาณ}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="หน่วยวัด">หน่วยวัด:</label>
                        <input className='device-data-input'
                            type="text"
                            id="หน่วยวัด"
                            name="หน่วยวัด"
                            value={formData.หน่วยวัด}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>

                    <h5>Split reference</h5>
                    <div className='formfield'>
                        <label htmlFor="Original_asset">Original_asset:</label>
                        <input className='device-data-input'
                            type="text"
                            id="Original_asset"
                            name="Original_asset"
                            value={formData.Original_asset}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="สถานะ">สถานะ:</label>
                        <input className='device-data-input'
                            type="text"
                            id="สถานะ"
                            name="สถานะ"
                            value={formData.สถานะ}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                </div>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}

export default GeneralTab
