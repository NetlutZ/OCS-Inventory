import React from 'react'

function LocationTab({ formData, setFormData, handleInputChange, handleSubmit }) {
  return (
    <div>
      <div className="form-container">
                <div className="column-left">
                    <h5>การแม็ป</h5>
                    <div className='formfield'>
                        <label htmlFor="หมายเลขอ้างอิงGIS">หมายเลขอ้างอิงGIS:</label>
                        <input className='device-data-input'
                            type="text"
                            id="หมายเลขอ้างอิงGIS"
                            name="หมายเลขอ้างอิงGIS"
                            value={formData.หมายเลขอ้างอิงGIS}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <h5>ทางกายภาพ</h5>
                    <div className='formfield'>
                        <label htmlFor="ผู้รับผิดชอบ">ผู้รับผิดชอบ:</label>
                        <input className='device-data-input'
                            type="text"
                            id="ผู้รับผิดชอบ"
                            name="ผู้รับผิดชอบ"
                            value={formData.ผู้รับผิดชอบ}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="บันทึกที่ตั้ง">บันทึกที่ตั้ง:</label>
                        <input className='device-data-input'
                            type="text"
                            id="บันทึกที่ตั้ง"
                            name="บันทึกที่ตั้ง"
                            value={formData.บันทึกที่ตั้ง}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="สถานที่เก็บ">สถานที่เก็บ:</label>
                        <input className='device-data-input'
                            type="text"
                            id="สถานที่เก็บ"
                            name="สถานที่เก็บ"
                            value={formData.สถานที่เก็บ}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="หมายเลขห้อง">หมายเลขห้อง:</label>
                        <input className='device-data-input'
                            type="text"
                            id="หมายเลขห้อง"
                            name="หมายเลขห้อง"
                            value={formData.หมายเลขห้อง}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="บาร์โค้ด">บาร์โค้ด:</label>
                        <input className='device-data-input'
                            type="text"
                            id="บาร์โค้ด"
                            name="บาร์โค้ด"
                            value={formData.บาร์โค้ด}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                </div>

                <div className="column-right">
                    <h5>สินค้าคงคลัง</h5>
                    <div className='formfield'>
                        <label htmlFor="สินค้าคงคลังทางกายภาพ">สินค้าคงคลังทางกายภาพ:</label>
                        <input className='device-data-input'
                            type="text"
                            id="สินค้าคงคลังทางกายภาพ"
                            name="สินค้าคงคลังทางกายภาพ"
                            value={formData.สินค้าคงคลังทางกายภาพ}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="ผู้ติดต่อ">ผู้ติดต่อ:</label>
                        <input className='device-data-input'
                            type="text"
                            id="ผู้ติดต่อ"
                            name="ผู้ติดต่อ"
                            value={formData.ผู้ติดต่อ}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <h5>เช่า</h5>
                    <div className='formfield'>
                        <label htmlFor="หมายเหตุการเช่า">หมายเหตุการเช่า:</label>
                        <input className='device-data-input'
                            type="text"
                            id="หมายเหตุการเช่า"
                            name="หมายเหตุการเช่า"
                            value={formData.หมายเหตุการเช่า}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="ผู้ถือกรรมสิทธิ์">ผู้ถือกรรมสิทธิ์:</label>
                        <input className='device-data-input'
                            type="text"
                            id="ผู้ถือกรรมสิทธิ์"
                            name="ผู้ถือกรรมสิทธิ์"
                            value={formData.ผู้ถือกรรมสิทธิ์}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <h5>โอน/รับโอน</h5>  
                    <div className='formfield'>
                        <label htmlFor="หมายเลขสินทรัพย์ถาวรโอน_รับโอน">หมายเลขสินทรัพย์ถาวรโอน_รับโอน:</label>
                        <input className='device-data-input'
                            type="text"
                            id="หมายเลขสินทรัพย์ถาวรโอน_รับโอน"
                            name="หมายเลขสินทรัพย์ถาวรโอน_รับโอน"
                            value={formData.หมายเลขสินทรัพย์ถาวรโอน_รับโอน}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <h5>ที่ดิน</h5>
                   
                </div>
                <button onClick={handleSubmit}>Submit</button>
            </div>
    </div>
  )
}

export default LocationTab
