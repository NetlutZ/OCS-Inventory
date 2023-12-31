import React, { useEffect, useState } from 'react';
import CodingTab from '../tabs/CodingTab';
import GeneralTab from '../tabs/GeneralTab';
import InsuranceTab from '../tabs/InsuranceTab';
import LocationTab from '../tabs/LocationTab';
import OtherTab from '../tabs/OtherTab';
import SortingTab from '../tabs/SortingTab';
import StructureTab from '../tabs/StructureTab';
import TechnicalDetailsTab from '../tabs/TechnicalDetailsTab';
import './DeviceDetail.css';

function DeviceDetail() {
  const [formData, setFormData] = useState({
    assetGroup: '',                   // กลุ่มสินทรัพย์ถาวร
    assetNumber: '',                  // หมายเลขสินทรัพย์ถาวร
    name: '',                         // ชื่อ
    searchName: '',                   // ชื่อสำหรับค้นหา
    dataType: '',                     // ชนิดข้อมูล
    mainType: '',                     // ชนิดหลัก
    propertyType: '',                 // ชนิดของคุณสมบัติ
    documentLocation: '',             // ที่ตั้งเอกสาร
    quantity: '',                     // ปริมาณ
    unit: '',                         // หน่วยวัด
    originalAsset: '',                // Original_asset
    status: '',                       // สถานะ

    createdBy: '',                    // จัดทำ
    model: '',                        // โมเดล
    modelYear: '',                    // ปีของรุ่น
    serialNumber: '',                 // หมายเลขลำดับประจำสินค้า
    technicalDetails: '',             // รายละเอียดทางเทคนิค
    lastMaintenanceDate: '',          // การบำรุงรักษาครั้งล่าสุด
    nextMaintenanceDate: '',          // การบำรุงรักษาครั้งถัดไป
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
    policyExpirationDate: '',         // วันหมดอายุของกรรมธรรม์
    policyAmount: '',                 // ยอดเงินกรรมธรรม์
    insuranceValue: '',               // มูลค่าการประกัน
    replacementCost: '',              // ต้นทุนในการเปลี่ยน
    lastCostUpdate: '',               // การอัพเดตข้อมูลค่า_ต้นทุนเป็นครั้งคราวครั้งล่าสุด
    insuranceDate1: '',               // วันที่ประกัน1
    insuranceDate2: '',               // วันที่ประกัน2
    marketPriceInsurance: '',         // ประกันภัยที่ราคาตลาดที่เป็นธรรม

    GISReferenceNumber: '',           // หมายเลขอ้างอิงGIS
    responsiblePerson: '',            // ผู้รับผิดชอบ
    locationDescription: '',          // บันทึกที่ตั้ง
    storageLocation: '',              // สถานที่เก็บ
    roomNumber: '',                   // หมายเลขห้อง
    barcode: '',                      // บาร์โค้ด
    physicalInventory: '',            // สินค้าคงคลังทางกายภาพ
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

  const [state, setState] = useState(1);
  const action = (index) => {
    setState(index);
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    // console.log(formData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form Data:', formData);
  };



  return (
    <div className='box'>

      <div className='tabs'>
        <div onClick={() => action(1)} className={`${state === 1 ? 'tab active-tab' : 'tab'}`}>
          ทั่วไป
        </div>
        <div onClick={() => action(2)} className={`${state === 2 ? 'tab active-tab' : 'tab'}`}>
          รายละเอียดทางเทคนิค
        </div>
        <div onClick={() => action(3)} className={`${state === 3 ? 'tab active-tab' : 'tab'}`}>
          โครงสร้าง
        </div>
        <div onClick={() => action(4)} className={`${state === 4 ? 'tab active-tab' : 'tab'}`}>
          การประกัน
        </div>
        <div onClick={() => action(5)} className={`${state === 5 ? 'tab active-tab' : 'tab'}`}>
          ที่ตั้ง
        </div>
        <div onClick={() => action(6)} className={`${state === 6 ? 'tab active-tab' : 'tab'}`}>
          การเรียงลำดับ
        </div>
        <div onClick={() => action(7)} className={`${state === 7 ? 'tab active-tab' : 'tab'}`}>
          อื่น ๆ
        </div>
        <div onClick={() => action(8)} className={`${state === 8 ? 'tab active-tab' : 'tab'}`}>
          coding
        </div>
      </div>

      <div className='device-contents'>
        <div className={`${state === 1 ? 'device-content active-content' : 'device-content'}`}>
          <GeneralTab formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} handleInputChange={handleInputChange} />
        </div>

        <div className={`${state === 2 ? 'device-content active-content' : 'device-content'}`}>
          <TechnicalDetailsTab formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} handleInputChange={handleInputChange} />
        </div>

        <div className={`${state === 3 ? 'device-content active-content' : 'device-content'}`}>
          <StructureTab formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} handleInputChange={handleInputChange} />
        </div>

        <div className={`${state === 4 ? 'device-content active-content' : 'device-content'}`}>
          <InsuranceTab formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} handleInputChange={handleInputChange} />
        </div>

        <div className={`${state === 5 ? 'device-content active-content' : 'device-content'}`}>
          <LocationTab formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} handleInputChange={handleInputChange} />
        </div>

        <div className={`${state === 6 ? 'device-content active-content' : 'device-content'}`}>
          <SortingTab formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} handleInputChange={handleInputChange} />
        </div>

        <div className={`${state === 7 ? 'device-content active-content' : 'device-content'}`}>
          <OtherTab formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} handleInputChange={handleInputChange} />
        </div>

        <div className={`${state === 8 ? 'device-content active-content' : 'device-content'}`}>
          <CodingTab formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} handleInputChange={handleInputChange} />
        </div>


      </div>

    </div>
  )
}

export default DeviceDetail
