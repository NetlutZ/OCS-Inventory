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
                        <label htmlFor="mainPermanentAsset">สินทรัพย์ถาวรหลัก:</label>
                        <input className='device-data-input'
                            type="text"
                            id="mainPermanentAsset"
                            name="mainPermanentAsset"
                            value={formData.mainPermanentAsset}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                   
                </div>
            </div>
            <button className='apply-button' onClick={handleSubmit} >Submit</button>
    </div>
  )
}

export default StructureTab
