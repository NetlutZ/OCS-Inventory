import React from 'react'

function StructureTab({ formData, setFormData, handleInputChange, handleSubmit }) {
  return (
    <div>
      <div className="form-container">
                <div className="column-left">
                    <h5>โครงสร้างส่วนประกอบ</h5>
                    {/* <div className='formfield'>
                        <label htmlFor="จัดทำ">จัดทำ:</label>
                        <input className='device-data-input'
                            type="text"
                            id="จัดทำ"
                            name="จัดทำ"
                            value={formData.จัดทำ}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div> */}
                </div>

                <div className="column-right">
                    <h5>สินทรัพย์ถาวรหลัก</h5>
                    <div className='formfield'>
                        <label htmlFor="สินทรัพย์ถาวรหลัก">สินทรัพย์ถาวรหลัก:</label>
                        <input className='device-data-input'
                            type="text"
                            id="สินทรัพย์ถาวรหลัก"
                            name="สินทรัพย์ถาวรหลัก"
                            value={formData.สินทรัพย์ถาวรหลัก}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                   
                </div>
                <button onClick={handleSubmit}>Submit</button>
            </div>
    </div>
  )
}

export default StructureTab
