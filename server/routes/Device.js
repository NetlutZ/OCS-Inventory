const { Device } = require('../models');
const express = require('express');
const router = express.Router();
const { Activitys } = require('../models');
const { Op } = require("sequelize");
const moment = require('moment');
const multer = require('multer');
const { fileURLToPath } = require('url');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/')
    }
    ,
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({ storage })

router.get('/', (req, res) => {

    const { name, location, rfidStatus, purchaseDate, warrantyExpirationDate, rfid, userId } = req.query;
    const filters = {};
    if (name) {
        // filters.name = name.split(',').map(str => str.trim());
        filters.name = name;
    }
    if (location) {
        // filters.location = location.split(',').map(str => str.trim());
        filters.location = location;
    }
    if (rfidStatus) {
        // filters.status = status.split(',').map(str => str.trim());
        filters.rfidStatus = rfidStatus;
    }
    if (rfid) {
        filters.rfid = rfid;
    }
    if (purchaseDate) {
        const startPurchaseDate = moment(purchaseDate.split('to')[0].trim()).startOf('day').format('YYYY-MM-DD HH:mm:ss')
        const endPurchaseDate = moment(purchaseDate.split('to')[1].trim()).endOf('day').format('YYYY-MM-DD HH:mm:ss')
        filters.purchaseDate = {
            [Op.between]: [startPurchaseDate, endPurchaseDate]
        }
    }
    if (warrantyExpirationDate) {
        const startWarrantyExpirationDate = moment(warrantyExpirationDate.split('to')[0].trim()).startOf('day').format('YYYY-MM-DD HH:mm:ss')
        const endWarrantyExpirationDate = moment(warrantyExpirationDate.split('to')[1].trim()).endOf('day').format('YYYY-MM-DD HH:mm:ss')
        filters.warrantyExpirationDate = {
            [Op.between]: [startWarrantyExpirationDate, endWarrantyExpirationDate]
        }
    }
    if (userId) {
        filters.userId = userId;
    }

    // console.log(filters)
    Device.findAll({
        include: [Activitys],
        where: filters

    })
        .then((result) => {
            res.json(result);
        }).catch((err) => {
            res.json(err)
        });
});

router.post('/', upload.single('image'), (req, res) => {
    let imageData = req.file ? req.file.filename : req.body.image;

    Device.create({
        rfid: req.body.rfid,
        rfidStatus: req.body.rfidStatus,
        lastScan: req.body.lastScan,
        purchaseDate: req.body.purchaseDate,
        warrantyExpirationDate: req.body.warrantyExpirationDate,
        activityId: req.body.activityId,
        userId: req.body.userId,
        image: imageData,
        returnDate: req.body.returnDate,
        maxBorrowDays: req.body.maxBorrowDays,
        updatedAt: req.body.updatedAt,
        createdAt: req.body.createdAt,
        name: req.body.name,
        status: req.body.status,
        assetGroup: req.body.assetGroup,
        assetNumber: req.body.assetNumber,
        searchName: req.body.searchName,
        dataType: req.body.dataType,
        mainType: req.body.mainType,
        propertyType: req.body.propertyType,
        documentLocation: req.body.documentLocation,
        quantity: req.body.quantity,
        unit: req.body.unit,
        originalAsset: req.body.originalAsset,
        createdBy: req.body.createdBy,
        model: req.body.model,
        modelYear: req.body.modelYear,
        serialNumber: req.body.serialNumber,
        technicalDetails: req.body.technicalDetails,
        lastMaintenanceDate: req.body.lastMaintenanceDate,
        nextMaintenanceDate: req.body.nextMaintenanceDate,
        brand: req.body.brand,
        distributorAccount: req.body.distributorAccount,
        sellerName: req.body.sellerName,
        sellerAddress: req.body.sellerAddress,
        phone: req.body.phone,
        fax: req.body.fax,
        documentNumber: req.body.documentNumber,
        telephone: req.body.telephone,
        mainPermanentAsset: req.body.mainPermanentAsset,
        insuranceCompany: req.body.insuranceCompany,
        agent: req.body.agent,
        policyNumber: req.body.policyNumber,
        policyExpirationDate: req.body.policyExpirationDate,
        policyAmount: req.body.policyAmount,
        insuranceValue: req.body.insuranceValue,
        replacementCost: req.body.replacementCost,
        lastCostUpdate: req.body.lastCostUpdate,
        insuranceDate1: req.body.insuranceDate1,
        insuranceDate2: req.body.insuranceDate2,
        marketPriceInsurance: req.body.marketPriceInsurance,
        GISReferenceNumber: req.body.GISReferenceNumber,
        responsiblePerson: req.body.responsiblePerson,
        locationDescription: req.body.locationDescription,
        storageLocation: req.body.storageLocation,
        roomNumber: req.body.roomNumber,
        barcode: req.body.barcode,
        physicalInventory: req.body.physicalInventory,
        contactPerson: req.body.contactPerson,
        rentalNotes: req.body.rentalNotes,
        rightsHolder: req.body.rightsHolder,
        transferredAssetNumber: req.body.transferredAssetNumber,
        fieldOrder1: req.body.fieldOrder1,
        fieldOrder2: req.body.fieldOrder2,
        fieldOrder3: req.body.fieldOrder3,
        referenceData: req.body.referenceData,
        comments: req.body.comments,
        disposalConstraints: req.body.disposalConstraints,
        procurementUnit: req.body.procurementUnit,
        procurementType: req.body.procurementType,
        procurementCategory: req.body.procurementCategory,
        procurementYearCode: req.body.procurementYearCode,
        IVZ_FsNum: req.body.IVZ_FsNum,
        procurementSourceType: req.body.procurementSourceType,
        procurementDetails: req.body.procurementDetails,
        campus: req.body.campus,
        department: req.body.department,
        location: req.body.location,
        type: req.body.type,
        running: req.body.running
    }).then((result) => {
        res.json(result);
    });
});

router.put('/:id', upload.single('image'), (req, res) => {
    let imageData = req.file ? req.file.filename : req.body.image;
    console.log(imageData);
    Device.update({
        rfid: req.body.rfid,
        rfidStatus: req.body.rfidStatus,
        lastScan: req.body.lastScan,
        purchaseDate: req.body.purchaseDate,
        warrantyExpirationDate: req.body.warrantyExpirationDate,
        activityId: req.body.activityId,
        userId: req.body.userId,
        image: imageData,
        returnDate: req.body.returnDate,
        maxBorrowDays: req.body.maxBorrowDays,
        updatedAt: req.body.updatedAt,
        createdAt: req.body.createdAt,
        name: req.body.name,
        status: req.body.status,
        assetGroup: req.body.assetGroup,
        assetNumber: req.body.assetNumber,
        searchName: req.body.searchName,
        dataType: req.body.dataType,
        mainType: req.body.mainType,
        propertyType: req.body.propertyType,
        documentLocation: req.body.documentLocation,
        quantity: req.body.quantity,
        unit: req.body.unit,
        originalAsset: req.body.originalAsset,
        createdBy: req.body.createdBy,
        model: req.body.model,
        modelYear: req.body.modelYear,
        serialNumber: req.body.serialNumber,
        technicalDetails: req.body.technicalDetails,
        lastMaintenanceDate: req.body.lastMaintenanceDate,
        nextMaintenanceDate: req.body.nextMaintenanceDate,
        brand: req.body.brand,
        distributorAccount: req.body.distributorAccount,
        sellerName: req.body.sellerName,
        sellerAddress: req.body.sellerAddress,
        phone: req.body.phone,
        fax: req.body.fax,
        documentNumber: req.body.documentNumber,
        telephone: req.body.telephone,
        mainPermanentAsset: req.body.mainPermanentAsset,
        insuranceCompany: req.body.insuranceCompany,
        agent: req.body.agent,
        policyNumber: req.body.policyNumber,
        policyExpirationDate: req.body.policyExpirationDate,
        policyAmount: req.body.policyAmount,
        insuranceValue: req.body.insuranceValue,
        replacementCost: req.body.replacementCost,
        lastCostUpdate: req.body.lastCostUpdate,
        insuranceDate1: req.body.insuranceDate1,
        insuranceDate2: req.body.insuranceDate2,
        marketPriceInsurance: req.body.marketPriceInsurance,
        GISReferenceNumber: req.body.GISReferenceNumber,
        responsiblePerson: req.body.responsiblePerson,
        locationDescription: req.body.locationDescription,
        storageLocation: req.body.storageLocation,
        roomNumber: req.body.roomNumber,
        barcode: req.body.barcode,
        physicalInventory: req.body.physicalInventory,
        contactPerson: req.body.contactPerson,
        rentalNotes: req.body.rentalNotes,
        rightsHolder: req.body.rightsHolder,
        transferredAssetNumber: req.body.transferredAssetNumber,
        fieldOrder1: req.body.fieldOrder1,
        fieldOrder2: req.body.fieldOrder2,
        fieldOrder3: req.body.fieldOrder3,
        referenceData: req.body.referenceData,
        comments: req.body.comments,
        disposalConstraints: req.body.disposalConstraints,
        procurementUnit: req.body.procurementUnit,
        procurementType: req.body.procurementType,
        procurementCategory: req.body.procurementCategory,
        procurementYearCode: req.body.procurementYearCode,
        IVZ_FsNum: req.body.IVZ_FsNum,
        procurementSourceType: req.body.procurementSourceType,
        procurementDetails: req.body.procurementDetails,
        campus: req.body.campus,
        department: req.body.department,
        location: req.body.location,
        type: req.body.type,
        running: req.body.running

    }, {
        where: {
            id: req.params.id
        }
    }).then((result) => {
        res.json(result);
    });
});

router.delete('/:id', (req, res) => {
    Device.destroy({
        where: {
            id: req.params.id
        }
    }).then((result) => {
        res.json(result);
    });
});

// get device by id 
router.get('/:id', (req, res) => {
    Device.findOne({
        where: {
            id: req.params.id
        }
    }).then((result) => {
        res.json(result);
    });
});

// get device by activityId
router.get('/activity/:id', (req, res) => {
    Device.findAll({
        where: {
            activityId: req.params.id
        }
    }).then((result) => {
        res.json(result);
    });
});

router.get('/image/:name', (req, res) => {
    // console.log(__dirname);
    res.sendFile(fileURLToPath(`file:///${__dirname}/../public/images/${req.params.name}`));
});

// get all image 
router.get('/display/image', (req, res) => {
    Device.findAll({
        attributes: ['image']
    }).then((result) => {
        res.json(result);
    });
});

router.get('/check/loss', (req, res) => {
    const sec = 20000; // 20 sec
    const timeDiff = new Date - sec;

    Device.findAll({
        where: {
            lastScan: {
                [Op.lt]: timeDiff
            },
            rfidStatus: {
                [Op.notIn]: ['Loss', 'Borrowed']
            }
        }
    })
        .then((result) => {
            res.json(result);
        }).catch((err) => {
            res.json(err)
        });
});

module.exports = router;