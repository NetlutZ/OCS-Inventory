import React from 'react'

function SortingTab({ formData, setFormData, handleInputChange, handleButton, functionOptions }) {
    let buttonText = 'Apply'

    if (functionOptions === 0) {
        buttonText = 'Next'
    }
    return (
        <div>
            <div className="form-container">
                <div className="column-left">
                    <h5>การเรียงลำดับ</h5>
                    <div className='formfield'>
                        <label htmlFor="fieldOrder1">เรียงลำดับฟิลด์1:</label>
                        <input className='device-data-input'
                            type="text"
                            id="fieldOrder1"
                            name="fieldOrder1"
                            value={formData.fieldOrder1}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="fieldOrder2">เรียงลำดับฟิลด์2:</label>
                        <input className='device-data-input'
                            type="text"
                            id="fieldOrder2"
                            name="fieldOrder2"
                            value={formData.fieldOrder2}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="fieldOrder3">เรียงลำดับฟิลด์3:</label>
                        <input className='device-data-input'
                            type="text"
                            id="fieldOrder3"
                            name="fieldOrder3"
                            value={formData.fieldOrder3}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                </div>
            </div>
            <button className='apply-button' onClick={handleButton} >{buttonText}</button>
        </div>
    )
}

export default SortingTab
