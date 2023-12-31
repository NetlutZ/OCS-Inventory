import React from 'react'

function CodingTab({ formData, setFormData, handleInputChange, handleSubmit }) {
  return (
    <div>
      <div className="form-container">
                <div className="column-left">
                    <h5>Coding</h5>
                    <div className='formfield'>
                        <label htmlFor="campus">วิทยาเขต:</label>
                        <input className='device-data-input'
                            type="text"
                            id="campus"
                            name="campus"
                            value={formData.campus}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="department">ส่วนงาน:</label>
                        <input className='device-data-input'
                            type="text"
                            id="department"
                            name="department"
                            value={formData.department}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="location">ที่ตั้ง:</label>
                        <input className='device-data-input'
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="type">ประเภท:</label>
                        <input className='device-data-input'
                            type="text"
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="running">Running:</label>
                        <input className='device-data-input'
                            type="text"
                            id="running"
                            name="running"
                            value={formData.running}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <h5>จำนวนพื้นที่</h5>
                </div>

            </div>
            <button className='apply-button' onClick={handleSubmit} >Submit</button>
    </div>
  )
}

export default CodingTab
