import React from 'react'

function SortingTab({ formData, setFormData, handleInputChange, handleSubmit }) {
  return (
    <div>
      <div className="form-container">
                <div className="column-left">
                    <h5>การเรียงลำดับ</h5>
                    <div className='formfield'>
                        <label htmlFor="เรียงลำดับฟิลด์1">เรียงลำดับฟิลด์1:</label>
                        <input className='device-data-input'
                            type="text"
                            id="เรียงลำดับฟิลด์1"
                            name="เรียงลำดับฟิลด์1"
                            value={formData.เรียงลำดับฟิลด์1}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="เรียงลำดับฟิลด์2">เรียงลำดับฟิลด์2:</label>
                        <input className='device-data-input'
                            type="text"
                            id="เรียงลำดับฟิลด์2"
                            name="เรียงลำดับฟิลด์2"
                            value={formData.เรียงลำดับฟิลด์2}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="เรียงลำดับฟิลด์3">เรียงลำดับฟิลด์3:</label>
                        <input className='device-data-input'
                            type="text"
                            id="เรียงลำดับฟิลด์3"
                            name="เรียงลำดับฟิลด์3"
                            value={formData.เรียงลำดับฟิลด์3}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                </div>

                
                   
                <button onClick={handleSubmit}>Submit</button>
            </div>
    </div>
  )
}

export default SortingTab
