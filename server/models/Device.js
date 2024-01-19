module.exports = (sequelize, DataTypes) => {
    const Device = sequelize.define("Device", {
        /*
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        serialNumber:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        rfid:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        purchaseDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        warrantyExpirationDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        activityId: {
            type: DataTypes.INTEGER,
            // allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
        },
        */
        

        
        name: {
            type: DataTypes.STRING,
        },
        rfid:{
            type: DataTypes.STRING,
        },
        rfidStatus: {
            type: DataTypes.STRING,
        },
        lastScan: {
            type: DataTypes.DATE,
        },
        purchaseDate: {
            type: DataTypes.DATE,
        },
        warrantyExpirationDate: {
            type: DataTypes.DATE,
        },
        activityId: {
            type: DataTypes.INTEGER,
        },
        userId:{
            type: DataTypes.INTEGER,
        },
        image: {
            type: DataTypes.STRING,
        },
        returnDate: {
            type: DataTypes.DATE,
        },
        maxBorrowDays: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },


    
        status: {
            type: DataTypes.STRING,
        },
        assetGroup: {
            type: DataTypes.STRING,
        },
        assetNumber: {
            type: DataTypes.STRING,
        },
        searchName: {
            type: DataTypes.STRING,
        },
        dataType: {
            type: DataTypes.STRING,
        },
        mainType: {
            type: DataTypes.STRING,
        },
        propertyType: {
            type: DataTypes.STRING,
        },
        documentLocation: {
            type: DataTypes.STRING,
        },
        quantity: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
        },
        unit: {
            type: DataTypes.STRING,
        },
        originalAsset: {
            type: DataTypes.STRING,
        },
        
        createdBy: {
            type: DataTypes.STRING,
        },
        model: {
            type: DataTypes.STRING,
        },
        modelYear: {
            type: DataTypes.STRING,
        },
        serialNumber: {
            type: DataTypes.STRING,
        },
        technicalDetails: {
            type: DataTypes.STRING,
        },
        lastMaintenanceDate: {
            type: DataTypes.DATE,
        },
        nextMaintenanceDate: {
            type: DataTypes.DATE,
        },
        brand: {
            type: DataTypes.STRING,
        },
        distributorAccount: {
            type: DataTypes.STRING,
        },
        sellerName: {
            type: DataTypes.STRING,
        },
        sellerAddress: {
            type: DataTypes.STRING,
        },
        phone: {
            type: DataTypes.STRING,
        },
        fax: {
            type: DataTypes.STRING,
        },
        documentNumber: {
            type: DataTypes.STRING,
        },
        telephone: {
            type: DataTypes.STRING,
        },

        mainPermanentAsset: {
            type: DataTypes.STRING,
        },

        insuranceCompany: {
            type: DataTypes.STRING,
        },
        agent: {
            type: DataTypes.STRING,
        },
        policyNumber: {
            type: DataTypes.STRING,
        },
        policyExpirationDate: {
            type: DataTypes.DATE,
        },
        policyAmount: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
        },
        insuranceValue: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
        },
        replacementCost: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
        },
        lastCostUpdate: {
            type: DataTypes.DATE,
        },
        insuranceDate1: {
            type: DataTypes.DATE,
        },
        insuranceDate2: {
            type: DataTypes.DATE,
        },
        marketPriceInsurance: {
            type: DataTypes.STRING,
        },

        GISReferenceNumber: {
            type: DataTypes.STRING,
        },
        responsiblePerson: {
            type: DataTypes.STRING,
        },
        locationDescription: {
            type: DataTypes.STRING,
        },
        storageLocation: {
            type: DataTypes.STRING,
        },
        roomNumber: {
            type: DataTypes.STRING,
        },
        barcode: {
            type: DataTypes.STRING,
        },
        physicalInventory: {
            type: DataTypes.DATE,
        },
        contactPerson: {
            type: DataTypes.STRING,
        },
        rentalNotes: {
            type: DataTypes.STRING,
        },
        rightsHolder: {
            type: DataTypes.STRING,
        },
        transferredAssetNumber: {
            type: DataTypes.STRING,
        },

        fieldOrder1: {
            type: DataTypes.STRING,
        },
        fieldOrder2: {
            type: DataTypes.STRING,
        },
        fieldOrder3: {
            type: DataTypes.STRING,
        },

        referenceData: {
            type: DataTypes.STRING,
        },
        comments: {
            type: DataTypes.STRING,
        },
        disposalConstraints: {
            type: DataTypes.STRING,
        },
        procurementUnit: {
            type: DataTypes.STRING,
        },
        procurementType: {
            type: DataTypes.STRING,
        },
        procurementCategory: {
            type: DataTypes.STRING,
        },
        procurementYearCode: {
            type: DataTypes.STRING,
        },
        IVZ_FsNum: {
            type: DataTypes.STRING,
        },
        procurementSourceType: {
            type: DataTypes.STRING,
        },
        procurementDetails: {
            type: DataTypes.STRING,
        },

        campus: {
            type: DataTypes.STRING,
        },
        department: {
            type: DataTypes.STRING,
        },
        location: {
            type: DataTypes.STRING,
        },
        type: {
            type: DataTypes.STRING,
        },
        running: {
            type: DataTypes.STRING,
        },
        

    });

    Device.associate = (models) => {
        Device.belongsTo(models.Activitys, {
            foreignKey: 'activityId',
            onDelete: 'CASCADE',
        });
        Device.belongsTo(models.Users, {
            foreignKey: 'userId',
            onDelete: 'CASCADE',
        });
    };

    return Device;
}