import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import './Settings.css'
import GeneralTab from './GeneralTab';
import TechnicalDetailsTab from './TechnicalDetailsTab';
import StructureTab from './StructureTab';
import InsuranceTab from './InsuranceTab';
import LocationTab from './LocationTab';
import SortingTab from './SortingTab';
import OtherTab from './OtherTab';
import CodingTab from './CodingTab';

function DeviceDetail() {
  const [state, setState] = useState(1);
  const action = (index) => {
    setState(index);
  }

  const [formData, setFormData] = useState({
    กลุ่มสินทรัพย์ถาวร: '',
    หมายเลขสินทรัพย์ถาวร: '',
    ชื่อ: '',
    ชื่อสำหรับค้นหา: '',
    ชนิดข้อมูล: '',
    ชนิดหลัก: '',
    ชนิดของคุณสมบัติ: '',
    ที่ตั้งเอกสาร: '',
    ปริมาณ: '',
    หน่วยวัด: '',
    Original_asset: '',
    สถานะ: '',

    จัดทำ: '',
    โมเดล: '',
    ปีของรุ่น: '',
    หมายเลขลำดับประจำสินค้า: '',
    รายละเอียดทางเทคนิค: '',
    การบำรุงรักษาครั้งล่าสุด: '',
    การบำรุงรักษาครั้งถัดไป: '',
    ยี่ห้อ: '',
    บัญชีผู้จัดจำหน่าย: '',
    ชื่อผู้ขาย: '',
    ที่อยู่ผู้ขาย: '',
    โทรศัพท์: '',
    โทรสาร: '',
    เลขที่เอกสาร: '',
    telephone: '',

    สินทรัพย์ถาวรหลัก: '',

    บริษัทประกันภัย: '',
    ตัวแทน: '',
    หมายเลขกรรมธรรม์: '',
    วันหมดอายุของกรรมธรรม์: '',
    ยอดเงินกรรมธรรม์: '',
    มูลค่าการประกัน: '',
    ต้นทุนในการเปลี่ยน: '',
    การอัพเดตข้อมูลค่า_ต้นทุนเป็นครั้งคราวครั้งล่าสุด: '',
    วันที่ประกัน1: '',
    วันที่ประกัน2: '',
    ประกันภัยที่ราคาตลาดที่เป็นธรรม: '',

    หมายเลขอ้างอิงGIS: '',
    ผู้รับผิดชอบ: '',
    บันทึกที่ตั้ง: '',
    สถานที่เก็บ: '',
    หมายเลขห้อง: '',
    บาร์โค้ด: '',
    สินค้าคงคลังทางกายภาพ: '',
    ผู้ติดต่อ: '',
    หมายเหตุการเช่า: '',
    ผู้ถือกรรมสิทธิ์: '',
    หมายเลขสินทรัพย์ถาวรโอน_รับโอน: '',

    เรียงลำดับฟิลด์1: '',
    เรียงลำดับฟิลด์2: '',
    เรียงลำดับฟิลด์3: '',

    ข้อมูลอ้างอิง: '',
    ข้อคิดเห็น: '',
    ข้อจำกัดในการตัดจำหน่าย: '',
    หน่วยงานพัสดุ: '',
    ประเภทพัสดุ: '',
    ชนิดพัสดุ: '',
    รหัสปีพัสดุ: '',
    IVZ_FSNum: '',
    ประเภทแหล่งเงินพัสดุ: '',
    รายละเอียดพัสดุ: '',

    วิทยาเขต: '',
    ส่วนงาน: '',
    ที่ตั้ง: '',
    ประเภท: '',
    Running: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    // setGeneralData({ ...generalData, [name]: value });
    // console.log(formData);
    // console.log(generalData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form Data:', formData);
    // console.log('General Data:', generalData);
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

          {/* <div className="form-container">
            <div className="column-left">
              <h5>Left Column</h5>
              <div className='formfield'>
                <label htmlFor="field1">Field 1</label>
                <input className='device-data-input'
                  type="text"
                  id="field1"
                  name="field1"
                  value={formData.field1}
                  onChange={handleInputChange}
                  
                />
              </div>
              <div  className='formfield'>
                <label htmlFor="field2">Field 2</label>
                <input className='device-data-input'
                  type="text"
                  id="field2"
                  name="field2"
                  value={formData.field2}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="column-right">
              <h2>Right Column</h2>
              <div>
                <label htmlFor="field3">Field 3</label>
                <input
                  type="text"
                  id="field3"
                  name="field3"
                  value={formData.field3}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="field4">Field 4</label>
                <input
                  type="text"
                  id="field4"
                  name="field4"
                  value={formData.field4}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <button onClick={handleSubmit}>Submit</button>
          </div> */}

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
