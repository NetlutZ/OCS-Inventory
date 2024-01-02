import { set } from 'date-fns'
import { React, useState } from 'react'
import axios from 'axios'

function GeneralTab({ formData, setFormData, handleInputChange, functionOptions, handleButton, error, choiceSelected, formDataNewImage }) {
    let buttonText = 'Apply'

    if (functionOptions === 0) {
        buttonText = 'Next'
    }

    const [uploadImg, setUploadImg] = useState('')
    const [selectedImage, setSelectedImage] = useState(null);
    const [allImages, setAllImages] = useState([]);
    const [choice, setChoice] = useState()

    // Function to handle file upload
    const handleImageUpload = (e) => {
        setUploadImg(e.target.files[0]);
        formDataNewImage(e.target.files[0])
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };


    // preview selected image
    const handleImageSelection = (imageUrl) => {
        setSelectedImage(imageUrl);
        formDataNewImage(imageUrl.split('/').slice(-1)[0]);
    };


    const radioChange = (e) => {
        setChoice(e.target.value)
        setSelectedImage(null)
        choiceSelected(e)

        // load all images from the database
        if (e.target.value === 'Selected OLd Image') {
            axios.get(`${process.env.REACT_APP_API}/device/display/image`)
                .then(res => {
                    const imagesFromDatabase = [...new Set(res.data
                        .filter(image => image.image !== null)
                        .map(image => `${process.env.REACT_APP_API}/device/image/${image.image}`))];

                    setAllImages(imagesFromDatabase);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }


    return (
        <div>
            <div className="form-container">
                <div className="column-left">
                    <h5>รหัสของระบบ</h5>
                    <div className='formfield'>
                        <label htmlFor="assetGroup">กลุ่มสินทรัพย์ถาวร:</label>
                        <input className='device-data-input'
                            type="text"
                            id="assetGroup"
                            name="assetGroup"
                            value={formData.assetGroup}
                            onChange={(e) => handleInputChange(e)}

                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="assetNumber">หมายเลขสินทรัพย์ถาวร:</label>
                        <input className='device-data-input'
                            type="text"
                            id="assetNumber"
                            name="assetNumber"
                            value={formData.assetNumber}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <h5>คำอธิบาย</h5>
                    <div className='formfield'>
                        <label htmlFor="name">ชื่อ:</label>
                        <input className='device-data-input'
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="searchName">ชื่อสำหรับค้นหา:</label>
                        <input className='device-data-input'
                            type="text"
                            id="searchName"
                            name="searchName"
                            value={formData.searchName}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <h5>คำอธิบาย</h5>
                    <div className='formfield'>
                        <label htmlFor="dataType">ชนิดข้อมูล:</label>
                        <input className='device-data-input'
                            type="text"
                            id="dataType"
                            name="dataType"
                            value={formData.dataType}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="mainType">ชนิดหลัก:</label>
                        <input className='device-data-input'
                            type="text"
                            id="mainType"
                            name="mainType"
                            value={formData.mainType}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="propertyType">ชนิดของคุณสมบัติ:</label>
                        <input className='device-data-input'
                            type="text"
                            id="propertyType"
                            name="propertyType"
                            value={formData.propertyType}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                </div>

                <div className="column-right">
                    <h5>เอกสาร</h5>
                    <div className='formfield'>
                        <label htmlFor="documentLocation">ที่ตั้งเอกสาร:</label>
                        <input className='device-data-input'
                            type="text"
                            id="documentLocation"
                            name="documentLocation"
                            value={formData.documentLocation}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>

                    <h5>ปริมาณ</h5>
                    <div className='formfield'>
                        <label htmlFor="quantity">ปริมาณ:</label>
                        <input className='device-data-input'
                            type="text"
                            id="quantity"
                            name="quantity"
                            value={formData.quantity}
                            onChange={(e) => handleInputChange(e)}
                        />
                        {error.quantity && <p style={{ color: 'red', fontSize: '0.8rem' }}>{error.quantity}</p>}
                    </div>
                    <div className='formfield'>
                        <label htmlFor="unit">หน่วยวัด:</label>
                        <input className='device-data-input'
                            type="text"
                            id="unit"
                            name="unit"
                            value={formData.unit}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>

                    <h5>Split reference</h5>
                    <div className='formfield'>
                        <label htmlFor="originalAsset">Original_asset:</label>
                        <input className='device-data-input'
                            type="text"
                            id="originalAsset"
                            name="originalAsset"
                            value={formData.originalAsset}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="status">สถานะ:</label>
                        <input className='device-data-input'
                            type="text"
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                </div>
            </div>
            <button className='apply-button' onClick={handleButton} >{buttonText}</button>


            <div className="radio-container">
                <div className="custom-radio">
                    <input
                        type="radio"
                        id="old"
                        name="choice"
                        value="Selected OLd Image"
                        onChange={(e) => radioChange(e)}
                        className="hidden-radio"
                    />
                    <label htmlFor="old" className="radio-label">
                        Selected Old Image
                    </label>
                </div>
                <div className="custom-radio">
                    <input
                        type="radio"
                        id="new"
                        name="choice"
                        value="Upload New Image"
                        onChange={(e) => radioChange(e)}
                        className="hidden-radio"
                    />
                    <label htmlFor="new" className="radio-label">
                        Upload New Image
                    </label>
                </div>
            </div>



            <div >
                {choice === 'Selected OLd Image' && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', overflowY: 'scroll', maxHeight: '200px', maxWidth: '400px', margin: '0 auto' }}>
                        {allImages.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Image ${index}`}
                                style={{
                                    // maxWidth: '100px',
                                    width: '100px',
                                    height: '100px',
                                    margin: '5px',
                                    cursor: 'pointer',
                                    border: selectedImage === image ? '2px solid blue' : '2px solid transparent',
                                }}
                                onClick={() => handleImageSelection(image)}
                            />
                        ))}
                    </div>
                ) || choice === 'Upload New Image' && (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e)} />
                    </div>
                )}
            </div>


            <h3 style={{ textAlign: "center" }}>Selected Image</h3>
            {selectedImage && (
                // style image center
                <img src={selectedImage} alt="Selected" style={{ width: '300px', height: 'auto', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
            )}



        </div>
    )
}

export default GeneralTab
