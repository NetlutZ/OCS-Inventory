import React from 'react'

function TechnicalDetailsTab({ formData, setFormData, handleInputChange, handleSubmit }) {
  return (
    <div>
      <div className="form-container">
                <div className="column-left">
                    <h5>โมเดล</h5>
                    <div className='formfield'>
                        <label htmlFor="จัดทำ">จัดทำ:</label>
                        <input className='device-data-input'
                            type="text"
                            id="จัดทำ"
                            name="จัดทำ"
                            value={formData.จัดทำ}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="โมเดล">โมเดล:</label>
                        <input className='device-data-input'
                            type="text"
                            id="โมเดล"
                            name="โมเดล"
                            value={formData.โมเดล}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="ปีของรุ่น">ปีของรุ่น:</label>
                        <input className='device-data-input'
                            type="text"
                            id="ปีของรุ่น"
                            name="ปีของรุ่น"
                            value={formData.ปีของรุ่น}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="หมายเลขลำดับประจำสินค้า">หมายเลขลำดับประจำสินค้า:</label>
                        <input className='device-data-input'
                            type="text"
                            id="หมายเลขลำดับประจำสินค้า"
                            name="หมายเลขลำดับประจำสินค้า"
                            value={formData.หมายเลขลำดับประจำสินค้า}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="รายละเอียดทางเทคนิค">รายละเอียดทางเทคนิค:</label>
                        <textarea className='device-data-input'
                            type="text"
                            id="รายละเอียดทางเทคนิค"
                            name="รายละเอียดทางเทคนิค"
                            value={formData.รายละเอียดทางเทคนิค}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                </div>

                <div className="column-right">
                    <h5>อัพเดต</h5>
                    <div className='formfield'>
                        <label htmlFor="การบำรุงรักษาครั้งล่าสุด">การบำรุงรักษาครั้งล่าสุด:</label>
                        <input className='device-data-input'
                            type="date"
                            id="การบำรุงรักษาครั้งล่าสุด"
                            name="การบำรุงรักษาครั้งล่าสุด"
                            value={formData.การบำรุงรักษาครั้งล่าสุด}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="การบำรุงรักษาครั้งถัดไป">การบำรุงรักษาครั้งถัดไป:</label>
                        <input className='device-data-input'
                            type="date"
                            id="การบำรุงรักษาครั้งถัดไป"
                            name="การบำรุงรักษาครั้งถัดไป"
                            value={formData.การบำรุงรักษาครั้งถัดไป}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="ยี่ห้อ">ยี่ห้อ:</label>
                        <input className='device-data-input'
                            type="text"
                            id="ยี่ห้อ"
                            name="ยี่ห้อ"
                            value={formData.ยี่ห้อ}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="บัญชีผู้จัดจำหน่าย">บัญชีผู้จัดจำหน่าย:</label>
                        <input className='device-data-input'
                            type="text"
                            id="บัญชีผู้จัดจำหน่าย"
                            name="บัญชีผู้จัดจำหน่าย"
                            value={formData.บัญชีผู้จัดจำหน่าย}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="ชื่อผู้ขาย">ชื่อผู้ขาย:</label>
                        <input className='device-data-input'
                            type="text"
                            id="ชื่อผู้ขาย"
                            name="ชื่อผู้ขาย"
                            value={formData.ชื่อผู้ขาย}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="ที่อยู่ผู้ขาย">ที่อยู่ผู้ขาย:</label>
                        <input className='device-data-input'
                            type="text"
                            id="ที่อยู่ผู้ขาย"
                            name="ที่อยู่ผู้ขาย"
                            value={formData.ที่อยู่ผู้ขาย}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="โทรศัพท์">โทรศัพท์:</label>
                        <input className='device-data-input'
                            type="text"
                            id="โทรศัพท์"
                            name="โทรศัพท์"
                            value={formData.โทรศัพท์}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="โทรสาร">โทรสาร:</label>
                        <input className='device-data-input'
                            type="text"
                            id="โทรสาร"
                            name="โทรสาร"
                            value={formData.โทรสาร}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                </div>
                <button onClick={handleSubmit}>Submit</button>
            </div>
    </div>
  )
}

export default TechnicalDetailsTab
