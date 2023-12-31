import React from 'react'

function InsuranceTab({ formData, setFormData, handleInputChange, handleSubmit }) {
  return (
    <div>
      <div className="form-container">
                <div className="column-left">
                    <h5>การประกัน</h5>
                    <div className='formfield'>
                        <label htmlFor="บริษัทประกันภัย">บริษัทประกันภัย:</label>
                        <input className='device-data-input'
                            type="text"
                            id="บริษัทประกันภัย"
                            name="บริษัทประกันภัย"
                            value={formData.บริษัทประกันภัย}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="ตัวแทน">ตัวแทน:</label>
                        <input className='device-data-input'
                            type="text"
                            id="ตัวแทน"
                            name="ตัวแทน"
                            value={formData.ตัวแทน}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <h5>กรรมธรรม์</h5>
                    <div className='formfield'>
                        <label htmlFor="หมายเลขกรรมธรรม์">หมายเลขกรรมธรรม์:</label>
                        <input className='device-data-input'
                            type="text"
                            id="หมายเลขกรรมธรรม์"
                            name="หมายเลขกรรมธรรม์"
                            value={formData.หมายเลขกรรมธรรม์}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="วันหมดอายุของกรรมธรรม์">วันหมดอายุของกรรมธรรม์:</label>
                        <input className='device-data-input'
                            type="text"
                            id="วันหมดอายุของกรรมธรรม์"
                            name="วันหมดอายุของกรรมธรรม์"
                            value={formData.วันหมดอายุของกรรมธรรม์}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="ยอดเงินกรรมธรรม์">ยอดเงินกรรมธรรม์:</label>
                        <input className='device-data-input'
                            type="text"
                            id="ยอดเงินกรรมธรรม์"
                            name="ยอดเงินกรรมธรรม์"
                            value={formData.ยอดเงินกรรมธรรม์}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="มูลค่าการประกัน">มูลค่าการประกัน:</label>
                        <input className='device-data-input'
                            type="text"
                            id="มูลค่าการประกัน"
                            name="มูลค่าการประกัน"
                            value={formData.มูลค่าการประกัน}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="ต้นทุนในการเปลี่ยน">ต้นทุนในการเปลี่ยน:</label>
                        <input className='device-data-input'
                            type="text"
                            id="ต้นทุนในการเปลี่ยน"
                            name="ต้นทุนในการเปลี่ยน"
                            value={formData.ต้นทุนในการเปลี่ยน}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="การอัพเดตข้อมูลค่า_ต้นทุนเป็นครั้งคราวครั้งล่าสุด">การอัพเดตข้อมูลค่า_ต้นทุนเป็นครั้งคราวครั้งล่าสุด:</label>
                        <input className='device-data-input'
                            type="text"
                            id="การอัพเดตข้อมูลค่า_ต้นทุนเป็นครั้งคราวครั้งล่าสุด"
                            name="การอัพเดตข้อมูลค่า_ต้นทุนเป็นครั้งคราวครั้งล่าสุด"
                            value={formData.การอัพเดตข้อมูลค่า_ต้นทุนเป็นครั้งคราวครั้งล่าสุด}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="วันที่ประกัน1">วันที่ประกัน1:</label>
                        <input className='device-data-input'
                            type="text"
                            id="วันที่ประกัน1"
                            name="วันที่ประกัน1"
                            value={formData.วันที่ประกัน1}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="วันที่ประกัน2">วันที่ประกัน2:</label>
                        <input className='device-data-input'
                            type="text"
                            id="วันที่ประกัน2"
                            name="วันที่ประกัน2"
                            value={formData.วันที่ประกัน2}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="ประกันภัยที่ราคาตลาดที่เป็นธรรม">ประกันภัยที่ราคาตลาดที่เป็นธรรม:</label>
                        <input className='device-data-input'
                            type="text"
                            id="ประกันภัยที่ราคาตลาดที่เป็นธรรม"
                            name="ประกันภัยที่ราคาตลาดที่เป็นธรรม"
                            value={formData.ประกันภัยที่ราคาตลาดที่เป็นธรรม}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                </div>

                
            </div>
                <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default InsuranceTab
