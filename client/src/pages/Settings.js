import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import './Settings.css'
import { set } from 'date-fns';

function Settings() {
  const [formData1, setFormData1] = useState({
    rfid: '',                         // หมายเลข RFID
    rfidStatus: '',                   // สถานะ RFID
    lastScan: null,                     // การสแกนครั้งล่าสุด
    purchaseDate: null,                 // วันที่ซื้อ
    warrantyExpirationDate: null,       // วันหมดอายุการรับประกัน
    activityId: null,                   // กิจกรรม
    image: '',                        // รูปภาพ
    updatedAt: '',                    // อัพเดตเมื่อ
    createdAt: '',                    // สร้างเมื่อ

    name: 'BBBB',                         // ชื่อ
    status: '',                       // สถานะ
    assetGroup: '',                   // กลุ่มสินทรัพย์ถาวร
    assetNumber: '',                  // หมายเลขสินทรัพย์ถาวร
    searchName: '',                   // ชื่อสำหรับค้นหา
    dataType: '',                     // ชนิดข้อมูล
    mainType: '',                     // ชนิดหลัก
    propertyType: '',                 // ชนิดของคุณสมบัติ
    documentLocation: '',             // ที่ตั้งเอกสาร
    quantity: 0,                     // ปริมาณ
    unit: '',                         // หน่วยวัด
    originalAsset: '',                // Original_asset

    createdBy: '',                    // จัดทำ
    model: '',                        // โมเดล
    modelYear: '',                    // ปีของรุ่น
    serialNumber: '',                 // หมายเลขลำดับประจำสินค้า
    technicalDetails: '',             // รายละเอียดทางเทคนิค
    lastMaintenanceDate: null,          // การบำรุงรักษาครั้งล่าสุด
    nextMaintenanceDate: null,          // การบำรุงรักษาครั้งถัดไป
    brand: '',                        // ยี่ห้อ
    distributorAccount: '',           // บัญชีผู้จัดจำหน่าย
    sellerName: '',                   // ชื่อผู้ขาย
    sellerAddress: '',                // ที่อยู่ผู้ขาย
    phone: '',                        // โทรศัพท์
    fax: '',                          // โทรสาร
    documentNumber: '',               // เลขที่เอกสาร
    telephone: '',                    // telephone

    mainPermanentAsset: '',           // สินทรัพย์ถาวรหลัก

    insuranceCompany: '',             // บริษัทประกันภัย
    agent: '',                        // ตัวแทน
    policyNumber: '',                 // หมายเลขกรรมธรรม์
    policyExpirationDate: null,         // วันหมดอายุของกรรมธรรม์
    policyAmount: 0,                 // ยอดเงินกรรมธรรม์
    insuranceValue: 0,               // มูลค่าการประกัน
    replacementCost: 0,              // ต้นทุนในการเปลี่ยน
    lastCostUpdate: null,               // การอัพเดตข้อมูลค่า_ต้นทุนเป็นครั้งคราวครั้งล่าสุด
    insuranceDate1: null,               // วันที่ประกัน1
    insuranceDate2: null,               // วันที่ประกัน2
    marketPriceInsurance: '',         // ประกันภัยที่ราคาตลาดที่เป็นธรรม

    GISReferenceNumber: '',           // หมายเลขอ้างอิงGIS
    responsiblePerson: '',            // ผู้รับผิดชอบ
    locationDescription: '',          // บันทึกที่ตั้ง
    storageLocation: '',              // สถานที่เก็บ
    roomNumber: '',                   // หมายเลขห้อง
    barcode: '',                      // บาร์โค้ด
    physicalInventory: null,            // สินค้าคงคลังทางกายภาพ
    contactPerson: '',                // ผู้ติดต่อ
    rentalNotes: '',                  // หมายเหตุการเช่า
    rightsHolder: '',                 // ผู้ถือกรรมสิทธิ์
    transferredAssetNumber: '',       // หมายเลขสินทรัพย์ถาวรโอน_รับโอน

    fieldOrder1: '',                  // เรียงลำดับฟิลด์1
    fieldOrder2: '',                  // เรียงลำดับฟิลด์2
    fieldOrder3: '',                  // เรียงลำดับฟิลด์3

    referenceData: '',                // ข้อมูลอ้างอิง
    comments: '',                     // ข้อคิดเห็น
    disposalConstraints: '',          // ข้อจำกัดในการตัดจำหน่าย
    procurementUnit: '',              // หน่วยงานพัสดุ
    procurementType: '',              // ประเภทพัสดุ
    procurementCategory: '',          // ชนิดพัสดุ
    procurementYearCode: '',          // รหัสปีพัสดุ
    IVZ_FsNum: '',                     // IVZ_FSNum
    procurementSourceType: '',        // ประเภทแหล่งเงินพัสดุ
    procurementDetails: '',           // รายละเอียดพัสดุ

    campus: '',                       // วิทยาเขต
    department: '',                   // ส่วนงาน
    location: '',                     // ที่ตั้ง
    type: '',                         // ประเภท
    running: '',                      // Running
  });


  const [uploadImg, setUploadImg] = useState('')
  const [selectedImage, setSelectedImage] = useState(null);
  const [allImages, setAllImages] = useState([]);
  const [choice, setChoice] = useState()

  // Function to handle file upload
  const handleImageUpload = (e) => {
    setUploadImg(e.target.files[0]);

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
  };


  const radioChange = (e) => {
    setChoice(e.target.value)
    setSelectedImage(null)


    // load all images from the database
    if (e.target.value === 'Selected OLd Image') {
      axios.get(`${process.env.REACT_APP_API}/device/display/image`)
        .then(res => {
          const imagesFromDatabase = [...new Set(res.data
            .filter(image => image.image !== null)
            .map(image => `${process.env.REACT_APP_API}/device/image/${image.image}`))];
          console.log(imagesFromDatabase)

          setAllImages(imagesFromDatabase);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (choice === 'Upload New Image') {
      const formData = new FormData()
      formData.append('image', uploadImg)

      for (const key in formData1) {
        if (formData1[key] !== null && formData1[key] !== '') {
          console.log(key + ' ' + formData1[key])
          formData.append(key, formData1[key])
        }
      }
      axios.post(`${process.env.REACT_APP_API}/device`, formData)
        .then(res => {
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
    else if (choice === 'Selected OLd Image') {
      const imageName = selectedImage.split('/').slice(-1)[0];
      formData1.image = imageName

      axios.post(`${process.env.REACT_APP_API}/device`, formData1)
        .then(res => {
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }


  return (
    <div>

      {/* style in center  */}
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
        <img src={selectedImage} alt="Selected" style={{ width: '100px', height: '100px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
      )}

      <button onClick={(e) => { handleSubmit(e) }}>Submit</button>
    </div>
  )
}

export default Settings
