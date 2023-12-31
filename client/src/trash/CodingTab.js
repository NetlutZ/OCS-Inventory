import React from 'react'

function CodingTab({ formData, setFormData, handleInputChange, handleSubmit }) {
  return (
    <div>
      <div className="form-container">
                <div className="column-left">
                    <h5>Coding</h5>
                    <div className='formfield'>
                        <label htmlFor="วิทยาเขต">วิทยาเขต:</label>
                        <input className='device-data-input'
                            type="text"
                            id="วิทยาเขต"
                            name="วิทยาเขต"
                            value={formData.วิทยาเขต}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="ส่วนงาน">ส่วนงาน:</label>
                        <input className='device-data-input'
                            type="text"
                            id="ส่วนงาน"
                            name="ส่วนงาน"
                            value={formData.ส่วนงาน}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="ที่ตั้ง">ที่ตั้ง:</label>
                        <input className='device-data-input'
                            type="text"
                            id="ที่ตั้ง"
                            name="ที่ตั้ง"
                            value={formData.ที่ตั้ง}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="ประเภท">ประเภท:</label>
                        <input className='device-data-input'
                            type="text"
                            id="ประเภท"
                            name="ประเภท"
                            value={formData.ประเภท}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="Running">Running:</label>
                        <input className='device-data-input'
                            type="text"
                            id="Running"
                            name="Running"
                            value={formData.Running}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <h5>จำนวนพื้นที่</h5>
                </div>

               
                <button onClick={handleSubmit}>Submit</button>
            </div>
    </div>
  )
}

export default CodingTab
