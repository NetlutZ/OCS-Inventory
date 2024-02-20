import React, { useEffect, useState } from 'react';
import CodingTab from '../tabs/CodingTab';
import GeneralTab from '../tabs/GeneralTab';
import InsuranceTab from '../tabs/InsuranceTab';
import LocationTab from '../tabs/LocationTab';
import OtherTab from '../tabs/OtherTab';
import SortingTab from '../tabs/SortingTab';
import StructureTab from '../tabs/StructureTab';
import TechnicalDetailsTab from '../tabs/TechnicalDetailsTab';
import RFID from '../tabs/RFID';
import './AddDevice.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';
import Layout from './Layout';
import * as ConstanceStrings from '../ConstanceString';

function AddDevice() {
  axios.defaults.withCredentials = true;
  const [formData, setFormData] = useState({
    rfid: '',                         // หมายเลข RFID
    rfidStatus: '',                   // สถานะ RFID
    lastScan: null,                     // การสแกนครั้งล่าสุด     =rfid tab
    purchaseDate: null,                 // วันที่ซื้อ        *
    warrantyExpirationDate: null,       // วันหมดอายุการรับประกัน   =ยังไม่มีใน tab
    activityId: null,                   // กิจกรรม
    userId: null,                       // ผู้ใช้
    image: '',                        // รูปภาพ
    returnDate: null,                   // วันที่คืน      =rfid tab
    maxBorrowDays: 0,                 // วันที่ยืมสูงสุด
    updatedAt: '',                    // อัพเดตเมื่อ
    createdAt: '',                    // สร้างเมื่อ

    name: '',                         // ชื่อ
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
    lastMaintenanceDate: null,          // การบำรุงรักษาครั้งล่าสุด    *
    nextMaintenanceDate: null,          // การบำรุงรักษาครั้งถัดไป    *
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
    policyExpirationDate: null,         // วันหมดอายุของกรรมธรรม์    *
    policyAmount: 0,                 // ยอดเงินกรรมธรรม์
    insuranceValue: 0,               // มูลค่าการประกัน
    replacementCost: 0,              // ต้นทุนในการเปลี่ยน
    lastCostUpdate: null,               // การอัพเดตข้อมูลค่า_ต้นทุนเป็นครั้งคราวครั้งล่าสุด   *
    insuranceDate1: null,               // วันที่ประกัน1    *
    insuranceDate2: null,               // วันที่ประกัน2    *
    marketPriceInsurance: '',         // ประกันภัยที่ราคาตลาดที่เป็นธรรม

    GISReferenceNumber: '',           // หมายเลขอ้างอิงGIS
    responsiblePerson: '',            // ผู้รับผิดชอบ
    locationDescription: '',          // บันทึกที่ตั้ง
    storageLocation: '',              // สถานที่เก็บ
    roomNumber: '',                   // หมายเลขห้อง
    barcode: '',                      // บาร์โค้ด
    physicalInventory: null,            // สินค้าคงคลังทางกายภาพ   *
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

  const [userRole, setUserRole] = useState(null);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}`)
      .then((res) => {
        setUserRole(res.data.role);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [tab, setTab] = useState(1);
  const action = (index) => {
    setTab(index);
  }

  // 0=add 1=edit
  const [functionOptions, setFunctionOptions] = useState(0);

  const handleDateChange = (date, name) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    setFormData({ ...formData, [name]: new Date(formattedDate) });
  };

  const handleInputChange = (event) => {
    console.log(event.target.name);
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    // console.log(formData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationError = {};

    if (typeof (formData.quantity) === 'string') {
      if (!formData.quantity.trim()) {
        validationError.quantity = 'กรุณากรอกข้อมูล'
        setTab(1);
      }
      else if (!(/^\d+(\.\d+)?$/.test(formData.quantity))) {
        validationError.quantity = 'กรุณากรอกเป็นตัวเลข'
        setTab(1);
      }
    }

    if (typeof (formData.policyAmount) === 'string') {
      if (!formData.policyAmount.trim()) {
        validationError.policyAmount = 'กรุณากรอกข้อมูล'
        setTab(4);
      }
      else if (!(/^\d+(\.\d+)?$/.test(formData.policyAmount))) {
        validationError.policyAmount = 'กรุณากรอกเป็นตัวเลข'
        setTab(4);
      }
    }

    if (typeof (formData.insuranceValue) === 'string') {
      if (!formData.insuranceValue.trim()) {
        validationError.insuranceValue = 'กรุณากรอกข้อมูล'
        setTab(4);
      }
      else if (!(/^\d+(\.\d+)?$/.test(formData.insuranceValue))) {
        validationError.insuranceValue = 'กรุณากรอกเป็นตัวเลข'
        setTab(4);
      }
    }

    if (typeof (formData.replacementCost) === 'string') {
      if (!formData.replacementCost.trim()) {
        validationError.replacementCost = 'กรุณากรอกข้อมูล'
        setTab(4);
      }
      else if (!(/^\d+(\.\d+)?$/.test(formData.replacementCost))) {
        validationError.replacementCost = 'กรุณากรอกเป็นตัวเลข'
        setTab(4);
      }
    }

    setError(validationError);
    if (Object.keys(validationError).length === 0) {

      if (choice === 'Upload New Image') {
        try {
          const formDataNewImage = new FormData();
          formDataNewImage.append('image', img)
          console.log('New Form Data:', formDataNewImage.get('image'));
          for (const key in formData) {
            if (formData[key] !== null && formData[key] !== '') {
              formDataNewImage.append(key, formData[key])
            }
          }
          if(formDataNewImage.get('rfidStatus') === ''){
            formDataNewImage.append('rfidStatus', 'InStorage')
          }

          const response = await axios.post(`${process.env.REACT_APP_API}/device`, formDataNewImage);
          Swal.fire({
            title: "Add Device Success!",
            text: "Your device has been added.",
            icon: "success"
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload(true); // Reload the page after user acknowledges the success message
            }
          })
        } catch (error) {
          console.error('Error submitting form:', error);
        }
      } else {
        // for (const key in formData) {
        //   if (formData[key] === "") {
        //     formData[key] = null;
        //   }
        // }

        try {
          formData.image = img;
          formData.rfidStatus = 'InStorage';
          const response = await axios.post(`${process.env.REACT_APP_API}/device`, formData);
          Swal.fire({
            title: "Add Device Success!",
            text: "Your device has been added.",
            icon: "success"
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload(true); // Reload the page after user acknowledges the success message
            }
          });

        } catch (error) {
          console.error('Error submitting form:', error);
        }
      }

    }

  };

  const nextPage = () => {
    const validationError = {};

    if (tab === 1) {
      if (typeof (formData.quantity) === 'string') {
        if (!formData.quantity.trim()) {
          validationError.quantity = 'กรุณากรอกข้อมูล'
          setTab(1);
        }
        else if (!(/^\d+(\.\d+)?$/.test(formData.quantity))) {
          validationError.quantity = 'กรุณากรอกเป็นตัวเลข'
          setTab(1);
        }
      }
    }
    else if (tab === 4) {
      if (typeof (formData.policyAmount) === 'string') {
        if (!formData.policyAmount.trim()) {
          validationError.policyAmount = 'กรุณากรอกข้อมูล'
          setTab(4);
        }
        else if (!(/^\d+(\.\d+)?$/.test(formData.policyAmount))) {
          validationError.policyAmount = 'กรุณากรอกเป็นตัวเลข'
          setTab(4);
        }
      }

      if (typeof (formData.insuranceValue) === 'string') {
        if (!formData.insuranceValue.trim()) {
          validationError.insuranceValue = 'กรุณากรอกข้อมูล'
          setTab(4);
        }
        else if (!(/^\d+(\.\d+)?$/.test(formData.insuranceValue))) {
          validationError.insuranceValue = 'กรุณากรอกเป็นตัวเลข'
          setTab(4);
        }
      }

      if (typeof (formData.replacementCost) === 'string') {
        if (!formData.replacementCost.trim()) {
          validationError.replacementCost = 'กรุณากรอกข้อมูล'
          setTab(4);
        }
        else if (!(/^\d+(\.\d+)?$/.test(formData.replacementCost))) {
          validationError.replacementCost = 'กรุณากรอกเป็นตัวเลข'
          setTab(4);
        }
      }
    }

    setError(validationError);
    if (Object.keys(validationError).length === 0) {
      setTab(tab + 1);

    }

  }

  const [error, setError] = useState('');

  const [choice, setChoice] = useState('')
  const choiceSelected = (event) => {
    setChoice(event.target.value);
  }

  const [img, setImg] = useState();
  const receiveImg = (event) => {
    if (choice === 'Upload New Image') {
      setImg(event)
    } else {
      // formData.image = event;
      setImg(event)
    }
  }

  const tabs = [
    { id: 1, label: 'ทั่วไป', component: <GeneralTab formData={formData} setFormData={setFormData} handleButton={nextPage} handleInputChange={handleInputChange} functionOptions={functionOptions} error={error} choiceSelected={choiceSelected} formDataNewImage={receiveImg} /> },
    { id: 2, label: 'รายละเอียดทางเทคนิค', component: <TechnicalDetailsTab formData={formData} setFormData={setFormData} handleButton={nextPage} handleInputChange={handleInputChange} functionOptions={functionOptions} handleDateChange={handleDateChange} /> },
    { id: 3, label: 'โครงสร้าง', component: <StructureTab formData={formData} setFormData={setFormData} handleButton={nextPage} handleInputChange={handleInputChange} functionOptions={functionOptions} /> },
    { id: 4, label: 'การประกัน', component: <InsuranceTab formData={formData} setFormData={setFormData} handleButton={nextPage} handleInputChange={handleInputChange} functionOptions={functionOptions} error={error} handleDateChange={handleDateChange} /> },
    { id: 5, label: 'ที่ตั้ง', component: <LocationTab formData={formData} setFormData={setFormData} handleButton={nextPage} handleInputChange={handleInputChange} functionOptions={functionOptions} handleDateChange={handleDateChange} /> },
    { id: 6, label: 'การเรียงลำดับ', component: <SortingTab formData={formData} setFormData={setFormData} handleButton={nextPage} handleInputChange={handleInputChange} functionOptions={functionOptions} /> },
    { id: 7, label: 'อื่น ๆ', component: <OtherTab formData={formData} setFormData={setFormData} handleButton={nextPage} handleInputChange={handleInputChange} functionOptions={functionOptions} /> },
    { id: 8, label: 'coding', component: <CodingTab formData={formData} setFormData={setFormData} handleButton={nextPage} handleInputChange={handleInputChange} functionOptions={functionOptions} /> },
    { id: 9, label: 'RFID', component: <RFID formData={formData} setFormData={setFormData} handleButton={handleSubmit} handleInputChange={handleInputChange} functionOptions={functionOptions} handleDateChange={handleDateChange} />}

  ]

  return (
    <Layout>
      {userRole !== null ? (
        userRole === ConstanceStrings.ADMIN ? (
          <div className='box'>
            <div className='tabs'>
              {tabs.map((tabData) => (
                <div key={tabData.id} onClick={() => action(tabData.id)} className={`${tab === tabData.id ? 'tab active-tab' : 'tab'}`}>
                  {tabData.label}
                </div>
              ))}
            </div>

            <div className='device-contents'>
              {tabs.map((tabData) => (
                <div key={tabData.id} className={`${tab === tabData.id ? 'device-content active-content' : 'device-content'}`}>
                  {tabData.component}
                </div>
              ))}
            </div>
          </div>


          // <div className='box'>
          //   <div className='tabs'>
          //     <div onClick={() => action(1)} className={`${tab === 1 ? 'tab active-tab' : 'tab'}`}>
          //       ทั่วไป
          //     </div>
          //     <div onClick={() => action(2)} className={`${tab === 2 ? 'tab active-tab' : 'tab'}`}>
          //       รายละเอียดทางเทคนิค
          //     </div>
          //     <div onClick={() => action(3)} className={`${tab === 3 ? 'tab active-tab' : 'tab'}`}>
          //       โครงสร้าง
          //     </div>
          //     <div onClick={() => action(4)} className={`${tab === 4 ? 'tab active-tab' : 'tab'}`}>
          //       การประกัน
          //     </div>
          //     <div onClick={() => action(5)} className={`${tab === 5 ? 'tab active-tab' : 'tab'}`}>
          //       ที่ตั้ง
          //     </div>
          //     <div onClick={() => action(6)} className={`${tab === 6 ? 'tab active-tab' : 'tab'}`}>
          //       การเรียงลำดับ
          //     </div>
          //     <div onClick={() => action(7)} className={`${tab === 7 ? 'tab active-tab' : 'tab'}`}>
          //       อื่น ๆ
          //     </div>
          //     <div onClick={() => action(8)} className={`${tab === 8 ? 'tab active-tab' : 'tab'}`}>
          //       coding
          //     </div>
          //   </div>

          //   <div className='device-contents'>
          //     <div className={`${tab === 1 ? 'device-content active-content' : 'device-content'}`}>
          //       <GeneralTab formData={formData} setFormData={setFormData} handleButton={nextPage} handleInputChange={handleInputChange} functionOptions={functionOptions} error={error} choiceSelected={choiceSelected} formDataNewImage={receiveImg} />
          //     </div>

          //     <div className={`${tab === 2 ? 'device-content active-content' : 'device-content'}`}>
          //       <TechnicalDetailsTab formData={formData} setFormData={setFormData} handleButton={nextPage} handleInputChange={handleInputChange} functionOptions={functionOptions} handleDateChange={handleDateChange} />
          //     </div>

          //     <div className={`${tab === 3 ? 'device-content active-content' : 'device-content'}`}>
          //       <StructureTab formData={formData} setFormData={setFormData} handleButton={nextPage} handleInputChange={handleInputChange} functionOptions={functionOptions} />
          //     </div>

          //     <div className={`${tab === 4 ? 'device-content active-content' : 'device-content'}`}>
          //       <InsuranceTab formData={formData} setFormData={setFormData} handleButton={nextPage} handleInputChange={handleInputChange} functionOptions={functionOptions} error={error} handleDateChange={handleDateChange} />
          //     </div>

          //     <div className={`${tab === 5 ? 'device-content active-content' : 'device-content'}`}>
          //       <LocationTab formData={formData} setFormData={setFormData} handleButton={nextPage} handleInputChange={handleInputChange} functionOptions={functionOptions} handleDateChange={handleDateChange} />
          //     </div>

          //     <div className={`${tab === 6 ? 'device-content active-content' : 'device-content'}`}>
          //       <SortingTab formData={formData} setFormData={setFormData} handleButton={nextPage} handleInputChange={handleInputChange} functionOptions={functionOptions} />
          //     </div>

          //     <div className={`${tab === 7 ? 'device-content active-content' : 'device-content'}`}>
          //       <OtherTab formData={formData} setFormData={setFormData} handleButton={nextPage} handleInputChange={handleInputChange} functionOptions={functionOptions} />
          //     </div>

          //     <div className={`${tab === 8 ? 'device-content active-content' : 'device-content'}`}>
          //       <CodingTab formData={formData} setFormData={setFormData} handleButton={handleSubmit} handleInputChange={handleInputChange} functionOptions={functionOptions} />
          //     </div>

          //   </div>

          // </div>
        ) : (
          <>NO ACCESS</>
        )
      ) : (
        <></>
      )}
    </Layout>
  )
}

export default AddDevice
