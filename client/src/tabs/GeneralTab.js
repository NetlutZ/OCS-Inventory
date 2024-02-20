import { set } from 'date-fns'
import { React, useState, useEffect } from 'react'
import axios from 'axios'
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';

function GeneralTab({ formData, setFormData, handleInputChange, functionOptions, handleButton, error, choiceSelected, formDataNewImage }) {
    let buttonText = 'Apply'

    if (functionOptions === 0) {
        buttonText = 'Next'
    }

    const img = formData.image;

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


    //EXCEL UPLOAD
    const ExcelDateToJSDate = (date) => {
        let converted_date = new Date(Math.round((date - 25569) * 864e5));
        converted_date = String(converted_date).slice(4, 15)
        date = converted_date.split(" ")
        let day = date[1];
        let month = date[0];
        month = "JanFebMarAprMayJunJulAugSepOctNovDec".indexOf(month) / 3 + 1
        if (month.toString().length <= 1)
            month = '0' + month
        let year = date[2];
        return String(year + '-' + month + '-' + day)
    }

    let parsedData = null;
    const postFile = () => {
        parsedData.forEach((item) => {
            axios.post(`${process.env.REACT_APP_API}/device/`, item)
                .then((response) => {
                    console.log('Data posted successfully:', response.data);
                    // Perform any additional actions after successful posting
                })
                .catch((error) => {
                    console.error('Error posting data:', error);
                    // Handle errors if the post request fails
                });
        });

        Swal.fire({
            title: "Add Device Success!",
            text: "Your device has been added.",
            icon: "success"
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.reload(true); // Reload the page after user acknowledges the success message
            }
        })
    }

    const handleFileUpload = (e) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            parsedData = XLSX.utils.sheet_to_json(sheet, { defval: null });

            parsedData.forEach((row) => {
                for (const key in row) {
                    if (Object.prototype.hasOwnProperty.call(row, key)) {
                        const value = row[key];
                        // Check if the column is 'purchaseDate' or 'warrantyExpirationDate' and the value is a valid Excel date serial number
                        if ((key === 'purchaseDate' || key === 'warrantyExpirationDate') && typeof value === 'number' && value > 0) {
                            row[key] = ExcelDateToJSDate(value); // Convert the Excel date serial number to the desired format
                        }
                    }
                }
            });


            parsedData.forEach((item) => {
                console.log(item);
            });

            // parsedData.forEach((item) => {
            //     axios.post(`${process.env.REACT_APP_API}/device/`, item)
            //         .then((response) => {
            //             console.log('Data posted successfully:', response.data);
            //             // Perform any additional actions after successful posting
            //         })
            //         .catch((error) => {
            //             console.error('Error posting data:', error);
            //             // Handle errors if the post request fails
            //         });
            // });

        };
        reader.readAsBinaryString(e.target.files[0]);
    };

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
                    <h5>รูปภาพ</h5>
                    <div className='formfield'>
                        {/* <img src={`${process.env.REACT_APP_API}/device/image/${formData.image}`} style={{width:'100px', height:'auto'}}/> */}
                        <img src={`${process.env.REACT_APP_API}/device/image/${img}`} style={{ width: '100px', height: 'auto' }} />
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


            <div className="radio-container" style={{marginTop:'20px'}}>
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


            <button className='apply-button' onClick={handleButton} >{buttonText}</button>

            {functionOptions === 0 ?
                <>
                    <div className="rectangle" style={{width:'100%', height:'2rem', backgroundColor:'#B2DDFF', color:'white', display:'flex', alignItems:"center", justifyContent:'center', marginTop:"10px", marginBottom:"10px"}}>
                        OR CHOOSE EXCEL FILE
                    </div>

                    <div>
                        <label htmlFor="files" className="btn">Select Excel</label>
                        <input
                            id="files"
                            type="file"
                            accept=".xlsx, .xls"
                            onChange={handleFileUpload}
                        />
                        <button onClick={postFile} >Submit Excel File</button>
                    </div>
                </>
                : <></>}


        </div>
    )
}

export default GeneralTab
