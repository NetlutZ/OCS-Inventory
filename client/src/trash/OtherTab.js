import React from 'react'

function OtherTab({ formData, setFormData, handleInputChange, handleSubmit }) {
  return (
    <div>
      <div className="form-container">
                <div className="column-left">
                    <h5>ข้อมูลอ้างอิง</h5>
                    <div className='formfield'>
                        <label htmlFor="ข้อมูลอ้างอิง">ข้อมูลอ้างอิง:</label>
                        <input className='device-data-input'
                            type="text"
                            id="ข้อมูลอ้างอิง"
                            name="ข้อมูลอ้างอิง"
                            value={formData.ข้อมูลอ้างอิง}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="ข้อคิดเห็น">ข้อคิดเห็น:</label>
                        <input className='device-data-input'
                            type="text"
                            id="ข้อคิดเห็น"
                            name="ข้อคิดเห็น"
                            value={formData.ข้อคิดเห็น}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <h5>การตัดจำหน่าย</h5>
                    <div className='formfield'>
                        <label htmlFor="ข้อจำกัดในการตัดจำหน่าย">ข้อจำกัดในการตัดจำหน่าย:</label>
                        <input className='device-data-input'
                            type="text"
                            id="ข้อจำกัดในการตัดจำหน่าย"
                            name="ข้อจำกัดในการตัดจำหน่าย"
                            value={formData.ข้อจำกัดในการตัดจำหน่าย}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                </div>

                <div className="column-right">
                    <h5>หมายเลขพัสดุตามระบบ</h5>
                    <div className='formfield'>
                        <label htmlFor="หน่วยงานพัสดุ">หน่วยงานพัสดุ:</label>
                        <input className='device-data-input'
                            type="text"
                            id="หน่วยงานพัสดุ"
                            name="หน่วยงานพัสดุ"
                            value={formData.หน่วยงานพัสดุ}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="ประเภทพัสดุ">ประเภทพัสดุ:</label>
                        <input className='device-data-input'
                            type="text"
                            id="ประเภทพัสดุ"
                            name="ประเภทพัสดุ"
                            value={formData.ประเภทพัสดุ}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="ชนิดพัสดุ">ชนิดพัสดุ:</label>
                        <input className='device-data-input'
                            type="text"
                            id="ชนิดพัสดุ"
                            name="ชนิดพัสดุ"
                            value={formData.ชนิดพัสดุ}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="รหัสปีพัสดุ">รหัสปีพัสดุ:</label>
                        <input className='device-data-input'
                            type="text"
                            id="รหัสปีพัสดุ"
                            name="รหัสปีพัสดุ"
                            value={formData.รหัสปีพัสดุ}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="IVZ_FSNum">IVZ_FSNum:</label>
                        <input className='device-data-input'
                            type="text"
                            id="IVZ_FSNum"
                            name="IVZ_FSNum"
                            value={formData.IVZ_FSNum}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="ประเภทแหล่งเงินพัสดุ">ประเภทแหล่งเงินพัสดุ:</label>
                        <input className='device-data-input'
                            type="text"
                            id="ประเภทแหล่งเงินพัสดุ"
                            name="ประเภทแหล่งเงินพัสดุ"
                            value={formData.ประเภทแหล่งเงินพัสดุ}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="รายละเอียดพัสดุ">รายละเอียดพัสดุ:</label>
                        <input className='device-data-input'
                            type="text"
                            id="รายละเอียดพัสดุ"
                            name="รายละเอียดพัสดุ"
                            value={formData.รายละเอียดพัสดุ}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                   
                </div>
                <button onClick={handleSubmit}>Submit</button>
            </div>
    </div>
  )
}

export default OtherTab
