import React, { useEffect, useState } from 'react';
import CodingTab from '../tabs/CodingTab';
import GeneralTab from '../tabs/GeneralTab';
import InsuranceTab from '../tabs/InsuranceTab';
import LocationTab from '../tabs/LocationTab';
import OtherTab from '../tabs/OtherTab';
import SortingTab from '../tabs/SortingTab';
import StructureTab from '../tabs/StructureTab';
import TechnicalDetailsTab from '../tabs/TechnicalDetailsTab';
import OverviewTab from '../tabs/OverviewTab';
import RFID from '../tabs/RFID';
import './DeviceDetail.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { set, format } from 'date-fns';
import moment from 'moment';
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';

function Inventory() {
    const [formData, setFormData] = useState({
        rfid: '',                         // หมายเลข RFID
        rfidStatus: '',                   // สถานะ RFID
        lastScan: null,                     // การสแกนครั้งล่าสุด
        purchaseDate: null,                 // วันที่ซื้อ
        warrantyExpirationDate: null,       // วันหมดอายุการรับประกัน
        activityId: null,                   // กิจกรรม
        userId: null,                       // ผู้ใช้
        image: '',                        // รูปภาพ
        returnDate: null,                   // วันที่คืน
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

    const [tab, setTab] = useState(0);
    const [error, setError] = useState({});
    const action = (index) => {
        setTab(index);
        if (index === 0) {
            // window.location.reload(true);
            setOpenTab(false);
        }
    }
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}`)
          .then((res) => {
            if (res.data.loggedIn) {

            } else {
              navigate('/')
            }
          })
          .catch((err) => {
            console.log(err)
          });
      }, []);

    const handleDateChange = (date, name) => {
        const formattedDate = moment(date).format('YYYY-MM-DD');
        setFormData({ ...formData, [name]: new Date(formattedDate) });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        // console.log(formData);
    };

    const handleSubmit = async (event) => {
        console.log(formData);
        event.preventDefault();

        const validationError = {}
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

            if (formData.id === undefined) {
                Swal.fire({
                    title: "No Device Selected!",
                    text: "Please select a device to update",
                    icon: "error"
                }).then((result) => {

                });
            }
            else {

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

                        const response = await axios.put(`${process.env.REACT_APP_API}/device/${formData.id}`, formDataNewImage);
                        Swal.fire({
                            title: "Update Success!",
                            text: "Your device has been updated",
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
                    //     if (formData[key] === "") {
                    //         formData[key] = null;
                    //     }
                    // }
                    try {
                        formData.image = img;
                        const response = await axios.put(`${process.env.REACT_APP_API}/device/${formData.id}`, formData);
                        Swal.fire({
                            title: "Update Success!",
                            text: "Your device has been updated",
                            icon: "success"
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.reload(true); // Reload the page after user acknowledges the success message
                            }
                        })


                    } catch (error) {
                        console.error('Error submitting form:', error);
                    }
                }
            }

        }
    };

    const [choice, setChoice] = useState();
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

    const [openTab, setOpenTab] = useState(false);

    return (
        <Layout>
            <div className='box'>
                <div>
                    {openTab ? (
                        <div className='tabs'>
                            <div onClick={() => action(0)} className={`${tab === 0 ? 'tab active-tab' : 'tab'}`}>
                                ภาพรวม
                            </div>
                            <div onClick={() => action(1)} className={`${tab === 1 ? 'tab active-tab' : 'tab'}`}>
                                ทั่วไป
                            </div>
                            <div onClick={() => action(2)} className={`${tab === 2 ? 'tab active-tab' : 'tab'}`}>
                                รายละเอียดทางเทคนิค
                            </div>
                            <div onClick={() => action(3)} className={`${tab === 3 ? 'tab active-tab' : 'tab'}`}>
                                โครงสร้าง
                            </div>
                            <div onClick={() => action(4)} className={`${tab === 4 ? 'tab active-tab' : 'tab'}`}>
                                การประกัน
                            </div>
                            <div onClick={() => action(5)} className={`${tab === 5 ? 'tab active-tab' : 'tab'}`}>
                                ที่ตั้ง
                            </div>
                            <div onClick={() => action(6)} className={`${tab === 6 ? 'tab active-tab' : 'tab'}`}>
                                การเรียงลำดับ
                            </div>
                            <div onClick={() => action(7)} className={`${tab === 7 ? 'tab active-tab' : 'tab'}`}>
                                อื่น ๆ
                            </div>
                            <div onClick={() => action(8)} className={`${tab === 8 ? 'tab active-tab' : 'tab'}`}>
                                coding
                            </div>
                            <div onClick={() => action(9)} className={`${tab === 9 ? 'tab active-tab' : 'tab'}`}>
                                RFID
                            </div>
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>

                <div className='device-contents'>
                    <div className={`${tab === 0 ? 'device-content active-content' : 'device-content'}`}>
                        <OverviewTab formData={formData} setFormData={setFormData} setTab={setTab} setOpenTab={setOpenTab}/>
                    </div>
                    <div className={`${tab === 1 ? 'device-content active-content' : 'device-content'}`}>
                        <GeneralTab formData={formData} setFormData={setFormData} handleButton={handleSubmit} handleInputChange={handleInputChange} error={error} choiceSelected={choiceSelected} formDataNewImage={receiveImg} />
                    </div>

                    <div className={`${tab === 2 ? 'device-content active-content' : 'device-content'}`}>
                        <TechnicalDetailsTab formData={formData} setFormData={setFormData} handleButton={handleSubmit} handleInputChange={handleInputChange} handleDateChange={handleDateChange} />
                    </div>

                    <div className={`${tab === 3 ? 'device-content active-content' : 'device-content'}`}>
                        <StructureTab formData={formData} setFormData={setFormData} handleButton={handleSubmit} handleInputChange={handleInputChange} />
                    </div>

                    <div className={`${tab === 4 ? 'device-content active-content' : 'device-content'}`}>
                        <InsuranceTab formData={formData} setFormData={setFormData} handleButton={handleSubmit} handleInputChange={handleInputChange} error={error} handleDateChange={handleDateChange} />
                    </div>

                    <div className={`${tab === 5 ? 'device-content active-content' : 'device-content'}`}>
                        <LocationTab formData={formData} setFormData={setFormData} handleButton={handleSubmit} handleInputChange={handleInputChange} handleDateChange={handleDateChange} />
                    </div>

                    <div className={`${tab === 6 ? 'device-content active-content' : 'device-content'}`}>
                        <SortingTab formData={formData} setFormData={setFormData} handleButton={handleSubmit} handleInputChange={handleInputChange} />
                    </div>

                    <div className={`${tab === 7 ? 'device-content active-content' : 'device-content'}`}>
                        <OtherTab formData={formData} setFormData={setFormData} handleButton={handleSubmit} handleInputChange={handleInputChange} />
                    </div>

                    <div className={`${tab === 8 ? 'device-content active-content' : 'device-content'}`}>
                        <CodingTab formData={formData} setFormData={setFormData} handleButton={handleSubmit} handleInputChange={handleInputChange} />
                    </div>

                    <div className={`${tab === 9 ? 'device-content active-content' : 'device-content'}`}>
                        <RFID formData={formData} setFormData={setFormData} handleButton={handleSubmit} handleInputChange={handleInputChange} handleDateChange={handleDateChange}/>
                    </div>
                </div>

            </div>
        </Layout>
    )
}

export default Inventory
